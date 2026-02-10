"use client";

import React, { useState, useEffect } from "react";
import { ParticleField, GridBackground, ScanLines, NoiseOverlay } from "@/components/backgrounds";
import { TerminalCard, TypeWriter, GlitchText } from "@/components/terminal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";
import { cn } from "@/lib/utils";

// =============================================================================
// HeroV2 - Immersive terminal-style hero section
// =============================================================================

// Rotating insights data
const INSIGHTS = [
  {
    type: "activation",
    icon: TrendingUp,
    label: "ACTIVATION_OPPORTUNITY",
    title: "Jupiter users showing high activation potential",
    metric: "+23%",
    context: "7d activation rate increase",
  },
  {
    type: "churn",
    icon: AlertTriangle,
    label: "CHURN_RISK_DETECTED",
    title: "Marinade stakers at risk of churning",
    metric: "-18%",
    context: "30d churn prediction",
  },
  {
    type: "waste",
    icon: DollarSign,
    label: "WASTE_RECOVERED",
    title: "Kamino reward efficiency improved",
    metric: "$45K",
    context: "recovered this month",
  },
];

const HeroV2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);

  // Rotate insights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % INSIGHTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <GridBackground
          color="rgba(0,0,0,0.03)"
          lineWidth={1}
          animated={true}
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleField
          particleCount={80}
          color="#000000"
          opacity={0.15}
          speed={0.3}
          connectionDistance={120}
          showConnections={true}
          mouseInteraction={true}
        />
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none">
        <ScanLines opacity={0.02} speed={8} />
      </div>

      <div className="absolute inset-0 z-[3] pointer-events-none">
        <NoiseOverlay opacity={0.015} />
      </div>

      {/* Main Hero Content - Centered */}
      <div className="relative z-10 w-full px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal Tag */}
          <div className="inline-flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <Terminal className="w-3 h-3" />
            <span>Protocol Intelligence Layer</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
          </div>

          {/* Main Headline - 2 Lines */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-medium leading-[1.05] tracking-tight mb-6 text-black">
            <GlitchText intensity="subtle" triggerOnView={true}>
              The Intelligence Layer
            </GlitchText>
            <br />
            <span className="text-black/40">for Token Rewards</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-black/60 mb-10 leading-relaxed max-w-2xl mx-auto">
            40% of incentive spend is wasted.<br className="hidden sm:block" />
            We fix that with data-driven reward optimization.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="group"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              variant="outline"
              href="/playbooks"
            >
              View Playbooks
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-12 md:gap-16">
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-medium text-black">$10M+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/40 mt-1">Distributed</div>
            </div>
            <div className="w-px h-12 bg-black/10" />
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-medium text-black">906K</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/40 mt-1">Wallets</div>
            </div>
            <div className="w-px h-12 bg-black/10" />
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-medium text-black">89M+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/40 mt-1">Transactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Intelligence Section - Below Hero */}
      <div className="relative z-10 w-full px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-black/40">
              Live Intelligence Feed
            </span>
          </div>

          {/* Terminal Card with Insights */}
          <TerminalCard
            title="torque_intelligence.live"
            showDots={true}
            variant="default"
            className="shadow-2xl"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {INSIGHTS.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={insight.type}
                    className={cn(
                      "border p-4 transition-all duration-300 cursor-pointer rounded-[3px]",
                      activeInsight === index
                        ? "border-black bg-black text-white"
                        : "border-black/10 hover:border-black/30"
                    )}
                    onClick={() => setActiveInsight(index)}
                  >
                    {/* Insight Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={cn("w-4 h-4", activeInsight === index ? "text-white" : "text-black")} />
                      <span className={cn(
                        "font-mono text-[10px] uppercase tracking-wider",
                        activeInsight === index ? "text-white/60" : "text-black/40"
                      )}>
                        {insight.label}
                      </span>
                    </div>

                    {/* Metric */}
                    <div className={cn(
                      "font-mono text-3xl font-bold tracking-tight mb-2",
                      activeInsight === index ? "text-white" : "text-black"
                    )}>
                      {insight.metric}
                    </div>

                    {/* Context */}
                    <div className={cn(
                      "font-mono text-xs uppercase tracking-wider",
                      activeInsight === index ? "text-white/60" : "text-black/50"
                    )}>
                      {insight.context}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Stats */}
            <div className="mt-6 pt-6 border-t border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-black/40">Live Analysis</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="font-mono text-xs">
                  <span className="text-black/40">Protocols: </span>
                  <span className="text-black font-medium">47</span>
                </div>
                <div className="font-mono text-xs">
                  <span className="text-black/40">Avg. Retention Lift: </span>
                  <span className="text-black font-medium">+146%</span>
                </div>
              </div>
            </div>
          </TerminalCard>
        </div>
      </div>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default HeroV2;
