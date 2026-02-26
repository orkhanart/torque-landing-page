"use client";

import React, { useEffect, useRef } from "react";

interface IntegrationPlugProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function IntegrationPlug({ color = "#0000FF", className = "", paused = false }: IntegrationPlugProps) {
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

    let time = 0;

    // Two nodes that connect
    let leftX = 0, rightX = 0;
    let connected = false;
    let connectFlash = 0;
    let pulseT = 0;
    let cycleTimer = 0;

    // Sparks on connection
    interface Spark { x: number; y: number; vx: number; vy: number; life: number; }
    const sparks: Spark[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      cycleTimer += 0.016;

      const cy = h / 2;
      const nodeRadius = Math.min(w, h) * 0.12;
      const restLeft = w * 0.22;
      const restRight = w * 0.78;
      const meetPoint = w / 2;

      // Cycle: approach → connect → pulse → separate → pause → repeat
      const cycleDuration = 6;
      const phase = cycleTimer % cycleDuration;

      if (phase < 1.5) {
        // Approach
        const t = phase / 1.5;
        const ease = t * t * (3 - 2 * t); // smoothstep
        leftX = restLeft + (meetPoint - nodeRadius - restLeft) * ease;
        rightX = restRight - (restRight - meetPoint - nodeRadius) * ease;
        connected = false;
        connectFlash = 0;
      } else if (phase < 1.6) {
        // Snap connect
        leftX = meetPoint - nodeRadius;
        rightX = meetPoint + nodeRadius;
        if (!connected) {
          connected = true;
          connectFlash = 1;
          // Spawn sparks
          for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            sparks.push({
              x: meetPoint, y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 0.5 + Math.random() * 0.5,
            });
          }
        }
      } else if (phase < 4.5) {
        // Connected — pulse data
        leftX = meetPoint - nodeRadius;
        rightX = meetPoint + nodeRadius;
        connected = true;
        pulseT = (phase - 1.6) * 2;
      } else if (phase < 5.5) {
        // Separate
        const t = (phase - 4.5) / 1;
        const ease = t * t * (3 - 2 * t);
        leftX = (meetPoint - nodeRadius) + (restLeft - meetPoint + nodeRadius) * ease;
        rightX = (meetPoint + nodeRadius) + (restRight - meetPoint - nodeRadius) * ease;
        connected = false;
      } else {
        // Pause at rest
        leftX = restLeft;
        rightX = restRight;
        connected = false;
      }

      connectFlash *= 0.93;

      // Connection flash
      if (connectFlash > 0.01) {
        const glow = ctx.createRadialGradient(meetPoint, cy, 0, meetPoint, cy, nodeRadius * 3);
        glow.addColorStop(0, `${color}${hex(connectFlash * 0.3 * 255)}`);
        glow.addColorStop(1, `${color}00`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(meetPoint, cy, nodeRadius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connected line + data pulses
      if (connected) {
        // Line between nodes
        ctx.beginPath();
        ctx.moveTo(leftX + nodeRadius * 0.5, cy);
        ctx.lineTo(rightX - nodeRadius * 0.5, cy);
        ctx.strokeStyle = `${color}${hex(0.25 * 255)}`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Data pulses traveling along the line
        for (let i = 0; i < 3; i++) {
          const t = ((pulseT * 0.8 + i * 0.33) % 1);
          const px = leftX + (rightX - leftX) * t;
          const alpha = Math.sin(t * Math.PI) * 0.7;

          const pg = ctx.createRadialGradient(px, cy, 0, px, cy, 8);
          pg.addColorStop(0, `${color}${hex(alpha * 255)}`);
          pg.addColorStop(1, `${color}00`);
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, cy, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(alpha * 1.2 * 255)}`;
          ctx.arc(px, cy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw nodes
      [leftX, rightX].forEach((nx, i) => {
        // Outer glow
        const glow = ctx.createRadialGradient(nx, cy, nodeRadius * 0.6, nx, cy, nodeRadius * 1.5);
        glow.addColorStop(0, `${color}${hex(0.06 * 255)}`);
        glow.addColorStop(1, `${color}00`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(nx, cy, nodeRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(nx, cy, nodeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(0.3 * 255)}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = `${color}${hex(0.04 * 255)}`;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(0.4 * 255)}`;
        ctx.arc(nx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.life -= 0.016;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }

        const alpha = s.life * 0.6;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(alpha * 255)}`;
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener("resize", resize); };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default IntegrationPlug;
