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
    text: "Enabling top Solana protocols to use their tokens and points as",
  },
  {
    text: "fuel for growth,",
    gradient: true,
  },
  {
    text: "by launching",
  },
  {
    text: "smart incentive campaigns in seconds.",
    gradient: true,
  },
];

export function PlatformFeatures({ className }: { className?: string }) {
  const videoRef = useRef(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(features[0].video); // Start with first video
  const [activeFeature, setActiveFeature] = useState<string>("Leaderboards"); // Start with leaderboards active
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.7, 1, 0.9]);

  const handleFeatureClick = (feature: (typeof features)[0]) => {
    if (videoElementRef.current && feature.video !== currentVideo) {
      setVideoLoading(true);
      videoElementRef.current.src = feature.video;
      videoElementRef.current.load();
    }
    setCurrentVideo(feature.video);
    setActiveFeature(feature.title);
  };

  const handleFeatureHover = (feature: (typeof features)[0]) => {
    setHoveredFeature(feature.title);
    if (videoElementRef.current && feature.video !== currentVideo) {
      setVideoLoading(true);
      videoElementRef.current.src = feature.video;
      videoElementRef.current.load();
    }
    setCurrentVideo(feature.video);
    setActiveFeature(feature.title); // Make hovered feature the new active one
  };

  const handleFeatureLeave = () => {
    setHoveredFeature(null);
    // Keep the current video - don't revert
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <SectionTitle title={titleParts} className="mb-8" />
      
      {/* Flexible rewards system text */}
      <div className="text-center mb-12">
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Flexible rewards system with SDK-first architecture and no-code
          interface. No data indexing required.
        </p>
      </div>
      
      {/* Desktop: Horizontal layout with vertical cards and video */}
      <div className="hidden md:flex gap-8 w-full max-w-7xl mx-auto mb-20">
        {/* Right: Video */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-8">
            {/* Left: Vertical feature cards - vertically centered with video */}
            <div className="flex flex-col gap-3 w-64 flex-shrink-0">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  onClick={() => handleFeatureClick(feature)}
                  onMouseEnter={() => handleFeatureHover(feature)}
                  onMouseLeave={handleFeatureLeave}
                  className={`cursor-pointer transition-all duration-300 hover:scale-102 ${
                    activeFeature === feature.title
                      ? "ring-2 ring-primary shadow-lg shadow-primary/40 scale-105 bg-primary/10"
                      : hoveredFeature === feature.title
                      ? "ring-2 ring-primary ring-opacity-30 scale-102"
                      : ""
                  }`}
                >
                  <GeometricCard
                    title={feature.title}
                    description={feature.description}
                    isActive={activeFeature === feature.title}
                  />
                </div>
              ))}
            </div>
            
            {/* Video player */}
            <div className="flex justify-center flex-1 relative" ref={videoRef}>
              <motion.video
                ref={videoElementRef}
                autoPlay
                loop
                muted
                playsInline
                controls
                className={`rounded-xl shadow-lg w-full h-auto border border-primary/20 transition-opacity duration-300 ${
                  videoLoading ? "opacity-30" : "opacity-100"
                }`}
                preload="metadata"
                style={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={currentVideo}
                onLoadStart={() => setVideoLoading(true)}
                onCanPlay={() => setVideoLoading(false)}
                onError={() => setVideoLoading(false)}
              >
                Your browser does not support the video tag.
              </motion.video>
              
              {/* Video title badge */}
              {!videoLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
                >
                  <span className="text-sm font-medium text-white">
                    {activeFeature} Demo
                  </span>
                </motion.div>
              )}

              {/* Loading skeleton overlay */}
              {videoLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                    <p className="text-sm text-gray-300">Loading {activeFeature}...</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal cards above video */}
      <div className="md:hidden mb-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => handleFeatureClick(feature)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                activeFeature === feature.title
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/40 ring-1 ring-primary/50 scale-102"
                  : "border-gray-700 bg-black/20 hover:border-gray-600"
              }`}
            >
              <h3 className={`font-semibold text-sm mb-2 ${
                activeFeature === feature.title ? "text-primary" : "text-white"
              }`}>
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs leading-tight">
                {feature.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile: Keep original layout */}
      <div className="md:hidden w-full flex justify-center mb-20 relative">
        <motion.video
          ref={videoElementRef}
          autoPlay
          loop
          muted
          playsInline
          controls
          className={`rounded-xl shadow-lg w-full h-auto border border-primary/20 transition-opacity duration-300 ${
            videoLoading ? "opacity-30" : "opacity-100"
          }`}
          preload="metadata"
          style={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          src={currentVideo}
          onLoadStart={() => setVideoLoading(true)}
          onCanPlay={() => setVideoLoading(false)}
          onError={() => setVideoLoading(false)}
        >
          Your browser does not support the video tag.
        </motion.video>
        
        {/* Mobile: Video title badge */}
        {!videoLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
          >
            <span className="text-sm font-medium text-white">
              {activeFeature} Demo
            </span>
          </motion.div>
        )}

        {/* Mobile: Loading skeleton overlay */}
        {videoLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl backdrop-blur-sm"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
              <p className="text-sm text-gray-300">Loading {activeFeature}...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
