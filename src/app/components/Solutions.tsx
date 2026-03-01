"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, CircleDot, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { SplitText } from "@/components/animations/SplitText";

const VelocityFlow = dynamic(
  () => import("@/components/card-visuals/VelocityFlow").then(mod => ({ default: mod.VelocityFlow })),
  { ssr: false }
);
const LiquidityPool = dynamic(
  () => import("@/components/card-visuals/LiquidityPool").then(mod => ({ default: mod.LiquidityPool })),
  { ssr: false }
);
const RetentionLoop = dynamic(
  () => import("@/components/card-visuals/RetentionLoop").then(mod => ({ default: mod.RetentionLoop })),
  { ssr: false }
);

// =============================================================================
// Solution Card Component
// =============================================================================
interface SolutionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  filename: string;
  visual: React.ComponentType<{ color?: string; paused?: boolean }>;
  diagnosis: string;
  fix: string;
}

function SolutionCard({ icon: Icon, title, subtitle, filename, visual: Visual, diagnosis, fix }: SolutionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-[3px] overflow-hidden group border border-black/10 hover:border-blue/30 transition-all min-h-[660px] sm:min-h-0 xl:min-h-[660px] sm:flex sm:flex-row-reverse xl:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Procedural visual background */}
      <div className="absolute inset-0 sm:relative sm:w-2/5 sm:inset-auto sm:scale-y-[0.6] sm:origin-center xl:scale-y-100 xl:absolute xl:inset-0 xl:w-auto opacity-50 group-hover:opacity-100 transition-all duration-500">
        <Visual color="#0008FF" paused={!isHovered} />
        {/* Terminal Header — scoped to visual area */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
          <span className="font-mono text-[9px] text-black/30">{filename}</span>
        </div>
      </div>

      {/* White gradient overlay - fades out on hover to reveal visual */}
      <ImageGradient className="bg-gradient-to-t from-white/70 via-white/40 to-transparent transition-opacity duration-500 group-hover:opacity-0 sm:hidden xl:block" />
      <ImageGradient className="bg-gradient-to-br from-white/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0 sm:hidden xl:block" />

      {/* Content */}
      <div className="absolute inset-0 sm:relative sm:w-3/5 sm:inset-auto xl:absolute xl:inset-0 xl:w-auto z-10 flex flex-col p-4 pt-8 sm:p-5 sm:pt-5 xl:p-4 xl:pt-8">
        <div className="mt-auto sm:mt-0 xl:mt-auto">
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
// Solutions Section
// =============================================================================
export default function Solutions() {
  return (
    <div className="relative z-10 w-full py-20 md:py-32 bg-white border-t border-black/10">
      <div className="relative w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>The Solutions</span>
            </div>

            <SplitText tag="h2" className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              <span>Engineering Protocol</span>
              <span className="text-black/40">Equilibrium</span>
            </SplitText>

            <p data-animate="fade-up" className="text-lg md:text-xl text-black/60 max-w-2xl">
              Every sector has a systemic flaw. Torque provides the diagnostics to find the leak and the primitives to fix it.
            </p>
          </div>
          <div data-animate="fade-up">
            <Button variant="outline" href="/solutions" className="w-fit">
              View Solutions
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Solution Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div data-animate="fade-up">
            <SolutionCard
              icon={CreditCard}
              title="Lending"
              subtitle="Targeted Liquidity Injection"
              filename="lending.strategy"
              visual={LiquidityPool}
              diagnosis="The Utilization Paradox (High TVL / Low Borrowing)"
              fix="Reward 'First-Time' LPs with duration-weighted bonuses to prime the pump."
            />
          </div>
          <div data-animate="fade-up">
            <SolutionCard
              icon={TrendingUp}
              title="Perps"
              subtitle="Habit Formation Architecture"
              filename="perps.strategy"
              visual={RetentionLoop}
              diagnosis="The 'One-and-Done' Trader (High Churn)"
              fix="Incentivize 'Streaks' over raw volume to build habitual protocol usage."
            />
          </div>
          <div data-animate="fade-up">
            <SolutionCard
              icon={CircleDot}
              title="Stablecoins"
              subtitle="Distribution Nodes"
              filename="stablecoin.strategy"
              visual={VelocityFlow}
              diagnosis="The Velocity Gap ($175M+ Cap / 0 Velocity)"
              fix="Use referral rebates to turn passive holders into active transaction agents."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
