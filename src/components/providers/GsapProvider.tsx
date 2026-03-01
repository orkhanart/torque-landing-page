"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/animations/Preloader";

gsap.registerPlugin(ScrollTrigger);

interface GsapContextValue {
  ready: boolean;
}

const GsapContext = createContext<GsapContextValue>({ ready: false });

export function useGsap() {
  return useContext(GsapContext);
}

interface GsapProviderProps {
  children: React.ReactNode;
}

export function GsapProvider({ children }: GsapProviderProps) {
  const [ready, setReady] = useState(false);

  // Set up ScrollTrigger.batch for data-animate elements after preloader reveals
  useEffect(() => {
    if (!ready) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show everything immediately
      gsap.set("[data-animate]", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Set initial states based on data-animate variant
    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
      const variant = el.getAttribute("data-animate");
      switch (variant) {
        case "fade-in":
          gsap.set(el, { opacity: 0 });
          break;
        case "scale-in":
          gsap.set(el, { opacity: 0, scale: 0.95 });
          break;
        case "fade-up":
        default:
          gsap.set(el, { opacity: 0, y: 40 });
          break;
      }
    });

    // Batch animate elements as they scroll into view
    ScrollTrigger.batch("[data-animate]", {
      onEnter: (batch) => {
        const fresh = batch.filter(
          (el) => !el.hasAttribute("data-animated")
        );
        if (fresh.length === 0) return;

        fresh.forEach((el) => el.setAttribute("data-animated", ""));

        gsap.to(fresh, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      },
      start: "top 88%",
    });

    // Refresh to evaluate triggers for above-fold elements
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        // Only kill batch triggers, not SplitText ones
        if (st.vars?.trigger === undefined) {
          st.kill();
        }
      });
    };
  }, [ready]);

  const handleReveal = () => {
    setReady(true);
  };

  const handleComplete = () => {
    // Final refresh after preloader DOM is removed
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  return (
    <GsapContext.Provider value={{ ready }}>
      <Preloader onReveal={handleReveal} onComplete={handleComplete} />
      {children}
    </GsapContext.Provider>
  );
}
