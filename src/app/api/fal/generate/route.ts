import { NextRequest, NextResponse } from "next/server";
import { submitGeneration } from "@/lib/fal/client";
import { GenerationInput, GenerationType } from "@/lib/fal/types";
import { getModelById } from "@/lib/fal/models";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      prompt,
      model,
      type,
      negativePrompt,
      imageUrl,
      width,
      height,
      numInferenceSteps,
      guidanceScale,
      seed,
    } = body as GenerationInput;

    // Validate required fields
    if (!prompt && !imageUrl) {
      return NextResponse.json(
        { error: "Either prompt or imageUrl is required" },
        { status: 400 }
      );
    }

    if (!model) {
      return NextResponse.json(
        { error: "Model is required" },
        { status: 400 }
      );
    }

    if (!type || !["image", "video", "3d"].includes(type)) {
      return NextResponse.json(
        { error: "Valid type (image, video, 3d) is required" },
        { status: 400 }
      );
    }

    // Validate model exists
    const modelConfig = getModelById(model);
    if (!modelConfig) {
      return NextResponse.json(
        { error: `Unknown model: ${model}` },
        { status: 400 }
      );
    }

    // Validate image URL for models that require it
    if (modelConfig.inputType === "image" && !imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required for this model" },
        { status: 400 }
      );
    }

    const input: GenerationInput = {
      prompt: prompt || "",
      model,
      type: type as GenerationType,
      negativePrompt,
      imageUrl,
      width: width || modelConfig.defaultSettings?.width,
      height: height || modelConfig.defaultSettings?.height,
      numInferenceSteps: numInferenceSteps || modelConfig.defaultSettings?.numInferenceSteps,
      guidanceScale: guidanceScale || modelConfig.defaultSettings?.guidanceScale,
      seed,
    };

    const result = await submitGeneration(input);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in generate route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
