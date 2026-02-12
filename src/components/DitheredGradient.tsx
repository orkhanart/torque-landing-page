"use client";

import React, { useRef, useEffect } from "react";

interface DitheredGradientProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  animate?: boolean;
}

// Bayer 8x8 dither matrix for smoother gradients
const bayerMatrix8x8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

const DitheredGradient: React.FC<DitheredGradientProps> = ({
  className = "",
  intensity = "subtle",
  animate = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = 1; // Keep pixelated look
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    updateSize();

    // Colors
    const colors = {
      dark: { r: 10, g: 15, b: 28 },      // #0A0F1C
      cyan: { r: 171, g: 255, b: 255 },   // #ABFFFF
      mid: { r: 60, g: 100, b: 120 },     // Mid tone
      light: { r: 255, g: 255, b: 255 },  // White
    };

    // Intensity multiplier
    const intensityMap = {
      subtle: 0.15,
      medium: 0.3,
      strong: 0.5,
    };
    const mult = intensityMap[intensity];

    // Pixel size for dithering
    const pixelSize = 3;

    // Simplex-like noise function
    const noise = (x: number, y: number, t: number) => {
      const val =
        Math.sin(x * 0.02 + t) * 0.5 +
        Math.sin(y * 0.015 + t * 0.7) * 0.3 +
        Math.sin((x + y) * 0.01 + t * 0.5) * 0.2 +
        Math.sin(x * 0.005 - y * 0.005 + t * 0.3) * 0.4;
      return (val + 1.4) / 2.8; // Normalize to 0-1
    };

    // Dither function
    const dither = (x: number, y: number, value: number) => {
      const matrixX = x % 8;
      const matrixY = y % 8;
      const threshold = bayerMatrix8x8[matrixY * 8 + matrixX] / 64;
      return value > threshold ? 1 : 0;
    };

    // Render frame
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let py = 0; py < height; py += pixelSize) {
        for (let px = 0; px < width; px += pixelSize) {
          // Get noise value at this position
          const nx = px + mouseRef.current.x * 50;
          const ny = py + mouseRef.current.y * 50;
          let n = noise(nx, ny, timeRef.current);

          // Add mouse influence - subtle glow near cursor
          const mx = mouseRef.current.x * width;
          const my = mouseRef.current.y * height;
          const dist = Math.sqrt((px - mx) ** 2 + (py - my) ** 2);
          const mouseInfluence = Math.max(0, 1 - dist / 300) * 0.3;
          n = Math.min(1, n + mouseInfluence);

          // Apply intensity
          n = n * mult;

          // Dither to determine color
          const ditherValue = dither(Math.floor(px / pixelSize), Math.floor(py / pixelSize), n);

          // Color selection based on dither
          let r, g, b, a;
          if (ditherValue === 0) {
            // Background (transparent or very light)
            r = 255;
            g = 255;
            b = 255;
            a = 0;
          } else {
            // Cyan accent
            r = colors.cyan.r;
            g = colors.cyan.g;
            b = colors.cyan.b;
            a = Math.floor(n * 255 * 0.6);
          }

          // Fill pixel block
          for (let dy = 0; dy < pixelSize && py + dy < height; dy++) {
            for (let dx = 0; dx < pixelSize && px + dx < width; dx++) {
              const i = ((py + dy) * width + (px + dx)) * 4;
              data[i] = r;
              data[i + 1] = g;
              data[i + 2] = b;
              data[i + 3] = a;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop
    const loop = () => {
      if (animate) {
        timeRef.current += 0.008;
      }
      render();
      animationRef.current = requestAnimationFrame(loop);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateSize);

    loop();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateSize);
    };
  }, [intensity, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default DitheredGradient;
