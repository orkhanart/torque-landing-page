"use client";

import React, { useEffect, useRef } from "react";

interface StandardsGridProps {
  color?: string;
  className?: string;
  paused?: boolean;
  speed?: number;
}

export function StandardsGrid({ color = "#0000FF", className = "", paused = false, speed: speedProp = 1 }: StandardsGridProps) {
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

    const centerX = w / 2;
    const centerY = h * 0.35;
    const baseRadius = Math.min(w, h) * 0.16;
    const spread = baseRadius * 0.55; // distance between ring centers

    // Three rings positioned in a triangle
    interface Ring {
      cx: number;
      cy: number;
      radius: number;
      rotSpeed: number;     // rotation speed of travelling dot
      dotAngle: number;     // current dot position
      breathPhase: number;  // phase offset for breathing
      breathSpeed: number;
      strokeAlpha: number;
    }

    const rings: Ring[] = [
      { // V - top
        cx: centerX,
        cy: centerY - spread * 0.65,
        radius: baseRadius,
        rotSpeed: 0.018,
        dotAngle: 0,
        breathPhase: 0,
        breathSpeed: 0.8,
        strokeAlpha: 0.12,
      },
      { // Q - bottom left
        cx: centerX - spread * 0.85,
        cy: centerY + spread * 0.55,
        radius: baseRadius * 0.92,
        rotSpeed: -0.014,
        dotAngle: Math.PI * 0.7,
        breathPhase: Math.PI * 0.66,
        breathSpeed: 1.0,
        strokeAlpha: 0.12,
      },
      { // R - bottom right
        cx: centerX + spread * 0.85,
        cy: centerY + spread * 0.55,
        radius: baseRadius * 0.96,
        rotSpeed: 0.011,
        dotAngle: Math.PI * 1.4,
        breathPhase: Math.PI * 1.33,
        breathSpeed: 0.9,
        strokeAlpha: 0.12,
      },
    ];

    // Floating particles that drift between rings
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      targetRing: number; // which ring to drift toward
      life: number;
    }

    const particles: Particle[] = [];
    let particleTimer = 0;

    const spawnParticle = () => {
      const fromRing = Math.floor(Math.random() * 3);
      const toRing = (fromRing + 1 + Math.floor(Math.random() * 2)) % 3;
      const angle = Math.random() * Math.PI * 2;
      const r = rings[fromRing];
      particles.push({
        x: r.cx + Math.cos(angle) * r.radius * 0.5,
        y: r.cy + Math.sin(angle) * r.radius * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.3,
        targetRing: toRing,
        life: 1,
      });
    };

    // Seed initial particles
    for (let i = 0; i < 8; i++) spawnParticle();

    let time = 0;

    // Find intersection points between two circles
    const circleIntersections = (
      x1: number, y1: number, r1: number,
      x2: number, y2: number, r2: number
    ): [number, number][] => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const d = Math.hypot(dx, dy);
      if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) return [];
      const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
      const hh = Math.sqrt(Math.max(0, r1 * r1 - a * a));
      const mx = x1 + a * dx / d;
      const my = y1 + a * dy / d;
      return [
        [mx + hh * dy / d, my - hh * dx / d],
        [mx - hh * dy / d, my + hh * dx / d],
      ];
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016 * speedProp;

      // Calculate breathing radii
      const currentRadii = rings.map((ring, i) => {
        const breath = Math.sin(time * ring.breathSpeed + ring.breathPhase) * 0.06;
        return ring.radius * (1 + breath);
      });

      // Draw rings
      rings.forEach((ring, i) => {
        const r = currentRadii[i];

        // Ring fill (very subtle)
        const fg = ctx.createRadialGradient(ring.cx, ring.cy, r * 0.3, ring.cx, ring.cy, r);
        fg.addColorStop(0, `${color}${hex(0.02 * 255)}`);
        fg.addColorStop(1, `${color}00`);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(ring.cx, ring.cy, r, 0, Math.PI * 2);
        ctx.fill();

        // Ring stroke
        ctx.beginPath();
        ctx.arc(ring.cx, ring.cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(ring.strokeAlpha * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Update travelling dot
        ring.dotAngle += ring.rotSpeed * speedProp;

        // Travelling dot position
        const dotX = ring.cx + Math.cos(ring.dotAngle) * r;
        const dotY = ring.cy + Math.sin(ring.dotAngle) * r;

        // Dot trail (arc behind the dot)
        const trailLen = 0.5;
        const trailStart = ring.dotAngle - trailLen * Math.sign(ring.rotSpeed);
        ctx.beginPath();
        if (ring.rotSpeed > 0) {
          ctx.arc(ring.cx, ring.cy, r, trailStart, ring.dotAngle);
        } else {
          ctx.arc(ring.cx, ring.cy, r, ring.dotAngle, trailStart);
        }
        ctx.strokeStyle = `${color}${hex(0.15 * 255)}`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dot glow
        const dg = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 10);
        dg.addColorStop(0, `${color}${hex(0.3 * 255)}`);
        dg.addColorStop(1, `${color}00`);
        ctx.fillStyle = dg;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 10, 0, Math.PI * 2);
        ctx.fill();

        // Dot core
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(0.6 * 255)}`;
        ctx.fill();
      });

      // Draw intersection glows
      for (let i = 0; i < rings.length; i++) {
        for (let j = i + 1; j < rings.length; j++) {
          const pts = circleIntersections(
            rings[i].cx, rings[i].cy, currentRadii[i],
            rings[j].cx, rings[j].cy, currentRadii[j]
          );
          pts.forEach(([px, py]) => {
            // Pulsing glow at intersection
            const pulse = Math.sin(time * 2 + i * 1.5 + j * 2.3) * 0.5 + 0.5;
            const glowR = 6 + pulse * 4;
            const glowAlpha = 0.08 + pulse * 0.12;

            const ig = ctx.createRadialGradient(px, py, 0, px, py, glowR);
            ig.addColorStop(0, `${color}${hex(glowAlpha * 255)}`);
            ig.addColorStop(1, `${color}00`);
            ctx.fillStyle = ig;
            ctx.beginPath();
            ctx.arc(px, py, glowR, 0, Math.PI * 2);
            ctx.fill();

            // Small bright dot
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `${color}${hex((0.15 + pulse * 0.2) * 255)}`;
            ctx.fill();
          });
        }
      }

      // Spawn and update floating particles
      particleTimer += 0.016 * speedProp;
      if (particleTimer > 0.4 && particles.length < 15) {
        particleTimer = 0;
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const target = rings[p.targetRing];

        // Drift toward target ring center
        const dx = target.cx - p.x;
        const dy = target.cy - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 1) {
          p.vx += (dx / dist) * 0.012 * speedProp;
          p.vy += (dy / dist) * 0.012 * speedProp;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx * speedProp;
        p.y += p.vy * speedProp;
        p.life -= 0.004 * speedProp;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const pa = p.alpha * Math.min(1, p.life * 3);

        // Particle glow
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        pg.addColorStop(0, `${color}${hex(pa * 0.25 * 255)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(pa * 0.5 * 255)}`;
        ctx.fill();
      }

      // Center triple-intersection glow (where all three overlap)
      const triCenterX = (rings[0].cx + rings[1].cx + rings[2].cx) / 3;
      const triCenterY = (rings[0].cy + rings[1].cy + rings[2].cy) / 3;
      const triPulse = Math.sin(time * 1.5) * 0.5 + 0.5;
      const triGlowR = 8 + triPulse * 6;

      const tg = ctx.createRadialGradient(triCenterX, triCenterY, 0, triCenterX, triCenterY, triGlowR);
      tg.addColorStop(0, `${color}${hex((0.1 + triPulse * 0.15) * 255)}`);
      tg.addColorStop(0.6, `${color}${hex((0.04 + triPulse * 0.06) * 255)}`);
      tg.addColorStop(1, `${color}00`);
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.arc(triCenterX, triCenterY, triGlowR, 0, Math.PI * 2);
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
  }, [color, speedProp]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default StandardsGrid;
