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
            width: 800,
            height: 800,
            opacity: 1,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/bg-hexagon.svg"
            alt="Background hexagon"
            width={800}
            height={800}
            className="w-full h-full"
          />
        </motion.div>

        {/* Counter-clockwise rotating hexagon */}
        <motion.div
          className="absolute"
          style={{
            width: 800,
            height: 800,
            opacity: 1,
            left: "50%",
            paddingTop: 300,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/bg-hexagon.svg"
            alt="Background hexagon"
            width={800}
            height={800}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

