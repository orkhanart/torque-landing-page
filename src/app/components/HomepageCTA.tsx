"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Rocket } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";
import { SplitText } from "@/components/animations/SplitText";

export default function HomepageCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white border-t border-black/10">
      <div className="max-w-xl mx-auto text-center">
        <div
          data-animate="fade-up"
          className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40"
        >
          <Rocket className="w-3 h-3" />
          Ready to Deploy?
        </div>
        <SplitText
          tag="h2"
          className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4"
        >
          <span>Ready to engineer</span>
          <span className="text-black/40">protocol equilibrium?</span>
        </SplitText>
        <p data-animate="fade-up" className="text-base text-black/60 mb-6">
          Torque exists to replace &ldquo;vibes-based&rdquo; marketing with deterministic, programmable ROI. No waste. Just growth.
        </p>
        <div data-animate="fade-up" className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" onClick={() => setIsModalOpen(true)}>
            Deploy Logic
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="/primitives">
            Explore Primitives
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
