"use client";

import React from "react";
import Image from "next/image";

const GetStarted = () => {

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 w-full min-h-[500px]">
      {/* <Image
        src="/Illustration-hexagons2.svg"
        alt="Illustration hexagons"
        width={1300}
        height={1300}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      /> */}
      <div className="flex flex-col items-center justify-start gap-4 z-50 pb-24 px-4">
        <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-2 text-center max-w-[900px] md:leading-56 font-sans">
          Join our{" "}
          <span className="bg-custom-gradient bg-clip-text text-transparent">
            early partners
          </span>
        </h1>
        <p className="text-lg text-center text-gray-300 max-w-[600px]">
          We&apos;re bringing on a few select teams to shape the future of
          onchain growth. Request access now to secure your spot.
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
