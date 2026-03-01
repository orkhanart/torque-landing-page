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

    // Tournament bracket: 3 tiers converging upward to a winner node
    // Tier 0 (bottom): 4 nodes
    // Tier 1 (middle): 2 nodes
    // Tier 2 (top): 1 node (winner)

    interface Node {
      tx: number; // normalized 0-1
      ty: number; // normalized 0-1
      tier: number;
      filled: number; // 0-1 fill progress
    }

    interface Edge {
      from: number;
      to: number;
      progress: number; // 0-1 how much of the edge is lit
    }

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Build layout (will be positioned relative to canvas size)
    // Tier 0 - bottom row
    nodes.push({ tx: 0.15, ty: 0.78, tier: 0, filled: 0 });
    nodes.push({ tx: 0.38, ty: 0.78, tier: 0, filled: 0 });
    nodes.push({ tx: 0.62, ty: 0.78, tier: 0, filled: 0 });
    nodes.push({ tx: 0.85, ty: 0.78, tier: 0, filled: 0 });

    // Tier 1 - middle row
    nodes.push({ tx: 0.27, ty: 0.50, tier: 1, filled: 0 });
    nodes.push({ tx: 0.73, ty: 0.50, tier: 1, filled: 0 });

    // Tier 2 - winner
    nodes.push({ tx: 0.50, ty: 0.22, tier: 2, filled: 0 });

    // Edges: tier 0 → tier 1
    edges.push({ from: 0, to: 4, progress: 0 });
    edges.push({ from: 1, to: 4, progress: 0 });
    edges.push({ from: 2, to: 5, progress: 0 });
    edges.push({ from: 3, to: 5, progress: 0 });

    // Edges: tier 1 → tier 2
    edges.push({ from: 4, to: 6, progress: 0 });
    edges.push({ from: 5, to: 6, progress: 0 });

    // Burst particles at winner node
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    }
    const particles: Particle[] = [];

    let time = 0;
    const cycleDuration = 5;

    const getNodePos = (n: Node) => ({
      x: n.tx * w,
      y: n.ty * h,
    });

    const drawNode = (n: Node, radius: number) => {
      const pos = getNodePos(n);

      // Outer ring
      ctx.strokeStyle = `${color}${hex(0.3 * 255)}`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Fill
      if (n.filled > 0) {
        ctx.fillStyle = `${color}${hex(n.filled * 0.45 * 255)}`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius - 1, 0, Math.PI * 2);
        ctx.fill();

        // Pulse ring when freshly filled
        if (n.filled > 0.8 && n.filled < 1) {
          const pulseAlpha = (1 - n.filled) * 2;
          const pulseRadius = radius + n.filled * 12;
          ctx.strokeStyle = `${color}${hex(pulseAlpha * 255)}`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Inner dot
      ctx.fillStyle = `${color}${hex((0.3 + n.filled * 0.5) * 255)}`;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawEdge = (e: Edge) => {
      const fromPos = getNodePos(nodes[e.from]);
      const toPos = getNodePos(nodes[e.to]);

      // Background line (dim)
      ctx.strokeStyle = `${color}${hex(0.1 * 255)}`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 7]);
      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);
      ctx.lineTo(toPos.x, toPos.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Lit portion
      if (e.progress > 0) {
        const endX = fromPos.x + (toPos.x - fromPos.x) * e.progress;
        const endY = fromPos.y + (toPos.y - fromPos.y) * e.progress;

        ctx.strokeStyle = `${color}${hex(0.5 * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Traveling dot on the edge
        if (e.progress < 1) {
          const gradient = ctx.createRadialGradient(endX, endY, 0, endX, endY, 12);
          gradient.addColorStop(0, `${color}${hex(0.4 * 255)}`);
          gradient.addColorStop(1, `${color}00`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(endX, endY, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `${color}${hex(0.8 * 255)}`;
          ctx.beginPath();
          ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const spawnWinnerBurst = () => {
      const pos = getNodePos(nodes[6]);
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.4;
        const speed = 1 + Math.random() * 2.5;
        particles.push({
          x: pos.x,
          y: pos.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    let hasBurst = false;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cycleTime = time % (cycleDuration + 2);

      // Animation phases:
      // 0-1.2s:    tier 0 nodes fill, edges to tier 1 travel
      // 1.2-2.5s:  tier 1 nodes fill, edges to tier 2 travel
      // 2.5-3.8s:  winner node fills + burst
      // 3.8-5s:    hold
      // 5-7s:      fade and reset

      const phase = cycleTime;

      // Tier 0 nodes fill
      for (let i = 0; i < 4; i++) {
        if (phase > i * 0.15) {
          nodes[i].filled = Math.min(1, nodes[i].filled + 0.04);
        }
      }

      // Tier 0→1 edges
      if (phase > 0.5) {
        const edgeProgress = Math.min(1, (phase - 0.5) / 1.0);
        for (let i = 0; i < 4; i++) {
          edges[i].progress = edgeProgress;
        }
      }

      // Tier 1 nodes fill
      if (phase > 1.5) {
        for (let i = 4; i < 6; i++) {
          nodes[i].filled = Math.min(1, nodes[i].filled + 0.04);
        }
      }

      // Tier 1→2 edges
      if (phase > 2.0) {
        const edgeProgress = Math.min(1, (phase - 2.0) / 1.0);
        edges[4].progress = edgeProgress;
        edges[5].progress = edgeProgress;
      }

      // Winner node
      if (phase > 3.0) {
        nodes[6].filled = Math.min(1, nodes[6].filled + 0.03);
        if (nodes[6].filled > 0.9 && !hasBurst) {
          spawnWinnerBurst();
          hasBurst = true;
        }
      }

      // Reset phase
      if (phase > cycleDuration + 1) {
        const resetSpeed = 0.03;
        for (const n of nodes) n.filled = Math.max(0, n.filled - resetSpeed);
        for (const e of edges) e.progress = Math.max(0, e.progress - resetSpeed);
        hasBurst = false;
      }

      // Draw edges
      for (const e of edges) drawEdge(e);

      // Draw nodes
      for (const n of nodes) {
        const radius = n.tier === 2 ? 10 : n.tier === 1 ? 8 : 6;
        drawNode(n, radius);
      }

      // Winner glow when filled
      if (nodes[6].filled > 0.5) {
        const pos = getNodePos(nodes[6]);
        const glowAlpha = (nodes[6].filled - 0.5) * 0.4;
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 30);
        gradient.addColorStop(0, `${color}${hex(glowAlpha * 255)}`);
        gradient.addColorStop(1, `${color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.018;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        const alpha = p.life * 0.7;
        ctx.fillStyle = `${color}${hex(alpha * 255)}`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
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
