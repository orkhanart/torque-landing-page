"use client";

import React, { useEffect, useRef } from "react";

interface CampaignRadarProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function CampaignRadar({ color = "#0000FF", className = "", paused = false }: CampaignRadarProps) {
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

    const cx = () => w / 2;
    const cy = () => h / 2;
    const maxRadius = () => Math.max(w, h) * 0.55;

    // Targets scattered across canvas
    interface Target {
      angle: number;
      dist: number;
      activation: number;
      size: number;
      pulsePhase: number;
    }

    const targets: Target[] = [];
    const initTargets = () => {
      targets.length = 0;
      for (let i = 0; i < 35; i++) {
        targets.push({
          angle: Math.random() * Math.PI * 2,
          dist: 0.15 + Math.random() * 0.85,
          activation: 0,
          size: 3 + Math.random() * 5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };
    initTargets();

    let sweepAngle = 0;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const centerX = cx();
      const centerY = cy();
      const mR = maxRadius();

      // Faster sweep
      sweepAngle += 0.025;
      if (sweepAngle > Math.PI * 2) sweepAngle -= Math.PI * 2;

      // Concentric rings — large, filling the section
      const ringCount = 6;
      for (let i = 1; i <= ringCount; i++) {
        const r = (mR / ringCount) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(18)}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Cross axes
      ctx.strokeStyle = `${color}${hex(12)}`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(centerX - mR, centerY); ctx.lineTo(centerX + mR, centerY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(centerX, centerY - mR); ctx.lineTo(centerX, centerY + mR); ctx.stroke();
      // Diagonals
      ctx.strokeStyle = `${color}${hex(6)}`;
      ctx.beginPath(); ctx.moveTo(centerX - mR, centerY - mR); ctx.lineTo(centerX + mR, centerY + mR); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(centerX + mR, centerY - mR); ctx.lineTo(centerX - mR, centerY + mR); ctx.stroke();

      // Sweep trail — wide gradient arc
      const trailAngle = 1.0;
      const gradient = ctx.createConicGradient(sweepAngle - trailAngle, centerX, centerY);
      gradient.addColorStop(0, `${color}00`);
      gradient.addColorStop(trailAngle / (Math.PI * 2), `${color}${hex(30)}`);
      gradient.addColorStop((trailAngle + 0.01) / (Math.PI * 2), `${color}00`);
      gradient.addColorStop(1, `${color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, mR, sweepAngle - trailAngle, sweepAngle);
      ctx.closePath();
      ctx.fill();

      // Sweep line
      const sweepEndX = centerX + Math.cos(sweepAngle) * mR;
      const sweepEndY = centerY + Math.sin(sweepAngle) * mR;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepEndX, sweepEndY);
      ctx.strokeStyle = `${color}${hex(100)}`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Update targets
      targets.forEach(t => {
        let angleDiff = sweepAngle - t.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        if (Math.abs(angleDiff) < 0.12) {
          t.activation = 1;
        }
        t.activation *= 0.985;
      });

      // Draw connections between nearby activated targets
      for (let i = 0; i < targets.length; i++) {
        if (targets[i].activation < 0.25) continue;
        const t1 = targets[i];
        const x1 = centerX + Math.cos(t1.angle) * t1.dist * mR;
        const y1 = centerY + Math.sin(t1.angle) * t1.dist * mR;

        for (let j = i + 1; j < targets.length; j++) {
          if (targets[j].activation < 0.25) continue;
          const t2 = targets[j];
          const x2 = centerX + Math.cos(t2.angle) * t2.dist * mR;
          const y2 = centerY + Math.sin(t2.angle) * t2.dist * mR;
          const d = Math.hypot(x1 - x2, y1 - y2);
          if (d < 150) {
            const a = Math.min(t1.activation, t2.activation) * 0.4 * (1 - d / 150);
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex(a * 255)}`;
            ctx.lineWidth = 1;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Draw targets
      targets.forEach(t => {
        const tx = centerX + Math.cos(t.angle) * t.dist * mR;
        const ty = centerY + Math.sin(t.angle) * t.dist * mR;

        const pulse = Math.sin(time * 3 + t.pulsePhase) * 0.5 + 0.5;

        // Ripple ring on activation
        if (t.activation > 0.5) {
          const rippleR = t.size + (1 - t.activation) * 25;
          ctx.beginPath();
          ctx.arc(tx, ty, rippleR, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${hex((t.activation - 0.5) * 0.6 * 255)}`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Glow
        if (t.activation > 0.15) {
          const glowR = t.size * 3 + t.activation * 10;
          const glow = ctx.createRadialGradient(tx, ty, 0, tx, ty, glowR);
          glow.addColorStop(0, `${color}${hex(t.activation * 0.25 * 255)}`);
          glow.addColorStop(1, `${color}00`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(tx, ty, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        const baseAlpha = 0.12 + pulse * 0.08;
        const activeAlpha = t.activation * 0.7;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex((baseAlpha + activeAlpha) * 255)}`;
        ctx.arc(tx, ty, t.size * (0.8 + t.activation * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      // Center dot
      ctx.beginPath();
      ctx.fillStyle = `${color}${hex(80)}`;
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

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

export default CampaignRadar;
