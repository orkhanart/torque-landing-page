"use client";

import { SectionTitle } from "./SectionTitle";
import { GeometricCard } from "./GeometricCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    title: "Leaderboards",
    description:
      "Ignite engagement with real-time, competitive leaderboards.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/leaderboards.mp4",
  },
  {
    title: "Raffles",
    description:
      "Run automated giveaways to attract and reward users.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/raffles.mp4",
  },
  {
    title: "Airdrops / Claims",
    description:
      "Deliver tokens and points to top users—automatically.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/airdrops.mp4",
  },
  {
    title: "Rebates",
    description:
      "Launch loyalty programs that reward activity and drive retention.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/rebates.mp4",
  },
];

const videoTitle = "Flexible rewards system using a no-code interface";

const titleParts = [
  {
    text: "Enabling protocols to use their tokens as",
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
  const [currentVideo, setCurrentVideo] = useState(features[0].video); // Start with first video
  const [activeFeature, setActiveFeature] = useState<string>("Leaderboards"); // Start with leaderboards active
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.9]);

  const handleFeatureClick = (feature: (typeof features)[0]) => {
    setCurrentVideo(feature.video);
    setActiveFeature(feature.title);
  };

  const handleFeatureHover = (feature: (typeof features)[0]) => {
    setHoveredFeature(feature.title);
    setCurrentVideo(feature.video);
    setActiveFeature(feature.title); // Make hovered feature the new active one
  };

  const handleFeatureLeave = () => {
    setHoveredFeature(null);
    // Keep the current video - don't revert
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <SectionTitle title={titleParts} className="mb-20" />
      {/* Desktop: Traditional card grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => handleFeatureClick(feature)}
            onMouseEnter={() => handleFeatureHover(feature)}
            onMouseLeave={handleFeatureLeave}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              activeFeature === feature.title
                ? "ring-2 ring-primary ring-opacity-50"
                : hoveredFeature === feature.title
                ? "ring-2 ring-primary ring-opacity-30"
                : ""
            }`}
          >
            <GeometricCard
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Text above video */}
      <div className="hidden md:block text-center mb-8">
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Flexible rewards system with SDK-first architecture and no-code
          interface. No data indexing required.
        </p>
      </div>

      {/* Mobile: Horizontal cards above video */}
      <div className="md:hidden mb-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => handleFeatureClick(feature)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                activeFeature === feature.title
                  ? "border-primary bg-primary/10"
                  : "border-gray-700 bg-black/20"
              }`}
            >
              <h3 className="text-white font-semibold text-sm mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs leading-tight">
                {feature.description}
              </p>
            </button>
          ))}
        </div>
        {/* Mobile: Text below cards */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Flexible rewards system with SDK-first architecture and no-code
            interface. No data indexing required.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center mb-20" ref={videoRef}>
        <motion.video
          key={currentVideo} // Force re-render when video changes
          autoPlay
          loop
          muted
          playsInline
          controls
          className="rounded-xl shadow-lg max-w-[1200px] w-full h-auto"
          preload="metadata"
          style={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </div>
    </div>
  );
}
