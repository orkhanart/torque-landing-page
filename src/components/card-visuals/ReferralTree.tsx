"use client";

import React, { useEffect, useRef } from "react";

interface ReferralTreeProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function ReferralTree({ color = "#0000FF", className = "", paused = false }: ReferralTreeProps) {
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

    interface TreeNode {
      x: number;
      y: number;
      parentIndex: number;
      level: number;
      alpha: number;
      ripple: number; // 0-1 for birth ripple
      born: number; // time when born
    }

    // Energy pulse traveling from parent to child
    interface Pulse {
      fromIndex: number;
      toIndex: number;
      progress: number; // 0-1
      alpha: number;
    }

    let nodes: TreeNode[] = [];
    let pulses: Pulse[] = [];
    let time = 0;
    let growTimer = 0;
    let fadeOut = 0;
    let phase: "growing" | "holding" | "fading" = "growing";
    let holdTimer = 0;

    const levelSpacing = 55;
    const maxLevel = 4;

    const initTree = () => {
      nodes = [];
      pulses = [];
      fadeOut = 0;
      phase = "growing";
      growTimer = 0;
      holdTimer = 0;
      // Root node
      nodes.push({
        x: w / 2,
        y: 35,
        parentIndex: -1,
        level: 0,
        alpha: 0,
        ripple: 0,
        born: time,
      });
    };

    initTree();

    const getChildrenCount = (parentIndex: number) => {
      return nodes.filter(n => n.parentIndex === parentIndex).length;
    };

    const addChild = (parentIndex: number) => {
      const parent = nodes[parentIndex];
      if (!parent || parent.level >= maxLevel) return;

      const childCount = getChildrenCount(parentIndex);
      if (childCount >= 2) return; // Max 2 children per node

      // Calculate position based on tree structure
      const levelWidth = w * (0.6 + parent.level * 0.05);
      const expectedAtLevel = Math.pow(2, parent.level + 1);
      const spacing = levelWidth / (expectedAtLevel + 1);

      // Place children symmetrically around parent
      const offset = childCount === 0 ? -spacing * 0.4 : spacing * 0.4;

      const newNode: TreeNode = {
        x: parent.x + offset,
        y: parent.y + levelSpacing,
        parentIndex,
        level: parent.level + 1,
        alpha: 0,
        ripple: 0,
        born: time,
      };

      // Clamp x to canvas bounds
      newNode.x = Math.max(20, Math.min(w - 20, newNode.x));

      const newIndex = nodes.length;
      nodes.push(newNode);

      // Add energy pulse
      pulses.push({
        fromIndex: parentIndex,
        toIndex: newIndex,
        progress: 0,
        alpha: 0.7,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const globalAlpha = phase === "fading" ? Math.max(0, 1 - fadeOut) : 1;

      // Growth phase: add one node at a time
      if (phase === "growing") {
        growTimer += 0.016;
        if (growTimer > 0.7) {
          growTimer = 0;

          // Find a node that can still have children
          const candidates = nodes.filter((n, i) => {
            return n.level < maxLevel && getChildrenCount(i) < 2;
          });

          if (candidates.length > 0) {
            // Prefer shallower nodes first (BFS-like growth)
            candidates.sort((a, b) => a.level - b.level);
            const parent = candidates[0];
            const parentIndex = nodes.indexOf(parent);
            addChild(parentIndex);
          } else {
            phase = "holding";
            holdTimer = 0;
          }
        }
      }

      if (phase === "holding") {
        holdTimer += 0.016;
        if (holdTimer > 3) {
          phase = "fading";
          fadeOut = 0;
        }
      }

      if (phase === "fading") {
        fadeOut += 0.012;
        if (fadeOut >= 1) {
          initTree();
        }
      }

      // Update node alphas (fade in)
      nodes.forEach(node => {
        node.alpha = Math.min(1, node.alpha + 0.03);
        if (node.ripple < 1) {
          node.ripple = Math.min(1, node.ripple + 0.025);
        }
      });

      // Draw connection lines
      ctx.globalAlpha = globalAlpha;
      nodes.forEach((node) => {
        if (node.parentIndex === -1) return;
        const parent = nodes[node.parentIndex];
        if (!parent) return;

        const lineAlpha = Math.min(node.alpha, parent.alpha) * 0.15;
        ctx.beginPath();
        // Curved line from parent to child
        const midY = (parent.y + node.y) / 2;
        ctx.moveTo(parent.x, parent.y);
        ctx.bezierCurveTo(parent.x, midY, node.x, midY, node.x, node.y);
        ctx.strokeStyle = `${color}${hex(lineAlpha * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw and update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += 0.015;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const from = nodes[pulse.fromIndex];
        const to = nodes[pulse.toIndex];
        if (!from || !to) continue;

        const t = pulse.progress;
        // Bezier point
        const midY = (from.y + to.y) / 2;
        const u = 1 - t;
        const px = u * u * u * from.x + 3 * u * u * t * from.x + 3 * u * t * t * to.x + t * t * t * to.x;
        const py = u * u * u * from.y + 3 * u * u * t * midY + 3 * u * t * t * midY + t * t * t * to.y;

        const pa = pulse.alpha * globalAlpha * (1 - Math.abs(t - 0.5) * 2) * 1.5;

        // Pulse glow
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
        pg.addColorStop(0, `${color}${hex(pa * 40)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();

        // Pulse core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(pa * 0.8 * 255)}`;
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      nodes.forEach(node => {
        const na = node.alpha * globalAlpha;
        if (na < 0.01) return;

        // Birth ripple
        if (node.ripple < 1) {
          const rippleRadius = 4 + node.ripple * 16;
          const rippleAlpha = (1 - node.ripple) * na * 0.3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${hex(rippleAlpha * 255)}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Outer glow (double-sided for referrer + referee)
        const glowRadius = 10 + Math.sin(time * 2 + node.x * 0.1) * 2;
        const ng = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        ng.addColorStop(0, `${color}${hex(na * 18)}`);
        ng.addColorStop(0.5, `${color}${hex(na * 8)}`);
        ng.addColorStop(1, `${color}00`);
        ctx.fillStyle = ng;
        ctx.beginPath(); ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2); ctx.fill();

        // Inner circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(na * 0.4 * 255)}`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(na * 0.7 * 255)}`;
        ctx.fill();

        // Ring border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(na * 0.15 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

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

export default ReferralTree;
