"use client";

import React, { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredPlaybooks, type Playbook } from "@/app/data/playbooks";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { RafflePattern } from "@/components/card-visuals/RafflePattern";
import { NetworkPattern } from "@/components/card-visuals/NetworkPattern";
import { GrowthBars } from "@/components/card-visuals/GrowthBars";

const visualComponents: Record<Playbook["visualType"], React.ComponentType<{ color?: string; paused?: boolean }>> = {
  raffle: RafflePattern,
  network: NetworkPattern,
  growth: GrowthBars,
};

export default function PlaybooksSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <BookOpen className="w-3 h-3" />
              <span>Growth Playbooks</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-[1.1] tracking-tight">
              Battle-tested
              <br />
              <span className="text-black/40">Strategies</span>
            </h2>
            <p className="text-base md:text-lg text-black/60 mt-4 max-w-xl">
              Proven growth frameworks from top DeFi protocols.
            </p>
          </div>
          <Button variant="outline" href="/playbooks" className="w-fit">
            View All Playbooks
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Playbooks Grid — 3 vertical cols at xl, single-col horizontal at 3xl */}
        <div className="grid grid-cols-1 xl:grid-cols-3 3xl:grid-cols-1 gap-4 xl:gap-6">
          {featuredPlaybooks.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Playbook Card Component
// =============================================================================
interface PlaybookCardProps {
  playbook: (typeof featuredPlaybooks)[number];
}

function PlaybookCard({ playbook }: PlaybookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = playbook.icon;

  return (
    <a
      href="/playbooks"
      className="group relative rounded-[3px] overflow-hidden border border-black/10 hover:border-blue/30 transition-all min-h-[580px] sm:min-h-0 xl:min-h-[580px] 3xl:min-h-0 sm:flex sm:flex-row xl:block 3xl:flex 3xl:flex-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Procedural visual background */}
      <div className="absolute inset-0 sm:relative sm:w-2/5 sm:inset-auto xl:absolute xl:inset-0 xl:w-auto 3xl:relative 3xl:w-2/5 3xl:inset-auto opacity-50 group-hover:opacity-100 transition-all duration-500">
        {React.createElement(visualComponents[playbook.visualType], { color: "#0008FF", paused: !isHovered })}
        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
          <span className="font-mono text-[9px] text-black/30">
            {playbook.type === "CASE_STUDY" ? "case_study" : playbook.type.toLowerCase()}.{playbook.sector.toLowerCase()}
          </span>
        </div>
      </div>

      {/* White gradient overlay — visible in vertical layouts, hidden in horizontal */}
      <ImageGradient className="bg-gradient-to-t from-white/70 via-white/40 to-transparent transition-opacity duration-500 group-hover:opacity-0 sm:hidden xl:block 3xl:hidden" />
      <ImageGradient className="bg-gradient-to-br from-white/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0 sm:hidden xl:block 3xl:hidden" />

      {/* White gradient bleed over visual edge — visible in horizontal layouts only */}
      <div className="hidden sm:block xl:hidden 3xl:block absolute top-0 bottom-0 left-[38%] w-24 z-[5] bg-gradient-to-r from-transparent to-white pointer-events-none" />

      {/* Content area */}
      <div className="absolute inset-0 sm:relative sm:w-3/5 sm:inset-auto xl:absolute xl:inset-0 xl:w-auto 3xl:relative 3xl:w-3/5 3xl:inset-auto z-10 flex flex-col p-5 pt-8 sm:p-6 sm:pt-6 xl:p-5 xl:pt-8 3xl:p-8 sm:bg-white xl:bg-transparent 3xl:bg-white">
        <div className="mt-auto sm:mt-0 xl:mt-auto 3xl:mt-0 3xl:my-auto">
          <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
            <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
          </div>

          <h3 className="font-display text-lg md:text-xl font-medium text-black mb-2 group-hover:text-blue transition-colors">
            {playbook.title}
          </h3>

          <p className="text-sm text-black/60 leading-relaxed mb-4">
            {playbook.description}
          </p>

          {/* Formula or Metric */}
          {playbook.formula ? (
            <PlaybookFormula formula={playbook.formula} />
          ) : playbook.metricBadge ? (
            <div className="pt-4 border-t border-black/10">
              <span className="inline-flex items-center px-2.5 py-1.5 bg-white/80 backdrop-blur-sm text-blue text-sm font-medium rounded-[2px]">
                {playbook.metricBadge}
              </span>
            </div>
          ) : null}

          <span className="inline-flex items-center text-xs text-blue hover:text-black transition-colors font-medium mt-4">
            View Strategy <ArrowUpRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

// =============================================================================
// Playbook Formula Component
// =============================================================================
interface PlaybookFormulaProps {
  formula: {
    trigger: string;
    condition: string;
    reward: string;
  };
}

function PlaybookFormula({ formula }: PlaybookFormulaProps) {
  return (
    <div className="space-y-2 pt-4 border-t border-black/10">
      <div className="flex items-center gap-3 text-xs">
        <span className="font-mono text-black/40 w-16">Trigger</span>
        <span className="text-black/70">{formula.trigger}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="font-mono text-black/40 w-16">Condition</span>
        <span className="text-black/70">{formula.condition}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="font-mono text-blue w-16">Reward</span>
        <span className="text-blue">{formula.reward}</span>
      </div>
    </div>
  );
}
