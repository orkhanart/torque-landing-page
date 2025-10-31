"use client";

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
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${getGradientClass()}`} />
      )}
      {title && (
        <div className={`absolute inset-0 flex flex-col justify-${titlePosition === "top" ? "start" : "end"} p-8`}>
          <h3 
            className="text-3xl md:text-4xl lg:text-5xl z-10"
            style={{ color: "#F5F5F5" }}
          >
            {title}
          </h3>
        </div>
      )}
      {description && (
        <div 
          className={`absolute inset-x-0 px-8 transition-transform duration-700 ease-in-out ${
            slideDirection === "bottom" 
              ? "bottom-0 translate-y-[calc(100%+80px)] group-hover:translate-y-0" 
              : "top-0 -translate-y-[calc(100%+80px)] group-hover:translate-y-0"
          }`}
          style={{
            [slideDirection === "bottom" ? "bottom" : "top"]: "40px"
          }}
        >
          <p 
            className="text-lg md:text-xl lg:text-2xl z-10 leading-relaxed"
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
      className="group relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center p-8 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: "#1a1a2e",
        background: "linear-gradient(212deg, rgba(104, 171, 249, 0.00) 0%, rgba(61, 101, 147, 0.25) 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Title - visible by default, fades out on hover */}
      <h3 
        className="flex-1 transition-opacity duration-700 ease-in-out group-hover:opacity-0 absolute inset-0 flex items-center justify-center p-8"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "56px",
          fontWeight: 400,
          lineHeight: "64px",
          background: "linear-gradient(91deg, #888694 -11.8%, #ECECEF 43.8%, #68ABF9 114.03%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Torque
        <br />
        Intelligence
      </h3>
      
      {/* Description - hidden by default, fades in on hover */}
      <p 
        className="flex-1 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 text-lg md:text-xl lg:text-2xl leading-relaxed"
        style={{ color: "#F5F5F5" }}
      >
        AI-powered recommendations that analyze performance and suggest campaign improvements in real-time.
      </p>
    </div>
  );
}

export function PlatformFeatures() {
  return (
    <main className="py-8 md:py-16">
      <p className="text-secondary text-sm md:text-base mb-2 md:mb-4">What makes us different</p>
      <h2 className="text-foreground text-2xl md:text-[40px]">Features</h2>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mt-6 md:mt-10" style={{ height: "800px" }}>
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-10 flex-1">
          {/* Smart Incentive */}
          <div className="flex-1">
            <FeatureCard
              image="/Incentive.png"
              alt="Smart Incentives"
              title="Smart Incentive"
              description="Intelligent incentive programs that automatically reward users for verifiable on-chain actions."
              gradientType="blue"
              titlePosition="top"
              slideDirection="bottom"
            />
          </div>

          {/* Campaigns */}
          <div className="flex-1">
            <FeatureCard
              image="/Campaign.png"
              alt="Instant Campaigns"
              title="Campaigns"
              description="Launch sophisticated incentive in minutes with our intuitive no-code builder."
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
