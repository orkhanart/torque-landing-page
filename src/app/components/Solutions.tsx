"use client";

import React from "react";
import { TerminalCard } from "@/components/terminal";
import { ArrowRight, DollarSign, Landmark, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Solution {
  sector: string;
  title: string;
  diagnosis: string;
  fix: string;
  proof: string;
  icon: React.ReactNode;
  terminalTitle: string;
}

const solutions: Solution[] = [
  {
    sector: "Stablecoins",
    title: "Ignite Velocity",
    diagnosis: "Market Cap ($175M) but no Velocity.",
    fix: "Referral & Social Layers.",
    proof: "+40% Velocity Increase",
    icon: <DollarSign className="w-5 h-5" />,
    terminalTitle: "stablecoin.strategy",
  },
  {
    sector: "Lending",
    title: "Drive Real Yield",
    diagnosis: "No liquidity = no product.",
    fix: "Duration-Weighted LP Rewards.",
    proof: "Highest Utilization in Sector",
    icon: <Landmark className="w-5 h-5" />,
    terminalTitle: "lending.strategy",
  },
  {
    sector: "Perps",
    title: "Automate Retention",
    diagnosis: "One-time traders churn immediately.",
    fix: "Gamified Volume & Streaks.",
    proof: "3x Increase in Trader Retention",
    icon: <TrendingUp className="w-5 h-5" />,
    terminalTitle: "perps.strategy",
  },
];

export default function Solutions() {
  return (
    <section className="w-full py-24 md:py-32 bg-gray-50">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            Sector Solutions
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-[1.1] tracking-tight">
            Sector-Specific
            <br />
            <span className="text-black/40">Strategies</span>
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <TerminalCard
              key={index}
              title={solution.terminalTitle}
              showDots={true}
              variant="default"
              className="h-full hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon & Sector */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-black/10 flex items-center justify-center">
                  {solution.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-black">
                    {solution.sector}
                  </h3>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-mono text-sm uppercase tracking-wider text-black mb-4">
                {solution.title}
              </h4>

              {/* Diagnosis */}
              <div className="mb-4 p-3 bg-gray-50 border border-black/5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/40 mb-1">
                  Diagnosis
                </p>
                <p className="text-sm text-black/70">{solution.diagnosis}</p>
              </div>

              {/* The Torque Fix */}
              <div className="mb-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/40 mb-1">
                  The Fix
                </p>
                <p className="text-sm text-black leading-relaxed">
                  {solution.fix}
                </p>
              </div>

              {/* Proof */}
              <div className="mb-6 p-3 bg-black text-white">
                <p className="font-mono text-xs font-medium">{solution.proof}</p>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-4 border-t border-black/10">
                <a
                  href="/solutions"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black hover:gap-3 transition-all group"
                >
                  <span>View Strategy</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </TerminalCard>
          ))}
        </div>
      </div>
    </section>
  );
}
