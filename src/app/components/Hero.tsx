"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal, ChevronDown } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";
import TrustBar from "./TrustBar";
import { heroStats, heroRotatingPhrases } from "@/app/data/stats";
import { TorqueHelicoid } from "@/components/three/TorqueHelicoid";
import { SplitText } from "@/components/animations/SplitText";

// =============================================================================
// Interactive Gradient Background with Particle Mesh
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
// Rotating Text Component - Typewriter effect
// =============================================================================
function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = heroRotatingPhrases[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % heroRotatingPhrases.length);
        }
      }
    }, isDeleting ? 30 : 50);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span>
      for {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// =============================================================================
// Hero - Immersive terminal-style hero section
// =============================================================================
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Area with Background */}
      <div ref={heroRef} className="relative w-full min-h-screen overflow-hidden">
        {/* Interactive Gradient Background */}
        <InteractiveGradient />

        {/* 3D Helicoid Visual — behind content on mobile/tablet, right-aligned on desktop */}
        <div className="absolute top-0 bottom-0 right-0 w-[80%] sm:w-[70%] lg:w-[60%] h-full z-10 pointer-events-none mask-fade-right">
          <div className="w-full h-full pointer-events-auto opacity-40 sm:opacity-50 lg:opacity-100 transition-opacity">
            <TorqueHelicoid />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 w-full h-full min-h-screen flex flex-col justify-between px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem] pt-24">
          <div />

          {/* Center Content */}
          <div className="max-w-2xl">
            {/* Terminal Tag */}
            <div
              data-animate="fade-up"
              className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]"
            >
              <Terminal className="w-3 h-3" />
              <span>89M+ transactions indexed</span>
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
            </div>

            {/* Main Headline — SplitText line reveal */}
            <SplitText
              tag="h1"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-black"
              delay={0.1}
            >
              <span>The Onchain</span>
              <span>Growth Engine</span>
            </SplitText>

            {/* Subheadline */}
            <p
              data-animate="fade-up"
              data-animate-delay="0.2"
              className="text-lg md:text-xl text-black/60 mb-8 leading-relaxed max-w-2xl"
            >
              Turn raw Solana data into surgical incentives. Torque automates the logic of acquisition, retention, and liquidity—eliminating capital friction.
            </p>

            {/* Action Buttons */}
            <div
              data-animate="fade-up"
              data-animate-delay="0.3"
              className="flex flex-col sm:flex-row items-start gap-4 mb-16"
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="accent"
                className="group"
              >
                Deploy Logic
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button
                variant="outline"
                href="/primitives"
              >
                Explore Primitives
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Stats Row */}
            <div
              data-animate="fade-up"
              data-animate-delay="0.4"
              className="flex items-start gap-8 md:gap-12"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-black tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-black/50 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full pb-8">
            <TrustBar
              trailing={
                <div className="flex items-center gap-2 text-black/40 ml-auto flex-shrink-0">
                  <span className="font-mono text-xs uppercase tracking-wider">Scroll to explore</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
