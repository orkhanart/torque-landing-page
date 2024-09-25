import React from 'react'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

const ImproveYourKPIs = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1400px]">
      <div >
        <Badge className='mb-4'>Improve your KPIs</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[1000px] leading-56 font-sans">
        <span className="bg-custom-gradient bg-clip-text text-transparent">Boost your core metrics</span> by incentivizing users to do the things you want.
      </h1>
      <div className='flex flex-row items-center gap-8 h-[488px]'>
        <div className='flex flex-col gap-8'>
          <p>Category</p>
          <div className='flex flex-col gap-4 justify-between h-[230px]'>
            <p>DeFi/Dex</p>
            <p>NFT Marketplace</p>
            <p>Infrastructure</p>
            <p>Consumer</p>
          </div>
        </div>
        <Image
          src="/arrow.svg"
          alt="Arrow"
          width={120}
          height={488}
          priority
        />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-8'>
            <p>KPIs</p>
            <div className='flex flex-col gap-4 justify-between h-[230px]'>
              <p>Trading volume & TVL</p>
              <p>Trading volume</p>
              <p>Users & TVL</p>
              <p>Users & Usage</p>
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
        <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-8'>
            <p>Actions</p>
            <div className='flex flex-col gap-4 justify-between h-[230px]'>
              <div className='flex flex-row gap-4'>
                <Badge >Trade</Badge>
                <Badge >Deposit Liquidity</Badge>
              </div>
              <div className='flex flex-row gap-4'>
                <Badge>Buy</Badge>
                <Badge>Bid</Badge>
              </div>
              <div className='flex flex-row gap-4'>
                <Badge>Sign-up</Badge>
                <Badge>Stake</Badge>
              </div>
              <div className='flex flex-row gap-4'>
                <Badge>Sign-up</Badge>
                <Badge>Play</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImproveYourKPIs