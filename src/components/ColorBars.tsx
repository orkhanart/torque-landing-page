"use client";

import React, { useRef, useEffect } from "react";

// Torque brand palette - blues and cyans
const COLORS = [
  "#ABFFFF", // Primary cyan
  "#0A0F1C", // Dark blue-gray
  "#7DD3FC", // Light sky blue
  "#0EA5E9", // Sky blue
  "#0369A1", // Deep blue
  "#1E3A5F", // Navy
  "#38BDF8", // Bright cyan
];

interface ColorBarsProps {
  className?: string;
  barCount?: number;
  repetitions?: number;
  influenceRadius?: number;
}

const ColorBars: React.FC<ColorBarsProps> = ({
  className = "",
  barCount = 20,
  repetitions = 2,
  influenceRadius = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // Normalized 0-1
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 }); // Smoothed position

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Create repeating colors array
    const repeatedColors = Array(repetitions).fill(COLORS).flat();

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Smooth mouse movement
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

      // Clear canvas
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, width, height);

      // Calculate bar dimensions
      const barWidth = width / barCount;

      // Mouse influence
      const mouseX = smoothMouseRef.current.x;
      const mouseY = smoothMouseRef.current.y;

      // Draw each bar
      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth;
        const barCenterX = (i + 0.5) / barCount;

        // Calculate distance from mouse to this bar (normalized)
        const distFromMouse = Math.abs(barCenterX - mouseX);
        const mouseInfluence = Math.max(0, 1 - distFromMouse * influenceRadius);

        // Gradient position based purely on mouse Y and distance
        const baseGradientY = height * 1.5; // Default gradient height
        const mouseEffect = mouseInfluence * (mouseY - 0.5) * height * 2;
        const gradientY = baseGradientY + mouseEffect;

        // Create repeating linear gradient
        const gradient = ctx.createLinearGradient(x, 0, x, gradientY);

        // Add color stops
        repeatedColors.forEach((color, colorIndex) => {
          const stop = colorIndex / repeatedColors.length;
          gradient.addColorStop(stop, color);
        });

        // Add final color to complete the gradient
        gradient.addColorStop(1, repeatedColors[0]);

        // Draw bar with gradient
        ctx.fillStyle = gradient;

        // Add subtle shadow - stronger near mouse
        const shadowIntensity = 5 + mouseInfluence * 20;
        ctx.shadowColor = repeatedColors[0];
        ctx.shadowBlur = shadowIntensity;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillRect(x, 0, barWidth + 1, height); // +1 to prevent gaps

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [barCount, repetitions, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
};

export default ColorBars;
