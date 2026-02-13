import {
  GenerationInput,
  GenerationResult,
  QueueStatusResult,
  FluxInput,
  FluxOutput,
  MinimaxVideoInput,
  MinimaxVideoOutput,
  KlingVideoInput,
  KlingVideoOutput,
  TripoSRInput,
  TripoSROutput,
  StableFast3DInput,
  StableFast3DOutput,
} from "./types";
import { getModelById } from "./models";

const FAL_API_URL = "https://queue.fal.run";

function getApiKey(): string {
  const key = process.env.FAL_KEY;
  if (!key) {
    throw new Error("FAL_KEY environment variable is not set");
  }
  return key;
}

async function falRequest<T>(
  endpoint: string,
  method: "GET" | "POST" = "POST",
  body?: unknown
): Promise<T> {
  const response = await fetch(`${FAL_API_URL}/${endpoint}`, {
    method,
    headers: {
      Authorization: `Key ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Fal.ai API error: ${response.status} - ${error}`);
  }

  return response.json();
}

function buildImageInput(input: GenerationInput): FluxInput {
  return {
    prompt: input.prompt,
    image_size: input.width && input.height
      ? { width: input.width, height: input.height }
      : "landscape_16_9",
    num_inference_steps: input.numInferenceSteps || 28,
    guidance_scale: input.guidanceScale || 3.5,
    num_images: 1,
    seed: input.seed,
    enable_safety_checker: true,
  };
}

function buildVideoInput(input: GenerationInput): MinimaxVideoInput | KlingVideoInput {
  if (input.model.includes("kling") && input.imageUrl) {
    return {
      prompt: input.prompt,
      image_url: input.imageUrl,
      duration: "5",
      aspect_ratio: "16:9",
    } as KlingVideoInput;
  }

  return {
    prompt: input.prompt,
    prompt_optimizer: true,
  } as MinimaxVideoInput;
}

function build3DInput(input: GenerationInput): TripoSRInput | StableFast3DInput {
  if (!input.imageUrl) {
    throw new Error("Image URL is required for 3D generation");
  }

  if (input.model.includes("stable-fast-3d")) {
    return {
      image_url: input.imageUrl,
      foreground_ratio: 0.85,
      remesh: "none",
      texture_resolution: 1024,
    } as StableFast3DInput;
  }

  return {
    image_url: input.imageUrl,
    mc_resolution: 256,
    foreground_ratio: 0.85,
  } as TripoSRInput;
}

export async function submitGeneration(
  input: GenerationInput
): Promise<GenerationResult> {
  const model = getModelById(input.model);
  if (!model) {
    return {
      success: false,
      type: input.type,
      error: `Unknown model: ${input.model}`,
    };
  }

  try {
    let requestBody: unknown;

    switch (input.type) {
      case "image":
        requestBody = buildImageInput(input);
        break;
      case "video":
        requestBody = buildVideoInput(input);
        break;
      case "3d":
        requestBody = build3DInput(input);
        break;
      default:
        throw new Error(`Unknown generation type: ${input.type}`);
    }

    // Submit to queue
    const queueResponse = await falRequest<{ request_id: string }>(
      input.model,
      "POST",
      requestBody
    );

    return {
      success: true,
      type: input.type,
      requestId: queueResponse.request_id,
      status: "pending",
      metadata: {
        model: input.model,
        prompt: input.prompt,
      },
    };
  } catch (error) {
    return {
      success: false,
      type: input.type,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getQueueStatus(
  model: string,
  requestId: string
): Promise<QueueStatusResult> {
  try {
    const response = await falRequest<{
      status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
      queue_position?: number;
      response_url?: string;
    }>(`${model}/requests/${requestId}/status`, "GET");

    if (response.status === "COMPLETED") {
      // Fetch the actual result
      const result = await getResult(model, requestId);
      return {
        status: "COMPLETED",
        result,
      };
    }

    return {
      status: response.status,
      position: response.queue_position,
    };
  } catch (error) {
    return {
      status: "FAILED",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function getResult(
  model: string,
  requestId: string
): Promise<GenerationResult> {
  try {
    const modelConfig = getModelById(model);
    const type = modelConfig?.type || "image";

    const response = await falRequest<
      FluxOutput | MinimaxVideoOutput | KlingVideoOutput | TripoSROutput | StableFast3DOutput
    >(`${model}/requests/${requestId}`, "GET");

    // Parse response based on type
    if (type === "image" && "images" in response) {
      const imageResponse = response as FluxOutput;
      return {
        success: true,
        type: "image",
        url: imageResponse.images[0]?.url,
        urls: imageResponse.images.map((img) => img.url),
        status: "completed",
        metadata: {
          model,
          prompt: imageResponse.prompt,
          seed: imageResponse.seed,
          timeTaken: imageResponse.timings?.inference,
        },
      };
    }

    if (type === "video" && "video" in response) {
      const videoResponse = response as MinimaxVideoOutput | KlingVideoOutput;
      return {
        success: true,
        type: "video",
        url: videoResponse.video.url,
        status: "completed",
        metadata: {
          model,
          prompt: "",
        },
      };
    }

    if (type === "3d" && "mesh" in response) {
      const meshResponse = response as TripoSROutput | StableFast3DOutput;
      return {
        success: true,
        type: "3d",
        url: meshResponse.mesh.url,
        status: "completed",
        metadata: {
          model,
          prompt: "",
          timeTaken: "timings" in meshResponse ? meshResponse.timings?.inference : undefined,
        },
      };
    }

    return {
      success: false,
      type,
      error: "Unexpected response format",
    };
  } catch (error) {
    return {
      success: false,
      type: "image",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
