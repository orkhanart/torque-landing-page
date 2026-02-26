"use client";

import React, { useEffect, useRef } from "react";

interface DurationLockProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function DurationLock({ color = "#0000FF", className = "", paused = false }: DurationLockProps) {
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

    // Progress bars configuration
    const barCount = 5;
    const barPadding = 30;
    const barLeft = w * 0.1;
    const barRight = w * 0.78;
    const barWidth = barRight - barLeft;
    const totalHeight = h * 0.65;
    const barStartY = h * 0.15;
    const barSpacing = totalHeight / barCount;
    const barHeight = 6;

    interface ProgressBar {
      progress: number; // 0-1
      threshold: number; // 0-1, when lock opens
      speed: number;
      unlocked: boolean;
      unlockGlow: number; // 0-1
      rebateParticles: RebateParticle[];
      rebateFired: boolean;
    }

    interface RebateParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      alpha: number;
      size: number;
    }

    const bars: ProgressBar[] = [];
    const thresholds = [0.4, 0.6, 0.75, 0.55, 0.85];
    const speeds = [0.0025, 0.0018, 0.0012, 0.0022, 0.001];

    for (let i = 0; i < barCount; i++) {
      bars.push({
        progress: 0,
        threshold: thresholds[i],
        speed: speeds[i],
        unlocked: false,
        unlockGlow: 0,
        rebateParticles: [],
        rebateFired: false,
      });
    }

    let time = 0;

    // Draw padlock shape
    const drawLock = (x: number, y: number, size: number, locked: boolean, alpha: number) => {
      const bodyW = size * 0.7;
      const bodyH = size * 0.5;
      const shackleR = size * 0.28;

      // Padlock body
      ctx.fillStyle = `${color}${hex(alpha * (locked ? 0.12 : 0.3) * 255)}`;
      ctx.fillRect(x - bodyW / 2, y - bodyH / 2 + 2, bodyW, bodyH);
      ctx.strokeStyle = `${color}${hex(alpha * (locked ? 0.15 : 0.4) * 255)}`;
      ctx.lineWidth = 0.8;
      ctx.strokeRect(x - bodyW / 2, y - bodyH / 2 + 2, bodyW, bodyH);

      // Shackle (arch on top)
      ctx.beginPath();
      if (locked) {
        ctx.arc(x, y - bodyH / 2 + 2, shackleR, Math.PI, 0);
      } else {
        // Open shackle - shifted right and up
        ctx.arc(x + 2, y - bodyH / 2 - 1, shackleR, Math.PI, 0);
      }
      ctx.strokeStyle = `${color}${hex(alpha * (locked ? 0.15 : 0.4) * 255)}`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Keyhole
      ctx.beginPath();
      ctx.arc(x, y + 1, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${hex(alpha * 0.3 * 255)}`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Time markers along bottom
      const timeMarkers = ["0h", "10h", "20h"];
      const markerY = barStartY + barSpacing * (barCount - 1) + 30;
      timeMarkers.forEach((label, i) => {
        const mx = barLeft + (i / (timeMarkers.length - 1)) * barWidth;
        ctx.font = "7px system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = `${color}18`;
        ctx.fillText(label, mx, markerY);

        // Tick mark
        ctx.beginPath();
        ctx.moveTo(mx, markerY - 10);
        ctx.lineTo(mx, markerY - 6);
        ctx.strokeStyle = `${color}10`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw each progress bar
      bars.forEach((bar, i) => {
        const barY = barStartY + i * barSpacing;

        // Update progress
        if (!bar.unlocked) {
          bar.progress = Math.min(1, bar.progress + bar.speed);
        }

        // Check threshold
        if (bar.progress >= bar.threshold && !bar.unlocked) {
          bar.unlocked = true;
          bar.rebateFired = false;
        }

        // Unlock glow
        if (bar.unlocked) {
          bar.unlockGlow = Math.min(1, bar.unlockGlow + 0.025);

          // Fire rebate particles once
          if (!bar.rebateFired && bar.unlockGlow > 0.3) {
            bar.rebateFired = true;
            const lockX = barRight + 18;
            for (let p = 0; p < 6; p++) {
              const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
              const speed = 1 + Math.random() * 2;
              bar.rebateParticles.push({
                x: lockX,
                y: barY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                alpha: 0.7,
                size: 1.5 + Math.random(),
              });
            }
          }
        }

        // Bar position label
        ctx.font = "7px system-ui";
        ctx.textAlign = "right";
        ctx.fillStyle = `${color}${hex((bar.unlocked ? 0.3 : 0.12) * 255)}`;
        ctx.fillText(`LP ${i + 1}`, barLeft - 8, barY + 3);

        // Bar background
        ctx.fillStyle = `${color}06`;
        ctx.fillRect(barLeft, barY - barHeight / 2, barWidth, barHeight);

        // Bar border
        ctx.strokeStyle = `${color}08`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(barLeft, barY - barHeight / 2, barWidth, barHeight);

        // Bar fill
        const fillWidth = barWidth * bar.progress;
        if (fillWidth > 0) {
          const fg = ctx.createLinearGradient(barLeft, 0, barLeft + fillWidth, 0);
          fg.addColorStop(0, `${color}${hex((bar.unlocked ? 0.25 : 0.12) * 255)}`);
          fg.addColorStop(1, `${color}${hex((bar.unlocked ? 0.35 : 0.18) * 255)}`);
          ctx.fillStyle = fg;
          ctx.fillRect(barLeft, barY - barHeight / 2, fillWidth, barHeight);

          // Fill edge glow
          if (!bar.unlocked) {
            const eg = ctx.createRadialGradient(barLeft + fillWidth, barY, 0, barLeft + fillWidth, barY, 8);
            eg.addColorStop(0, `${color}15`);
            eg.addColorStop(1, `${color}00`);
            ctx.fillStyle = eg;
            ctx.beginPath(); ctx.arc(barLeft + fillWidth, barY, 8, 0, Math.PI * 2); ctx.fill();
          }
        }

        // Threshold marker on bar
        const threshX = barLeft + barWidth * bar.threshold;
        ctx.beginPath();
        ctx.moveTo(threshX, barY - barHeight / 2 - 3);
        ctx.lineTo(threshX, barY + barHeight / 2 + 3);
        ctx.strokeStyle = `${color}${hex(bar.unlocked ? 0.3 * 255 : 0.1 * 255)}`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Lock icon
        const lockX = barRight + 18;
        const lockSize = 12;
        drawLock(lockX, barY, lockSize, !bar.unlocked, bar.unlocked ? bar.unlockGlow : 0.5);

        // Lock glow when unlocking
        if (bar.unlocked && bar.unlockGlow > 0) {
          const lg = ctx.createRadialGradient(lockX, barY, 0, lockX, barY, 14);
          lg.addColorStop(0, `${color}${hex(bar.unlockGlow * 25)}`);
          lg.addColorStop(1, `${color}00`);
          ctx.fillStyle = lg;
          ctx.beginPath(); ctx.arc(lockX, barY, 14, 0, Math.PI * 2); ctx.fill();
        }

        // Rebate particles
        for (let p = bar.rebateParticles.length - 1; p >= 0; p--) {
          const part = bar.rebateParticles[p];
          part.x += part.vx;
          part.y += part.vy;
          part.vy += 0.02;
          part.life -= 0.015;
          part.alpha = part.life * 0.6;

          if (part.life <= 0) {
            bar.rebateParticles.splice(p, 1);
            continue;
          }

          // Particle glow
          const pg = ctx.createRadialGradient(part.x, part.y, 0, part.x, part.y, part.size * 3);
          pg.addColorStop(0, `${color}${hex(part.alpha * 40)}`);
          pg.addColorStop(1, `${color}00`);
          ctx.fillStyle = pg;
          ctx.beginPath(); ctx.arc(part.x, part.y, part.size * 3, 0, Math.PI * 2); ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(part.alpha * 0.7 * 255)}`;
          ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Reset cycle when all bars are fully filled and unlocked
      if (bars.every(b => b.unlocked && b.progress >= 1 && b.rebateParticles.length === 0)) {
        if (time % 12 < 0.02) {
          bars.forEach(b => {
            b.progress = 0;
            b.unlocked = false;
            b.unlockGlow = 0;
            b.rebateFired = false;
          });
        }
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

export default DurationLock;
