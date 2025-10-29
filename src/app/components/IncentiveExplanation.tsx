import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { HammerIcon, WandSparklesIcon, PiggyBankIcon } from "lucide-react";


const IncentiveExplanation = () => {
  return (
    <div>
      <div className="flex flex-col gap-0 mb-10">
        <h3 className="text-secondary">How we add value.</h3>
        <h1 className="text-foreground text-[40px]">Incentives from A to Z</h1>
        <h3 className="text-secondary">Easily build custom incentives to reward and grow your community.</h3>
      </div>

      <div className="flex flex-row gap-8 h-auto ">
        <div className="flex flex-col gap-8 flex-1">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-4">
                <h1 className="text-3xl font-medium">Create Incentive</h1>

                <HammerIcon className="w-8 h-8 text-secondary-foreground"/>
              </CardTitle>
              
              <CardDescription>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="">
                <Image src="/incentive-type.svg" alt="Torque logo" width={800} height={800} />
              </CardContent>
          </Card>

          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5">  
            <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between pr-4">
                <h1 className="text-3xl font-medium">Fund Incentive</h1>

                <PiggyBankIcon className="w-8 h-8 text-secondary-foreground"/>
              </CardTitle>
              <CardDescription>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="">
                <Image src="/data-card.svg" alt="Torque logo" width={800} height={800} />
              </CardContent>
          </Card>
        </div>
        <div className="flex flex-col justify-center items-center h-full flex-1">
          <Card className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/5 w-full">  
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between pr-4">
                <h1 className="text-3xl font-medium">Optimize Incentive</h1>

                <WandSparklesIcon className="w-7 h-7 text-secondary-foreground"/>
              </CardTitle>
              <CardDescription>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="">
                <Image src="/ai-chat.svg" alt="Torque logo" width={800} height={800} />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default IncentiveExplanation;