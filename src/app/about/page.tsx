"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Trophy, Briefcase, Building2, Rocket, Eye, Target, Zap } from "lucide-react";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { SplitText } from "@/components/animations/SplitText";

const TrophyBurst = dynamic(
  () => import("@/components/card-visuals/TrophyBurst").then(mod => ({ default: mod.TrophyBurst })),
  { ssr: false }
);
const AcceleratorPath = dynamic(
  () => import("@/components/card-visuals/AcceleratorPath").then(mod => ({ default: mod.AcceleratorPath })),
  { ssr: false }
);
const AsciiPortrait = dynamic(
  () => import("@/components/three/AsciiPortrait").then(mod => ({ default: mod.AsciiPortrait })),
  { ssr: false }
);

// =============================================================================
// Types
// =============================================================================
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  pfpImage: string;
}

interface Backer {
  name: string;
  logo: string;
}

interface Milestone {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  date: string;
  image: string;
}

// =============================================================================
// Data
// =============================================================================
const teamMembers: TeamMember[] = [
  {
    name: "Sheldon Smickley",
    role: "Co-Founder & CEO",
    bio: "Ex-Metaplex, Enigma.",
    pfpImage: "/team/sheldon-pfp.png",
  },
  {
    name: "Chris Abiaad",
    role: "Co-Founder, Foundation Lead",
    bio: "Ex-Frens Capital, Enigma.",
    pfpImage: "/team/chris-pfp.png",
  },
  {
    name: "Matt Treiber",
    role: "Founding Engineer, Protocol",
    bio: "Deep Solana Program Architecture.",
    pfpImage: "/team/matt-pfp.png",
  },
  {
    name: "Vedran Sisic",
    role: "Founding Engineer, Full-Stack",
    bio: "Ex-Lazer.",
    pfpImage: "/team/vedran-pfp.png",
  },
];

const backers: Backer[] = [
  { name: "6th Man Ventures", logo: "/logos/6MV.webp" },
  { name: "Solana Ventures", logo: "/logos/Solana-Ventures.webp" },
  { name: "Colosseum", logo: "/logos/colosseum.svg" },
  { name: "Metaplex", logo: "/logos/metaplex.svg" },
];

const milestones: Milestone[] = [
  {
    icon: Trophy,
    label: "Grand Winner Metaplex cHack",
    date: "March 2024",
    image: "/generated/image/light-mono/ascending-platforms.jpg",
  },
  {
    icon: Rocket,
    label: "Infrastructure Track Colosseum Accelerator",
    date: "May 2024",
    image: "/generated/image/light-mono/horizon-minimal.jpg",
  },
];

