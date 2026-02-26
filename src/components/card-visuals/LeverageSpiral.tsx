"use client";

import React, { useEffect, useRef } from "react";

interface LeverageSpiralProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function LeverageSpiral({ color = "#0000FF", className = "", paused = false }: LeverageSpiralProps) {
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

    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.min(w, h) * 0.38;
    const totalTurns = 3.5;
    const totalAngle = totalTurns * Math.PI * 2;

    // Spiral parametric: angle -> radius
    const spiralR = (angle: number) => {
      return (angle / totalAngle) * maxRadius + 8;
    };

    // Threshold markers (in terms of normalized 0-1 along spiral)
    const thresholds = [
      { t: 0.0, label: "1x" },
      { t: 0.43, label: "3x" },
      { t: 0.85, label: "5x" },
    ];

    const threshold3xAngle = 0.43 * totalAngle;

    // Traveling dots
    interface SpiralDot {
      angle: number; // current position on spiral
      speed: number;
      size: number;
      baseAlpha: number;
      trailLength: number;
    }

    const dots: SpiralDot[] = [];
    for (let i = 0; i < 5; i++) {
      dots.push({
        angle: (i / 5) * totalAngle * 0.6,
        speed: 0.018 + Math.random() * 0.008,
        size: 1.5 + i * 0.3,
        baseAlpha: 0.5 + Math.random() * 0.3,
        trailLength: 0.3 + Math.random() * 0.2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const pulse = Math.sin(time * 1.5) * 0.5 + 0.5;

      // Draw spiral path
      const spiralSteps = 300;
      ctx.beginPath();
      for (let i = 0; i <= spiralSteps; i++) {
        const angle = (i / spiralSteps) * totalAngle;
        const r = spiralR(angle);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `${color}${hex((0.06 + pulse * 0.02) * 255)}`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw 3x threshold ring
      const threshR = spiralR(threshold3xAngle);
      ctx.beginPath();
      ctx.arc(cx, cy, threshR, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}${hex((0.1 + pulse * 0.08) * 255)}`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Threshold ring glow
      const rg = ctx.createRadialGradient(cx, cy, threshR - 8, cx, cy, threshR + 8);
      rg.addColorStop(0, `${color}00`);
      rg.addColorStop(0.5, `${color}${hex((0.03 + pulse * 0.03) * 255)}`);
      rg.addColorStop(1, `${color}00`);
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(cx, cy, threshR + 8, 0, Math.PI * 2); ctx.fill();

      // Draw threshold labels
      thresholds.forEach(th => {
        const angle = th.t * totalAngle;
        const r = spiralR(angle);
        const lx = cx + Math.cos(angle) * (r + 14);
        const ly = cy + Math.sin(angle) * (r + 14);

        ctx.font = "bold 8px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `${color}${hex(0.25 * 255)}`;
        ctx.fillText(th.label, lx, ly);
      });

      // Update and draw dots
      dots.forEach(dot => {
        dot.angle += dot.speed;

        // Wrap around
        if (dot.angle > totalAngle) {
          dot.angle = dot.angle - totalAngle;
        }

        const pastThreshold = dot.angle > threshold3xAngle;
        const dotR = spiralR(dot.angle);
        const dotX = cx + Math.cos(dot.angle) * dotR;
        const dotY = cy + Math.sin(dot.angle) * dotR;

        // Size increases with position along spiral (leverage increasing)
        const normalizedPos = dot.angle / totalAngle;
        const currentSize = dot.size * (1 + normalizedPos * 1.5);
        const currentAlpha = dot.baseAlpha * (pastThreshold ? 1 : 0.7);

        // Trail
        const trailSteps = 20;
        const trailAngle = dot.trailLength * Math.PI;
        for (let t = 0; t < trailSteps; t++) {
          const tAngle = dot.angle - (t / trailSteps) * trailAngle;
          if (tAngle < 0) continue;
          const tR = spiralR(tAngle);
          const tx = cx + Math.cos(tAngle) * tR;
          const ty = cy + Math.sin(tAngle) * tR;
          const tAlpha = (1 - t / trailSteps) * currentAlpha * (pastThreshold ? 0.25 : 0.1);

          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(tAlpha * 255)}`;
          ctx.arc(tx, ty, currentSize * (1 - t / trailSteps * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }

        // Dot glow
        const glowSize = currentSize * (pastThreshold ? 4 : 2.5);
        const dg = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, glowSize);
        dg.addColorStop(0, `${color}${hex(currentAlpha * 30)}`);
        dg.addColorStop(1, `${color}00`);
        ctx.fillStyle = dg;
        ctx.beginPath(); ctx.arc(dotX, dotY, glowSize, 0, Math.PI * 2); ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(currentAlpha * 0.8 * 255)}`;
        ctx.arc(dotX, dotY, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center indicator
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${color}15`;
      ctx.fill();

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default LeverageSpiral;
