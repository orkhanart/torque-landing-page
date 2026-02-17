"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface RankOrbitProps {
  color?: string;
  competitorCount?: number;
  className?: string;
}

export function RankOrbit({ color = "#0000FF", competitorCount = 6, className = "" }: RankOrbitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

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

    const cx = w / 2, cy = h / 2;
    const maxR = Math.min(w, h) * 0.4;
    const hex = (v: number) => Math.floor(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");

    interface Comp {
      angle: number;
      targetOrbit: number;
      currentOrbit: number;
      speed: number;
      baseSpeed: number;
      size: number;
      trail: { x: number; y: number; a: number }[];
      boostTimer: number;
    }

    const comps: Comp[] = [];
    for (let i = 0; i < competitorCount; i++) {
      comps.push({
        angle: (Math.PI * 2 * i) / competitorCount + Math.random() * 0.5,
        targetOrbit: i,
        currentOrbit: i,
        speed: 0.004 + Math.random() * 0.003,
        baseSpeed: 0.004 + Math.random() * 0.003,
        size: i === 0 ? 5 : 3 + Math.random(),
        trail: [],
        boostTimer: 0,
      });
    }

    let time = 0;
    let lastShuffle = 0;
    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      const mouse = mouseRef.current;

      // Rank shuffle every 4s
      if (time - lastShuffle > 4) {
        lastShuffle = time;
        const a = Math.floor(Math.random() * competitorCount);
        let b = Math.floor(Math.random() * competitorCount);
        while (b === a) b = Math.floor(Math.random() * competitorCount);
        const tmp = comps[a].targetOrbit;
        comps[a].targetOrbit = comps[b].targetOrbit;
        comps[b].targetOrbit = tmp;
        comps[a].boostTimer = 1;
        comps[b].boostTimer = 1;
      }

      // Draw orbit rings with glow
      for (let i = 0; i < competitorCount; i++) {
        const r = maxR * (0.2 + (i * 0.8) / (competitorCount - 1));
        const isInner = i === 0;
        const isSecond = i === 1;
        const isThird = i === 2;

        // Orbit glow for top 3
        if (isInner || isSecond || isThird) {
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(isInner ? 30 : isSecond ? 18 : 12)}`;
          ctx.lineWidth = isInner ? 8 : isSecond ? 5 : 3;
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Ring line
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(isInner ? 60 : isSecond ? 40 : isThird ? 30 : 20)}`;
        ctx.lineWidth = isInner ? 1.5 : isSecond ? 1.2 : 1;
        ctx.setLineDash(isInner ? [] : isSecond ? [] : [3, 5]);
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Center podium glow
      const cp = Math.sin(time * 2) * 0.5 + 0.5;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.3);
      cg.addColorStop(0, `${color}${hex((18 + cp * 14))}`);
      cg.addColorStop(0.6, `${color}${hex((6 + cp * 4))}`);
      cg.addColorStop(1, `${color}00`);
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Center circle marker
      ctx.beginPath();
      ctx.strokeStyle = `${color}${hex(25 + cp * 15)}`;
      ctx.lineWidth = 1;
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.stroke();

      // Crown/star symbol at center
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `${color}${hex(35 + cp * 25)}`;
      ctx.fillText("\u2605", cx, cy);

      // Update competitors
      comps.forEach((comp, idx) => {
        comp.currentOrbit += (comp.targetOrbit - comp.currentOrbit) * 0.025;
        comp.boostTimer = Math.max(0, comp.boostTimer - 0.016);

        const orbitFactor = 1 + (competitorCount - 1 - comp.currentOrbit) * 0.15;
        const boostMult = 1 + comp.boostTimer * 1.5;
        comp.speed = comp.baseSpeed * orbitFactor * boostMult;
        comp.angle += comp.speed;

        const r = maxR * (0.2 + (comp.currentOrbit * 0.8) / (competitorCount - 1));

        // Mouse distortion
        let ox = 0, oy = 0;
        if (mouse.active) {
          const mx = cx + Math.cos(comp.angle) * r - mouse.x;
          const my = cy + Math.sin(comp.angle) * r - mouse.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < 100 && md > 0) {
            const f = (1 - md / 100) * 12;
            ox = (mx / md) * f;
            oy = (my / md) * f;
          }
        }

        const x = cx + Math.cos(comp.angle) * r + ox;
        const y = cy + Math.sin(comp.angle) * r + oy;

        // Trail
        comp.trail.push({ x, y, a: 1 });
        comp.trail.forEach(tp => { tp.a *= 0.935; });
        comp.trail = comp.trail.filter(tp => tp.a > 0.02);

        const rank = Math.round(comp.currentOrbit);
        const isLeader = rank === 0;
        const isTop3 = rank < 3;
        const pulse = Math.sin(time * 3 + idx) * 0.5 + 0.5;

        // Draw trail with gradient
        if (comp.trail.length > 2) {
          for (let i = 1; i < comp.trail.length; i++) {
            const tp = comp.trail[i];
            const prev = comp.trail[i - 1];
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex(tp.a * (isLeader ? 50 : isTop3 ? 25 : 10))}`;
            ctx.lineWidth = isLeader ? 3 : isTop3 ? 2 : 1;
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(tp.x, tp.y);
            ctx.stroke();
          }
        }

        // Boost sparks during rank swap
        if (comp.boostTimer > 0.5 && Math.random() < 0.3) {
          sparks.push({
            x, y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 0.5,
          });
        }

        // Outer glow
        const gs = comp.size * (isLeader ? 7 : isTop3 ? 5 : 3);
        const gg = ctx.createRadialGradient(x, y, 0, x, y, gs);
        gg.addColorStop(0, `${color}${isLeader ? "50" : isTop3 ? "30" : "15"}`);
        gg.addColorStop(1, `${color}00`);
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(x, y, gs, 0, Math.PI * 2);
        ctx.fill();

        // Ring for leader
        if (isLeader) {
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex((0.3 + pulse * 0.4) * 255)}`;
          ctx.lineWidth = 1;
          ctx.arc(x, y, comp.size + 4 + pulse * 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Core
        const coreA = isLeader ? 0.8 + pulse * 0.2 : isTop3 ? 0.4 + pulse * 0.3 : 0.2 + pulse * 0.15;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(coreA * 255)}`;
        ctx.arc(x, y, comp.size + (isLeader ? pulse * 2 : 0), 0, Math.PI * 2);
        ctx.fill();

        // Rank label
        if (isTop3) {
          ctx.font = `bold ${isLeader ? 9 : 7}px system-ui`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `${color}${hex(coreA * 200)}`;
          ctx.fillText(`${rank + 1}`, x, y - comp.size - 7);

          // Crown for #1
          if (isLeader) {
            ctx.fillStyle = `${color}${hex((0.4 + pulse * 0.4) * 255)}`;
            ctx.fillText("\u265B", x, y - comp.size - 16);
          }
        }
      });

      // Draw connecting lines between adjacent ranks
      const sorted = [...comps].sort((a, b) => a.currentOrbit - b.currentOrbit);
      for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i], b = sorted[i + 1];
        const rA = maxR * (0.2 + (a.currentOrbit * 0.8) / (competitorCount - 1));
        const rB = maxR * (0.2 + (b.currentOrbit * 0.8) / (competitorCount - 1));
        const xA = cx + Math.cos(a.angle) * rA, yA = cy + Math.sin(a.angle) * rA;
        const xB = cx + Math.cos(b.angle) * rB, yB = cy + Math.sin(b.angle) * rB;
        const d = Math.hypot(xB - xA, yB - yA);
        if (d < maxR * 0.6) {
          ctx.beginPath();
          ctx.strokeStyle = `${color}0A`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(xA, yA);
          ctx.lineTo(xB, yB);
          ctx.stroke();
        }
      }

      // Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.life -= 0.016;
        s.vx *= 0.96; s.vy *= 0.96;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        const sa = s.life * 0.8;
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(sa * 255)}`;
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouse glow
      if (mouse.active) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        mg.addColorStop(0, `${color}0A`);
        mg.addColorStop(1, `${color}00`);
        ctx.fillStyle = mg;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2); ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [color, competitorCount, handleMouseMove, handleMouseLeave]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}

export default RankOrbit;
