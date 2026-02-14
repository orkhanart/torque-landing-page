"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Trophy, Briefcase, Building2, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";

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
  { name: "6th Man Ventures", logo: "/logos/6mv.svg" },
  { name: "Solana Ventures", logo: "/logos/solana-ventures.svg" },
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
// Company Page
// =============================================================================
export default function CompanyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-24 md:pt-32">
        {/* Page Header */}
        <header className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16 border-b border-black/10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <span className="w-1 h-1 bg-blue rounded-full" />
              Company
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight mb-4">
              We built the growth engine
              <br />
              <span className="text-black/40">we wished we had.</span>
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-2xl">
              Torque is the on-chain revenue infrastructure for Solana. We exist to replace
              "vibes-based" marketing with deterministic, programmable ROI.
            </p>
          </div>
        </header>

        {/* Backing Section */}
        <BackingSection />

        {/* Journey Section */}
        <JourneySection />

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
// Backing Section
// =============================================================================
function BackingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full overflow-hidden border-b border-black/10">

      <div ref={ref} className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
              <Building2 className="w-3 h-3" />
              Backed by the Best
            </div>
            <div className="flex items-baseline gap-4 mb-2">
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-blue leading-[1.1] tracking-tight">
                $3M
              </h2>
              <span className="text-lg text-black/40">Raised</span>
            </div>
            <p className="text-sm text-black/60 max-w-md">
              Supported by the ecosystem's leading infrastructure funds.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {backers.map((backer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="h-16 flex items-center justify-center p-4 rounded-[3px] bg-white/60 backdrop-blur-sm border border-black/5 hover:border-black/15 transition-colors"
              >
                <Image
                  src={backer.logo}
                  alt={`${backer.name} logo`}
                  width={120}
                  height={48}
                  className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Journey Section
// =============================================================================
function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-black/10">
      <div ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <Rocket className="w-3 h-3" />
            Our Journey
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight">
            From hackathon to infrastructure
          </h2>
        </motion.div>

        {/* Milestones Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors h-[480px]"
              >

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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Team Section
// =============================================================================
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full overflow-hidden border-b border-black/10">

      <div ref={ref} className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
            <Users className="w-3 h-3" />
            The Team
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight">
            Built by operators,
            <br />
            <span className="text-black/40">for operators.</span>
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-[3px] overflow-hidden border border-black/5 hover:border-black/15 transition-colors bg-white/80 backdrop-blur-sm"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-black/5">
                <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                <span className="font-mono text-[9px] text-black/30">team.member</span>
              </div>


              {/* Card Details */}
              <div className="p-4">
                <h3 className="font-display text-base font-medium text-black mb-0.5 group-hover:text-blue transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-blue mb-2">{member.role}</p>
                <p className="text-xs text-black/50">{member.bio}</p>
              </div>
            </motion.div>
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-xl"
      >
        <div className="inline-flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-black/40">
          <Briefcase className="w-3 h-3" />
          Join Us
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-black leading-[1.1] tracking-tight mb-4">
          Building the future
          <br />
          <span className="text-black/40">of on-chain growth?</span>
        </h2>
        <p className="text-base text-black/60 mb-6">
          We're always looking for exceptional builders to join our team.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" href="/careers">
            View Open Roles
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" href="mailto:team@torque.so">
            Contact Founders
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
