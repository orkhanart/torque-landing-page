import Image from "next/image";

export function PlatformFeatures() {
  return (
    <main className="min-h-screen py-16">
      <h3 className="text-secondary">Lorem Ipsum</h3>
      <h1 className="text-foreground text-[40px]">Unique Features</h1>

      <div className="flex flex-row gap-8 h-auto mt-10">
        <div className="flex flex-col gap-8 flex-1">
          <div>
            <Image src="/Smart.svg" alt="Torque logo" width={800} height={800} />
          </div>
          <div>
            <Image src="/Campaign.svg" alt="Torque logo" width={800} height={800} />
          </div>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          <div>
            <Image src="/Intelligence.svg" alt="Torque logo" width={800} height={800} />
          </div>
          <div>
            <Image src="/No-code.svg" alt="Torque logo" width={800} height={800} />
          </div>
        </div>
      </div>
    </main>
  );
}
