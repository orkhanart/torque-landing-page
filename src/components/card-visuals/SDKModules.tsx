"use client";

import React, { useEffect, useRef } from "react";

interface SDKModulesProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function SDKModules({ color = "#0000FF", className = "", paused = false }: SDKModulesProps) {
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

    // Flowing particles representing data packets between SDK modules
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Anchor nodes (represent SDK modules)
    interface AnchorNode {
      x: number;
      y: number;
      radius: number;
      pulse: number;
      label: string;
    }

    let anchors: AnchorNode[] = [];

    const initAnchors = () => {
      anchors = [
        { x: w * 0.15, y: h * 0.2, radius: 30, pulse: 0, label: "SDK" },
        { x: w * 0.5, y: h * 0.12, radius: 25, pulse: 0.5, label: "API" },
        { x: w * 0.85, y: h * 0.25, radius: 28, pulse: 1, label: "UI" },
        { x: w * 0.25, y: h * 0.55, radius: 32, pulse: 1.5, label: "AUTH" },
        { x: w * 0.65, y: h * 0.5, radius: 26, pulse: 2, label: "DATA" },
        { x: w * 0.1, y: h * 0.82, radius: 24, pulse: 2.5, label: "WEB3" },
        { x: w * 0.45, y: h * 0.8, radius: 30, pulse: 3, label: "HOOK" },
        { x: w * 0.8, y: h * 0.75, radius: 27, pulse: 3.5, label: "EVENT" },
      ];
    };
    initAnchors();

    // Connections between anchors
    const connections = [
      [0, 1], [1, 2], [0, 3], [1, 4], [2, 4],
      [3, 5], [3, 6], [4, 6], [4, 7], [6, 7], [5, 6],
    ];

    let time = 0;
    let spawnTimer = 0;

    const spawnParticle = () => {
      // Pick a random connection and spawn a particle along it
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const from = anchors[conn[0]];
      const to = anchors[conn[1]];

      const speed = 2 + Math.random() * 3;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.hypot(dx, dy);
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;

      particles.push({
        x: from.x,
        y: from.y,
        vx,
        vy,
        size: 2 + Math.random() * 3,
        life: 0,
        maxLife: dist / speed / 60,
        trail: [],
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Spawn particles
      spawnTimer += 0.016;
      if (spawnTimer > 0.08 && particles.length < maxParticles) {
        spawnTimer = 0;
        spawnParticle();
      }

      // Draw connection lines
      connections.forEach(([i, j]) => {
        const a = anchors[i];
        const b = anchors[j];
        const pulse = Math.sin(time * 2 + i + j) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.07;

        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Draw anchors
      anchors.forEach(a => {
        const pulse = Math.sin(time * 2 + a.pulse) * 0.5 + 0.5;

        // Outer ring
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius + pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex((0.1 + pulse * 0.1) * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fill
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(0.04 * 255)}`;
        ctx.fill();
        ctx.strokeStyle = `${color}${hex(0.2 * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.font = "bold 9px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `${color}${hex(0.35 * 255)}`;
        ctx.fillText(a.label, a.x, a.y);
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 0.016;

        // Store trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;

        // Trail
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const ta = (t / p.trail.length) * alpha * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex(ta * 255)}`;
            ctx.lineWidth = p.size * 0.6;
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.stroke();
          }
        }

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `${color}${hex(alpha * 0.3 * 255)}`);
        glow.addColorStop(1, `${color}00`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(alpha * 0.8 * 255)}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();
    window.addEventListener("resize", () => { resize(); initAnchors(); });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default SDKModules;
