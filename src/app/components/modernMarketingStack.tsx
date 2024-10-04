import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SelectBadge } from "@/components/ui/selectBadge"
import Image from 'next/image'

const ModernMarketingStack = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 max-w-[1200px] p-4">
      <div >
        <Badge className='mb-4'>Modern Marketing Stack</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center xl:max-w-[1000px] md:max-w-[700px] md:leading-56 font-sans">
        Track users across campaigns and provide incentives <span className="bg-custom-gradient bg-clip-text text-transparent">never before possible</span>
      </h1>
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute top-[650px] -left-[50px] z-[99] lg:block hidden" />
      <Image src="/sparkle.png" alt="sparkle" width={5} height={5} className="absolute top-[300px] -left-[100px] z-[99] lg:block hidden" />
      <Image src="/sparkle.svg" alt="sparkle" width={5} height={5} className="absolute top-[600px] left-[90px] z-[99] lg:block hidden" />

      <Image src="/sparkle.svg" alt="sparkle" width={5} height={5} className="absolute top-[320px] -right-[50px] z-[99] xl:block hidden" />
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute top-[250px] right-[100px] z-[99] xl:block hidden" />
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute top-[0px] right-[150px] z-[99] xl:block hidden" />
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute top-[300px] right-[200px] z-[99] xl:block hidden" />

      <Image src="/sparkle.svg" alt="sparkle" width={5} height={5} className="absolute bottom-[120px] right-[0px] z-[99] xl:block hidden" />
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute bottom-[30px] right-[100px] z-[99] xl:block hidden" />
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute bottom-[0px] right-[150px] z-[99] xl:block hidden" />
      <Image src="/sparkle-dim.svg" alt="sarkle" width={5} height={5} className="absolute bottom-[150px] right-[200px] z-[99] xl:block hidden" />

      <div className="flex flex-col xl:items-start items-center justify-start xl:w-[1025px] w-full  xl:mb-16 mb-0">
        {/* <div className='border border-[#1E293B]/20 p-2'> */}
        <Card className="border-1 pt-0 relative">
          <Card className="text-tertiary pt-0 md:w-[500px] w-full border-1" style={{ border: '2px solid', borderImageSource: 'linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)' }}>
            <CardContent className="space-y-2 text-2xl text-medium py-6">
              Reward <SelectBadge variant="red">only</SelectBadge> <SelectBadge variant="blue">long-term stakers</SelectBadge> who continued to stake <SelectBadge variant="red">after</SelectBadge> the previous <SelectBadge variant="blue">promotional period</SelectBadge> has ended.
            </CardContent>
          </Card>
          <div className='w-2 h-2 bg-primary absolute top-24 -right-1 xl:block hidden'></div>
          <div className='absolute -bottom-1 ml-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary xl:hidden block'></div>
          </div>
        </Card>
        {/* </div> */}
        
      </div>
      <Image src="/dotted-line-1.png" alt="dotted-line-1" width={384} height={500} className='absolute top-[342px] left-[232px] xl:block hidden'/>
      {/* <div className='absolute w-full flex justify-center'> */}
        <Image src="/dotted-line-3.png" alt="dotted-line-1" width={20} height={500} className='-mt-6 -mb-6 ml-2 xl:hidden block'/>
      {/* </div> */}
      

      <div className="flex flex-col xl:items-end items-center justify-end gap-4 xl:w-[1005px] w-full xl:mt-3 mt-0 xl:mb-16 mb-0">
        <Card className="border-1 p-1 pt-0 relative">
          <Card className="text-tertiary pt-0 md:w-[500px] w-full border-1" style={{ border: '2px solid', borderImageSource: 'linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)' }}>
          <CardContent className="space-y-2 text-2xl text-medium py-6">
            Reward <SelectBadge variant="red">only</SelectBadge> <SelectBadge variant="blue">long-term stakers</SelectBadge> who continued to stake <SelectBadge variant="red">after</SelectBadge> the previous <SelectBadge variant="blue">promotional period</SelectBadge> has ended.
          </CardContent>
          </Card>
          <div className='w-2 h-2 bg-primary absolute top-[97px] -left-1 xl:block hidden'></div>
          <div className='w-2 h-2 bg-primary absolute -bottom-1 left-[255px] xl:block hidden'></div>
          <div className='absolute -bottom-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary xl:hidden block'></div>
          </div>
          <div className='absolute -top-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary xl:hidden block'></div>
          </div>
        </Card>
      </div>
      {/* <div className='absolute w-full flex justify-center'>
        <Image src="/dotted-line-3.png" alt="dotted-line-1" width={20} height={500} className='ml-2'/>
      </div> */}

      <Image src="/dotted-line-3.png" alt="dotted-line-1" width={20} height={500} className='-mt-6 -mb-6 ml-2 xl:hidden block'/>
      <Image src="/dotted-line-2.png" alt="dotted-line-2" width={384} height={500} className='absolute top-[732px] left-[406px] xl:block hidden'/>
      <div className="flex flex-col xl:items-start items-center justify-end gap-4 xl:w-[740px] w-full xl:mt-3 mt-0">
        <Card className="border-1 p-1 pt-0 relative">
          <Card className="text-tertiary pt-0 md:w-[500px] w-full border-1" style={{ border: '2px solid', borderImageSource: 'linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)' }}>
            <CardContent className="space-y-2 text-2xl text-medium py-6">
              Reward <SelectBadge variant="red">only</SelectBadge> <SelectBadge variant="blue">long-term stakers</SelectBadge> who continued to stake <SelectBadge variant="red">after</SelectBadge> the previous <SelectBadge variant="blue">promotional period</SelectBadge> has ended.
            </CardContent>
          </Card>
          <div className='w-2 h-2 bg-primary absolute -top-1 left-[250px] xl:block hidden'></div>
          <div className='absolute -top-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary xl:hidden block'></div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ModernMarketingStack