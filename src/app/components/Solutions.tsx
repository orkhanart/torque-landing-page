"use client";

import React from "react";
import { ArrowUpRight, CircleDot, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisualCard } from "@/components/card-visuals/VisualCard";
import { VelocityFlow } from "@/components/card-visuals/VelocityFlow";
import { LiquidityPool } from "@/components/card-visuals/LiquidityPool";
import { RetentionLoop } from "@/components/card-visuals/RetentionLoop";

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
  return (
    <VisualCard
      visual={<Visual />}
      filename={filename}
      layout="adaptive"
    >
      <div className="relative w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
        <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
      </div>

      <h3 className="relative font-display text-base md:text-lg font-medium text-black mb-1 group-hover:text-blue transition-colors">
        {title}
      </h3>
      <p className="relative text-[10px] font-mono uppercase tracking-wider text-black/50 mb-3">
        {subtitle}
      </p>

      <div className="relative space-y-2 mb-4">
        <div className="p-3 border-l-2 border-black/20 rounded-r-[2px]">
          <span className="text-[9px] font-mono uppercase tracking-wider text-black/40 block mb-0.5">diagnosis</span>
          <p className="text-xs text-black/70">{diagnosis}</p>
        </div>
        <div className="p-3 border-l-2 border-blue rounded-r-[2px]">
          <span className="text-[9px] font-mono uppercase tracking-wider text-black/40 block mb-0.5">the fix</span>
          <p className="text-xs text-black">{fix}</p>
        </div>
      </div>

      <a href="/playbooks" className="relative inline-flex items-center text-xs text-blue hover:text-black transition-colors font-medium">
        View Strategy <ArrowUpRight className="w-3 h-3 ml-1" />
      </a>
    </VisualCard>
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
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>The Solutions</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              Engineering Protocol
              <br />
              <span className="text-black/40">Equilibrium</span>
            </h2>

            <p className="text-lg md:text-xl text-black/60 max-w-2xl">
              Every sector has a systemic flaw. Torque provides the diagnostics to find the leak and the primitives to fix it.
            </p>
          </div>
          <Button variant="outline" href="/solutions" className="w-fit">
            View Solutions
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Solution Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <SolutionCard
            icon={CreditCard}
            title="Lending"
            subtitle="Targeted Liquidity Injection"
            filename="lending.strategy"
            visual={LiquidityPool}
            diagnosis="The Utilization Paradox (High TVL / Low Borrowing)"
            fix="Reward 'First-Time' LPs with duration-weighted bonuses to prime the pump."
          />
          <SolutionCard
            icon={TrendingUp}
            title="Perps"
            subtitle="Habit Formation Architecture"
            filename="perps.strategy"
            visual={RetentionLoop}
            diagnosis="The 'One-and-Done' Trader (High Churn)"
            fix="Incentivize 'Streaks' over raw volume to build habitual protocol usage."
          />
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
  );
}
