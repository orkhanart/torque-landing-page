"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface PreloaderProps {
  onReveal?: () => void;
  onComplete?: () => void;
}

export function Preloader({ onReveal, onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Skip if already preloaded this session
    if (sessionStorage.getItem("torque-preloaded")) {
      setIsDone(true);
      onReveal?.();
      onComplete?.();
      return;
    }

    // Skip for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("torque-preloaded", "1");
      setIsDone(true);
      onReveal?.();
      onComplete?.();
      return;
    }

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };

    const tl = gsap.timeline();

    // Phase 1: Logo fade in (0 - 0.4s)
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );

    // Phase 2: Line expands (0.2 - 0.8s)
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
      0.2
    );

    // Phase 3: Counter 0 → 100 (0.2 - 1.2s)
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.0,
        ease: "power1.in",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value).toString();
          }
        },
      },
      0.2
    );

    // Phase 4: Signal reveal (at 1.35s — start of exit)
    tl.call(() => {
      onReveal?.();
    }, undefined, 1.35);

    // Phase 5: Slide overlay away (1.35 - 1.75s)
    tl.to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          sessionStorage.setItem("torque-preloaded", "1");
          document.body.style.overflow = "";
          setIsDone(true);
          onComplete?.();
        },
      },
      1.35
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <div ref={logoRef} className="opacity-0">
          <Image
            src="/logos/torque-symbol.svg"
            alt=""
            width={40}
            height={36}
            priority
          />
        </div>
        <div className="w-48 h-px bg-black/10 overflow-hidden">
          <div
            ref={lineRef}
            className="h-full bg-black origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-mono text-xs text-black/40 tabular-nums"
        >
          0
        </span>
      </div>
    </div>
  );
}
