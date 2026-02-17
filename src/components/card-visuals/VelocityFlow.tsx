"use client";

import React, { useEffect, useRef } from "react";

interface VelocityFlowProps {
  color?: string;
  className?: string;
}

export function VelocityFlow({ color = "#0000FF", className = "" }: VelocityFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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
      y: number;
      baseSpeed: number;
      waveAmp: number;
      waveFreq: number;
      phase: number;
    }

    const lanes: Lane[] = [];
    for (let i = 0; i < laneCount; i++) {
      lanes.push({
        y: h * (0.12 + (i / (laneCount - 1)) * 0.76),
        baseSpeed: 1.2 + Math.random() * 1.5,
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

    // Speed burst zones
    interface SpeedZone {
      x: number;
      age: number;
      maxAge: number;
    }
    const speedZones: SpeedZone[] = [];

    let time = 0;
    let zoneTimer = 0;

    const getLaneY = (lane: Lane, x: number, t: number) => {
      return lane.y +
        Math.sin(x * lane.waveFreq + t * 0.8 + lane.phase) * lane.waveAmp +
        Math.sin(x * lane.waveFreq * 2.2 + t * 1.3 + lane.phase * 0.7) * lane.waveAmp * 0.3;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Trigger speed zone every 2s
      zoneTimer += 0.016;
      if (zoneTimer > 2) {
        zoneTimer = 0;
        speedZones.push({
          x: w * (0.3 + Math.random() * 0.4),
          age: 0,
          maxAge: 1.8,
        });
      }

      // Update speed zones
      for (let i = speedZones.length - 1; i >= 0; i--) {
        speedZones[i].age += 0.016;
        if (speedZones[i].age >= speedZones[i].maxAge) speedZones.splice(i, 1);
      }

      // Draw lane paths (flowing wave lines)
      lanes.forEach(lane => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = getLaneY(lane, x, time);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${color}${hex(10)}`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw speed zone effects
      speedZones.forEach(zone => {
        const t = zone.age / zone.maxAge;
        const alpha = (1 - t) * 0.12;
        const zoneW = 60 + t * 40;

        // Vertical glow band
        const zg = ctx.createLinearGradient(zone.x - zoneW / 2, 0, zone.x + zoneW / 2, 0);
        zg.addColorStop(0, `${color}00`);
        zg.addColorStop(0.3, `${color}${hex(alpha * 255)}`);
        zg.addColorStop(0.5, `${color}${hex(alpha * 1.5 * 255)}`);
        zg.addColorStop(0.7, `${color}${hex(alpha * 255)}`);
        zg.addColorStop(1, `${color}00`);
        ctx.fillStyle = zg;
        ctx.fillRect(zone.x - zoneW / 2, 0, zoneW, h);

        // Chevron arrows pointing right
        const arrowCount = 3;
        for (let a = 0; a < arrowCount; a++) {
          const ax = zone.x - 15 + a * 15 + t * 30;
          const arrowAlpha = alpha * 0.6 * (1 - Math.abs(a - 1) * 0.3);
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(arrowAlpha * 255)}`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(ax - 6, h * 0.35);
          ctx.lineTo(ax + 6, h * 0.45);
          ctx.lineTo(ax - 6, h * 0.55);
          ctx.stroke();
        }
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
        p.accel = 1 + progress * 1.5;

        // Speed boost from zones
        let zoneBoost = 1;
        for (const zone of speedZones) {
          const dist = Math.abs(p.x - zone.x);
          if (dist < 50) {
            const t = zone.age / zone.maxAge;
            zoneBoost += (1 - dist / 50) * (1 - t) * 2;
          }
        }

        p.x += p.speed * p.accel * zoneBoost;

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
        const trailLen = Math.min(p.trail.length, Math.floor(6 + p.accel * zoneBoost * 4));
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
        const glowIntensity = 0.06 + (p.accel * zoneBoost - 1) * 0.04;
        const glowR = p.size * 3 + (zoneBoost - 1) * 4;
        const pg = ctx.createRadialGradient(p.x, y, 0, p.x, y, glowR);
        pg.addColorStop(0, `${color}${hex(glowIntensity * p.alpha * 255)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(p.x, y, glowR, 0, Math.PI * 2); ctx.fill();

        // Core dot
        const coreAlpha = (0.15 + progress * 0.15 + (zoneBoost - 1) * 0.2) * p.alpha;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(coreAlpha * 255)}`;
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Left side: slow indicator
      ctx.font = "bold 8px system-ui";
      ctx.textAlign = "left";
      ctx.fillStyle = `${color}${hex(12)}`;
      ctx.fillText("IDLE", 8, h * 0.5);

      // Right side: velocity indicator
      ctx.textAlign = "right";
      ctx.fillStyle = `${color}${hex(20)}`;
      ctx.fillText("VELOCITY", w - 8, h * 0.5);

      // Directional arrow at bottom
      const arrowY = h * 0.92;
      ctx.beginPath();
      ctx.strokeStyle = `${color}${hex(8)}`;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.moveTo(w * 0.1, arrowY);
      ctx.lineTo(w * 0.9, arrowY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = `${color}${hex(15)}`;
      ctx.moveTo(w * 0.9, arrowY);
      ctx.lineTo(w * 0.9 - 8, arrowY - 4);
      ctx.lineTo(w * 0.9 - 8, arrowY + 4);
      ctx.closePath();
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

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
