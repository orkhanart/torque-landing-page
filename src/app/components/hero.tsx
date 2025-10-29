"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/customButton";
import { motion } from "framer-motion";
import { ContactModal } from "./ContactModal";

const trustedCompanies = [
  {
    name: "Raydium",
    logo: "/logos/raydium.png",
    width: 200,
    height: 80,
    url: "https://raydium.io",
  },
  {
    name: "Metaplex",
    logo: "/logos/metaplex.png",
    width: 210,
    height: 71,
    url: "https://metaplex.com",
  },
  {
    name: "Tensor",
    logo: "/logos/tensor.png",
    width: 145,
    height: 59,
    url: "https://tensor.so",
  },
];

const backers = [
  {
    name: "Sixth Man Ventures",
    logo: "/logos/6mv.png",
    width: 100,
    height: 60,
    url: "https://6thman.ventures/",
  },
  {
    name: "Solana Ventures",
    logo: "/logos/sv-white.png",
    width: 100,
    height: 60,
    url: "https://solana.ventures/",
  },
  {
    name: "Colosseum",
    logo: "/logos/colosseum.png",
    width: 100,
    height: 60,
    url: "https://www.colosseum.com/",
  },
];

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [tradingVolume, setTradingVolume] = useState(0);
  const [campaigns, setCampaigns] = useState(0);
  const [rewardsDistributed, setRewardsDistributed] = useState(0);
  const titleText = "Accelerate Your Growth";


  // Helper function to format trading volume
  const formatTradingVolume = (value: number) => {
    if (value >= 5000) {
      return `$5B`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    } else {
      return `$${value}M`;
    }
  };

  // Helper function to format rewards distributed
  const formatRewardsDistributed = (value: number) => {
    if (value >= 8000) {
      return `$8M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}M`;
    } else {
      return `$${Math.round(value)}K`;
    }
  };

  useEffect(() => {
    const animateNumbers = () => {
      // Animate Trading Volume to 5000 (which represents 5B)
      const tradingInterval = setInterval(() => {
        setTradingVolume((prev) => {
          if (prev >= 5000) return 5000;
          return prev + 30;
        });
      }, 15);

      // Animate Campaigns (400) - adjusted to finish in ~2000ms
      const campaignsInterval = setInterval(() => {
        setCampaigns((prev) => {
          if (prev >= 400) return 400;
          return prev + 10;
        });
      }, 60);

      // Animate Rewards Distributed (8000 which represents 8M) - adjusted to finish in ~2000ms
      const rewardsInterval = setInterval(() => {
        setRewardsDistributed((prev) => {
          if (prev >= 8000) return 8000;
          return prev + 50;
        });
      }, 16);

      return () => {
        clearInterval(tradingInterval);
        clearInterval(campaignsInterval);
        clearInterval(rewardsInterval);
      };
    };

    // Start animation when component mounts
    const timeout = setTimeout(animateNumbers, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative text-white flex flex-col w-full items-center justify-between pt-8 md:pt-14">
      <div className="text-center sm:px-6 lg:px-8 lg:pt-12 sm:pt-4 pt-0 min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center">
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
          <CustomButton buttonSize="big" buttonColor="primary" onClick={() => setShowModal(true)} asLink={false}>
            Launch Platform
          </CustomButton>
        </div>
        {/* Stat Cards */}
      </div>

      <section className="bg-card w-[1050px] p-16 rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">
        <div className="max-w-6xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image src="logos/LogoPurple.svg" alt="Torque logo" width={32} height={32} />
            </div>

            {/* Headline */}
            <h1 className="text-center text-secondary text-lg leading-relaxed mx-auto mb-12">
              We build the operating systems to handle your incentives—from set-up to distribution and analytics—powered by
              Torque Intelligence.
            </h1>

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
                <div className="text-secondary text-base">Solana's Top Users</div>
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
