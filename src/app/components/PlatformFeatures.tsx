"use client";

import { SectionTitle } from "./SectionTitle";
import { GeometricCard } from "./GeometricCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Leaderboards",
    description:
      "Instantly create dynamic, real-time leaderboards to spark competition and engagement.",
  },
  {
    title: "Raffles",
    description:
      "Effortlessly run randomized reward giveaways to boost user growth and retention.",
  },
  {
    title: "Airdrops",
    description:
      "Distribute rewards instantly to your best users without ATA fees or hassle.",
  },
  {
    title: "Rebates",
    description:
      "Easily launch rebate and loyalty programs to reward and retain your community.",
  },
];

const videoTitle = "Flexible rewards system using a no-code interface";

const titleParts = [
  {
    text: "Enabling protocols to user their tokens as",
  },
  {
    text: "fuel for growth,",
    gradient: true,
  },
  {
    text: "by launching and iterating on",
  },
  {
    text: "large-scale incentive campaigns.",
    gradient: true,
  },
];

export function PlatformFeatures({ className }: { className?: string }) {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.9]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.8]
  );

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <SectionTitle title={titleParts} className="mb-20" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-32">
        {features.map((feature) => (
          <GeometricCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <SectionTitle title={videoTitle} className="mb-20" />
      <div className="w-full flex justify-center mb-20" ref={videoRef}>
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl shadow-lg max-w-[1200px] w-full h-auto"
          preload="metadata"
          style={{ scale, opacity }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <source src="/flowchart-builder.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </div>
    </div>
  );
}
