"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

const mobileData = [
  {
    category: "DeFi/Dex",
    kpi: "Trading volume & TVL",
    action: "Trade",
  },
  {
    category: "NFT Marketplace",
    kpi: "Trading volume",
    action: "Buy",
  },
  {
    category: "Infrastructure",
    kpi: "Users & TVL",
    action: "Deploy",
  },
  {
    category: "Consumer",
    kpi: "Users & Usage",
    action: "Sign-up",
  },
];

const ImproveYourKPIs = () => {
  const [progressValue, setProgressValue] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSetProgressValue = useCallback((value: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setProgressValue(value);
    }, 200);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;
        debouncedSetProgressValue(scrollPercentage);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [debouncedSetProgressValue]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1400px] p-4">
      <div>
        <Badge className="mb-4">Improve your KPIs</Badge>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 text-center xl:max-w-[900px] sm:max-w-[680px] md:leading-56 font-sans">
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          Boost your core metrics
        </span>{" "}
        by incentivizing users to do the things you want.
      </h1>
      <Progress
        value={progressValue}
        className="w-[45px] h-1 md:invisible visible mb-6"
      />

      {/* Mobile View */}
      <div className="md:hidden w-full">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="font-medium text-primary">Category</div>
          <div className="font-medium text-primary">KPI</div>
          <div className="font-medium text-primary">Action</div>
          {mobileData.map((row, index) => (
            <React.Fragment key={index}>
              <div className="font-medium">{row.category}</div>
              <div>{row.kpi}</div>
              <div>
                <Badge variant="white">{row.action}</Badge>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div
        ref={scrollContainerRef}
        className="hidden md:block w-full overflow-x-auto scrollbar-hide px-4 md:px-0"
      >
        <div className="flex flex-row items-start gap-4 md:gap-8 min-w-max pb-4">
          {/* Category Column */}
          <div className="flex flex-col gap-4 md:gap-8">
            <p className="text-primary text-base md:text-[18px] font-medium">
              Category
            </p>
            <div className="flex flex-col gap-3 md:gap-4 justify-between min-h-[230px]">
              <p className="text-base md:text-lg font-medium">DeFi/Dex</p>
              <p className="text-base md:text-lg font-medium">
                NFT Marketplace
              </p>
              <p className="text-base md:text-lg font-medium">Infrastructure</p>
              <p className="text-base md:text-lg font-medium">Consumer</p>
            </div>
          </div>

          {/* First Arrow */}
          <div className="hidden md:block">
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={120}
              height={488}
              priority
            />
          </div>

          {/* KPIs Column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <p className="text-primary text-base md:text-[18px] font-medium">
                KPIs
              </p>
              <div className="flex flex-col gap-3 md:gap-4 justify-between min-h-[230px] min-w-[160px] md:min-w-32">
                <p className="text-base md:text-lg font-medium">
                  Trading volume & TVL
                </p>
                <p className="text-base md:text-lg font-medium">
                  Trading volume
                </p>
                <p className="text-base md:text-lg font-medium">Users & TVL</p>
                <p className="text-base md:text-lg font-medium">
                  Users & Usage
                </p>
              </div>
            </div>
          </div>

          {/* Second Arrow */}
          <div className="hidden md:block">
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={120}
              height={488}
              priority
            />
          </div>

          {/* Actions Column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <p className="text-primary text-base md:text-[18px] font-medium">
                Actions
              </p>
              <div className="flex flex-col gap-3 md:gap-4 justify-between min-h-[230px]">
                <div className="flex flex-row gap-2 md:gap-4">
                  <Badge variant={"white"}>Trade</Badge>
                  <Badge variant={"white"} className="!w-auto">
                    Deposit
                  </Badge>
                </div>
                <div className="flex flex-row gap-2 md:gap-4">
                  <Badge variant={"white"}>Buy</Badge>
                  <Badge variant={"white"}>Bid</Badge>
                </div>
                <div className="flex flex-row gap-2 md:gap-4">
                  <Badge variant={"white"}>Deploy</Badge>
                  <Badge variant={"white"}>Stake</Badge>
                </div>
                <div className="flex flex-row gap-2 md:gap-4">
                  <Badge variant={"white"}>Sign-up</Badge>
                  <Badge variant={"white"}>Play</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImproveYourKPIs;
