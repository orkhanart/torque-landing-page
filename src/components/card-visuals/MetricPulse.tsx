"use client";

import React, { useEffect, useRef } from "react";

interface MetricPulseProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function MetricPulse({ color = "#0000FF", className = "", paused = false }: MetricPulseProps) {
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

    // Line chart that trends upward
    const pointCount = 40;
    let points: number[] = [];
    let targetPoints: number[] = [];
    let dotProgress = 0; // 0 to pointCount — the "cursor" traveling along

    const generateLine = () => {
      targetPoints = [];
      let v = 0.6 + Math.random() * 0.2;
      for (let i = 0; i < pointCount; i++) {
        v += (Math.random() - 0.35) * 0.06; // trend upward
        v = Math.max(0.1, Math.min(0.95, v));
        targetPoints.push(v);
      }
    };

    const initLine = () => {
      points = [];
      for (let i = 0; i < pointCount; i++) points.push(0.5);
      generateLine();
      dotProgress = 0;
    };
    initLine();

    let time = 0;
    let cycleTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      cycleTimer += 0.016;

      const padX = w * 0.1;
      const padY = h * 0.15;
      const chartW = w - padX * 2;
      const chartH = h - padY * 2;

      // Animate dot progress
      dotProgress = Math.min(dotProgress + 0.15, pointCount - 1);

      // Morph points toward targets
      points.forEach((_, i) => {
        if (i <= dotProgress) {
          points[i] += (targetPoints[i] - points[i]) * 0.08;
        }
      });

      // Regenerate on cycle
      if (cycleTimer > 6) {
        cycleTimer = 0;
        dotProgress = 0;
        generateLine();
      }

      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const gy = padY + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padX, gy);
        ctx.lineTo(padX + chartW, gy);
        ctx.strokeStyle = `${color}${hex(8)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Build path up to dotProgress
      const getX = (i: number) => padX + (i / (pointCount - 1)) * chartW;
      const getY = (v: number) => padY + chartH - v * chartH;

      const visibleCount = Math.floor(dotProgress) + 1;

      // Area fill under the line
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(0) + chartH); // bottom-left
      for (let i = 0; i < visibleCount; i++) {
        ctx.lineTo(getX(i), getY(points[i]));
      }
      ctx.lineTo(getX(visibleCount - 1), padY + chartH); // bottom-right
      ctx.closePath();
      const areaGrad = ctx.createLinearGradient(0, padY, 0, padY + chartH);
      areaGrad.addColorStop(0, `${color}${hex(0.08 * 255)}`);
      areaGrad.addColorStop(1, `${color}00`);
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Line
      ctx.beginPath();
      for (let i = 0; i < visibleCount; i++) {
        const x = getX(i);
        const y = getY(points[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `${color}${hex(0.45 * 255)}`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dot at current position
      if (visibleCount > 0) {
        const lastIdx = visibleCount - 1;
        const dx = getX(lastIdx);
        const dy = getY(points[lastIdx]);

        // Glow
        const dg = ctx.createRadialGradient(dx, dy, 0, dx, dy, 16);
        dg.addColorStop(0, `${color}${hex(0.25 * 255)}`);
        dg.addColorStop(1, `${color}00`);
        ctx.fillStyle = dg;
        ctx.beginPath();
        ctx.arc(dx, dy, 16, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(0.7 * 255)}`;
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fill();

        // Horizontal dashed line from dot to right edge
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(dx, dy);
        ctx.lineTo(padX + chartW, dy);
        ctx.strokeStyle = `${color}${hex(0.15 * 255)}`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener("resize", resize); };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default MetricPulse;
