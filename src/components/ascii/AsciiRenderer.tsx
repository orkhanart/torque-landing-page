"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export type AsciiCharset = "standard" | "blocks" | "binary" | "minimal" | "detailed" | "mixed" | "dots" | "geometric";
export type AsciiColorMode = "monochrome" | "grayscale" | "colored" | "matrix" | "neon" | "cyberpunk";

export interface AsciiOptions {
  charset?: AsciiCharset;
  colorMode?: AsciiColorMode;
  backgroundColor?: string;
  foregroundColor?: string;
  cellSize?: number;
  contrast?: number;
  brightness?: number;
  invert?: boolean;
}

const CHARSETS: Record<AsciiCharset, string> = {
  standard: " .:-=+*#%@",
  blocks: " ░▒▓█",
  binary: " 01",
  minimal: " .$#",
  detailed: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  mixed: " .·:+*$%#░▒▓█@₿€¥",
  dots: " ·∘○◎●◉⬤",
  geometric: " ·△▽◇○□◆●■▲▼",
};

const DEFAULT_OPTIONS: Required<AsciiOptions> = {
  charset: "standard",
  colorMode: "grayscale",
  backgroundColor: "#ffffff",
  foregroundColor: "#000000",
  cellSize: 8,
  contrast: 1.2,
  brightness: 0,
  invert: false,
};

function getColor(
  mode: AsciiColorMode,
  brightness: number,
  r: number,
  g: number,
  b: number,
  fgColor: string
): string {
  switch (mode) {
    case "colored":
      return `rgb(${r},${g},${b})`;
    case "grayscale": {
      const gray = Math.floor(brightness * 255);
      return `rgb(${gray},${gray},${gray})`;
    }
    case "matrix": {
      const intensity = Math.floor(100 + brightness * 155);
      return `rgb(0,${intensity},0)`;
    }
    case "neon": {
      const hue = brightness * 300;
      return `hsl(${hue}, 100%, ${50 + brightness * 30}%)`;
    }
    case "cyberpunk": {
      if (brightness > 0.5) {
        return `rgb(${Math.floor(255 * brightness)},0,${Math.floor(255 * brightness)})`;
      }
      return `rgb(0,${Math.floor(255 * brightness)},${Math.floor(255 * brightness)})`;
    }
    default:
      return fgColor;
  }
}

interface AsciiImageProps {
  src: string;
  alt?: string;
  className?: string;
  options?: AsciiOptions;
  fill?: boolean;
}

export function AsciiImage({ src, alt = "", className, options = {}, fill = false }: AsciiImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const chars = CHARSETS[opts.charset] || CHARSETS.standard;

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = opts.cellSize;
    let cols: number;
    let rows: number;

    if (fill && containerRef.current) {
      // Use container dimensions for fill mode
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      cols = Math.ceil(containerWidth / cellSize);
      rows = Math.ceil(containerHeight / cellSize);
    } else {
      // Use image dimensions
      cols = Math.floor(img.naturalWidth / cellSize);
      rows = Math.floor(img.naturalHeight / cellSize);
    }

    if (cols === 0 || rows === 0) return;

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    const offscreen = document.createElement("canvas");
    offscreen.width = cols;
    offscreen.height = rows;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    offCtx.drawImage(img, 0, 0, cols, rows);
    const imageData = offCtx.getImageData(0, 0, cols, rows);
    const pixels = imageData.data;

    ctx.fillStyle = opts.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = cellSize * 1.2;
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        brightness = (brightness - 0.5) * opts.contrast + 0.5 + opts.brightness;
        brightness = Math.max(0, Math.min(1, brightness));

        if (opts.invert) {
          brightness = 1 - brightness;
        }

        const charIndex = Math.floor(brightness * (chars.length - 1));
        const char = chars[charIndex];

        const color = getColor(opts.colorMode, brightness, r, g, b, opts.foregroundColor);

        ctx.fillStyle = color;
        ctx.fillText(char, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      }
    }
  }, [opts, chars, fill]);

  useEffect(() => {
    const img = new Image();
    // Only set crossOrigin for external URLs (not local ones starting with /)
    if (!src.startsWith("/")) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
      setError(null);
    };

    img.onerror = () => {
      setError("Failed to load image");
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  useEffect(() => {
    if (isLoaded) {
      render();
    }
  }, [isLoaded, render]);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-100 text-red-500 p-4", className)}>
        {error}
      </div>
    );
  }

  if (fill) {
    return (
      <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={cn("w-full h-auto", isLoaded ? "opacity-100" : "opacity-0")}
        aria-label={alt}
      />
    </div>
  );
}

interface AsciiVideoProps {
  src: string;
  className?: string;
  options?: AsciiOptions;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export function AsciiVideo({
  src,
  className,
  options = {},
  autoPlay = true,
  loop = true,
  muted = true,
}: AsciiVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const chars = CHARSETS[opts.charset] || CHARSETS.standard;

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || video.paused || video.ended) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = opts.cellSize;
    const cols = Math.floor(video.videoWidth / cellSize);
    const rows = Math.floor(video.videoHeight / cellSize);

    if (cols === 0 || rows === 0) return;

    if (canvas.width !== cols * cellSize || canvas.height !== rows * cellSize) {
      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;
    }

    const offscreen = document.createElement("canvas");
    offscreen.width = cols;
    offscreen.height = rows;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    offCtx.drawImage(video, 0, 0, cols, rows);
    const imageData = offCtx.getImageData(0, 0, cols, rows);
    const pixels = imageData.data;

    ctx.fillStyle = opts.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = cellSize * 1.2;
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        brightness = (brightness - 0.5) * opts.contrast + 0.5 + opts.brightness;
        brightness = Math.max(0, Math.min(1, brightness));

        if (opts.invert) {
          brightness = 1 - brightness;
        }

        const charIndex = Math.floor(brightness * (chars.length - 1));
        const char = chars[charIndex];

        const color = getColor(opts.colorMode, brightness, r, g, b, opts.foregroundColor);

        ctx.fillStyle = color;
        ctx.fillText(char, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      }
    }

    animationRef.current = requestAnimationFrame(render);
  }, [opts, chars]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setError(null);
      if (autoPlay) {
        video.play().catch(() => {});
      }
    };

    const handlePlay = () => {
      render();
    };

    const handleError = () => {
      setError("Failed to load video");
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("error", handleError);
      cancelAnimationFrame(animationRef.current);
    };
  }, [render, autoPlay]);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-100 text-red-500 p-4", className)}>
        {error}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 min-h-[300px]">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={cn("w-full h-auto", isLoaded ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
