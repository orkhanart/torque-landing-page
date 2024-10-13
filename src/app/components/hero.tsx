"use client";

import React from "react";
import { CustomButton } from "@/components/ui/customButton";
import { motion, useAnimation } from "framer-motion";
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

const Hero = () => {
  const titleText = "The growth protocol";
  const controls = useAnimation();

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.02 * i },
    }),
  };

  const titleChild = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
    },
  };

  const subtitleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
        <motion.h1
          className="sm:text-[56px] text-6xl lg:text-8xl font-semibold sm:mb-8 mb-4 font-sans leading-tight"
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => controls.start("visible")}
        >
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={titleChild}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          className="md:text-2xl sm:text-lg text-base sm:mb-8 mb-6 text-gray-300 flex flex-wrap justify-center items-center"
          variants={subtitleContainer}
          initial="hidden"
          animate={controls}
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
          <motion.span
            variants={subtitleChild}
            className="whitespace-nowrap mr-2 mb-2"
          >
            in seconds
          </motion.span>
        </motion.div>
        <CustomButton customVariant="big">Try out Torque</CustomButton>
      </div>

      <div className="absolute bottom-0 z-10 flex flex-col w-full items-center md:mt-0 mt-24">
        <Divider />
      </div>
    </div>
  );
};

export default Hero;
