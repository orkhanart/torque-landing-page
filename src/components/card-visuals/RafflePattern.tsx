"use client";

import React, { useEffect, useRef } from "react";

interface RafflePatternProps {
  color?: string;
  className?: string;
}

export function RafflePattern({ color = "#0000FF", className = "" }: RafflePatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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

    // Floating ticket/token shapes
    interface Token {
      x: number; y: number; vx: number; vy: number;
      rotation: number; rotSpeed: number;
      size: number; sides: number;
      phase: number;
      highlighted: boolean; highlightTimer: number;
    }

    const tokenCount = 35;
    const tokens: Token[] = [];
    for (let i = 0; i < tokenCount; i++) {
      tokens.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
        size: 5 + Math.random() * 12,
        sides: Math.random() < 0.5 ? 6 : 4,
        phase: Math.random() * Math.PI * 2,
        highlighted: false,
        highlightTimer: 0,
      });
    }

    // Selection pulse effect
    let selectionTimer = 0;
    let selectedIdx = -1;
    let selectionPulseAge = 0;

    let time = 0;

    const drawPolygon = (cx: number, cy: number, r: number, sides: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = rot + (Math.PI * 2 * i) / sides;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Random selection every 4s
      selectionTimer += 0.016;
      if (selectionTimer > 4) {
        selectionTimer = 0;
        selectedIdx = Math.floor(Math.random() * tokenCount);
        tokens[selectedIdx].highlighted = true;
        tokens[selectedIdx].highlightTimer = 1.5;
        selectionPulseAge = 0;
      }
      selectionPulseAge += 0.016;

      // Decay highlights
      tokens.forEach(t => {
        if (t.highlightTimer > 0) {
          t.highlightTimer -= 0.016;
          if (t.highlightTimer <= 0) t.highlighted = false;
        }
      });

      // Draw connecting dotted lines between nearby tokens
      for (let i = 0; i < tokens.length; i++) {
        for (let j = i + 1; j < tokens.length; j++) {
          const d = Math.hypot(tokens[j].x - tokens[i].x, tokens[j].y - tokens[i].y);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 4]);
            ctx.moveTo(tokens[i].x, tokens[i].y);
            ctx.lineTo(tokens[j].x, tokens[j].y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Selection pulse ring
      if (selectedIdx >= 0 && selectionPulseAge < 1.5) {
        const st = tokens[selectedIdx];
        const pulseR = st.size + selectionPulseAge * 40;
        const pulseA = Math.max(0, (1 - selectionPulseAge / 1.5) * 0.35);
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(pulseA * 255)}`;
        ctx.lineWidth = 2.5 * (1 - selectionPulseAge / 1.5);
        ctx.arc(st.x, st.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Radial flash
        const fg = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, pulseR * 0.6);
        fg.addColorStop(0, `${color}${hex(pulseA * 0.5 * 255)}`);
        fg.addColorStop(1, `${color}00`);
        ctx.fillStyle = fg;
        ctx.beginPath(); ctx.arc(st.x, st.y, pulseR * 0.6, 0, Math.PI * 2); ctx.fill();
      }

      // Draw tokens
      tokens.forEach(token => {
        // Update position
        token.x += token.vx;
        token.y += token.vy;
        token.rotation += token.rotSpeed;

        // Wrap edges
        if (token.x < -20) token.x = w + 20;
        if (token.x > w + 20) token.x = -20;
        if (token.y < -20) token.y = h + 20;
        if (token.y > h + 20) token.y = -20;

        const pulse = Math.sin(time * 1 + token.phase) * 0.5 + 0.5;
        const isHigh = token.highlighted && token.highlightTimer > 0;
        const highFade = isHigh ? token.highlightTimer / 1.5 : 0;

        const s = token.size + pulse * 1.5 + highFade * 3;

        // Glow for highlighted
        if (isHigh) {
          const hg = ctx.createRadialGradient(token.x, token.y, 0, token.x, token.y, s * 4);
          hg.addColorStop(0, `${color}${hex(highFade * 60)}`);
          hg.addColorStop(1, `${color}00`);
          ctx.fillStyle = hg;
          ctx.beginPath(); ctx.arc(token.x, token.y, s * 4, 0, Math.PI * 2); ctx.fill();
        }

        // Outer glow
        const og = ctx.createRadialGradient(token.x, token.y, 0, token.x, token.y, s * 2.5);
        og.addColorStop(0, `${color}${hex((0.08 + highFade * 0.2) * 255)}`);
        og.addColorStop(1, `${color}00`);
        ctx.fillStyle = og;
        ctx.beginPath(); ctx.arc(token.x, token.y, s * 2.5, 0, Math.PI * 2); ctx.fill();

        // Shape ring
        drawPolygon(token.x, token.y, s, token.sides, token.rotation);
        ctx.strokeStyle = `${color}${hex((0.15 + pulse * 0.08 + highFade * 0.4) * 255)}`;
        ctx.lineWidth = isHigh ? 2 : 1.2;
        ctx.stroke();

        // Fill
        drawPolygon(token.x, token.y, s * 0.85, token.sides, token.rotation);
        ctx.fillStyle = `${color}${hex((0.04 + highFade * 0.15) * 255)}`;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex((0.15 + pulse * 0.1 + highFade * 0.5) * 255)}`;
        ctx.arc(token.x, token.y, 2.5 + highFade * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sparkle particles around selected token
      if (selectedIdx >= 0 && selectionPulseAge < 1) {
        const st = tokens[selectedIdx];
        const sparkCount = 8;
        for (let i = 0; i < sparkCount; i++) {
          const angle = (Math.PI * 2 * i) / sparkCount + time * 2;
          const dist = st.size + 8 + selectionPulseAge * 15;
          const sx = st.x + Math.cos(angle) * dist;
          const sy = st.y + Math.sin(angle) * dist;
          const sa = Math.max(0, (1 - selectionPulseAge) * 0.5);
          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(sa * 255)}`;
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default RafflePattern;
