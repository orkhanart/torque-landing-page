"use client";

import React, { useEffect, useRef } from "react";

interface UtilizationMeterProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function UtilizationMeter({ color = "#0000FF", className = "", paused = false }: UtilizationMeterProps) {
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

    // Pool bars representing lending pools
    interface PoolBar {
      y: number;
      fill: number;       // current fill 0-1
      targetFill: number;  // target fill 0-1
      speed: number;
      label: string;
    }

    const barCount = 6;
    const barHeight = 14;
    const barGap = 10;
    const totalHeight = barCount * barHeight + (barCount - 1) * barGap;
    const startY = (h * 0.5) - totalHeight / 2;
    const barLeft = w * 0.12;
    const barWidth = w * 0.76;

    const labels = ["SOL", "USDC", "mSOL", "JitoSOL", "USDT", "RAY"];

    const bars: PoolBar[] = [];
    for (let i = 0; i < barCount; i++) {
      const fill = 0.2 + Math.random() * 0.6;
      bars.push({
        y: startY + i * (barHeight + barGap),
        fill,
        targetFill: fill,
        speed: 0.005 + Math.random() * 0.01,
        label: labels[i],
      });
    }

    // Flow particles moving between pools
    interface FlowParticle {
      x: number;
      y: number;
      fromBar: number;
      toBar: number;
      t: number;
      speed: number;
      size: number;
    }

    const flowParticles: FlowParticle[] = [];

    let time = 0;
    let rebalanceTimer = 0;
    let flowSpawnTimer = 0;

