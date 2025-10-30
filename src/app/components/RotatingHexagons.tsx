"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const RotatingHexagons = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="relative w-full h-full flex justify-between items-start">
        {/* Clockwise rotating hexagon */}
        <motion.div
          className="absolute"
          style={{
            width: 2000,
            height: 2000,
            opacity: 0.1,
            left: -1000,
            top: -1000,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/bg-hexagon.svg"
            alt="Background hexagon"
            width={2000}
            height={2000}
            className="w-full h-full"
          />
        </motion.div>

        {/* Counter-clockwise rotating hexagon */}
        <motion.div
          className="absolute"
          style={{
            width: 2000,
            height: 2000,
            opacity: 0.1,
            left: 500,
            top: 200,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/bg-hexagon.svg"
            alt="Background hexagon"
            width={2000}
            height={2000}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

