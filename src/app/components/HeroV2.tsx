"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlitchText } from "@/components/terminal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal, CircleDot, CreditCard, TrendingUp, ChevronDown } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";
import TrustBar from "./TrustBar";
import GrowthStack from "./GrowthStack";
import PlaybooksSection from "./PlaybooksSection";
import { motion } from "framer-motion";
import ColorBars from "@/components/ColorBars";

// =============================================================================
// Scramble Text Component - Auto-triggers on mount
// =============================================================================
const CHARS = "0123456789$MK+%";

function ScrambleStat({
  value,
  delay = 0
}: {
  value: string;
  delay?: number;
}) {
  const [text, setText] = useState(value);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Start with random text
    setText(
      value.split("").map((char) => {
        if (char === " " || char === ".") return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("")
    );

    // Then scramble to reveal
    const timeout = setTimeout(() => {
      iterationRef.current = 0;

      intervalRef.current = setInterval(() => {
        setText(
          value
            .split("")
            .map((char, index) => {
              if (index < iterationRef.current) {
                return value[index];
              }
              if (char === " " || char === ".") return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iterationRef.current >= value.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iterationRef.current += 0.4;
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMounted, value, delay]);

  return <>{text}</>;
}

// =============================================================================
// Rotating Text Component - Typewriter effect
// =============================================================================
const phrases = [
  "On-chain Growth",
  "Token Rewards",
  "Incentives",
  "Leaderboards",
  "Competitions",
];

function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
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
// Stats Data
// =============================================================================
const stats = [
  { value: "$10M+", label: "Distributed" },
  { value: "906K", label: "Wallets" },
  { value: "89M+", label: "Transactions" },
];

// =============================================================================
// HeroV2 - Immersive terminal-style hero section
// =============================================================================

const HeroV2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-transparent overflow-hidden -mt-20">
      {/* Animated Color Bars Background - Full bleed from top */}
      <div className="fixed top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <ColorBars
          barCount={24}
          repetitions={3}
          influenceRadius={2.5}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Terminal Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px] bg-white/80 backdrop-blur-sm"
          >
            <Terminal className="w-3 h-3" />
            <span>89M+ transactions indexed</span>
            <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
          </motion.div>

          {/* Main Headline - 2 Lines */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-black"
          >
            <span className="block whitespace-nowrap">
              <GlitchText intensity="subtle" triggerOnView={true} triggerOnHover={false}>
                The Intelligence Layer
              </GlitchText>
            </span>
            <span className="block text-black/40 whitespace-nowrap"><RotatingText /></span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-black/60 mb-8 leading-relaxed max-w-2xl"
          >
            40% of incentive spend is wasted. We fix that with data-driven reward optimization.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              className="group"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              variant="outline"
              href="/playbooks"
            >
              View Playbooks
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-12 md:gap-16 lg:gap-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-black tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-black/50 mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Bar - Logos */}
      <TrustBar />

      {/* Scroll to Explore */}
      <div className="flex items-center gap-2 text-black/40 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <span className="font-mono text-xs uppercase tracking-wider">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Platform Features */}
      <GrowthStack />

      {/* Problem Section - Hidden for now
      <div className="relative z-10 w-full py-20 md:py-32 bg-white border-t border-black/10">
        <div className="relative w-full px-6 md:px-12 lg:px-20">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span>The Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-black mb-6 max-w-4xl">
            Protocols waste <span className="text-red-500">40%</span> of their incentive spend
          </h2>
          <p className="text-lg md:text-xl text-black/60 mb-16 max-w-2xl">
            You&apos;re spending millions on incentives with no idea if it&apos;s working. Essentially throwing money into the void.
          </p>
          ...
        </div>
      </div>
      */}

      {/* Solution Section */}
      <div className="relative z-10 w-full py-20 md:py-32 bg-white border-t border-black/10">
        <div className="relative w-full px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              {/* Section Tag */}
              <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
                <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
                <span>The Solutions</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-black mb-6 max-w-4xl">
                Distribution infrastructure with <span className="text-black/40">intelligence</span>
              </h2>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-black/60 max-w-2xl">
                Sector-specific strategies for the problems no one else is solving.
              </p>
            </div>
            <Button variant="outline" href="/solutions" className="w-fit">
              View Solutions
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Solution Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Stablecoins */}
            <div className="bg-white border border-black/10 overflow-hidden group hover:border-black/30 transition-colors rounded-[3px]">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/5 border-b border-black/10">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span className="w-2 h-2 rounded-full bg-black/20" />
                  <span className="w-2 h-2 rounded-full bg-black/20" />
                </div>
                <span className="font-mono text-[10px] text-black/40 uppercase">stablecoin.strategy</span>
              </div>
              <div className="p-6 md:p-8">
                <CircleDot className="w-8 h-8 text-black mb-6" />

                <h3 className="font-display text-2xl font-medium text-black mb-1">
                  Stablecoins
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-black/50 mb-6">
                  Ignite Velocity
                </p>

                <div className="space-y-3 mb-6">
                  <div className="bg-black/5 p-4 border-l-2 border-black/30">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">diagnosis</span>
                    <p className="text-sm text-black/70">High Cap / Low Flow</p>
                  </div>
                  <div className="bg-black/5 p-4 border-l-2 border-blue">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">the fix</span>
                    <p className="text-sm text-black">Referral & Social Layers</p>
                  </div>
                </div>

                <a href="/playbooks" className="inline-flex items-center text-sm text-black hover:text-blue transition-colors font-medium">
                  View Strategy <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Card 2 - Lending */}
            <div className="bg-white border border-black/10 overflow-hidden group hover:border-black/30 transition-colors rounded-[3px]">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/5 border-b border-black/10">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span className="w-2 h-2 rounded-full bg-black/20" />
                  <span className="w-2 h-2 rounded-full bg-black/20" />
                </div>
                <span className="font-mono text-[10px] text-black/40 uppercase">lending.strategy</span>
              </div>
              <div className="p-6 md:p-8">
                <CreditCard className="w-8 h-8 text-black mb-6" />

                <h3 className="font-display text-2xl font-medium text-black mb-1">
                  Lending
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-black/50 mb-6">
                  Drive Real Yield
                </p>

                <div className="space-y-3 mb-6">
                  <div className="bg-black/5 p-4 border-l-2 border-black/30">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">diagnosis</span>
                    <p className="text-sm text-black/70">High TVL / Low Borrows</p>
                  </div>
                  <div className="bg-black/5 p-4 border-l-2 border-blue">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">the fix</span>
                    <p className="text-sm text-black">Looping & Borrowing Rewards</p>
                  </div>
                </div>

                <a href="/playbooks" className="inline-flex items-center text-sm text-black hover:text-blue transition-colors font-medium">
                  View Strategy <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Card 3 - Perps */}
            <div className="bg-white border border-black/10 overflow-hidden group hover:border-black/30 transition-colors rounded-[3px]">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/5 border-b border-black/10">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span className="w-2 h-2 rounded-full bg-black/20" />
                  <span className="w-2 h-2 rounded-full bg-black/20" />
                </div>
                <span className="font-mono text-[10px] text-black/40 uppercase">perps.strategy</span>
              </div>
              <div className="p-6 md:p-8">
                <TrendingUp className="w-8 h-8 text-black mb-6" />

                <h3 className="font-display text-2xl font-medium text-black mb-1">
                  Perps
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-black/50 mb-6">
                  Automate Retention
                </p>

                <div className="space-y-3 mb-6">
                  <div className="bg-black/5 p-4 border-l-2 border-black/30">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">diagnosis</span>
                    <p className="text-sm text-black/70">High Vol / Low Loyalty</p>
                  </div>
                  <div className="bg-black/5 p-4 border-l-2 border-blue">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">the fix</span>
                    <p className="text-sm text-black">Trader Progression Systems</p>
                  </div>
                </div>

                <a href="/playbooks" className="inline-flex items-center text-sm text-black hover:text-blue transition-colors font-medium">
                  View Strategy <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playbooks Section */}
      <PlaybooksSection />

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default HeroV2;
