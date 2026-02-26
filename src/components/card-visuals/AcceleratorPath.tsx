"use client";

import React, { useEffect, useRef } from "react";

interface AcceleratorPathProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function AcceleratorPath({ color = "#0000FF", className = "", paused = false }: AcceleratorPathProps) {
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

    // Checkpoints (normalized 0-1 positions along the path)
    const checkpoints = [0.2, 0.45, 0.7, 0.92];
    const checkpointFilled: number[] = [0, 0, 0, 0]; // fill progress 0-1

    // Burst particles at end
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    }
    const particles: Particle[] = [];

    // Velocity trail lines
    interface VelocityLine {
      x: number;
      y: number;
      angle: number;
      life: number;
      length: number;
    }
    const velocityLines: VelocityLine[] = [];

    let time = 0;
    let dotProgress = 0; // 0 to 1 along the path
    const cycleDuration = 6; // seconds for one full traversal
    let fadeOut = 0; // 0 to 1 for fade out at end

    // Compute a point on the trajectory curve (quadratic bezier from bottom-left to top-right)
    const getPathPoint = (t: number) => {
      const padding = 40;
      const x0 = padding;
      const y0 = h - padding;
      const x2 = w - padding;
      const y2 = padding + 20;
      // Control point creates the arc
      const cx = w * 0.35;
      const cy = h * 0.2;

      const mt = 1 - t;
      const x = mt * mt * x0 + 2 * mt * t * cx + t * t * x2;
      const y = mt * mt * y0 + 2 * mt * t * cy + t * t * y2;
      return { x, y };
    };

    // Get tangent angle at point t
    const getPathAngle = (t: number) => {
      const dt = 0.001;
      const p1 = getPathPoint(Math.max(0, t - dt));
      const p2 = getPathPoint(Math.min(1, t + dt));
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };

    // Draw the dashed trajectory path
    const drawPath = (progress: number) => {
      const dashLen = 6;
      const gapLen = 8;
      const steps = 200;

      ctx.lineWidth = 1.5;

      let drawing = true;
      let segLen = 0;
      let prevPt = getPathPoint(0);

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const pt = getPathPoint(t);
        const dx = pt.x - prevPt.x;
        const dy = pt.y - prevPt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        segLen += dist;

        const alpha = t <= progress ? 0.5 : 0.15;
        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;

        if (drawing) {
          if (segLen <= dashLen) {
            ctx.beginPath();
            ctx.moveTo(prevPt.x, prevPt.y);
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
          } else {
            drawing = false;
            segLen = 0;
          }
        } else {
          if (segLen >= gapLen) {
            drawing = true;
            segLen = 0;
          }
        }

        prevPt = pt;
      }
    };

    // Draw checkpoint circles
    const drawCheckpoints = (progress: number) => {
      for (let i = 0; i < checkpoints.length; i++) {
        const t = checkpoints[i];
        const pt = getPathPoint(t);
        const radius = 8;

        // Update fill based on dot progress
        if (progress >= t) {
          checkpointFilled[i] = Math.min(1, checkpointFilled[i] + 0.05);
        }

        // Outer ring
        ctx.strokeStyle = `${color}${hex(0.4 * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Fill arc (progress)
        if (checkpointFilled[i] > 0) {
          ctx.fillStyle = `${color}${hex(checkpointFilled[i] * 0.5 * 255)}`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius - 1, 0, Math.PI * 2);
          ctx.fill();

          // Pulse when just reached
          if (progress >= t && progress < t + 0.05) {
            const pulseAlpha = (1 - (progress - t) / 0.05) * 0.4;
            const pulseRadius = radius + (progress - t) / 0.05 * 15;
            ctx.strokeStyle = `${color}${hex(pulseAlpha * 255)}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Inner dot
        ctx.fillStyle = `${color}${hex(0.3 * 255)}`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw the traveling dot
    const drawDot = (progress: number, alpha: number) => {
      const pt = getPathPoint(progress);
      const glowSize = 6;

      // Outer glow
      const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowSize * 3);
      gradient.addColorStop(0, `${color}${hex(0.5 * alpha * 255)}`);
      gradient.addColorStop(1, `${color}00`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, glowSize * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = `${color}${hex(alpha * 255)}`;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, glowSize * 0.6, 0, Math.PI * 2);
      ctx.fill();
    };

    // Spawn velocity lines behind the dot
    const spawnVelocityLine = (progress: number) => {
      const pt = getPathPoint(progress);
      const angle = getPathAngle(progress);
      // Speed increases along the path
      const speed = 0.5 + progress * 1.5;
      const lineLen = 4 + progress * 10;

      velocityLines.push({
        x: pt.x - Math.cos(angle) * (8 + Math.random() * 6),
        y: pt.y - Math.sin(angle) * (8 + Math.random() * 6) + (Math.random() - 0.5) * 8,
        angle,
        life: 1,
        length: lineLen,
      });
    };

    // Spawn end burst
    const spawnEndBurst = () => {
      const pt = getPathPoint(1);
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.5;
        const speed = 1 + Math.random() * 3;
        particles.push({
          x: pt.x,
          y: pt.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    let hasBurst = false;
    let velocitySpawnTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Progress the dot along the path
      const cycleTime = time % (cycleDuration + 1.5); // extra 1.5s for pause/fade

      if (cycleTime < cycleDuration) {
        // Accelerating: use easing that starts slow and ends fast
        const linearT = cycleTime / cycleDuration;
        dotProgress = linearT * linearT; // quadratic ease-in for acceleration feel
        fadeOut = 0;
        hasBurst = false;

        // Spawn velocity lines (more frequently as speed increases)
        velocitySpawnTimer += 0.016;
        const spawnInterval = Math.max(0.03, 0.15 - dotProgress * 0.12);
        if (velocitySpawnTimer > spawnInterval && dotProgress > 0.1) {
          spawnVelocityLine(dotProgress);
          velocitySpawnTimer = 0;
        }
      } else if (cycleTime < cycleDuration + 0.5) {
        dotProgress = 1;
        fadeOut = (cycleTime - cycleDuration) / 0.5;
        if (!hasBurst) {
          spawnEndBurst();
          hasBurst = true;
        }
      } else {
        // Reset
        dotProgress = 0;
        fadeOut = 1;
        // Reset checkpoint fills
        for (let i = 0; i < checkpointFilled.length; i++) {
          checkpointFilled[i] = Math.max(0, checkpointFilled[i] - 0.03);
        }
      }

      // Draw trajectory path
      drawPath(dotProgress);

      // Draw checkpoints
      drawCheckpoints(dotProgress);

      // Draw velocity lines
      for (let i = velocityLines.length - 1; i >= 0; i--) {
        const vl = velocityLines[i];
        vl.life -= 0.03;
        if (vl.life <= 0) {
          velocityLines.splice(i, 1);
          continue;
        }

        const alpha = vl.life * 0.5;
        ctx.strokeStyle = `${color}${hex(alpha * 255)}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vl.x, vl.y);
        ctx.lineTo(
          vl.x - Math.cos(vl.angle) * vl.length * vl.life,
          vl.y - Math.sin(vl.angle) * vl.length * vl.life,
        );
        ctx.stroke();
      }

      // Draw dot
      if (fadeOut < 1) {
        drawDot(dotProgress, 1 - fadeOut);
      }

      // Draw end-burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        const alpha = p.life * 0.7;
        ctx.fillStyle = `${color}${hex(alpha * 255)}`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
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

export default AcceleratorPath;
