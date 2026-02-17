"use client";

import React from "react";
import { Card } from "@/components/ui/card";

interface Primitive {
  name: string;
  newName: string;
  description: string;
  icon: string;
}

const primitives: Primitive[] = [
  {
    name: "DEX Liquidity Incentive",
    newName: "Liquidity Velocity Multiplier",
    description:
      "Leverages lottery psychology to drive 100x volume per dollar spent.",
    icon: "⚡",
  },
  {
    name: "Onchain User Retention",
    newName: "Duration-Weighted Retention",
    description:
      "Rewards users based on time-weighted participation to filter out mercenary capital.",
    icon: "⏱",
  },
  {
    name: "Referral & Social Distribution",
    newName: "Viral Growth Coefficient",
    description:
      "Turn holders into distribution nodes with multi-tier onchain attribution.",
    icon: "🔗",
  },
  {
    name: "Habit Formation Architecture",
    newName: "Iterative Interaction Loops",
    description:
      "Shift rewards from raw volume to 'Streaks' to build consistent user retention.",
    icon: "🔄",
  },
];

export default function GrowthPrimitives() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
          Strategic Primitives Library
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Composable building blocks for onchain growth. Deploy proven logic to solve specific gaps in velocity, retention, and liquidity.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {primitives.map((primitive, index) => (
          <Card
            key={index}
            className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">{primitive.icon}</span>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="text-xl font-sans font-normal text-foreground">
                    {primitive.newName}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    ({primitive.name})
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {primitive.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
