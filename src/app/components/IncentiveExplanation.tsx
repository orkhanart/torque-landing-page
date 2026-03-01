"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { HammerIcon, WandSparklesIcon, BarChart3Icon } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Sync",
    description: "Embed the SDK to give your protocol sensory input. No engineering bloat; just 100% visibility into user behavior.",
    image: "/generated/image/mono-3d/hero-network-nodes.jpg",
    alt: "SDK integration visualization",
    icon: BarChart3Icon,
  },
  {
    id: 2,
    title: "Architect",
    description: "Define your logic gates. Use our visual builder to set \"Golden Actions\"—ensuring capital only flows to users who meet specific value thresholds.",
    image: "/generated/image/mono-3d/glass-cube-stack.jpg",
    alt: "Visual logic builder interface",
    icon: HammerIcon,
  },
  {
    id: 3,
    title: "Equilibrate",
    description: "Monitor real-time ROI telemetry. Torque identifies high-performance paths and automatically scales budget to what works.",
    image: "/generated/image/mono-3d/data-stream.jpg",
    alt: "ROI telemetry dashboard",
    icon: WandSparklesIcon,
  },
];

const IncentiveExplanation = () => {
  return (
    <div>
      <div className="flex flex-col md:gap-4 gap-2 mb-8 md:mb-12">
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          The Workflow
        </span>
        <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-medium">
          The Growth Engine
        </h2>
        <p className="text-black/70 text-sm md:text-base max-w-2xl">
          An onchain CRM and incentive engine designed to identify, predict, and retain high-value participants with surgical precision.
        </p>
      </div>

      {/* Mobile view: Single column */}
      <div className="flex flex-col gap-6 lg:hidden">
        {cards.map((card) => (
          <GlassCard
            key={card.id}
            glow={true}
            scale={true}
            border="subtle"
            padding="none"
            blur={true}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-black">{card.title}</h3>
                <card.icon className="w-6 h-6 text-primary flex-shrink-0" />
              </div>
              <p className="text-sm text-black/70 mb-4">
                {card.description}
              </p>
            </div>
            <div className="px-4 pb-4">
              <Image
                src={card.image}
                alt={card.alt}
                width={840}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Desktop view: Three-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <GlassCard
            key={card.id}
            glow={true}
            scale={false}
            border="subtle"
            padding="none"
            blur={true}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary/60">0{card.id}</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-black">{card.title}</h3>
                </div>
                <card.icon className="w-7 h-7 md:w-8 md:h-8 text-primary flex-shrink-0" />
              </div>
              <p className="text-sm md:text-base text-black/70 mb-6">
                {card.description}
              </p>
            </div>
            <div className="px-4 md:px-5 pb-4 md:pb-5">
              <Image
                src={card.image}
                alt={card.alt}
                width={840}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default IncentiveExplanation;
