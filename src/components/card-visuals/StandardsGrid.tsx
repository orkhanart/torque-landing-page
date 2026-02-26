"use client";

import React, { useEffect, useRef } from "react";

interface StandardsGridProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function StandardsGrid({ color = "#0000FF", className = "", paused = false }: StandardsGridProps) {
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

    // 3-column layout: V (Velocity), Q (Quality), R (Retention)
    const columns = [
      { label: "V", fullLabel: "Velocity", rules: 5 },
      { label: "Q", fullLabel: "Quality", rules: 4 },
      { label: "R", fullLabel: "Retention", rules: 5 },
    ];

    interface Rule {
      col: number;
      row: number;
      x: number;
      y: number;
      lineWidth: number;
      validated: boolean;
      validationProgress: number; // 0-1
      scanDotProgress: number; // 0-1, -1 = inactive
    }

    const rules: Rule[] = [];
    const colWidth = w / 3;
    const headerHeight = 40;
    const ruleSpacing = 28;
    const rulePadding = 16;

    columns.forEach((col, ci) => {
      for (let ri = 0; ri < col.rules; ri++) {
        rules.push({
          col: ci,
          row: ri,
          x: ci * colWidth + rulePadding,
          y: headerHeight + 30 + ri * ruleSpacing,
          lineWidth: colWidth - rulePadding * 2 - 20,
          validated: false,
          validationProgress: 0,
          scanDotProgress: -1,
        });
      }
    });

    let time = 0;
    let validationTimer = 0;
    let currentValidationIndex = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Sequential validation: one rule activates every ~1.5s
      validationTimer += 0.016;
      if (validationTimer > 1.5) {
        validationTimer = 0;
        // Start scanning the next rule
        const rule = rules[currentValidationIndex % rules.length];
        rule.scanDotProgress = 0;
        currentValidationIndex++;
      }

      // Column dividers
      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * colWidth, 20);
        ctx.lineTo(i * colWidth, h - 20);
        ctx.strokeStyle = `${color}08`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Column headers
      columns.forEach((col, ci) => {
        const cx = ci * colWidth + colWidth / 2;

        // Label circle
        ctx.beginPath();
        ctx.arc(cx, headerHeight - 8, 10, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}15`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "bold 10px system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = `${color}25`;
        ctx.fillText(col.label, cx, headerHeight - 4);

        // Full label below
        ctx.font = "7px system-ui";
        ctx.fillStyle = `${color}10`;
        ctx.fillText(col.fullLabel, cx, headerHeight + 8);
      });

      // Draw rules
      rules.forEach(rule => {
        const baseAlpha = rule.validated ? 0.2 : 0.06;

        // Rule line (horizontal bar)
        ctx.beginPath();
        ctx.moveTo(rule.x, rule.y);
        ctx.lineTo(rule.x + rule.lineWidth, rule.y);
        ctx.strokeStyle = `${color}${hex(baseAlpha * 255)}`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Small sub-segments to simulate text/data
        const segments = 2 + (rule.row % 3);
        const segWidth = rule.lineWidth / (segments + 1);
        for (let s = 0; s < segments; s++) {
          const sx = rule.x + segWidth * (s + 0.5);
          const sw = segWidth * 0.6;
          ctx.beginPath();
          ctx.moveTo(sx, rule.y + 8);
          ctx.lineTo(sx + sw, rule.y + 8);
          ctx.strokeStyle = `${color}${hex((baseAlpha * 0.5) * 255)}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Scanning dot animation
        if (rule.scanDotProgress >= 0 && rule.scanDotProgress < 1) {
          rule.scanDotProgress += 0.02;
          const dotX = rule.x + rule.lineWidth * rule.scanDotProgress;

          // Scan line glow
          const sg = ctx.createRadialGradient(dotX, rule.y, 0, dotX, rule.y, 12);
          sg.addColorStop(0, `${color}40`);
          sg.addColorStop(1, `${color}00`);
          ctx.fillStyle = sg;
          ctx.beginPath(); ctx.arc(dotX, rule.y, 12, 0, Math.PI * 2); ctx.fill();

          // Dot
          ctx.beginPath();
          ctx.fillStyle = `${color}90`;
          ctx.arc(dotX, rule.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Trail
          const trailLen = rule.lineWidth * 0.15;
          const trailStart = Math.max(rule.x, dotX - trailLen);
          const grad = ctx.createLinearGradient(trailStart, 0, dotX, 0);
          grad.addColorStop(0, `${color}00`);
          grad.addColorStop(1, `${color}20`);
          ctx.beginPath();
          ctx.moveTo(trailStart, rule.y);
          ctx.lineTo(dotX, rule.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (rule.scanDotProgress >= 1) {
            rule.validated = true;
            rule.scanDotProgress = -1;
          }
        }

        // Check mark for validated rules
        if (rule.validated) {
          rule.validationProgress = Math.min(1, rule.validationProgress + 0.04);
          const checkX = rule.x + rule.lineWidth + 8;
          const checkY = rule.y;
          const alpha = rule.validationProgress;

          // Check mark glow
          if (alpha > 0.5) {
            const cg = ctx.createRadialGradient(checkX, checkY, 0, checkX, checkY, 8);
            cg.addColorStop(0, `${color}${hex(alpha * 15)}`);
            cg.addColorStop(1, `${color}00`);
            ctx.fillStyle = cg;
            ctx.beginPath(); ctx.arc(checkX, checkY, 8, 0, Math.PI * 2); ctx.fill();
          }

          // Check mark
          ctx.beginPath();
          ctx.moveTo(checkX - 3, checkY);
          ctx.lineTo(checkX - 1, checkY + 3);
          ctx.lineTo(checkX + 4, checkY - 3);
          ctx.strokeStyle = `${color}${hex(alpha * 0.5 * 255)}`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Reset cycle: after all validated, slowly reset
      if (rules.every(r => r.validated && r.validationProgress >= 1)) {
        const allDone = rules.every(r => r.validationProgress >= 1);
        if (allDone) {
          // Wait a bit then reset
          if (time % 8 < 0.02) {
            rules.forEach(r => {
              r.validated = false;
              r.validationProgress = 0;
              r.scanDotProgress = -1;
            });
            currentValidationIndex = 0;
          }
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

export default StandardsGrid;
