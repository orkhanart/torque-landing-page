"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { IconBelt } from "@/components/ui/icon-belt";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2,
  suffix = "",
  className = "" 
}) => {
  const count = useMotionValue(1);
  const rounded = useTransform(() => {
    const roundedValue = Math.round(count.get());
    return roundedValue.toLocaleString() + suffix;
  });

  useEffect(() => {
    const controls = animate(count, value, { 
      duration,
      ease: "easeOut" // Starts fast and slows down at the end
    });
    return () => controls.stop();
  }, [count, value, duration]);

  return <motion.span className={className}>{rounded}</motion.span>;
};

const trustedCompanies = [
  {
    name: "Solana",
    logo: "/logos/solana.svg",
    width: 200,
    height: 90,
    url: "https://solana.com",
  },
  {
    name: "Raydium",
    logo: "/logos/raydium.svg",
    width: 200,
    height: 90,
    url: "https://raydium.io",
  },
  {
    name: "Metaplex",
    logo: "/logos/metaplex.svg",
    width: 200,
    height: 90,
    url: "https://metaplex.com",
  },
  {
    name: "Darklake",
    logo: "/logos/darklake.svg",
    width: 200,
    height: 90,
    url: "https://www.darklake.fi",
  },
  {
    name: "Tensor",
    logo: "/logos/tensor.svg",
    width: 200,
    height: 90,
    url: "https://tensor.so",
  },
  {
    name: "Axiom",
    logo: "/logos/axiom.svg",
    width: 200,
    height: 90,
    url: "https://axiom.trade",
  },
  {
    name: "Portals",
    logo: "/logos/portals.svg",
    width: 250,
    height: 90,
    url: "https://theportal.to/",
  },
  {
    name: "USD1",
    logo: "/logos/usd1.svg",
    width: 150,
    height: 90,
    url: "https://worldlibertyfinancial.com/usd1",
  },
];

const Hero = () => {
  return (
    <div className="relative text-white flex flex-col w-full items-center justify-between pt-4 sm:pt-8 md:pt-14">
      <div className="relative z-10 pt-4 lg:pt-12 min-h-[60vh] md:min-h-[60vh] w-full flex flex-col md:flex-row items-end justify-end gap-0">
          <div className="w-full md:w-1/2 text-center md:text-left bg-card h-48 sm:h-52 md:h-52 px-6 sm:px-12 md:pl-28 md:pr-8 lg:pr-16 flex items-center justify-start invisible md:visible">
            <h1 className="text-3xl sm:text-3xl md:text-5xl  font-sans leading-tight text-foreground">
              Accelerate Your Growth.
            </h1>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left bg-white/20 backdrop-blur-md h-48 sm:h-52 md:h-52 px-6 sm:px-12 md:px-8 lg:pr-20 flex items-center md:justify-start md:flex-row flex-col justify-center gap-4">
            <h1 className="text-3xl sm:text-3xl md:text-6xl font-sans leading-tight text-foreground md:hidden">
              Accelerate Your Growth.
            </h1>
            <h2 className="text-xl md:text-3xl text-foreground text-center md:text-left max-w-lg mx-auto md:mx-0">
              Smart Incentives. <br></br>Real Results.
            </h2>
          </div>
          
      </div>

      {/* Icon Belt - No Background */}
      <div className="relative z-10 w-full py-8 md:py-12">
        <IconBelt
          items={[...trustedCompanies].map((company, i) => (
            <a
              key={i}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-block max-w-[120px] sm:max-w-[140px] md:max-w-none"
              style={{ width: `${company.width}px`, height: `${company.height}px` }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
          speed={250}
          direction="left"
          gapClassName="gap-[60px] md:gap-[180px]"
          repeatCount={6}
          pauseOnHover={true}
          className="py-3"
        />
      </div>

      {/* Card with "We build the operating systems..." section */}
      <div className="relative z-10 w-full container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-18 mt-6 md:mt-12">
        <div className="bg-card rounded-2xl shadow-2xl shadow-primary/10 p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Image src="logos/LogoPurple.svg" alt="Torque logo" width={40} height={40} className="w-8 h-8 md:w-12 md:h-12" />
          </div>

          {/* Headline */}
          <h2 className="text-center text-secondary text-base sm:text-lg leading-relaxed mx-auto mb-8 md:mb-12 px-4">
            We build the operating systems to handle your incentives—from set-up to distribution and analytics—powered by
            Torque Intelligence.
          </h2>

          {/* Dashed Divider */}
          <div className="border-t border-dashed border-secondary-foreground mb-8 md:mb-16" />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-secondary text-xl sm:text-2xl font-mono font-semibold mb-2 md:mb-3">
                $<AnimatedCounter value={10000000} duration={2.5} />
              </div>
              <div className="text-secondary text-sm sm:text-base">Rewards Distributed</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-secondary text-xl sm:text-2xl font-mono font-semibold mb-2 md:mb-3">
                <AnimatedCounter value={5} duration={2} suffix="x" />
              </div>
              <div className="text-secondary text-sm sm:text-base">Retention Rate</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-secondary text-xl sm:text-2xl font-mono font-semibold mb-2 md:mb-3">
                <AnimatedCounter value={9} duration={2} suffix="x" />
              </div>
              <div className="text-secondary text-sm sm:text-base">Power User Retention Rate</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
