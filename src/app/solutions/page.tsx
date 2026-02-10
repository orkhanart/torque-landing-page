import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import { ArrowRight, TrendingUp, Target, Users, Gem, Sparkles, Terminal, LayoutGrid, FileText, Code } from "lucide-react";

interface Solution {
  id: string;
  sector: string;
  icon: string;
  insight: {
    title: string;
    context: string;
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
  gradient: string;
}

interface AdditionalMarket {
  icon: React.ReactNode;
  headline: string;
  problem: {
    title: string;
    description: string;
  };
  fix: {
    title: string;
    mechanics: string[];
  };
}

const solutions: Solution[] = [
  {
    id: "stablecoins",
    sector: "Stablecoins",
    icon: "💵",
    gradient: "from-blue-500/10 to-transparent",
    insight: {
      title: "Ignite Velocity",
      context: "DIAGNOSIS",
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
      mechanics: [
        "Referral Rebate (0.1% of volume)",
        "Looping Bonus (Leverage > 3x)",
      ],
      result: "🏆 Result: +40% Velocity Increase",
    },
  },
  {
    id: "lending",
    sector: "Lending",
    icon: "🏦",
    gradient: "from-green-500/10 to-transparent",
    insight: {
      title: "Drive Real Yield",
      context: "DIAGNOSIS",
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
      mechanics: [
        "First-Time Deposit Bonus (5-10%)",
        "Duration-Weighted Rewards",
      ],
      result: "🏆 Result: Highest Utilization Rate in Sector (53%)",
    },
  },
  {
    id: "perps",
    sector: "Perps",
    icon: "📈",
    gradient: "from-purple-500/10 to-transparent",
    insight: {
      title: "Automate Retention",
      context: "DIAGNOSIS",
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
      mechanics: [
        "Volume-Based Raffles",
        "Streak Bonuses",
      ],
      result: "🏆 Result: +146% Net Retention",
    },
  },
];

const additionalMarkets: AdditionalMarket[] = [
  {
    icon: <Gem className="w-6 h-6" />,
    headline: "Memecoins & Communities",
    problem: {
      title: "The PvP Rotator Trap",
      description:
        "Users buy, pump, and dump within hours. Liquidity is mercenary, and communities churn faster than they form.",
    },
    fix: {
      title: '"Diamond Hand" Rewards',
      mechanics: [
        "Time-Weighted Incentives: Reward users who hold for 7+ days without selling",
        "Raid-to-Earn: Link on-chain payouts to Social Graph engagement (Twitter/X)",
      ],
    },
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    headline: "Prediction Markets",
    problem: {
      title: "Event-Driven Churn",
      description:
        "Users bet on a single major event (e.g., Election) and then leave the protocol entirely once it settles.",
    },
    fix: {
      title: "Cross-Category Streaks",
      mechanics: [
        "Streak Leaderboards: Require betting on 3 different categories (e.g., Sports + Crypto + Politics) to unlock multipliers",
        "Consolation Rebates: Auto-refund a % of fees to high-volume users who lose, keeping them in the game",
      ],
    },
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    headline: "Terminals & Aggregators",
    problem: {
      title: "Interface Commoditization",
      description:
        "Users switch terminals based on whichever has the lowest fees or fastest execution that second. Zero loyalty.",
    },
    fix: {
      title: "Embedded Loyalty Layer",
      mechanics: [
        "Native XP System: An overlay that rewards cumulative volume routed through your terminal, regardless of the underlying DEX",
        "Fee Rebates: Refund gas costs in your native token to lock users into your execution layer",
      ],
    },
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-normal leading-[1.1] tracking-[-0.02em] text-foreground mb-6 md:mb-8">
              Stop Leaking Revenue.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your metrics are lying to you. High TVL does not mean profit. We diagnosed the specific gaps where stablecoins, lending markets, and DEXs lose real value—and built the primitives to fix them.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {solutions.map((solution) => (
              <a
                key={solution.id}
                href={`#${solution.id}`}
                className="px-4 py-2 rounded-lg bg-card/30 border border-border/20 text-foreground text-sm font-mono hover:bg-card/50 hover:border-primary/30 transition-colors"
              >
                {solution.icon} {solution.sector}
              </a>
            ))}
          </div>
        </section>

        {/* Solutions Sections */}
        {solutions.map((solution, index) => (
          <section
            key={solution.id}
            id={solution.id}
            className={`w-full py-16 md:py-24 ${
              index % 2 === 0 ? "bg-gradient-to-b from-transparent to-card/20" : ""
            }`}
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{solution.icon}</span>
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground">
                    {solution.sector}
                  </h2>
                </div>
              </div>

              {/* Insight Card */}
              <div
                className={`mb-12 p-8 rounded-lg border-2 border-primary/30 bg-gradient-to-br ${solution.gradient}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-sans font-normal text-foreground mb-2">
                      {solution.insight.title}
                    </h3>
                    <p className="text-sm font-mono text-primary uppercase tracking-wide mb-3">
                      {solution.insight.context}
                    </p>
                    <p className="text-lg text-muted-foreground">{solution.insight.stat}</p>
                  </div>
                </div>
              </div>

              {/* Problem & Fix Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Problem */}
                <Card className="p-6 bg-red-500/5 border-2 border-red-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-red-400" />
                    <h4 className="text-xl font-sans font-normal text-foreground">
                      {solution.problem.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {solution.problem.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Fix */}
                <Card className="p-6 bg-green-500/5 border-2 border-green-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-green-400" />
                    <h4 className="text-xl font-sans font-normal text-foreground">
                      The Torque Fix
                    </h4>
                  </div>
                  <p className="text-lg font-semibold text-primary mb-3">
                    {solution.fix.title}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {solution.fix.description}
                  </p>
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-3">
                      Mechanics
                    </p>
                    <ul className="space-y-2 mb-4">
                      {solution.fix.mechanics.map((mechanic, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-green-400 mt-1">✓</span>
                          <span className="text-sm text-foreground">{mechanic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-green-500/20">
                      <p className="text-sm font-semibold text-green-400">{solution.fix.result}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA */}
              <div className="text-center">
                <CustomButton
                  buttonSize="big"
                  buttonColor="primary"
                  href="/playbooks"
                  className="shadow-cyan-glow"
                >
                  View {solution.sector} Playbooks
                </CustomButton>
              </div>
            </div>
          </section>
        ))}

        {/* High-Velocity Markets Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-transparent to-card/20">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
                Also Optimized For
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Torque primitives are sector-agnostic. We support the highest-velocity economies on Solana.
              </p>
            </div>

            {/* Additional Markets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalMarkets.map((market, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    {market.icon}
                    <h3 className="text-xl font-sans font-normal text-foreground">
                      {market.headline}
                    </h3>
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-red-400 uppercase tracking-wide mb-2">
                      The Problem: {market.problem.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {market.problem.description}
                    </p>
                  </div>

                  {/* Fix */}
                  <div>
                    <h4 className="text-sm font-mono text-green-400 uppercase tracking-wide mb-2">
                      The Torque Fix: {market.fix.title}
                    </h4>
                    <ul className="space-y-2">
                      {market.fix.mechanics.map((mechanic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                          <span className="text-sm text-foreground">{mechanic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Agency & Partners Section */}
        <section className="w-full bg-slate-900 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-white mb-4">
                Run Your Growth Practice on Torque.
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Stop managing client incentives in spreadsheets. Join the agencies delivering 240% Average ROI for their protocol clients.
              </p>
            </div>

            {/* Value Prop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Multi-Tenant God View */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <LayoutGrid className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-sans font-normal text-white mb-3">
                  Multi-Tenant "God View"
                </h3>
                <p className="text-sm text-gray-300">
                  Manage 10+ distinct client protocols from a single login. Switch contexts instantly without logging in and out.
                </p>
              </div>

              {/* Whitelabel ROI Reporting */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-sans font-normal text-white mb-3">
                  Whitelabel ROI Reporting
                </h3>
                <p className="text-sm text-gray-300">
                  Auto-generate PDF reports branded with your agency logo. Show clients exactly how much Volume and Retention you generated this week.
                </p>
              </div>

              {/* The Agency API */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-sans font-normal text-white mb-3">
                  The Agency API
                </h3>
                <p className="text-sm text-gray-300">
                  Build your own custom dashboards or trading bots on top of Torque's data layer. You own the strategy; we handle the infrastructure.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CustomButton
                buttonSize="big"
                buttonColor="primary"
                href="https://platform.torque.so/"
                className="shadow-cyan-glow min-w-[200px]"
              >
                Apply for Partner Program
              </CustomButton>
              <a
                href="https://docs.torque.so/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-mono text-sm flex items-center gap-2"
              >
                View Agency Documentation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full bg-gradient-to-b from-card/30 to-transparent py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-sans font-normal text-foreground mb-4">
              Don't see your sector?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our logic engine is permissionless. If it happens on-chain, you can incentivize it.
            </p>
            <CustomButton
              buttonSize="big"
              buttonColor="primary"
              href="https://platform.torque.so/"
              className="shadow-cyan-glow min-w-[200px]"
            >
              Open Logic Builder
            </CustomButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
