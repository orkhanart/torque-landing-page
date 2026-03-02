"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CircleDot,
  CreditCard,
  TrendingUp,
  Gem,
  Sparkles,
  Terminal,
  Rocket,
} from "lucide-react";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { CardVisualWrapper } from "@/components/card-visuals/CardVisualWrapper";
import { VisualCard } from "@/components/card-visuals/VisualCard";
import { SplitText } from "@/components/animations/SplitText";

const IntegrationRequestModal = dynamic(
  () => import("../components/IntegrationRequestModal"),
  { ssr: false }
);
const UtilizationMeter = dynamic(
  () => import("@/components/card-visuals/UtilizationMeter").then(mod => ({ default: mod.UtilizationMeter })),
  { ssr: false }
);
const StreakChain = dynamic(
  () => import("@/components/card-visuals/StreakChain").then(mod => ({ default: mod.StreakChain })),
  { ssr: false }
);
const DistributionWeb = dynamic(
  () => import("@/components/card-visuals/DistributionWeb").then(mod => ({ default: mod.DistributionWeb })),
  { ssr: false }
);
const DiamondHold = dynamic(
  () => import("@/components/card-visuals/DiamondHold").then(mod => ({ default: mod.DiamondHold })),
  { ssr: false }
);
const OddsMatrix = dynamic(
  () => import("@/components/card-visuals/OddsMatrix").then(mod => ({ default: mod.OddsMatrix })),
  { ssr: false }
);
const LoyaltyLayers = dynamic(
  () => import("@/components/card-visuals/LoyaltyLayers").then(mod => ({ default: mod.LoyaltyLayers })),
  { ssr: false }
);

// =============================================================================
// Types
// =============================================================================
interface Solution {
  id: string;
  sector: string;
  icon: React.ComponentType<{ className?: string }>;
  filename: string;
  image: string;
  insight: {
    title: string;
    stat: string;
  };
  problem: {
    title: string;
    points: string[];
  };
  fix: {
    title: string;
    description: string;
    mechanics: string[];
    result: string;
  };
}

interface AdditionalMarket {
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  filename: string;
  image: string;
  problem: {
    title: string;
    description: string;
  };
  fix: {
    title: string;
    mechanics: string[];
  };
}

// =============================================================================
// Data
// =============================================================================
const solutions: Solution[] = [
  {
    id: "lending",
    sector: "Lending",
    icon: CreditCard,
    filename: "lending.strategy",
    image: "/generated/image/light-mono/value-stack-light.jpg",
    insight: {
      title: "Targeted Liquidity Injection",
      stat: "The Utilization Paradox (High TVL / Low Borrowing).",
    },
    problem: {
      title: "The Utilization Paradox",
      points: [
        "Massive deposits sitting idle earning minimal yield",
        "Borrowing is under-incentivized compared to lending",
        "Capital efficiency is broken—TVL doesn't equal usage",
      ],
    },
    fix: {
      title: "Reward 'First-Time' LPs with duration-weighted bonuses.",
      description:
        "Targeted Liquidity Injection: instead of universal APY, we targeted new LPs with duration-weighted bonuses to prime the pump.",
      mechanics: ["First-Time Deposit Bonus (5-10%)", "Duration-Weighted Rewards"],
      result: "Highest Utilization Rate (53%)",
    },
  },
  {
    id: "perps",
    sector: "Perps",
    icon: TrendingUp,
    filename: "perps.strategy",
    image: "/generated/image/light-mono/network-nodes-light.jpg",
    insight: {
      title: "Habit Formation Architecture",
      stat: "The 'One-and-Done' Trader (High Churn).",
    },
    problem: {
      title: "The One-and-Done Trader",
      points: [
        "High volume metrics hide mercenary trading behavior",
        "Users trade once for rewards, then disappear",
        "Volume quality is ignored in favor of raw numbers",
      ],
    },
    fix: {
      title: "Incentivize 'Streaks' over raw volume.",
      description:
        "Habit Formation Architecture: we shifted incentives from raw volume to 'Streaks' to build habitual protocol usage.",
      mechanics: ["Volume-Based Raffles", "Streak Bonuses"],
      result: "+146% Net Retention",
    },
  },
  {
    id: "stablecoins",
    sector: "Stablecoins",
    icon: CircleDot,
    filename: "stablecoin.strategy",
    image: "/generated/image/light-mono/floating-mass-01.jpg",
    insight: {
      title: "Distribution Nodes",
      stat: "The Velocity Gap ($175M+ Cap / 0 Velocity).",
    },
    problem: {
      title: "The Velocity Gap",
      points: [
        "Stablecoins sit idle in wallets instead of circulating",
        "High market cap creates false sense of adoption",
        "No incentive for holders to actually use the asset",
      ],
    },
    fix: {
      title: "Turn passive holders into active transaction agents.",
      description:
        "Distribution Nodes: use referral rebates to turn passive holders into active transaction agents.",
      mechanics: ["Referral Rebate (0.1% of volume)", "Looping Bonus (Leverage > 3x)"],
      result: "+40% Velocity Increase",
    },
  },
];

