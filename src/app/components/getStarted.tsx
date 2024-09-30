import { CustomButton } from "@/components/ui/customButton";
import React from "react";

const GetStarted = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-2 text-center max-w-[900px] md:leading-56 font-sans">
        Get started with Torque
      </h1>
      <p className="text-lg text-center max-w-[900px] mb-8 text-tertiary">
        Tenete ergo quod si servitus quae natura liber, et aliena tua tunc
      </p>
      <CustomButton customVariant="big">Try out Torque</CustomButton>
    </div>
  );
};

export default GetStarted;
