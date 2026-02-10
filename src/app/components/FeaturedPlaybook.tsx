"use client";

import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { GlassCard } from "@/components/ui/glass-card";

export default function FeaturedPlaybook() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-8">
        <span className="text-xs font-mono text-primary uppercase tracking-wider mb-4 block">
          Featured Strategy
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black mb-2">
          The Cross-Protocol Loop
        </h2>
        <p className="text-lg text-black/70">
          Connect liquidity across venues to boost retention.
        </p>
      </div>

      {/* Code Snippet Style Card */}
      <GlassCard
        glow={true}
        scale={false}
        border="cyan"
        padding="none"
        blur={true}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 bg-black rounded-t-xl">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
          <span className="text-xs font-mono text-white/60 ml-2">
            cross-protocol-loop.torque
          </span>
        </div>

        {/* Code Content */}
        <div className="p-6 md:p-8 font-mono text-sm bg-black">
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-white/40 select-none w-4">1</span>
              <div>
                <span className="text-primary">Step 1:</span>
                <span className="text-white ml-2">
                  Connect Drift (Perps) + JupLend (Lending)
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-white/40 select-none w-4">2</span>
              <div>
                <span className="text-primary">Step 2:</span>
                <span className="text-white ml-2">
                  Condition: Borrow &gt; $1000 USDC
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-white/40 select-none w-4">3</span>
              <div>
                <span className="text-primary">Step 3:</span>
                <span className="text-white ml-2">
                  Reward: 2x Points Multiplier on Drift
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <span className="text-primary select-none w-4">→</span>
              <div>
                <span className="text-primary">Outcome:</span>
                <span className="text-primary ml-2 font-semibold">
                  +40% Utilization
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 md:px-8 pb-6 bg-black rounded-b-xl">
          <CustomButton
            buttonSize="big"
            buttonColor="primary"
            href="/playbooks"
            className="w-full shadow-cyan-glow"
          >
            Deploy This Strategy
          </CustomButton>
        </div>
      </GlassCard>
    </section>
  );
}
