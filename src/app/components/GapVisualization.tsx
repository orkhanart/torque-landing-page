"use client";

import React, { useState } from "react";

interface ComparisonItem {
  current: string;
  torque: string;
}

const comparisons: ComparisonItem[] = [
  {
    current: "Metric: TVL & Yield",
    torque: "Metric: Velocity & Retention",
  },
  {
    current: "Campaigns: Single-Venue Only",
    torque: "Campaigns: Cross-Protocol (e.g., Drift x MarginFi)",
  },
  {
    current: "Data: 5% Cross-Protocol Initiatives",
    torque: "Data: Unified Ecosystem Reporting",
  },
];

export default function GapVisualization() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
          The Gap
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The difference between siloed thinking and networked growth.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Current State Column */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-sans font-normal text-foreground mb-2">
              The Current State
            </h3>
            <p className="text-sm text-muted-foreground">(Siloed)</p>
          </div>

          <div className="space-y-3">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg border-2 border-red-500/30 bg-red-500/5 transition-all ${
                  hoveredIndex === index ? "shadow-lg shadow-red-500/20 scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl flex-shrink-0">🔴</span>
                  <p className="text-foreground text-base">{item.current}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Torque Standard Column */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-sans font-normal text-foreground mb-2">
              The Torque Standard
            </h3>
            <p className="text-sm text-muted-foreground">(Networked)</p>
          </div>

          <div className="space-y-3">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg border-2 border-green-500/30 bg-green-500/5 transition-all ${
                  hoveredIndex === index ? "shadow-lg shadow-green-500/20 scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">🟢</span>
                  <p className="text-foreground text-base">{item.torque}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
