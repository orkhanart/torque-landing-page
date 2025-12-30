import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { HammerIcon, WandSparklesIcon, RocketIcon, BarChart3Icon } from "lucide-react";


const IncentiveExplanation = () => {
  return (
    <div>
      <div className="flex flex-col md:gap-4 gap-2 mb-6 md:mb-8">
        <h2 className="text-foreground text-2xl md:text-[40px]">Growth from A to Z</h2>
        <p className="text-secondary text-sm md:text-base">Everything you need to design, deploy, and measure on-chain incentives.</p>
      </div>

      {/* Mobile view: Single column with correct order */}
      <div className="flex flex-col gap-6 lg:hidden">
        {/* 1. Explore */}
        <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
              <span className="text-xl md:text-3xl font-medium">Explore</span>
              <BarChart3Icon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Unlock deep insights into user behavior and holder segments. Discover who your community is and what drives them.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-5">
            <Image src="/explore-card.svg" alt="Explore data visualization" width={840} height={800} className="w-full h-auto" />
          </CardContent>
        </Card>

        {/* 2. Create Incentive */}
        <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
              <span className="text-xl md:text-3xl font-medium">Create Incentive</span>
              <HammerIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Design and launch on-chain incentives in minutes. Choose from pre-built modules like leaderboards, raffles, and rebates.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-5">
            <Image src="/incentive-type.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
          </CardContent>
        </Card>

        {/* 3. Launch */}
        <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
              <span className="text-xl md:text-3xl font-medium">Launch</span>
              <RocketIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Allocate tokens and set budgets with built-in analytics. Fund campaigns securely and transparently — right from your wallet.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-5">
            <Image src="/launch-card.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
          </CardContent>
        </Card>

        {/* 4. Optimize */}
        <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
              <span className="text-xl md:text-3xl font-medium">Optimize</span>
              <WandSparklesIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Use Torque Intelligence to measure performance and automatically optimize incentives. Identify what&apos;s working — and scale it instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-5">
            <Image src="/ai-card.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
          </CardContent>
        </Card>
      </div>

      {/* Desktop view: Two-column layout (unchanged) */}
      <div className="hidden lg:flex flex-row gap-6 md:gap-10">
        {/* Left column: Explore and Launch cards */}
        <div className="flex flex-col gap-6 md:gap-12 flex-1">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Explore</span>

                <BarChart3Icon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Unlock deep insights into user behavior and holder segments. Discover who your community is and what drives them.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-5">
                <Image src="/explore-card.svg" alt="Explore data visualization" width={840} height={800} className="w-full h-auto" />
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
            <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Launch</span>

                <RocketIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Allocate tokens and set budgets with built-in analytics. Fund campaigns securely and transparently — right from your wallet.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-5">
                <Image src="/launch-card.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
              </CardContent>
          </Card>
        </div>

        {/* Right column: Create and Optimize cards */}
        <div className="flex flex-col gap-6 md:gap-12 flex-1 lg:pt-28">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Create Incentive</span>

                <HammerIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              
              <CardDescription className="text-sm md:text-base">
                Design and launch on-chain incentives in minutes. Choose from pre-built modules like leaderboards, raffles, and rebates.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-5">
                <Image src="/incentive-type.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
              </CardContent>
          </Card>

          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Optimize</span>

                <WandSparklesIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
              Use Torque Intelligence to measure performance and automatically optimize incentives. Identify what&apos;s working — and scale it instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-5">
                <Image src="/ai-card.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncentiveExplanation;


