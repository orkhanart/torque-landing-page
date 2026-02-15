"use client";

import React from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredPlaybooks } from "@/app/data/playbooks";
import { SmartImage } from "@/components/ascii/SmartImage";
import { ImageGradient } from "@/components/ascii/ImageGradient";

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

        {/* Playbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
  const Icon = playbook.icon;

  return (
    <a
      href="/playbooks"
      className="group relative rounded-[3px] overflow-hidden border border-black/10 hover:border-blue/30 transition-all min-h-[720px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <SmartImage src={playbook.image} alt={playbook.title} fill className="object-cover" />
      </div>

      {/* White gradient overlay */}
      <ImageGradient className="bg-gradient-to-t from-white via-white/85 to-white/60" />
      <ImageGradient className="bg-gradient-to-br from-white/40 via-transparent to-transparent" />

      {/* Card Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">
          {playbook.type === "CASE_STUDY" ? "case_study" : playbook.type.toLowerCase()}.{playbook.sector.toLowerCase()}
        </span>
      </div>

      {/* Card Body */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 pt-8">
        <div className="mt-auto">
          <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
            <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
          </div>

          <h3 className="font-display text-base md:text-lg font-medium text-black mb-1 group-hover:text-blue transition-colors">
            {playbook.title}
          </h3>

          <p className="text-xs text-black/60 leading-relaxed mb-3">
            {playbook.description}
          </p>

          {/* Formula or Metric */}
          {playbook.formula ? (
            <PlaybookFormula formula={playbook.formula} />
          ) : playbook.metricBadge ? (
            <div className="pt-3 border-t border-black/10">
              <span className="inline-flex items-center px-2 py-1 bg-white/80 backdrop-blur-sm text-blue text-xs font-medium rounded-[2px]">
                {playbook.metricBadge}
              </span>
            </div>
          ) : null}
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
