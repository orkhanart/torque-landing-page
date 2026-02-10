"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Target, Sparkles } from "lucide-react";

interface CopilotFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: CopilotFeature[] = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "360° User Profiling",
    description:
      "Torque doesn't just see a wallet. It sees a user. Access Net Worth, Holding Duration, Churn Risk, and Competitor Usage history instantly.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Surgical Segmentation",
    description:
      "Filter your audience like a database. Target 'Whales who traded >$10k on Jupiter' or 'LPs who haven't claimed in 30 days'.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Growth Copilot",
    description:
      "Not sure what to launch? The Copilot analyzes your protocol's weak spots (e.g., 'Retention down 5%') and suggests campaigns to fix them.",
  },
];

export default function GrowthCopilot() {
  return (
    <section className="w-full bg-gradient-to-b from-transparent to-card/20 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
            Get to Know Your Users.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't spray and pray. Use the On-Chain CRM to build rich user profiles and target only the behavior that drives profit.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                {feature.icon}
                <h3 className="text-xl font-sans font-normal text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
