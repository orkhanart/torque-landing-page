"use client";

import { SmartImage } from "@/components/ascii/SmartImage";
import { GlassCard } from "@/components/ui/glass-card";
import { HammerIcon, WandSparklesIcon, RocketIcon, BarChart3Icon } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Explore",
    description: "Unlock deep insights into user behavior and holder segments. Discover who your community is and what drives them.",
    image: "/generated/image/mono-3d/hero-network-nodes.jpg",
    alt: "Explore data visualization",
    icon: BarChart3Icon,
  },
  {
    id: 2,
    title: "Create Incentive",
    description: "Design and launch on-chain incentives in minutes. Choose from pre-built modules like leaderboards, raffles, and rebates.",
    image: "/generated/image/mono-3d/glass-cube-stack.jpg",
    alt: "Incentive type selection interface",
    icon: HammerIcon,
  },
  {
    id: 3,
    title: "Launch",
    description: "Allocate tokens and set budgets with built-in analytics. Fund campaigns securely and transparently — right from your wallet.",
    image: "/generated/image/mono-3d/vault-door.jpg",
    alt: "Campaign launch interface",
    icon: RocketIcon,
  },
  {
    id: 4,
    title: "Optimize",
    description: "Use Torque Intelligence to measure performance and automatically optimize incentives. Identify what's working — and scale it instantly.",
    image: "/generated/image/mono-3d/data-stream.jpg",
    alt: "AI optimization dashboard",
    icon: WandSparklesIcon,
  },
];

const IncentiveExplanation = () => {
  return (
    <div>
      <div className="flex flex-col md:gap-4 gap-2 mb-8 md:mb-12">
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          How It Works
        </span>
        <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-medium">
          Growth from A to Z
        </h2>
        <p className="text-black/70 text-sm md:text-base max-w-2xl">
          Everything you need to design, deploy, and measure on-chain incentives.
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
              <SmartImage
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

      {/* Desktop view: Two-column masonry layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          {[cards[0], cards[2]].map((card) => (
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
                  <h3 className="text-2xl md:text-3xl font-medium text-black">{card.title}</h3>
                  <card.icon className="w-7 h-7 md:w-8 md:h-8 text-primary flex-shrink-0" />
                </div>
                <p className="text-sm md:text-base text-black/70 mb-6">
                  {card.description}
                </p>
              </div>
              <div className="px-4 md:px-5 pb-4 md:pb-5">
                <SmartImage
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

        {/* Right column - offset for masonry effect */}
        <div className="flex flex-col gap-8 lg:pt-20">
          {[cards[1], cards[3]].map((card) => (
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
                  <h3 className="text-2xl md:text-3xl font-medium text-black">{card.title}</h3>
                  <card.icon className="w-7 h-7 md:w-8 md:h-8 text-primary flex-shrink-0" />
                </div>
                <p className="text-sm md:text-base text-black/70 mb-6">
                  {card.description}
                </p>
              </div>
              <div className="px-4 md:px-5 pb-4 md:pb-5">
                <SmartImage
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
    </div>
  );
};

export default IncentiveExplanation;
