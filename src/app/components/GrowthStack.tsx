"use client";

import React from "react";
import Image from "next/image";
import { Code, Trophy, Brain, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GrowthStack() {
  return (
    <section id="growth-stack" className="w-full bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full" />
              Platform Features
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight">
              Your Complete
              <br />
              <span className="text-black/40">Growth Stack</span>
            </h2>
          </div>
          <Button variant="outline" href="/platform" className="w-fit">
            Explore Platform
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Large Card - Programmable Rewards (spans 2 cols on lg) */}
          <div className="md:col-span-2 lg:col-span-2 bg-black text-white p-8 md:p-10 rounded-[3px] group hover:bg-black-light transition-colors">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-[3px] bg-white/10 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50">Core Feature</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
                Programmable Rewards
              </h3>

              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Set conditions like &quot;only reward users who hold &gt;$1K and traded 3+ times this week.&quot; No more paying for bots or one-time farmers.
              </p>

              <div className="mt-auto flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Zap className="w-4 h-4" />
                  <span>Conditional Logic</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <span className="w-1.5 h-1.5 bg-blue rounded-full" />
                  <span>Real-time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Card - Velocity Context */}
          <div className="bg-white border border-black/10 p-6 md:p-8 rounded-[3px] group hover:border-black/30 transition-colors">
            <div className="flex flex-col h-full">
              <div className="w-10 h-10 rounded-[3px] bg-black/5 flex items-center justify-center mb-6">
                <Trophy className="w-5 h-5 text-black" />
              </div>

              <h3 className="font-display text-xl md:text-2xl font-medium text-black mb-3">
                Leaderboards
              </h3>

              <p className="text-black/50 text-sm leading-relaxed mb-6">
                Real-time rankings turn passive holders into competing power users.
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-medium text-black/60 group-hover:text-black transition-colors">
                  2.1x volume increase
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </div>

          {/* Small Card - Intelligence */}
          <div className="bg-white border border-black/10 p-6 md:p-8 rounded-[3px] group hover:border-black/30 transition-colors">
            <div className="flex flex-col h-full">
              <div className="w-10 h-10 rounded-[3px] bg-black/5 flex items-center justify-center mb-6">
                <Brain className="w-5 h-5 text-black" />
              </div>

              <h3 className="font-display text-xl md:text-2xl font-medium text-black mb-3">
                AI Insights
              </h3>

              <p className="text-black/50 text-sm leading-relaxed mb-6">
                Ask &quot;Which wallets are about to churn?&quot; and get actionable recommendations.
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-medium text-black/60 group-hover:text-black transition-colors">
                  Predictive analytics
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </div>

          {/* Wide Card - API / SDK */}
          <div className="md:col-span-2 bg-black/5 border border-black/10 p-6 md:p-8 rounded-[3px] group hover:border-black/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-medium text-black mb-2">
                  Developer-first Infrastructure
                </h3>
                <p className="text-black/50 text-sm">
                  Full API access, webhooks, and SDK for seamless integration with your stack.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-black/10 rounded-[3px] font-mono text-xs text-black/60">REST API</span>
                <span className="px-3 py-1.5 bg-black/10 rounded-[3px] font-mono text-xs text-black/60">Webhooks</span>
                <span className="px-3 py-1.5 bg-black/10 rounded-[3px] font-mono text-xs text-black/60">SDK</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
