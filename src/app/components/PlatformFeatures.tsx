"use client";

import { SmartImage } from "@/components/ascii/SmartImage";
import { GlassCard } from "@/components/ui/glass-card";
import { platformFeatures } from "@/app/content/platform-features";

interface FeatureCardProps {
  image: string;
  alt: string;
  title?: string;
  description?: string;
}

function FeatureCard({ image, alt, title, description }: FeatureCardProps) {
  return (
    <GlassCard
      glow={true}
      scale={false}
      border="subtle"
      padding="none"
      blur={true}
      className="h-full"
    >
      <div className="group relative w-full h-full rounded-xl overflow-hidden">
        <SmartImage
          src={image}
          alt={alt}
          fill
          className="object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/50" />

        {title && (
          <div className="absolute inset-0 flex flex-col justify-start p-6 md:p-8">
            <h3 className="text-3xl md:text-4xl lg:text-5xl z-10 transition-opacity duration-300 group-hover:opacity-0 text-white font-medium">
              {title}
            </h3>
          </div>
        )}
        {description && (
          <div className="absolute inset-0 flex px-6 md:px-8 py-6 md:py-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xl md:text-2xl z-10 leading-relaxed text-white">
              {description}
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

function IntelligenceCard({ title, description }: { title: string; description: string }) {
  return (
    <GlassCard
      glow={true}
      scale={false}
      border="cyan"
      padding="lg"
      blur={true}
      className="h-full"
    >
      <div className="group relative w-full h-full flex items-start justify-start">
        {/* Title - visible by default, fades out on hover */}
        <h3 className="flex-1 transition-opacity duration-300 group-hover:opacity-0 absolute inset-0 text-3xl md:text-4xl lg:text-5xl leading-tight font-mono font-normal text-primary whitespace-pre-line">
          {title}
        </h3>

        {/* Description - hidden by default, fades in on hover */}
        <p className="flex-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-xl md:text-2xl leading-relaxed text-black">
          {description}
        </p>
      </div>
    </GlassCard>
  );
}

export function PlatformFeatures() {
  const { sectionTitle, sectionSubtitle, leftColumn, rightColumn } = platformFeatures;

  return (
    <main className="py-8 md:py-16">
      <div>
        <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 md:mb-4 block">
          {sectionSubtitle}
        </span>
        <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-medium">
          {sectionTitle}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-8 md:mt-12">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          {/* Smart Incentive */}
          <div className="h-[300px] md:h-[400px]">
            <FeatureCard
              image={leftColumn.productCRM.image}
              alt={leftColumn.productCRM.alt}
              title={leftColumn.productCRM.title}
              description={leftColumn.productCRM.description}
            />
          </div>

          {/* Reward Engine */}
          <GlassCard
            glow={true}
            scale={false}
            border="cyan"
            padding="none"
            blur={true}
          >
            <div className="p-6 md:p-8 bg-black rounded-t-xl">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
                {leftColumn.rewardEngine.title}
              </h3>
              <p className="text-base text-white/70">
                {leftColumn.rewardEngine.description}
              </p>
            </div>
            <div className="bg-black rounded-b-xl">
              <SmartImage
                src={leftColumn.rewardEngine.image}
                alt={leftColumn.rewardEngine.imageAlt}
                width={840}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </GlassCard>

          {/* Campaigns */}
          <div className="h-[300px] md:h-[400px]">
            <FeatureCard
              image={leftColumn.smartIncentives.image}
              alt={leftColumn.smartIncentives.alt}
              title={leftColumn.smartIncentives.title}
              description={leftColumn.smartIncentives.description}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          {/* Intelligence */}
          <div className="h-[160px]">
            <IntelligenceCard
              title={rightColumn.intelligence.title}
              description={rightColumn.intelligence.description}
            />
          </div>

          {/* Analytics */}
          <GlassCard
            glow={true}
            scale={false}
            border="subtle"
            padding="none"
            blur={true}
          >
            <div
              className="rounded-xl overflow-hidden bg-black bg-cover bg-center bg-no-repeat p-6 md:p-8 flex flex-col justify-start min-h-[400px] md:min-h-[500px] relative"
              style={{ backgroundImage: `url('${rightColumn.analytics.backgroundImage}')` }}
            >
              <h3 className="text-white text-xl md:text-3xl font-medium mb-2 md:mb-4 max-w-sm">
                {rightColumn.analytics.title}
              </h3>
              <p className="text-base text-white/70 max-w-[50%]">
                {rightColumn.analytics.description}
              </p>
              <SmartImage
                src={rightColumn.analytics.badgesImage}
                alt="Badges"
                width={300}
                height={50}
                className="md:w-[60%] w-[80%] h-auto absolute bottom-6 left-6"
              />
            </div>
          </GlassCard>

          {/* No-code */}
          <div className="h-[300px] md:h-[400px]">
            <FeatureCard
              image={rightColumn.noCode.image}
              alt={rightColumn.noCode.alt}
              title={rightColumn.noCode.title}
              description={rightColumn.noCode.description}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
