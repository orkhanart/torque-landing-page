"use client";

import React from "react";

interface SignalItem {
  emoji: string;
  label: string;
  value: string;
  status: "red" | "green";
  anchor: string;
}

const signals: SignalItem[] = [
  {
    emoji: "🔴",
    label: "Problem",
    value: "91% Idle Supply",
    status: "red",
    anchor: "#market-blindness",
  },
  {
    emoji: "🟢",
    label: "Solution",
    value: "Smart Rewards",
    status: "green",
    anchor: "#growth-stack",
  },
  {
    emoji: "🟢",
    label: "Proof",
    value: "+240% ROI",
    status: "green",
    anchor: "#proven-results",
  },
];

const handleScroll = (anchor: string) => {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function EcosystemSignal() {
  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {signals.map((signal, index) => (
            <button
              key={index}
              onClick={() => handleScroll(signal.anchor)}
              className="flex items-center justify-center gap-2 p-3 rounded-lg border backdrop-blur-[10px] transition-all cursor-pointer bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
            >
              <span className="text-lg flex-shrink-0">{signal.emoji}</span>
              <div className="flex items-baseline gap-2">
                <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {signal.label}:
                </div>
                <div className="text-sm font-bold text-foreground">
                  {signal.value}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
