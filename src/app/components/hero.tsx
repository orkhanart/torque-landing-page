import React from 'react';
import { CustomShapeButton } from "@/components/ui/customShapeButton";
// import Image from 'next/image';

const Hero = () => {
  return (
    <div className="text-white min-h-screen flex flex-col w-full">
      {/* <div className="absolute inset-0 overflow-hidden top-24">
        <div className="absolute top-24 inset-0 bg-[url('/path-to-your-pattern-image.svg')] bg-center bg-no-repeat opacity-20"></div>
      </div> */}

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
          The growth protocol
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-300">
          Tenete ergo quod si servitus quae natura liber, et aliena tua tunc
        </p>
        <CustomShapeButton className="bg-cyan-300 text-gray-900 hover:bg-cyan-400 transition-colors">
          Try out Torque
        </CustomShapeButton>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
        <p className="text-sm text-gray-400 mb-4">Trusted by</p>
        <div className="flex justify-center space-x-8">
          {/* {['jump', 'meta', 'discord', 'brave', 'stripe'].map((brand) => (
            <Image 
              key={brand}
              src={`/${brand}-logo.svg`}
              alt={`${brand} logo`}
              className="h-6 w-auto filter brightness-0 invert opacity-50"
            />
          ))} */}
        </div>
      </div>
      <div className="z-50 inset-0 overflow-hidden">
        <div 
          className="inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"
          style={{ 
            backgroundSize: '1000px 1000px',
            opacity: 0.2
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;