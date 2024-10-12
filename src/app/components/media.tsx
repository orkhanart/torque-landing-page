"use client";

import React, { useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

const posts = [
  {
    author: "Sheldon",
    role: "Founder",
    platform: "X",
    content:
      "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Sheldon",
    role: "Founder",
    platform: "X",
    content:
      "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. DeFi native, self-appointed tokenomist.",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Sheldon",
    role: "Founder",
    platform: "X",
    content:
      "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. Wanted to build his own systems. Always keen on engaging. quickly realized he wanted to build",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Sheldon",
    role: "Founder",
    platform: "X",
    content:
      "DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems.",
    image: "/sheldon-pfp.png",
  },
  // ... other posts
];

const Media = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    let scrollPosition = 0;
    const scrollSpeed = 0.4;
    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition > scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-4">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] font-sans">
        What founders & marketers are saying
      </h1>
      <div className="w-full max-w-[1250px] overflow-hidden">
        <div
          ref={scrollRef}
          className="flex flex-row justify-start gap-4 overflow-x-hidden"
        >
          {[...posts, ...posts].map((post, index) => (
            <div key={index} className="flex-shrink-0">
              <Card className="h-auto xl:w-[300px] lg:w-[265px] w-[315px]">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div className="flex flex-row gap-4 items-start">
                    <Image
                      className="rounded-full"
                      src={post.image}
                      alt={post.author}
                      width={44}
                      height={44}
                    />
                    <div className="flex flex-col gap-2">
                      <CardTitle className="my-0 -mt-1 py-0 text-lg font-medium">
                        {post.author}
                      </CardTitle>
                      <CardDescription className="-mt-2 text-sm text-primary">
                        {post.role}
                      </CardDescription>
                    </div>
                  </div>
                  <Image
                    className="mt-4"
                    src="x-gray-logo.svg"
                    alt={post.author}
                    width={32}
                    height={32}
                  />
                </CardHeader>
                <CardContent className="md:text-sm text-sm">
                  <p>{post.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
