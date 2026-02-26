"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { STRATEGIES, type CardType, type StrategyCard } from "./strategies";
import IntegrationRequestModal from "../components/IntegrationRequestModal";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { RaffleWheel } from "@/components/card-visuals/RaffleWheel";
import { ROICascade } from "@/components/card-visuals/ROICascade";
import { ReferralTree } from "@/components/card-visuals/ReferralTree";
import { StandardsGrid } from "@/components/card-visuals/StandardsGrid";
import { LeverageSpiral } from "@/components/card-visuals/LeverageSpiral";
import { TokenPairLink } from "@/components/card-visuals/TokenPairLink";
import { DurationLock } from "@/components/card-visuals/DurationLock";
import { AnchorLock } from "@/components/card-visuals/AnchorLock";
import { WelcomeGate } from "@/components/card-visuals/WelcomeGate";

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
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Playbooks
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              Growth Strategy Library
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-2xl mb-6">
              Don&apos;t start from scratch. Deploy battle-tested recipes to solve
              specific gaps in Velocity, Retention, and Liquidity.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
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
              <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
                <Sparkles className="w-3 h-3" />
                <span>Custom Strategies</span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black leading-[1.1] tracking-tight mb-4">
                Have a custom strategy
                <br />
                <span className="text-black/40">in mind?</span>
              </h2>

              {/* Description */}
              <p className="text-lg text-black/60 mb-8 max-w-xl mx-auto">
                Use our drag-and-drop builder to create any combination of
                Triggers, Conditions, and Rewards.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
  "01": <RaffleWheel color="#0000FF" />,
  "07": <ROICascade color="#0000FF" />,
  "02": <ReferralTree color="#0000FF" />,
  "09": <StandardsGrid color="#0000FF" />,
  "04": <LeverageSpiral color="#0000FF" />,
  "08": <TokenPairLink color="#0000FF" />,
  "03": <DurationLock color="#0000FF" />,
  "05": <AnchorLock color="#0000FF" />,
  "06": <WelcomeGate color="#0000FF" />,
};

interface StrategyCardComponentProps {
  strategy: StrategyCard;
}

function StrategyCardComponent({ strategy }: StrategyCardComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = strategy.icon;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-all duration-200 min-h-[420px] cursor-pointer"
      >

        {/* Procedural visual background */}
        {strategyVisuals[strategy.id] && (
          <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            {React.cloneElement(strategyVisuals[strategy.id], { paused: !isHovered })}
          </div>
        )}
        <ImageGradient className="bg-gradient-to-t from-white/80 via-white/50 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
        <ImageGradient className="bg-gradient-to-br from-white/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />

        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-1.5 z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span className="font-mono text-[9px] text-black/30">
              {strategy.type === "CASE_STUDY"
                ? "case_study"
                : strategy.type.toLowerCase()}
              .{strategy.sector.toLowerCase()}
            </span>
          </div>
          {strategy.difficulty && (
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
          )}
        </div>

        {/* Metric Badge (Case Studies) */}
        {strategy.metricBadge && (
          <div className="absolute top-8 right-3 z-10">
            <span className="inline-flex items-center px-2 py-1 bg-blue/10 backdrop-blur-sm text-blue text-xs font-medium rounded-[2px] border border-blue/20">
              {strategy.metricBadge}
            </span>
          </div>
        )}

        {/* Card Body */}
        <div className="absolute inset-0 z-10 flex flex-col p-4 pt-10">
          <div className="mt-auto">
            {/* Icon */}
            <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
              <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
            </div>

            {/* Title */}
            <h3 className="font-display text-base md:text-lg font-medium text-black mb-1 group-hover:text-blue transition-colors">
              {strategy.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-black/60 leading-relaxed mb-3">
              {strategy.description}
            </p>

            {/* Formula or Metric */}
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
        </div>
      </div>

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
