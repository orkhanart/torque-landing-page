"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  pfpImage: string;
}

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

const backers = [
  { name: "6th Man Ventures", logo: "/logos/6mv.svg" },
  { name: "Solana Ventures", logo: "/logos/solana-ventures.svg" },
  { name: "Colosseum", logo: "/logos/colosseum.svg" },
  { name: "Metaplex", logo: "/logos/metaplex.svg" },
];

const timeline = [
  {
    label: "Grand Winner Metaplex cHack",
    date: "March 2024",
  },
  {
    label: "Infrastructure Track Colosseum Accelerator",
    date: "May 2024",
  },
];

export default function CompanyPage() {
  return (
    <>
      <Navbar />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-foreground mb-6 leading-tight">
              We built the growth engine we wished we had.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Torque is the on-chain revenue infrastructure for Solana. We exist to replace "vibes-based" marketing with deterministic, programmable ROI.
            </p>
          </div>
        </section>

        {/* Backing Section */}
        <section className="bg-secondary/50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground mb-4">
                Backed by the Best
              </h2>
              <div className="text-5xl font-semibold text-primary mb-4">
                $3M Raised
              </div>
              <p className="text-muted-foreground">
                Supported by the ecosystem's leading infrastructure funds.
              </p>
            </div>

            {/* Logo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-3xl mx-auto">
              {backers.map((backer, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={backer.logo}
                    alt={`${backer.name} logo`}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground mb-12 text-center">
            Our Journey
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-card transition-shadow"
              >
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {item.label}
                </h3>
                <p className="text-sm font-mono text-muted-foreground">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-secondary/50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">
            <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground mb-12 text-center">
              The Team
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-card transition-shadow"
                >
                  {/* PFP Image */}
                  <div className="relative w-full aspect-square bg-secondary/30">
                    <Image
                      src={member.pfpImage}
                      alt={`${member.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Card Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground mb-6">
              Building the future of on-chain growth?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <CustomButton
                buttonSize="big"
                buttonColor="primary"
                href="/careers"
                className="shadow-cyan-glow"
              >
                View Open Roles
              </CustomButton>
              <a
                href="mailto:team@torque.so"
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-border bg-white hover:bg-secondary transition-all font-medium text-foreground"
              >
                Contact Founders
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
