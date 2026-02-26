"use client";

import React, { useEffect, useRef } from "react";

interface ROICascadeProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function ROICascade({ color = "#0000FF", className = "", paused = false }: ROICascadeProps) {
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

    // Cascade dot
    interface CascadeDot {
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      alpha: number;
      generation: number;
      splitTimer: number;
      hasSplit: boolean;
      settled: boolean;
    }

    let dots: CascadeDot[] = [];
    let poolHeight = 0;
    let time = 0;
    let cycleTimer = 0;
    let fadeOut = 0;
    let phase: "cascading" | "collecting" | "fading" = "cascading";

    // Split thresholds by generation (y-position fractions)
    const splitLevels = [0.15, 0.35, 0.55, 0.72];

    const spawnInitial = () => {
      dots = [];
      poolHeight = 0;
      fadeOut = 0;
      phase = "cascading";
      cycleTimer = 0;
      dots.push({
        x: w / 2,
        y: h * 0.06,
        vy: 0.4,
        vx: 0,
        size: 3.5,
        alpha: 0.9,
        generation: 0,
        splitTimer: 0,
        hasSplit: false,
        settled: false,
      });
    };

    spawnInitial();

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const globalAlpha = phase === "fading" ? Math.max(0, 1 - fadeOut) : 1;

      // Labels
      ctx.globalAlpha = globalAlpha * 0.3;
      ctx.font = "bold 9px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = color;
      ctx.fillText("1 SOL", w / 2, h * 0.04 + 4);

      ctx.fillText("100 SOL", w / 2, h * 0.97);
      ctx.globalAlpha = 1;

      // Draw split level lines (subtle)
      splitLevels.forEach((level, i) => {
        const y = h * level;
        ctx.beginPath();
        ctx.moveTo(w * 0.15, y);
        ctx.lineTo(w * 0.85, y);
        ctx.strokeStyle = `${color}06`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Multiplier label
        ctx.globalAlpha = globalAlpha * 0.15;
        ctx.font = "7px system-ui";
        ctx.textAlign = "right";
        ctx.fillStyle = color;
        ctx.fillText(`${Math.pow(2, i + 1)}x`, w * 0.13, y + 3);
        ctx.globalAlpha = 1;
      });

      // Update dots
      const newDots: CascadeDot[] = [];
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        if (dot.settled) continue;

        dot.y += dot.vy;
        dot.x += dot.vx;
        dot.vx *= 0.99;
        dot.vy = Math.min(dot.vy + 0.015, 1.8);

        // Check split levels
        if (!dot.hasSplit && dot.generation < splitLevels.length) {
          const splitY = h * splitLevels[dot.generation];
          if (dot.y >= splitY) {
            dot.hasSplit = true;
            // Split into two children
            const spread = (15 + dot.generation * 8) * (0.8 + Math.random() * 0.4);
            for (let s = 0; s < 2; s++) {
              newDots.push({
                x: dot.x,
                y: dot.y,
                vy: dot.vy * 0.6,
                vx: (s === 0 ? -1 : 1) * (spread * 0.04),
                size: Math.max(1.5, dot.size * 0.8),
                alpha: dot.alpha * 0.9,
                generation: dot.generation + 1,
                splitTimer: 0,
                hasSplit: false,
                settled: false,
              });
            }
            dot.alpha *= 0.3; // Parent fades
          }
        }

        // Settle at bottom
        const bottomY = h * 0.88;
        if (dot.y >= bottomY) {
          dot.settled = true;
          dot.y = bottomY;
          poolHeight = Math.min(h * 0.15, poolHeight + 0.6);
        }
      }
      dots.push(...newDots);

      // Draw connection lines (parent to child visualization via cascade lines)
      ctx.globalAlpha = globalAlpha;
      splitLevels.forEach((level, i) => {
        const y = h * level;
        // Draw a small funnel shape at each split level
        const spread = 10 + i * 25;
        ctx.beginPath();
        ctx.moveTo(w / 2, y - 5);
        ctx.lineTo(w / 2 - spread, y + 5);
        ctx.moveTo(w / 2, y - 5);
        ctx.lineTo(w / 2 + spread, y + 5);
        ctx.strokeStyle = `${color}08`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw collecting pool at bottom
      if (poolHeight > 0) {
        const poolY = h * 0.88;
        const poolW = w * 0.7;
        const poolX = (w - poolW) / 2;

        // Pool glow
        const pg = ctx.createLinearGradient(0, poolY, 0, poolY + poolHeight);
        pg.addColorStop(0, `${color}${hex(globalAlpha * 15)}`);
        pg.addColorStop(1, `${color}${hex(globalAlpha * 5)}`);
        ctx.fillStyle = pg;
        ctx.fillRect(poolX, poolY, poolW, poolHeight);

        // Pool border
        ctx.strokeStyle = `${color}${hex(globalAlpha * 0.2 * 255)}`;
        ctx.lineWidth = 1;
        ctx.strokeRect(poolX, poolY, poolW, poolHeight);

        // Pool surface shimmer
        const shimmer = Math.sin(time * 2) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(poolX, poolY);
        ctx.lineTo(poolX + poolW, poolY);
        ctx.strokeStyle = `${color}${hex(globalAlpha * (0.1 + shimmer * 0.15) * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw dots
      for (const dot of dots) {
        if (dot.settled) continue;
        const da = dot.alpha * globalAlpha;
        if (da < 0.01) continue;

        // Trail
        const trailLen = dot.vy * 4;
        const tg = ctx.createLinearGradient(dot.x, dot.y - trailLen, dot.x, dot.y);
        tg.addColorStop(0, `${color}00`);
        tg.addColorStop(1, `${color}${hex(da * 0.3 * 255)}`);
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y - trailLen);
        ctx.lineTo(dot.x, dot.y);
        ctx.strokeStyle = tg;
        ctx.lineWidth = dot.size * 0.8;
        ctx.stroke();

        // Dot glow
        const dg = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 3);
        dg.addColorStop(0, `${color}${hex(da * 30)}`);
        dg.addColorStop(1, `${color}00`);
        ctx.fillStyle = dg;
        ctx.beginPath(); ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2); ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(da * 0.7 * 255)}`;
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Phase management
      const allSettled = dots.length > 1 && dots.every(d => d.settled || d.alpha < 0.05);
      if (allSettled && phase === "cascading") {
        phase = "collecting";
        cycleTimer = 0;
      }
      if (phase === "collecting") {
        cycleTimer += 0.016;
        if (cycleTimer > 2) {
          phase = "fading";
          fadeOut = 0;
        }
      }
      if (phase === "fading") {
        fadeOut += 0.015;
        if (fadeOut >= 1) {
          spawnInitial();
        }
      }

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

export default ROICascade;
