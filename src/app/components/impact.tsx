import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";


const Impact = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1280px] p-4">
      <div >
        <Badge className='mb-4'>Impact</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center xl:max-w-[1100px] md:max-w-[800px] md:leading-56 font-sans">
        Torque gives marketers the reward system they need to massively scale usage 
      </h1>
      <Card 
        className="p-4"
        style={{
          border: '1px solid transparent',
          borderImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)) 1',
          borderImageSlice: '1'
        }}
      >
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <Card className="!border-0">
          <div 
            className='relative p-4 rounded-lg h-full w-full lg:!border-r-0 '
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
          <CardHeader className="pl-4">
            <CardTitle className="flex items-center gap-2 text-2xl text-medium py-0">
              <Image src="/solana-logo.svg" alt="Solana Logo" width={45} height={45} className="box-shadow: 0px 0px 8px 0px hsla(180, 100%, 82%, 0.5);"/>
              Protocol Name
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-medium">
              Lorem ipsum dolor sit amet consectetur. Cursus faucibus pellentesque fermentum tellus sit et sit consequat urna. Arcu tortor vulputate ipsum amet. Id urna eu arcu faucibus. Elit porttitor sed convallis purus fermentum. Lorem ipsum dolor sit amet consectetur. Cursus faucibus pellentesque fermentum tellus sit et sit consequat urna. Arcu tortor vulputate ipsum amet. Id urna eu arcu faucibus. Elit porttitor sed convallis purus fermentum.
            </p>
          </CardContent>
          </div>
        </Card>

        <div className="grid-row-3">
          <Card className="!border-0">
          <div 
            className='relative p-4 rounded-lg h-full w-full'
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
            
            <CardHeader className="pl-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-medium py-0">
                <Image src="/solana-logo.svg" alt="Solana Logo" width={45} height={45} className="box-shadow: 0px 0px 8px 0px hsla(180, 100%, 82%, 0.5);"/>
                Protocol Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-medium">
                20% increase in SMB Gen3 floor price
              </p>
            </CardContent>
            </div>
          </Card>

          <Card className="!border-0">
            <div 
              className='relative p-4 rounded-lg h-full w-full'
              style={{
                border: '2px solid',
                borderImageSource: 'linear-gradient(180deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
                borderImageSlice: '1',
                background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
              }}
            >
            <CardHeader className="pl-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-medium py-0">
                <Image src="/solana-logo.svg" alt="Solana Logo" width={45} height={45} className="box-shadow: 0px 0px 8px 0px hsla(180, 100%, 82%, 0.5);"/>
                Protocol Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-medium">
                20% increase in SMB Gen3 floor price
              </p>
            </CardContent>
            </div>
          </Card>

          <Card className="!border-0">
            <div 
              className='relative p-4 rounded-lg h-full w-full'
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
                className="absolute -bottom-[3px] -left-[3px] z-50 lg:invisible visible"
              />
              
            <CardHeader className="pl-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-medium py-0">
                <Image src="/solana-logo.svg" alt="Solana Logo" width={45} height={45} className="box-shadow: 0px 0px 8px 0px hsla(180, 100%, 82%, 0.5);"/>
                Protocol Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-medium">
                20% increase in SMB Gen3 floor price
              </p>
            </CardContent>
            </div>
          </Card>
          
        </div>
        
      </div>
      </Card>
    </div>
  );
};

export default Impact;