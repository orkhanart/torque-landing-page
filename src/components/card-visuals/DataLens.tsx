"use client";

import React, { useEffect, useRef } from "react";

interface DataLensProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function DataLens({ color = "#0000FF", className = "", paused = false }: DataLensProps) {
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

    const hex = (v: number) => Math.floor(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
    }

    interface Attractor {
      x: number;
      y: number;
      radius: number;
      strength: number;
      life: number;
      maxLife: number;
    }

    // Trail ring left behind when a cluster dissolves
    interface Ring {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }

    let particles: Particle[] = [];
    let attractors: Attractor[] = [];
    let rings: Ring[] = [];
    let attractorTimer = 0;

    const particleCount = 200;

    const init = () => {
      particles = [];
      attractors = [];
      rings = [];
      for (let i = 0; i < particleCount; i++) {
        const s = 1.5 + Math.random() * 2.5;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: s,
          baseSize: s,
        });
      }
    };

    const spawnAttractor = () => {
      attractors.push({
        x: w * 0.1 + Math.random() * w * 0.8,
        y: h * 0.1 + Math.random() * h * 0.8,
        radius: 100 + Math.random() * 140,
        strength: 0,
        life: 0,
        maxLife: 3.5 + Math.random() * 3,
      });
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width; h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      init();
    };
    resize();

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Spawn attractors — keep 3-4 alive
      attractorTimer += 0.016;
      if (attractorTimer > 1.8 && attractors.length < 4) {
        attractorTimer = 0;
        spawnAttractor();
      }

      // Update attractors
      for (let i = attractors.length - 1; i >= 0; i--) {
        const a = attractors[i];
        a.life += 0.016;

        const progress = a.life / a.maxLife;
        if (progress < 0.15) {
          a.strength = progress / 0.15;
        } else if (progress < 0.65) {
          a.strength = 1;
        } else if (progress < 1) {
          a.strength = (1 - progress) / 0.35;
        } else {
          // Spawn dissolve ring
          rings.push({ x: a.x, y: a.y, radius: 0, maxRadius: a.radius * 1.5, alpha: 0.4 });
          attractors.splice(i, 1);
          continue;
        }

        // Attractor ring
        if (a.strength > 0.05) {
          const r = a.radius * (0.5 + a.strength * 0.5);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${hex(a.strength * 0.12 * 255)}`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Second inner ring
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${hex(a.strength * 0.06 * 255)}`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Radial glow
          const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r);
          glow.addColorStop(0, `${color}${hex(a.strength * 0.07 * 255)}`);
          glow.addColorStop(0.6, `${color}${hex(a.strength * 0.03 * 255)}`);
          glow.addColorStop(1, `${color}00`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update dissolve rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += 3;
        r.alpha *= 0.97;
        if (r.alpha < 0.01 || r.radius > r.maxRadius) { rings.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(r.alpha * 255)}`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Update particles
      particles.forEach(p => {
        let pullX = 0, pullY = 0;
        let totalPull = 0;

        attractors.forEach(a => {
          if (a.strength < 0.05) return;
          const dx = a.x - p.x;
          const dy = a.y - p.y;
          const d = Math.max(Math.hypot(dx, dy), 1);
          if (d > a.radius * 2.5) return;

          const pull = a.strength * (1 - Math.min(d / (a.radius * 1.8), 1)) * 0.12;
          pullX += (dx / d) * pull;
          pullY += (dy / d) * pull;
          totalPull += pull;
        });

        p.vx += pullX;
        p.vy += pullY;

        // Drift when free
        if (totalPull < 0.01) {
          p.vx += (Math.random() - 0.5) * 0.06;
          p.vy += (Math.random() - 0.5) * 0.06;
        }

        // Damping
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Speed limit
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3;
          p.vy = (p.vy / speed) * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Grow when clustered
        p.size += ((totalPull > 0.02 ? p.baseSize * 1.6 : p.baseSize) - p.size) * 0.05;

        // Wrap
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;
      });

      // Draw connections — batch into single path per alpha range for perf
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > 70 || Math.abs(dy) > 70) continue;
          const d = Math.hypot(dx, dy);
          if (d > 70) continue;

          const alpha = (1 - d / 70) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Draw particles
      particles.forEach(p => {
        const speed = Math.hypot(p.vx, p.vy);
        const activity = Math.min(speed / 2, 1);
        const alpha = 0.25 + activity * 0.55;

        // Glow
        if (activity > 0.15) {
          const gr = p.size * 6;
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
          glow.addColorStop(0, `${color}${hex(activity * 0.2 * 255)}`);
          glow.addColorStop(1, `${color}00`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(alpha * 255)}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

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

export default DataLens;
