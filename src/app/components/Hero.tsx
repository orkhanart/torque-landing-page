"use client";

import React from "react";
import Image from "next/image";
import { IconBelt } from "@/components/ui/icon-belt";

const trustedCompanies = [
  {
    name: "Solana",
    logo: "/logos/solana-round.svg",
    width: 90,
    height: 90,
    url: "https://solana.com",
  },
  {
    name: "Raydium",
    logo: "/logos/raydium-round.svg",
    width: 90,
    height: 90,
    url: "https://raydium.io",
  },
  {
    name: "Metaplex",
    logo: "/logos/metaplex-round.svg",
    width: 90,
    height: 90,
    url: "https://metaplex.com",
  },
  {
    name: "Tensor",
    logo: "/logos/tensor-round.svg",
    width: 90,
    height: 90,
    url: "https://tensor.so",
  },
  {
    name: "Axium",
    logo: "/logos/axium-round.svg",
    width: 90,
    height: 90,
    url: "https://axiom.trade",
  },
  {
    name: "Portals",
    logo: "/logos/portals-round.svg",
    width: 90,
    height: 90,
    url: "https://theportal.to/",
  },

];

const Hero = () => {
  return (
    <div className="relative text-white flex flex-col w-full items-center justify-between pt-8 md:pt-14">
      <div className="relative z-10 pt-4 lg:pt-12 min-h-[35vh] md:min-h-[60vh] w-full flex flex-col md:flex-row items-center justify-end gap-4 md:gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans leading-tight text-foreground">
              Accelerate Your Growth
            </h1>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg sm:text-xl lg:text-2xl text-secondary text-center md:text-left max-w-lg">
              $10M+ in rewards distributed through active incentives
            </h2>
          </div>
          
      </div>

      {/* Icon Belt */}
      <div className="relative z-10 w-full mb-20">
        <IconBelt
          items={[...trustedCompanies].map((company, i) => (
            <a
              key={i}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-block w-10 h-10 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px]"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
          speed={100}
          direction="left"
          gapClassName="gap-[60px] md:gap-[180px]"
          repeatCount={6}
          pauseOnHover={true}
          className="py-3"
        />
      </div>

      <section className="relative z-10 bg-card w-full p-16 rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">
        <div className="max-w-6xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image src="logos/LogoPurple.svg" alt="Torque logo" width={32} height={32} />
            </div>

            {/* Headline */}
            <h2 className="text-center text-secondary text-lg leading-relaxed mx-auto mb-12">
              We build the operating systems to handle your incentives—from set-up to distribution and analytics—powered by
              Torque Intelligence.
            </h2>

            {/* Dashed Divider */}
            <div className="border-t border-dashed border-secondary-foreground mb-16" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-secondary text-2xl font-mono font-semibold mb-3">$10,000,000</div>
                <div className="text-secondary text-base">Rewards Distributed</div>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-secondary text-2xl font-mono font-semibold mb-3">250,000</div>
                <div className="text-secondary text-base">Solana&apos;s Top Users</div>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-secondary text-2xl font-mono font-semibold mb-3">300+</div>
                <div className="text-secondary text-base">Campaigns (Tokens, Protocols, Platforms)</div>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Hero;
