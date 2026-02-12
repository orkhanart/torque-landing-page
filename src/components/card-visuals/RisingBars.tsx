"use client";

import React, { useEffect, useRef } from "react";

interface RisingBarsProps {
  color?: string;
  barCount?: number;
  className?: string;
}

export function RisingBars({
  color = "#0000FF",
  barCount = 8,
  className = "",
}: RisingBarsProps) {
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

    interface Bar {
      targetHeight: number;
      currentHeight: number;
      color: string;
      delay: number;
    }

    const bars: Bar[] = [];

    // Initialize bars
    for (let i = 0; i < barCount; i++) {
      bars.push({
        targetHeight: 0.3 + Math.random() * 0.6,
        currentHeight: 0,
        color: i === barCount - 2 ? color : `${color}30`, // Highlight second-to-last bar
        delay: i * 100,
      });
    }

    let time = 0;
    let lastUpdate = 0;

    // Animation loop
    const animate = (timestamp: number) => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      time = timestamp;

      // Update bar heights every 2 seconds
      if (timestamp - lastUpdate > 2000) {
        bars.forEach((bar, i) => {
          bar.targetHeight = 0.2 + Math.random() * 0.7;
          bar.delay = i * 80;
        });
        lastUpdate = timestamp;
      }

      const barWidth = (width - 20) / barCount - 4;
      const maxHeight = height - 20;

      bars.forEach((bar, i) => {
        // Smooth animation to target
        const timeSinceUpdate = timestamp - lastUpdate - bar.delay;
        if (timeSinceUpdate > 0) {
          bar.currentHeight += (bar.targetHeight - bar.currentHeight) * 0.05;
        }

        const x = 10 + i * (barWidth + 4);
        const barHeight = bar.currentHeight * maxHeight;
        const y = height - 10 - barHeight;

        // Draw bar
        ctx.fillStyle = bar.color;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();

        // Add glow to highlighted bars
        if (bar.color === color) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.fillRect(x, y, barWidth, barHeight);
          ctx.shadowBlur = 0;
        }
      });

      // Draw rank indicators
      const sortedBars = [...bars].sort((a, b) => b.currentHeight - a.currentHeight);
      const topThree = sortedBars.slice(0, 3);

      bars.forEach((bar, i) => {
        const rank = topThree.indexOf(bar);
        if (rank !== -1) {
          const x = 10 + i * (barWidth + 4) + barWidth / 2;
          const barHeight = bar.currentHeight * maxHeight;
          const y = height - 10 - barHeight - 8;

          ctx.fillStyle = rank === 0 ? "#FFD700" : rank === 1 ? "#C0C0C0" : "#CD7F32";
          ctx.font = "bold 10px system-ui";
          ctx.textAlign = "center";
          ctx.fillText(`${rank + 1}`, x, y);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, barCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

export default RisingBars;
