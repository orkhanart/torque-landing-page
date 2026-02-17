"use client";

import React, { useEffect, useRef } from "react";

interface NetworkPatternProps {
  color?: string;
  className?: string;
}

export function NetworkPattern({ color = "#0000FF", className = "" }: NetworkPatternProps) {
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

    // Branching viral distribution tree
    interface TreeNode {
      x: number; y: number;
      parent: number; // -1 for roots
      children: number[];
      depth: number;
      angle: number; // angle from parent
      dist: number; // distance from parent
      phase: number;
      size: number;
      energy: number;
      born: number; // time when node appeared
    }

    const nodes: TreeNode[] = [];
    const maxDepth = 5;

    // Create 2-3 root seeds spread across the canvas
    const seedCount = 3;
    for (let s = 0; s < seedCount; s++) {
      nodes.push({
        x: w * (0.2 + s * 0.3) + (Math.random() - 0.5) * w * 0.1,
        y: h * (0.3 + (Math.random() - 0.5) * 0.3),
        parent: -1,
        children: [],
        depth: 0,
        angle: 0,
        dist: 0,
        phase: Math.random() * Math.PI * 2,
        size: 4,
        energy: 0,
        born: 0,
      });
    }

    // Recursively branch out from seeds
    const branchFrom = (parentIdx: number, depth: number) => {
      if (depth >= maxDepth) return;
      const parent = nodes[parentIdx];
      const childCount = depth === 0 ? 3 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 3);
      const baseAngle = parent.parent === -1
        ? Math.random() * Math.PI * 2
        : parent.angle;

      for (let c = 0; c < childCount; c++) {
        const spread = depth === 0 ? Math.PI * 2 / childCount : Math.PI * 0.6;
        const angle = baseAngle + (c - (childCount - 1) / 2) * spread + (Math.random() - 0.5) * 0.4;
        const dist = 30 + Math.random() * 30 - depth * 3;

        const nx = parent.x + Math.cos(angle) * dist;
        const ny = parent.y + Math.sin(angle) * dist;

        // Skip if out of bounds
        if (nx < 10 || nx > w - 10 || ny < 10 || ny > h - 10) continue;

        // Skip if too close to existing nodes
        let tooClose = false;
        for (const n of nodes) {
          if (Math.hypot(n.x - nx, n.y - ny) < 18) { tooClose = true; break; }
        }
        if (tooClose) continue;

        const idx = nodes.length;
        nodes.push({
          x: nx, y: ny,
          parent: parentIdx,
          children: [],
          depth,
          angle,
          dist,
          phase: Math.random() * Math.PI * 2,
          size: Math.max(1.5, 4 - depth * 0.5),
          energy: 0,
          born: 0,
        });
        parent.children.push(idx);

        // Recurse with decreasing probability
        if (Math.random() < 0.7 - depth * 0.1) {
          branchFrom(idx, depth + 1);
        }
      }
    };

    // Build tree structure
    for (let s = 0; s < seedCount; s++) {
      branchFrom(s, 1);
    }

    // Pulses flowing outward from roots along branches
    interface Pulse {
      fromIdx: number;
      toIdx: number;
      t: number;
      speed: number;
    }

    const pulses: Pulse[] = [];
    let time = 0;
    let lastPulse = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Decay energy
      nodes.forEach(n => { n.energy *= 0.95; });

      // Spawn pulse from a random root every ~2s
      if (time - lastPulse > 2) {
        lastPulse = time;
        const rootIdx = Math.floor(Math.random() * seedCount);
        nodes[rootIdx].energy = 1;

        // Send pulses to children
        nodes[rootIdx].children.forEach(ci => {
          pulses.push({
            fromIdx: rootIdx,
            toIdx: ci,
            t: 0,
            speed: 0.008 + Math.random() * 0.004,
          });
        });
      }

      // Draw branches (lines from parent to child)
      nodes.forEach((node, i) => {
        if (node.parent === -1) return;
        const parent = nodes[node.parent];

        const avgEnergy = (node.energy + parent.energy) / 2;
        const depthFade = 1 - node.depth * 0.12;
        const alpha = (0.08 + avgEnergy * 0.25) * depthFade;

        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
        ctx.lineWidth = Math.max(0.5, 2 - node.depth * 0.3 + avgEnergy * 2);

        // Slightly curved branches
        const midX = (parent.x + node.x) / 2 + (node.y - parent.y) * 0.1;
        const midY = (parent.y + node.y) / 2 - (node.x - parent.x) * 0.1;
        ctx.moveTo(parent.x, parent.y);
        ctx.quadraticCurveTo(midX, midY, node.x, node.y);
        ctx.stroke();
      });

      // Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;

        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];

        // Curved position matching the branch
        const midX = (from.x + to.x) / 2 + (to.y - from.y) * 0.1;
        const midY = (from.y + to.y) / 2 - (to.x - from.x) * 0.1;
        const t = p.t;
        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

        // Draw pulse glow
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 12);
        pg.addColorStop(0, `${color}80`);
        pg.addColorStop(0.4, `${color}25`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `${color}C0`;
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Pulse arrived at destination
        if (p.t >= 1) {
          const target = nodes[p.toIdx];
          target.energy = Math.min(target.energy + 0.6, 1);

          // Propagate to children (branching distribution)
          target.children.forEach(ci => {
            if (Math.random() < 0.6) {
              pulses.push({
                fromIdx: p.toIdx,
                toIdx: ci,
                t: 0,
                speed: p.speed * (0.9 + Math.random() * 0.2),
              });
            }
          });

          pulses.splice(i, 1);
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time * 1.2 + node.phase) * 0.5 + 0.5;
        const e = node.energy;
        const isRoot = node.parent === -1;
        const depthFade = 1 - node.depth * 0.1;

        // Glow
        if (e > 0.1 || isRoot) {
          const glowR = node.size * (isRoot ? 6 : 4) + e * 8;
          const gg = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          gg.addColorStop(0, `${color}${hex((isRoot ? 0.12 : 0.06 + e * 0.2) * 255)}`);
          gg.addColorStop(1, `${color}00`);
          ctx.fillStyle = gg;
          ctx.beginPath(); ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2); ctx.fill();
        }

        // Ring on energized or root nodes
        if (e > 0.2 || isRoot) {
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex((0.1 + e * 0.3 + (isRoot ? 0.1 : 0)) * 255)}`;
          ctx.lineWidth = isRoot ? 1.5 : 1;
          ctx.arc(node.x, node.y, node.size + 3 + pulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Core dot
        const coreA = (0.15 + pulse * 0.08 + e * 0.5) * depthFade;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(coreA * 255)}`;
        ctx.arc(node.x, node.y, node.size + e * 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight for roots
        if (isRoot) {
          ctx.beginPath();
          ctx.fillStyle = `${color}${hex((0.3 + pulse * 0.2) * 255)}`;
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

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

export default NetworkPattern;
