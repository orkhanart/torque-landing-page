"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useScrollContext } from "@/components/providers/ScrollProvider";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
  easing?: (t: number) => number;
}

interface ParallaxTransform {
  x: number;
  y: number;
  style: React.CSSProperties;
}

export function useParallax(
  ref: React.RefObject<HTMLElement>,
  options: ParallaxOptions = {}
): ParallaxTransform {
  const { speed = 0.5, direction = "vertical", easing = (t) => t } = options;
  const { scrollY } = useScrollContext();
  const [transform, setTransform] = useState<ParallaxTransform>({
    x: 0,
    y: 0,
    style: {},
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTransform({ x: 0, y: 0, style: {} });
      return;
    }

    if (!ref.current) return;

    const updateParallax = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;

      // Calculate offset from center of viewport
      const offsetFromCenter = elementCenter - windowHeight / 2;

      // Apply speed multiplier and easing
      const parallaxOffset = easing(Math.abs(offsetFromCenter / windowHeight)) *
        offsetFromCenter *
        speed;

      const x = direction === "horizontal" ? parallaxOffset : 0;
      const y = direction === "vertical" ? parallaxOffset : 0;

      setTransform({
        x,
        y,
        style: {
          transform: `translate3d(${x}px, ${y}px, 0)`,
          willChange: "transform",
        },
      });
    };

    updateParallax();

    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, [ref, speed, direction, easing, scrollY]);

  return transform;
}

// Hook for multi-layer parallax effect
export function useParallaxLayers(
  layerSpeeds: number[] = [0.2, 0.5, 0.8]
): React.CSSProperties[] {
  const { scrollY } = useScrollContext();
  const [styles, setStyles] = useState<React.CSSProperties[]>(
    layerSpeeds.map(() => ({}))
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const updateLayers = () => {
      const newStyles = layerSpeeds.map((speed) => ({
        transform: `translate3d(0, ${scrollY * speed}px, 0)`,
        willChange: "transform" as const,
      }));
      setStyles(newStyles);
    };

    updateLayers();
  }, [scrollY, layerSpeeds]);

  return styles;
}

// Hook for mouse-based parallax
export function useMouseParallax(
  ref: React.RefObject<HTMLElement>,
  intensity: number = 0.05
): React.CSSProperties {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * intensity;
      const y = (e.clientY - centerY) * intensity;

      setStyle({
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref, intensity]);

  return style;
}

export default useParallax;
