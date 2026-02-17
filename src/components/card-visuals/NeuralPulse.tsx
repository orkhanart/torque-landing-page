"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface NeuralPulseProps {
  color?: string;
  nodeCount?: number;
  className?: string;
  paused?: boolean;
}

export function NeuralPulse({ color = "#0000FF", nodeCount = 12, className = "", paused = false }: NeuralPulseProps) {
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

    // Organize nodes into layers for a neural network layout
    const layers = [3, 5, 4, 3]; // input → hidden1 → hidden2 → output
    const layerGap = w / (layers.length + 1);

    interface NNode {
      x: number; y: number; layer: number; idx: number;
      conn: number[]; // indices in flat array to forward connections
      phase: number; size: number; energy: number; fireTimer: number;
    }

    const nodes: NNode[] = [];
    let nodeIdx = 0;
    layers.forEach((count, li) => {
      const layerX = layerGap * (li + 1);
      for (let i = 0; i < count; i++) {
        const spacing = h / (count + 1);
        nodes.push({
          x: layerX + (Math.random() - 0.5) * 10,
          y: spacing * (i + 1) + (Math.random() - 0.5) * 8,
          layer: li,
          idx: nodeIdx++,
          conn: [],
          phase: Math.random() * Math.PI * 2,
          size: li === 0 || li === layers.length - 1 ? 3 : 2.5,
          energy: 0,
          fireTimer: 0,
        });
      }
    });

    // Connect each layer to the next
    let offset = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const nextOffset = offset + layers[li];
      for (let i = 0; i < layers[li]; i++) {
        for (let j = 0; j < layers[li + 1]; j++) {
          nodes[offset + i].conn.push(nextOffset + j);
        }
      }
      offset = nextOffset;
    }

    // Signal particles traveling between layers
    interface Signal { from: number; to: number; t: number; speed: number }
    const signals: Signal[] = [];
    const fireRings: { x: number; y: number; age: number; max: number }[] = [];

    let time = 0;
    let lastFire = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      const mouse = mouseRef.current;

      // Decay energies
      nodes.forEach(n => {
        n.energy *= 0.94;
        n.fireTimer = Math.max(0, n.fireTimer - 0.016);
      });

      // Fire input nodes periodically
      if (time - lastFire > 3) {
        lastFire = time;
        // Pick 1 random input node
        const inputCount = layers[0];
        const ni = Math.floor(Math.random() * inputCount);
        nodes[ni].energy = 1;
        nodes[ni].fireTimer = 0.3;
        fireRings.push({ x: nodes[ni].x, y: nodes[ni].y, age: 0, max: 0.5 });

        // Send signal to 1-2 random connections (not all)
        const shuffled = [...nodes[ni].conn].sort(() => Math.random() - 0.5);
        const pick = shuffled.slice(0, 1 + Math.floor(Math.random() * 2));
        pick.forEach(ci => {
          signals.push({ from: ni, to: ci, t: 0, speed: 0.003 + Math.random() * 0.003 });
        });
      }

      // Draw connections
      nodes.forEach(node => {
        node.conn.forEach(ci => {
          const target = nodes[ci];
          const baseAlpha = 0.04;
          const energyAlpha = (node.energy + target.energy) * 0.08;

          // Mouse highlight
          let mAlpha = 0;
          if (mouse.active) {
            const midX = (node.x + target.x) / 2;
            const midY = (node.y + target.y) / 2;
            const d = Math.hypot(midX - mouse.x, midY - mouse.y);
            if (d < 80) mAlpha = (1 - d / 80) * 0.12;
          }

          const alpha = baseAlpha + energyAlpha + mAlpha;

          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
          ctx.lineWidth = 0.8 + energyAlpha * 3;
          ctx.moveTo(node.x, node.y);
          // Subtle curve
          const cpx = (node.x + target.x) / 2;
          const cpy = (node.y + target.y) / 2 + (node.y - target.y) * 0.1;
          ctx.quadraticCurveTo(cpx, cpy, target.x, target.y);
          ctx.stroke();
        });
      });

      // Update signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.speed;

        const from = nodes[s.from], to = nodes[s.to];
        const cpx = (from.x + to.x) / 2;
        const cpy = (from.y + to.y) / 2 + (from.y - to.y) * 0.1;
        const t = s.t;
        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpx + t * t * to.x;
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpy + t * t * to.y;

        // Draw signal
        const sg = ctx.createRadialGradient(px, py, 0, px, py, 10);
        sg.addColorStop(0, `${color}90`);
        sg.addColorStop(0.4, `${color}30`);
        sg.addColorStop(1, `${color}00`);
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}D0`;
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();

        // Signal arrived
        if (s.t >= 1) {
          const target = nodes[s.to];
          target.energy = Math.min(target.energy + 0.4, 1);
          target.fireTimer = 0.2;
          fireRings.push({ x: target.x, y: target.y, age: 0, max: 0.4 });

          // Propagate to next layer (rarely, to keep it calm)
          if (target.conn.length > 0 && Math.random() < 0.25) {
            const next = target.conn[Math.floor(Math.random() * target.conn.length)];
            signals.push({ from: s.to, to: next, t: 0, speed: s.speed * (0.8 + Math.random() * 0.2) });
          }

          signals.splice(i, 1);
        }
      }

      // Fire rings
      for (let i = fireRings.length - 1; i >= 0; i--) {
        const fr = fireRings[i];
        fr.age += 0.016;
        const t = fr.age / fr.max;
        if (t >= 1) { fireRings.splice(i, 1); continue; }

        const r = 4 + t * 18;
        const a = (1 - t) * 0.4;
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(a * 255)}`;
        ctx.lineWidth = 1.5 * (1 - t);
        ctx.arc(fr.x, fr.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time * 1.8 + node.phase) * 0.5 + 0.5;

        let mBoost = 0;
        if (mouse.active) {
          const d = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (d < 80) mBoost = (1 - d / 80) * 0.3;
        }

        const e = Math.min(node.energy + mBoost, 1);
        const isActive = node.fireTimer > 0;

        // Outer glow
        const glowR = node.size * (3 + e * 5);
        const gg = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        gg.addColorStop(0, `${color}${hex((0.1 + e * 0.4) * 255)}`);
        gg.addColorStop(1, `${color}00`);
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring (visible when active)
        if (isActive || e > 0.3) {
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex((0.15 + e * 0.4) * 255)}`;
          ctx.lineWidth = 1;
          ctx.arc(node.x, node.y, node.size + 3 + pulse * 1, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Core
        const coreA = 0.3 + pulse * 0.15 + e * 0.5;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(coreA * 255)}`;
        ctx.arc(node.x, node.y, node.size + (isActive ? 1 : 0), 0, Math.PI * 2);
        ctx.fill();

        // Layer label for output nodes
        if (node.layer === layers.length - 1) {
          ctx.font = "bold 7px system-ui";
          ctx.textAlign = "center";
          ctx.fillStyle = `${color}${hex(coreA * 0.6 * 255)}`;
          ctx.fillText("OUT", node.x, node.y + node.size + 12);
        }
      });

      // Cursor glow
      if (mouse.active) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70);
        mg.addColorStop(0, `${color}08`);
        mg.addColorStop(1, `${color}00`);
        ctx.fillStyle = mg;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2); ctx.fill();
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
  }, [color, nodeCount, handleMouseMove, handleMouseLeave]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}

export default NeuralPulse;
