"use client";

import React, { useEffect, useRef } from "react";

interface RetentionLoopProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function RetentionLoop({ color = "#0000FF", className = "", paused = false }: RetentionLoopProps) {
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

    // Figure-8 / lemniscate path
    const getCx = () => w * 0.5;
    const getCy = () => h * 0.45;
    const getScaleX = () => w * 0.3;
    const getScaleY = () => h * 0.22;

    const getLoopPos = (t: number) => {
      // Lemniscate of Bernoulli
      const sint = Math.sin(t);
      const cost = Math.cos(t);
      const denom = 1 + sint * sint;
      return {
        x: getCx() + (getScaleX() * cost) / denom,
        y: getCy() + (getScaleY() * sint * cost) / denom,
      };
    };

    // The "churn zone" - where dots might exit (right side of the loop)
    const churnAngle = 0; // right-most point
    const attractorStrength = 0.06;

    // Dots (users) on the loop
    interface Dot {
      t: number; // position on lemniscate (0 to 2PI)
      speed: number;
      baseSpeed: number;
      size: number;
      phase: number;
      streak: number;
      showStreak: boolean;
      streakTimer: number;
      retained: boolean;
      retainTimer: number;
      driftX: number; // how far the dot drifts away from the path
      driftY: number;
    }

    const dotCount = 16;
    const dots: Dot[] = [];
    for (let i = 0; i < dotCount; i++) {
      dots.push({
        t: (Math.PI * 2 * i) / dotCount + Math.random() * 0.3,
        speed: 0.3 + Math.random() * 0.2,
        baseSpeed: 0.3 + Math.random() * 0.2,
        size: 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        streak: Math.floor(1 + Math.random() * 5),
        showStreak: false,
        streakTimer: 0,
        retained: false,
        retainTimer: 0,
        driftX: 0,
        driftY: 0,
      });
    }

    // Attractor pulse
    let attractorPulseAge = 0;
    let attractorActive = false;
    let attractorTimer = 0;

    // Streak pop-ups
    interface StreakPop { x: number; y: number; value: number; age: number }
    const streakPops: StreakPop[] = [];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Trigger attractor pulse every 3s
      attractorTimer += 0.016;
      if (attractorTimer > 3) {
        attractorTimer = 0;
        attractorActive = true;
        attractorPulseAge = 0;
      }
      if (attractorActive) {
        attractorPulseAge += 0.016;
        if (attractorPulseAge > 2) attractorActive = false;
      }

      // Draw the figure-8 path
      ctx.beginPath();
      const pathSteps = 200;
      for (let i = 0; i <= pathSteps; i++) {
        const t = (Math.PI * 2 * i) / pathSteps;
        const p = getLoopPos(t);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = `${color}${hex(12)}`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw secondary dashed inner path
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      for (let i = 0; i <= pathSteps; i++) {
        const t = (Math.PI * 2 * i) / pathSteps;
        const p = getLoopPos(t);
        // Slightly offset
        const p2 = getLoopPos(t + 0.02);
        const nx = -(p2.y - p.y);
        const ny = p2.x - p.x;
        const len = Math.sqrt(nx * nx + ny * ny) || 1;
        const offset = 8;
        const px = p.x + (nx / len) * offset;
        const py = p.y + (ny / len) * offset;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = `${color}${hex(6)}`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw attractor zone (right side)
      const attractorPos = getLoopPos(churnAngle);

      // Attractor magnetic field lines
      if (attractorActive) {
        const intensity = Math.max(0, 1 - attractorPulseAge / 2);
        const fieldRadius = 30 + attractorPulseAge * 20;

        // Pulsing ring
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(intensity * 0.15 * 255)}`;
        ctx.lineWidth = 2 * intensity;
        ctx.arc(attractorPos.x, attractorPos.y, fieldRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glow
        const ag = ctx.createRadialGradient(
          attractorPos.x, attractorPos.y, 0,
          attractorPos.x, attractorPos.y, fieldRadius * 0.8
        );
        ag.addColorStop(0, `${color}${hex(intensity * 25)}`);
        ag.addColorStop(0.5, `${color}${hex(intensity * 8)}`);
        ag.addColorStop(1, `${color}00`);
        ctx.fillStyle = ag;
        ctx.beginPath();
        ctx.arc(attractorPos.x, attractorPos.y, fieldRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Inward arrows/lines
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 * i) / 6 + time * 0.5;
          const outerR = fieldRadius * (0.8 + Math.sin(time * 3 + i) * 0.2);
          const innerR = 12;
          const ox = attractorPos.x + Math.cos(angle) * outerR;
          const oy = attractorPos.y + Math.sin(angle) * outerR;
          const ix = attractorPos.x + Math.cos(angle) * innerR;
          const iy = attractorPos.y + Math.sin(angle) * innerR;

          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(intensity * 0.08 * 255)}`;
          ctx.lineWidth = 1;
          ctx.moveTo(ox, oy);
          ctx.lineTo(ix, iy);
          ctx.stroke();
        }
      }

