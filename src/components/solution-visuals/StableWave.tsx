"use client";

import React, { useEffect, useRef } from "react";

interface StableWaveProps {
  color?: string;
  className?: string;
}

export function StableWave({ color = "#0000FF", className = "" }: StableWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();

    let time = 0;

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      time += 0.02;

      // Draw equilibrium line
      ctx.beginPath();
      ctx.strokeStyle = `${color}20`;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw stable wave (converging to equilibrium)
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      for (let x = 0; x <= width; x++) {
        // Amplitude decreases towards the right (stabilizing)
        const progress = x / width;
        const amplitude = 20 * (1 - progress * 0.8);
        const frequency = 0.05;

        const y = centerY + Math.sin(x * frequency + time) * amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw glow effect on wave
      ctx.beginPath();
      ctx.strokeStyle = `${color}40`;
      ctx.lineWidth = 6;
      ctx.filter = "blur(3px)";

      for (let x = 0; x <= width; x++) {
        const progress = x / width;
        const amplitude = 20 * (1 - progress * 0.8);
        const y = centerY + Math.sin(x * 0.05 + time) * amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.filter = "none";

      // Draw $1.00 indicator at the end
      const endX = width - 30;
      const endY = centerY;

      ctx.fillStyle = color;
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.fillText("$1.00", endX, endY - 15);

      // Draw stable indicator
      ctx.beginPath();
      ctx.arc(endX, endY, 6, 0, Math.PI * 2);
      ctx.fillStyle = `${color}40`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(endX, endY, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

export default StableWave;
