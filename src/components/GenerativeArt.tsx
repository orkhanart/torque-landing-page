"use client";

import React, { useRef, useEffect } from "react";

interface GenerativeArtProps {
  className?: string;
}

// Simple noise implementation (Perlin-like)
class NoiseGenerator {
  private permutation: number[];

  constructor() {
    this.permutation = [];
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = Math.floor(Math.random() * 256);
    }
    this.permutation = [...this.permutation, ...this.permutation];
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(x: number, y: number, z: number = 0): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);

    const A = this.permutation[X] + Y;
    const AA = this.permutation[A] + Z;
    const AB = this.permutation[A + 1] + Z;
    const B = this.permutation[X + 1] + Y;
    const BA = this.permutation[B] + Z;
    const BB = this.permutation[B + 1] + Z;

    return (
      this.lerp(
        this.lerp(
          this.lerp(this.grad(this.permutation[AA], x, y), this.grad(this.permutation[BA], x - 1, y), u),
          this.lerp(this.grad(this.permutation[AB], x, y - 1), this.grad(this.permutation[BB], x - 1, y - 1), u),
          v
        ),
        this.lerp(
          this.lerp(this.grad(this.permutation[AA + 1], x, y), this.grad(this.permutation[BA + 1], x - 1, y), u),
          this.lerp(this.grad(this.permutation[AB + 1], x, y - 1), this.grad(this.permutation[BB + 1], x - 1, y - 1), u),
          v
        ),
        w
      ) * 0.5 + 0.5
    );
  }
}

// Gaussian random
function randomGaussian(mean: number, sd: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + sd * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

interface Path {
  points: { x: number; y: number }[];
  type: number;
  strokeWeight: number;
  progress: number;
  speed: number;
}

interface Shape {
  x: number;
  y: number;
  size: number;
  strokeWeight: number;
  isCircle: boolean;
  opacity: number;
  fadeIn: boolean;
}

const GenerativeArt: React.FC<GenerativeArtProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const stateRef = useRef<{
    paths: Path[];
    shapes: Shape[];
    noise: NoiseGenerator;
    initialized: boolean;
  }>({
    paths: [],
    shapes: [],
    noise: new NoiseGenerator(),
    initialized: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const generatePaths = (width: number, height: number) => {
      const noise = new NoiseGenerator();
      const paths: Path[] = [];
      const shapes: Shape[] = [];

      // Generate flowing paths
      for (let i = 0; i < 300; i++) {
        const startX = randomGaussian(0.5, 0.15) * width;
        const startY = randomGaussian(0.5, 0.15) * height;
        const c = Math.floor(Math.random() * 40 + 10);
        const scl = 0.005;
        const type = Math.floor(Math.random() * 4);
        const points: { x: number; y: number }[] = [];

        let x = startX;
        let y = startY;

        for (let j = 0; j < c; j++) {
          const n = noise.noise(x * scl, y * scl, j * 0.001);
          let angle: number;

          if (type === 0) {
            angle = Math.floor(n * 10) * (Math.PI / 2);
          } else if (type === 1) {
            angle = 10 * n;
          } else if (type === 2) {
            angle = Math.floor(n * 15) * (Math.PI / 2);
          } else {
            angle = 15 * n;
          }

          points.push({ x, y });
          x += Math.cos(angle) * 8;
          y += Math.sin(angle) * 8;
        }

        paths.push({
          points,
          type,
          strokeWeight: Math.random() * Math.random() * 1.5,
          progress: 0,
          speed: 0.01 + Math.random() * 0.02,
        });
      }

      // Generate overlay shapes
      for (let i = 0; i < 50; i++) {
        shapes.push({
          x: randomGaussian(0.5, 0.15) * width,
          y: randomGaussian(0.5, 0.15) * height,
          size: Math.random() * width * 0.3 * Math.random() * Math.random(),
          strokeWeight: Math.random() * Math.random() * 1.5,
          isCircle: Math.random() < 0.5,
          opacity: 0,
          fadeIn: true,
        });
      }

      return { paths, shapes, noise };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const { paths, shapes, noise } = generatePaths(rect.width, rect.height);
      stateRef.current = { paths, shapes, noise, initialized: true };
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const state = stateRef.current;
      if (!state.initialized) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Draw paths with animation
      ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const path of state.paths) {
        if (path.points.length < 2) continue;

        // Update progress
        path.progress = Math.min(1, path.progress + path.speed);

        const pointsToDraw = Math.floor(path.points.length * path.progress);
        if (pointsToDraw < 2) continue;

        ctx.lineWidth = path.strokeWeight;

        if (path.type < 2) {
          // Draw as connected line
          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          for (let i = 1; i < pointsToDraw; i++) {
            ctx.lineTo(path.points[i].x, path.points[i].y);
          }
          ctx.stroke();
        } else {
          // Draw as circles along path
          for (let i = 0; i < pointsToDraw; i++) {
            const point = path.points[i];
            const circleSize = Math.random() * Math.random() * 5;
            ctx.beginPath();
            ctx.arc(point.x, point.y, circleSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Draw and animate shapes
      for (const shape of state.shapes) {
        // Fade in animation
        if (shape.fadeIn && shape.opacity < 0.3) {
          shape.opacity += 0.005;
        }

        ctx.strokeStyle = `rgba(0, 0, 0, ${shape.opacity})`;
        ctx.lineWidth = shape.strokeWeight;

        if (shape.isCircle) {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeRect(
            shape.x - shape.size / 2,
            shape.y - shape.size / 2,
            shape.size,
            shape.size
          );
        }
      }

      // Check if animation is complete, then slowly regenerate
      const allComplete = state.paths.every((p) => p.progress >= 1);
      if (allComplete) {
        // Slowly fade and regenerate after a delay
        let shouldRegenerate = true;
        for (const path of state.paths) {
          if (Math.random() < 0.001) {
            path.progress = 0;
            path.speed = 0.01 + Math.random() * 0.02;
            shouldRegenerate = false;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
};

export default GenerativeArt;
