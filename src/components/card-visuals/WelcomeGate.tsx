"use client";

import React, { useEffect, useRef } from "react";

interface WelcomeGateProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function WelcomeGate({ color = "#0000FF", className = "", paused = false }: WelcomeGateProps) {
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

    // Gate configuration
    const gateX = w / 2;
    const gateY = h * 0.45;
    const gateWidth = 40;
    const gateHeight = 60;
    const archRadius = gateWidth / 2;

    // Celebration particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      alpha: number;
    }

    let particles: Particle[] = [];

    // User dot state
    let dotX = 0;
    let dotBrightness = 0.4;
    let phase: "approaching" | "entering" | "celebrating" | "exiting" | "waiting" = "waiting";
    let phaseTimer = 0;
    let burstTriggered = false;
    let starAlpha = 0;
    let welcomeAlpha = 0;

    const resetCycle = () => {
      dotX = w * 0.08;
      dotBrightness = 0.4;
      phase = "approaching";
      phaseTimer = 0;
      burstTriggered = false;
      starAlpha = 0;
      welcomeAlpha = 0;
      particles = [];
    };

    resetCycle();

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      phaseTimer += 0.016;

      const dotY = gateY + gateHeight * 0.3;

      // Draw the gate structure
      // Left pillar
      ctx.fillStyle = `${color}12`;
      ctx.fillRect(gateX - gateWidth / 2 - 4, gateY, 4, gateHeight);

      // Right pillar
      ctx.fillRect(gateX + gateWidth / 2, gateY, 4, gateHeight);

      // Arch
      ctx.beginPath();
      ctx.arc(gateX, gateY, archRadius, Math.PI, 0);
      ctx.strokeStyle = `${color}18`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Arch glow (subtle)
      const ag = ctx.createRadialGradient(gateX, gateY, archRadius - 5, gateX, gateY, archRadius + 10);
      ag.addColorStop(0, `${color}00`);
      ag.addColorStop(0.5, `${color}06`);
      ag.addColorStop(1, `${color}00`);
      ctx.fillStyle = ag;
      ctx.beginPath(); ctx.arc(gateX, gateY, archRadius + 10, Math.PI, 0); ctx.fill();

      // Base line
      ctx.beginPath();
      ctx.moveTo(gateX - gateWidth / 2 - 4, gateY + gateHeight);
      ctx.lineTo(gateX + gateWidth / 2 + 4, gateY + gateHeight);
      ctx.strokeStyle = `${color}10`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ground line
      ctx.beginPath();
      ctx.moveTo(w * 0.05, dotY + 8);
      ctx.lineTo(w * 0.95, dotY + 8);
      ctx.strokeStyle = `${color}06`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Phase logic
      if (phase === "approaching") {
        dotX += 0.8;
        if (dotX >= gateX - gateWidth / 2 - 5) {
          phase = "entering";
          phaseTimer = 0;
        }
      } else if (phase === "entering") {
        dotX += 0.6;
        // Brighten as entering gate
        dotBrightness = Math.min(0.7, dotBrightness + 0.005);
        if (dotX >= gateX && !burstTriggered) {
          burstTriggered = true;
          phase = "celebrating";
          phaseTimer = 0;
          // Spawn celebration particles
          for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const speed = 1 + Math.random() * 2.5;
            particles.push({
              x: gateX,
              y: gateY - 5,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1,
              life: 1,
              size: 1 + Math.random() * 2,
              alpha: 0.6 + Math.random() * 0.4,
            });
          }
        }
      } else if (phase === "celebrating") {
        dotX += 0.3;
        dotBrightness = Math.min(0.9, dotBrightness + 0.01);
        starAlpha = Math.min(1, starAlpha + 0.03);
        welcomeAlpha = Math.min(1, welcomeAlpha + 0.02);
        if (phaseTimer > 2.5) {
          phase = "exiting";
          phaseTimer = 0;
        }
      } else if (phase === "exiting") {
        dotX += 1;
        starAlpha = Math.max(0, starAlpha - 0.02);
        welcomeAlpha = Math.max(0, welcomeAlpha - 0.02);
        dotBrightness = Math.max(0.6, dotBrightness);
        if (dotX > w * 0.95) {
          phase = "waiting";
          phaseTimer = 0;
        }
      } else if (phase === "waiting") {
        if (phaseTimer > 1.5) {
          resetCycle();
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.life -= 0.012;
        p.alpha = p.life * 0.6;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Particle glow
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        pg.addColorStop(0, `${color}${hex(p.alpha * 40)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(p.alpha * 0.7 * 255)}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw star/reward above gate during celebration
      if (starAlpha > 0) {
        const starX = gateX;
        const starY = gateY - archRadius - 18;

        // Star glow
        const sg = ctx.createRadialGradient(starX, starY, 0, starX, starY, 14);
        sg.addColorStop(0, `${color}${hex(starAlpha * 50)}`);
        sg.addColorStop(1, `${color}00`);
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.arc(starX, starY, 14, 0, Math.PI * 2); ctx.fill();

        // 4-pointed star shape
        const sa = starAlpha * 0.6;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const r = i % 2 === 0 ? 7 : 3;
          const sx = starX + Math.cos(a) * r;
          const sy = starY + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fillStyle = `${color}${hex(sa * 255)}`;
        ctx.fill();
      }

      // "welcome" text during celebration
      if (welcomeAlpha > 0) {
        ctx.font = "8px system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = `${color}${hex(welcomeAlpha * 0.3 * 255)}`;
        ctx.fillText("welcome", gateX, gateY + gateHeight + 18);
      }

      // Draw user dot
      if (phase !== "waiting") {
        // Trail behind the dot
        const trailLen = phase === "exiting" ? 20 : 10;
        const tg = ctx.createLinearGradient(dotX - trailLen, 0, dotX, 0);
        tg.addColorStop(0, `${color}00`);
        tg.addColorStop(1, `${color}${hex(dotBrightness * 0.2 * 255)}`);
        ctx.beginPath();
        ctx.moveTo(dotX - trailLen, dotY);
        ctx.lineTo(dotX, dotY);
        ctx.strokeStyle = tg;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Dot glow
        const glowSize = 8 + dotBrightness * 6;
        const dg = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, glowSize);
        dg.addColorStop(0, `${color}${hex(dotBrightness * 40)}`);
        dg.addColorStop(1, `${color}00`);
        ctx.fillStyle = dg;
        ctx.beginPath(); ctx.arc(dotX, dotY, glowSize, 0, Math.PI * 2); ctx.fill();

        // Dot core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(dotBrightness * 0.8 * 255)}`;
        ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Brighter ring after activation
        if (dotBrightness > 0.6) {
          ctx.beginPath();
          ctx.arc(dotX, dotY, 5.5, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${hex((dotBrightness - 0.6) * 0.4 * 255)}`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Gate inner glow during entry
      if (phase === "entering" || phase === "celebrating") {
        const entryGlow = phase === "celebrating" ? 0.15 : 0.06;
        const gg = ctx.createRadialGradient(gateX, gateY + gateHeight / 2, 0, gateX, gateY + gateHeight / 2, gateWidth);
        gg.addColorStop(0, `${color}${hex(entryGlow * 255)}`);
        gg.addColorStop(1, `${color}00`);
        ctx.fillStyle = gg;
        ctx.fillRect(gateX - gateWidth / 2, gateY, gateWidth, gateHeight);
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

export default WelcomeGate;
