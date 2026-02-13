// Fal.ai Type Definitions

export type GenerationType = "image" | "video" | "3d";

export interface GenerationInput {
  prompt: string;
  model: string;
  type: GenerationType;
  negativePrompt?: string;
  imageUrl?: string; // For image-to-video or image-to-3D
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
}

export interface GenerationResult {
  success: boolean;
  type: GenerationType;
  url?: string;
  urls?: string[];
  requestId?: string;
  status?: "pending" | "processing" | "completed" | "failed";
  error?: string;
  metadata?: {
    model: string;
    prompt: string;
    timeTaken?: number;
    seed?: number;
  };
}

export interface QueueStatusResult {
  status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  position?: number;
  result?: GenerationResult;
  error?: string;
}

export interface SaveFileResult {
  success: boolean;
  localPath?: string;
  publicUrl?: string;
  error?: string;
}

// Model-specific input types
export interface FluxInput {
  prompt: string;
  image_size?: { width: number; height: number } | string;
  num_inference_steps?: number;
  guidance_scale?: number;
  num_images?: number;
  seed?: number;
  enable_safety_checker?: boolean;
}

export interface FluxOutput {
  images: Array<{
    url: string;
    width: number;
    height: number;
    content_type: string;
  }>;
  timings?: {
    inference: number;
  };
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}

export interface MinimaxVideoInput {
  prompt: string;
  prompt_optimizer?: boolean;
}

export interface MinimaxVideoOutput {
  video: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
  };
}

export interface KlingVideoInput {
  prompt: string;
  image_url: string;
  duration?: "5" | "10";
  aspect_ratio?: "16:9" | "9:16" | "1:1";
}

export interface KlingVideoOutput {
  video: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
  };
}

export interface TripoSRInput {
  image_url: string;
  mc_resolution?: number;
  foreground_ratio?: number;
}

export interface TripoSROutput {
  mesh: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
  };
  timings?: {
    inference: number;
  };
}

export interface StableFast3DInput {
  image_url: string;
  foreground_ratio?: number;
  remesh?: "none" | "quad" | "triangle";
  texture_resolution?: number;
}

export interface StableFast3DOutput {
  mesh: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
  };
}