const additionalMarkets: AdditionalMarket[] = [
  {
    icon: Gem,
    headline: "Memecoins & Communities",
    filename: "memecoin.strategy",
    image: "/generated/image/light-mono/data-particles.jpg",
    problem: {
      title: "The PvP Rotator Trap",
      description:
        "Users buy, pump, and dump within hours. Liquidity is mercenary, and communities churn faster than they form.",
    },
    fix: {
      title: '"Diamond Hand" Rewards',
      mechanics: [
        "Time-Weighted Incentives: Reward users who hold for 7+ days",
        "Raid-to-Earn: Link on-chain payouts to Social Graph engagement",
      ],
    },
  },
  {
    icon: Sparkles,
    headline: "Prediction Markets",
    filename: "prediction.strategy",
    image: "/generated/image/light-mono/network-pulse-light.jpg",
    problem: {
      title: "Event-Driven Churn",
      description:
        "Users bet on a single major event and then leave the protocol entirely once it settles.",
    },
    fix: {
      title: "Cross-Category Streaks",
      mechanics: [
        "Streak Leaderboards: Require betting on 3 different categories to unlock multipliers",
        "Consolation Rebates: Auto-refund a % of fees to high-volume users who lose",
      ],
    },
  },
  {
    icon: Terminal,
    headline: "Terminals & Aggregators",
    filename: "terminal.strategy",
    image: "/generated/image/light-mono/blocks-chain-light.jpg",
    problem: {
      title: "Interface Commoditization",
      description:
        "Users switch terminals based on whichever has the lowest fees or fastest execution. Zero loyalty.",
    },
    fix: {
      title: "Embedded Loyalty Layer",
      mechanics: [
        "Native XP System: Rewards cumulative volume routed through your terminal",
        "Fee Rebates: Refund gas costs in your native token",
      ],
    },
  },
];

// =============================================================================
// Solutions Page
// =============================================================================
export default function SolutionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main className="relative z-10 min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-4xl">
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Solutions
            </div>
            <h1 data-animate="fade-up" className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              Engineering Protocol Equilibrium
            </h1>
            <p data-animate="fade-up" className="text-base md:text-lg text-black/60 max-w-2xl mb-6">
              Every sector has a systemic flaw. Torque provides the diagnostics to find the leak and the primitives to fix it.
            </p>

            {/* Quick Nav */}
            <div data-animate="fade-up" className="flex flex-wrap items-center gap-2">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <a
                    key={solution.id}
                    href={`#${solution.id}`}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] border border-black/10 hover:border-black/20 transition-colors font-mono text-[10px] uppercase tracking-wider text-black/50 hover:text-black"
                  >
                    <Icon className="w-3 h-3 group-hover:text-blue transition-colors" />
                    {solution.sector}
                  </a>
                );
              })}
            </div>
          </div>
        </header>

        {/* Solutions Section */}
        <SolutionsGrid />

        {/* Additional Markets */}
        <AdditionalMarketsSection />

        {/* CTA Section */}
        <SolutionsCTA onOpenModal={() => setIsModalOpen(true)} />
      </main>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="h-screen" />
      <Footer />
    </>
  );
}

