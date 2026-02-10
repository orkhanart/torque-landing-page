"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface SectorData {
  title: string;
  context: string;
  torqueFix: string;
  icon: string;
}

const sectors: SectorData[] = [
  {
    title: "Stablecoins",
    icon: "💵",
    context: "Assets like USDG ($622M Cap) suffer from low velocity.",
    torqueFix: "Launch referral & social rewards to drive distribution beyond lending venues.",
  },
  {
    title: "Lending",
    icon: "🏦",
    context: "High TVL, low utilization. Save Finance has 53% utilization but low incentive spend.",
    torqueFix: "Add borrowing incentives to drive real yield.",
  },
  {
    title: "Perps",
    icon: "📈",
    context: "Pacifica sees 20x volume-to-TVL but lacks retention mechanics.",
    torqueFix: "Reward user quality and progression, not just raw volume.",
  },
];

export default function ProtocolIntelligence() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
          Protocol Intelligence
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Sector-specific insights to optimize your ecosystem.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectors.map((sector, index) => (
          <div key={index}>
            <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group cursor-pointer">
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{sector.icon}</span>
                <h3 className="text-2xl font-sans font-normal text-foreground">
                  {sector.title}
                </h3>
              </div>

              {/* Context */}
              <div className="mb-4">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-2">
                  Context
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sector.context}
                </p>
              </div>

              {/* Torque Fix */}
              <div className="mb-4">
                <p className="text-xs font-mono text-primary uppercase tracking-wide mb-2">
                  Torque Fix
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {sector.torqueFix}
                </p>
              </div>

              {/* View Node Link */}
              <div className="mt-6 pt-4 border-t border-border/20">
                <button className="flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all group-hover:text-primary/80">
                  <span className="font-mono">View Node</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
