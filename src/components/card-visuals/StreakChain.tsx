"use client";

import React, { useEffect, useRef } from "react";

interface StreakChainProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function StreakChain({ color = "#0000FF", className = "", paused = false }: StreakChainProps) {
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

    // Chain nodes arranged in a horizontal S-curve
    const nodeCount = 10;

    interface ChainNode {
      x: number;
      y: number;
      radius: number;
      lit: boolean;
      litProgress: number; // 0 to 1
      number: number;
    }

    const getNodePositions = (): { x: number; y: number }[] => {
      const positions: { x: number; y: number }[] = [];
      const marginX = w * 0.1;
      const spanX = w - marginX * 2;
      const centerY = h * 0.45;
      const amplitude = h * 0.12;

      for (let i = 0; i < nodeCount; i++) {
        const t = i / (nodeCount - 1);
        const x = marginX + t * spanX;
        // S-curve: sine wave with 1.5 periods
        const y = centerY + Math.sin(t * Math.PI * 1.5 - Math.PI * 0.25) * amplitude;
        positions.push({ x, y });
      }
      return positions;
    };

    const positions = getNodePositions();
    const nodes: ChainNode[] = positions.map((pos, i) => ({
      x: pos.x,
      y: pos.y,
      radius: 10,
      lit: false,
      litProgress: 0,
      number: i + 1,
    }));

    // Pulse traveling along connection
    interface Pulse {
      fromNode: number;
      toNode: number;
      t: number;
      speed: number;
    }

    let activePulses: Pulse[] = [];
    let currentLitIndex = -1;
    let lightUpTimer = 0;
    let streakCompleteTimer = 0;
    let streakCompleteGlow = 0;
    let resetTimer = 0;
    let phase: "lighting" | "complete" | "resetting" = "lighting";

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Phase logic
      if (phase === "lighting") {
        lightUpTimer += 0.016;
        if (lightUpTimer > 0.5 && currentLitIndex < nodeCount - 1) {
          lightUpTimer = 0;
          currentLitIndex++;
          nodes[currentLitIndex].lit = true;

          // Send pulse to next node
          if (currentLitIndex < nodeCount - 1) {
            activePulses.push({
              fromNode: currentLitIndex,
              toNode: currentLitIndex + 1,
              t: 0,
              speed: 0.04,
            });
          }

          if (currentLitIndex === nodeCount - 1) {
            phase = "complete";
            streakCompleteTimer = 0;
          }
        }
      } else if (phase === "complete") {
        streakCompleteTimer += 0.016;
        streakCompleteGlow = Math.sin(streakCompleteTimer * 3) * 0.5 + 0.5;

        if (streakCompleteTimer > 2.5) {
          phase = "resetting";
          resetTimer = 0;
        }
      } else if (phase === "resetting") {
        resetTimer += 0.016;
        // Fade all nodes
        nodes.forEach(n => {
          n.litProgress = Math.max(0, n.litProgress - 0.02);
        });

        if (resetTimer > 1.5) {
          phase = "lighting";
          currentLitIndex = -1;
          lightUpTimer = 0;
          streakCompleteGlow = 0;
          nodes.forEach(n => { n.lit = false; n.litProgress = 0; });
          activePulses = [];
        }
      }

      // Update lit progress
      nodes.forEach(n => {
        if (n.lit && n.litProgress < 1) {
          n.litProgress = Math.min(1, n.litProgress + 0.05);
        }
      });

      // Draw connection lines between nodes
      for (let i = 0; i < nodeCount - 1; i++) {
        const from = nodes[i];
        const to = nodes[i + 1];

        const bothLit = from.lit && to.lit;
        const lineAlpha = bothLit ? 0.15 + streakCompleteGlow * 0.1 : 0.04;

        // Main connection
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        // Slight curve
        const cpX = (from.x + to.x) / 2;
        const cpY = (from.y + to.y) / 2 - 8;
        ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);
        ctx.strokeStyle = `${color}${hex(lineAlpha * 255)}`;
        ctx.lineWidth = bothLit ? 2 : 1;
        ctx.stroke();

        // Dashed secondary
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(cpX, cpY + 6, to.x, to.y);
        ctx.strokeStyle = `${color}${hex(lineAlpha * 0.4 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Update and draw pulses
      for (let i = activePulses.length - 1; i >= 0; i--) {
        const pulse = activePulses[i];
        pulse.t += pulse.speed;

        if (pulse.t >= 1) {
          activePulses.splice(i, 1);
          continue;
        }

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        const cpX = (from.x + to.x) / 2;
        const cpY = (from.y + to.y) / 2 - 8;

        // Quadratic bezier position
        const t = pulse.t;
        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x;
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y;

        // Pulse glow
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 12);
        pg.addColorStop(0, `${color}${hex(80)}`);
        pg.addColorStop(0.5, `${color}${hex(25)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fill();

        // Pulse core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(180)}`;
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      nodes.forEach((node) => {
        const isLit = node.litProgress > 0;
        const lp = node.litProgress;
        const pulse = Math.sin(time * 2 + node.number * 0.5) * 0.5 + 0.5;

        // Streak complete glow wave
        let completeGlow = 0;
        if (phase === "complete") {
          completeGlow = streakCompleteGlow;
        }

        const baseAlpha = isLit ? 0.08 + lp * 0.15 + completeGlow * 0.1 : 0.03;
        const r = node.radius + (isLit ? lp * 2 : 0) + pulse * 1;

        // Outer glow for lit nodes
        if (isLit) {
          const og = ctx.createRadialGradient(node.x, node.y, r * 0.3, node.x, node.y, r * 2.5);
          og.addColorStop(0, `${color}${hex((0.05 + lp * 0.08 + completeGlow * 0.06) * 255)}`);
          og.addColorStop(0.6, `${color}${hex((0.02 + lp * 0.03) * 255)}`);
          og.addColorStop(1, `${color}00`);
          ctx.fillStyle = og;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(baseAlpha * 255)}`;
        ctx.lineWidth = isLit ? 2 : 1;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Inner fill
        if (isLit) {
          const ig = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
          ig.addColorStop(0, `${color}${hex((0.06 + lp * 0.12 + completeGlow * 0.08) * 255)}`);
          ig.addColorStop(1, `${color}${hex((0.02 + lp * 0.04) * 255)}`);
          ctx.fillStyle = ig;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Number label
        ctx.font = `bold 8px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textAlpha = isLit ? 0.15 + lp * 0.25 : 0.06;
        ctx.fillStyle = `${color}${hex(textAlpha * 255)}`;
        ctx.fillText(`${node.number}`, node.x, node.y + 1);
        ctx.textBaseline = "alphabetic";
      });

      // "STREAK" label when complete
      if (phase === "complete") {
        const labelAlpha = streakCompleteGlow * 0.15;
        ctx.font = "bold 8px system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = `${color}${hex(labelAlpha * 255)}`;
        ctx.fillText("STREAK COMPLETE", w * 0.5, h * 0.82);
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

export default StreakChain;
