"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal, ChevronDown } from "lucide-react";
import TrustBar from "./TrustBar";
import { heroStats } from "@/app/data/stats";
import { SplitText } from "@/components/animations/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/components/providers/GsapProvider";

gsap.registerPlugin(ScrollTrigger);

const ChromeHexaLogo = dynamic(
  () => import("@/components/three/ChromeHexaLogo").then(mod => ({ default: mod.ChromeHexaLogo })),
  { ssr: false }
);
const IntegrationRequestModal = dynamic(
  () => import("./IntegrationRequestModal"),
  { ssr: false }
);

// =============================================================================
// Interactive Gradient Background
// =============================================================================
function InteractiveGradient() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Top fade for navbar blend */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// =============================================================================
// Hero - 3D Chrome Hexa Logo with scroll-driven assembly
// =============================================================================
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { ready } = useGsap();

  // Refs for staggered entrance animation
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(window.scrollY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Orchestrated hero entrance timeline
  useEffect(() => {
    if (!ready) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      [badgeRef, subtitleRef, buttonsRef, statsRef, scrollHintRef].forEach(
        (ref) => {
          if (!ref.current) return;
          gsap.set(ref.current, { opacity: 1, y: 0, filter: "none" });
          // Also reveal children for buttons/stats
          gsap.set(ref.current.children, { opacity: 1, y: 0 });
        }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Badge — drops in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -15, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.1
      );

      // 2. SplitText headline handles itself (delay: 0.4, stagger: 0.15)

      // 3. Subtitle — fades up with blur dissolve
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        1.0
      );

      // 4. Buttons — slide up one at a time
      if (buttonsRef.current) {
        tl.fromTo(
          Array.from(buttonsRef.current.children),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.15 },
          1.3
        );
      }

      // 5. Stats — hidden on load, revealed on first scroll (staggered)
      if (statsRef.current) {
        const statEls = Array.from(statsRef.current.children);
        gsap.set(statEls, { opacity: 0, y: 25 });

        const onFirstScroll = () => {
          if (window.scrollY > 50) {
            gsap.to(statEls, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              ease: "power3.out",
            });
            window.removeEventListener("scroll", onFirstScroll);
          }
        };
        window.addEventListener("scroll", onFirstScroll, { passive: true });
      }

      // 6. Scroll hint — fade in, then hide on scroll
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.8
      );

      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          y: -5,
          scrollTrigger: {
            trigger: scrollHintRef.current,
            start: "top 98%",
            end: "top 60%",
            scrub: 1.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [ready]);

  // TrustBar fades in after hero text scrolls away (scroll > 0.8vh)
  // and continuously rises upward as user keeps scrolling
  const trustBarOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.8) / 0.4));
  const trustBarY = -Math.max(0, (scrollProgress - 0.8)) * 250;

  return (
    <>
      {/* Assembly (1vh) + dwell (0.5vh) + Y rotation (1vh), then unstick */}
      <section className="relative w-full" style={{ height: "350vh" }}>
        {/* Sticky viewport — stays pinned while user scrolls */}
        <div className="sticky top-0 w-full h-screen z-0">
          <InteractiveGradient />

          {/* 3D Chrome Hexa Logo — centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <ChromeHexaLogo />
            </div>
          </div>

          {/* Bottom fade — soft transition from scene to white content */}
          <div className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none bg-gradient-to-b from-transparent via-white/50 to-white" />

          {/* Trust bar — fades in after hero text scrolls away */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem] pb-12"
            style={{
              opacity: trustBarOpacity,
              transform: `translateY(${trustBarY}px)`,
              willChange: "transform, opacity",
              pointerEvents: trustBarOpacity > 0.5 ? "auto" : "none",
            }}
          >
            <TrustBar />
          </div>
        </div>

        {/* Hero content — overlaps the sticky scene, scrolls away naturally */}
        <div
          className="relative z-20"
          style={{
            marginTop: "-100vh",
            height: "100vh",
            transform: `translateY(${-scrollProgress * 40}px)`,
            willChange: "transform",
          }}
        >
          <div className="w-full h-full flex flex-col justify-between pt-24 pointer-events-none">
            <div />

            {/* Center Content */}
            <div className="flex flex-col items-center text-center px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem]">
              {/* Terminal Tag */}
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-brand-gray-500 border border-black/10 px-3 py-1.5 rounded-[3px]"
                style={{ opacity: 0 }}
              >
                <Terminal className="w-3 h-3" />
                <span>89M+ transactions indexed</span>
                <span className="w-1.5 h-1.5 bg-aquamarine rounded-full animate-pulse" />
              </div>

              {/* Main Headline — SplitText line reveal */}
              <SplitText
                tag="h1"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-black"
                delay={0.4}
                stagger={0.3}
                useScrollTrigger={false}
              >
                <span>The Onchain</span>
                <span>Growth Engine</span>
              </SplitText>

              {/* Subheadline */}
              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-brand-gray-500 mb-8 leading-relaxed max-w-2xl"
                style={{ opacity: 0 }}
              >
                Turn raw Solana data into surgical incentives. Torque automates the logic of acquisition, retention, and liquidity—eliminating capital friction.
              </p>

              {/* Action Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row items-center gap-4 mb-16 pointer-events-auto"
              >
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="accent"
                  className="group"
                  style={{ opacity: 0 }}
                >
                  Deploy Logic
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  variant="outline"
                  href="/primitives"
                  style={{ opacity: 0 }}
                >
                  Explore Primitives
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Stats Row */}
              <div
                ref={statsRef}
                className="flex items-start justify-center gap-8 md:gap-12"
              >
                {heroStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center" style={{ opacity: 0 }}>
                    <span className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-black tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs text-brand-gray-400 mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom — scroll hint */}
            <div ref={scrollHintRef} className="w-full pb-8" style={{ opacity: 0 }}>
              <div className="flex flex-col items-center gap-1 text-brand-gray-300">
                <span className="font-mono text-xs uppercase tracking-wider">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Hero;
