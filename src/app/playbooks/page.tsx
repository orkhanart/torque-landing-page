"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SplitText } from "@/components/animations/SplitText";
import { STRATEGIES, type CardType, type StrategyCard } from "./strategies";
import { VisualCard } from "@/components/card-visuals/VisualCard";

const IntegrationRequestModal = dynamic(
  () => import("../components/IntegrationRequestModal"),
  { ssr: false }
);
const RaffleWheel = dynamic(
  () => import("@/components/card-visuals/RaffleWheel").then(mod => ({ default: mod.RaffleWheel })),
  { ssr: false }
);
const ROICascade = dynamic(
  () => import("@/components/card-visuals/ROICascade").then(mod => ({ default: mod.ROICascade })),
  { ssr: false }
);
const ReferralTree = dynamic(
  () => import("@/components/card-visuals/ReferralTree").then(mod => ({ default: mod.ReferralTree })),
  { ssr: false }
);
const StandardsGrid = dynamic(
  () => import("@/components/card-visuals/StandardsGrid").then(mod => ({ default: mod.StandardsGrid })),
  { ssr: false }
);
const LeverageSpiral = dynamic(
  () => import("@/components/card-visuals/LeverageSpiral").then(mod => ({ default: mod.LeverageSpiral })),
  { ssr: false }
);
const TokenPairLink = dynamic(
  () => import("@/components/card-visuals/TokenPairLink").then(mod => ({ default: mod.TokenPairLink })),
  { ssr: false }
);
const DurationLock = dynamic(
  () => import("@/components/card-visuals/DurationLock").then(mod => ({ default: mod.DurationLock })),
  { ssr: false }
);
const AnchorLock = dynamic(
  () => import("@/components/card-visuals/AnchorLock").then(mod => ({ default: mod.AnchorLock })),
  { ssr: false }
);
const WelcomeGate = dynamic(
  () => import("@/components/card-visuals/WelcomeGate").then(mod => ({ default: mod.WelcomeGate })),
  { ssr: false }
);

// =============================================================================
// Filter Types
// =============================================================================
type FilterType = CardType | "ALL";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "RECIPE", label: "Recipes" },
  { value: "FRAMEWORK", label: "Frameworks" },
  { value: "CASE_STUDY", label: "Case Studies" },
];

// =============================================================================
// Playbooks Page
// =============================================================================
export default function PlaybooksPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStrategies =
    activeFilter === "ALL"
      ? STRATEGIES
      : STRATEGIES.filter((strategy) => strategy.type === activeFilter);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-4xl">
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Playbooks
            </div>
            <h1 data-animate="fade-up" className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              Growth Strategy Library
            </h1>
            <p data-animate="fade-up" className="text-base md:text-lg text-black/60 max-w-2xl mb-6">
              Don&apos;t start from scratch. Deploy battle-tested recipes to solve
              specific gaps in Velocity, Retention, and Liquidity.
            </p>

            {/* Filter Buttons */}
            <div data-animate="fade-up" className="flex flex-wrap items-center gap-2">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-3 py-1.5 rounded-[3px] font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
                    activeFilter === option.value
                      ? "bg-blue text-white border border-blue"
                      : "text-black/50 border border-black/10 hover:border-black/20 hover:text-black"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Strategies Grid Section */}
        <section className="w-full py-12 md:py-20 bg-white">
          <div className="w-full px-6 md:px-12 lg:px-20">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <span className="font-mono text-xs uppercase tracking-wider text-black/40">
                {filteredStrategies.length} strategies
              </span>
              <div className="flex items-center gap-2 text-xs text-black/40">
                <span className="w-1.5 h-1.5 bg-blue rounded-full" />
                <span className="font-mono">sorted by impact</span>
              </div>
            </div>

            {/* Strategies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredStrategies.map((strategy) => (
                <StrategyCardComponent key={strategy.id} strategy={strategy} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-white border-t border-black/10">
          <div className="w-full px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Tag */}
              <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
                <Sparkles className="w-3 h-3" />
                <span>Custom Strategies</span>
              </div>

              {/* Heading */}
              <SplitText tag="h2" className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black leading-[1.1] tracking-tight mb-4">
                <span>Have a custom strategy</span>
                <span className="text-black/40">in mind?</span>
              </SplitText>

              {/* Description */}
              <p data-animate="fade-up" className="text-lg text-black/60 mb-8 max-w-xl mx-auto">
                Use our drag-and-drop builder to create any combination of
                Triggers, Conditions, and Rewards.
              </p>

              {/* CTA Buttons */}
              <div data-animate="fade-up" className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="accent"
                  onClick={() => setIsModalOpen(true)}
                  className="group"
                >
                  Open Builder
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button variant="outline" href="https://docs.torque.so">
                  View Documentation
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

