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
    name: "Incentives",
    newName: "Smart Rewards",
    description:
      "Move beyond APY. Program incentives based on user quality and retention. Stop rewarding mercenary capital.",
    icon: "🎯",
  },
  {
    name: "Leaderboards",
    newName: "Velocity Context",
    description:
      "Visualize competition to drive usage. Perfect for solving low-velocity gaps in Stablecoins and Lending.",
    icon: "📊",
  },
  {
    name: "Referrals",
    newName: "The Social Graph",
    description:
      "Turn passive holders into active distribution nodes. Fix the 'distribution gap' seen in major assets.",
    icon: "🔗",
  },
  {
    name: "Data",
    newName: "Quality Scoring",
    description:
      "Measure what matters: user retention, velocity, and network effects. Not just TVL.",
    icon: "🧮",
  },
];

export default function GrowthPrimitives() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
          The Growth Stack
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The building blocks for durable onchain networks.
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
