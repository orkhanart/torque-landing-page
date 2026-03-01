"use client";

import { useEffect, useRef } from "react";

type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  deltaTime: number,
) => void;

interface UseCardVisualAnimationOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  paused?: boolean;
  speed?: number;
  draw: DrawFunction;
}

export function useCardVisualAnimation({
  canvasRef,
  paused = false,
  speed = 1,
  draw,
}: UseCardVisualAnimationOptions): { w: number; h: number } {
  const sizeRef = useRef({ w: 0, h: 0 });
  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);
  const drawRef = useRef(draw);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);

  // Keep refs in sync
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;
      sizeRef.current = { w, h };
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    lastFrameRef.current = performance.now();

    const animate = () => {
      if (pausedRef.current) return;

      const now = performance.now();
      const rawDelta = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;

      // Clamp deltaTime to avoid huge jumps after tab switch
      const deltaTime = Math.min(rawDelta, 0.1) * speedRef.current;
      timeRef.current += deltaTime;

      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        drawRef.current(ctx, w, h, timeRef.current, deltaTime);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [canvasRef]);

  // Resume animation when unpaused
  useEffect(() => {
    if (!paused) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      lastFrameRef.current = performance.now();

      const animate = () => {
        if (pausedRef.current) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const now = performance.now();
        const rawDelta = (now - lastFrameRef.current) / 1000;
        lastFrameRef.current = now;

        const deltaTime = Math.min(rawDelta, 0.1) * speedRef.current;
        timeRef.current += deltaTime;

        const { w, h } = sizeRef.current;
        if (w > 0 && h > 0) {
          drawRef.current(ctx, w, h, timeRef.current, deltaTime);
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [paused, canvasRef]);

  return sizeRef.current;
}
