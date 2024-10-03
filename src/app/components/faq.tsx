"use client"
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Frame from "@/components/ui/frame";
import { Card } from "@/components/ui/card";

const qa = [
  {
    question: "Opus igitur est dicere possit dura omni",
    answer: "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.",
  },
  {
    question: "Opus igitur est dicere possit dura omni",
    answer: "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.",
  },
  {
    question: "Opus igitur est dicere possit dura omni",
    answer: "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.",
  },
  {
    question: "Opus igitur est dicere possit dura omni",
    answer: "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.",
  },
  {
    question: "Opus igitur est dicere possit dura omni",
    answer: "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.",
  },
];

const Faq = () => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 z-[99] p-4">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] md:leading-56 font-sans">
        Frequently Asked Questions
      </h1>
      <Card className="p-2 md:w-[1060px] w-full">
        <Frame className="p-6">
          {qa.map((item, index) => (
            <Accordion key={index} type="single" className="md:!w-800 !w-full" collapsible>
              <AccordionItem 
                value={`item-${index}`} 
                className={`!w-800 ${openItems[index] ? "bg-[hsla(180,100%,82%,0.12)]" : "bg-[hsla(183,41%,9%,0.45)]"}`}
                style={{
                  borderImageSource: openItems[index]
                    ? "linear-gradient(180deg, rgba(161, 255, 255, 0.8) 0%, rgba(161, 255, 255, 0.03) 100%)"
                    : "linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)",
                  borderImageSlice: 1,
                }}
              >
                <AccordionTrigger 
                  onClick={() => toggleItem(index)} 
                  className="md:text-2xl text-[18px] text-start font-medium md:!w-800 !w-full"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base !w-800 text-tertiary">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </Frame>
      </Card>
    </div>
  );
};

export default Faq;