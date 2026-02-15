"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export type DitherAlgorithm = "floyd-steinberg" | "bayer" | "atkinson" | "ordered" | "halftone" | "noise";
export type DitherColorMode = "monochrome" | "grayscale" | "duotone" | "tritone";

export interface DitherOptions {
  algorithm?: DitherAlgorithm;
  colorMode?: DitherColorMode;
  threshold?: number;
  scale?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  contrast?: number;
  brightness?: number;
}

const DEFAULT_OPTIONS: Required<DitherOptions> = {
  algorithm: "floyd-steinberg",
  colorMode: "monochrome",
  threshold: 128,
  scale: 1,
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  tertiaryColor: "#888888",
  contrast: 1.2,
  brightness: 0,
};

// Bayer matrix for ordered dithering
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map(row => row.map(v => (v / 16) * 255));

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map(row => row.map(v => (v / 64) * 255));

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

function applyFloydSteinberg(
  imageData: ImageData,
  threshold: number,
  contrast: number,
  brightness: number
): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      // Get grayscale value
      let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      gray = (gray - 128) * contrast + 128 + brightness * 255;
      gray = Math.max(0, Math.min(255, gray));

      const oldPixel = gray;
      const newPixel = oldPixel < threshold ? 0 : 255;
      const error = oldPixel - newPixel;

      data[i] = data[i + 1] = data[i + 2] = newPixel;

      // Distribute error to neighboring pixels
      if (x + 1 < width) {
        const idx = i + 4;
        const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        const newVal = Math.max(0, Math.min(255, val + error * 7 / 16));
        data[idx] = data[idx + 1] = data[idx + 2] = newVal;
      }
      if (y + 1 < height) {
        if (x > 0) {
          const idx = ((y + 1) * width + (x - 1)) * 4;
          const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          const newVal = Math.max(0, Math.min(255, val + error * 3 / 16));
          data[idx] = data[idx + 1] = data[idx + 2] = newVal;
        }
        {
          const idx = ((y + 1) * width + x) * 4;
          const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          const newVal = Math.max(0, Math.min(255, val + error * 5 / 16));
          data[idx] = data[idx + 1] = data[idx + 2] = newVal;
        }
        if (x + 1 < width) {
          const idx = ((y + 1) * width + (x + 1)) * 4;
          const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          const newVal = Math.max(0, Math.min(255, val + error * 1 / 16));
          data[idx] = data[idx + 1] = data[idx + 2] = newVal;
        }
      }
    }
  }

  return new ImageData(data, width, height);
}

function applyAtkinson(
  imageData: ImageData,
  threshold: number,
  contrast: number,
  brightness: number
): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      gray = (gray - 128) * contrast + 128 + brightness * 255;
      gray = Math.max(0, Math.min(255, gray));

      const oldPixel = gray;
      const newPixel = oldPixel < threshold ? 0 : 255;
      const error = (oldPixel - newPixel) / 8;

      data[i] = data[i + 1] = data[i + 2] = newPixel;

      // Atkinson dithering distributes 6/8 of error
      const offsets = [
        [1, 0], [2, 0],
        [-1, 1], [0, 1], [1, 1],
        [0, 2]
      ];

      for (const [dx, dy] of offsets) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny < height) {
          const idx = (ny * width + nx) * 4;
          const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          const newVal = Math.max(0, Math.min(255, val + error));
          data[idx] = data[idx + 1] = data[idx + 2] = newVal;
        }
      }
    }
  }

  return new ImageData(data, width, height);
}

function applyBayer(
  imageData: ImageData,
  threshold: number,
  contrast: number,
  brightness: number,
  use8x8: boolean = false
): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;
  const matrix = use8x8 ? BAYER_8X8 : BAYER_4X4;
  const size = use8x8 ? 8 : 4;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      gray = (gray - 128) * contrast + 128 + brightness * 255;
      gray = Math.max(0, Math.min(255, gray));

      const bayerValue = matrix[y % size][x % size];
      const newPixel = gray > bayerValue ? 255 : 0;

      data[i] = data[i + 1] = data[i + 2] = newPixel;
    }
  }

  return new ImageData(data, width, height);
}

function applyHalftone(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  scale: number,
  contrast: number,
  brightness: number,
  primaryColor: string,
  secondaryColor: string
): void {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const dotSize = Math.max(2, Math.floor(4 * scale));

  const [pr, pg, pb] = hexToRgb(primaryColor);
  const [sr, sg, sb] = hexToRgb(secondaryColor);

  ctx.fillStyle = secondaryColor;
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += dotSize) {
    for (let x = 0; x < width; x += dotSize) {
      let totalGray = 0;
      let count = 0;

      for (let dy = 0; dy < dotSize && y + dy < height; dy++) {
        for (let dx = 0; dx < dotSize && x + dx < width; dx++) {
          const i = ((y + dy) * width + (x + dx)) * 4;
          let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          gray = (gray - 128) * contrast + 128 + brightness * 255;
          totalGray += Math.max(0, Math.min(255, gray));
          count++;
        }
      }

      const avgGray = totalGray / count;
      const radius = ((255 - avgGray) / 255) * (dotSize / 2) * 1.2;

      if (radius > 0.5) {
        ctx.beginPath();
        ctx.arc(x + dotSize / 2, y + dotSize / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.fill();
      }
    }
  }
}

