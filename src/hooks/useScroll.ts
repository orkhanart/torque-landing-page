"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useScrollContext } from "@/components/providers/ScrollProvider";

interface UseScrollOptions {
  target?: React.RefObject<HTMLElement>;
  offset?: [string, string];
}

interface ElementScrollState {
  progress: number;
  isInView: boolean;
  hasEntered: boolean;
}

export function useScroll(options: UseScrollOptions = {}) {
  const context = useScrollContext();
  const { target, offset = ["start end", "end start"] } = options;

  const [elementState, setElementState] = useState<ElementScrollState>({
    progress: 0,
    isInView: false,
    hasEntered: false,
  });

  useEffect(() => {
    if (!target?.current) return;

    const element = target.current;

    const updateElementScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate element progress (0 when entering from bottom, 1 when exiting from top)
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const elementHeight = rect.height;

      // Element is in view when its top is below viewport bottom and bottom is above viewport top
      const isInView = elementTop < windowHeight && elementBottom > 0;

      // Progress calculation: 0 when element top enters viewport bottom, 1 when element bottom exits viewport top
      const totalScrollDistance = windowHeight + elementHeight;
      const scrolled = windowHeight - elementTop;
      const progress = Math.min(Math.max(scrolled / totalScrollDistance, 0), 1);

      setElementState((prev) => ({
        progress,
        isInView,
        hasEntered: prev.hasEntered || isInView,
      }));
    };

    updateElementScroll();

    window.addEventListener("scroll", updateElementScroll, { passive: true });
    window.addEventListener("resize", updateElementScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateElementScroll);
      window.removeEventListener("resize", updateElementScroll);
    };
  }, [target]);

  return {
    ...context,
    elementProgress: elementState.progress,
    isInView: elementState.isInView,
    hasEntered: elementState.hasEntered,
  };
}

// Simplified hook for global scroll only
export function useScrollProgress() {
  const { progress, velocity, direction, isScrolling, scrollY } = useScrollContext();
  return { progress, velocity, direction, isScrolling, scrollY };
}

// Hook for intersection-based visibility
export function useInView(
  ref: React.RefObject<HTMLElement>,
  options: { threshold?: number; triggerOnce?: boolean; rootMargin?: string } = {}
) {
  const { threshold = 0.1, triggerOnce = false, rootMargin = "0px" } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        if (inView) {
          setHasEntered(true);
        }

        if (triggerOnce && hasEntered) {
          setIsInView(true);
          return;
        }

        setIsInView(inView);
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold, triggerOnce, rootMargin, hasEntered]);

  return { isInView, hasEntered };
}

export default useScroll;
