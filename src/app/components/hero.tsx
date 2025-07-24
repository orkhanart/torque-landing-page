"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/customButton";
import { motion } from "framer-motion";
import { SelectBadge } from "@/components/ui/selectBadge";
import { ContactModal } from "./ContactModal";

const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background:
          "linear-gradient(to right, transparent, hsla(198, 100%, 60%, 0.5) 10%, hsla(198, 100%, 60%, 0.5) 70%, transparent)",
        backgroundImage:
          "linear-gradient(to right, hsla(198, 100%, 60%, 0.4) 16.67%, rgba(255,255,255,0) 0%)",
        backgroundPosition: "center",
        backgroundSize: "60px 1px",
        backgroundRepeat: "repeat-x",
        margin: "",
        maskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    />
  );
};

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
  // { name: "Drift", logo: "/logos/drift-grey.png", width: 100, height: 50 },
  {
    name: "Tensor",
    logo: "/logos/tensor.png",
    width: 145,
    height: 59,
    url: "https://tensor.so",
  },
  // { name: "AssetDash", logo: "/logos/assetdash.png", width: 130, height: 40 },
  {
    name: "MonkeDao",
    logo: "/logos/md.png",
    width: 75,
    height: 45,
    url: "https://monkedao.io/",
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
  {
    name: "Advancit",
    logo: "/logos/advancit.png",
    width: 100,
    height: 60,
    url: "https://www.advancitcapital.com/",
  },
];

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [tradingVolume, setTradingVolume] = useState(0);
  const [campaigns, setCampaigns] = useState(0);
  const titleText = "Solana's Incentive Protocol";

  const subtitleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const subtitleChild = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  // Helper function to format trading volume
  const formatTradingVolume = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    } else {
      return `$${value}M`;
    }
  };

  useEffect(() => {
    const animateNumbers = () => {
      // Animate Trading Volume to 3500 (which represents 3.5B)
      const tradingInterval = setInterval(() => {
        setTradingVolume((prev) => {
          if (prev >= 3500) return 3500;
          return prev + 30;
        });
      }, 15);

      // Animate Campaigns (300)
      const campaignsInterval = setInterval(() => {
        setCampaigns((prev) => {
          if (prev >= 300) return 300;
          return prev + 3;
        });
      }, 15);

      return () => {
        clearInterval(tradingInterval);
        clearInterval(campaignsInterval);
      };
    };

    // Start animation when component mounts
    const timeout = setTimeout(animateNumbers, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative text-white flex flex-col w-full items-center justify-between pt-8 md:pt-14">
      <div className="text-center sm:px-6 lg:px-8 lg:pt-12 sm:pt-4 pt-0 min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="sm:text-[56px] text-6xl lg:text-8xl font-semibold sm:mb-8 mb-4 font-sans leading-tight">
          {titleText}
        </h1>
        <div className="md:text-2xl sm:text-lg text-base sm:mb-8 mb-6 text-gray-300 flex flex-wrap justify-center items-center">
          <span className="whitespace-nowrap mr-2 mb-2">
            Incentivize any user for any action in{" "}
          </span>
          <span className="whitespace-nowrap mr-2 mb-2 text-[#A1FFFF] font-semibold">
            seconds
          </span>
        </div>

        <CustomButton customVariant="big" onClick={() => setShowModal(true)}>
          Request Access
        </CustomButton>

        {/* Stat Cards */}
      </div>

      <div className="w-full mt-8 space-y-4">
        <div className="relative mb-8">
          <div className="backdrop-blur-sm bg-black/20 border border-white/10">
            {/* Border accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 via-white to-red-500"></div>
            <div className="absolute top-0 left-0 bottom-0 h-full w-[1px] bg-gradient-to-b from-cyan-400 via-white to-red-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-500 via-white to-cyan-400"></div>
            <div className="absolute top-0 right-0 bottom-0 h-full w-[1px] bg-gradient-to-b to-cyan-400 via-white from-red-500"></div>

            <div className="p-6 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
                {/* Component 1 - Trading Volume */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="text-5xl md:text-7xl font-black text-cyan-400 tracking-tight mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {formatTradingVolume(tradingVolume)}+
                  </motion.div>
                  <div className="text-xl md:text-2xl font-medium text-white">
                    Trading Volume
                  </div>
                </motion.div>

                {/* Component 2 - Campaigns */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.div
                    className="text-5xl md:text-7xl font-black text-red-500 tracking-tight mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {campaigns}+
                  </motion.div>
                  <div className="text-xl md:text-2xl font-medium text-white">
                    Campaigns
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-lg font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                GENERATED ACROSS THE SOLANA ECOSYSTEM
              </motion.div>
            </div>
          </div>
        </div>

        {/* Customers & Audit Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="backdrop-blur-sm bg-black/20 px-8 pt-8 pb-6 border border-[#A1FFFF]/20 relative">
            <div className="absolute top-0 left-0 bottom-0 h-full w-2 bg-[#A1FFFF] "></div>
            <h3 className="text-[#A1FFFF] text-xl font-semibold mb-4 text-left uppercase">
              Trusted By
            </h3>
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-8 lg:gap-4 2xl:gap-8 items-center justify-center">
              {trustedCompanies.map((company, index) => (
                <div
                  key={index}
                  className={`logo-placeholder flex items-center justify-center ${
                    company.name === 'MonkeDao' ? 'ml-[-20px] md:ml-[-40px] lg:ml-[-20px] 2xl:ml-[-40px]' : ''
                  }`}
                  style={{ minHeight: "65px" }}
                >
                  {company.logo ? (
                    company.url ? (
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all duration-300 hover:drop-shadow-[0_0_8px_#A1FFFF] hover:brightness-110"
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={company.width}
                          height={company.height}
                          objectFit="contain"
                          priority={index < 2}
                        />
                      </a>
                    ) : (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={company.width}
                        height={company.height}
                        objectFit="contain"
                        priority={index < 2}
                      />
                    )
                  ) : (
                    <span className="text-gray-300 text-lg">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-sm bg-black/20 px-8 pt-8 pb-6 border border-[#A1FFFF]/20 relative">
            <div className="absolute top-0 right-0 bottom-0 h-full w-2 bg-red-500 "></div>
            <h3 className="text-red-500 text-xl font-semibold mb-4 text-right uppercase">
              Backed By
            </h3>
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-8 lg:gap-4 2xl:gap-8 items-center justify-center">
              {backers.map((company, index) => (
                <div
                  key={index}
                  className="logo-placeholder flex items-center justify-center"
                  style={{ minHeight: "80px" }}
                >
                  {company.logo ? (
                    company.url ? (
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all duration-300 hover:drop-shadow-[0_0_8px_#ef4444] hover:brightness-110"
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={company.width}
                          height={company.height}
                          style={{
                            maxWidth: "150px",
                            maxHeight: "80px",
                            width: "auto",
                            height: "auto",
                          }}
                          objectFit="contain"
                        />
                      </a>
                    ) : (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={company.width}
                        height={company.height}
                        style={{
                          maxWidth: "150px",
                          maxHeight: "80px",
                          width: "auto",
                          height: "auto",
                        }}
                        objectFit="contain"
                      />
                    )
                  ) : (
                    <span className="text-gray-300 text-lg">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-center mt-16">
        <Divider />
      </div>

      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Hero;
