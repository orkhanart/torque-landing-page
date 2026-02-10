"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TerminalCard } from "@/components/terminal";
import { cn } from "@/lib/utils";
import { Code, Trophy, Brain } from "lucide-react";

interface FeatureTab {
  id: number;
  icon: React.ReactNode;
  headline: string;
  subtext: string;
  visualAsset: string;
  imageAlt: string;
  terminalTitle: string;
}

const features: FeatureTab[] = [
  {
    id: 1,
    icon: <Code className="w-5 h-5" />,
    headline: "Programmable Rewards",
    subtext: "Set conditions like \"only reward users who hold >$1K and traded 3+ times this week.\" No more paying for bots or one-time farmers.",
    visualAsset: "/screenshots/create-incentive.png",
    imageAlt: "Create Incentive UI showing conditional logic",
    terminalTitle: "rewards.config",
  },
  {
    id: 2,
    icon: <Trophy className="w-5 h-5" />,
    headline: "Velocity Context",
    subtext: "Kamino saw 2.1x volume increase after adding our leaderboards. Real-time rankings turn passive holders into competing power users.",
    visualAsset: "/screenshots/leaderboard.svg",
    imageAlt: "Live leaderboard UI",
    terminalTitle: "leaderboard.live",
  },
  {
    id: 3,
    icon: <Brain className="w-5 h-5" />,
    headline: "Torque Intelligence",
    subtext: "Ask \"Which wallets are about to churn?\" and get a list with win-back incentive recommendations. AI-powered retention on autopilot.",
    visualAsset: "/screenshots/intelligence-chat.svg",
    imageAlt: "AI chat interface analyzing wallets",
    terminalTitle: "intelligence.query",
  },
];

export default function GrowthStack() {
  const [activeTab, setActiveTab] = useState(1);

  const activeFeature = features.find((f) => f.id === activeTab) || features[0];

  return (
    <section id="growth-stack" className="w-full bg-white">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            Platform Features
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-[1.1] tracking-tight">
            The Intelligent
            <br />
            <span className="text-black/40">Growth Stack</span>
          </h2>
        </div>

        {/* Desktop: 2-Column Tab System */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Clickable Tabs */}
          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={cn(
                  "w-full text-left p-6 border transition-all duration-200 rounded-[3px]",
                  activeTab === feature.id
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white hover:border-black/30"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex-shrink-0 mt-0.5",
                    activeTab === feature.id ? "text-white" : "text-black"
                  )}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-display text-lg font-medium mb-2",
                      activeTab === feature.id ? "text-white" : "text-black"
                    )}>
                      {feature.headline}
                    </h3>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      activeTab === feature.id ? "text-white/70" : "text-black/60"
                    )}>
                      {feature.subtext}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Visual */}
          <div className="sticky top-32">
            <TerminalCard
              title={activeFeature.terminalTitle}
              showDots={true}
              variant="default"
              bodyClassName="p-0"
            >
              <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                <Image
                  src={activeFeature.visualAsset}
                  alt={activeFeature.imageAlt}
                  fill
                  className="object-contain p-4 transition-opacity duration-300"
                  sizes="50vw"
                  key={activeFeature.id}
                />
              </div>
            </TerminalCard>
          </div>
        </div>

        {/* Mobile/Tablet: Accordion */}
        <div className="lg:hidden space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "border overflow-hidden bg-white transition-all duration-200 rounded-[3px]",
                activeTab === feature.id
                  ? "border-black"
                  : "border-black/10"
              )}
            >
              <button
                onClick={() => setActiveTab(activeTab === feature.id ? 0 : feature.id)}
                className="w-full text-left p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-black flex-shrink-0 mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2 text-black">
                      {feature.headline}
                    </h3>
                    <p className="text-sm text-black/60 leading-relaxed">
                      {feature.subtext}
                    </p>
                  </div>
                </div>
              </button>
              {activeTab === feature.id && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 overflow-hidden border border-black/10">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={feature.visualAsset}
                        alt={feature.imageAlt}
                        fill
                        className="object-contain p-4"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