// =============================================================================
// About Page
// =============================================================================
export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header + Backed Side-by-Side */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Hero Text */}
            <div className="flex flex-col">
              <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
                <span className="w-1 h-1 bg-blue rounded-full" />
                Company
              </div>
              <SplitText tag="h1" className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight">
                <span>We built the growth engine</span>
                <span className="text-black/40">we wished we had.</span>
              </SplitText>
              <div className="flex-1" />
              <p data-animate="fade-up" className="text-base md:text-lg text-black/60 max-w-2xl mt-6">
                Torque is the on-chain revenue infrastructure for Solana. We exist to replace
                &quot;vibes-based&quot; marketing with deterministic, programmable ROI.
              </p>
            </div>

            {/* Right — Backed by the Best */}
            <div className="flex flex-col">
              <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
                <Building2 className="w-3 h-3" />
                Backed by the Best
              </div>
              <div data-animate="fade-up" className="flex items-baseline gap-4 mb-2">
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-blue leading-[1.1] tracking-tight">
                  $3M
                </h2>
                <span className="text-lg text-black/40">Raised</span>
              </div>
              <p data-animate="fade-up" className="text-sm text-black/60 max-w-md">
                Supported by the ecosystem&apos;s leading infrastructure funds
                and strategic partners building the future of Solana.
              </p>
              <div className="flex-1" />
              <div className="flex items-center gap-10 flex-wrap mt-6">
                {backers.map((backer, index) => (
                  <div
                    key={index}
                    data-animate="fade-up"
                    className="flex items-center"
                  >
                    <Image
                      src={backer.logo}
                      alt={`${backer.name} logo`}
                      width={120}
                      height={48}
                      className="h-7 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Journey Section */}
        <JourneySection />

        {/* Who We Are Section */}
        <WhoWeAreSection />

        {/* Team Section */}
        <TeamSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

// =============================================================================
// Who We Are Section
// =============================================================================
function WhoWeAreSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-black/10">
      <div>
        {/* Section Header */}
        <div className="mb-16">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <Eye className="w-3 h-3" />
            Who We Are
          </div>
          <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
            <span>Growth should be a protocol,</span>
            <span className="text-black/40">not a prayer.</span>
          </SplitText>
          <p data-animate="fade-up" className="text-base text-black/60 max-w-2xl">
            We&apos;re a team of protocol engineers and growth operators who got tired of watching
            Solana projects burn runway on campaigns they couldn&apos;t measure, attribution they
            couldn&apos;t trust, and incentives they couldn&apos;t verify. So we built the infrastructure
            to fix it.
          </p>
        </div>

        {/* Vision / Mission / Why Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Vision */}
          <div
            data-animate="fade-up"
            className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
              <span className="font-mono text-[9px] text-black/30">vision</span>
            </div>
            <div className="p-6">
              <div className="w-8 h-8 rounded-[3px] bg-blue/5 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                <Eye className="w-4 h-4 text-blue" />
              </div>
              <h3 className="font-display text-lg font-medium text-black mb-3 group-hover:text-blue transition-colors">
                Our Vision
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                A Solana ecosystem where every marketing dollar is traceable on-chain, every conversion
                is verifiable, and growth is as composable as DeFi. No middlemen. No guesswork. Just
                deterministic outcomes anyone can audit.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div
            data-animate="fade-up"
            className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
              <span className="font-mono text-[9px] text-black/30">mission</span>
            </div>
            <div className="p-6">
              <div className="w-8 h-8 rounded-[3px] bg-blue/5 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                <Target className="w-4 h-4 text-blue" />
              </div>
              <h3 className="font-display text-lg font-medium text-black mb-3 group-hover:text-blue transition-colors">
                Our Mission
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Build the revenue infrastructure layer for Solana&mdash;programmable offers, on-chain
                attribution, and permissionless reward distribution&mdash;so that any protocol or
                project can acquire, retain, and monetize users with cryptographic proof of ROI.
              </p>
            </div>
          </div>

          {/* Why */}
          <div
            data-animate="fade-up"
            className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
              <span className="font-mono text-[9px] text-black/30">why</span>
            </div>
            <div className="p-6">
              <div className="w-8 h-8 rounded-[3px] bg-blue/5 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors">
                <Zap className="w-4 h-4 text-blue" />
              </div>
              <h3 className="font-display text-lg font-medium text-black mb-3 group-hover:text-blue transition-colors">
                Why We Do This
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Crypto promised transparency, yet most projects still run growth the Web2 way&mdash;opaque
                dashboards, unverifiable claims, wasted spend. We believe the chain itself should be
                the source of truth for every user action and every reward. That&apos;s the standard
                we&apos;re building toward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Milestone Visuals & Card
// =============================================================================
const milestoneVisuals = [
  <TrophyBurst key="trophy" color="#0008FF" />,
  <AcceleratorPath key="accelerator" color="#0008FF" />,
];

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = milestone.icon;

  return (
    <div
      data-animate="fade-up"
      className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors h-[480px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Procedural visual background */}
      <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        {React.cloneElement(milestoneVisuals[index], { paused: !isHovered })}
      </div>
      <ImageGradient className="bg-gradient-to-t from-white/80 via-white/50 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      <ImageGradient className="bg-gradient-to-br from-white/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {/* Terminal Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="font-mono text-[9px] text-black/30">milestone.{index + 1}</span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
        <div className="w-8 h-8 rounded-[3px] bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-blue/10 transition-colors">
          <Icon className="w-4 h-4 text-black group-hover:text-blue transition-colors" />
        </div>
        <h3 className="font-display text-base font-medium text-black mb-1 group-hover:text-blue transition-colors">
          {milestone.label}
        </h3>
        <p className="font-mono text-xs text-black/50">{milestone.date}</p>
      </div>
    </div>
  );
}

// =============================================================================
// Journey Section
// =============================================================================
function JourneySection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-black/10">
      <div>
        {/* Section Header */}
        <div className="mb-12">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <Rocket className="w-3 h-3" />
            Our Journey
          </div>
          <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight">
            <span>From hackathon to infrastructure</span>
          </SplitText>
        </div>

        {/* Milestones Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Team Section
// =============================================================================
function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden border-b border-black/10">
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Section Header */}
        <div className="mb-12">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <Users className="w-3 h-3" />
            The Team
          </div>
          <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight">
            <span>Built by operators,</span>
            <span className="text-black/40">for operators.</span>
          </SplitText>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              data-animate="fade-up"
              className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
                <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                <span className="font-mono text-[9px] text-black/30">team.member</span>
              </div>

              {/* Profile Photo */}
              <div className="relative w-full aspect-square bg-white overflow-hidden">
                <AsciiPortrait
                  src={member.pfpImage}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Card Details */}
              <div className="p-4">
                <h3 className="font-display text-base font-medium text-black mb-0.5 group-hover:text-blue transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-blue mb-2">{member.role}</p>
                <p className="text-xs text-black/50">{member.bio}</p>
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
          <Briefcase className="w-3 h-3" />
          Join Us
        </div>
        <SplitText tag="h2" className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          <span>Building the future</span>
          <span className="text-black/40">of on-chain growth?</span>
        </SplitText>
        <p data-animate="fade-up" className="text-base text-black/60 mb-6">
          We&apos;re always looking for exceptional builders to join our team.
        </p>
        <div data-animate="fade-up" className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" href="/careers">
            View Open Roles
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="mailto:team@torque.so">
            Contact Founders
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
