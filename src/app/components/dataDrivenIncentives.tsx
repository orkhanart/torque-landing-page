import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1400px]">
      <div >
        <Badge variant="outline" className='mb-4'>Data Driven Incentives</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl  mb-12 text-center max-w-[800px] font-medium leading-56 font-sans ">
        <span className="bg-custom-gradient bg-clip-text text-transparent">Reward users</span> with airdrops, points, quests, and grants based on their onchain and offchain activity
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataDrivenIncentives;