import Image from "next/image";

export default function Rewards() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-full px-4 py-16 bg-transparent">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
        Flexible rewards system using a no-code interface
      </h1>

      {/* GIF of flowchart builder */}
      <div className="w-full flex justify-center mb-8">
        <Image
          src="/flowchart-builder.gif" // Place your GIF in public/ as flowchart-builder.gif
          alt="Flowchart Builder"
          width={700}
          height={400}
          className="rounded-xl shadow-lg max-w-full h-auto"
        />
      </div>

      <p className="text-lg text-center text-gray-300 max-w-2xl mb-12">
        Enabling protocols to use their tokens as fuel for growth by launching
        and iterating on large-scale incentive campaigns.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
        <div className="flex flex-col items-center bg-[#10181F]/80 border border-[#A1FFFF]/20 rounded-xl p-6">
          <span className="text-xl font-semibold text-[#A1FFFF] mb-2">
            Leaderboards
          </span>
          <span className="text-gray-400 text-center">
            Reward top users and drive competition.
          </span>
        </div>
        <div className="flex flex-col items-center bg-[#10181F]/80 border border-[#A1FFFF]/20 rounded-xl p-6">
          <span className="text-xl font-semibold text-[#A1FFFF] mb-2">
            Raffles
          </span>
          <span className="text-gray-400 text-center">
            Randomized rewards for engagement.
          </span>
        </div>
        <div className="flex flex-col items-center bg-[#10181F]/80 border border-[#A1FFFF]/20 rounded-xl p-6">
          <span className="text-xl font-semibold text-[#A1FFFF] mb-2">
            Airdrops
          </span>
          <span className="text-gray-400 text-center">
            Distribute tokens to your community.
          </span>
        </div>
        <div className="flex flex-col items-center bg-[#10181F]/80 border border-[#A1FFFF]/20 rounded-xl p-6">
          <span className="text-xl font-semibold text-[#A1FFFF] mb-2">
            Other
          </span>
          <span className="text-gray-400 text-center">
            Custom reward mechanisms for any use case.
          </span>
        </div>
      </div>
    </main>
  );
}
