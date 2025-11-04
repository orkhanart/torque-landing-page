"use client";
import { CustomButton } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { RotatingHexagons } from "./RotatingHexagons";
import Link from "next/link";

export default function About() {
  return (
    <div className="relative min-h-screen">
      {/* Background Hexagons */}
      <RotatingHexagons />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px]">
        {/* Header Section */}
        <div className="pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              About Torque
            </h1>
            <div className="flex gap-4 md:gap-6">
              <Link 
                href="#mission" 
                className="text-primary hover:text-primary-hover transition-colors text-base md:text-lg font-medium"
              >
                Lorem Ipsum.
              </Link>
              <Link 
                href="#vision" 
                className="text-primary hover:text-primary-hover transition-colors text-base md:text-lg font-medium"
              >
                Lorem Ipsum.
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-16 md:pb-24">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
                vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo 
                aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum 
                egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel 
                class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-card backdrop-blur-sm border border-border/20 rounded-lg">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Lorem
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </Card>
            <Card className="p-6 bg-card backdrop-blur-sm border border-border/20 rounded-lg">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Lorem
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-lg py-16 md:py-20 px-8 md:px-12 text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Lorem Ipsum.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
            vitae pellentesque sem placerat.
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
  );
}
