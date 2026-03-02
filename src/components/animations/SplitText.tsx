"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/components/providers/GsapProvider";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
  useScrollTrigger?: boolean;
}

export function SplitText({
  children,
  tag: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.18,
  triggerStart = "top 85%",
  useScrollTrigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ready } = useGsap();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !ready) return;

    const lines = el.querySelectorAll<HTMLElement>(".split-line-inner");
    if (lines.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(lines, { y: "0%" });
      return;
    }

    const ctx = gsap.context(() => {
      const animConfig: gsap.TweenVars = {
        y: "0%",
        duration: 0.8,
        stagger,
        ease: "power2.out",
        delay,
      };

      if (useScrollTrigger) {
        animConfig.scrollTrigger = {
          trigger: el,
          start: triggerStart,
          once: true,
        };
      }

      gsap.fromTo(lines, { y: "101%" }, animConfig);
    });

    return () => ctx.revert();
  }, [ready, delay, stagger, triggerStart, useScrollTrigger]);

  const childArray = React.Children.toArray(children);

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {childArray.map((child, i) => (
        <span key={i} className="block overflow-hidden pb-2">
          <span
            className="split-line-inner block"
            style={{ transform: "translateY(101%)" }}
          >
            {child}
          </span>
        </span>
      ))}
    </Tag>
  );
}
