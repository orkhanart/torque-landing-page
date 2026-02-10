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
    <section className="w-full py-12 border-b border-black/10 bg-white">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        <p className="font-mono text-xs uppercase tracking-wider text-black/40 text-center mb-8">
          Trusted by leading protocols
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="h-10 flex items-center justify-center opacity-30 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={120}
                height={40}
                className="h-6 md:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
