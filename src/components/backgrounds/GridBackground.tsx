'use client';

import { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  perspective?: boolean;
  lineColor?: string;
  lineOpacity?: number;
  gridSize?: number;
  animate?: boolean;
  className?: string;
}

export default function GridBackground({
  perspective = true,
  lineColor = '0, 0, 0',
  lineOpacity = 0.04,
  gridSize = 40,
  animate = true,
  className = '',
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      if (perspective) {
        // Perspective grid
        const vanishY = height * 0.3; // Vanishing point Y
        const vanishX = width / 2; // Vanishing point X
        const horizonY = height * 0.3;

        // Horizontal lines (receding)
        ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity})`;
        ctx.lineWidth = 1;

        const numHorizontalLines = 30;
        for (let i = 0; i <= numHorizontalLines; i++) {
          const t = i / numHorizontalLines;
          // Exponential spacing for perspective effect
          const y = horizonY + (height - horizonY) * Math.pow(t, 1.5);

          ctx.beginPath();
          ctx.moveTo(0, y + (animate ? offsetRef.current % gridSize : 0));
          ctx.lineTo(width, y + (animate ? offsetRef.current % gridSize : 0));
          ctx.stroke();
        }

        // Vertical lines (converging to vanishing point)
        const numVerticalLines = 40;
        for (let i = 0; i <= numVerticalLines; i++) {
          const x = (i / numVerticalLines) * width;

          ctx.beginPath();
          ctx.moveTo(vanishX, vanishY);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Vignette effect
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.7
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

      } else {
        // Simple grid
        ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity})`;
        ctx.lineWidth = 1;

        const offsetY = animate ? offsetRef.current % gridSize : 0;

        // Vertical lines
        for (let x = 0; x <= width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal lines
        for (let y = offsetY; y <= height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      if (animate) {
        offsetRef.current += 0.2;
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    if (!animate) {
      window.addEventListener('resize', draw);
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      if (!animate) {
        window.removeEventListener('resize', draw);
      }
    };
  }, [perspective, lineColor, lineOpacity, gridSize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
