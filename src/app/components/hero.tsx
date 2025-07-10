"use client";

import React, { useState } from "react";
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
  { name: "Raydium", logo: "/logos/raydium.png", width: 150, height: 60 },
  { name: "Metaplex", logo: "/logos/metaplex.png", width: 158, height: 53 },
  // { name: "Drift", logo: "/logos/drift-grey.png", width: 100, height: 50 },
  { name: "Tensor", logo: "/logos/tensor.png", width: 110, height: 45 },
  // { name: "AssetDash", logo: "/logos/assetdash.png", width: 130, height: 40 },
  { name: "MonkeDao", logo: "/logos/md.png", width: 100, height: 60 },
];

const backers = [
  { name: "6MV", logo: "/logos/6mv.png", width: 100, height: 60 },
  { name: "Solana Ventures", logo: "/logos/sv.png", width: 100, height: 60 },
  { name: "Colosseum", logo: "/logos/colosseum.png", width: 100, height: 60 },
  { name: "Advancit", logo: "/logos/advancit.png", width: 100, height: 60 },
];

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
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

  return (
    <div className="relative text-white flex flex-col w-full items-center justify-between pt-14">
      <div className="text-center sm:px-6 lg:px-8 lg:pt-12 sm:pt-8 pt-0 min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="sm:text-[56px] text-6xl lg:text-8xl font-semibold sm:mb-8 mb-4 font-sans leading-tight">
          {titleText}
        </h1>
        <motion.div
          className="md:text-2xl sm:text-lg text-base sm:mb-8 mb-6 text-gray-300 flex flex-wrap justify-center items-center"
          variants={subtitleContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            Incentivize
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2 text-[#A1FFFF]"
          >
            any user
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            for
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2 text-[#F1A3A1]"
          >
            any action
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            in seconds.
          </motion.span>
        </motion.div>

        <CustomButton customVariant="big" onClick={() => setShowModal(true)}>
          Request Access
        </CustomButton>

        {/* Stat Cards */}
      </div>

      <div className="w-full mt-12 space-y-4">
        <div className="relative mb-8">
          <div className="">
            {/* Border accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 via-white to-red-500"></div>
            <div className="absolute top-0 left-0 bottom-0 h-full w-[1px] bg-gradient-to-b from-cyan-400 via-white to-red-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-500 via-white to-cyan-400"></div>
            <div className="absolute top-0 right-0 bottom-0 h-full w-[1px] bg-gradient-to-b to-cyan-400 via-white from-red-500"></div>

            <div className="p-6 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16">
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-5xl font-black text-cyan-400 tracking-tight">
                    220M+
                  </span>
                  <span className="text-xl font-medium">Trading Volume</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-5xl font-black text-red-500 tracking-tight">
                    300+
                  </span>
                  <span className="text-xl font-medium">Campaigns</span>
                </div>
              </div>
              <div className="mt-6 text-lg font-medium tracking-wide">
                GENERATED ACROSS THE SOLANA ECOSYSTEM
              </div>
            </div>
          </div>
        </div>

        {/* Customers & Audit Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 px-8 pt-8 pb-6 border border-[#A1FFFF]/20 relative">
            <div className="absolute top-0 left-0 bottom-0 h-full w-2 bg-[#A1FFFF] "></div>
            <h3 className="text-[#A1FFFF] text-xl font-semibold mb-4 text-left uppercase">
              Trusted By
            </h3>
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-8 lg:gap-4 2xl:gap-8 items-center justify-center">
              {trustedCompanies.map((company, index) => (
                <div
                  key={index}
                  className=" overflow-hidden logo-placeholder flex items-center justify-center aspect-[120/65] object-contain object-center"
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={120}
                      height={65}
                      objectFit="contain"
                    />
                  ) : (
                    <span className="text-gray-300 text-lg">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 px-8 pt-8 pb-6 border border-[#A1FFFF]/20 relative">
            <div className="absolute top-0 right-0 bottom-0 h-full w-2 bg-red-500 "></div>
            <h3 className="text-red-500 text-xl font-semibold mb-4 text-right uppercase">
              Backed By
            </h3>
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-8 lg:gap-4 2xl:gap-8 items-center justify-center">
              {backers.map((company, index) => (
                <div
                  key={index}
                  className=" overflow-hidden logo-placeholder flex items-center justify-center aspect-[120/65] object-contain object-center"
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={company.width}
                      height={company.height}
                      objectFit="contain"
                    />
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
