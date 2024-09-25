import React from 'react';
import { CustomButton } from "@/components/ui/customButton";
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
];

const Divider = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, hsla(198, 100%, 60%, 0.5) 10%, hsla(198, 100%, 60%, 0.5) 70%, transparent)',
        backgroundImage: 'linear-gradient(to right, hsla(198, 100%, 60%, 0.4) 16.67%, rgba(255,255,255,0) 0%)',
        backgroundPosition: 'center',
        backgroundSize: '60px 1px', // Adjusted to account for the new ratio
        backgroundRepeat: 'repeat-x',
        margin: '40px 0',
        maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
      }}
    />
  );
};

const Hero = () => {
  return (
    <div className="text-white min-h-[80vh] flex flex-col w-full items-center justify-between pt-14">
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold mb-6 font-sans">
          The growth protocol
        </h1>
        <p className="text-2xl mb-10 text-gray-300">
          Tenete ergo quod si servitus quae natura liber, et aliena tua tunc
        </p>
        <CustomButton customVariant="big">
          Try out Torque
        </CustomButton>
      </div>

      <div className='flex flex-col w-full items-center'>
        <div className="flex flex-row items-center gap-6 mb-8">
          <p className="text-sm text-tertiary">Trusted by</p>
          <div className="flex flex-row space-x-8 items-center">
            {brands.map((brand) => (
              <Image 
                key={brand.name}
                src={`/${brand.name}-logo.png`}
                alt={`${brand.name} logo`}
                width={brand.size}
                height={brand.size}
                className="opacity-60"
              />
            ))}
          </div>
        </div>
        
        <Divider />
      </div>
    </div>
  );
};

export default Hero;