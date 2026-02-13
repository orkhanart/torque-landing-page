"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  GenerationType,
  GenerationResult,
  QueueStatusResult,
  SaveFileResult,
} from "@/lib/fal/types";

interface GenerationState {
  isGenerating: boolean;
  status: "idle" | "submitting" | "queued" | "processing" | "completed" | "failed";
  progress: number;
  result: GenerationResult | null;
  error: string | null;
  queuePosition: number | null;
}

interface GenerateParams {
  prompt: string;
  model: string;
  type: GenerationType;
  negativePrompt?: string;
  imageUrl?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
}

export function useGeneration() {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    status: "idle",
    progress: 0,
    result: null,
    error: null,
    queuePosition: null,
  });

  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  const pollStatus = useCallback(
    async (model: string, requestId: string): Promise<void> => {
      const poll = async () => {
        try {
          const response = await fetch(
            `/api/fal/status?model=${encodeURIComponent(model)}&requestId=${encodeURIComponent(requestId)}`
          );
          const data: QueueStatusResult = await response.json();

          if (data.status === "IN_QUEUE") {
            setState((prev) => ({
              ...prev,
              status: "queued",
              queuePosition: data.position ?? null,
              progress: 10,
            }));
          } else if (data.status === "IN_PROGRESS") {
            setState((prev) => ({
              ...prev,
              status: "processing",
              queuePosition: null,
              progress: 50,
            }));
          } else if (data.status === "COMPLETED" && data.result) {
            stopPolling();
            setState((prev) => ({
              ...prev,
              isGenerating: false,
              status: "completed",
              progress: 100,
              result: data.result!,
              error: null,
            }));
          } else if (data.status === "FAILED") {
            stopPolling();
            setState((prev) => ({
              ...prev,
              isGenerating: false,
              status: "failed",
              progress: 0,
              error: data.error || "Generation failed",
            }));
          }
        } catch (err) {
          // Ignore abort errors
          if (err instanceof Error && err.name === "AbortError") {
            return;
          }
          console.error("Polling error:", err);
        }
      };

      // Start polling every 2 seconds
      pollingRef.current = setInterval(poll, 2000);
      // Also poll immediately
      poll();
    },
    [stopPolling]
  );

  const generate = useCallback(
    async (params: GenerateParams) => {
      stopPolling();

      setState({
        isGenerating: true,
        status: "submitting",
        progress: 5,
        result: null,
        error: null,
        queuePosition: null,
      });

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch("/api/fal/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
          signal: abortControllerRef.current.signal,
        });

        const data: GenerationResult = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Generation failed");
        }

        if (data.requestId) {
          // Long-running task - start polling
          setState((prev) => ({
            ...prev,
            status: "queued",
            progress: 10,
          }));
          pollStatus(params.model, data.requestId);
        } else if (data.url) {
          // Immediate result
          setState({
            isGenerating: false,
            status: "completed",
            progress: 100,
            result: data,
            error: null,
            queuePosition: null,
          });
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setState({
          isGenerating: false,
          status: "failed",
          progress: 0,
          result: null,
          error: err instanceof Error ? err.message : "Unknown error",
          queuePosition: null,
        });
      }
    },
    [stopPolling, pollStatus]
  );

  const saveToPublic = useCallback(
    async (url: string, type: GenerationType): Promise<SaveFileResult> => {
      try {
        const response = await fetch("/api/fal/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, type }),
        });

        const data: SaveFileResult = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to save file");
        }

        return data;
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    },
    []
  );

  const reset = useCallback(() => {
    stopPolling();
    setState({
      isGenerating: false,
      status: "idle",
      progress: 0,
      result: null,
      error: null,
      queuePosition: null,
    });
  }, [stopPolling]);

  const cancel = useCallback(() => {
    stopPolling();
    setState((prev) => ({
      ...prev,
      isGenerating: false,
      status: "idle",
      progress: 0,
    }));
  }, [stopPolling]);

  return {
    ...state,
    generate,
    saveToPublic,
    reset,
    cancel,
  };
}
