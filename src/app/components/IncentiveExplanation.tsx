import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { HammerIcon, WandSparklesIcon, PiggyBankIcon } from "lucide-react";


const IncentiveExplanation = () => {
  return (
    <div>
      <div className="flex flex-col md:gap-4 gap-2 mb-6 md:mb-8">
        <p className="text-secondary text-sm md:text-base">How we add value</p>
        <h2 className="text-foreground text-2xl md:text-[40px]">Incentives from A to Z</h2>
        <p className="text-secondary text-sm md:text-base">Everything you need to design, deploy, and measure on-chain incentives.</p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* First row: Create and Fund cards */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 flex-1">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Create</span>

                <HammerIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              
              <CardDescription className="text-sm md:text-base">
                Design and launch on-chain incentive in minutes. Choose from pre-built modules like leaderboards, raffles, and rebates.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
                <Image src="/incentive-type.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
              </CardContent>
          </Card>

          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 flex-1">  
            <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Fund</span>

                <PiggyBankIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Allocate tokens and set budgets with built-in analytics. Fund campaigns safely and transparently, directly from your wallet.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
                <Image src="/data-card.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
              </CardContent>
          </Card>
        </div>

        {/* Second row: Optimize card centered */}
        <div className="flex justify-center">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 w-full lg:w-1/2">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Optimize</span>

                <WandSparklesIcon className="w-6 h-6 md:w-7 md:h-7 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
              Use Torque Intelligence to measure performance and adjust parameters automatically. Identify what&apos;s working — and scale it instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
                <Image src="/ai-chat1.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncentiveExplanation;


