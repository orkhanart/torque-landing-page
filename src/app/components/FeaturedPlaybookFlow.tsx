"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/terminal";
import { ArrowRight, Plus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeaturedPlaybookFlow() {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Header */}
        <div className="mb-16 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            AI-Powered Strategy
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-[1.1] tracking-tight mb-4">
            The Cross-Protocol
            <br />
            <span className="text-black/40">Loop</span>
          </h2>
          <p className="text-lg text-black/60">
            Torque Intelligence recommendation for Lending Protocols.
          </p>
        </div>

        {/* Horizontal Flow Component */}
        <div className="relative overflow-x-auto pb-8">
          <div className="flex items-center justify-center gap-4 md:gap-6 min-w-max mx-auto px-4">
            {/* Step 1: Drift */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 md:w-24 md:h-24 border border-black flex items-center justify-center bg-white rounded-[3px]">
                <span className="font-mono text-xs uppercase tracking-wider">Drift</span>
              </div>
              <span className="font-mono text-xs text-black/40">Source</span>
            </div>

            {/* Plus Icon */}
            <div className="flex items-center">
              <Plus className="w-5 h-5 text-black/30" />
            </div>

            {/* Step 2: Jupiter */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 md:w-24 md:h-24 border border-black flex items-center justify-center bg-white rounded-[3px]">
                <span className="font-mono text-xs uppercase tracking-wider">Jupiter</span>
              </div>
              <span className="font-mono text-xs text-black/40">Partner</span>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <ArrowRight className="w-6 h-6 text-black/30" />
            </div>

            {/* Step 3: Condition */}
            <div className="flex flex-col items-center gap-3">
              <div className="border border-black p-4 min-w-[100px] bg-white rounded-[3px]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/40 mb-1">Condition</div>
                <div className="font-mono text-sm text-black">&gt; $1k Borrow</div>
              </div>
              <span className="font-mono text-xs text-black/40">Rule</span>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <ArrowRight className="w-6 h-6 text-black/30" />
            </div>

            {/* Step 4: Reward */}
            <div className="flex flex-col items-center gap-3">
              <div className="border border-black p-4 min-w-[100px] bg-black text-white rounded-[3px]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1">Reward</div>
                <div className="font-mono text-sm text-white">2x Points</div>
              </div>
              <span className="font-mono text-xs text-black/40">Output</span>
            </div>
          </div>
        </div>

        {/* Outcome Banner */}
        <div className="mt-12 max-w-xl mx-auto">
          <TerminalCard
            title="expected_outcome"
            showDots={true}
            variant="default"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-black/40">
                Utilization Lift
              </span>
              <span className="font-mono text-3xl font-bold text-black">+40%</span>
            </div>
          </TerminalCard>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button href="/playbooks" className="group">
            Auto-Deploy Strategy
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
