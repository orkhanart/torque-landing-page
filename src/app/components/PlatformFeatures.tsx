import Image from "next/image";

export function PlatformFeatures() {
  return (
    <main className="py-8 md:py-16">
      <h3 className="text-secondary text-sm md:text-base mb-2 md:mb-4">What makes us different</h3>
      <h1 className="text-foreground text-2xl md:text-[40px]">Unique Features</h1>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 h-auto mt-6 md:mt-10">
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          <div className="transition-transform duration-300 hover:scale-[102%]">
            <Image src="/Smart.svg" alt="Smart Onchain Incentives" width={800} height={800} className="w-full h-auto" />
          </div>
          <div className="transition-transform duration-300 hover:scale-[102%]">
            <Image src="/Campaign.svg" alt="Campaign Builder" width={800} height={800} className="w-full h-auto" />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          <div className="transition-transform duration-300 hover:scale-[102%]">
            <Image src="/Intelligence.svg" alt="Intelligent Assistant" width={800} height={800} className="w-full h-auto" />
          </div>
          <div className="transition-transform duration-300 hover:scale-[102%]">
            <Image src="/No-code.svg" alt="No-code Client" width={800} height={800} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </main>
  );
}
