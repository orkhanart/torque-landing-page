"use client";

import React, { useEffect, useRef } from "react";

interface NeuralPulseProps {
  color?: string;
  nodeCount?: number;
  className?: string;
}

export function NeuralPulse({
  color = "#0000FF",
  nodeCount = 12,
  className = "",
}: NeuralPulseProps) {
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

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      pulsePhase: number;
      pulseSpeed: number;
      size: number;
    }

    const nodes: Node[] = [];
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        size: 2 + Math.random() * 2,
      });
    }

    let time = 0;

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      time += 0.016;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move node
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Draw connections
        nodes.forEach((other, j) => {
          if (j <= i) return;
          const dist = Math.hypot(other.x - node.x, other.y - node.y);
          const maxDist = 80;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.3;

            // Animate connection with pulse
            const pulseAlpha =
              (Math.sin(time * 2 + node.pulsePhase + other.pulsePhase) * 0.5 + 0.5) *
              alpha;

            ctx.beginPath();
            ctx.strokeStyle = `${color}${Math.floor(pulseAlpha * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes on top
      nodes.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const glowSize = node.size + pulse * 4;

        // Glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowSize * 2
        );
        gradient.addColorStop(0, `${color}40`);
        gradient.addColorStop(1, `${color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${Math.floor((0.5 + pulse * 0.5) * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central "brain" indicator
      const centerX = width / 2;
      const centerY = height / 2;
      const brainPulse = Math.sin(time * 1.5) * 0.5 + 0.5;

      // Central glow
      const centerGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        30 + brainPulse * 10
      );
      centerGradient.addColorStop(0, `${color}20`);
      centerGradient.addColorStop(0.5, `${color}10`);
      centerGradient.addColorStop(1, `${color}00`);
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30 + brainPulse * 10, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

export default NeuralPulse;
