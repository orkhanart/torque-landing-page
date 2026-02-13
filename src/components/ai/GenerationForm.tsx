"use client";

import * as React from "react";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModelSelector } from "./ModelSelector";
import { GenerationType } from "@/lib/fal/types";
import { getModelById, getDefaultModel } from "@/lib/fal/models";

interface GenerationFormProps {
  type: GenerationType;
  onSubmit: (data: {
    prompt: string;
    model: string;
    negativePrompt?: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    seed?: number;
  }) => void;
  isGenerating: boolean;
  className?: string;
}

export function GenerationForm({
  type,
  onSubmit,
  isGenerating,
  className,
}: GenerationFormProps) {
  const [prompt, setPrompt] = React.useState("");
  const [negativePrompt, setNegativePrompt] = React.useState("");
  const [model, setModel] = React.useState(getDefaultModel(type).id);
  const [imageUrl, setImageUrl] = React.useState("");
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [seed, setSeed] = React.useState<string>("");

  const selectedModel = getModelById(model);
  const needsImage = selectedModel?.inputType === "image";
  const supportsNegativePrompt = selectedModel?.supportsNegativePrompt ?? false;

  // Reset model when type changes
  React.useEffect(() => {
    setModel(getDefaultModel(type).id);
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim() && !imageUrl.trim()) {
      return;
    }

    onSubmit({
      prompt: prompt.trim(),
      model,
      negativePrompt: negativePrompt.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      seed: seed ? parseInt(seed, 10) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* Model Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Model
        </label>
        <ModelSelector
          type={type}
          value={model}
          onValueChange={setModel}
        />
      </div>

      {/* Image URL Input (for models that need it) */}
      {needsImage && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Source Image URL <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-[#333]",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              )}
              required
            />
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Enter a publicly accessible image URL
          </p>
        </div>
      )}

      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Prompt {!needsImage && <span className="text-red-400">*</span>}
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            type === "image"
              ? "A futuristic cyberpunk cityscape at night with neon lights..."
              : type === "video"
              ? "A spaceship flying through an asteroid field..."
              : "Describe the object you want to generate..."
          }
          rows={4}
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-[#333]",
            "text-white placeholder-gray-500 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          )}
          required={!needsImage}
        />
      </div>

      {/* Negative Prompt (for supported models) */}
      {supportsNegativePrompt && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Negative Prompt
          </label>
          <textarea
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="low quality, blurry, distorted..."
            rows={2}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-[#333]",
              "text-white placeholder-gray-500 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            )}
          />
        </div>
      )}

      {/* Advanced Settings Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-primary hover:underline"
      >
        {showAdvanced ? "Hide" : "Show"} advanced settings
      </button>

      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="space-y-4 p-4 bg-[#1a1a2e]/50 rounded-lg border border-[#333]">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seed (optional)
            </label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Random"
              className={cn(
                "w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#333]",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              )}
            />
            <p className="mt-1 text-xs text-gray-500">
              Use the same seed to reproduce results
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating || (!prompt.trim() && !imageUrl.trim())}
        className={cn(
          "w-full py-4 rounded-lg font-medium text-lg",
          "flex items-center justify-center gap-2",
          "transition-all duration-200",
          isGenerating
            ? "bg-primary/50 text-white/70 cursor-not-allowed"
            : "bg-primary text-black hover:bg-primary/90"
        )}
      >
        <Sparkles className="h-5 w-5" />
        {isGenerating ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