function applyNoiseDither(
  imageData: ImageData,
  threshold: number,
  contrast: number,
  brightness: number
): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      gray = (gray - 128) * contrast + 128 + brightness * 255;
      gray = Math.max(0, Math.min(255, gray));

      const noise = (Math.random() - 0.5) * 128;
      const newPixel = gray + noise > threshold ? 255 : 0;

      data[i] = data[i + 1] = data[i + 2] = newPixel;
    }
  }

  return new ImageData(data, width, height);
}

function colorizeOutput(
  imageData: ImageData,
  colorMode: DitherColorMode,
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string
): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const [pr, pg, pb] = hexToRgb(primaryColor);
  const [sr, sg, sb] = hexToRgb(secondaryColor);
  const [tr, tg, tb] = hexToRgb(tertiaryColor);

  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i];

    switch (colorMode) {
      case "monochrome":
        if (gray < 128) {
          data[i] = pr; data[i + 1] = pg; data[i + 2] = pb;
        } else {
          data[i] = sr; data[i + 1] = sg; data[i + 2] = sb;
        }
        break;
      case "duotone":
        const t = gray / 255;
        data[i] = Math.round(pr * (1 - t) + sr * t);
        data[i + 1] = Math.round(pg * (1 - t) + sg * t);
        data[i + 2] = Math.round(pb * (1 - t) + sb * t);
        break;
      case "tritone":
        if (gray < 85) {
          const t = gray / 85;
          data[i] = Math.round(pr * (1 - t) + tr * t);
          data[i + 1] = Math.round(pg * (1 - t) + tg * t);
          data[i + 2] = Math.round(pb * (1 - t) + tb * t);
        } else {
          const t = (gray - 85) / 170;
          data[i] = Math.round(tr * (1 - t) + sr * t);
          data[i + 1] = Math.round(tg * (1 - t) + sg * t);
          data[i + 2] = Math.round(tb * (1 - t) + sb * t);
        }
        break;
      case "grayscale":
      default:
        // Keep as is
        break;
    }
  }

  return new ImageData(data, imageData.width, imageData.height);
}

interface DitherImageProps {
  src: string;
  alt?: string;
  className?: string;
  options?: DitherOptions;
  fill?: boolean;
}

export function DitherImage({ src, alt = "", className, options = {}, fill = false }: DitherImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const opts = { ...DEFAULT_OPTIONS, ...options };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let targetWidth: number;
    let targetHeight: number;

    if (fill && containerRef.current) {
      targetWidth = containerRef.current.offsetWidth;
      targetHeight = containerRef.current.offsetHeight;
    } else {
      targetWidth = img.naturalWidth;
      targetHeight = img.naturalHeight;
    }

    // Scale down for processing, then scale up
    const processScale = opts.scale;
    const processWidth = Math.floor(targetWidth * processScale);
    const processHeight = Math.floor(targetHeight * processScale);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Create offscreen canvas for processing
    const offscreen = document.createElement("canvas");
    offscreen.width = processWidth;
    offscreen.height = processHeight;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // Draw scaled image
    offCtx.drawImage(img, 0, 0, processWidth, processHeight);
    let imageData = offCtx.getImageData(0, 0, processWidth, processHeight);

    // Apply dithering algorithm
    switch (opts.algorithm) {
      case "floyd-steinberg":
        imageData = applyFloydSteinberg(imageData, opts.threshold, opts.contrast, opts.brightness);
        break;
      case "atkinson":
        imageData = applyAtkinson(imageData, opts.threshold, opts.contrast, opts.brightness);
        break;
      case "bayer":
        imageData = applyBayer(imageData, opts.threshold, opts.contrast, opts.brightness, false);
        break;
      case "ordered":
        imageData = applyBayer(imageData, opts.threshold, opts.contrast, opts.brightness, true);
        break;
      case "noise":
        imageData = applyNoiseDither(imageData, opts.threshold, opts.contrast, opts.brightness);
        break;
      case "halftone":
        // Halftone draws directly to canvas
        ctx.imageSmoothingEnabled = false;
        applyHalftone(ctx, imageData, opts.scale, opts.contrast, opts.brightness, opts.primaryColor, opts.secondaryColor);
        return;
    }

    // Apply color mode
    if (opts.colorMode !== "grayscale") {
      imageData = colorizeOutput(imageData, opts.colorMode, opts.primaryColor, opts.secondaryColor, opts.tertiaryColor);
    }

    // Put processed data back
    offCtx.putImageData(imageData, 0, 0);

    // Scale up to target size with nearest-neighbor interpolation
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, targetWidth, targetHeight);
  }, [opts]);

  useEffect(() => {
    const img = new Image();
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
            "w-full h-full object-cover",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ imageRendering: "pixelated" }}
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
        style={{ imageRendering: "pixelated" }}
        aria-label={alt}
      />
    </div>
  );
}
