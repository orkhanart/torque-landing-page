"use client";

import { Card } from "@/components/ui/card";
import { RotatingHexagons } from "./RotatingHexagons";
import Image from "next/image";
import { Trophy } from "lucide-react";

export default function About() {
  return (
    <div className="relative min-h-screen">
      {/* Background Hexagons */}
      <RotatingHexagons />

      {/* Header Section - Full Width */}
      <div className="relative z-10 pt-4 lg:pt-12 min-h-[60vh] w-full flex flex-col md:flex-row items-end justify-end gap-0">
        <div className="w-full md:w-1/2 text-center md:text-left bg-card h-48 sm:h-52 md:h-52 px-6 sm:px-12 md:pl-28 md:pr-8 lg:pr-16 flex items-center justify-start hidden md:flex">
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-sans leading-tight text-foreground">
            About Torque
          </h1>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left bg-white/20 backdrop-blur-md h-48 sm:h-52 md:h-52 px-6 sm:px-12 md:px-8 lg:pr-20 flex items-center md:justify-start md:flex-row flex-col justify-center gap-4">
          <h1 className="text-3xl sm:text-3xl md:text-6xl font-sans leading-tight text-foreground md:hidden">
            About Torque
          </h1>
          <h2 className="text-xl md:text-3xl text-foreground text-center md:text-left max-w-lg mx-auto md:mx-0">
            Torque Powers Growth for On-Chain Ecosystems
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full pb-16 md:pb-32 mt-16 md:mt-24">
        {/* Full Width Content Card */}
        <Card className="bg-card backdrop-blur-md py-12 md:py-16" style={{ borderRadius: '0', overflow: 'hidden' }}>
          <div className="flex flex-col md:flex-row w-full md:gap-0 gap-10">
            {/* Left Half - Text Content */}
            <div className="w-full md:w-1/2 flex items-center justify-start px-6 sm:px-12 md:pl-28 md:pr-8 lg:pr-16">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Growth Through Smart Incentives
                </h2>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Torque is the engine of growth for companies building on Solana — a unified platform that brings analytics, CRM, and smart on-chain incentives together. It helps teams explore and understand their on-chain data, uncover insights about user behavior, and identify what drives engagement. With Torque Intelligence, businesses can segment audiences, measure performance, and surface new growth opportunities. Teams can then strategically deploy incentive campaigns that reward meaningful actions and accelerate ecosystem activity.
                  
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                By turning blockchain data into strategy, Torque transforms on-chain participation into measurable, sustainable growth.

                </p>
              </div>
            </div>

            {/* Right Half - Image */}
            <div className="w-full md:w-1/2 flex items-center justify-start px-6 sm:px-12 md:pl-8 md:pr-8 lg:pr-20">
              <Image
                src="/about-image.svg"
                alt="About Torque illustration"
                width={600}
                height={600}
                className="w-full max-w-lg"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="relative z-10 w-full pb-16 md:pb-24">

        {/* Awards Section */}
        <div className="pb-16 md:pb-24 px-6 sm:px-12 md:px-28">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12">
            Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Metaplex Award */}
            <Card className="p-8 bg-card backdrop-blur-sm border-2 border-[#FFD700] hover:shadow-xl transition-shadow" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
              <Image src="/metaplex-chack.svg" alt="Metaplex cHack Hackathon" width={150} height={150} className="mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Metaplex cHack Hackathon
              </h3>
              <p className="text-lg text-secondary font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Winner
              </p>
            </Card>

            {/* Colosseum Award */}
            <Card className="p-8 bg-card backdrop-blur-sm border-2 border-[#C0C0C0] hover:shadow-xl transition-shadow" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
              <Image src="/colosseum.svg" alt="Colosseum Infrastructure Track Hackathon" width={150} height={150} className="mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Colosseum Infrastructure Track Hackathon
              </h3>
              <p className="text-lg text-secondary font-medium flex items-center gap-2">
                2nd Place
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}