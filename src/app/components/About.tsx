"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RotatingHexagons } from "./RotatingHexagons";

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
      <div className="relative z-10 container mx-auto py-16 md:py-28">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-16 md:pb-32 px-4 md:px-6 lg:px-8 mx-auto max-w-[1600px]">
          {/* Left Column - Text Content */}
          <Card className="space-y-6 p-6 bg-white/20 backdrop-blur-md px-6 md:px-12 py-12 md:py-12" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Growth Through Smart Incentives
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Torque helps teams on Solana design, deploy, and optimize smart on-chain incentives — turning user actions into measurable growth.
                We make it simple to launch reward programs that drive trading, liquidity, and product engagement, all verified directly on-chain.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 mt-8">
                How it works
              </h3>
              <p className="font-semibold mb-2">Design incentives that scale</p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Use Torque’s modular system to define any audience — from traders and liquidity providers to builders and holders. Create dynamic reward logic using SQL-based audience queries powered by indexed on-chain data.
              </p>

              <p className="font-semibold mb-2 mt-7">Fund and launch with confidence</p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Allocate budgets transparently and fund campaigns directly from your wallet. All incentives are deployed as verifiable smart contracts, ensuring trust and full visibility across every transaction.
              </p>

              <p className="font-semibold mb-2 mt-7">Optimize with intelligence</p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Torque Intelligence monitors performance, answers analytics questions, and automatically recommends improvements — so you can scale what works, faster.
              </p>
            </div>
          </Card>

          {/* Right Column - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto">
            <Card className="p-6 bg-card backdrop-blur-sm h-64" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
              <CardDescription className="font-mono">
                FUNDING              
              </CardDescription>
              <CardTitle className="text-7xl md:text-7xl font-bold text-foreground mb-0 font-mono">
                $3M
              </CardTitle>
              <CardDescription>
                Led by x
              </CardDescription>
              
            </Card>
            <Card className="p-6 bg-card backdrop-blur-sm h-64" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
              <CardDescription className="font-mono">
                TEAM              
              </CardDescription>
              <CardTitle className="text-7xl md:text-7xl font-bold text-foreground mb-0 font-mono">
                8
              </CardTitle>
              <CardDescription>
                Seasoned builders.
              </CardDescription>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card border border-border/20 py-16 md:py-20 px-8 md:px-12 text-center mb-16 md:mb-24" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Vision
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
            We believe growth should be transparent, data-driven, and on-chain. Torque empowers ecosystems to evolve beyond speculation — by rewarding real contributions, real users, and real activity.
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
            <Card className="p-8 bg-card backdrop-blur-sm border-2 border-[#FFD700] hover:shadow-xl transition-shadow" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
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
            <Card className="p-8 bg-card backdrop-blur-sm border-2 border-[#C0C0C0] hover:shadow-xl transition-shadow" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
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
  );
}