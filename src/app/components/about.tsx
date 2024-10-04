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
// import ComparisonCard from "@/components/ui/comparisonCard";
import Frame from "@/components/ui/frame";



const About = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center max-w-[1400px] px-4">
      <h1 className="text-4xl text-3xl lg:text-5xl mb-20 font-medium text-center xl:max-w-[1100px] md:max-w-[800px] md:leading-56 font-sans">
        Torque makes crypto&apos;s user data actionable, allowing growth hackers to <span className="bg-custom-gradient bg-clip-text text-transparent">reward power users</span> and <span className="bg-custom-gradient bg-clip-text text-transparent">scale</span> their protocol
      </h1>
      <div className="flex xl:flex-row flex-col justify-center items-center lg:gap-12 gap-8">
        <Card className="md:w-[588px] w-full md:h-[400px] h-auto p-4">
          <Frame gray={true}>
            <CardHeader>
              <div>
              <Badge size="sm" variant="tertiary">
                The status quo
              </Badge>
            </div>
            <CardTitle className="text-3xl">
              Manually building and update your rewards engine <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">in months</span>
            </CardTitle>
            <CardContent className='p-0'>
              <ul className='flex flex-col gap-2'>
                <li className="flex items-start">
                  <Image src="/close.png" alt="bullet point" width={16} height={16} className="mr-2 mt-1" />
                  No ability to microtarget users
                </li>
                <li className="flex items-start">
                  <Image src="/close.png" alt="bullet point" width={16} height={16} className="mr-2 mt-1" />
                  Easy to game airdrop mechanisms
                </li>
                <li className="flex items-start">
                  <Image src="/close.png" alt="bullet point" width={16} height={16} className="mr-2 mt-1" />
                  Requires continuous upkeep and hours from your dev team
                </li>
              </ul>
            </CardContent>
          </CardHeader>
          </Frame>
        </Card>
        <Card className="md:w-[588px] w-full md:h-[400px] h-auto p-4">
          <Frame>
            <CardHeader>
            <div>
              <Badge size="sm" variant="primary">
                <div className='mr-2'>With TORQUE</div>
                <Image src="/blue-logo.svg" alt="TORQUE" width={18} height={18} />
              </Badge>
            </div>
            <CardTitle className="text-3xl">
              Launch onchain offers based on detailed user activity <span className="text-primary">in minutes</span>
            </CardTitle>
            
            <CardContent className='p-0'>
              <ul className='flex flex-col gap-2'>
                <li className="flex items-start">
                  <Image src="/point.svg" alt="bullet point" width={16} height={16} className="mr-2 mt-1" />
                  Microtarget users based on type & track performance across campaigns
                </li>
                <li className="flex items-start">
                  <Image src="/point.svg" alt="bullet point" width={16} height={16} className="mr-2 mt-1" />
                  Update mechanisms in a few clicks, to thwart airdrop farmers
                </li>
                <li className="flex items-start">
                  <Image src="/point.svg" alt="bullet point" width={16} height={16} className="mr-2 mt-1" />
                  No continuous upkeep from your dev team needed
                </li>
              </ul>
            </CardContent>
          </CardHeader>
          </Frame>
        </Card>
        
      </div>
    </div>
  );
};

export default About;