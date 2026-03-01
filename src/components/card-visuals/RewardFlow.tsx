"use client";

import React, { useEffect, useRef } from "react";

interface RewardFlowProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

interface FlowNode {
  x: number;
  y: number;
  type: "entry" | "condition" | "reward";
  connections: number[];
  pulsePhase: number;
  size: number;
}

interface Particle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number; alpha: number }[];
}

function generateNodes(width: number, height: number): FlowNode[] {
  const nodes: FlowNode[] = [];

  // Entry nodes (left side) — pushed closer to edge
  const entryCount = 3;
  for (let i = 0; i < entryCount; i++) {
    nodes.push({
      x: width * 0.05,
      y: height * (0.2 + (i * 0.6) / (entryCount - 1)),
      type: "entry",
      connections: [],
      pulsePhase: Math.random() * Math.PI * 2,
      size: 4,
    });
  }

  // Condition nodes (middle, staggered)
  const condCount = 4;
  for (let i = 0; i < condCount; i++) {
    nodes.push({
      x: width * (0.3 + (i % 2) * 0.15),
      y: height * (0.15 + (i * 0.7) / (condCount - 1)),
      type: "condition",
      connections: [],
      pulsePhase: Math.random() * Math.PI * 2,
      size: 5,
    });
  }

  // Reward nodes (right side) — pushed closer to edge, smaller variance
  const rewardCount = 3;
  for (let i = 0; i < rewardCount; i++) {
    nodes.push({
      x: width * 0.9 + (Math.random() - 0.5) * width * 0.06,
      y: height * (0.2 + (i * 0.6) / (rewardCount - 1)),
      type: "reward",
      connections: [],
      pulsePhase: Math.random() * Math.PI * 2,
      size: 6,
    });
  }

  // Connect entries to conditions
  for (let i = 0; i < entryCount; i++) {
    const c1 = entryCount + (i % condCount);
    const c2 = entryCount + ((i + 1) % condCount);
    nodes[i].connections.push(c1);
    if (c1 !== c2) nodes[i].connections.push(c2);
  }

  // Connect conditions to rewards
  for (let i = 0; i < condCount; i++) {
    const r1 = entryCount + condCount + (i % rewardCount);
    const r2 = entryCount + condCount + ((i + 1) % rewardCount);
    nodes[entryCount + i].connections.push(r1);
    if (r1 !== r2 && Math.random() > 0.4) {
      nodes[entryCount + i].connections.push(r2);
    }
  }

  return nodes;
}

export function RewardFlow({ color = "#0000FF", className = "", paused = false }: RewardFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pausedRef = useRef(paused);
  const animateFnRef = useRef<(() => void) | null>(null);
  const nodesRef = useRef<FlowNode[]>([]);

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

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        // Regenerate nodes at new dimensions
        const w = rect.width;
        const h = rect.height;
        nodesRef.current = generateNodes(w, h);
      }
    };

    resizeCanvas();

    // Particles flowing along edges
    const particles: Particle[] = [];
    let time = 0;
    const entryCount = 3;

    const spawnParticle = () => {
      const nodes = nodesRef.current;
      if (nodes.length === 0) return;
      const entryIdx = Math.floor(Math.random() * entryCount);
      const node = nodes[entryIdx];
      if (node.connections.length === 0) return;
      const toIdx = node.connections[Math.floor(Math.random() * node.connections.length)];

      particles.push({
        fromNode: entryIdx,
        toNode: toIdx,
        progress: 0,
        speed: 0.002 + Math.random() * 0.002,
        trail: [],
      });
    };

    const animate = () => {
      const nodes = nodesRef.current;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Spawn particles
      if (Math.random() < 0.03 && particles.length < 12) {
        spawnParticle();
      }

      // Draw edges — shadowBlur glow technique
      nodes.forEach((node) => {
        node.connections.forEach((connIdx) => {
          const target = nodes[connIdx];

          const midX = (node.x + target.x) / 2;
          const midY = (node.y + target.y) / 2;
          const cpOffset = (target.y - node.y) * 0.2;

          ctx.save();
          ctx.shadowColor = color;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.strokeStyle = `${color}50`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(node.x, node.y);
          ctx.quadraticCurveTo(midX + cpOffset, midY - cpOffset, target.x, target.y);
          ctx.stroke();
          ctx.restore();
        });
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        if (!from || !to) {
          particles.splice(i, 1);
          continue;
        }

        // Quadratic bezier position
        const t = p.progress;
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const cpOffset = (to.y - from.y) * 0.2;
        const cpX = midX + cpOffset;
        const cpY = midY - cpOffset;

        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x;
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y;

        // Add to trail
        p.trail.push({ x: px, y: py, alpha: 1 });

        // Fade trail
        p.trail.forEach((tp) => (tp.alpha *= 0.92));
        p.trail = p.trail.filter((tp) => tp.alpha > 0.05);

        // Draw trail
        p.trail.forEach((tp) => {
          const grad = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, 4);
          grad.addColorStop(0, `${color}${Math.floor(tp.alpha * 60).toString(16).padStart(2, "0")}`);
          grad.addColorStop(1, `${color}00`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw particle head
        const headGrad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        headGrad.addColorStop(0, `${color}90`);
        headGrad.addColorStop(0.5, `${color}30`);
        headGrad.addColorStop(1, `${color}00`);
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();

        // When particle arrives, chain to next connection
        if (p.progress >= 1) {
          const arrivedNode = nodes[p.toNode];
          if (arrivedNode && arrivedNode.connections.length > 0) {
            const nextIdx = arrivedNode.connections[Math.floor(Math.random() * arrivedNode.connections.length)];
            particles[i] = {
              fromNode: p.toNode,
              toNode: nextIdx,
              progress: 0,
              speed: p.speed,
              trail: p.trail,
            };
          } else {
            particles.splice(i, 1);
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 1.5 + node.pulsePhase) * 0.5 + 0.5;

        if (node.type === "condition") {
          const s = node.size + pulse * 2;

          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, s * 3);
          glow.addColorStop(0, `${color}20`);
          glow.addColorStop(1, `${color}00`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, s * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = `${color}${Math.floor((0.2 + pulse * 0.3) * 255).toString(16).padStart(2, "0")}`;
          ctx.fillRect(-s / 2, -s / 2, s, s);
          ctx.restore();
        } else if (node.type === "reward") {
          const s = node.size + pulse * 2;

          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, s * 3);
          glow.addColorStop(0, `${color}25`);
          glow.addColorStop(1, `${color}00`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, s * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = `${color}${Math.floor((0.3 + pulse * 0.3) * 255).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 1.5;
          ctx.arc(node.x, node.y, s, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = `${color}${Math.floor((0.4 + pulse * 0.4) * 255).toString(16).padStart(2, "0")}`;
          ctx.arc(node.x, node.y, s * 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const s = node.size + pulse;

          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, s * 2.5);
          glow.addColorStop(0, `${color}30`);
          glow.addColorStop(1, `${color}00`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, s * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `${color}${Math.floor((0.4 + pulse * 0.4) * 255).toString(16).padStart(2, "0")}`;
          ctx.arc(node.x, node.y, s, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

export default RewardFlow;
