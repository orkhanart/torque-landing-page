"use client";

import React from "react";
import Image from "next/image";

const logos = [
  { name: "Solana", src: "/logos/solana.svg" },
  { name: "Raydium", src: "/logos/raydium.svg" },
  { name: "Metaplex", src: "/logos/metaplex.svg" },
  { name: "Darklake", src: "/logos/darklake.svg" },
];

export default function TrustBar() {
  return (
    <section className="w-full pt-20 md:pt-32 pb-20 bg-white overflow-hidden px-6 md:px-12 lg:px-20">
      <div className="w-full">
        <p className="font-mono text-xs uppercase tracking-wider text-black/40 mb-8">
          Trusted by leading protocols
        </p>

        {/* Static logos */}
        <div className="flex items-center justify-start gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="h-14 flex items-center justify-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={160}
                height={56}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
