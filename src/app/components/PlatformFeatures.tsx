"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface FeatureCardProps {
  image: string;
  alt: string;
  title?: string;
  description?: string;
  gradientType?: "blue" | "black" | "none";
  titlePosition?: "top" | "bottom";
  slideDirection?: "top" | "bottom";
}

function FeatureCard({ 
  image, 
  alt, 
  title, 
  description,
  gradientType = "none", 
  titlePosition = "top",
  slideDirection = "bottom"
}: FeatureCardProps) {
  const getGradientClass = () => {
    if (gradientType === "blue") {
      return "bg-gradient-to-b from-[hsla(212,41%,41%,1)] to-[hsla(212,92%,69%,0)] group-hover:from-[hsla(212,41%,41%,1)] group-hover:to-[hsla(212,15%,10%,0.6)]";
    } else if (gradientType === "black") {
      return "bg-gradient-to-b from-black/80 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/70";
    }
    return "";
  };

  return (
    <div className="group relative w-full h-full rounded-xl overflow-hidden">
      <Image 
        src={image} 
        alt={alt} 
        fill
        className="object-cover"
      />
      {gradientType !== "none" && (
        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${getGradientClass()}`} />
      )}
      {title && (
        <div className={`absolute inset-0 flex flex-col justify-start ${titlePosition === "bottom" ? "md:justify-end" : ""} p-6 md:p-8`}>
          <h3 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
            style={{ 
              color: "#F5F5F5"
            }}
          >
            {title}
          </h3>
        </div>
      )}
      {description && (
        <div 
          className="absolute inset-0 flex px-6 md:px-8 py-6 md:py-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
          <p 
            className="text-xl md:text-xl lg:text-2xl xl:text-3xl z-10 leading-relaxed "
            style={{ color: "#F5F5F5" }}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

function IntelligenceCard() {
  return (
    <div 
      className="group relative w-full h-full rounded-xl overflow-hidden flex items-start justify-start p-4 md:p-8"
      style={{
        backgroundColor: "#0a0a15",
        background: "linear-gradient(212deg, rgb(22, 46, 74) 0%, rgb(26, 31, 36) 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Title - visible by default, fades out on hover */}
      <h3 
        className="flex-1 transition-opacity duration-300 ease-in-out group-hover:opacity-0 absolute inset-0 flex justify-start p-6 md:p-8 text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-tight md:leading-[64px]"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 400,
          background: "linear-gradient(91deg, #888694 -11.8%, #ECECEF 43.8%, #68ABF9 114.03%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Torque
        <br />
        Intelligence
      </h3>
      
      {/* Description - hidden by default, fades in on hover */}
      <p 
        className="flex-1 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 text-xl md:text-xl lg:text-2xl xl:text-3xl leading-relaxed"
        style={{ 
          color: "#F5F5F5"
        }}
      >
        AI-powered recommendations that analyze performance and suggest incentive improvements.
      </p>
    </div>
  );
}

export function PlatformFeatures() {
  return (
    <main className="py-8 md:py-16">
      <p className="text-secondary text-sm md:text-base mb-2 md:mb-4">What makes us different</p>
      <h2 className="text-foreground text-2xl md:text-[40px]">Features</h2>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mt-6 md:mt-10" style={{ height: "1150px" }}>
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-10 flex-1">
          {/* Smart Incentive */}
          <div className="flex-1">
            <FeatureCard
              image="/Incentive.png"
              alt="Product and Token CRM"
              title="Product and Token CRM"
              description="Dive into your product and token data to understand your user segments."
              gradientType="blue"
              titlePosition="top"
              slideDirection="bottom"
            />
          </div>

          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 !bg-black">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4 text-white">
                <span className="text-xl md:text-3xl font-medium">In-Product Reward Engine</span>

              </CardTitle>
              <CardDescription className="text-sm md:text-base text-white">
              With our embedded rewards system, you can effortlessly create targeted campaigns, identify key contributors, and distribute rewards, all within a few clicks.              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-5">
                <Image src="/leaderboard-feature.svg" alt="Explore data visualization" width={840} height={800} className="w-full h-auto" />
            </CardContent>
          </Card>

          {/* Campaigns */}
          <div className="flex-1">
            <FeatureCard
              image="/Campaign.png"
              alt="Smart Incentives"
              title="Smart Incentives"
              description="Intelligent incentive programs that automatically reward users for verifiable on-chain actions."
              gradientType="black"
              titlePosition="bottom"
              slideDirection="top"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 md:gap-10 flex-1">
          {/* Intelligence - smaller height */}
          <div style={{ height: "160px" }}>
            <IntelligenceCard />
          </div>

          {/* Analytics */}
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-primary/5 relative">
            <Image 
              src="/feature-analytics.svg" 
              alt="Analytics Dashboard" 
              width={524}
              height={328}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-start max-w-sm">
              <h3 className="text-white text-xl md:text-3xl font-medium mb-2 md:mb-4">
                Move Faster with data-driven decisions
              </h3>
              <p className="text-sm md:text-base text-gray-300 max-w-md">
                Stop relying on hunches, pieces of information, or outdated data. Torque helps you diving into real on-chain data, and drive consistent, scalable results.
              </p>
            </div>
          </div>

          {/* No-code - grows to fill remaining space */}
          <div className="flex-1">
            <FeatureCard
              image="/No-code.png"
              alt="No-code Deployment"
              title="No-code Deployment"
              description="Build powerful incentive programs with our visual interface. No code required."
              gradientType="black"
              titlePosition="bottom"
              slideDirection="top"
            />  
          </div>
        </div>
      </div>
    </main>
  );
}
