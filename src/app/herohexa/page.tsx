"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal, ChevronDown } from "lucide-react";
import TrustBar from "../components/TrustBar";
import { heroStats, heroRotatingPhrases } from "@/app/data/stats";
import { SplitText } from "@/components/animations/SplitText";

const ChromeHexaLogo = dynamic(
  () => import("@/components/three/ChromeHexaLogo").then(mod => ({ default: mod.ChromeHexaLogo })),
  { ssr: false }
);
const IntegrationRequestModal = dynamic(
  () => import("../components/IntegrationRequestModal"),
  { ssr: false }
);

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

  return (
    <>
      {/* 2x viewport tall wrapper — scrolling through this drives the explode */}
      <section className="relative w-full" style={{ height: "200vh" }}>
        {/* Sticky viewport — stays pinned while user scrolls */}
        <div className="sticky top-0 w-full h-screen">
          {/* Interactive Gradient Background */}
          <InteractiveGradient />

          {/* 3D Chrome Hexa Logo — full viewport, centered */}
          <div className="absolute inset-0 z-10">
            <div className="relative w-full h-full">
              <ChromeHexaLogo />
            </div>
          </div>

          {/* Soft bottom fade — scene → white page transition */}
          <div className="absolute inset-x-0 bottom-0 h-56 z-30 pointer-events-none bg-gradient-to-b from-transparent via-white/60 to-white" />

          {/* Main Hero Content — centered overlay */}
          <div className="relative z-20 w-full h-full flex flex-col justify-between pt-24 pointer-events-none">
            <div />

            {/* Center Content */}
            <div className="flex flex-col items-center text-center px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem]">
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
                className="flex flex-col sm:flex-row items-center gap-4 mb-16 pointer-events-auto"
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
                className="flex items-start justify-center gap-8 md:gap-12"
              >
                {heroStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
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
            <div className="w-full pb-8 px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem] pointer-events-auto">
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
      </section>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// =============================================================================
// Content sections below the hero (makes page scrollable)
// =============================================================================
function ContentSections() {
  return (
    <>
      {/* How It Works */}
      <section className="py-32 px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem]">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-wider text-black/40 mb-4">How It Works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-black mb-16 max-w-2xl">
            Three steps to surgical onchain growth
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Index", desc: "Torque ingests raw Solana data — transactions, programs, accounts — and builds a real-time behavioral graph of your protocol's users." },
              { step: "02", title: "Target", desc: "Define incentive logic with precision. Segment by wallet behavior, transaction frequency, TVL contribution, or any onchain signal." },
              { step: "03", title: "Deploy", desc: "Launch campaigns that distribute rewards automatically. No manual airdrops, no guesswork — just deterministic, verifiable growth." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col">
                <span className="font-mono text-xs text-black/30 mb-3">{item.step}</span>
                <h3 className="text-xl font-display font-semibold text-black mb-3">{item.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-[1.5rem] md:mx-[3.5rem] lg:mx-[4.5rem] border-t border-black/5" />

      {/* Metrics */}
      <section className="py-32 px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-black/40 mb-4">Protocol Metrics</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-black mb-16">
            Numbers that compound
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "89M+", label: "Transactions indexed" },
              { value: "$2.1B", label: "Total volume routed" },
              { value: "150+", label: "Protocols integrated" },
              { value: "< 200ms", label: "Avg. response time" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-black tracking-tight">{stat.value}</span>
                <span className="text-xs text-black/40 mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-[1.5rem] md:mx-[3.5rem] lg:mx-[4.5rem] border-t border-black/5" />

      {/* CTA */}
      <section className="py-32 px-[1.5rem] md:px-[3.5rem] lg:px-[4.5rem]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-black mb-6">
            Ready to deploy?
          </h2>
          <p className="text-lg text-black/50 mb-10 max-w-xl mx-auto">
            Start building onchain incentive logic today. No minimum commitment, no manual overhead.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" className="group">
              Get Started
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button variant="outline" href="/primitives">
              Read the Docs
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}

export default function HeroHexaPage() {
  return (
    <main className="bg-white">
      <Hero />
      {/* Gradient bridge — blends the scene's warm gray into white */}
      <div
        className="relative h-32 -mt-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(238,238,232,0) 0%, #ffffff 100%)",
        }}
      />
      <ContentSections />
    </main>
  );
}
