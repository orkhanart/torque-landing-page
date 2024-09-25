import { CustomShapeButton } from "@/components/ui/customShapeButton";
import React from "react";

const GetStarted = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] leading-56 font-sans">
        Get started with Torque
      </h1>
      <p className="text-lg text-center max-w-[900px]">
        Tenete ergo quod si servitus quae natura liber, et aliena tua tunc
      </p>
      <CustomShapeButton>Try out Torque</CustomShapeButton>
    </div>
  );
};

export default GetStarted;
