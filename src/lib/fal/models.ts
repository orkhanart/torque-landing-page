import { GenerationType } from "./types";

export interface ModelConfig {
  id: string;
  name: string;
  type: GenerationType;
  description: string;
  inputType: "text" | "image" | "text-or-image";
  estimatedTime: string;
  supportsNegativePrompt: boolean;
  defaultSettings?: {
    width?: number;
    height?: number;
    numInferenceSteps?: number;
    guidanceScale?: number;
  };
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  // Image Models
  {
    id: "fal-ai/flux-pro/v1.1",
    name: "FLUX Pro 1.1",
    type: "image",
    description: "High quality image generation with fast inference",
    inputType: "text",
    estimatedTime: "~10s",
    supportsNegativePrompt: false,
    defaultSettings: {
      width: 1024,
      height: 1024,
      numInferenceSteps: 28,
      guidanceScale: 3.5,
    },
  },
  {
    id: "fal-ai/flux/dev",
    name: "FLUX Dev",
    type: "image",
    description: "Faster, lower cost image generation",
    inputType: "text",
    estimatedTime: "~5s",
    supportsNegativePrompt: false,
    defaultSettings: {
      width: 1024,
      height: 1024,
      numInferenceSteps: 28,
      guidanceScale: 3.5,
    },
  },
  {
    id: "fal-ai/stable-diffusion-v3-medium",
    name: "Stable Diffusion 3 Medium",
    type: "image",
    description: "SD3 with negative prompt support",
    inputType: "text",
    estimatedTime: "~8s",
    supportsNegativePrompt: true,
    defaultSettings: {
      width: 1024,
      height: 1024,
      numInferenceSteps: 28,
      guidanceScale: 7,
    },
  },
  // Video Models
  {
    id: "fal-ai/minimax/video-01",
    name: "Minimax Video",
    type: "video",
    description: "Text-to-video generation",
    inputType: "text",
    estimatedTime: "~2-5min",
    supportsNegativePrompt: false,
  },
  {
    id: "fal-ai/kling-video/v1/standard/image-to-video",
    name: "Kling Image-to-Video",
    type: "video",
    description: "Convert images to video with motion",
    inputType: "image",
    estimatedTime: "~2-5min",
    supportsNegativePrompt: false,
  },
  // 3D Models
  {
    id: "fal-ai/triposr",
    name: "TripoSR",
    type: "3d",
    description: "Fast image-to-3D mesh generation",
    inputType: "image",
    estimatedTime: "~30s",
    supportsNegativePrompt: false,
  },
  {
    id: "fal-ai/stable-fast-3d",
    name: "Stable Fast 3D",
    type: "3d",
    description: "High quality image-to-3D conversion",
    inputType: "image",
    estimatedTime: "~45s",
    supportsNegativePrompt: false,
  },
];

export function getModelById(id: string): ModelConfig | undefined {
  return AVAILABLE_MODELS.find((model) => model.id === id);
}

export function getModelsByType(type: GenerationType): ModelConfig[] {
  return AVAILABLE_MODELS.filter((model) => model.type === type);
}

export function getDefaultModel(type: GenerationType): ModelConfig {
  const models = getModelsByType(type);
  return models[0];
}
