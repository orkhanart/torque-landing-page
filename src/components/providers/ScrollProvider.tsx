"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import Lenis from "lenis";

interface ScrollState {
  progress: number;
  velocity: number;
  direction: number;
  isScrolling: boolean;
  scrollY: number;
}

interface ScrollContextValue extends ScrollState {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  progress: 0,
  velocity: 0,
  direction: 0,
  isScrolling: false,
  scrollY: 0,
  lenis: null,
  scrollTo: () => {},
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

interface ScrollProviderProps {
  children: React.ReactNode;
  options?: {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    wheelMultiplier?: number;
  };
}

export function ScrollProvider({ children, options = {} }: ScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    velocity: 0,
    direction: 0,
    isScrolling: false,
    scrollY: 0,
  });

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, scrollOptions?: object) => {
      lenisRef.current?.scrollTo(target, scrollOptions);
    },
    []
  );

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : options.lerp ?? 0.1,
      duration: prefersReducedMotion ? 0 : options.duration ?? 1.2,
      smoothWheel: !prefersReducedMotion && (options.smoothWheel ?? true),
      wheelMultiplier: options.wheelMultiplier ?? 1,
    });

    lenisRef.current = lenis;

    let scrollTimeout: NodeJS.Timeout;

    lenis.on("scroll", (e: Lenis) => {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? e.scroll / documentHeight : 0;

      setScrollState({
        progress: Math.min(Math.max(progress, 0), 1),
        velocity: e.velocity,
        direction: e.direction,
        isScrolling: true,
        scrollY: e.scroll,
      });

      // Reset isScrolling after scroll stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollState((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      clearTimeout(scrollTimeout);
    };
  }, [options.lerp, options.duration, options.smoothWheel, options.wheelMultiplier]);

  return (
    <ScrollContext.Provider
      value={{
        ...scrollState,
        lenis: lenisRef.current,
        scrollTo,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollProvider;
