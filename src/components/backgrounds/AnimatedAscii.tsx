'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedAsciiProps {
  className?: string;
  color?: string;
  speed?: number;
  density?: number;
}

const ASCII_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
}

export default function AnimatedAscii({
  className = '',
  color = 'rgba(255,255,255,0.15)',
  speed = 1,
  density = 0.03,
}: AnimatedAsciiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<Column[]>([]);
  const frameRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Fallback dimensions
    if (width === 0 || height === 0) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    // Set canvas size
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Font settings
    const fontSize = 14;
    const columnWidth = fontSize * 0.8;
    const numColumns = Math.ceil(width / columnWidth);

    // Initialize columns
    const columns: Column[] = [];
    for (let i = 0; i < numColumns; i++) {
      if (Math.random() < density * 3) {
        const length = 5 + Math.floor(Math.random() * 15);
        const chars: string[] = [];
        for (let j = 0; j < length; j++) {
          chars.push(ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]);
        }
        columns.push({
          x: i * columnWidth,
          y: Math.random() * -height,
          speed: (0.5 + Math.random() * 1.5) * speed,
          chars,
          length,
        });
      }
    }
    columnsRef.current = columns;

    // Animation
    let lastTime = performance.now();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = currentTime;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw columns
      ctx.font = `${fontSize}px monospace`;

      for (const column of columns) {
        // Update position
        column.y += column.speed * deltaTime;

        // Reset if off screen
        if (column.y > height + column.length * fontSize) {
          column.y = -column.length * fontSize;
          column.speed = (0.5 + Math.random() * 1.5) * speed;
          // Randomize chars
          for (let j = 0; j < column.chars.length; j++) {
            column.chars[j] = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
          }
        }

        // Draw each character in the column
        for (let i = 0; i < column.chars.length; i++) {
          const charY = column.y + i * fontSize;

          // Only draw if visible
          if (charY > -fontSize && charY < height + fontSize) {
            // Fade based on position in column (head is brightest)
            const fadePosition = 1 - (i / column.chars.length);
            const alpha = fadePosition * 0.3;

            ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.fillText(column.chars[i], column.x, charY);
          }

          // Occasionally change a character
          if (Math.random() < 0.01) {
            column.chars[i] = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
          }
        }
      }
    };

    animate();

    // Resize handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted, color, speed, density]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