// =============================================================================
// Solutions Grid
// =============================================================================
function SolutionsGrid() {
  return (
    <section className="w-full bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>Core Solutions</span>
            </div>

            <SplitText tag="h2" className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              <span>Battle-tested mechanical</span>
              <span className="text-black/40">modules</span>
            </SplitText>

            <p data-animate="fade-up" className="text-lg md:text-xl text-black/60 max-w-2xl">
              Each solution comes with diagnosis, mechanical logic, and proven results.
            </p>
          </div>
          <div data-animate="fade-up">
            <Button variant="outline" href="/primitives" className="w-fit">
              Explore Primitives
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Solutions */}
        <div className="space-y-8">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Solution Card
// =============================================================================
const solutionVisuals: Record<string, React.ReactElement> = {
  lending: <UtilizationMeter color="#0008FF" />,
  perps: <StreakChain color="#0008FF" />,
  stablecoins: <DistributionWeb color="#0008FF" />,
};

interface SolutionCardProps {
  solution: Solution;
}

function SolutionCard({ solution }: SolutionCardProps) {
  const Icon = solution.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={solution.id}
      data-animate="fade-up"
      className="group rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Content stacked */}
        <div className="flex-1 p-6 md:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-[3px] bg-white border border-black/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue/5 transition-colors">
              <Icon className="w-6 h-6 text-black group-hover:text-blue transition-colors" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-black mb-1">
                {solution.sector}
              </h3>
              <p className="text-sm font-mono uppercase tracking-wider text-black/50">
                {solution.insight.title}
              </p>
            </div>
          </div>

          {/* Stacked sub-cards */}
          <div className="space-y-3 flex-1">
            {/* Diagnosis */}
            <div className="p-4 bg-black/[0.02] rounded-[3px] border-l-2 border-blue">
              <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">
                diagnosis
              </span>
              <p className="text-base text-black">{solution.insight.stat}</p>
            </div>

            {/* Problem */}
            <div className="p-4 bg-black/[0.02] rounded-[3px] border border-black/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-black/50 mb-2">
                The Problem
              </h4>
              <h5 className="text-sm font-display font-medium text-black mb-2">
                {solution.problem.title}
              </h5>
              <ul className="space-y-1.5">
                {solution.problem.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                    <span className="w-1 h-1 bg-black/30 rounded-full mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fix */}
            <div className="p-4 bg-black/[0.02] rounded-[3px] border border-blue/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue mb-2">
                The Torque Fix
              </h4>
              <h5 className="text-sm font-display font-medium text-black mb-1">
                {solution.fix.title}
              </h5>
              <p className="text-sm text-black/60 mb-3">{solution.fix.description}</p>

              {/* Mechanics */}
              <div className="pt-3 border-t border-black/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1.5">
                  Mechanics
                </span>
                <ul className="space-y-1 mb-3">
                  {solution.fix.mechanics.map((mechanic, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-black">
                      <span className="text-blue mt-0.5">+</span>
                      {mechanic}
                    </li>
                  ))}
                </ul>

                {/* Result */}
                <span className="inline-flex items-center px-3 py-1.5 bg-blue/10 text-blue text-sm font-medium rounded-[3px]">
                  {solution.fix.result}
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-5 border-t border-black/10 flex items-center justify-between">
            <span className="text-sm text-black/40">
              See how we implemented this for {solution.sector.toLowerCase()} protocols
            </span>
            <Button variant="outline" size="sm" href="/playbooks">
              View Playbook
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right: Animation */}
        <div className="relative w-full md:w-[45%] lg:w-[50%] min-h-[300px] md:min-h-0 flex-shrink-0">
          {/* Procedural visual */}
          {solutionVisuals[solution.id] && (
            <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <CardVisualWrapper color="#0008FF" className="relative w-full h-full">
                {solutionVisuals[solution.id]}
              </CardVisualWrapper>
            </div>
          )}
          <ImageGradient className="bg-gradient-to-r from-white via-white/40 to-transparent transition-opacity duration-500 group-hover:opacity-0 hidden md:block" />
          <ImageGradient className="bg-gradient-to-t from-white/60 via-white/30 to-transparent transition-opacity duration-500 group-hover:opacity-0 md:hidden" />

          {/* Terminal Header */}
          <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-4 py-2 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span className="font-mono text-[9px] text-black/30">{solution.filename}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Additional Markets Section
// =============================================================================
function AdditionalMarketsSection() {
  return (
    <section className="w-full bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>More Sectors</span>
            </div>

            <SplitText tag="h2" className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              <span>Also optimized</span>
              <span className="text-black/40">for high-velocity markets</span>
            </SplitText>

            <p data-animate="fade-up" className="text-lg md:text-xl text-black/60 max-w-2xl">
              Torque primitives are sector-agnostic. We support the highest-velocity economies on
              Solana.
            </p>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {additionalMarkets.map((market, index) => (
            <MarketCard key={index} market={market} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Market Card
// =============================================================================
const marketVisuals = [
  <DiamondHold key="diamond" color="#0008FF" />,
  <OddsMatrix key="odds" color="#0008FF" />,
  <LoyaltyLayers key="loyalty" color="#0008FF" />,
];

interface MarketCardProps {
  market: AdditionalMarket;
  index: number;
}

function MarketCard({ market, index }: MarketCardProps) {
  const Icon = market.icon;
  return (
    <div data-animate="fade-up">
      <VisualCard
        visual={marketVisuals[index]}
        filename={market.filename}
        layout="adaptive"
        visualFill="full"
        className="border-black/5 hover:border-black/15"
      >
        {/* Icon */}
        <div className="relative w-10 h-10 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
          <Icon className="w-5 h-5 text-black group-hover:text-blue transition-colors" />
        </div>

        {/* Title */}
        <h3 className="relative font-display text-lg font-medium text-black mb-4 group-hover:text-blue transition-colors">
          {market.headline}
        </h3>

        {/* Problem */}
        <div className="relative mb-4 p-3 bg-white/60 backdrop-blur-sm rounded-[3px] border-l-2 border-black/20">
          <span className="text-[9px] font-mono uppercase tracking-wider text-black/40 block mb-1">
            The Problem: {market.problem.title}
          </span>
          <p className="text-xs text-black/70 leading-relaxed">{market.problem.description}</p>
        </div>

        {/* Fix */}
        <div className="relative p-3 bg-white/60 backdrop-blur-sm rounded-[3px] border-l-2 border-blue">
          <span className="text-[9px] font-mono uppercase tracking-wider text-blue block mb-1">
            The Fix: {market.fix.title}
          </span>
          <ul className="space-y-1">
            {market.fix.mechanics.map((mechanic, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-black/80">
                <span className="text-blue mt-0.5">+</span>
                {mechanic}
              </li>
            ))}
          </ul>
        </div>
      </VisualCard>
    </div>
  );
}

// =============================================================================
// Solutions CTA Section
// =============================================================================
interface SolutionsCTAProps {
  onOpenModal: () => void;
}

function SolutionsCTA({ onOpenModal }: SolutionsCTAProps) {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white border-t border-black/10">
      <div className="max-w-xl mx-auto text-center">
        <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
          <Rocket className="w-3 h-3" />
          Deploy Now
        </div>
        <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          <span>Ready to engineer</span>
          <span className="text-black/40">protocol equilibrium?</span>
        </SplitText>
        <p data-animate="fade-up" className="text-base text-black/60 mb-6">
          Torque exists to replace &ldquo;vibes-based&rdquo; marketing with deterministic, programmable ROI. No waste. Just growth.
        </p>
        <div data-animate="fade-up" className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" onClick={onOpenModal}>
            Deploy Logic
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="/primitives">
            Explore Primitives
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
