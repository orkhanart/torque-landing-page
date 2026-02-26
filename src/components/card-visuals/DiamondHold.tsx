"use client";

import React, { useEffect, useRef } from "react";

interface DiamondHoldProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function DiamondHold({ color = "#0000FF", className = "", paused = false }: DiamondHoldProps) {
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

    const getCx = () => w * 0.5;
    const getCy = () => h * 0.45;
    const diamondSize = 35;

    // Surrounding dots
    interface HoldDot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseAngle: number;
      orbitRadius: number;
      isDiamondHand: boolean; // stays close to diamond
      size: number;
      phase: number;
      scatterVx: number;
      scatterVy: number;
      isScattered: boolean;
      returnTimer: number;
    }

    const dotCount = 40;
    const dots: HoldDot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const isDiamondHand = i < 12; // first 12 are diamond hands
      const angle = Math.random() * Math.PI * 2;
      const orbitR = isDiamondHand
        ? diamondSize * 1.3 + Math.random() * 25
        : diamondSize * 2 + Math.random() * 80;

      dots.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        baseAngle: angle,
        orbitRadius: orbitR,
        isDiamondHand,
        size: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        scatterVx: 0,
        scatterVy: 0,
        isScattered: false,
        returnTimer: 0,
      });
    }

    // Volatility shake state
    let shakeTimer = 0;
    let shakeActive = false;
    let shakeDuration = 0;
    let shakeIntensity = 0;
    let shakeOffsetX = 0;
    let shakeOffsetY = 0;

    // Diamond rotation
    let diamondRotation = 0;
    let coreGlow = 0;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = getCx();
      const cy = getCy();

      // Trigger shake every 5 seconds
      shakeTimer += 0.016;
      if (shakeTimer > 5) {
        shakeTimer = 0;
        shakeActive = true;
        shakeDuration = 0;
        shakeIntensity = 1;
        coreGlow = 1;

        // Scatter non-diamond-hand dots
        dots.forEach(dot => {
          if (!dot.isDiamondHand) {
            const angle = dot.baseAngle + (Math.random() - 0.5) * 0.5;
            const force = 2 + Math.random() * 3;
            dot.scatterVx = Math.cos(angle) * force;
            dot.scatterVy = Math.sin(angle) * force;
            dot.isScattered = true;
            dot.returnTimer = 1.5 + Math.random() * 2;
          }
        });
      }

      // Update shake
      if (shakeActive) {
        shakeDuration += 0.016;
        shakeIntensity *= 0.96;
        shakeOffsetX = (Math.random() - 0.5) * shakeIntensity * 6;
        shakeOffsetY = (Math.random() - 0.5) * shakeIntensity * 6;

        if (shakeDuration > 1) {
          shakeActive = false;
          shakeOffsetX = 0;
          shakeOffsetY = 0;
        }
      }

      // Decay core glow
      coreGlow *= 0.98;

      // Diamond rotation
      diamondRotation += 0.003;

      const dx = cx + shakeOffsetX;
      const dy = cy + shakeOffsetY;

      // Draw diamond core glow
      const corePulse = Math.sin(time * 1.5) * 0.5 + 0.5;
      const glowRadius = diamondSize * 1.5;
      const dg = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowRadius);
      dg.addColorStop(0, `${color}${hex((0.06 + coreGlow * 0.15 + corePulse * 0.03) * 255)}`);
      dg.addColorStop(0.4, `${color}${hex((0.03 + coreGlow * 0.05) * 255)}`);
      dg.addColorStop(1, `${color}00`);
      ctx.fillStyle = dg;
      ctx.beginPath();
      ctx.arc(dx, dy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw diamond (rhombus) with rotation
      const drawDiamond = (size: number, alpha: number, lineWidth: number) => {
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(diamondRotation);

        ctx.beginPath();
        ctx.moveTo(0, -size);        // top
        ctx.lineTo(size * 0.7, 0);   // right
        ctx.lineTo(0, size);          // bottom
        ctx.lineTo(-size * 0.7, 0);  // left
        ctx.closePath();

        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        ctx.restore();
      };

      // Outer diamond (softer)
      drawDiamond(diamondSize + 4, 0.04 + coreGlow * 0.05, 0.5);
      // Main diamond
      drawDiamond(diamondSize, 0.12 + coreGlow * 0.15, 1.5);
      // Inner diamond
      drawDiamond(diamondSize * 0.5, 0.08 + coreGlow * 0.1 + corePulse * 0.03, 1);

      // Diamond fill (very subtle)
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(diamondRotation);
      ctx.beginPath();
      ctx.moveTo(0, -diamondSize);
      ctx.lineTo(diamondSize * 0.7, 0);
      ctx.lineTo(0, diamondSize);
      ctx.lineTo(-diamondSize * 0.7, 0);
      ctx.closePath();
      ctx.fillStyle = `${color}${hex((0.02 + coreGlow * 0.06) * 255)}`;
      ctx.fill();
      ctx.restore();

      // Update and draw dots
      dots.forEach(dot => {
        const pulse = Math.sin(time * 1.2 + dot.phase) * 0.5 + 0.5;

        if (dot.isScattered) {
          // Scattered dots drift outward
          dot.scatterVx *= 0.98;
          dot.scatterVy *= 0.98;
          dot.x += dot.scatterVx;
          dot.y += dot.scatterVy;
          dot.returnTimer -= 0.016;

          if (dot.returnTimer <= 0) {
            dot.isScattered = false;
          }
        } else if (dot.isDiamondHand) {
          // Diamond hands orbit close to the diamond
          dot.baseAngle += 0.008 + pulse * 0.003;
          dot.x = dx + Math.cos(dot.baseAngle) * dot.orbitRadius;
          dot.y = dy + Math.sin(dot.baseAngle) * dot.orbitRadius * 0.8;
        } else {
          // Regular dots slowly attract back toward diamond
          const targetX = dx + Math.cos(dot.baseAngle) * dot.orbitRadius;
          const targetY = dy + Math.sin(dot.baseAngle) * dot.orbitRadius * 0.8;
          dot.x += (targetX - dot.x) * 0.02;
          dot.y += (targetY - dot.y) * 0.02;
          dot.baseAngle += 0.002;
        }

        // Draw dot
        const isDH = dot.isDiamondHand;
        const distFromCenter = Math.sqrt((dot.x - dx) ** 2 + (dot.y - dy) ** 2);
        const proximity = Math.max(0, 1 - distFromCenter / 150);
        const dotAlpha = isDH
          ? 0.1 + pulse * 0.08 + proximity * 0.1
          : 0.04 + pulse * 0.03 + proximity * 0.04;

        // Glow for diamond hands
        if (isDH) {
          const dg2 = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 3);
          dg2.addColorStop(0, `${color}${hex(dotAlpha * 0.5 * 255)}`);
          dg2.addColorStop(1, `${color}00`);
          ctx.fillStyle = dg2;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(dotAlpha * 255)}`;
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();

        // Ring for diamond hands
        if (isDH) {
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(dotAlpha * 0.6 * 255)}`;
          ctx.lineWidth = 0.5;
          ctx.arc(dot.x, dot.y, dot.size + 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // "HOLD" label at core
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(diamondRotation);
      ctx.font = "bold 6px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `${color}${hex((0.1 + coreGlow * 0.15 + corePulse * 0.03) * 255)}`;
      ctx.fillText("HOLD", 0, 1);
      ctx.restore();
      ctx.textBaseline = "alphabetic";

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

export default DiamondHold;
