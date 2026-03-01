"use client";

import React, { useEffect, useRef } from "react";
import type { Orientation } from "@/components/card-visuals/useOrientation";

interface GrowthBarsProps {
  color?: string;
  className?: string;
  paused?: boolean;
  orientation?: Orientation;
}

export function GrowthBars({ color = "#0000FF", className = "", paused = false, orientation = "vertical" }: GrowthBarsProps) {
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

    // Hexagonal grid cells that progressively fill from bottom→top
    const cellSize = 18;
    const cellH = cellSize * Math.sqrt(3);
    const cols = Math.ceil(w / (cellSize * 1.5)) + 2;
    const rows = Math.ceil(h / (cellH * 0.5)) + 2;

    interface HexCell {
      cx: number; cy: number;
      col: number; row: number;
      fillLevel: number; // 0–1 how filled
      targetFill: number;
      energy: number;
      phase: number;
    }

    const cells: HexCell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * cellSize * 1.5 + (r % 2 ? cellSize * 0.75 : 0);
        const cy = r * cellH * 0.5;
        // Fill level based on vertical position (bottom = full, top = empty)
        const heightRatio = 1 - cy / h;
        const baseFill = Math.max(0, 1 - heightRatio * 0.9);
        cells.push({
          cx, cy, col: c, row: r,
          fillLevel: baseFill,
          targetFill: baseFill,
          energy: 0,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Rising energy pulses (vertical waves of activation)
    interface Pulse {
      y: number; // current y position (moving upward)
      speed: number;
      width: number;
      intensity: number;
    }
    const pulses: Pulse[] = [];

    // Growth fill wave
    const isHorizontal = orientation === "horizontal";
    let fillWaveY = isHorizontal ? h * 1.1 : h * -0.1; // horizontal: below canvas up, vertical: above canvas down
    let fillTarget = isHorizontal ? h * 0.1 : h * 0.65;
    let fillCycle = 0;

    let time = 0;
    let pulseTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Spawn upward pulses every 2.5s
      pulseTimer += 0.016;
      if (pulseTimer > 2.5) {
        pulseTimer = 0;
        pulses.push({
          y: h + 20,
          speed: 2 + Math.random() * 1.5,
          width: 40 + Math.random() * 30,
          intensity: 0.7 + Math.random() * 0.3,
        });
      }

      // Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].y -= pulses[i].speed;
        pulses[i].intensity *= 0.997;
        if (pulses[i].y < -pulses[i].width) pulses.splice(i, 1);
      }

      // Cycle fill level (grows then resets)
      fillCycle += 0.016;
      if (fillCycle > 5) {
        fillCycle = 0;
        fillTarget = h * (isHorizontal ? 0.05 + Math.random() * 0.25 : 0.5 + Math.random() * 0.3);
      }
      fillWaveY += (fillTarget - fillWaveY) * 0.01;

      // Update cells
      cells.forEach(cell => {
        // Base fill from current wave position
        const distFromFill = cell.cy - fillWaveY;
        if (isHorizontal) {
          // Horizontal: wave moves up, below wave = filled, above = fade
          if (distFromFill > 0) {
            cell.targetFill = Math.max(0, 1 - distFromFill / (h * 0.3));
          } else {
            cell.targetFill = 1;
          }
        } else {
          // Vertical: wave moves down, above wave = filled, below = fade
          if (distFromFill < 0) {
            cell.targetFill = Math.max(0, 1 + distFromFill / (h * 0.3));
          } else {
            cell.targetFill = Math.max(0, 1 - distFromFill / (h * 0.3));
          }
        }

        cell.fillLevel += (cell.targetFill - cell.fillLevel) * 0.04;

        // Energy from passing pulses
        cell.energy *= 0.94;
        for (const pulse of pulses) {
          const dist = Math.abs(cell.cy - pulse.y);
          if (dist < pulse.width) {
            const strength = (1 - dist / pulse.width) * pulse.intensity;
            cell.energy = Math.min(1, cell.energy + strength * 0.15);
          }
        }
      });

      // Draw cells
      cells.forEach(cell => {
        const pulse = Math.sin(time * 1 + cell.phase) * 0.5 + 0.5;
        const fill = cell.fillLevel;
        const e = cell.energy;

        if (fill < 0.01 && e < 0.01) return; // skip invisible cells

        const r = cellSize * 0.48;

        // Energy glow
        if (e > 0.05) {
          const eg = ctx.createRadialGradient(cell.cx, cell.cy, 0, cell.cx, cell.cy, r * 2.5);
          eg.addColorStop(0, `${color}${hex(e * 30)}`);
          eg.addColorStop(1, `${color}00`);
          ctx.fillStyle = eg;
          ctx.beginPath(); ctx.arc(cell.cx, cell.cy, r * 2.5, 0, Math.PI * 2); ctx.fill();
        }

        // Hex fill
        const fillAlpha = (0.03 + fill * 0.08 + e * 0.15 + pulse * 0.01 * fill);
        drawHex(cell.cx, cell.cy, r);
        ctx.fillStyle = `${color}${hex(fillAlpha * 255)}`;
        ctx.fill();

        // Hex border
        const borderAlpha = 0.04 + fill * 0.06 + e * 0.2;
        drawHex(cell.cx, cell.cy, r);
        ctx.strokeStyle = `${color}${hex(borderAlpha * 255)}`;
        ctx.lineWidth = e > 0.2 ? 1.2 : 0.5;
        ctx.stroke();

        // Inner dot for highly filled cells
        if (fill > 0.5 || e > 0.3) {
          const dotAlpha = (fill * 0.08 + e * 0.25) * (0.8 + pulse * 0.2);
          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(dotAlpha * 255)}`;
          ctx.arc(cell.cx, cell.cy, 1.5 + e * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw pulse wave indicators on the side
      pulses.forEach(pulse => {
        const alpha = pulse.intensity * 0.12;
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
        ctx.lineWidth = 1;
        ctx.moveTo(4, pulse.y - pulse.width * 0.3);
        ctx.lineTo(4, pulse.y + pulse.width * 0.3);
        ctx.stroke();

        // Small arrow pointing up
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(alpha * 255)}`;
        ctx.moveTo(4, pulse.y - pulse.width * 0.3);
        ctx.lineTo(1, pulse.y - pulse.width * 0.3 + 4);
        ctx.lineTo(7, pulse.y - pulse.width * 0.3 + 4);
        ctx.closePath();
        ctx.fill();
      });

      // Multiplier labels
      const labelAlpha = 0.07 + Math.sin(time * 0.8) * 0.02;
      ctx.font = "bold 9px system-ui";
      ctx.textAlign = "right";
      ctx.fillStyle = `${color}${hex(labelAlpha * 255)}`;
      ctx.fillText("1 SOL", w - 8, h * 0.88);
      ctx.fillStyle = `${color}${hex((labelAlpha + 0.06) * 255)}`;
      ctx.fillText("102 SOL", w - 8, h * 0.12);

      // Connecting arrow
      ctx.beginPath();
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = `${color}${hex(8)}`;
      ctx.lineWidth = 0.8;
      ctx.moveTo(w - 12, h * 0.85);
      ctx.lineTo(w - 12, h * 0.16);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = `${color}${hex(14)}`;
      ctx.moveTo(w - 12, h * 0.15);
      ctx.lineTo(w - 15, h * 0.15 + 6);
      ctx.lineTo(w - 9, h * 0.15 + 6);
      ctx.closePath();
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
  }, [color, orientation]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default GrowthBars;
