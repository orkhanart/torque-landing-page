"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";

export default function About() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          <span className="text-xs font-mono text-primary uppercase tracking-wider mb-4 block">
            About Torque
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium leading-tight text-foreground mb-6">
            Powering Growth for On-Chain Ecosystems
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We built the growth engine we wished we had—deterministic, programmable ROI for Solana protocols.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground mb-6">
                Growth Through Smart Incentives
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Torque is the engine of growth for companies building on Solana—a unified platform that brings analytics, CRM, and smart on-chain incentives together.
                </p>
                <p>
                  It helps teams explore and understand their on-chain data, uncover insights about user behavior, and identify what drives engagement. With Torque Intelligence, businesses can segment audiences, measure performance, and surface new growth opportunities.
                </p>
                <p>
                  By turning blockchain data into strategy, Torque transforms on-chain participation into measurable, sustainable growth.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/about-image.svg"
                alt="About Torque illustration"
                width={500}
                height={500}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground mb-12">
          Recognition
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Metaplex Award */}
          <div className="bg-white rounded-xl border border-border p-8 hover:shadow-card transition-shadow">
            <Image
              src="/metaplex-chack.svg"
              alt="Metaplex cHack Hackathon"
              width={120}
              height={120}
              className="mb-6"
            />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Metaplex cHack Hackathon
            </h3>
            <p className="text-primary font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Winner
            </p>
          </div>

          {/* Colosseum Award */}
          <div className="bg-white rounded-xl border border-border p-8 hover:shadow-card transition-shadow">
            <Image
              src="/colosseum.svg"
              alt="Colosseum Infrastructure Track Hackathon"
              width={120}
              height={120}
              className="mb-6"
            />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Colosseum Infrastructure Track
            </h3>
            <p className="text-muted-foreground font-medium">
              2nd Place
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
