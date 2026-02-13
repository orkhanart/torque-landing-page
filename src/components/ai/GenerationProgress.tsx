"use client";

import * as React from "react";
import { Loader2, Clock, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface GenerationProgressProps {
  status: "idle" | "submitting" | "queued" | "processing" | "completed" | "failed";
  progress: number;
  queuePosition: number | null;
  error: string | null;
  onCancel?: () => void;
  className?: string;
}

const statusMessages = {
  idle: "Ready to generate",
  submitting: "Submitting request...",
  queued: "Waiting in queue...",
  processing: "Generating...",
  completed: "Complete!",
  failed: "Generation failed",
};

export function GenerationProgress({
  status,
  progress,
  queuePosition,
  error,
  onCancel,
  className,
}: GenerationProgressProps) {
  const isActive = status !== "idle" && status !== "completed" && status !== "failed";

  return (
    <div
      className={cn(
        "p-4 rounded-lg border",
        status === "failed"
          ? "bg-red-500/10 border-red-500/30"
          : status === "completed"
          ? "bg-green-500/10 border-green-500/30"
          : "bg-[#1a1a2e] border-[#333]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {status === "failed" ? (
            <AlertCircle className="h-5 w-5 text-red-400" />
          ) : isActive ? (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          ) : status === "completed" ? (
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <Clock className="h-5 w-5 text-gray-400" />
          )}
          <span
            className={cn(
              "font-medium",
              status === "failed"
                ? "text-red-400"
                : status === "completed"
                ? "text-green-400"
                : "text-white"
            )}
          >
            {statusMessages[status]}
          </span>
        </div>

        {isActive && onCancel && (
          <button
            onClick={onCancel}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {(isActive || status === "completed") && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              {queuePosition !== null
                ? `Position in queue: ${queuePosition}`
                : status === "processing"
                ? "Processing your request..."
                : status === "completed"
                ? "Generation complete"
                : "Preparing..."}
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === "failed" && error && (
        <div className="mt-2 text-sm text-red-400">{error}</div>
      )}
    </div>
  );
}
