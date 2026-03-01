"use client";

import React, { useEffect, useRef } from "react";

interface ROICascadeProps {
  color?: string;
  className?: string;
  paused?: boolean;
  speed?: number;
}

export function ROICascade({ color = "#0000FF", className = "", paused = false, speed: speedProp = 1 }: ROICascadeProps) {
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

    const cx = w / 2;
    const ringY = h * 0.34;
    const ringMinR = Math.min(w, h) * 0.08;
    const ringMaxR = Math.min(w, h) * 0.14;
    let ringRadius = ringMinR + Math.random() * (ringMaxR - ringMinR);
    let ringTargetRadius = ringRadius;

    // Orbiting electrons
    interface Electron {
      angle: number;
      speed: number;
      orbitRadius: number; // offset from ring radius
      size: number;
    }

    const electrons: Electron[] = [];
    const electronCount = 3;
    for (let i = 0; i < electronCount; i++) {
      electrons.push({
        angle: (i / electronCount) * Math.PI * 2,
        speed: 0.025 + i * 0.008,
        orbitRadius: 4 + i * 3,
        size: 2 + i * 0.5,
      });
    }

    // Coin state
    let coinY = h * 0.06;
    let coinVy = 0;
    let coinAlpha = 1;
    let coinDropping = true;
    let coinVisible = true;

    // Impact state
    let impactFlash = 0;
    let ringPulse = 0;

    // Burst particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      gravity: number;
    }

    let particles: Particle[] = [];

    // Cycle state
    let phase: "dropping" | "burst" | "waiting" = "dropping";
    let waitTimer = 0;
    let time = 0;

    const spawnBurst = () => {
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = 2 + Math.random() * 3.5;
        const size = 1.5 + Math.random() * 2.5;
        particles.push({
          x: cx + Math.cos(angle) * ringRadius * 0.3,
          y: ringY + Math.sin(angle) * ringRadius * 0.3,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.8,
          size,
          alpha: 0.6 + Math.random() * 0.4,
          decay: 0.005 + Math.random() * 0.003,
          gravity: 0.006 + Math.random() * 0.004,
        });
      }
    };

    const resetCoin = () => {
      coinY = h * 0.06;
      coinVy = 0;
      coinAlpha = 1;
      coinDropping = true;
      coinVisible = true;
      phase = "dropping";
      ringTargetRadius = ringMinR + Math.random() * (ringMaxR - ringMinR);
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016 * speedProp;

      // Lerp ring radius toward target
      ringRadius += (ringTargetRadius - ringRadius) * 0.02 * speedProp;

      // --- Multiplier ring (always visible) ---
      const ringBreath = Math.sin(time * 2) * 0.03;
      const ringBaseAlpha = 0.12 + ringBreath;

      // Ring outer glow
      const glowSpread = ringRadius * 0.6;
      const rg = ctx.createRadialGradient(cx, ringY, ringRadius - 2, cx, ringY, ringRadius + glowSpread);
      rg.addColorStop(0, `${color}${hex((ringBaseAlpha + ringPulse * 0.4) * 255)}`);
      rg.addColorStop(1, `${color}00`);
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(cx, ringY, ringRadius + glowSpread, 0, Math.PI * 2);
      ctx.fill();

      // Ring circle
      ctx.beginPath();
      ctx.arc(cx, ringY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}${hex((0.2 + ringPulse * 0.6) * 255)}`;
      ctx.lineWidth = 1.5 + ringPulse * 2;
      ctx.stroke();

      // Inner ring fill
      ctx.beginPath();
      ctx.arc(cx, ringY, ringRadius, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${hex((0.04 + ringPulse * 0.15) * 255)}`;
      ctx.fill();

      // Impact flash
      if (impactFlash > 0) {
        impactFlash -= 0.03 * speedProp;
        const flashR = ringRadius * 4;
        const fg = ctx.createRadialGradient(cx, ringY, 0, cx, ringY, flashR);
        fg.addColorStop(0, `${color}${hex(impactFlash * 0.5 * 255)}`);
        fg.addColorStop(0.4, `${color}${hex(impactFlash * 0.15 * 255)}`);
        fg.addColorStop(1, `${color}00`);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(cx, ringY, flashR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ring pulse decay
      if (ringPulse > 0) {
        ringPulse -= 0.02 * speedProp;
        if (ringPulse < 0) ringPulse = 0;
      }

      // --- Orbiting electrons ---
      for (let i = 0; i < electrons.length; i++) {
        const e = electrons[i];
        e.angle += e.speed * speedProp;

        const eR = ringRadius + e.orbitRadius;
        const ex = cx + Math.cos(e.angle) * eR;
        const ey = ringY + Math.sin(e.angle) * eR;

        // Electron trail
        const trailArc = 0.4;
        const trailStart = e.angle - trailArc;
        ctx.beginPath();
        ctx.arc(cx, ringY, eR, trailStart, e.angle);
        ctx.strokeStyle = `${color}${hex(0.12 * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron glow
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, e.size * 3);
        eg.addColorStop(0, `${color}${hex(0.3 * 255)}`);
        eg.addColorStop(1, `${color}00`);
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(ex, ey, e.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Electron core
        ctx.beginPath();
        ctx.arc(ex, ey, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(0.6 * 255)}`;
        ctx.fill();
      }

      // --- Coin dropping phase ---
      if (phase === "dropping" && coinVisible) {
        coinVy += 0.08 * speedProp;
        coinY += coinVy * speedProp;

        // Draw falling coin
        const coinSize = 6;

        // Coin trail
        const trailLen = Math.min(coinVy * 6, 30);
        if (trailLen > 2) {
          const tg = ctx.createLinearGradient(cx, coinY - trailLen, cx, coinY);
          tg.addColorStop(0, `${color}00`);
          tg.addColorStop(1, `${color}${hex(coinAlpha * 0.2 * 255)}`);
          ctx.beginPath();
          ctx.moveTo(cx, coinY - trailLen);
          ctx.lineTo(cx, coinY);
          ctx.strokeStyle = tg;
          ctx.lineWidth = coinSize * 0.8;
          ctx.stroke();
        }

        // Coin glow
        const cg = ctx.createRadialGradient(cx, coinY, 0, cx, coinY, coinSize * 3);
        cg.addColorStop(0, `${color}${hex(coinAlpha * 0.3 * 255)}`);
        cg.addColorStop(1, `${color}00`);
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(cx, coinY, coinSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Coin core
        ctx.beginPath();
        ctx.arc(cx, coinY, coinSize, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(coinAlpha * 0.7 * 255)}`;
        ctx.fill();

        // Coin ring
        ctx.beginPath();
        ctx.arc(cx, coinY, coinSize, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(coinAlpha * 0.3 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Check collision with multiplier ring
        if (coinY >= ringY - 2) {
          coinVisible = false;
          phase = "burst";
          impactFlash = 1;
          ringPulse = 1;
          spawnBurst();
          waitTimer = 0;
        }
      }

      // --- Burst phase ---
      if (phase === "burst") {
        waitTimer += 0.016 * speedProp;

        // Check if all particles are done
        if (particles.length === 0 && waitTimer > 0.5) {
          phase = "waiting";
          waitTimer = 0;
        }
      }

      // --- Waiting phase ---
      if (phase === "waiting") {
        waitTimer += 0.016 * speedProp;
        if (waitTimer > 1.2) {
          resetCoin();
        }
      }

      // --- Update and draw particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * speedProp;
        p.y += p.vy * speedProp;
        p.vy += p.gravity * speedProp;
        p.vx *= 0.995;
        p.alpha -= p.decay * speedProp;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Particle glow
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        pg.addColorStop(0, `${color}${hex(p.alpha * 0.25 * 255)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(p.alpha * 0.65 * 255)}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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

export default ROICascade;
