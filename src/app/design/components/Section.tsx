"use client";

import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({
  id,
  number,
  title,
  description,
  children,
  className,
  dark,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen border-b",
        dark
          ? "bg-[#08090A] text-white border-white/5"
          : "bg-white text-black border-black/5",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <div
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.2em] mb-2",
              dark ? "text-white/30" : "text-black/30"
            )}
          >
            {number}
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-base md:text-lg max-w-2xl leading-relaxed",
                dark ? "text-white/50" : "text-black/50"
              )}
            >
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
