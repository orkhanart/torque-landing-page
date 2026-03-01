"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import IntegrationRequestModal from "./IntegrationRequestModal";

export default function HomepageCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white border-t border-black/10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
          <Rocket className="w-3 h-3" />
          Ready to Deploy?
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          Ready to engineer
          <br />
          <span className="text-black/40">protocol equilibrium?</span>
        </h2>
        <p className="text-base text-black/60 mb-6">
          Torque exists to replace &ldquo;vibes-based&rdquo; marketing with deterministic, programmable ROI. No waste. Just growth.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" onClick={() => setIsModalOpen(true)}>
            Deploy Logic
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="/primitives">
            Explore Primitives
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>

      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