      // Subtle permanent attractor glow
      const permGlow = ctx.createRadialGradient(
        attractorPos.x, attractorPos.y, 0,
        attractorPos.x, attractorPos.y, 25
      );
      permGlow.addColorStop(0, `${color}${hex(12)}`);
      permGlow.addColorStop(1, `${color}00`);
      ctx.fillStyle = permGlow;
      ctx.beginPath();
      ctx.arc(attractorPos.x, attractorPos.y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw dots
      dots.forEach((dot) => {
        dot.t += dot.speed * 0.016;
        if (dot.t > Math.PI * 2) dot.t -= Math.PI * 2;

        const pos = getLoopPos(dot.t);

        // Near churn zone? Apply drift outward then attractor pulls back
        const distToChurn = Math.abs(dot.t - churnAngle) < 0.5 || Math.abs(dot.t - churnAngle - Math.PI * 2) < 0.5;
        if (distToChurn && !dot.retained) {
          // Start drifting outward
          dot.driftX += (Math.random() - 0.3) * 0.3;
          dot.driftY += (Math.random() - 0.5) * 0.2;

          // Attractor pulls back
          if (attractorActive || true) { // always some pull
            const pullStrength = attractorActive ? attractorStrength * 3 : attractorStrength;
            dot.driftX *= (1 - pullStrength);
            dot.driftY *= (1 - pullStrength);

            if (Math.abs(dot.driftX) > 8) {
              dot.retained = true;
              dot.retainTimer = 1;
              dot.streak++;
              dot.showStreak = true;
              dot.streakTimer = 1.2;
              streakPops.push({
                x: pos.x + dot.driftX,
                y: pos.y + dot.driftY - 10,
                value: dot.streak,
                age: 0,
              });
            }
          }
        } else {
          // Decay drift back to path
          dot.driftX *= 0.95;
          dot.driftY *= 0.95;
        }

        if (dot.retained) {
          dot.retainTimer -= 0.016;
          if (dot.retainTimer <= 0) dot.retained = false;
        }
        if (dot.showStreak) {
          dot.streakTimer -= 0.016;
          if (dot.streakTimer <= 0) dot.showStreak = false;
        }

        const drawX = pos.x + dot.driftX;
        const drawY = pos.y + dot.driftY;

        const pulse = Math.sin(time * 1.5 + dot.phase) * 0.5 + 0.5;
        const retainGlow = dot.retained ? dot.retainTimer : 0;
        const s = dot.size + pulse * 0.5 + retainGlow * 1.5;

        // Retain flash
        if (retainGlow > 0.5) {
          const rg = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, s * 5);
          rg.addColorStop(0, `${color}${hex(retainGlow * 40)}`);
          rg.addColorStop(1, `${color}00`);
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.arc(drawX, drawY, s * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Outer glow
        const og = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, s * 2);
        og.addColorStop(0, `${color}${hex((0.05 + retainGlow * 0.12) * 255)}`);
        og.addColorStop(1, `${color}00`);
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s * 2, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex((0.1 + pulse * 0.06 + retainGlow * 0.3) * 255)}`;
        ctx.arc(drawX, drawY, s, 0, Math.PI * 2);
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex((0.08 + retainGlow * 0.2) * 255)}`;
        ctx.lineWidth = 0.6;
        ctx.arc(drawX, drawY, s + 1.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw streak pop-ups
      for (let i = streakPops.length - 1; i >= 0; i--) {
        const sp = streakPops[i];
        sp.age += 0.016;
        if (sp.age > 1.5) { streakPops.splice(i, 1); continue; }

        const progress = sp.age / 1.5;
        const alpha = Math.max(0, (1 - progress) * 0.5);
        const yOff = -progress * 20;

        ctx.font = `bold 9px monospace`;
        ctx.fillStyle = `${color}${hex(alpha * 255)}`;
        ctx.textAlign = "center";
        ctx.fillText(`${sp.value}x`, sp.x, sp.y + yOff);
      }

      // Center crossing point decoration
      const center = getLoopPos(Math.PI / 2);
      ctx.beginPath();
      ctx.fillStyle = `${color}${hex(8)}`;
      ctx.arc(getCx(), getCy(), 4, 0, Math.PI * 2);
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

export default RetentionLoop;
