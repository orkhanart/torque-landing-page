"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Terminal } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";

export default function HomepageCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full bg-white relative overflow-hidden border-t border-black/10">
      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
            <Terminal className="w-3 h-3" />
            <span>Ready to Optimize</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6 text-black">
            Ready to optimize your
            <br />
            <span className="text-black/40">liquidity?</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-black/60 mb-10 max-w-xl mx-auto">
            Launch campaigns that target the real issues, not vanity metrics.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="group"
            >
              Get audited
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Integration Request Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
