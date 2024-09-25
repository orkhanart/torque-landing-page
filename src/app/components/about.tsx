import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
const About = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center max-w-[1400px]">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl mb-20 font-medium text-center max-w-[1100px] leading-56 font-sans">
        Torque makes crypto&apos;s user data actionable, allowing growth hackers to <span className="bg-custom-gradient bg-clip-text text-transparent">reward power users</span> and <span className="bg-custom-gradient bg-clip-text text-transparent">scale</span> their protocol
      </h1>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-4">
        <Card className="w-[588px] h-[400px]">
          <CardHeader>
            <CardDescription>
              <Badge size="sm" variant="tertiary">
                The status quo
              </Badge>
            </CardDescription>
            <CardTitle className="text-3xl">
              Manually building and update your rewards engine in months
            </CardTitle>
            <CardContent>
              <ul>
                <li>
                  No ability to microtarget users
                </li>
                <li>
                  Easy to game airdrop mechanisms
                </li>
                <li>
                  Requires continuous upkeep and hours from your dev team
                </li>
              </ul>
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="w-[588px] h-[400px]">
          <CardHeader>
            <CardDescription>
              <Badge size="sm" variant="primary">
                <div className='mr-2'>With TORQUE</div>
                <Image src="/blue-logo.svg" alt="TORQUE" width={18} height={18} />
              </Badge>
            </CardDescription>
            <CardTitle className="text-3xl">
              Launch onchain offers based on detailed user activity in minutes
            </CardTitle>
            
            <CardContent>
              <ul>
                <li>
                  Microtarget users based on type & track performance across campaigns
                </li>
                <li>
                  Update mechanisms in a few clicks, to thwart airdrop farmers
                </li>
                <li>
                  No continuous upkeep from your dev team needed
                </li>
              </ul>
            </CardContent>
          </CardHeader>
        </Card>
        
      </div>
    </div>
  );
};

export default About;