"use client";

import React, { useEffect, useRef } from "react";

interface VelocityFlowProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function VelocityFlow({ color = "#0000FF", className = "", paused = false }: VelocityFlowProps) {
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

    // Horizontal flow lanes — particles stream L→R, accelerating
    const laneCount = 7;
    interface Lane {
      yFrac: number;
      baseSpeed: number;
      waveAmp: number;
      waveFreq: number;
      phase: number;
    }

    const lanes: Lane[] = [];
    for (let i = 0; i < laneCount; i++) {
      lanes.push({
        yFrac: 0.12 + (i / (laneCount - 1)) * 0.76,
        baseSpeed: 0.4 + Math.random() * 0.5,
        waveAmp: 8 + Math.random() * 12,
        waveFreq: 0.008 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Streaming particles
    interface StreamParticle {
      x: number;
      lane: number;
      speed: number;
      size: number;
      alpha: number;
      accel: number; // acceleration factor as it crosses the canvas
      trail: { x: number; y: number; a: number }[];
    }

    const particles: StreamParticle[] = [];

    // Pre-seed particles so the visual isn't empty on first frame
    const seedCount = 18;
    for (let i = 0; i < seedCount; i++) {
      const li = Math.floor(Math.random() * laneCount);
      const lane = lanes[li];
      const startX = w * (0.05 + Math.random() * 0.85);
      particles.push({
        x: startX,
        lane: li,
        speed: lane.baseSpeed * (0.7 + Math.random() * 0.6),
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.5 + Math.random() * 0.5,
        accel: 1 + (startX / w) * 0.5,
        trail: [],
      });
    }

    let time = 0;

    const getLaneY = (lane: Lane, x: number, t: number) => {
      return lane.yFrac * h +
        Math.sin(x * lane.waveFreq + t * 0.8 + lane.phase) * lane.waveAmp +
        Math.sin(x * lane.waveFreq * 2.2 + t * 1.3 + lane.phase * 0.7) * lane.waveAmp * 0.3;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      // Draw lane paths — shadowBlur glow technique
      lanes.forEach(lane => {
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = getLaneY(lane, x, time);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${color}${hex(70)}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // Spawn particles on left edge
      if (Math.random() < 0.12 && particles.length < 50) {
        const li = Math.floor(Math.random() * laneCount);
        const lane = lanes[li];
        particles.push({
          x: -5,
          lane: li,
          speed: lane.baseSpeed * (0.7 + Math.random() * 0.6),
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.5 + Math.random() * 0.5,
          accel: 1,
          trail: [],
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const lane = lanes[p.lane];

        // Acceleration as particle crosses canvas (velocity increases)
        const progress = p.x / w;
        p.accel = 1 + progress * 0.5;

        p.x += p.speed * p.accel;

        // Remove if past right edge
        if (p.x > w + 20) {
          particles.splice(i, 1);
          continue;
        }

        const y = getLaneY(lane, p.x, time);

        // Trail
        p.trail.push({ x: p.x, y, a: p.alpha });
        p.trail.forEach(tp => { tp.a *= 0.88; });
        p.trail = p.trail.filter(tp => tp.a > 0.02);

        // Draw trail (speed streaks)
        const trailLen = Math.min(p.trail.length, Math.floor(6 + p.accel * 4));
        const startIdx = Math.max(0, p.trail.length - trailLen);
        for (let j = startIdx; j < p.trail.length - 1; j++) {
          const tp = p.trail[j];
          const next = p.trail[j + 1];
          const trailProgress = (j - startIdx) / trailLen;
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(tp.a * trailProgress * 40)}`;
          ctx.lineWidth = p.size * 0.5 * trailProgress;
          ctx.moveTo(tp.x, tp.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }

        // Particle glow (brighter when faster)
        const glowIntensity = 0.15 + (p.accel - 1) * 0.08;
        const glowR = p.size * 3;
        const pg = ctx.createRadialGradient(p.x, y, 0, p.x, y, glowR);
        pg.addColorStop(0, `${color}${hex(glowIntensity * p.alpha * 255)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(p.x, y, glowR, 0, Math.PI * 2); ctx.fill();

        // Core dot
        const coreAlpha = (0.35 + progress * 0.2) * p.alpha;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(coreAlpha * 255)}`;
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Left side: slow indicator
      ctx.font = "bold 8px system-ui";
      ctx.textAlign = "left";
      ctx.fillStyle = `${color}${hex(35)}`;
      ctx.fillText("IDLE", 8, h * 0.5);

      // Right side: velocity indicator
      ctx.textAlign = "right";
      ctx.fillStyle = `${color}${hex(50)}`;
      ctx.fillText("VELOCITY", w - 8, h * 0.5);

      // Directional arrow at bottom
      const arrowY = h * 0.92;
      ctx.beginPath();
      ctx.strokeStyle = `${color}${hex(25)}`;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.moveTo(w * 0.1, arrowY);
      ctx.lineTo(w * 0.9, arrowY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = `${color}${hex(40)}`;
      ctx.moveTo(w * 0.9, arrowY);
      ctx.lineTo(w * 0.9 - 8, arrowY - 4);
      ctx.lineTo(w * 0.9 - 8, arrowY + 4);
      ctx.closePath();
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

export default VelocityFlow;
