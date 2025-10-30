"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/custom-button";
import { ContactModal } from "./ContactModal";
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
  const [showModal, setShowModal] = useState(false);
  const titleText = "Accelerate Your Growth";

  return (
    <div className="relative text-white flex flex-col w-full items-center justify-between pt-8 md:pt-14">
      <div className="relative z-10 text-center sm:px-6 lg:px-8 lg:pt-12 sm:pt-4 pt-0 min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="sm:text-[56px] text-6xl lg:text-8xl sm:mb-6 mb-4 font-sans leading-tight text-foreground">
          {titleText}
        </h1>
        <div className="md:text-2xl sm:text-lg text-base sm:mb-8 mb-6 text-secondary text-center">
          Smart Incentives. Real Outcomes.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CustomButton buttonSize="big" buttonColor="secondary" href="#features">
            Watch 90s Overview
          </CustomButton>
          <CustomButton buttonSize="big" buttonColor="primary" href="https://platform.torque.so/">
            Launch Platform
          </CustomButton>
        </div>
        {/* Stat Cards */}
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
              className="flex-shrink-0 inline-block w-10 h-10 sm:w-14 sm:h-14 md:w-[50px] md:h-[50px]"
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
          gapClassName="gap-[50px] md:gap-[90px]"
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


      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Hero;
