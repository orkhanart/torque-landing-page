"use client";

import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IntegrationRequestModal from "../components/IntegrationRequestModal";
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
import { motion, useInView } from "framer-motion";

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
    id: "stablecoins",
    sector: "Stablecoins",
    icon: CircleDot,
    filename: "stablecoin.strategy",
    image: "/generated/image/light-mono/floating-mass-01.jpg",
    insight: {
      title: "Ignite Velocity",
      stat: "Market Cap ($175M) but no Velocity.",
    },
    problem: {
      title: "The Distribution Gap",
      points: [
        "Stablecoins sit idle in wallets instead of circulating",
        "High market cap creates false sense of adoption",
        "No incentive for holders to actually use the asset",
      ],
    },
    fix: {
      title: "Turn holders into distribution nodes.",
      description:
        "We deployed a native referral layer that rewarded users for transaction volume, not just holding.",
      mechanics: ["Referral Rebate (0.1% of volume)", "Looping Bonus (Leverage > 3x)"],
      result: "+40% Velocity Increase",
    },
  },
  {
    id: "lending",
    sector: "Lending",
    icon: CreditCard,
    filename: "lending.strategy",
    image: "/generated/image/light-mono/value-stack-light.jpg",
    insight: {
      title: "Drive Real Yield",
      stat: "No liquidity = no product (Cold Start).",
    },
    problem: {
      title: "The Utilization Problem",
      points: [
        "Massive deposits sitting idle earning minimal yield",
        "Borrowing is under-incentivized compared to lending",
        "Capital efficiency is broken—TVL doesn't equal usage",
      ],
    },
    fix: {
      title: "Target 'First-Time' LPs.",
      description:
        "Instead of universal APY, we targeted new LPs with a one-time bonus, filtering out wash traders by requiring a 48-hour hold.",
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
      title: "Automate Retention",
      stat: "The 'One-and-Done' Trader.",
    },
    problem: {
      title: "The Wash Trading Problem",
      points: [
        "High volume metrics hide mercenary trading behavior",
        "Users trade once for rewards, then disappear",
        "Volume quality is ignored in favor of raw numbers",
      ],
    },
    fix: {
      title: "Gamify Habit Formation.",
      description:
        "We shifted incentives from raw volume to 'Streaks.' Repeat winners drove 75% of total volume while consuming only 54% of the budget.",
      mechanics: ["Volume-Based Raffles", "Streak Bonuses"],
      result: "+146% Net Retention",
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

      <main className="min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Solutions
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              Stop Leaking Revenue
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-2xl mb-6">
              High TVL does not mean profit. We diagnosed the specific gaps where stablecoins,
              lending markets, and DEXs lose real value—and built the primitives to fix them.
            </p>

            {/* Quick Nav */}
            <div className="flex flex-wrap items-center gap-2">
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
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>Core Solutions</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              Battle-tested fixes
              <br />
              <span className="text-black/40">for broken incentives</span>
            </h2>

            <p className="text-lg md:text-xl text-black/60 max-w-2xl">
              Each solution comes with diagnosis, mechanics, and proven results.
            </p>
          </div>
          <Button variant="outline" href="/playbooks" className="w-fit">
            View Playbooks
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
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
interface SolutionCardProps {
  solution: Solution;
}

function SolutionCard({ solution }: SolutionCardProps) {
  const Icon = solution.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id={solution.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors"
    >

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-4 py-2 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">{solution.filename}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 pt-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-[3px] bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-black" />
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

        {/* Insight */}
        <div className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-[3px] border-l-2 border-blue">
          <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-1">
            diagnosis
          </span>
          <p className="text-base text-black">{solution.insight.stat}</p>
        </div>

        {/* Problem & Fix Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="p-5 bg-white/60 backdrop-blur-sm rounded-[3px] border border-black/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-black/50 mb-3">
              The Problem
            </h4>
            <h5 className="text-base font-display font-medium text-black mb-3">
              {solution.problem.title}
            </h5>
            <ul className="space-y-2">
              {solution.problem.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-black/60">
                  <span className="w-1 h-1 bg-black/30 rounded-full mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Fix */}
          <div className="p-5 bg-white/60 backdrop-blur-sm rounded-[3px] border border-blue/30">
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue mb-3">
              The Torque Fix
            </h4>
            <h5 className="text-base font-display font-medium text-black mb-2">
              {solution.fix.title}
            </h5>
            <p className="text-sm text-black/60 mb-4">{solution.fix.description}</p>

            {/* Mechanics */}
            <div className="pt-4 border-t border-black/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-black/40 block mb-2">
                Mechanics
              </span>
              <ul className="space-y-1.5 mb-4">
                {solution.fix.mechanics.map((mechanic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black">
                    <span className="text-blue mt-0.5">+</span>
                    {mechanic}
                  </li>
                ))}
              </ul>

              {/* Result */}
              <div className="pt-3 border-t border-blue/20">
                <span className="inline-flex items-center px-3 py-1.5 bg-blue/10 text-blue text-sm font-medium rounded-[3px]">
                  {solution.fix.result}
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
          <span className="text-sm text-black/40">
            See how we implemented this for {solution.sector.toLowerCase()} protocols
          </span>
          <Button variant="outline" size="sm" href="/playbooks">
            View Playbook
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
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
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              <span>More Sectors</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black mb-6 max-w-4xl leading-[1.1] tracking-tight">
              Also optimized
              <br />
              <span className="text-black/40">for high-velocity markets</span>
            </h2>

            <p className="text-lg md:text-xl text-black/60 max-w-2xl">
              Torque primitives are sector-agnostic. We support the highest-velocity economies on
              Solana.
            </p>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
interface MarketCardProps {
  market: AdditionalMarket;
  index: number;
}

function MarketCard({ market, index }: MarketCardProps) {
  const Icon = market.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors min-h-[720px]"
    >

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">{market.filename}</span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 pt-8">
        <div className="mt-auto">
          {/* Icon */}
          <div className="w-10 h-10 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
            <Icon className="w-5 h-5 text-black group-hover:text-blue transition-colors" />
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-medium text-black mb-4 group-hover:text-blue transition-colors">
            {market.headline}
          </h3>

          {/* Problem */}
          <div className="mb-4 p-3 bg-white/60 backdrop-blur-sm rounded-[3px] border-l-2 border-black/20">
            <span className="text-[9px] font-mono uppercase tracking-wider text-black/40 block mb-1">
              The Problem: {market.problem.title}
            </span>
            <p className="text-xs text-black/70 leading-relaxed">{market.problem.description}</p>
          </div>

          {/* Fix */}
          <div className="p-3 bg-white/60 backdrop-blur-sm rounded-[3px] border-l-2 border-blue">
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
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// Solutions CTA Section
// =============================================================================
interface SolutionsCTAProps {
  onOpenModal: () => void;
}

function SolutionsCTA({ onOpenModal }: SolutionsCTAProps) {
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
          Deploy Now
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          Ready to fix your growth?
          <br />
          <span className="text-black/40">Let's diagnose together</span>
        </h2>
        <p className="text-base text-black/60 mb-6">
          We've built solutions for stablecoins, lending, perps, and beyond. Tell us your challenge—we'll map the fix.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" onClick={onOpenModal}>
            Get Started
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="/playbooks">
            View Playbooks
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

