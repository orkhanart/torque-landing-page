import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center max-w-[1400px] px-4">
      <h1 className="text-4xl text-3xl lg:text-5xl mb-20 font-medium text-center xl:max-w-[1100px] md:max-w-[800px] md:leading-56 font-sans">
        Torque makes crypto&apos;s user data actionable, enabling builders to{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          reward power users
        </span>{" "}
        &{" "}
        <span className="bg-custom-gradient bg-clip-text text-transparent">
          scale
        </span>{" "}
      </h1>
      <div className="flex xl:flex-row flex-col justify-center items-center lg:gap-12 gap-8">
        <Card className="md:w-[588px] w-full md:h-[400px] h-auto p-4">

        </Card>
        <Card className="md:w-[588px] w-full md:h-[400px] h-auto p-4">

        </Card>
      </div>
    </div>
  );
};

export default About;
