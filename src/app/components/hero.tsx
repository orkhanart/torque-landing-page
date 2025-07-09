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
    <div className="relative text-white min-h-[90vh] flex flex-col w-full items-center justify-between pt-14 px-4">
      <div className="text-center sm:px-6 lg:px-8 lg:pt-12 sm:pt-8 pt-0">
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
        {/* Stats Row */}
        <div className="bg-[#10181F]/80 border border-[#A1FFFF]/30 rounded-xl px-8 py-5 flex items-center justify-center backdrop-blur-md">
          <div className="text-lg text-gray-400 font-medium text-center">
            <span className="text-[#A1FFFF] font-bold text-2xl">220M+</span> in
            Trading Volume generated across{" "}
            <span className="text-[#F1A3A1] font-bold text-2xl">300+</span>{" "}
            campaigns
          </div>
        </div>

        {/* Customers & Audit Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 rounded-xl px-8 py-5">
            <h3 className="text-[#A1FFFF] text-lg font-medium mb-4 text-center">
              Trusted By
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {trustedCompanies.map((company, index) => (
                <div
                  key={index}
                  className="logo-placeholder flex items-center justify-center"
                  style={{ width: "120px", height: "65px" }}
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

          <div className="bg-black/40 rounded-xl px-8 py-5">
            <h3 className="text-[#F1A3A1] text-lg font-medium mb-4 text-center">
              Backed By
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {backers.map((company, index) => (
                <div
                  key={index}
                  className="logo-placeholder flex items-center justify-center"
                  style={{ width: "120px", height: "60px" }}
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

      <div className="absolute bottom-0 z-10 flex flex-col w-full items-center md:mt-0 mt-24">
        <Divider />
      </div>

      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Hero;
