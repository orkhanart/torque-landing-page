"use client";

import React from "react";
import { dataTruthContent } from "@/app/content/data-truth";
import { TerminalCard, CountUp } from "@/components/terminal";
import { cn } from "@/lib/utils";

export default function DataTruth() {
  const { section, stats } = dataTruthContent;

  return (
    <section id={section.id} className="w-full bg-gray-50">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - The Problem */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
              {section.badge}
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-black mb-6 leading-[1.1] tracking-tight">
              {section.headline}
            </h2>

            <p className="text-lg text-black/60 leading-relaxed font-body">
              {section.description}
            </p>

            {/* Visual Separator */}
            <div className="mt-10 pt-10 border-t border-black/10">
              <div className="font-mono text-xs uppercase tracking-wider text-black/40 mb-4">
                The opportunity
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl font-bold text-black">91%</span>
                <span className="font-mono text-lg text-black/40">dormant supply</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div id="proven-results" className="space-y-6">
            {stats.map((stat, index) => (
              <TerminalCard
                key={index}
                title={stat.label.toLowerCase().replace(/\s+/g, '_')}
                showDots={true}
                variant="default"
              >
                <div className="flex items-start gap-5">
                  <div className="text-black flex-shrink-0 mt-1">
                    {stat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-4xl font-bold text-black mb-2">
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-black/40 mb-3">
                      {stat.label}
                    </div>
                    <p className="text-sm text-black/60 leading-relaxed">
                      {stat.subtext}
                    </p>
                    {stat.link && stat.link !== "#" && (
                      <a
                        href={stat.link}
                        className="inline-flex items-center font-mono text-xs uppercase tracking-wider text-black hover:underline mt-4"
                      >
                        Request Case Study →
                      </a>
                    )}
                  </div>
                </div>
              </TerminalCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
