"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"

const ImproveYourKPIs = () => {
  const [progressValue, setProgressValue] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        const scrollPercentage = (scrollLeft / maxScrollLeft) * 100; // 70 is the range from 30 to 100
        setProgressValue(scrollPercentage);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1400px]">
      <div>
        <Badge className='mb-4'>Improve your KPIs</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-6 text-center xl:max-w-[900px] sm:max-w-[680px] md:leading-56 font-sans">
        <span className="bg-custom-gradient bg-clip-text text-transparent">Boost your core metrics</span> by incentivizing users to do the things you want.
      </h1>
      <Progress value={progressValue} className='w-[45px] h-1 md:invisible visible mb-6' />
      <div ref={scrollContainerRef} className='md:w-auto sm:w-[590px] w-[330px] overflow-x-auto'>
        <div className='flex flex-row items-center gap-8 h-[488px]'>
          <div className='flex flex-col gap-8'>
            <p className='text-primary text-[18px] font-medium'>Category</p>
            <div className='flex flex-col gap-4 justify-between h-[230px]'>
              <p className='text-lg font-medium'>DeFi/Dex</p>
              <p className='text-lg font-medium'>NFT Marketplace</p>
              <p className='text-lg font-medium'>Infrastructure</p>
              <p className='text-lg font-medium'>Consumer</p>
            </div>
          </div>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={120}
            height={488}
            priority
          />
          <div className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-8'>
              <p className='text-primary text-[18px] font-medium'>KPIs</p>
              <div className='flex flex-col gap-4 justify-between h-[230px] min-w-32'>
                <p className='text-lg font-medium'>Trading volume & TVL</p>
                <p className='text-lg font-medium'>Trading volume</p>
                <p className='text-lg font-medium'>Users & TVL</p>
                <p className='text-lg font-medium'>Users & Usage</p>
              </div>
            </div>
          </div>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={120}
            height={488}
            priority
          />
          <div className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-8'>
              <p className='text-primary text-[18px] font-medium'>Actions</p>
              <div className='flex flex-col gap-4 justify-between h-[230px]'>
                <div className='flex flex-row gap-4'>
                  <Badge variant={'white'}>Trade</Badge>
                  <Badge variant={'white'} className='!w-auto !w-[200px]'>Deposit Liquidity</Badge>
                </div>
                <div className='flex flex-row gap-4'>
                  <Badge variant={'white'}>Buy</Badge>
                  <Badge variant={'white'}>Bid</Badge>
                </div>
                <div className='flex flex-row gap-4'>
                  <Badge variant={'white'}>Sign-up</Badge>
                  <Badge variant={'white'}>Stake</Badge>
                </div>
                <div className='flex flex-row gap-4'>
                  <Badge variant={'white'}>Sign-up</Badge>
                  <Badge variant={'white'}>Play</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImproveYourKPIs