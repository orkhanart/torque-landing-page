"use client";

import Image from "next/image";

interface FeatureCardProps {
  image: string;
  alt: string;
  title?: string;
  gradientType?: "blue" | "black" | "none";
  titlePosition?: "top" | "bottom";
}

function FeatureCard({ image, alt, title, gradientType = "none", titlePosition = "top" }: FeatureCardProps) {
  const getGradientClass = () => {
    if (gradientType === "blue") {
      return "bg-gradient-to-b from-[hsla(212,41%,41%,1)] to-[hsla(212,92%,69%,0)]";
    } else if (gradientType === "black") {
      return "bg-gradient-to-b from-black/80 via-black/40 to-transparent";
    }
    return "";
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <Image 
        src={image} 
        alt={alt} 
        fill
        className="object-cover"
      />
      {gradientType !== "none" && (
        <div className={`absolute inset-0 ${getGradientClass()}`} />
      )}
      {title && (
        <div className={`absolute inset-0 flex items-${titlePosition === "top" ? "start" : "end"} p-8`}>
          <h3 
            className="text-3xl md:text-4xl lg:text-5xl z-10"
            style={{ color: "#F5F5F5" }}
          >
            {title}
          </h3>
        </div>
      )}
    </div>
  );
}

function IntelligenceCard() {
  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center p-8"
      style={{
        backgroundColor: "#1a1a2e",
        background: "linear-gradient(212deg, rgba(104, 171, 249, 0.00) 0%, rgba(61, 101, 147, 0.25) 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      <h3 
        className="flex-1"
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
    </div>
  );
}

export function PlatformFeatures() {
  return (
    <main className="py-8 md:py-16">
      <p className="text-secondary text-sm md:text-base mb-2 md:mb-4">What makes us different</p>
      <h2 className="text-foreground text-2xl md:text-[40px]">Unique Features</h2>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mt-6 md:mt-10" style={{ height: "800px" }}>
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-10 flex-1">
          {/* Smart Incentive */}
          <div className="flex-1">
            <FeatureCard
              image="/Incentive.png"
              alt="Smart Incentives"
              title="Smart Incentive"
              gradientType="blue"
              titlePosition="top"
            />
          </div>

          {/* Campaigns */}
          <div className="flex-1">
            <FeatureCard
              image="/Campaign.png"
              alt="Instant Campaigns"
              title="Campaigns"
              gradientType="black"
              titlePosition="bottom"
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
              gradientType="black"
              titlePosition="bottom"
            />  
          </div>
        </div>
      </div>
    </main>
  );
}
