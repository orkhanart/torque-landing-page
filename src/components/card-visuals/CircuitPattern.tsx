"use client";

import React, { useEffect, useRef } from "react";

interface CircuitPatternProps {
  color?: string;
  className?: string;
}

export function CircuitPattern({
  color = "#0000FF",
  className = "",
}: CircuitPatternProps) {
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

    // Circuit paths
    interface Node {
      x: number;
      y: number;
      connections: number[];
    }

    const nodes: Node[] = [];
    const nodeCount = 15;
    const gridSize = 40;

    // Create grid-aligned nodes
    const cols = Math.floor(canvas.width / window.devicePixelRatio / gridSize);
    const rows = Math.floor(canvas.height / window.devicePixelRatio / gridSize);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.floor(Math.random() * cols) + 0.5) * gridSize,
        y: (Math.floor(Math.random() * rows) + 0.5) * gridSize,
        connections: [],
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const nearby = nodes
        .map((n, j) => ({ index: j, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
        .filter((n) => n.index !== i && n.dist < gridSize * 4)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2);

      nearby.forEach((n) => {
        if (!node.connections.includes(n.index)) {
          node.connections.push(n.index);
        }
      });
    });

    let time = 0;
    const pulses: { pathIndex: number; progress: number; speed: number }[] = [];

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      time += 0.016;

      // Draw circuit paths
      nodes.forEach((node, i) => {
        node.connections.forEach((connIndex) => {
          const target = nodes[connIndex];
          const midX = (node.x + target.x) / 2;

          ctx.beginPath();
          ctx.strokeStyle = `${color}15`;
          ctx.lineWidth = 1;

          // L-shaped paths
          if (Math.abs(node.x - target.x) > Math.abs(node.y - target.y)) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(midX, node.y);
            ctx.lineTo(midX, target.y);
            ctx.lineTo(target.x, target.y);
          } else {
            const midY = (node.y + target.y) / 2;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.x, midY);
            ctx.lineTo(target.x, midY);
            ctx.lineTo(target.x, target.y);
          }
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = `${color}30`;
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add new pulses randomly
      if (Math.random() < 0.02 && pulses.length < 5) {
        const nodeIndex = Math.floor(Math.random() * nodes.length);
        if (nodes[nodeIndex].connections.length > 0) {
          pulses.push({
            pathIndex: nodeIndex,
            progress: 0,
            speed: 0.5 + Math.random() * 0.5,
          });
        }
      }

      // Update and draw pulses
      pulses.forEach((pulse, i) => {
        pulse.progress += pulse.speed * 0.02;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          return;
        }

        const node = nodes[pulse.pathIndex];
        if (!node || node.connections.length === 0) return;

        const target = nodes[node.connections[0]];
        if (!target) return;

        // Calculate position along path
        const t = pulse.progress;
        let px, py;

        if (Math.abs(node.x - target.x) > Math.abs(node.y - target.y)) {
          const midX = (node.x + target.x) / 2;
          if (t < 0.33) {
            px = node.x + (midX - node.x) * (t * 3);
            py = node.y;
          } else if (t < 0.66) {
            px = midX;
            py = node.y + (target.y - node.y) * ((t - 0.33) * 3);
          } else {
            px = midX + (target.x - midX) * ((t - 0.66) * 3);
            py = target.y;
          }
        } else {
          const midY = (node.y + target.y) / 2;
          if (t < 0.33) {
            px = node.x;
            py = node.y + (midY - node.y) * (t * 3);
          } else if (t < 0.66) {
            px = node.x + (target.x - node.x) * ((t - 0.33) * 3);
            py = midY;
          } else {
            px = target.x;
            py = midY + (target.y - midY) * ((t - 0.66) * 3);
          }
        }

        // Draw pulse glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 15);
        gradient.addColorStop(0, `${color}80`);
        gradient.addColorStop(1, `${color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, 15, 0, Math.PI * 2);
        ctx.fill();

        // Draw pulse core
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });

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

export default CircuitPattern;
