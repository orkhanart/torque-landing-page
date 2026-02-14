"use client";

import React from "react";
import { Code, Trophy, Brain, Zap, ArrowUpRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

// =============================================================================
// Growth Stack Section
// =============================================================================
export default function GrowthStack() {
  return (
    <section id="growth-stack" className="w-full bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40 border border-black/10 px-2 py-1 rounded-[3px]">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Platform Features
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-[1.1] tracking-tight">
              Your Complete
              <br />
              <span className="text-black/40">Growth Stack</span>
            </h2>
            <p className="text-base md:text-lg text-black/60 mt-4 max-w-xl">
              Everything you need to acquire, retain, and grow your user base.
            </p>
          </div>
          <Button variant="outline" href="/platform" className="w-fit">
            Explore Platform
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Large Card - Programmable Rewards */}
          <div className="md:col-span-2 lg:col-span-2">
            <FeatureCard
              icon={Code}
              title="Programmable Rewards"
              description='Set conditions like "only reward users who hold >$1K and traded 3+ times this week." No more paying for bots or one-time farmers.'
              image="/generated/image/light-mono/infrastructure-light.jpg"
              imageAlt="Code editor showing programmable reward logic"
              filename="rewards.config"
              features={[
                { icon: Zap, label: "Conditional Logic" },
                { dot: true, label: "Real-time" },
              ]}
              large
              featured
            />
          </div>

          {/* Small Card - Leaderboards */}
          <div>
            <FeatureCard
              icon={Trophy}
              title="Leaderboards"
              description="Real-time rankings turn passive holders into competing power users."
              image="/generated/image/light-mono/growth-bars-light.jpg"
              imageAlt="Leaderboard interface"
              filename="leaderboard.tsx"
              metric="2.1x volume increase"
            />
          </div>

          {/* Small Card - AI Insights */}
          <div>
            <FeatureCard
              icon={Brain}
              title="AI Insights"
              description='Ask "Which wallets are about to churn?" and get actionable recommendations.'
              image="/generated/image/light-mono/data-particles.jpg"
              imageAlt="AI neural network visualization"
              filename="intelligence.ai"
              metric="Predictive analytics"
            />
          </div>

          {/* Wide Card - API / SDK */}
          <div className="md:col-span-2 lg:col-span-2">
            <APICard />
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Feature Card Component
// =============================================================================
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  filename: string;
  features?: Array<{ icon?: React.ComponentType<{ className?: string }>; dot?: boolean; label: string }>;
  metric?: string;
  large?: boolean;
  featured?: boolean;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  image,
  imageAlt,
  filename,
  features,
  metric,
  large,
  featured,
}: FeatureCardProps) {
  return (
    <div className={`relative rounded-[3px] group h-full border transition-all overflow-hidden ${large ? "min-h-[392px]" : "min-h-[336px]"} ${featured ? "bg-gradient-to-br from-blue/10 via-blue/5 to-transparent border-blue/20 hover:border-blue/40 shadow-[0_0_40px_-10px_rgba(0,122,255,0.15)]" : "border-black/5 hover:border-black/15"}`}>

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">{filename}</span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 pt-8">
        <div className="mt-auto">
          <div className={`w-8 h-8 rounded-[3px] backdrop-blur-sm flex items-center justify-center mb-3 transition-colors ${featured ? "bg-blue/15 group-hover:bg-blue/25" : "bg-white/80 group-hover:bg-blue/10"}`}>
            <Icon className={`w-4 h-4 transition-colors ${featured ? "text-blue" : "text-black group-hover:text-blue"}`} />
          </div>

          <h3 className="font-display text-base md:text-lg font-medium mb-1 text-black group-hover:text-blue transition-colors">
            {title}
          </h3>

          <p className="text-black/60 text-xs leading-relaxed mb-3">
            {description}
          </p>

          {features && (
            <div className="pt-3 border-t border-black/10 flex items-center gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[10px] text-black/50">
                  {feature.icon && <feature.icon className="w-3 h-3" />}
                  {feature.dot && <span className="w-1 h-1 bg-blue rounded-full" />}
                  <span className="font-mono">{feature.label}</span>
                </div>
              ))}
            </div>
          )}

          {metric && (
            <div className="pt-3 border-t border-black/10">
              <span className="inline-flex items-center text-xs font-medium text-blue">
                {metric}
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// API Card Component
// =============================================================================
function APICard() {
  return (
    <div className="relative rounded-[3px] group h-full border border-black/5 hover:border-black/15 transition-colors overflow-hidden min-h-[280px]">

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">api.sdk</span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 pt-8">
        <div className="mt-auto">
          <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
            <Terminal className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
          </div>

          <h3 className="font-display text-base md:text-lg font-medium mb-1 text-black group-hover:text-blue transition-colors">
            Developer-first Infrastructure
          </h3>
          <p className="text-black/60 text-xs leading-relaxed mb-3">
            Full API access, webhooks, and SDK for seamless integration.
          </p>

          <div className="pt-3 border-t border-black/10 flex flex-wrap items-center gap-1.5">
            {["REST API", "Webhooks", "SDK"].map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-[2px] font-mono text-[10px] text-black/60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
