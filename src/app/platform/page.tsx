import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GrowthCopilot from "../components/GrowthCopilot";
import TorqueIntelligenceFeature from "../components/TorqueIntelligenceFeature";
import { Card } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import {
  BarChart3,
  Zap,
  Network,
  Target,
  Users,
  TrendingUp,
  Database,
  Settings,
  ArrowRight,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
  validation?: string;
}

const platformFeatures = {
  integration: {
    title: "Native Experience",
    subtitle: "Your Brand. Your UI. Our Engine.",
    description:
      "Keep your users on your app.",
    features: [
      {
        icon: <Target className="w-6 h-6" />,
        title: "Embeddable SDK",
        description: "Most incentive platforms force users to leave your site to check leaderboards or claim rewards. Torque embeds directly into your dApp. Users stay, trade, and engage without breaking flow.",
        capabilities: [
          "Embeddable SDK & Components",
          "React, Vue, Vanilla JS support",
          "5-minute integration",
        ],
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Customizable UI/UX",
        description: "Match your brand perfectly. Every component is themeable and customizable to fit seamlessly into your application design.",
        capabilities: [
          "Fully customizable UI/UX",
          "Brand color integration",
          "Flexible layout options",
        ],
      },
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Zero-Redirect Claims",
        description: "Users claim rewards without leaving your app. Eliminate friction and maximize retention by keeping the entire experience native.",
        capabilities: [
          "Zero-redirect claim flows",
          "In-app reward claiming",
          "Seamless transaction flows",
        ],
      },
    ],
  },
  intelligence: {
    title: "Torque Intelligence",
    subtitle: "Turn Raw Data into Revenue.",
    description:
      "Stop guessing. Torque Intelligence doesn't just analyze history; it surfaces actionable campaigns to drive engagement and retention in real-time.",
    features: [
      {
        icon: <Database className="w-6 h-6" />,
        title: "From Raw Data to Strategy",
        description: "Don't just query data; ask questions. \"Show me the 8 whales at risk of churning this week.\" Torque Intelligence identifies these users and suggests re-engagement campaigns via Telegram or X.",
        capabilities: [
          "Natural Language Querying (\"Ask Torque\")",
          "Proactive Campaign Recommendations",
          "Automated Cohort Segmentation",
        ],
        validation: "🏆 Used by Top Launchpads to filter 15,000+ Sybil wallets",
      },
      {
        icon: <Target className="w-6 h-6" />,
        title: "Protect Your Budget",
        description: "Stop paying mercenaries. Torque scans on-chain history to identify wash traders and Sybil clusters, ensuring your rewards only go to high-quality, organic users.",
        capabilities: [
          "Real-time Wallet Quality Scoring",
          "Wash-Trading Detection",
          "Bot Cluster Isolation",
        ],
        validation: "🏆 Result: Filtered 15,000+ Sybil wallets in a single campaign.",
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Simulate Before You Spend",
        description: "Know the outcome before you deploy. Torque simulates your incentive logic against historical wallet data to forecast ROI, Volume Lift, and Retention impact.",
        capabilities: [
          "ROI Forecasting",
          "Outcome Simulation",
          "Unit Economics Modeling",
        ],
        validation: "🏆 Result: Forecasted 3.3x Volume Lift with 95% accuracy.",
      },
    ],
  },
  mechanics: {
    title: "Launch High-ROI Campaigns.",
    subtitle: "Growth Engines",
    description:
      "Don't just yield farm. Deploy mechanics that drive viral loops and retention.",
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Conditional Incentives",
        description: "Move beyond simple \"Yield Farming.\" Create rewards that trigger only on specific high-value actions to ensure you are paying for quality, not just TVL.",
        capabilities: [
          "Raffles",
          "Rebates",
          "Direct Transfers",
        ],
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Embedded Leaderboards",
        description: "Visualize competition directly on your trading interface. Drive higher velocity by showing users exactly where they rank in real-time.",
        capabilities: [
          "Volume Rankings",
          "Streak Tracking",
          "PnL Leaderboards",
        ],
      },
      {
        icon: <Network className="w-6 h-6" />,
        title: "On-Chain Referrals",
        description: "Fix the distribution gap. Launch native referral programs that reward your best users for bringing in new liquidity.",
        capabilities: [
          "Multi-tier attribution",
          "Instant payouts",
          "Social distribution analytics",
        ],
        validation: "Helping Stablecoins drive $50M+ in organic transfer volume",
      },
    ],
  },
};

