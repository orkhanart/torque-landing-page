"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ParticleField, GridBackground } from "@/components/backgrounds";
import { ArrowUpRight, Terminal } from "lucide-react";
import IntegrationRequestModal from "./IntegrationRequestModal";

export default function HomepageCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GridBackground
          color="rgba(255,255,255,0.03)"
          lineWidth={1}
          animated={true}
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleField
          particleCount={40}
          color="#ffffff"
          opacity={0.1}
          speed={0.2}
          connectionDistance={100}
          showConnections={true}
          mouseInteraction={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-wider text-white/40 border border-white/10 px-3 py-1.5 rounded-[3px]">
            <Terminal className="w-3 h-3" />
            <span>Ready to Deploy</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
            Ready to solve your
            <br />
            <span className="text-white/40">growth problem?</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Launch campaigns that target the real issues, not vanity metrics.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="inverse"
              onClick={() => setIsModalOpen(true)}
              className="group"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              variant="inverse-outline"
              href="/playbooks"
            >
              Browse Playbooks
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Stats Row */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <div className="font-mono text-2xl font-medium text-white">$10M+</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider mt-1">Distributed</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-medium text-white">906K</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider mt-1">Wallets</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-medium text-white">47</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider mt-1">Protocols</div>
            </div>
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
