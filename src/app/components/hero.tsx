import React from "react";
import { CustomButton } from "@/components/ui/customButton";

const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background:
          "linear-gradient(to right, transparent, hsla(198, 100%, 60%, 0.5) 10%, hsla(198, 100%, 60%, 0.5) 70%, transparent)",
        backgroundImage:
          "linear-gradient(to right, hsla(198, 100%, 60%, 0.4) 16.67%, rgba(255,255,255,0) 0%)",
        backgroundPosition: "center",
        backgroundSize: "60px 1px", // Adjusted to account for the new ratio
        backgroundRepeat: "repeat-x",
        margin: "",
        maskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    />
  );
};

const Hero = () => {
  return (
    <div className="relative text-white min-h-[90vh] flex flex-col w-full items-center justify-between pt-14 px-4 ">
      <div className="text-center sm:px-6 lg:px-8 lg:pt-12 sm:pt-8pt-0">
        <h1 className=" sm:text-[56px] text-6xl lg:text-8xl font-semibold sm:mb-8 mb-4 font-sans leading-56">
          The growth protocol
        </h1>
        <p className="md:text-2xl sm:text-lg text-base sm:mb-8 mb-6 text-gray-300">
          incentivize any user for any action in seconds
        </p>
        <CustomButton customVariant="big">Try out Torque</CustomButton>
      </div>

      <div className="absolute bottom-0 z-10 flex flex-col w-full items-center md:mt-0 mt-24">
        {/* <div className="flex flex-col lg:flex-row items-center gap-8 mb-16 mt-20 lg:mt-0 pt-10">
          <p className="text-sm text-tertiary font-medium mt-0 lg:mt-0">
            Trusted by
          </p>
          <div className="flex lg:flex-row flex-col items-center justify-start gap-4">
            <div className="flex flex-row items-center justify-center gap-4">
              <Image
                src={`/jump-logo.png`}
                alt={`jump logo`}
                width={86}
                height={70}
                className="opacity-60"
              />
              <Image
                src={`/meta-logo.png`}
                alt={`meta logo`}
                width={93}
                height={70}
                className="opacity-60"
              />
              <Image
                src={`/discord-type-logo.png`}
                alt={`discord logo`}
                width={108}
                height={108}
                className="opacity-60"
              />
            </div>
            <div className="flex flex-row items-center justify-center  gap-4">
              <Image
                src={`/brave-logo.png`}
                alt={`brave logo`}
                width={74}
                height={74}
                className="opacity-60"
              />
              <Image
                src={`/stripe-logo.png`}
                alt={`stripe logo`}
                width={52.174}
                height={52.174}
                className="opacity-60"
              />
            </div>
          </div>
        </div> */}

        <Divider />
      </div>
    </div>
  );
};

export default Hero;
