"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Code,
  Trophy,
  Brain,
  Zap,
  Network,
  Shield,
  TrendingUp,
  BarChart3,
  Layers,
  Database,
  Gauge,
  Users,
  Terminal,
  Check,
} from "lucide-react";

// =============================================================================
// Platform Page
// =============================================================================
export default function PlatformPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Platform
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              The Growth Operating System
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-2xl">
              On-Chain CRM and Incentive Engine that helps you identify high-value users,
              predict their behavior, and retain them with surgical precision.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Button variant="accent" href="https://platform.torque.so/">
                Launch Platform
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" href="https://docs.torque.so/">
                Documentation
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="w-full px-6 md:px-12 lg:px-20 py-8 border-b border-black/10 bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {[
              { value: "100%", label: "Whitelabel" },
              { value: "5min", label: "Integration" },
              { value: "Real-time", label: "AI Optimization" },
            ].map((stat, index) => (
              <div key={index} className="flex items-baseline gap-2">
                <span className="font-display text-xl font-semibold text-black">
                  {stat.value}
                </span>
                <span className="text-xs text-black/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Section */}
        <FeatureSection
          icon={Brain}
          label="Torque Intelligence"
          title="Turn Raw Data into Revenue"
          description="Stop guessing. Surface actionable campaigns to drive engagement and retention."
          image="/generated/image/light-mono/data-particles.jpg"
          imageAlt="Torque Intelligence Dashboard"
          features={[
            {
              icon: Database,
              title: "Natural Language Queries",
              description: "Ask questions like \"Show me whales at risk of churning\" and get actionable recommendations.",
            },
            {
              icon: Shield,
              title: "Sybil Protection",
              description: "Identify wash traders and bot clusters. 15K+ sybils filtered and counting.",
            },
            {
              icon: Gauge,
              title: "ROI Simulation",
              description: "Simulate incentive logic against historical data before deploying.",
            },
            {
              icon: TrendingUp,
              title: "Analytics Dashboard",
              description: "Track cohorts, reward efficiency, and campaign ROI in real-time.",
            },
          ]}
        />

        {/* Growth Mechanics Section */}
        <FeatureSection
          icon={Zap}
          label="Growth Engines"
          title="Launch High-ROI Campaigns"
          description="Deploy mechanics that drive viral loops and retention."
          image="/generated/image/light-mono/ascending-platforms.jpg"
          imageAlt="Growth Mechanics"
          imagePosition="right"
          features={[
            {
              icon: Code,
              title: "Conditional Incentives",
              description: "Rewards that trigger on specific high-value actions—raffles, rebates, and transfers.",
            },
            {
              icon: Trophy,
              title: "Embedded Leaderboards",
              description: "Real-time rankings that drive competition directly in your interface. 2.1x volume lift.",
            },
            {
              icon: Network,
              title: "On-Chain Referrals",
              description: "Native referral programs with multi-tier attribution. $50M+ volume driven.",
            },
          ]}
        />

        {/* Integration Section */}
        <FeatureSection
          icon={Layers}
          label="Native Experience"
          title="Your Brand. Your UI. Our Engine."
          description="Embed directly into your dApp. Users never leave."
          image="/generated/image/light-mono/infrastructure-light.jpg"
          imageAlt="Integration SDK"
          features={[
            {
              icon: Terminal,
              title: "Embeddable SDK",
              description: "React, Vue, Vanilla JS support. Integrate in minutes with full TypeScript support.",
            },
            {
              icon: Users,
              title: "Customizable UI",
              description: "Every component is themeable to match your brand's colors and layouts.",
            },
            {
              icon: Zap,
              title: "Zero-Redirect Claims",
              description: "Users claim rewards without leaving your app. Zero friction.",
            },
            {
              icon: Code,
              title: "Full API Access",
              description: "REST API, webhooks, and SDK for complete programmatic control.",
            },
          ]}
        />

        {/* How It Works */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 border-t border-black/10 bg-gray-50/50">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <BarChart3 className="w-3 h-3" />
              How It Works
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-medium text-black leading-[1.1] tracking-tight">
              Three Steps to Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Connect",
                description: "Integrate with our SDK. No engineering resources required.",
                image: "/generated/image/light-mono/cluster-cubes-01.jpg",
              },
              {
                step: "02",
                title: "Build",
                description: "Create incentive programs with our visual builder.",
                image: "/generated/image/light-mono/horizon-minimal.jpg",
              },
              {
                step: "03",
                title: "Optimize",
                description: "Monitor metrics and reallocate budgets dynamically.",
                image: "/generated/image/light-mono/floating-mass-02.jpg",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-[3px] overflow-hidden group border border-black/5 hover:border-black/15 transition-colors h-[48rem]"
              >
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
                  <div className="text-3xl font-display font-bold text-black/10 mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-display text-base font-medium text-black mb-1 group-hover:text-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-black/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 border-t border-black/10">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              Ready to embed growth into your protocol?
            </h2>
            <p className="text-base text-black/60 mb-6">
              Join leading protocols using Torque to drive sustainable growth.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="accent" href="https://platform.torque.so/">
                Get API Keys
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" href="https://docs.torque.so/">
                Read Docs
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// =============================================================================
// Feature Section Component
// =============================================================================
interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  features: FeatureItem[];
}

function FeatureSection({
  icon: Icon,
  label,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "left",
  features,
}: FeatureSectionProps) {
  const imageContent = (
    <div className="relative h-[300px] md:h-full min-h-[400px] rounded-[3px] overflow-hidden border border-black/5 bg-gray-50">
    </div>
  );

  const textContent = (
    <div className="flex flex-col justify-center py-4">
      <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <h2 className="font-display text-xl sm:text-2xl font-medium text-black leading-[1.1] tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm text-black/60 mb-6 max-w-md">{description}</p>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-3 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-[3px] bg-gray-50 border border-black/5 flex items-center justify-center group-hover:bg-blue/5 group-hover:border-blue/20 transition-colors">
              <feature.icon className="w-4 h-4 text-black/40 group-hover:text-blue transition-colors" />
            </div>
            <div>
              <h3 className="font-display text-sm font-medium text-black mb-0.5 group-hover:text-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-black/55 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {imagePosition === "left" ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </section>
  );
}
