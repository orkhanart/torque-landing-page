'use client';

import { useEffect, useRef } from 'react';

interface NoiseOverlayProps {
  opacity?: number;
  animate?: boolean;
  className?: string;
}

export default function NoiseOverlay({
  opacity = 0.03,
  animate = true,
  className = '',
}: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use a smaller canvas for performance, then scale up
    const scale = 0.5;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width * scale);
      height = Math.floor(rect.height * scale);
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const generateNoise = () => {
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255;   // A
      }
      ctx.putImageData(imageData, 0, 0);

      if (animate) {
        frameRef.current = requestAnimationFrame(generateNoise);
      }
    };

    generateNoise();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        zIndex: 1000,
        opacity,
        mixBlendMode: 'overlay',
        imageRendering: 'pixelated',
      }}
    />
  );
}
