"use client";

import React, { useEffect, useRef } from "react";

interface AnchorLockProps {
  color?: string;
  className?: string;
  paused?: boolean;
  speed?: number;
}

export function AnchorLock({ color = "#0000FF", className = "", paused = false, speed: speedProp = 1 }: AnchorLockProps) {
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
    const cy = h * 0.37;
    const vaultRadius = Math.min(w, h) * 0.15;

    // Token dots that drift inward
    interface Token {
      x: number;
      y: number;
      angle: number;
      dist: number;
      speed: number;
      locked: boolean;
      lockAngle: number;
      size: number;
      alpha: number;
    }

    const tokens: Token[] = [];

    // Rebate particles that shoot outward
    interface Rebate {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      alpha: number;
    }

    const rebates: Rebate[] = [];

    // Concentric ring pulses
    interface Ring {
      radius: number;
      alpha: number;
      expanding: boolean;
    }

    const rings: Ring[] = [];

    // Orbiting arcs — spawn randomly, rotate 1-2 turns then fade
    interface OrbArc {
      radius: number;       // distance from center
      startAngle: number;   // current start angle
      sweep: number;        // arc length in radians
      rotSpeed: number;     // rotation speed (rad/frame)
      life: number;         // 0-1, fades out
      maxLife: number;      // total life
      alpha: number;        // base opacity
      lineWidth: number;    // stroke width
    }

    const orbArcs: OrbArc[] = [];
    let arcSpawnTimer = 1;

    const spawnArc = () => {
      const turns = 1 + Math.random(); // 1-2 turns
      const rotSpeed = (0.015 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1);
      const totalLife = (turns * Math.PI * 2) / Math.abs(rotSpeed); // frames to complete turns
      orbArcs.push({
        radius: vaultRadius * (1.2 + Math.random() * 1.3),
        startAngle: Math.random() * Math.PI * 2,
        sweep: Math.PI * (0.3 + Math.random() * 0.8),
        rotSpeed,
        life: 1,
        maxLife: totalLife,
        alpha: 0.15 + Math.random() * 0.2,
        lineWidth: 1 + Math.random() * 3,
      });
    };

    // Seed initial arcs immediately
    for (let i = 0; i < 3; i++) spawnArc();

    let time = 0;
    let fillArc = 0;
    let tokenSpawnTimer = 0;
    let rebateTimer = 0;
    let ringTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016 * speedProp;

      // Spawn tokens from edges
      tokenSpawnTimer += 0.016;
      if (tokenSpawnTimer > 0.8 && tokens.length < 20) {
        tokenSpawnTimer = 0;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(w, h) * 0.5;
        tokens.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          angle,
          dist,
          speed: 0.4 + Math.random() * 0.3,
          locked: false,
          lockAngle: 0,
          size: 2 + Math.random() * 2,
          alpha: 0.6 + Math.random() * 0.4,
        });
      }

      // Spawn ring pulses
      ringTimer += 0.016;
      if (ringTimer > 2) {
        ringTimer = 0;
        rings.push({ radius: vaultRadius * 0.5, alpha: 0.3, expanding: true });
      }

      // Rebate bursts periodically
      rebateTimer += 0.016;
      if (rebateTimer > 3 && fillArc > Math.PI * 0.5) {
        rebateTimer = 0;
        const burstCount = 4 + Math.floor(Math.random() * 4);
        for (let i = 0; i < burstCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 2;
          rebates.push({
            x: cx + Math.cos(angle) * (vaultRadius + 5),
            y: cy + Math.sin(angle) * (vaultRadius + 5),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            alpha: 0.8,
          });
        }
        // Reduce fill on rebate
        fillArc = Math.max(0, fillArc - Math.PI * 0.3);
      }

      // Spawn new arcs periodically (keep 2-3 alive)
      arcSpawnTimer += 0.016 * speedProp;
      if (arcSpawnTimer > 1.5 && orbArcs.length < 3) {
        arcSpawnTimer = 0;
        spawnArc();
      }

      // Central vault outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, vaultRadius + 8, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}08`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Update and draw orbiting arcs
      for (let i = orbArcs.length - 1; i >= 0; i--) {
        const arc = orbArcs[i];
        arc.startAngle += arc.rotSpeed * speedProp;
        arc.life -= (1 / arc.maxLife) * speedProp;

        if (arc.life <= 0) { orbArcs.splice(i, 1); continue; }

        // Fade in at start, fade out at end
        const fadeFactor = arc.life < 0.2 ? arc.life / 0.2 : arc.life > 0.8 ? (1 - arc.life) / 0.2 : 1;
        const a = arc.alpha * fadeFactor;

        // Arc stroke
        ctx.beginPath();
        ctx.arc(cx, cy, arc.radius, arc.startAngle, arc.startAngle + arc.sweep);
        ctx.strokeStyle = `${color}${hex(a * 255)}`;
        ctx.lineWidth = arc.lineWidth;
        ctx.stroke();

        // Arc glow
        ctx.beginPath();
        ctx.arc(cx, cy, arc.radius, arc.startAngle, arc.startAngle + arc.sweep);
        ctx.strokeStyle = `${color}${hex(a * 0.3 * 255)}`;
        ctx.lineWidth = arc.lineWidth * 3;
        ctx.stroke();
      }

      // Vault circle
      ctx.beginPath();
      ctx.arc(cx, cy, vaultRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}15`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner vault fill
      const vg = ctx.createRadialGradient(cx, cy, 0, cx, cy, vaultRadius);
      vg.addColorStop(0, `${color}${hex(6 + Math.sin(time) * 2)}`);
      vg.addColorStop(1, `${color}02`);
      ctx.fillStyle = vg;
      ctx.beginPath(); ctx.arc(cx, cy, vaultRadius, 0, Math.PI * 2); ctx.fill();

      // Inner concentric rings (static)
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, vaultRadius * (r / 4), 0, Math.PI * 2);
        ctx.strokeStyle = `${color}06`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Vault center dot
      ctx.beginPath();
      ctx.fillStyle = `${color}${hex(0.15 * 255)}`;
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        if (ring.expanding) {
          ring.radius += 0.8;
          ring.alpha *= 0.985;
        }
        if (ring.alpha < 0.01) { rings.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(ring.alpha * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update and draw tokens
      for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

        if (!token.locked) {
          // Move toward center with slight spiral
          const dx = cx - token.x;
          const dy = cy - token.y;
          const dist = Math.hypot(dx, dy);

          if (dist < vaultRadius + 10) {
            // Lock onto vault ring
            token.locked = true;
            token.lockAngle = Math.atan2(token.y - cy, token.x - cx);
            fillArc = Math.min(Math.PI * 2, fillArc + Math.PI * 0.12);
          } else {
            // Spiral inward
            const angle = Math.atan2(dy, dx);
            const spiralAngle = angle + 0.3;
            token.x += Math.cos(spiralAngle) * token.speed;
            token.y += Math.sin(spiralAngle) * token.speed;
          }

          // Draw token with trail
          const tg = ctx.createRadialGradient(token.x, token.y, 0, token.x, token.y, token.size * 3);
          tg.addColorStop(0, `${color}${hex(token.alpha * 40)}`);
          tg.addColorStop(1, `${color}00`);
          ctx.fillStyle = tg;
          ctx.beginPath(); ctx.arc(token.x, token.y, token.size * 3, 0, Math.PI * 2); ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(token.alpha * 0.6 * 255)}`;
          ctx.arc(token.x, token.y, token.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Locked token sits on vault ring, then fades
          token.alpha -= 0.008;
          if (token.alpha <= 0) { tokens.splice(i, 1); continue; }

          const lx = cx + Math.cos(token.lockAngle) * (vaultRadius + 8);
          const ly = cy + Math.sin(token.lockAngle) * (vaultRadius + 8);

          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(token.alpha * 0.5 * 255)}`;
          ctx.arc(lx, ly, token.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update and draw rebates
      for (let i = rebates.length - 1; i >= 0; i--) {
        const r = rebates[i];
        r.x += r.vx;
        r.y += r.vy;
        r.life -= 0.015;
        r.alpha = r.life;

        if (r.life <= 0) { rebates.splice(i, 1); continue; }

        // Rebate glow
        const rg = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 6);
        rg.addColorStop(0, `${color}${hex(r.alpha * 50)}`);
        rg.addColorStop(1, `${color}00`);
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(r.x, r.y, 6, 0, Math.PI * 2); ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(r.alpha * 0.7 * 255)}`;
        ctx.arc(r.x, r.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Slowly decay fill arc
      fillArc *= 0.999;

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

export default AnchorLock;
