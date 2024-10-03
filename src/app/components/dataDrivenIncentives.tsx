import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Frame from "@/components/ui/frame";
import Image from 'next/image';

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
      <div >
        <Badge className='mb-4'>Data Driven Incentives</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl  mb-12 text-center max-w-[800px] font-medium md:leading-56 font-sans z-50 p-4">
        <span className="bg-custom-gradient bg-clip-text text-transparent">Reward users</span> with airdrops, points, quests, and grants based on their onchain and offchain activity
      </h1>
      <Card 
        className="grid grid-cols-1 md:grid-cols-3 z-50 p-4 border border-[rgba(100, 100, 100, 0.01)] " 
        style={{
          border: '1px solid transparent',
          borderImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)) 1',
          borderImageSlice: '1'
        }}
      >
        <Card className='md:h-[324px] h-auto  md:w-[416px] w-full !border-0'>
          <div 
            className='relative p-4 rounded-lg h-full w-full flex flex-col justify-end pb-6 lg:!border-r-0'
            style={{
              border: '2px solid',
              borderImageSource: 'linear-gradient(180deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
              borderImageSlice: '1',
              background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
            }}
          >
            <Image
              src={"/lower-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -bottom-[3px] -left-[3px] z-50 lg:visible invisible"
            />
            <Image
              src={"/upper-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -top-[3px] -right-[3px] z-50 lg:invisible visible"
            />
            <CardHeader className=''>
              <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
              <CardTitle className='text-[32px] pb-0 pt-6'>Name of feature</CardTitle>
              <CardDescription className='text-[18px] pt-0'>Opus igitur est dicere possit dura omni specie, Tu autem in specie, non videntur, nec</CardDescription>
            </CardHeader>
          </div>
        </Card>

        <Card className='md:h-[324px] h-auto  md:w-[416px] w-full !border-0'>
          <div 
            className='relative p-4 rounded-lg h-full w-full flex flex-col justify-end pb-6 lg:!border-r-0 '
            style={{
              border: '2px solid',
              borderImageSource: 'linear-gradient(180deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
              borderImageSlice: '1',
              background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
            }}
          >
            <Image
              src={"/lower-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -bottom-[3px] -left-[3px] z-50"
            />  
            <CardHeader className=''>
              <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
              <CardTitle className='text-[32px] pb-0 pt-6'>Name of feature</CardTitle>
              <CardDescription className='text-[18px] pt-0'>Opus igitur est dicere possit dura omni specie, Tu autem in specie, non videntur, nec</CardDescription>
            </CardHeader>
          </div>
        </Card>

        <Card className='md:h-[324px] h-auto  md:w-[416px] w-full !border-0'>
          <div 
            className='relative p-4 rounded-lg h-full w-full flex flex-col justify-end pb-6'
            style={{
              border: '2px solid',
              borderImageSource: 'linear-gradient(180deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
              borderImageSlice: '1',
              background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
            }}
          >
            <Image
              src={"/upper-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -top-[3px] -right-[3px] z-50 lg:visible invisible"
            />

            <Image
              src={"/upper-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -top-[3px] -left-[3px] z-50 -rotate-90 lg:invisible visible"
            />

            <Image
              src={"/lower-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -bottom-[3px] -left-[3px] z-50 lg:visible invisible"
            /> 
            <Image
              src={"/lower-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -bottom-[3px] -right-[3px] z-50 -rotate-90 lg:visible invisible"
            />
            <CardHeader className=''>
              <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
              <CardTitle className='text-[32px] pb-0 pt-6'>Name of feature</CardTitle>
              <CardDescription className='text-[18px] pt-0'>Opus igitur est dicere possit dura omni specie, Tu autem in specie, non videntur, nec</CardDescription>
            </CardHeader>
          </div>
        </Card>

        <Card className='md:h-[324px] h-auto  md:w-[416px] w-full !border-0'>
          {/* <Frame className="flex flex-col justify-end pb-6 !border-t-0 !border-r-0"
            upperRightCorner={true}
            lowerLeftCorner={false}
            lowerRightCorner={false}
            upperLeftCorner={true}
          > */}
          <div 
            className='relative p-4 rounded-lg h-full w-full flex flex-col justify-end pb-6 !border-t-0 lg:!border-r-0 '
            style={{
              border: '2px solid',
              borderImageSource: 'linear-gradient(0deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
              borderImageSlice: '1',
              background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
            }}
          >
            <Image
              src={"/upper-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -top-[3px] -right-[3px] z-50 lg:visible invisible"
            />
            <Image
              src={"/lower-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -bottom-[3px] -left-[3px] z-50 lg:visible invisible"
            /> 
            <Image
              src={"/lower-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -bottom-[3px] -right-[3px] z-50 -rotate-90 lg:invisible visible"
            />
            <Image
              src={"/upper-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -top-[3px] -left-[3px] z-50 -rotate-90 lg:visible invisible"
            />
            <CardHeader className=''>
              <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
              <CardTitle className='text-[32px] pb-0 pt-6'>Name of feature</CardTitle>
              <CardDescription className='text-[18px] pt-0'>Opus igitur est dicere possit dura omni specie, Tu autem in specie, non videntur, nec</CardDescription>
            </CardHeader>
          </div>
        </Card>
        <Card className='md:h-[324px] h-auto  md:w-[416px] w-full !border-0'>
          <div 
            className='relative p-4 rounded-lg h-full w-full flex flex-col justify-end pb-6 !border-t-0 lg:!border-r-0'
            style={{
              border: '2px solid',
              borderImageSource: 'linear-gradient(0deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
              borderImageSlice: '1',
              background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
            }}
          >
            <Image
              src={"/upper-cross.svg"}
              alt="Frame"
              width={16}
              height={16}
              className="absolute -top-[3px] -right-[3px] z-50"
            />
            <CardHeader className=''>
              <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
              <CardTitle className='text-[32px] pb-0 pt-6'>Name of feature</CardTitle>
              <CardDescription className='text-[18px] pt-0'>Opus igitur est dicere possit dura omni specie, Tu autem in specie, non videntur, nec</CardDescription>
            </CardHeader>
          </div>
        </Card>
        <Card className='md:h-[324px] h-auto md:w-[416px] w-full !border-0'>
      <div 
        className='relative p-4 rounded-lg h-full w-full flex flex-col justify-end pb-6 !border-t-0'
        style={{
          border: '2px solid',
          borderImageSource: 'linear-gradient(0deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
          borderImageSlice: '1',
          background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
        }}
      >
        <Image
          src={"/upper-cross.svg"}
          alt="Frame"
          width={16}
          height={16}
          className="absolute -top-[3px] -right-[3px] z-50 lg:visible invisible"
        />
        <Image
          src={"/lower-cross.svg"}
          alt="Frame"
          width={16}
          height={16}
          className="absolute -bottom-[3px] -left-[3px] z-50 lg:invisible visible"
        />
        <CardHeader className=''>
          <Image src="/hexagone.png" alt="bullet point" width={45} height={45} />
          <CardTitle className='text-[32px] pb-0 pt-6'>Name of feature</CardTitle>
          <CardDescription className='text-[18px] pt-0'>Opus igitur est dicere possit dura omni specie, Tu autem in specie, non videntur, nec</CardDescription>
        </CardHeader>
      </div>
      </Card>
      </Card>
    </div>
  );
};

export default DataDrivenIncentives;