interface PlatformSectionProps {
  section: {
    title: string;
    subtitle: string;
    description: string;
    features: Feature[];
  };
  index: number;
}

function PlatformSection({ section, index }: PlatformSectionProps) {
  return (
    <section
      className={`w-full py-16 md:py-24 ${
        index % 2 === 0 ? "bg-gradient-to-b from-transparent to-card/20" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
            {section.title}
          </h2>
          <p className="text-lg sm:text-xl text-primary max-w-4xl mx-auto mb-4">
            {section.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {section.features.map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                {feature.icon}
                <h3 className="text-xl font-sans font-normal text-foreground">
                  {feature.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>

              <div className="pt-4 border-t border-border/20">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-3">
                  Capabilities
                </p>
                <ul className="space-y-2">
                  {feature.capabilities.map((capability, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-sm text-foreground">{capability}</span>
                    </li>
                  ))}
                </ul>
                {feature.validation && (
                  <div className="mt-4 pt-3 border-t border-primary/20">
                    <p className="text-xs font-semibold text-primary italic">{feature.validation}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PlatformPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-normal leading-[1.1] tracking-[-0.02em] text-foreground mb-6 md:mb-8">
              The Growth Operating System.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 md:mb-12 leading-relaxed">
              Stop flying blind. Torque is the On-Chain CRM and Incentive Engine that helps you identify high-value users, predict their behavior, and retain them with surgical precision.
            </p>

            <CustomButton
              buttonSize="big"
              buttonColor="primary"
              href="https://platform.torque.so/"
              className="shadow-cyan-glow"
            >
              Launch Platform
            </CustomButton>
          </div>

          {/* Stats Bar - Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 text-center bg-card/30 border-2 border-border/20">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm font-mono text-muted-foreground uppercase">
                Whitelabel Ready
              </div>
            </Card>
            <Card className="p-6 text-center bg-card/30 border-2 border-border/20">
              <div className="text-4xl font-bold text-primary mb-2">5-Minute</div>
              <div className="text-sm font-mono text-muted-foreground uppercase">
                Integration
              </div>
            </Card>
            <Card className="p-6 text-center bg-card/30 border-2 border-border/20">
              <div className="text-4xl font-bold text-primary mb-2">Real-Time</div>
              <div className="text-sm font-mono text-muted-foreground uppercase">
                AI Optimization
              </div>
            </Card>
          </div>
        </section>

        {/* Platform Sections */}
        <GrowthCopilot />
        <TorqueIntelligenceFeature />
        <PlatformSection section={platformFeatures.mechanics} index={0} />
        <PlatformSection section={platformFeatures.integration} index={1} />

        {/* How It Works */}
        <section className="w-full bg-gradient-to-b from-transparent to-card/30 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From insight to execution in three steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Connect Your Protocol",
                  description:
                    "Integrate Torque in minutes. No engineering resources required.",
                },
                {
                  step: "02",
                  title: "Build Your Campaign",
                  description:
                    "Use our drag-and-drop builder to create smart incentive programs.",
                },
                {
                  step: "03",
                  title: "Track & Optimize",
                  description:
                    "Monitor quality metrics in real-time and reallocate budgets dynamically.",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                  <h3 className="text-xl font-sans font-normal text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {index < 2 && (
                    <ArrowRight className="hidden md:block absolute top-12 -right-4 w-8 h-8 text-primary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-sans font-normal text-foreground mb-4">
              Ready to embed growth into your protocol?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <CustomButton
                buttonSize="big"
                buttonColor="primary"
                href="https://platform.torque.so/"
                className="shadow-cyan-glow min-w-[200px]"
              >
                Get API Keys
              </CustomButton>
              <a
                href="https://docs.torque.so/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[40px] px-6 rounded-none border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/50 transition-all font-semibold text-[16px] min-w-[200px]"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
