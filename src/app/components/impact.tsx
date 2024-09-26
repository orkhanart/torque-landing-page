import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Frame from "@/components/ui/frame";
import Image from "next/image";


const Impact = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1280px]">
      <div >
        <Badge className='mb-4'>Impact</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[1000px] leading-56 font-sans">
        Torque gives marketers the reward system they need to massively scale usage 
      </h1>
      <Card className="p-4 !border-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <Card className="!border-0">
          <Frame 
            upperRightCorner={false}
            className="!border-r-0"
          >
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
          </Frame>
        </Card>
        <div className="grid-row-3">
          <Card className="!border-0">
            <Frame lowerRightCorner={false} lowerLeftCorner={false}>
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
            </Frame>
          </Card>
          <Card className="!border-0">
            <Frame upperRightCorner={false} lowerLeftCorner={false}>
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
            </Frame>
          </Card>
          <Card className="!border-0">
            <Frame upperRightCorner={false} lowerLeftCorner={false}>
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
            </Frame>
          </Card>
          
        </div>
        
      </div>
      </Card>
    </div>
  );
};

export default Impact;