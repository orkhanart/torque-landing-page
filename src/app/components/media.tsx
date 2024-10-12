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
    author: "Ian",
    role: "Tiplink",
    platform: "X",
    content:
      "TipLink is an incredible tool for onboarding the average person into crypto and Torque is an incredible tool for creating the economic incentives to make that a reality.",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Sting",
    role: "Growth | Tensor Labs",
    platform: "X",
    content:
      "Torque would enable us to incentivize users more effectively towards our products, conduct numerous trading contests, and concentrate rewards on quality users",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Pedro",
    role: "Solana Foundation",
    platform: "X",
    content: "This is hype!",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Daeshawn",
    role: "Shaga",
    platform: "X",
    content:
      "We see Torque as one of the best ways to discover and reward early contributors with their advanced targeting features.",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Kyle",
    role: "CEO & Founder",
    platform: "Hedgehog Markets",
    content:
      "Visibility and attention is always the challenge for builders. Once this launches we see no reason not to try it",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Joey",
    role: "Founder | Stockpile Labs",
    platform: "X",
    content:
      "In our context, I can see this truly revolutionizing developer onboarding for protocols on Solana",
    image: "/sheldon-pfp.png",
  },

  {
    author: "Brandon",
    role: "Truffle",
    platform: "X",
    content:
      "We see this as something creators could use to gain distribution by launching campaigns and rewarding for their nft mints",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Frank",
    role: "eBlockchain",
    platform: "X",
    content:
      "This is something that I need. As soon as you're launched I will be your first user",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Pedro",
    role: "Solana Foundation",
    platform: "X",
    content: "This is hype!",
    image: "/sheldon-pfp.png",
  },
  {
    author: "Pedro",
    role: "Solana Foundation",
    platform: "X",
    content: "This is hype!",
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
