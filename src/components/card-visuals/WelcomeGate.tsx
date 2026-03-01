"use client";

import React, { useEffect, useRef } from "react";

interface WelcomeGateProps {
  color?: string;
  className?: string;
  paused?: boolean;
  speed?: number;
}

export function WelcomeGate({ color = "#0000FF", className = "", paused = false, speed: speedProp = 1 }: WelcomeGateProps) {
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

    // Pulse / heartbeat monitor — flatline then activation
    const padding = w * 0.06;
    const lineLeft = padding;
    const lineRight = w - padding;
    const lineWidth = lineRight - lineLeft;
    const baseY = h * 0.35;

    // The pulse waveform: normalized x (0-1) → y offset
    // Flatline → hook spike → alive heartbeats
    const hookPoint = 0.3; // where the "hook" activation happens

    // Beat particles
    interface BeatParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
    }

    let beatParticles: BeatParticle[] = [];

    // Scanning cursor position (0-1)
    let cursor = 0;
    let time = 0;
    let activated = false;
    let activationFlash = 0;

    // Build waveform path points
    const getWaveY = (t: number): number => {
      if (t < hookPoint - 0.02) {
        // Flatline with very subtle noise
        return Math.sin(t * 80) * 0.5;
      }
      if (t < hookPoint + 0.02) {
        // The hook spike — sharp up then down
        const local = (t - (hookPoint - 0.02)) / 0.04;
        if (local < 0.3) return -local * 90;
        if (local < 0.5) return -27 + (local - 0.3) * 180;
        if (local < 0.7) return 9 - (local - 0.5) * 90;
        return -9 + (local - 0.7) * 30;
      }
      // After hook — alive heartbeats
      const afterHook = t - hookPoint - 0.02;
      const beatFreq = 14;
      const beatPhase = afterHook * beatFreq * Math.PI * 2;
      // ECG-like shape: sharp peak then small dip
      const beat = Math.sin(beatPhase);
      const sharp = Math.exp(-Math.pow((beatPhase % (Math.PI * 2)) - 1, 2) * 2);
      const amplitude = 18 + afterHook * 15; // grows stronger
      return -(beat * 0.3 + sharp * 0.7) * amplitude;
    };

    const spawnBeatBurst = (bx: number, by: number) => {
      const count = 6;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = 0.8 + Math.random() * 1.5;
        beatParticles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 1.5,
          alpha: 0.4 + Math.random() * 0.3,
          life: 1,
        });
      }
    };

    let lastBeatSign = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016 * speedProp;

      // Advance cursor
      cursor += 0.003 * speedProp;
      if (cursor > 1.15) {
        cursor = 0;
        activated = false;
        lastBeatSign = 0;
        beatParticles = [];
      }

      // Activation flash
      if (!activated && cursor >= hookPoint) {
        activated = true;
        activationFlash = 1;
        spawnBeatBurst(lineLeft + hookPoint * lineWidth, baseY + getWaveY(hookPoint));
      }

      if (activationFlash > 0) {
        activationFlash -= 0.02 * speedProp;
        if (activationFlash < 0) activationFlash = 0;

        const flashX = lineLeft + hookPoint * lineWidth;
        const flashR = 40 + activationFlash * 30;
        const fg = ctx.createRadialGradient(flashX, baseY, 0, flashX, baseY, flashR);
        fg.addColorStop(0, `${color}${hex(activationFlash * 0.3 * 255)}`);
        fg.addColorStop(0.5, `${color}${hex(activationFlash * 0.08 * 255)}`);
        fg.addColorStop(1, `${color}00`);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(flashX, baseY, flashR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Detect heartbeat peaks for particle bursts (after activation)
      if (cursor > hookPoint + 0.04) {
        const currentY = getWaveY(cursor);
        const currentSign = currentY < -10 ? -1 : 0;
        if (currentSign === -1 && lastBeatSign === 0) {
          const bx = lineLeft + cursor * lineWidth;
          const by = baseY + currentY;
          spawnBeatBurst(bx, by);
        }
        lastBeatSign = currentSign;
      }

      // Draw baseline (subtle)
      ctx.beginPath();
      ctx.moveTo(lineLeft, baseY);
      ctx.lineTo(lineRight, baseY);
      ctx.strokeStyle = `${color}06`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw the waveform trail (only up to cursor)
      const drawEnd = Math.min(cursor, 1);
      const steps = Math.floor(drawEnd * 200);
      if (steps > 1) {
        // Pre-hook section (dim)
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
          const t = (i / 200);
          if (t > hookPoint - 0.01) break;
          const px = lineLeft + t * lineWidth;
          const py = baseY + getWaveY(t);
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `${color}${hex(0.1 * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Hook spike + post-hook (bright)
        if (cursor > hookPoint - 0.01) {
          ctx.beginPath();
          started = false;
          for (let i = 0; i <= steps; i++) {
            const t = (i / 200);
            if (t < hookPoint - 0.01) continue;
            const px = lineLeft + t * lineWidth;
            const py = baseY + getWaveY(t);
            if (!started) { ctx.moveTo(px, py); started = true; }
            else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = `${color}${hex(0.3 * 255)}`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Glow line on top
          ctx.beginPath();
          started = false;
          for (let i = 0; i <= steps; i++) {
            const t = (i / 200);
            if (t < hookPoint - 0.01) continue;
            const px = lineLeft + t * lineWidth;
            const py = baseY + getWaveY(t);
            if (!started) { ctx.moveTo(px, py); started = true; }
            else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = `${color}${hex(0.08 * 255)}`;
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      }

      // Cursor dot (scanning head)
      if (cursor <= 1) {
        const cursorX = lineLeft + cursor * lineWidth;
        const cursorY = baseY + getWaveY(cursor);
        const isActive = cursor >= hookPoint;

        // Cursor glow
        const glowR = isActive ? 12 : 6;
        const cg = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, glowR);
        cg.addColorStop(0, `${color}${hex((isActive ? 0.35 : 0.15) * 255)}`);
        cg.addColorStop(1, `${color}00`);
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Cursor core
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, isActive ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex((isActive ? 0.7 : 0.4) * 255)}`;
        ctx.fill();

        // Vertical scan line
        ctx.beginPath();
        ctx.moveTo(cursorX, baseY - 35);
        ctx.lineTo(cursorX, baseY + 35);
        ctx.strokeStyle = `${color}${hex(0.04 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Update and draw beat particles
      for (let i = beatParticles.length - 1; i >= 0; i--) {
        const p = beatParticles[i];
        p.x += p.vx * speedProp;
        p.y += p.vy * speedProp;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.015 * speedProp;
        p.alpha = p.life * 0.4;

        if (p.life <= 0) {
          beatParticles.splice(i, 1);
          continue;
        }

        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        pg.addColorStop(0, `${color}${hex(p.alpha * 0.3 * 255)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(p.alpha * 0.6 * 255)}`;
        ctx.fill();
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
  }, [color, speedProp]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default WelcomeGate;
