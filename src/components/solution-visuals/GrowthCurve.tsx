"use client";

import React, { useEffect, useRef } from "react";

interface GrowthCurveProps {
  color?: string;
  className?: string;
}

export function GrowthCurve({ color = "#0000FF", className = "" }: GrowthCurveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    let time = 0;
    let progress = 0;

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      time += 0.01;
      progress = Math.min(progress + 0.005, 1);

      // Exponential growth curve
      const curvePoints: { x: number; y: number }[] = [];
      const padding = 20;
      const curveWidth = width - padding * 2;
      const curveHeight = height - padding * 2;

      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        if (t > progress) break;

        const x = padding + t * curveWidth;
        // Exponential curve: y = e^(x*2) normalized
        const expValue = Math.pow(t, 2.5);
        const y = height - padding - expValue * curveHeight * 0.8;

        curvePoints.push({ x, y });
      }

      // Draw filled area under curve
      if (curvePoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(curvePoints[0].x, height - padding);
        curvePoints.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.lineTo(curvePoints[curvePoints.length - 1].x, height - padding);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, `${color}20`);
        gradient.addColorStop(1, `${color}05`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw curve line
      if (curvePoints.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
        curvePoints.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.stroke();

        // Glow effect
        ctx.beginPath();
        ctx.strokeStyle = `${color}60`;
        ctx.lineWidth = 6;
        ctx.filter = "blur(3px)";
        ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
        curvePoints.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.stroke();
        ctx.filter = "none";
      }

      // Add particles along curve
      if (curvePoints.length > 5 && Math.random() < 0.15) {
        const idx = Math.floor(Math.random() * curvePoints.length);
        const point = curvePoints[idx];
        particles.push({
          x: point.x,
          y: point.y,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          life: 1,
          maxLife: 1,
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `${color}${Math.floor(p.life * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw end point indicator
      if (curvePoints.length > 0) {
        const endPoint = curvePoints[curvePoints.length - 1];

        // Pulse effect
        const pulse = Math.sin(time * 4) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(endPoint.x, endPoint.y, 8 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `${color}20`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endPoint.x, endPoint.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw yield indicator
        const yieldPercent = Math.floor(progress * 12.5);
        ctx.fillStyle = color;
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${yieldPercent}% APY`, endPoint.x, endPoint.y - 15);
      }

      // Reset progress for loop
      if (progress >= 1) {
        setTimeout(() => {
          progress = 0;
        }, 1000);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

export default GrowthCurve;
