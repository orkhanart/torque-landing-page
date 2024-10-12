"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const DataDrivenIncentives = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 w-full p-4">
      <Image
        src="/Illustration-hexagons.svg"
        alt="Hero Background"
        width={1300}
        height={800}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div>
        <Badge className="mb-4">Data Driven Incentives</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl  mb-12 text-center max-w-[800px] font-medium md:leading-56 font-sans z-50 p-4">
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Reward users
        </span>{" "}
        with tokens, points, offers, and grants based on their onchain and
        offchain activity
      </h1>
      <Card
        className="grid grid-cols-1 lg:grid-cols-3 z-50 p-4 border border-[rgba(100, 100, 100, 0.01)] relative overflow-hidden"
        style={{
          border: "1px solid transparent",
          borderImage:
            "linear-gradient(to top, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)) 1",
          borderImageSlice: "1",
        }}
      >
        <motion.div
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        {[
          {
            title: "Precision-Targeted Offers",
            description:
              "Launch personalized offers using no-code audience tools, custom lists, or data from previous campaigns.",
          },
          {
            title: "Flexible Rewards",
            description:
              "Create time-sensitive, randomized, or multi-party rewards to optimize growth and user engagement.",
          },
          {
            title: "Any Asset, Any Action",
            description:
              "Reward any on-chain or off-chain action with any asset to drive the behaviors that matter most.",
          },
          {
            title: "Power Your Product",
            description:
              "Integrate Torque into your product for users to create growth-driven offers directly within your platform.",
          },
          {
            title: "No-Code Simplicity",
            description:
              "Empower your team to launch, manage, and experiment with campaigns—no developers needed.",
          },
          {
            title: "Measure Everything",
            description:
              "Track real-time performance, optimize offers, and refine rewards based on user behavior and engagement.",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="md:h-[324px] h-auto xl:w-[410px] md:w-[350px] w-full !border-0 relative"
          >
            <div
              className="relative p-4 rounded-lg h-full w-full flex flex-col justify-between"
              style={{
                border: "2px solid",
                borderImageSource:
                  "linear-gradient(180deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)",
                borderImageSlice: "1",
                background:
                  "linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)",
              }}
            >
              <Image
                src={"/upper-cross.svg"}
                alt="Frame"
                width={16}
                height={16}
                className="absolute -top-[3px] -right-[3px] z-50"
              />
              <Image
                src={"/lower-cross.svg"}
                alt="Frame"
                width={16}
                height={16}
                className="absolute -bottom-[3px] -left-[3px] z-50"
              />
              <CardHeader className="p-0 mt-10">
                <Image
                  src="/hexagone.png"
                  alt="bullet point"
                  width={45}
                  height={45}
                />
                <CardTitle className="text-[32px] pb-2 pt-4">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-[18px]">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default DataDrivenIncentives;
