"use client";

import React from "react";

interface NodeItem {
  type: "observation" | "alert" | "opportunity";
  title: string;
  content: string;
  status?: string;
}

const nodes: NodeItem[] = [
  {
    type: "observation",
    title: "Observation",
    content: "80% of all incentive spend currently targets yield or TVL, ignoring user retention.",
  },
  {
    type: "alert",
    title: "Alert",
    content: "PYUSD has reached $1B Market Cap but maintains only 1% Volume-to-Cap ratio. Status: Inefficient.",
    status: "Inefficient",
  },
  {
    type: "opportunity",
    title: "Opportunity",
    content: "Kamino leads with $2.4B TVL but has the lowest utilization (33%). High potential for looping incentives.",
  },
];

const getNodeColor = (type: string) => {
  switch (type) {
    case "observation":
      return "border-l-blue-500 bg-blue-500/5";
    case "alert":
      return "border-l-red-500 bg-red-500/5";
    case "opportunity":
      return "border-l-green-500 bg-green-500/5";
    default:
      return "border-l-primary bg-primary/5";
  }
};

const getNodeIcon = (type: string) => {
  switch (type) {
    case "observation":
      return "🔍";
    case "alert":
      return "⚠️";
    case "opportunity":
      return "💡";
    default:
      return "•";
  }
};

export default function DailyBrief() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
          Today&apos;s Intelligence
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Real-time insights from the Solana ecosystem. Data others don&apos;t have.
        </p>
      </div>

      {/* Node Feed */}
      <div className="space-y-4">
        {nodes.map((node, index) => (
          <div
            key={index}
            className={`border-l-4 ${getNodeColor(node.type)} rounded-r-lg p-6 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <span className="text-2xl flex-shrink-0">{getNodeIcon(node.type)}</span>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-semibold text-foreground uppercase tracking-wide">
                    #{node.title}
                  </span>
                  {node.status && (
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full font-mono">
                      {node.status}
                    </span>
                  )}
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {node.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
