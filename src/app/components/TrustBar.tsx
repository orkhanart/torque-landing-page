"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const logos = [
  { name: "Solana", src: "/logos/solana.svg" },
  { name: "Raydium", src: "/logos/raydium.svg" },
  { name: "Metaplex", src: "/logos/metaplex.svg" },
  { name: "Darklake", src: "/logos/darklake.svg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function TrustBar({ trailing }: { trailing?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-8 overflow-hidden bg-transparent">
      <div className="w-full" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-wider text-black/40 mb-8"
        >
          Trusted by leading protocols
        </motion.p>

        {/* Animated logos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-8 md:gap-12"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              variants={itemVariants}
              className="h-14 flex items-center justify-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105 transition-all duration-300 group"
              style={{
                transform: `translateY(${index % 2 === 0 ? 0 : 0}px)`,
              }}
              whileHover={{
                scale: 1.05,
                filter: "grayscale(0%)",
                opacity: 1,
              }}
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={160}
                height={56}
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,0,255,0.3)]"
              />
            </motion.div>
          ))}
          {trailing}
        </motion.div>
      </div>
    </section>
  );
}
