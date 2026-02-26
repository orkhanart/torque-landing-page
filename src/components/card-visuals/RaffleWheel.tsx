"use client";

import React, { useEffect, useRef } from "react";

interface RaffleWheelProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function RaffleWheel({ color = "#0000FF", className = "", paused = false }: RaffleWheelProps) {
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

    // Wheel configuration
    const segments = 9;
    const segmentSizes: number[] = [];
    let totalWeight = 0;
    for (let i = 0; i < segments; i++) {
      const weight = 0.5 + Math.random() * 1.5;
      segmentSizes.push(weight);
      totalWeight += weight;
    }
    const segmentAngles = segmentSizes.map(s => (s / totalWeight) * Math.PI * 2);

    // Ticket dots orbiting the wheel
    interface Ticket {
      angle: number;
      speed: number;
      dist: number;
      size: number;
      alpha: number;
    }

    const tickets: Ticket[] = [];
    for (let i = 0; i < 12; i++) {
      tickets.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.004,
        dist: 0.88 + Math.random() * 0.2,
        size: 1 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.4,
      });
    }

    let rotation = 0;
    let spinSpeed = 0.003; // base slow rotation
    let targetSpeed = 0.003;
    let spinTimer = 0;
    let spinPhase: "idle" | "accelerating" | "decelerating" | "stopped" = "idle";
    let stopTimer = 0;
    let winningSegment = -1;
    let winGlow = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.48;
      const radius = Math.min(w, h) * 0.28;

      // Spin state machine
      spinTimer += 0.016;
      if (spinPhase === "idle" && spinTimer > 5) {
        spinPhase = "accelerating";
        spinTimer = 0;
        winningSegment = -1;
        winGlow = 0;
      } else if (spinPhase === "accelerating") {
        targetSpeed = 0.12 + Math.random() * 0.06;
        spinSpeed += (targetSpeed - spinSpeed) * 0.03;
        if (spinSpeed > targetSpeed * 0.95) {
          spinPhase = "decelerating";
          spinTimer = 0;
        }
      } else if (spinPhase === "decelerating") {
        spinSpeed *= 0.985;
        if (spinSpeed < 0.004) {
          spinSpeed = 0;
          spinPhase = "stopped";
          stopTimer = 0;
          // Determine winning segment
          const pointerAngle = (-Math.PI / 2 - rotation) % (Math.PI * 2);
          const normalizedAngle = ((pointerAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          let cumAngle = 0;
          for (let i = 0; i < segments; i++) {
            cumAngle += segmentAngles[i];
            if (normalizedAngle < cumAngle) {
              winningSegment = i;
              break;
            }
          }
          if (winningSegment === -1) winningSegment = 0;
        }
      } else if (spinPhase === "stopped") {
        stopTimer += 0.016;
        winGlow = Math.min(1, winGlow + 0.03);
        if (stopTimer > 3) {
          spinPhase = "idle";
          spinTimer = 0;
          spinSpeed = 0.003;
          winGlow = 0;
          winningSegment = -1;
        }
      }

      rotation += spinSpeed;

      // Draw wheel segments
      let startAngle = rotation;
      for (let i = 0; i < segments; i++) {
        const endAngle = startAngle + segmentAngles[i];
        const isWinner = i === winningSegment && spinPhase === "stopped";
        const baseAlpha = isWinner ? 0.12 + winGlow * 0.2 : 0.03 + (i % 2) * 0.03;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = `${color}${hex(baseAlpha * 255)}`;
        ctx.fill();

        // Segment border
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(startAngle) * radius, cy + Math.sin(startAngle) * radius);
        ctx.strokeStyle = `${color}12`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Winner glow
        if (isWinner && winGlow > 0) {
          const midAngle = startAngle + segmentAngles[i] / 2;
          const glowX = cx + Math.cos(midAngle) * radius * 0.5;
          const glowY = cy + Math.sin(midAngle) * radius * 0.5;
          const gg = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius * 0.6);
          gg.addColorStop(0, `${color}${hex(winGlow * 40)}`);
          gg.addColorStop(1, `${color}00`);
          ctx.fillStyle = gg;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fill();
        }

        startAngle = endAngle;
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}18`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = `${color}10`;
      ctx.fill();
      ctx.strokeStyle = `${color}20`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pointer arrow at the top
      const pointerY = cy - radius - 14;
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius - 2);
      ctx.lineTo(cx - 6, pointerY);
      ctx.lineTo(cx + 6, pointerY);
      ctx.closePath();
      ctx.fillStyle = `${color}${hex(0.5 * 255)}`;
      ctx.fill();

      // Pointer glow during spin
      if (spinPhase === "accelerating" || spinPhase === "decelerating") {
        const pg = ctx.createRadialGradient(cx, pointerY, 0, cx, pointerY, 10);
        pg.addColorStop(0, `${color}30`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(cx, pointerY, 10, 0, Math.PI * 2); ctx.fill();
      }

      // Ticket dots orbiting
      tickets.forEach(ticket => {
        ticket.angle += ticket.speed + spinSpeed * 0.3;
        const tx = cx + Math.cos(ticket.angle) * radius * ticket.dist;
        const ty = cy + Math.sin(ticket.angle) * radius * ticket.dist;

        // Glow
        const tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, ticket.size * 3);
        tg.addColorStop(0, `${color}${hex(ticket.alpha * 30)}`);
        tg.addColorStop(1, `${color}00`);
        ctx.fillStyle = tg;
        ctx.beginPath(); ctx.arc(tx, ty, ticket.size * 3, 0, Math.PI * 2); ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(ticket.alpha * 0.6 * 255)}`;
        ctx.arc(tx, ty, ticket.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Tick marks around the wheel
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        const inner = radius + 4;
        const outer = radius + (i % 3 === 0 ? 10 : 6);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.strokeStyle = `${color}${hex(i % 3 === 0 ? 18 : 8)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
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

export default RaffleWheel;
