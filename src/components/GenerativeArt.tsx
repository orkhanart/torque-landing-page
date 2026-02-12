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

interface StaticPath {
  points: { x: number; y: number }[];
  type: number;
  strokeWeight: number;
  opacity: number;
}

interface StaticShape {
  x: number;
  y: number;
  size: number;
  strokeWeight: number;
  isCircle: boolean;
  opacity: number;
}

interface MouseTrail {
  x: number;
  y: number;
  age: number;
  opacity: number;
}

const GenerativeArt: React.FC<GenerativeArtProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const lastMouseRef = useRef({ x: -1000, y: -1000 });
  const stateRef = useRef<{
    staticPaths: StaticPath[];
    staticShapes: StaticShape[];
    mouseTrails: MouseTrail[];
    noise: NoiseGenerator;
    initialized: boolean;
    needsRedraw: boolean;
  }>({
    staticPaths: [],
    staticShapes: [],
    mouseTrails: [],
    noise: new NoiseGenerator(),
    initialized: false,
    needsRedraw: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const generateStaticArt = (width: number, height: number) => {
      const noise = new NoiseGenerator();
      const staticPaths: StaticPath[] = [];
      const staticShapes: StaticShape[] = [];

      // Generate static flowing paths
      for (let i = 0; i < 400; i++) {
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

        staticPaths.push({
          points,
          type,
          strokeWeight: Math.random() * Math.random() * 1.5,
          opacity: 0.4 + Math.random() * 0.3,
        });
      }

      // Generate static overlay shapes
      for (let i = 0; i < 60; i++) {
        staticShapes.push({
          x: randomGaussian(0.5, 0.15) * width,
          y: randomGaussian(0.5, 0.15) * height,
          size: Math.random() * width * 0.3 * Math.random() * Math.random(),
          strokeWeight: Math.random() * Math.random() * 1.5,
          isCircle: Math.random() < 0.5,
          opacity: 0.15 + Math.random() * 0.15,
        });
      }

      return { staticPaths, staticShapes, noise };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const { staticPaths, staticShapes, noise } = generateStaticArt(rect.width, rect.height);
      stateRef.current = {
        staticPaths,
        staticShapes,
        mouseTrails: [],
        noise,
        initialized: true,
        needsRedraw: true,
      };
    };

    // Mouse move handler - creates trail (window level)
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      // Check if mouse is within canvas bounds
      if (newX < 0 || newX > rect.width || newY < 0 || newY > rect.height) {
        return;
      }

      // Only add trail if mouse moved enough
      const dist = Math.hypot(newX - lastMouseRef.current.x, newY - lastMouseRef.current.y);
      if (dist > 8) {
        stateRef.current.mouseTrails.push({
          x: newX,
          y: newY,
          age: 0,
          opacity: 0.9,
        });
        lastMouseRef.current = { x: newX, y: newY };
      }

      mouseRef.current = { x: newX, y: newY };
    };

    // Click handler - creates burst effect (window level)
    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const state = stateRef.current;

      // Check if click is within canvas bounds
      if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) {
        return;
      }

      if (!state.initialized) return;

      // Add burst of trails in a circle
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 30 + Math.random() * 40;
        state.mouseTrails.push({
          x: clickX + Math.cos(angle) * radius,
          y: clickY + Math.sin(angle) * radius,
          age: 0,
          opacity: 0.9,
        });
      }

      // Add center point
      state.mouseTrails.push({
        x: clickX,
        y: clickY,
        age: 0,
        opacity: 1,
      });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const drawStaticContent = () => {
      const state = stateRef.current;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw static paths
      for (const path of state.staticPaths) {
        if (path.points.length < 2) continue;

        ctx.strokeStyle = `rgba(0, 0, 0, ${path.opacity})`;
        ctx.lineWidth = path.strokeWeight;

        if (path.type < 2) {
          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          for (let i = 1; i < path.points.length; i++) {
            ctx.lineTo(path.points[i].x, path.points[i].y);
          }
          ctx.stroke();
        } else {
          for (const point of path.points) {
            const circleSize = Math.random() * Math.random() * 4;
            ctx.beginPath();
            ctx.arc(point.x, point.y, circleSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Draw static shapes
      for (const shape of state.staticShapes) {
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
    };

    const animate = () => {
      const state = stateRef.current;
      if (!state.initialized) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Always redraw when there are trails
      const hasTrails = state.mouseTrails.length > 0;

      if (state.needsRedraw || hasTrails) {
        drawStaticContent();

        // Draw mouse trails
        for (let i = state.mouseTrails.length - 1; i >= 0; i--) {
          const trail = state.mouseTrails[i];
          trail.age++;
          trail.opacity -= 0.02;

          if (trail.opacity <= 0) {
            state.mouseTrails.splice(i, 1);
            continue;
          }

          // Draw trail point as expanding circle
          const size = 4 + trail.age * 0.5;
          ctx.strokeStyle = `rgba(0, 0, 0, ${trail.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
          ctx.stroke();

          // Draw inner dot
          ctx.fillStyle = `rgba(0, 0, 0, ${trail.opacity * 0.7})`;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        state.needsRedraw = false;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full cursor-pointer ${className}`}
      style={{ display: "block" }}
    />
  );
};

export default GenerativeArt;
