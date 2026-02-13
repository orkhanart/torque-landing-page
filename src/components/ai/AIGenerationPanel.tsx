"use client";

import * as React from "react";
import { Image, Video, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { GenerationForm } from "./GenerationForm";
import { GenerationProgress } from "./GenerationProgress";
import { GenerationPreview } from "./GenerationPreview";
import { useGeneration } from "./hooks/useGeneration";
import { GenerationType } from "@/lib/fal/types";

interface AIGenerationPanelProps {
  defaultType?: GenerationType;
  className?: string;
}

const tabs: { type: GenerationType; label: string; icon: React.ElementType }[] = [
  { type: "image", label: "Image", icon: Image },
  { type: "video", label: "Video", icon: Video },
  { type: "3d", label: "3D", icon: Box },
];

export function AIGenerationPanel({
  defaultType = "image",
  className,
}: AIGenerationPanelProps) {
  const [activeType, setActiveType] = React.useState<GenerationType>(defaultType);
  const [savedPath, setSavedPath] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const {
    isGenerating,
    status,
    progress,
    result,
    error,
    queuePosition,
    generate,
    saveToPublic,
    reset,
    cancel,
  } = useGeneration();

  // Reset saved path when type changes or new generation starts
  React.useEffect(() => {
    setSavedPath(null);
  }, [activeType, isGenerating]);

  const handleSubmit = async (data: {
    prompt: string;
    model: string;
    negativePrompt?: string;
    imageUrl?: string;
    seed?: number;
  }) => {
    setSavedPath(null);
    await generate({
      ...data,
      type: activeType,
    });
  };

  const handleSave = async () => {
    if (!result?.url) return;

    setIsSaving(true);
    try {
      const saveResult = await saveToPublic(result.url, result.type);
      if (saveResult.success && saveResult.localPath) {
        setSavedPath(saveResult.localPath);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    reset();
    setSavedPath(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Type Tabs */}
      <div className="flex gap-2 p-1 bg-[#1a1a2e] rounded-lg">
        {tabs.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => {
              setActiveType(type);
              if (status !== "idle") handleReset();
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg",
              "font-medium transition-all duration-200",
              activeType === type
                ? "bg-primary text-black"
                : "text-gray-400 hover:text-white hover:bg-[#252540]"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-4">
          <GenerationForm
            type={activeType}
            onSubmit={handleSubmit}
            isGenerating={isGenerating}
          />

          {/* Progress (shown when active) */}
          {status !== "idle" && (
            <GenerationProgress
              status={status}
              progress={progress}
              queuePosition={queuePosition}
              error={error}
              onCancel={cancel}
            />
          )}
        </div>

        {/* Right Column - Preview */}
        <div>
          {result && status === "completed" ? (
            <GenerationPreview
              result={result}
              onSave={handleSave}
              isSaving={isSaving}
              savedPath={savedPath}
            />
          ) : (
            <div className="aspect-square rounded-lg bg-[#1a1a2e] border border-[#333] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">
                  {activeType === "image" ? "🖼️" : activeType === "video" ? "🎬" : "🎲"}
                </div>
                <p>Your generated {activeType} will appear here</p>
              </div>
            </div>
          )}

          {/* Generate New Button (after completion) */}
          {status === "completed" && (
            <button
              onClick={handleReset}
              className={cn(
                "w-full mt-4 py-3 rounded-lg",
                "bg-[#1a1a2e] border border-[#333] text-white",
                "hover:bg-[#252540] transition-colors"
              )}
            >
              Generate New
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
