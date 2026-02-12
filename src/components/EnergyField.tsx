"use client";

import React, { useEffect, useRef } from "react";

interface EnergyFieldProps {
  className?: string;
}

export function EnergyField({ className = "" }: EnergyFieldProps) {
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

      ctx.clearRect(0, 0, width, height);

      time += 0.005;

      // Draw flowing energy lines
      const lineCount = 8;
      for (let i = 0; i < lineCount; i++) {
        const baseY = (height / (lineCount + 1)) * (i + 1);
        const amplitude = 20 + Math.sin(time + i) * 10;
        const frequency = 0.01 + i * 0.002;
        const phase = time * (0.5 + i * 0.1);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + (i / lineCount) * 0.02})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += 5) {
          const y =
            baseY +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude * 0.3);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw floating particles
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const px =
          ((Math.sin(time * 0.3 + i * 0.5) * 0.5 + 0.5) * width * 0.8 +
            width * 0.1);
        const py =
          ((Math.cos(time * 0.2 + i * 0.7) * 0.5 + 0.5) * height * 0.6 +
            height * 0.2);
        const size = 1 + Math.sin(time + i) * 0.5;
        const alpha = 0.1 + Math.sin(time * 2 + i) * 0.05;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

export default EnergyField;
