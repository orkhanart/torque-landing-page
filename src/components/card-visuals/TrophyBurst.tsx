"use client";

import React, { useEffect, useRef } from "react";

interface TrophyBurstProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function TrophyBurst({ color = "#0000FF", className = "", paused = false }: TrophyBurstProps) {
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

    // Parse base color to RGB
    const parseColor = (c: string) => {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      return { r, g, b };
    };

    // Mix color toward gold (for warm tones)
    const warmColor = (base: { r: number; g: number; b: number }, amount: number, alpha: number) => {
      const goldR = 255, goldG = 215, goldB = 0;
      const r = base.r + (goldR - base.r) * amount;
      const g = base.g + (goldG - base.g) * amount;
      const b = base.b + (goldB - base.b) * amount;
      return `#${hex(r)}${hex(g)}${hex(b)}${hex(alpha * 255)}`;
    };

    const baseRgb = parseColor(color);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      rotation: number;
      rotSpeed: number;
      type: "burst" | "confetti" | "sparkle" | "star";
      warmth: number;
    }

    const particles: Particle[] = [];
    let time = 0;
    let lastBurst = -3;

    // Draw trophy silhouette (centered)
    const drawTrophy = (cx: number, cy: number, scale: number, glowAlpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Trophy cup (trapezoid) - wider at top, narrower at bottom
      const cupTopW = 40;
      const cupBotW = 24;
      const cupH = 44;
      const cupY = -30;

      // Glow
      if (glowAlpha > 0) {
        ctx.shadowColor = warmColor(baseRgb, 0.5, 1);
        ctx.shadowBlur = 20 * glowAlpha;
      }

      // Cup body
      ctx.strokeStyle = warmColor(baseRgb, 0.3, 0.6 + glowAlpha * 0.4);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-cupTopW / 2, cupY);
      ctx.lineTo(cupTopW / 2, cupY);
      ctx.lineTo(cupBotW / 2, cupY + cupH);
      ctx.lineTo(-cupBotW / 2, cupY + cupH);
      ctx.closePath();
      ctx.stroke();

      // Cup rim
      ctx.beginPath();
      ctx.ellipse(0, cupY, cupTopW / 2 + 4, 5, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Handles (left and right arcs)
      ctx.beginPath();
      ctx.arc(-cupTopW / 2 - 8, cupY + 14, 10, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cupTopW / 2 + 8, cupY + 14, 10, Math.PI * 0.5, -Math.PI * 0.5);
      ctx.stroke();

      // Stem
      ctx.beginPath();
      ctx.moveTo(-3, cupY + cupH);
      ctx.lineTo(-3, cupY + cupH + 12);
      ctx.lineTo(3, cupY + cupH + 12);
      ctx.lineTo(3, cupY + cupH);
      ctx.stroke();

      // Base
      ctx.beginPath();
      ctx.moveTo(-18, cupY + cupH + 12);
      ctx.lineTo(18, cupY + cupH + 12);
      ctx.lineTo(14, cupY + cupH + 18);
      ctx.lineTo(-14, cupY + cupH + 18);
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Draw 4-point star
    const drawStar = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.strokeStyle = warmColor(baseRgb, 0.4, alpha);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.3, y - size * 0.3);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size * 0.3, y + size * 0.3);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.3, y + size * 0.3);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x - size * 0.3, y - size * 0.3);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    // Spawn a burst of particles
    const spawnBurst = (cx: number, cy: number) => {
      // Burst particles
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.3;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x: cx,
          y: cy - 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 1,
          maxLife: 1,
          size: 2 + Math.random() * 2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          type: "burst",
          warmth: 0.3 + Math.random() * 0.5,
        });
      }

      // Confetti rectangles
      for (let i = 0; i < 16; i++) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 80,
          y: cy - 40 - Math.random() * 40,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 0.3 + Math.random() * 0.8,
          life: 1,
          maxLife: 1,
          size: 3 + Math.random() * 4,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          type: "confetti",
          warmth: Math.random() * 0.7,
        });
      }

      // Stars
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 50;
        particles.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist - 20,
          vx: 0,
          vy: 0,
          life: 1,
          maxLife: 1,
          size: 6 + Math.random() * 8,
          rotation: 0,
          rotSpeed: 0,
          type: "star",
          warmth: 0.3 + Math.random() * 0.4,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h * 0.42;

      // Trigger burst every ~4 seconds
      if (time - lastBurst > 4) {
        spawnBurst(cx, cy);
        lastBurst = time;
      }

      // Trophy glow pulsing
      const burstPhase = time - lastBurst;
      const glowAlpha = burstPhase < 0.5
        ? Math.sin(burstPhase * Math.PI / 0.5) * 0.8
        : 0.15 + Math.sin(time * 2) * 0.1;

      // Draw trophy
      drawTrophy(cx, cy, 1.0, glowAlpha);

      // Shimmer dots between bursts
      if (burstPhase > 1.5) {
        const shimmerCount = 5;
        for (let i = 0; i < shimmerCount; i++) {
          const seed = i * 137.5 + time * 0.5;
          const sx = cx + Math.sin(seed * 3.7) * 55;
          const sy = cy + Math.cos(seed * 2.3) * 40 - 10;
          const shimmerAlpha = (Math.sin(seed * 5) * 0.5 + 0.5) * 0.5;
          ctx.fillStyle = warmColor(baseRgb, 0.5, shimmerAlpha);
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.012;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        const alpha = Math.min(1, p.life * 2);

        if (p.type === "burst") {
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.vy += 0.02; // slight gravity
          ctx.fillStyle = warmColor(baseRgb, p.warmth, alpha * 0.8);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "confetti") {
          p.vy += 0.01;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = warmColor(baseRgb, p.warmth, alpha * 0.6);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        } else if (p.type === "star") {
          const starAlpha = alpha * Math.sin(p.life * Math.PI);
          drawStar(p.x, p.y, p.size * starAlpha, starAlpha * 0.7);
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

export default TrophyBurst;
