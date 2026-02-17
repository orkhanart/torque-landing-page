"use client";

import React, { useState } from "react";
import { ArrowRight, DollarSign, Landmark, TrendingUp } from "lucide-react";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { VelocityFlow } from "@/components/card-visuals/VelocityFlow";
import { LiquidityPool } from "@/components/card-visuals/LiquidityPool";
import { RetentionLoop } from "@/components/card-visuals/RetentionLoop";

type VisualType = "velocity" | "liquidity" | "retention";

interface Solution {
  sector: string;
  title: string;
  diagnosis: string;
  fix: string;
  proof: string;
  icon: React.ReactNode;
  terminalTitle: string;
  visualType: VisualType;
}

const visualComponents: Record<VisualType, React.ComponentType<{ color?: string; paused?: boolean }>> = {
  velocity: VelocityFlow,
  liquidity: LiquidityPool,
  retention: RetentionLoop,
};

const solutions: Solution[] = [
  {
    sector: "Lending",
    title: "Targeted Liquidity Injection",
    diagnosis: "The Utilization Paradox (High TVL / Low Borrowing).",
    fix: "Reward 'First-Time' LPs with duration-weighted bonuses to prime the pump.",
    proof: "Highest Utilization in Sector",
    icon: <Landmark className="w-5 h-5" />,
    terminalTitle: "lending.strategy",
    visualType: "liquidity",
  },
  {
    sector: "Perps",
    title: "Habit Formation Architecture",
    diagnosis: "The 'One-and-Done' Trader (High Churn).",
    fix: "Incentivize 'Streaks' over raw volume to build habitual protocol usage.",
    proof: "3x Increase in Trader Retention",
    icon: <TrendingUp className="w-5 h-5" />,
    terminalTitle: "perps.strategy",
    visualType: "retention",
  },
  {
    sector: "Stablecoins",
    title: "Distribution Nodes",
    diagnosis: "The Velocity Gap ($175M+ Cap / 0 Velocity).",
    fix: "Use referral rebates to turn passive holders into active transaction agents.",
    proof: "+40% Velocity Increase",
    icon: <DollarSign className="w-5 h-5" />,
    terminalTitle: "stablecoin.strategy",
    visualType: "velocity",
  },
];

export default function Solutions() {
  return (
    <section className="w-full py-24 md:py-32 bg-gray-50">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            Sector Solutions
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-[1.1] tracking-tight">
            Engineering Protocol
            <br />
            <span className="text-black/40">Equilibrium</span>
          </h2>
          <p className="text-lg text-black/60 mt-6 max-w-2xl">
            Every sector has a systemic flaw. Torque provides the diagnostics to find the leak and the primitives to fix it.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative rounded-[3px] overflow-hidden border border-black/10 hover:border-blue/30 transition-all min-h-[640px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Procedural visual background - visible on hover */}
      <div className="absolute inset-0 opacity-15 group-hover:opacity-100 transition-opacity duration-500">
        {React.createElement(visualComponents[solution.visualType], { color: "#0000FF", paused: !isHovered })}
      </div>

      {/* White gradient overlay */}
      <ImageGradient className="bg-gradient-to-t from-white via-white/85 to-white/60" />
      <ImageGradient className="bg-gradient-to-br from-white/40 via-transparent to-transparent" />

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">
          {solution.terminalTitle}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 pt-8">
        <div className="mt-auto">
          {/* Icon & Sector */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue/10 transition-colors">
              {solution.icon}
            </div>
            <h3 className="font-display text-lg font-medium text-black group-hover:text-blue transition-colors">
              {solution.sector}
            </h3>
          </div>

          {/* Title */}
          <h4 className="font-mono text-sm uppercase tracking-wider text-black mb-4">
            {solution.title}
          </h4>

          {/* Diagnosis */}
          <div className="mb-3 p-3 bg-white/80 backdrop-blur-sm border border-black/5 rounded-[2px]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-black/40 mb-1">
              Diagnosis
            </p>
            <p className="text-sm text-black/70">{solution.diagnosis}</p>
          </div>

          {/* The Torque Fix */}
          <div className="mb-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-black/40 mb-1">
              The Fix
            </p>
            <p className="text-sm text-black leading-relaxed">
              {solution.fix}
            </p>
          </div>

          {/* Proof */}
          <div className="mb-4 p-3 bg-black text-white rounded-[2px]">
            <p className="font-mono text-xs font-medium">{solution.proof}</p>
          </div>

          {/* CTA */}
          <div className="pt-3 border-t border-black/10">
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black hover:gap-3 transition-all group/link"
            >
              <span>View Strategy</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
