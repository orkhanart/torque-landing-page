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
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-semibold mb-12 text-center max-w-[900px]">
        Frequently Asked Questions
      </h1>

      {qa.map((qa, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{qa.question}</AccordionTrigger>
            <AccordionContent>{qa.answer}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;