import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const About = () => {
  return (
    <div className="text-white flex flex-col">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-semibold mb-20 text-center">
        Torque makes crypto&apos;s user data actionable, allowing growth hackers to reward power users and scale their protocol
      </h1>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-4">
        <Card className="w-[588px] h-[400px]">
          <CardHeader>
            <CardDescription>
              The status quo
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
              With TORQUE
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