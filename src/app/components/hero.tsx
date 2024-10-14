"use client";

import React from "react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/customButton";
import { motion } from "framer-motion";
import { SelectBadge } from "@/components/ui/selectBadge";

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
  { name: "Metaplex", logo: "/logos/metaplex.png", width: 158, height: 53 },
  { name: "Drift", logo: "/logos/drift-grey.png", width: 100, height: 50 },
  { name: "Tensor", logo: "/logos/tensor.png", width: 110, height: 45 },
  { name: "AssetDash", logo: "/logos/assetdash.png", width: 130, height: 40 },
  { name: "MonkeDao", logo: "/logos/md.png", width: 100, height: 60 },
];

const Hero = () => {
  const titleText = "The growth protocol";

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
            incentivize
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            <SelectBadge variant="blue">any user</SelectBadge>
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            for
          </motion.span>
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            <SelectBadge variant="red">any action</SelectBadge>
          </motion.span>
        </motion.div>
        <CustomButton customVariant="big" href="https://app.torque.so">
          Try out Torque
        </CustomButton>
      </div>

      <div className="trusted-by w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Trusted By</h2>
        <div className="logo-wall flex justify-center flex-wrap gap-8 items-center">
          {trustedCompanies.map((company, index) => (
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
                <span className="text-gray-300">{company.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 z-10 flex flex-col w-full items-center md:mt-0 mt-24">
        <Divider />
      </div>
    </div>
  );
};

export default Hero;
