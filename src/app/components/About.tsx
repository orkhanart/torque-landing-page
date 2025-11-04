"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { RotatingHexagons } from "./RotatingHexagons";

export default function About() {
  return (
    <>
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
            The Growth Protocol for On-Chain Ecosystems
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-16 md:py-28">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-16 md:pb-32 px-4 md:px-6 lg:px-8 mx-auto max-w-[1400px]">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Empowering On-Chain Growth Through Intelligent Incentives
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Torque is revolutionizing how blockchain ecosystems grow by providing a comprehensive 
                platform for creating, managing, and optimizing incentive campaigns. Our no-code solution 
                enables protocols and DAOs to drive meaningful user engagement through targeted rewards, 
                detailed analytics, and AI-powered insights. Whether you&apos;re looking to bootstrap liquidity, 
                increase user adoption, or reward community participation, Torque provides the tools to 
                achieve your growth objectives efficiently and transparently.
              </p>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-card backdrop-blur-sm border border-border/20 rounded-lg">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                To accelerate blockchain adoption by making growth tools accessible, transparent, and effective for every protocol.
              </p>
            </Card>
            <Card className="p-6 bg-card backdrop-blur-sm border border-border/20 rounded-lg">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                A thriving on-chain ecosystem where growth is driven by smart incentives and data-driven decisions.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card border border-border/20 rounded-lg py-16 md:py-20 px-8 md:px-12 text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Grow Your Protocol?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join leading protocols using Torque to drive engagement, reward users, and scale their ecosystems 
            with powerful, data-driven incentive campaigns.
          </p>
          <CustomButton 
            buttonSize="big"
            buttonColor="primary"
            href="https://platform.torque.so/"
            className="shadow-[0px_0px_20px_0px_rgba(161,255,255,0.3)]"
          >
            Launch Platform
          </CustomButton>
        </div>

        {/* Awards Section */}
        <div className="pb-16 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12">
            Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Metaplex Award */}
            <Card className="p-8 bg-card backdrop-blur-sm border-2 border-[#FFD700] rounded-lg hover:shadow-xl transition-shadow">
              <div className="mb-6 inline-block bg-black px-4 py-2 rounded">
                <span className="text-[#14F195] font-mono font-bold text-lg">
                  {'>'}<span className="text-white">Metaplex cHack</span>
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Metaplex cHack Hackathon
              </h3>
              <p className="text-base text-secondary-foreground font-medium">
                Winner
              </p>
            </Card>

            {/* Colosseum Award */}
            <Card className="p-8 bg-card backdrop-blur-sm border-2 border-[#C0C0C0] rounded-lg hover:shadow-xl transition-shadow">
              <div className="mb-6 inline-block bg-black px-4 py-2 rounded">
                <span className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">⋮</span>
                  COLOSSEUM
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Colosseum Infrastructure Track Hackathon
              </h3>
              <p className="text-base text-secondary-foreground font-medium">
                2nd Place
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}