    // Grid background dots
    const gridSpacing = 20;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Draw subtle grid background
      for (let gx = gridSpacing; gx < w; gx += gridSpacing) {
        for (let gy = gridSpacing; gy < h; gy += gridSpacing) {
          ctx.beginPath();
          ctx.fillStyle = `${color}${hex(6)}`;
          ctx.arc(gx, gy, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Rebalance fills periodically
      rebalanceTimer += 0.016;
      if (rebalanceTimer > 3) {
        rebalanceTimer = 0;
        // Pick 2-3 bars to shift
        const count = 2 + Math.floor(Math.random() * 2);
        for (let c = 0; c < count; c++) {
          const idx = Math.floor(Math.random() * barCount);
          bars[idx].targetFill = 0.1 + Math.random() * 0.85;
        }
      }

      // Spawn flow particles between bars
      flowSpawnTimer += 0.016;
      if (flowSpawnTimer > 0.8) {
        flowSpawnTimer = 0;
        // Find a bar that is draining and one that is filling
        let drainingIdx = -1;
        let fillingIdx = -1;
        for (let i = 0; i < barCount; i++) {
          if (bars[i].targetFill < bars[i].fill - 0.05 && drainingIdx === -1) drainingIdx = i;
          if (bars[i].targetFill > bars[i].fill + 0.05 && fillingIdx === -1) fillingIdx = i;
        }
        if (drainingIdx === -1) drainingIdx = Math.floor(Math.random() * barCount);
        if (fillingIdx === -1) fillingIdx = (drainingIdx + 1 + Math.floor(Math.random() * (barCount - 1))) % barCount;
        if (drainingIdx !== fillingIdx) {
          const fromBar = bars[drainingIdx];
          flowParticles.push({
            x: barLeft + fromBar.fill * barWidth,
            y: fromBar.y + barHeight / 2,
            fromBar: drainingIdx,
            toBar: fillingIdx,
            t: 0,
            speed: 0.008 + Math.random() * 0.008,
            size: 1.5 + Math.random() * 1.5,
          });
        }
      }

      // Animate bar fills toward targets
      bars.forEach((bar) => {
        const diff = bar.targetFill - bar.fill;
        bar.fill += diff * 0.02;
      });

      // Draw bars
      bars.forEach((bar, i) => {
        const pulse = Math.sin(time * 0.8 + i * 1.2) * 0.02;
        const currentFill = Math.max(0, Math.min(1, bar.fill + pulse));

        // Bar background (empty part)
        ctx.fillStyle = `${color}${hex(8)}`;
        ctx.fillRect(barLeft, bar.y, barWidth, barHeight);

        // Bar border
        ctx.strokeStyle = `${color}${hex(15)}`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(barLeft, bar.y, barWidth, barHeight);

        // Filled part with gradient
        const fillW = currentFill * barWidth;
        if (fillW > 0) {
          const fillGrad = ctx.createLinearGradient(barLeft, 0, barLeft + fillW, 0);
          const fillAlpha = 0.06 + currentFill * 0.12;
          fillGrad.addColorStop(0, `${color}${hex(fillAlpha * 0.5 * 255)}`);
          fillGrad.addColorStop(0.7, `${color}${hex(fillAlpha * 255)}`);
          fillGrad.addColorStop(1, `${color}${hex(fillAlpha * 1.2 * 255)}`);
          ctx.fillStyle = fillGrad;
          ctx.fillRect(barLeft, bar.y, fillW, barHeight);

          // Liquid edge highlight
          ctx.beginPath();
          ctx.strokeStyle = `${color}${hex(0.2 * 255)}`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(barLeft + fillW, bar.y + 1);
          ctx.lineTo(barLeft + fillW, bar.y + barHeight - 1);
          ctx.stroke();

          // Ripple effect at the fill edge
          const rippleAmp = 2 * Math.sin(time * 2 + i);
          for (let r = 0; r < 3; r++) {
            const ry = bar.y + barHeight * (0.25 + r * 0.25);
            const rx = barLeft + fillW + rippleAmp * Math.sin(time * 3 + r * 2);
            ctx.beginPath();
            ctx.fillStyle = `${color}${hex(25)}`;
            ctx.arc(rx, ry, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Pool label on the left
        ctx.font = "bold 7px monospace";
        ctx.textAlign = "right";
        ctx.fillStyle = `${color}${hex(0.15 * 255)}`;
        ctx.fillText(bar.label, barLeft - 6, bar.y + barHeight / 2 + 2.5);

        // Percentage on the right
        const pct = Math.round(currentFill * 100);
        ctx.font = "7px monospace";
        ctx.textAlign = "left";
        ctx.fillStyle = `${color}${hex((0.08 + currentFill * 0.1) * 255)}`;
        ctx.fillText(`${pct}%`, barLeft + barWidth + 6, bar.y + barHeight / 2 + 2.5);
      });

      // Update and draw flow particles
      for (let i = flowParticles.length - 1; i >= 0; i--) {
        const fp = flowParticles[i];
        fp.t += fp.speed;

        if (fp.t >= 1) {
          flowParticles.splice(i, 1);
          continue;
        }

        const fromBar = bars[fp.fromBar];
        const toBar = bars[fp.toBar];
        const startX = barLeft + fromBar.fill * barWidth;
        const startY2 = fromBar.y + barHeight / 2;
        const endX = barLeft + toBar.fill * barWidth;
        const endY = toBar.y + barHeight / 2;

        // Curved path via a control point to the right
        const cpX = Math.max(startX, endX) + 30;
        const cpY = (startY2 + endY) / 2;

        const t = fp.t;
        const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
        const py = (1 - t) * (1 - t) * startY2 + 2 * (1 - t) * t * cpY + t * t * endY;

        // Glow
        const pg = ctx.createRadialGradient(px, py, 0, px, py, fp.size * 4);
        pg.addColorStop(0, `${color}${hex(50)}`);
        pg.addColorStop(0.5, `${color}${hex(15)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, fp.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(140)}`;
        ctx.arc(px, py, fp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Header label
      const labelAlpha = 0.06 + Math.sin(time * 0.5) * 0.02;
      ctx.font = "bold 7px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = `${color}${hex(labelAlpha * 255)}`;
      ctx.fillText("UTILIZATION", w * 0.5, startY - 14);

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

export default UtilizationMeter;
