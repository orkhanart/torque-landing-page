import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] leading-56 font-sans">
        Frequently Asked Questions
      </h1>

      {qa.map((qa, index) => (
        <Accordion key={index} type="single" className="!w-800" collapsible>
          <AccordionItem value="item-1" className="!w-800">
            <AccordionTrigger className="text-lg font-medium !w-800">{qa.question}</AccordionTrigger>
            <AccordionContent className="text-base !w-800">{qa.answer}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;