// =============================================================================
// Strategy Card Component
// =============================================================================
const strategyVisuals: Record<string, React.ReactElement> = {
  "01": <RaffleWheel color="#0008FF" />,
  "07": <ROICascade color="#0008FF" />,
  "02": <ReferralTree color="#0008FF" />,
  "09": <StandardsGrid color="#0008FF" />,
  "04": <LeverageSpiral color="#0008FF" />,
  "08": <TokenPairLink color="#0008FF" />,
  "03": <DurationLock color="#0008FF" />,
  "05": <AnchorLock color="#0008FF" />,
  "06": <WelcomeGate color="#0008FF" />,
};

const strategySpeeds: Record<string, number> = {
  "02": 4,
  "03": 1.2,
  "05": 1.3,
};

interface StrategyCardComponentProps {
  strategy: StrategyCard;
}

function StrategyCardComponent({ strategy }: StrategyCardComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Icon = strategy.icon;

  const visual = strategyVisuals[strategy.id];
  if (!visual) return null;

  return (
    <>
      <VisualCard
        visual={visual}
        visualSpeed={strategySpeeds[strategy.id] ?? 1}
        filename={`${strategy.type === "CASE_STUDY" ? "case_study" : strategy.type.toLowerCase()}.${strategy.sector.toLowerCase()}`}
        className="aspect-square border-black/5 hover:border-black/15 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        headerRight={
          strategy.difficulty ? (
            <span
              className={`font-mono text-[9px] px-1.5 py-0.5 rounded-[2px] ${
                strategy.difficulty === "Easy"
                  ? "bg-green-500/10 text-green-600"
                  : strategy.difficulty === "Intermediate"
                  ? "bg-yellow-500/10 text-yellow-600"
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              {strategy.difficulty}
            </span>
          ) : undefined
        }
        badge={
          strategy.metricBadge ? (
            <div className="absolute top-8 right-3 z-10">
              <span className="inline-flex items-center px-2 py-1 bg-blue/10 backdrop-blur-sm text-blue text-xs font-medium rounded-[2px] border border-blue/20">
                {strategy.metricBadge}
              </span>
            </div>
          ) : undefined
        }
      >
        {/* Icon */}
        <div className="relative w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
          <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
        </div>

        {/* Title */}
        <h3 className="relative font-display text-base md:text-lg font-medium text-black mb-1 group-hover:text-blue transition-colors">
          {strategy.title}
        </h3>

        {/* Description */}
        <p className="relative text-xs text-black/60 leading-relaxed mb-3">
          {strategy.description}
        </p>

        {/* Formula or Metric */}
        <div className="relative">
        {strategy.formula ? (
          <FormulaBlock formula={strategy.formula} />
        ) : (
          <div className="pt-3 border-t border-black/10">
            <span className="inline-flex items-center text-xs font-medium text-blue">
              Read Case Study
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        )}
        </div>
      </VisualCard>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={{
          type:
            strategy.type === "RECIPE" ? "strategy_deploy" : "general_interest",
          title: strategy.title,
          slug: strategy.slug,
        }}
      />
    </>
  );
}

// =============================================================================
// Formula Block Component
// =============================================================================
interface FormulaBlockProps {
  formula: {
    trigger: string;
    condition: string;
    reward: string;
  };
}

function FormulaBlock({ formula }: FormulaBlockProps) {
  return (
    <div className="space-y-1.5 pt-3 border-t border-black/10">
      <div className="flex items-center gap-2 text-[10px]">
        <span className="font-mono text-black/40 w-14">Trigger</span>
        <span className="text-black/70">{formula.trigger}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        <span className="font-mono text-black/40 w-14">Condition</span>
        <span className="text-black/70">{formula.condition}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        <span className="font-mono text-blue w-14">Reward</span>
        <span className="text-blue">{formula.reward}</span>
      </div>
    </div>
  );
}
