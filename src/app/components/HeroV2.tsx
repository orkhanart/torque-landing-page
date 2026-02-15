"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlitchText } from "@/components/terminal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal, CircleDot, CreditCard, TrendingUp, ChevronDown, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import IntegrationRequestModal from "./IntegrationRequestModal";
import TrustBar from "./TrustBar";
import GrowthStack from "./GrowthStack";
import PlaybooksSection from "./PlaybooksSection";
import { heroStats, heroRotatingPhrases } from "@/app/data/stats";
import { SmartImage } from "@/components/ascii/SmartImage";
import { ImageGradient } from "@/components/ascii/ImageGradient";

// =============================================================================
// Interactive Gradient Background with Image
// =============================================================================
function InteractiveGradient() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <SmartImage src="/generated/image/mono-3d/hero-glass-architecture.jpg" alt="Hero background" fill className="object-cover" />
      </div>

      {/* White gradient overlays for readability */}
      <ImageGradient className="bg-gradient-to-b from-white/90 via-white/70 to-white/90" />
      <ImageGradient className="bg-gradient-to-r from-white/60 via-transparent to-white/60" />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top fade for navbar blend */}
      <ImageGradient className="!inset-auto inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />

      {/* Bottom fade */}
      <ImageGradient className="!inset-auto inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
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
// HeroV2 - Immersive terminal-style hero section
// =============================================================================
const HeroV2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Area with Background */}
      <div ref={heroRef} className="relative w-full min-h-screen overflow-hidden">
        {/* Interactive Gradient Background */}
        <InteractiveGradient />

        {/* Main Hero Content */}
        <div className="relative z-20 w-full h-full min-h-screen flex flex-col items-center justify-between px-6 md:px-12 lg:px-20 pt-24">
          <div />

          {/* Center Content */}
          <div className="max-w-4xl text-center">
            {/* Terminal Tag */}
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <Terminal className="w-3 h-3" />
              <span>89M+ transactions indexed</span>
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-black">
              <span className="block whitespace-nowrap">
                <GlitchText intensity="subtle" triggerOnView={true} triggerOnHover={false}>
                  The Intelligence Layer
                </GlitchText>
              </span>
              <span className="block text-black/40 whitespace-nowrap"><RotatingText /></span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-black/60 mb-8 leading-relaxed max-w-2xl mx-auto">
              40% of incentive spend is wasted. We fix that with data-driven reward optimization.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8 md:gap-12">
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
            <div className="w-full">
              <TrustBar />
            </div>

            <div className="flex items-center justify-center gap-2 text-black/40">
              <span className="font-mono text-xs uppercase tracking-wider">Scroll to explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Features */}
      <GrowthStack />

      {/* Solution Section */}
      <SolutionSection />

      {/* Playbooks Section */}
      <PlaybooksSection />

      {/* Homepage CTA */}
      <HomepageCTA onOpenModal={() => setIsModalOpen(true)} />

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

// =============================================================================
// Solution Section - Extracted for readability
// =============================================================================
function SolutionSection() {
  return (
    <div className="relative z-10 w-full py-20 md:py-32 bg-white border-t border-black/10">
      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>The Solutions</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              Distribution infrastructure
              <br />
              <span className="text-black/40">with intelligence</span>
            </h2>

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
          <SolutionCard
            icon={CircleDot}
            title="Stablecoins"
            subtitle="Ignite Velocity"
            filename="stablecoin.strategy"
            image="/generated/image/mono-3d/sphere-cluster.jpg"
            diagnosis="High Cap / Low Flow"
            fix="Referral & Social Layers"
          />
          <SolutionCard
            icon={CreditCard}
            title="Lending"
            subtitle="Drive Real Yield"
            filename="lending.strategy"
            image="/generated/image/mono-3d/value-stack.jpg"
            diagnosis="High TVL / Low Borrows"
            fix="Looping & Borrowing Rewards"
          />
          <SolutionCard
            icon={TrendingUp}
            title="Perps"
            subtitle="Automate Retention"
            filename="perps.strategy"
            image="/generated/image/mono-3d/node-connections.jpg"
            diagnosis="High Vol / Low Loyalty"
            fix="Trader Progression Systems"
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Solution Card Component
// =============================================================================
interface SolutionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  filename: string;
  image: string;
  diagnosis: string;
  fix: string;
}

function SolutionCard({ icon: Icon, title, subtitle, filename, image, diagnosis, fix }: SolutionCardProps) {
  return (
    <div className="relative rounded-[3px] overflow-hidden group border border-black/10 hover:border-blue/30 transition-all min-h-[780px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <SmartImage src={image} alt={title} fill className="object-cover" />
      </div>

      {/* White gradient overlay */}
      <ImageGradient className="bg-gradient-to-t from-white via-white/85 to-white/60" />
      <ImageGradient className="bg-gradient-to-br from-white/40 via-transparent to-transparent" />

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">{filename}</span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 pt-8">
        <div className="mt-auto">
          <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
            <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
          </div>

          <h3 className="font-display text-base md:text-lg font-medium text-black mb-1 group-hover:text-blue transition-colors">
            {title}
          </h3>
          <p className="text-[10px] font-mono uppercase tracking-wider text-black/50 mb-3">
            {subtitle}
          </p>

          <div className="space-y-2 mb-4">
            <div className="bg-white/60 backdrop-blur-sm p-3 border-l-2 border-black/20 rounded-r-[2px]">
              <span className="text-[9px] font-mono uppercase tracking-wider text-black/40 block mb-0.5">diagnosis</span>
              <p className="text-xs text-black/70">{diagnosis}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-3 border-l-2 border-blue rounded-r-[2px]">
              <span className="text-[9px] font-mono uppercase tracking-wider text-black/40 block mb-0.5">the fix</span>
              <p className="text-xs text-black">{fix}</p>
            </div>
          </div>

          <a href="/playbooks" className="inline-flex items-center text-xs text-blue hover:text-black transition-colors font-medium">
            View Strategy <ArrowUpRight className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Homepage CTA Section
// =============================================================================
interface HomepageCTAProps {
  onOpenModal: () => void;
}

function HomepageCTA({ onOpenModal }: HomepageCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white border-t border-black/10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-xl"
      >
        <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
          <Rocket className="w-3 h-3" />
          Ready to Start?
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          Turn insights into action
          <br />
          <span className="text-black/40">—in minutes</span>
        </h2>
        <p className="text-base text-black/60 mb-6">
          Join 40+ protocols using Torque to optimize their incentive spend and drive sustainable growth.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" onClick={onOpenModal}>
            Get Whitelisted
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="/platform">
            Explore Platform
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroV2;
