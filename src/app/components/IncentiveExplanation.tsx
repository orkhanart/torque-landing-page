import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { HammerIcon, WandSparklesIcon, PiggyBankIcon } from "lucide-react";


const IncentiveExplanation = () => {
  return (
    <div>
      <div className="flex flex-col md:gap-4 gap-2 mb-6 md:mb-8">
        <p className="text-secondary text-sm md:text-base">How we add value</p>
        <h2 className="text-foreground text-2xl md:text-[40px]">Incentives from A to Z</h2>
        <p className="text-secondary text-sm md:text-base">Easily build custom incentives to reward and grow your community</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 h-auto">
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 transition-transform duration-300 hover:scale-[102%]">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Create</span>

                <HammerIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              
              <CardDescription className="text-sm md:text-base">
                Design onchain incentives to drive engagement and growth. Pick from leaderboards, rebates, raffles, or direct distributions to reward your users
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
                <Image src="/incentive-type.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
              </CardContent>
          </Card>

          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 transition-transform duration-300 hover:scale-[102%]">  
            <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Fund</span>

                <PiggyBankIcon className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Fund and manage your incentive treasury with transparent onchain distributions. Track payouts and ensure seamless rewards delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
                <Image src="/data-card.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
              </CardContent>
          </Card>
        </div>
        <div className="flex flex-col justify-center items-center h-full flex-1 md:pt-28">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 w-full transition-transform duration-300 hover:scale-[102%]">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-2 md:pr-4">
                <span className="text-xl md:text-3xl font-medium">Optimize</span>

                <WandSparklesIcon className="w-6 h-6 md:w-7 md:h-7 text-secondary-foreground flex-shrink-0"/>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Refine your reward strategies using the Torque Assistant. Set new metrics, adjust distribution formulas, and optimize future incentives
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
                <Image src="/ai-chat.svg" alt="Torque logo" width={800} height={800} className="w-full h-auto" />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default IncentiveExplanation;


