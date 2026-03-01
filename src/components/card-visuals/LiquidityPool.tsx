"use client";

import React, { useEffect, useRef } from "react";
import type { Orientation } from "@/components/card-visuals/useOrientation";

interface LiquidityPoolProps {
  color?: string;
  className?: string;
  paused?: boolean;
  orientation?: Orientation;
}

export function LiquidityPool({ color = "#0000FF", className = "", paused = false, orientation = "vertical" }: LiquidityPoolProps) {
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

    // Three gravitational pools connected by flow channels
    interface Pool {
      xFrac: number; yFrac: number;
      x: number; y: number;
      radius: number;
      energy: number; // how full / active
      phase: number;
      particles: number; // count of particles inside
    }

    // Inverted isosceles triangle — wide top, narrow bottom
    const isHorizontal = orientation === "horizontal";
    const pools: Pool[] = [
      { xFrac: 0.15, yFrac: isHorizontal ? 0.22 : 0.14, x: 0, y: 0, radius: 40, energy: 0.4, phase: 0, particles: 0 },
      { xFrac: 0.85, yFrac: isHorizontal ? 0.22 : 0.14, x: 0, y: 0, radius: 40, energy: 0.4, phase: Math.PI * 0.667, particles: 0 },
      { xFrac: 0.5, yFrac: isHorizontal ? 0.80 : 0.6, x: 0, y: 0, radius: 40, energy: 0.4, phase: Math.PI * 1.333, particles: 0 },
    ];

    // Connections between pools (flow channels)
    const connections = [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 0 },
    ];

    // Particles orbiting inside pools or flowing between them
    interface PoolParticle {
      poolIdx: number; // which pool (-1 if flowing)
      angle: number; // orbit angle inside pool
      orbitR: number; // orbit radius
      orbitSpeed: number;
      size: number;
      phase: number;
      // For flowing particles
      flowing: boolean;
      fromPool: number;
      toPool: number;
      flowT: number;
      flowSpeed: number;
    }

    const particleCount = 30;
    const particles: PoolParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const pi = i % pools.length;
      const pool = pools[pi];
      pools[pi].particles++;
      particles.push({
        poolIdx: pi,
        angle: Math.random() * Math.PI * 2,
        orbitR: 8 + Math.random() * (pool.radius - 12),
        orbitSpeed: (0.3 + Math.random() * 0.5) * (Math.random() < 0.5 ? 1 : -1),
        size: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        flowing: false,
        fromPool: 0,
        toPool: 0,
        flowT: 0,
        flowSpeed: 0,
      });
    }

    // Yield bursts (particles shooting upward from pools)
    interface YieldBurst {
      x: number; y: number;
      vy: number; vx: number;
      alpha: number;
      size: number;
    }
    const yields: YieldBurst[] = [];

    let time = 0;
    let flowTimer = 0;
    let yieldTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Recompute pool positions from current dimensions
      pools.forEach(p => { p.x = p.xFrac * w; p.y = p.yFrac * h; });

      // Trigger particle flow between pools every 2s
      flowTimer += 0.016;
      if (flowTimer > 2) {
        flowTimer = 0;
        // Pick a random non-flowing particle and send it to another pool
        const available = particles.filter(p => !p.flowing);
        if (available.length > 2) {
          const count = 1 + Math.floor(Math.random() * 3);
          for (let c = 0; c < count && c < available.length; c++) {
            const p = available[Math.floor(Math.random() * available.length)];
            const conn = connections.filter(cn => cn.from === p.poolIdx || cn.to === p.poolIdx);
            if (conn.length > 0) {
              const chosen = conn[Math.floor(Math.random() * conn.length)];
              const destPool = chosen.from === p.poolIdx ? chosen.to : chosen.from;
              pools[p.poolIdx].particles--;
              p.flowing = true;
              p.fromPool = p.poolIdx;
              p.toPool = destPool;
              p.flowT = 0;
              p.flowSpeed = 0.006 + Math.random() * 0.004;
              p.poolIdx = -1;
            }
          }
        }
      }

      // Trigger yield burst every 3s
      yieldTimer += 0.016;
      if (yieldTimer > 3) {
        yieldTimer = 0;
        const pi = Math.floor(Math.random() * pools.length);
        const pool = pools[pi];
        const burstCount = 3 + Math.floor(Math.random() * 4);
        for (let b = 0; b < burstCount; b++) {
          yields.push({
            x: pool.x + (Math.random() - 0.5) * pool.radius * 0.6,
            y: pool.y - pool.radius * 0.3,
            vy: -(1 + Math.random() * 1.5),
            vx: (Math.random() - 0.5) * 0.8,
            alpha: 0.6 + Math.random() * 0.4,
            size: 1.5 + Math.random() * 1.5,
          });
        }
        pool.energy = Math.min(1, pool.energy + 0.3);
      }

      // Decay pool energy
      pools.forEach(p => { p.energy *= 0.98; p.energy = Math.max(0.15, p.energy); });

      // Triangle centroid for inward curve
      const centX = (pools[0].x + pools[1].x + pools[2].x) / 3;
      const centY = (pools[0].y + pools[1].y + pools[2].y) / 3;

      // Draw flow channels (curved inward toward centroid)
      connections.forEach(conn => {
        const from = pools[conn.from];
        const to = pools[conn.to];
        const edgeMidX = (from.x + to.x) / 2;
        const edgeMidY = (from.y + to.y) / 2;
        // Pull control point toward centroid for concave (inward) curve
        const midX = edgeMidX + (centX - edgeMidX) * 0.5;
        const midY = edgeMidY + (centY - edgeMidY) * 0.5;

        // Channel with shadowBlur glow
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = `${color}${hex(80)}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Dashed secondary (no shadow)
        ctx.beginPath();
        ctx.setLineDash([3, 5]);
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(midX + 3, midY + 3, to.x, to.y);
        ctx.strokeStyle = `${color}${hex(22)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw pools
      pools.forEach((pool, pi) => {
        const pulse = Math.sin(time * 1.2 + pool.phase) * 0.5 + 0.5;
        const e = pool.energy;
        const r = pool.radius + pulse * 3;

        // Outer glow
        const og = ctx.createRadialGradient(pool.x, pool.y, r * 0.3, pool.x, pool.y, r * 1.3);
        og.addColorStop(0, `${color}${hex((0.06 + e * 0.08) * 255)}`);
        og.addColorStop(0.6, `${color}${hex((0.03 + e * 0.04) * 255)}`);
        og.addColorStop(1, `${color}00`);
        ctx.fillStyle = og;
        ctx.beginPath(); ctx.arc(pool.x, pool.y, r * 1.3, 0, Math.PI * 2); ctx.fill();

        // Pool body (concentric rings)
        for (let ring = 3; ring >= 0; ring--) {
          const ringR = r * (0.4 + ring * 0.2);
          const ringAlpha = (0.08 + e * 0.1) * (1 - ring * 0.2);
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(ringAlpha * 255)}`;
          ctx.lineWidth = ring === 0 ? 1.5 : 0.8;
          ctx.arc(pool.x, pool.y, ringR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner fill
        const ig = ctx.createRadialGradient(pool.x, pool.y, 0, pool.x, pool.y, r * 0.5);
        ig.addColorStop(0, `${color}${hex((0.08 + e * 0.1) * 255)}`);
        ig.addColorStop(1, `${color}${hex((0.03 + e * 0.04) * 255)}`);
        ctx.fillStyle = ig;
        ctx.beginPath(); ctx.arc(pool.x, pool.y, r * 0.5, 0, Math.PI * 2); ctx.fill();

        // Particle count label
        ctx.font = "bold 8px system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = `${color}${hex((0.25 + e * 0.3) * 255)}`;
        ctx.fillText(`${pool.particles}`, pool.x, pool.y + 3);
      });

      // Update and draw particles
      particles.forEach(p => {
        const pulse = Math.sin(time * 1.5 + p.phase) * 0.5 + 0.5;

        if (p.flowing) {
          // Flowing between pools
          p.flowT += p.flowSpeed;

          const from = pools[p.fromPool];
          const to = pools[p.toPool];
          const edgeMidX = (from.x + to.x) / 2;
          const edgeMidY = (from.y + to.y) / 2;
          const midX = edgeMidX + (centX - edgeMidX) * 0.5;
          const midY = edgeMidY + (centY - edgeMidY) * 0.5;

          const t = p.flowT;
          const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
          const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

          // Draw flowing particle with glow
          const fg = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
          fg.addColorStop(0, `${color}60`);
          fg.addColorStop(0.4, `${color}18`);
          fg.addColorStop(1, `${color}00`);
          ctx.fillStyle = fg;
          ctx.beginPath(); ctx.arc(px, py, p.size * 4, 0, Math.PI * 2); ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `${color}A0`;
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Arrived
          if (p.flowT >= 1) {
            p.flowing = false;
            p.poolIdx = p.toPool;
            const pool = pools[p.toPool];
            pool.particles++;
            pool.energy = Math.min(1, pool.energy + 0.1);
            p.orbitR = 8 + Math.random() * (pool.radius - 12);
            p.angle = Math.random() * Math.PI * 2;
          }
        } else {
          // Orbiting inside pool
          const pool = pools[p.poolIdx];
          if (!pool) return;

          p.angle += p.orbitSpeed * 0.016;

          const ox = pool.x + Math.cos(p.angle) * p.orbitR;
          const oy = pool.y + Math.sin(p.angle) * p.orbitR * 0.7; // slightly elliptical

          const alpha = 0.2 + pulse * 0.1 + pool.energy * 0.15;

          // Glow
          const pg = ctx.createRadialGradient(ox, oy, 0, ox, oy, p.size * 2.5);
          pg.addColorStop(0, `${color}${hex(alpha * 0.4 * 255)}`);
          pg.addColorStop(1, `${color}00`);
          ctx.fillStyle = pg;
          ctx.beginPath(); ctx.arc(ox, oy, p.size * 2.5, 0, Math.PI * 2); ctx.fill();

          // Core
          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(alpha * 255)}`;
          ctx.arc(ox, oy, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw yield bursts (upward particles = yield generation)
      for (let i = yields.length - 1; i >= 0; i--) {
        const y = yields[i];
        y.x += y.vx;
        y.y += y.vy;
        y.vy *= 0.98;
        y.alpha -= 0.008;

        if (y.alpha <= 0) { yields.splice(i, 1); continue; }

        // Glow
        const yg = ctx.createRadialGradient(y.x, y.y, 0, y.x, y.y, y.size * 3);
        yg.addColorStop(0, `${color}${hex(y.alpha * 40)}`);
        yg.addColorStop(1, `${color}00`);
        ctx.fillStyle = yg;
        ctx.beginPath(); ctx.arc(y.x, y.y, y.size * 3, 0, Math.PI * 2); ctx.fill();

        // Core with upward tail
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(y.alpha * 180)}`;
        ctx.arc(y.x, y.y, y.size, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(y.alpha * 60)}`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(y.x, y.y);
        ctx.lineTo(y.x - y.vx * 4, y.y - y.vy * 4);
        ctx.stroke();
      }

      // "YIELD" label near top
      const labelPulse = Math.sin(time * 0.6) * 0.05;
      ctx.font = "bold 7px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = `${color}${hex((0.2 + labelPulse) * 255)}`;
      ctx.fillText("YIELD ↑", w * 0.55, h * 0.1);

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
  }, [color, orientation]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default LiquidityPool;
