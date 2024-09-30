import { CustomButton } from "@/components/ui/customButton";
import React from "react";
import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 w-full min-h-[760px]">
      <Image
        src="/Illustration-hexagons2.svg"
        alt="Illustration hexagons"
        width={1300}
        height={1300}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="flex flex-col items-center justify-start gap-4 z-50 pb-24">
        
         <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-2 text-center max-w-[900px] md:leading-56 font-sans">
          Get started with Torque
        </h1>
        <p className="text-lg text-center max-w-[900px] mb-8 text-tertiary">
          Tenete ergo quod si servitus quae natura liber, et aliena tua tunc
        </p>
        <CustomButton customVariant="big" className="shadow-[0px_0px_40px_0px_rgba(161,255,255,0.4)] z-50">
          Try out Torque
        </CustomButton>
      </div>
     
    </div>
  );
};

export default GetStarted;
