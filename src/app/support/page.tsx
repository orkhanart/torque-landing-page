"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  BookOpen,
  LifeBuoy,
  FileText,
  HelpCircle,
  ExternalLink,
  Headphones,
} from "lucide-react";
import { FaXTwitter, FaDiscord, FaTelegram } from "react-icons/fa6";
import { SplitText } from "@/components/animations/SplitText";

// =============================================================================
// Data
// =============================================================================
interface SupportChannel {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}

interface ResourceLink {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
}

const supportChannels: SupportChannel[] = [
  {
    icon: Mail,
    label: "email",
    title: "Email Support",
    description:
      "Reach our team directly for account issues, integration help, or general inquiries. We typically respond within 24 hours.",
    href: "mailto:contact@torque.so",
    cta: "Send Email",
  },
  {
    icon: FaDiscord,
    label: "discord",
    title: "Discord Community",
    description:
      "Join our Discord for real-time help from the team and community. Best for quick questions and live troubleshooting.",
    href: "https://discord.gg/torque",
    cta: "Join Discord",
    external: true,
  },
  {
    icon: FaTelegram,
    label: "telegram",
    title: "Telegram",
    description:
      "Connect with us on Telegram for partnership inquiries, integration support, and direct communication with the team.",
    href: "https://t.me/toraborata",
    cta: "Open Telegram",
    external: true,
  },
  {
    icon: FaXTwitter,
    label: "twitter",
    title: "X (Twitter)",
    description:
      "Follow us for the latest updates, announcements, and community discussions. DMs are open for quick questions.",
    href: "https://x.com/torqueprotocol",
    cta: "Follow on X",
    external: true,
  },
];

const resources: ResourceLink[] = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides for the Torque protocol, SDK, and platform.",
    href: "https://docs.torque.so",
    external: true,
  },
  {
    icon: FileText,
    title: "API Reference",
    description: "Full API documentation for building custom integrations.",
    href: "https://docs.torque.so/api",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Integration Request",
    description: "Want to integrate Torque into your protocol? Start here.",
    href: "/join",
  },
  {
    icon: HelpCircle,
    title: "Playbooks",
    description: "Step-by-step guides for common growth campaigns and strategies.",
    href: "/playbooks",
  },
];

const faqs: FaqItem[] = [
  {
    question: "How do I get started with Torque?",
    answer:
      "Launch the Torque app at app.torque.so and connect your Solana wallet. From there you can create campaigns, set up offers, and start tracking on-chain conversions immediately.",
  },
  {
    question: "What wallets are supported?",
    answer:
      "Torque supports all major Solana wallets including Phantom, Solflare, Backpack, and any wallet compatible with the Solana Wallet Adapter.",
  },
  {
    question: "How does on-chain attribution work?",
    answer:
      "Torque tracks user actions directly on the Solana blockchain. When a user completes a campaign action (swap, stake, mint, etc.), our protocol verifies the transaction on-chain and attributes it to the correct campaign—no cookies or off-chain tracking required.",
  },
  {
    question: "I'm a protocol looking to integrate. Where do I start?",
    answer:
      "Head to our Integration Request page or reach out directly at contact@torque.so. Our team will walk you through the integration process, which typically takes less than a week.",
  },
  {
    question: "Is there a cost to use Torque?",
    answer:
      "Torque charges a small protocol fee on reward distributions. There are no upfront costs or subscription fees—you only pay when campaigns are actively distributing rewards.",
  },
  {
    question: "Where can I report a bug or security issue?",
    answer:
      "For bugs, reach out on Discord or email contact@torque.so. For security vulnerabilities, please email security@torque.so directly. We take all reports seriously and respond promptly.",
  },
];

// =============================================================================
// Support Page
// =============================================================================
export default function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-4xl">
            <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Support
            </div>
            <SplitText tag="h1" className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              <span>How can we</span>
              <span className="text-black/40">help you?</span>
            </SplitText>
            <p data-animate="fade-up" className="text-base md:text-lg text-black/60 max-w-2xl">
              Whether you need technical help, want to integrate your protocol, or just have
              a question—we&apos;re here for you.
            </p>
          </div>
        </header>

        {/* Support Channels */}
        <ChannelsSection />

        {/* Resources */}
        <ResourcesSection />

        {/* FAQ */}
        <FaqSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <div className="h-screen" />
      <Footer />
    </>
  );
}

// =============================================================================
// Channels Section
// =============================================================================
function ChannelsSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-black/10">
      <div>
        {/* Section Header */}
        <div className="mb-16">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <Headphones className="w-3 h-3" />
            Get In Touch
          </div>
          <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
            <span>Reach us where</span>
            <span className="text-black/40">it works for you.</span>
          </SplitText>
          <p data-animate="fade-up" className="text-base text-black/60 max-w-2xl">
            Multiple ways to connect with the Torque team. Pick the channel that suits you best.
          </p>
        </div>

        {/* Channel Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {supportChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                data-animate="fade-up"
                className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                  <span className="font-mono text-[9px] text-black/30">channel.{channel.label}</span>
                </div>

                <div className="p-6">
                  <div className="w-8 h-8 rounded-[3px] bg-blue/5 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                    <Icon className="w-4 h-4 text-blue" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-black mb-2 group-hover:text-blue transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-black/60 leading-relaxed mb-4">
                    {channel.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-blue group-hover:gap-2.5 transition-all">
                    {channel.cta}
                    {channel.external ? (
                      <ExternalLink className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
                    )}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Resources Section
// =============================================================================
function ResourcesSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-black/10">
      <div>
        {/* Section Header */}
        <div className="mb-16">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <BookOpen className="w-3 h-3" />
            Resources
          </div>
          <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
            <span>Find answers</span>
            <span className="text-black/40">on your own.</span>
          </SplitText>
          <p data-animate="fade-up" className="text-base text-black/60 max-w-2xl">
            Explore our documentation, API reference, and guides to get up and running quickly.
          </p>
        </div>

        {/* Resource Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            const Tag = resource.external ? "a" : "a";
            return (
              <Tag
                key={resource.title}
                href={resource.href}
                target={resource.external ? "_blank" : undefined}
                rel={resource.external ? "noopener noreferrer" : undefined}
                data-animate="fade-up"
                className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                  <span className="font-mono text-[9px] text-black/30">resource</span>
                </div>

                <div className="p-6">
                  <div className="w-8 h-8 rounded-[3px] bg-blue/5 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                    <Icon className="w-4 h-4 text-blue" />
                  </div>
                  <h3 className="font-display text-base font-medium text-black mb-2 group-hover:text-blue transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// FAQ Section
// =============================================================================
function FaqSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-black/10">
      <div>
        {/* Section Header */}
        <div className="mb-16">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <HelpCircle className="w-3 h-3" />
            FAQ
          </div>
          <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
            <span>Frequently asked</span>
            <span className="text-black/40">questions.</span>
          </SplitText>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-animate="fade-up"
              className="border-b border-black/5 last:border-b-0"
            >
              <div className="py-6">
                <h3 className="font-display text-base font-medium text-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// CTA Section
// =============================================================================
function CTASection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-xl mx-auto text-center">
        <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
          <LifeBuoy className="w-3 h-3" />
          Still Need Help?
        </div>
        <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          <span>We&apos;re here</span>
          <span className="text-black/40">to help you grow.</span>
        </SplitText>
        <p data-animate="fade-up" className="text-base text-black/60 mb-6">
          Can&apos;t find what you need? Our team is always happy to help.
        </p>
        <div data-animate="fade-up" className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" href="mailto:contact@torque.so">
            Contact Us
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="https://docs.torque.so">
            Read the Docs
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
