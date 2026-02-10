"use client";

import React from "react";

const standards = [
  {
    number: "1.",
    title: "Define",
    description: "Track velocity and quality, not just \"Number Go Up\".",
  },
  {
    number: "2.",
    title: "Unify",
    description: "Run cross-protocol campaigns (Stablecoins + Lending + Perps).",
  },
  {
    number: "3.",
    title: "Optimize",
    description: "Reallocate budgets dynamically based on performance.",
  },
];

const protocols = [
  { name: "Drift" },
  { name: "Kamino" },
  { name: "Jupiter" },
  { name: "Save" },
];

export default function IncentiveStandards() {
  return (
    <section className="w-full bg-gradient-to-b from-transparent to-card/30 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
            The New Standard.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We are reallocating spend to where it matters.
          </p>
        </div>

        {/* Standards List */}
        <div className="space-y-6 mb-16">
          {standards.map((standard, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all"
            >
              <span className="text-4xl font-mono font-bold text-primary flex-shrink-0">
                {standard.number}
              </span>
              <div>
                <h3 className="text-2xl font-sans font-normal text-foreground mb-2">
                  {standard.title}:
                </h3>
                <p className="text-base text-muted-foreground">
                  {standard.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Adopting Protocols */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-8">
            Join the protocols adopting the Standard:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {protocols.map((protocol, index) => (
              <div
                key={index}
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              >
                <div className="w-32 h-16 flex items-center justify-center">
                  <span className="text-lg font-mono text-foreground/60 hover:text-foreground transition-colors">
                    [{protocol.name}]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
