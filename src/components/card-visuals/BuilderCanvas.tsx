"use client";

import React, { useEffect, useRef } from "react";

interface BuilderCanvasProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function BuilderCanvas({ color = "#0000FF", className = "", paused = false }: BuilderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pausedRef = useRef(paused);
  const animateFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused && animateFnRef.current) {
      animationRef.current = requestAnimationFrame(animateFnRef.current);
    }
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width; h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();

    const hex = (v: number) => Math.floor(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");

    // Blocks that stack up from bottom
    interface Block {
      targetX: number;
      targetY: number;
      currentX: number;
      currentY: number;
      width: number;
      height: number;
      opacity: number;
      placed: boolean;
    }

    let blocks: Block[] = [];
    let placeIndex = 0;
    let placeTimer = 0;
    let holdTimer = 0;
    let phase: "building" | "holding" | "clearing" = "building";

    const initBlocks = () => {
      blocks = [];
      placeIndex = 0;
      placeTimer = 0;
      holdTimer = 0;
      phase = "building";

      const cols = 3;
      const rows = 3;
      const gap = 6;
      const blockW = (w * 0.7 - gap * (cols - 1)) / cols;
      const blockH = (h * 0.6 - gap * (rows - 1)) / rows;
      const offsetX = w * 0.15;
      const offsetY = h * 0.2;

      // Create grid blocks bottom-up, left-to-right
      for (let r = rows - 1; r >= 0; r--) {
        for (let c = 0; c < cols; c++) {
          const tx = offsetX + c * (blockW + gap);
          const ty = offsetY + r * (blockH + gap);
          blocks.push({
            targetX: tx,
            targetY: ty,
            currentX: tx,
            currentY: -blockH - 20, // start above canvas
            width: blockW,
            height: blockH,
            opacity: 0,
            placed: false,
          });
        }
      }
    };
    initBlocks();

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      if (phase === "building") {
        placeTimer += 0.016;
        if (placeTimer > 0.25 && placeIndex < blocks.length) {
          placeTimer = 0;
          blocks[placeIndex].placed = true;
          placeIndex++;
        }
        if (placeIndex >= blocks.length) {
          phase = "holding";
          holdTimer = 0;
        }
      } else if (phase === "holding") {
        holdTimer += 0.016;
        if (holdTimer > 3) {
          phase = "clearing";
        }
      } else if (phase === "clearing") {
        let allGone = true;
        blocks.forEach(b => {
          b.opacity -= 0.03;
          if (b.opacity > 0) allGone = false;
        });
        if (allGone) {
          initBlocks();
        }
      }

      // Update blocks
      blocks.forEach(b => {
        if (b.placed) {
          b.currentY += (b.targetY - b.currentY) * 0.12;
          b.opacity = Math.min(b.opacity + 0.06, 1);
        }
      });

      // Draw blocks
      blocks.forEach((b, i) => {
        if (b.opacity <= 0) return;

        const alpha = Math.max(0, b.opacity);
        const pulse = phase === "holding" ? Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5 : 0;

        // Shadow/depth
        ctx.fillStyle = `${color}${hex(alpha * 0.03 * 255)}`;
        ctx.fillRect(b.currentX + 3, b.currentY + 3, b.width, b.height);

        // Block fill
        ctx.fillStyle = `${color}${hex(alpha * (0.05 + pulse * 0.03) * 255)}`;
        ctx.fillRect(b.currentX, b.currentY, b.width, b.height);

        // Block border
        ctx.strokeStyle = `${color}${hex(alpha * (0.2 + pulse * 0.15) * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.currentX, b.currentY, b.width, b.height);

        // Inner line accent
        ctx.beginPath();
        ctx.moveTo(b.currentX + 8, b.currentY + b.height * 0.5);
        ctx.lineTo(b.currentX + b.width * 0.6, b.currentY + b.height * 0.5);
        ctx.strokeStyle = `${color}${hex(alpha * 0.12 * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();
    window.addEventListener("resize", () => { resize(); initBlocks(); });
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener("resize", resize); };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default BuilderCanvas;
