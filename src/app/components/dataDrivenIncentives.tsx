import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Frame from "@/components/ui/frame";
import Image from 'next/image';
const featureCards = [
  {
    title: "Name of feature",
    description: 'Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non videntur, nec"',
  },
  {
    title: "Name of feature",
    description: 'Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non videntur, nec"',
  },
  {
    title: "Name of feature",
    description: 'Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non videntur, nec"',
  },
  {
    title: "Name of feature",
    description: 'Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non videntur, nec"',
  },
  {
    title: "Name of feature",
    description: 'Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non videntur, nec"',
  },
  {
    title: "Name of feature",
    description: 'Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non videntur, nec"',
  },
]

const DataDrivenIncentives = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1280px]">
      <div >
        <Badge className='mb-4'>Data Driven Incentives</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl  mb-12 text-center max-w-[800px] font-medium md:leading-56 font-sans ">
        <span className="bg-custom-gradient bg-clip-text text-transparent">Reward users</span> with airdrops, points, quests, and grants based on their onchain and offchain activity
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {featureCards.map((card, index) => {
          const noTopBorder = index >= 3 ? '!border-t-0' : '';
          const noLeftBorder = (index !== 2 && index !== 5) ? '!border-r-0' : '';

          return (
            <Card key={index} className='md:h-[324px] h-auto  md:w-[416px] w-[300px] !border-0'>
              <Frame 
                className={`flex flex-col justify-end pb-6 ${noTopBorder} ${noLeftBorder}`}
                upperRightCorner={index !== 0 && index !== 1}
                lowerLeftCorner={index !== 4 && index !== 5}
                lowerRightCorner={index === 2}
                upperLeftCorner={index === 3}
              >
                <CardHeader className=''>
                  <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
                  <CardTitle className='text-[32px] pb-0 pt-6'>{card.title}</CardTitle>
                <CardDescription className='text-[18px] pt-0'>{card.description}</CardDescription>
              </CardHeader>
              </Frame>
            </Card>
        )})}
      </div>
    </div>
  );
};

export default DataDrivenIncentives;