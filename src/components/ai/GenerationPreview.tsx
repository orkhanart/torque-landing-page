"use client";

import * as React from "react";
import Image from "next/image";
import { Download, Save, ExternalLink, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GenerationResult, GenerationType } from "@/lib/fal/types";

interface GenerationPreviewProps {
  result: GenerationResult;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  savedPath?: string | null;
  className?: string;
}

export function GenerationPreview({
  result,
  onSave,
  isSaving,
  savedPath,
  className,
}: GenerationPreviewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyUrl = async () => {
    const url = savedPath || result.url;
    if (!url) return;

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result.url) return;

    const link = document.createElement("a");
    link.href = result.url;
    link.download = getFilename(result.type);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Preview Area */}
      <div className="relative rounded-lg overflow-hidden bg-[#1a1a2e] border border-[#333]">
        {result.type === "image" && result.url && (
          <div className="relative aspect-square">
            <Image
              src={result.url}
              alt="Generated image"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        {result.type === "video" && result.url && (
          <video
            src={result.url}
            controls
            className="w-full aspect-video"
            autoPlay
            loop
            muted
          />
        )}

        {result.type === "3d" && result.url && (
          <div className="aspect-square flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎲</div>
              <p className="text-gray-400 mb-2">3D Model Generated</p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center justify-center gap-1"
              >
                View GLB File
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-[#1a1a2e] border border-[#333] text-white",
            "hover:bg-[#252540] transition-colors"
          )}
        >
          <Download className="h-4 w-4" />
          Download
        </button>

        {/* Save to Public Button */}
        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving || !!savedPath}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "transition-colors",
              savedPath
                ? "bg-green-500/20 border border-green-500/30 text-green-400"
                : isSaving
                ? "bg-primary/50 text-white/70 cursor-not-allowed"
                : "bg-primary text-black hover:bg-primary/90"
            )}
          >
            {savedPath ? (
              <>
                <Check className="h-4 w-4" />
                Saved
              </>
            ) : isSaving ? (
              <>
                <Save className="h-4 w-4 animate-pulse" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save to Public
              </>
            )}
          </button>
        )}

        {/* Copy URL Button */}
        <button
          onClick={handleCopyUrl}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-[#1a1a2e] border border-[#333] text-white",
            "hover:bg-[#252540] transition-colors"
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy URL
            </>
          )}
        </button>
      </div>

      {/* Saved Path Info */}
      {savedPath && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-400 font-medium">Saved to:</p>
          <code className="text-xs text-gray-300 break-all">{savedPath}</code>
        </div>
      )}

      {/* Metadata */}
      {result.metadata && (
        <div className="p-3 bg-[#1a1a2e]/50 rounded-lg border border-[#333]">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Details</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">Model:</span>{" "}
              <span className="text-gray-300">{result.metadata.model}</span>
            </div>
            {result.metadata.seed !== undefined && (
              <div>
                <span className="text-gray-500">Seed:</span>{" "}
                <span className="text-gray-300">{result.metadata.seed}</span>
              </div>
            )}
            {result.metadata.timeTaken !== undefined && (
              <div>
                <span className="text-gray-500">Time:</span>{" "}
                <span className="text-gray-300">
                  {(result.metadata.timeTaken / 1000).toFixed(2)}s
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getFilename(type: GenerationType): string {
  const timestamp = Date.now();
  const ext = type === "video" ? "mp4" : type === "3d" ? "glb" : "png";
  return `generated-${type}-${timestamp}.${ext}`;
}
