import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SelectBadge } from "@/components/ui/selectBadge"
import Image from 'next/image'

const ModernMarketingStack = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 max-w-[1200px]">
      <div >
        <Badge className='mb-4'>Modern Marketing Stack</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[1000px] md:leading-56 font-sans">
        Track users across campaigns and provide incentives <span className="bg-custom-gradient bg-clip-text text-transparent">never before possible</span>
      </h1>

      <div className="flex flex-col items-start justify-start md:w-[1025px] w-full md:mb-16 mb-0">
        <Card className="border-1 p-1 pt-0 relative">
          <Card className="text-tertiary pt-0 md:w-[500px] w-full border-1" style={{ border: '2px solid', borderImageSource: 'linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)' }}>
            <CardContent className="space-y-2 text-2xl text-medium py-6">
              Reward <SelectBadge variant="red">only</SelectBadge> <SelectBadge variant="blue">long-term stakers</SelectBadge> who continued to stake <SelectBadge variant="red">after</SelectBadge> the previous <SelectBadge variant="blue">promotional period</SelectBadge> has ended.
            </CardContent>
          </Card>
          <div className='w-2 h-2 bg-primary absolute top-24 -right-1 md:block hidden'></div>
          <div className='absolute -bottom-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary md:hidden block'></div>
          </div>
        </Card>
        {/* <div className='w-[500px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent'></div> */}
        
      </div>
      <Image src="/dotted-line-1.png" alt="dotted-line-1" width={384} height={500} className='absolute top-[325px] left-[220px] md:block hidden'/>
      {/* <div className='absolute w-full flex justify-center'> */}
        <Image src="/dotted-line-3.png" alt="dotted-line-1" width={20} height={500} className='-mt-6 -mb-6 ml-2 md:hidden block'/>
      {/* </div> */}
      

      <div className="flex flex-col items-end justify-end gap-4 md:w-[1005px] w-full md:mt-3 mt-0 md:mb-16 mb-0">
        <Card className="border-1 p-1 pt-0 relative">
          <Card className="text-tertiary pt-0 md:w-[500px] w-full border-1" style={{ border: '2px solid', borderImageSource: 'linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)' }}>
          <CardContent className="space-y-2 text-2xl text-medium py-6">
            Reward <SelectBadge variant="red">only</SelectBadge> <SelectBadge variant="blue">long-term stakers</SelectBadge> who continued to stake <SelectBadge variant="red">after</SelectBadge> the previous <SelectBadge variant="blue">promotional period</SelectBadge> has ended.
          </CardContent>
          </Card>
          <div className='w-2 h-2 bg-primary absolute top-[94px] -left-1 md:block hidden'></div>
          <div className='absolute -bottom-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary md:hidden block'></div>
          </div>
          <div className='absolute -top-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary md:hidden block'></div>
          </div>
        </Card>
      </div>
      {/* <div className='absolute w-full flex justify-center'>
        <Image src="/dotted-line-3.png" alt="dotted-line-1" width={20} height={500} className='ml-2'/>
      </div> */}

      <Image src="/dotted-line-3.png" alt="dotted-line-1" width={20} height={500} className='-mt-6 -mb-6 ml-2 md:hidden block'/>
      <Image src="/dotted-line-2.png" alt="dotted-line-2" width={384} height={500} className='absolute top-[715px] left-[390px] md:block hidden'/>
      <div className="flex flex-col items-start justify-end gap-4 md:w-[740px] w-full md:mt-3 mt-0">
        <Card className="border-1 p-1 pt-0 relative">
          <Card className="text-tertiary pt-0 md:w-[500px] w-full border-1" style={{ border: '2px solid', borderImageSource: 'linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%)' }}>
            <CardContent className="space-y-2 text-2xl text-medium py-6">
              Reward <SelectBadge variant="red">only</SelectBadge> <SelectBadge variant="blue">long-term stakers</SelectBadge> who continued to stake <SelectBadge variant="red">after</SelectBadge> the previous <SelectBadge variant="blue">promotional period</SelectBadge> has ended.
            </CardContent>
          </Card>
          <div className='w-2 h-2 bg-primary absolute -top-1 left-[250px] md:block hidden'></div>
          <div className='absolute -top-1 w-full flex justify-center'>
            <div className='w-2 h-2 bg-primary md:hidden block'></div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ModernMarketingStack