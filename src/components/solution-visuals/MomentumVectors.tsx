"use client";

import React, { useEffect, useRef } from "react";

interface MomentumVectorsProps {
  color?: string;
  className?: string;
}

export function MomentumVectors({
  color = "#0000FF",
  className = "",
}: MomentumVectorsProps) {
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

    interface Arrow {
      x: number;
      y: number;
      angle: number;
      length: number;
      speed: number;
      targetAngle: number;
      opacity: number;
    }

    const arrows: Arrow[] = [];
    const gridSize = 40;
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Create grid of arrows
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        arrows.push({
          x: i * gridSize + gridSize / 2,
          y: j * gridSize + gridSize / 2,
          angle: Math.random() * Math.PI * 2,
          length: 12 + Math.random() * 8,
          speed: 0.02 + Math.random() * 0.02,
          targetAngle: -Math.PI / 4, // Default upward-right
          opacity: 0.3 + Math.random() * 0.4,
        });
      }
    }

    let time = 0;
    let trend = 1; // 1 = bullish, -1 = bearish

    // Draw arrow
    const drawArrow = (
      x: number,
      y: number,
      angle: number,
      length: number,
      opacity: number
    ) => {
      const headLen = 6;
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.lineWidth = 2;
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Arrowhead
      ctx.beginPath();
      ctx.fillStyle = `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - headLen * Math.cos(angle - Math.PI / 6),
        endY - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        endX - headLen * Math.cos(angle + Math.PI / 6),
        endY - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      time += 0.016;

      // Change trend periodically
      if (Math.floor(time) % 5 === 0 && Math.random() < 0.01) {
        trend = trend === 1 ? -1 : 1;
      }

      // Calculate flow field based on time
      arrows.forEach((arrow) => {
        // Create flowing pattern
        const noise =
          Math.sin(arrow.x * 0.02 + time) * Math.cos(arrow.y * 0.02 + time * 0.5);

        // Target angle based on trend and noise
        arrow.targetAngle = trend === 1
          ? -Math.PI / 4 + noise * 0.5 // Upward right
          : (3 * Math.PI) / 4 + noise * 0.5; // Downward left

        // Smooth angle transition
        const angleDiff = arrow.targetAngle - arrow.angle;
        arrow.angle += angleDiff * 0.03;

        // Pulse opacity based on position in wave
        const wave = Math.sin(arrow.x * 0.05 - time * 2) * 0.5 + 0.5;
        const currentOpacity = arrow.opacity * (0.5 + wave * 0.5);

        drawArrow(arrow.x, arrow.y, arrow.angle, arrow.length, currentOpacity);
      });

      // Draw momentum indicator
      const indicatorX = width - 50;
      const indicatorY = 30;
      const momentum = Math.sin(time * 0.5) * 50 + 50; // 0-100

      // Background bar
      ctx.fillStyle = `${color}20`;
      ctx.fillRect(indicatorX - 30, indicatorY - 5, 60, 10);

      // Fill based on momentum
      const fillWidth = (momentum / 100) * 60;
      ctx.fillStyle = trend === 1 ? "#22c55e" : "#ef4444";
      ctx.fillRect(indicatorX - 30, indicatorY - 5, fillWidth, 10);

      // Label
      ctx.fillStyle = `${color}80`;
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(trend === 1 ? "LONG" : "SHORT", indicatorX, indicatorY + 20);

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

export default MomentumVectors;
