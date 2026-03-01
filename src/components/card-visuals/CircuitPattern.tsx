"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface CircuitPatternProps {
  color?: string;
  className?: string;
  paused?: boolean;
  speed?: number;
}

export function CircuitPattern({ color = "#0000FF", className = "", paused = false, speed = 1 }: CircuitPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);
  const animateFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused && animateFnRef.current) {
      animationRef.current = requestAnimationFrame(animateFnRef.current);
    }
  }, [paused]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

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
    const grid = 32;
    const cols = Math.floor(w / grid);
    const rows = Math.floor(h / grid);

    // Build circuit nodes on grid intersections
    interface CNode { x: number; y: number; conn: number[]; isChip: boolean; energy: number }

    const nodes: CNode[] = [];
    const nodeMap = new Map<string, number>();
    const nodeCount = 20 + Math.floor(Math.random() * 10);

    // Place nodes on grid
    for (let i = 0; i < nodeCount; i++) {
      const gx = Math.floor(Math.random() * (cols - 2)) + 1;
      const gy = Math.floor(Math.random() * (rows - 2)) + 1;
      const key = `${gx}-${gy}`;
      if (nodeMap.has(key)) continue;
      nodeMap.set(key, nodes.length);
      nodes.push({
        x: (gx + 0.5) * grid,
        y: (gy + 0.5) * grid,
        conn: [],
        isChip: Math.random() < 0.15,
        energy: 0,
      });
    }

    // Connect nearby nodes with L-shaped traces
    nodes.forEach((node, i) => {
      const nearby = nodes
        .map((n, j) => ({ idx: j, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
        .filter(n => n.idx !== i && n.dist < grid * 5)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      nearby.forEach(n => {
        if (!node.conn.includes(n.idx) && nodes[n.idx].conn.length < 4) {
          node.conn.push(n.idx);
        }
      });
    });

    // Traces: precompute L-shaped paths
    interface Trace { points: { x: number; y: number }[]; from: number; to: number; length: number }
    const traces: Trace[] = [];
    const traceSet = new Set<string>();

    nodes.forEach((node, i) => {
      node.conn.forEach(ci => {
        const key = `${Math.min(i, ci)}-${Math.max(i, ci)}`;
        if (traceSet.has(key)) return;
        traceSet.add(key);
        const target = nodes[ci];
        const pts: { x: number; y: number }[] = [];
        pts.push({ x: node.x, y: node.y });
        if (Math.abs(node.x - target.x) > Math.abs(node.y - target.y)) {
          const midX = Math.round((node.x + target.x) / 2 / grid) * grid + grid / 2;
          pts.push({ x: midX, y: node.y });
          pts.push({ x: midX, y: target.y });
        } else {
          const midY = Math.round((node.y + target.y) / 2 / grid) * grid + grid / 2;
          pts.push({ x: node.x, y: midY });
          pts.push({ x: target.x, y: midY });
        }
        pts.push({ x: target.x, y: target.y });

        let len = 0;
        for (let j = 1; j < pts.length; j++) len += Math.hypot(pts[j].x - pts[j - 1].x, pts[j].y - pts[j - 1].y);
        traces.push({ points: pts, from: i, to: ci, length: len });
      });
    });

    // Signal pulses
    interface Pulse { traceIdx: number; t: number; speed: number; dir: number; trail: { x: number; y: number; a: number }[] }
    const pulses: Pulse[] = [];

    let time = 0;

    const getPointOnTrace = (trace: Trace, t: number) => {
      const pts = trace.points;
      let d = t * trace.length;
      for (let i = 1; i < pts.length; i++) {
        const segLen = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (d <= segLen || i === pts.length - 1) {
          const frac = segLen > 0 ? d / segLen : 0;
          return {
            x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * frac,
            y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * frac,
          };
        }
        d -= segLen;
      }
      return pts[pts.length - 1];
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const dt = 0.016 * speedRef.current;
      time += dt;
      const mouse = mouseRef.current;

      // Decay energies
      nodes.forEach(n => { n.energy *= Math.pow(0.96, speedRef.current); });

      // Subtle grid
      ctx.strokeStyle = `${color}06`;
      ctx.lineWidth = 0.5;
      for (let x = grid; x < w; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = grid; y < h; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Draw traces
      traces.forEach(trace => {
        const fromE = nodes[trace.from].energy;
        const toE = nodes[trace.to].energy;
        const avgE = (fromE + toE) / 2;

        // Mouse proximity
        let mAlpha = 0;
        if (mouse.active) {
          const mid = getPointOnTrace(trace, 0.5);
          const d = Math.hypot(mid.x - mouse.x, mid.y - mouse.y);
          if (d < 100) mAlpha = (1 - d / 100) * 0.1;
        }

        const alpha = 0.08 + avgE * 0.2 + mAlpha;

        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 10 + avgE * 14;
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
        ctx.lineWidth = 1.5 + avgE * 1.5;
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // Spawn pulses — 2-3 simultaneously
      if (Math.random() < 0.08 && pulses.length < 16 && traces.length > 0) {
        const spawnCount = 2 + Math.floor(Math.random() * 2);
        for (let s = 0; s < spawnCount; s++) {
          const ti = Math.floor(Math.random() * traces.length);
          pulses.push({ traceIdx: ti, t: 0, speed: (0.003 + Math.random() * 0.004) / Math.max(1, traces[ti].length / 100), dir: 1, trail: [] });
        }
      }

      // Update and draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * p.dir * speedRef.current;

        if (p.t >= 1 || p.t <= 0) {
          // Energize arrival node
          const trace = traces[p.traceIdx];
          const nodeIdx = p.t >= 1 ? trace.to : trace.from;
          nodes[nodeIdx].energy = Math.min(nodes[nodeIdx].energy + 0.5, 1);
          pulses.splice(i, 1);
          continue;
        }

        const trace = traces[p.traceIdx];
        const pos = getPointOnTrace(trace, p.t);

        // Trail
        p.trail.push({ x: pos.x, y: pos.y, a: 1 });
        p.trail.forEach(tp => { tp.a *= 0.88; });
        p.trail = p.trail.filter(tp => tp.a > 0.02);

        // Draw trail
        for (const tp of p.trail) {
          const tg = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, 6);
          tg.addColorStop(0, `${color}${hex(tp.a * 60)}`);
          tg.addColorStop(1, `${color}00`);
          ctx.fillStyle = tg;
          ctx.beginPath(); ctx.arc(tp.x, tp.y, 6, 0, Math.PI * 2); ctx.fill();
        }

        // Pulse head glow
        const pg = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 18);
        pg.addColorStop(0, `${color}A0`);
        pg.addColorStop(0.4, `${color}30`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2); ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}E0`;
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time * 1.5 + node.x * 0.01 + node.y * 0.01) * 0.5 + 0.5;
        const e = node.energy;

        let mBoost = 0;
        if (mouse.active) {
          const d = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (d < 80) mBoost = (1 - d / 80) * 0.3;
        }

        const total = Math.min(pulse * 0.15 + e + mBoost, 1);

        if (node.isChip) {
          // Draw as IC chip (rectangle)
          const cw = 14, ch = 10;
          // Glow
          const cg = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
          cg.addColorStop(0, `${color}${hex(total * 50)}`);
          cg.addColorStop(1, `${color}00`);
          ctx.fillStyle = cg;
          ctx.beginPath(); ctx.arc(node.x, node.y, 20, 0, Math.PI * 2); ctx.fill();

          // Body
          ctx.strokeStyle = `${color}${hex((0.2 + total * 0.4) * 255)}`;
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - cw / 2, node.y - ch / 2, cw, ch);
          ctx.fillStyle = `${color}${hex((0.05 + total * 0.15) * 255)}`;
          ctx.fillRect(node.x - cw / 2, node.y - ch / 2, cw, ch);

          // Pins
          const pins = 3;
          for (let p = 0; p < pins; p++) {
            const px = node.x - cw / 2 + (cw / (pins + 1)) * (p + 1);
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex((0.15 + total * 0.3) * 255)}`;
            ctx.moveTo(px, node.y - ch / 2); ctx.lineTo(px, node.y - ch / 2 - 4);
            ctx.moveTo(px, node.y + ch / 2); ctx.lineTo(px, node.y + ch / 2 + 4);
            ctx.stroke();
          }
        } else {
          // Junction dot
          const s = 3 + total * 2;
          const ng = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, s * 3);
          ng.addColorStop(0, `${color}${hex(total * 60)}`);
          ng.addColorStop(1, `${color}00`);
          ctx.fillStyle = ng;
          ctx.beginPath(); ctx.arc(node.x, node.y, s * 3, 0, Math.PI * 2); ctx.fill();

          // Ring
          if (e > 0.2) {
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex(e * 80)}`;
            ctx.lineWidth = 1;
            ctx.arc(node.x, node.y, s + 2, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.fillStyle = `${color}${hex((0.2 + total * 0.5) * 255)}`;
          ctx.arc(node.x, node.y, s, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Mouse glow
      if (mouse.active) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        mg.addColorStop(0, `${color}0A`);
        mg.addColorStop(1, `${color}00`);
        ctx.fillStyle = mg;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2); ctx.fill();
      }

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [color, handleMouseMove, handleMouseLeave]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}

export default CircuitPattern;
