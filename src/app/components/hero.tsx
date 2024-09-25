import React from 'react';
import { CustomShapedButton } from "@/components/ui/customShapeButton";
import Image from 'next/image';

const brands = [
  {
    name: 'jump',
    size: 86
  },
  {
    name: 'meta',
    size: 93
  },
  {
    name: 'discord-type',
    size: 108
  },
  {
    name: 'brave',
    size: 74
  },
  {
    name: 'stripe',
    size: 52.174
  }
]

const Hero = () => {
  return (
    <div className="text-white min-h-[80vh] flex flex-col w-full items-center justify-between pt-14">
      {/* <div className="absolute inset-0 overflow-hidden top-24">
        <div className="absolute top-24 inset-0 bg-[url('/path-to-your-pattern-image.svg')] bg-center bg-no-repeat opacity-20"></div>
      </div> */}

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold mb-6 font-sans">
          The growth protocol
        </h1>
        <p className="text-2xl mb-10 text-gray-300">
          Tenete ergo quod si servitus quae natura liber, et aliena tua tunc
        </p>
        <CustomShapedButton className="bg-cyan-300 text-gray-900 hover:bg-cyan-400 transition-colors">
          Try out Torque
        </CustomShapedButton>
      </div>
        <div>
        <div className="flex flex-row items-center gap-6">
          <p className="text-sm text-tertiary">Trusted by</p>
          <div className="flex flex-row space-x-8 items-center">
            {brands.map((brand) => (
              <Image 
                key={brand.name}
                src={`/${brand.name}-logo.png`}
                alt={`${brand.name} logo`}
                width={brand.size}
                height={brand.size}
                className="opacity-70"
              />
            ))}
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
    </div>
  );
};

export default Hero;