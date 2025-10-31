"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export const RotatingHexagons = () => {
  const [viewportWidth, setViewportWidth] = useState(0);
  
  // Base width where the design looks good (your current viewport)
  const BASE_WIDTH = 1680;

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === "undefined") return;

    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    // Set initial width
    updateViewportWidth();

    // Update on resize
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  // Calculate scale factor based on viewport width
  // Use BASE_WIDTH as fallback for SSR or initial render
  const scaleFactor = viewportWidth > 0 ? viewportWidth / BASE_WIDTH : 1;
  
  // Base dimensions and positions (values that look good at 1680px)
  const baseSize = 2000;
  const hexagon1 = {
    left: -1000,
    top: -1000,
  };
  const hexagon2 = {
    left: 500,
    top: 200,
  };

  // Apply scaling
  const scaledSize = baseSize * scaleFactor;
  const scaledHexagon1 = {
    left: hexagon1.left * scaleFactor,
    top: hexagon1.top * scaleFactor,
  };
  const scaledHexagon2 = {
    left: hexagon2.left * scaleFactor,
    top: hexagon2.top * scaleFactor,
  };
  
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="relative w-full h-full flex justify-between items-start">
        {/* Clockwise rotating hexagon */}
        <motion.div
          className="absolute"
          style={{
            width: scaledSize,
            height: scaledSize,
            opacity: 0.5,
            left: scaledHexagon1.left,
            top: scaledHexagon1.top,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/bg-hexagon.svg"
            alt="Background hexagon"
            width={scaledSize}
            height={scaledSize}
            className="w-full h-full"
          />
        </motion.div>

        {/* Counter-clockwise rotating hexagon */}
        <motion.div
          className="absolute"
          style={{
            width: scaledSize,
            height: scaledSize,
            opacity: 0.5,
            left: scaledHexagon2.left,
            top: scaledHexagon2.top,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/bg-hexagon.svg"
            alt="Background hexagon"
            width={scaledSize}
            height={scaledSize}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

