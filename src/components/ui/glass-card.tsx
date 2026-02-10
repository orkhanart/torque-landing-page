"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Enable 3D tilt effect on hover (currently disabled for stability) */
  tilt?: boolean;
  /** Enable glow effect on hover */
  glow?: boolean;
  /** Enable scale effect on hover */
  scale?: boolean;
  /** Border style: 'subtle' | 'cyan' | 'none' */
  border?: "subtle" | "cyan" | "none";
  /** Card padding preset */
  padding?: "sm" | "md" | "lg" | "none";
  /** Enable blur backdrop */
  blur?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = true,
  scale = false,
  border = "subtle",
  padding = "md",
  blur = true,
}: GlassCardProps) {
  // Border styles
  const borderStyles = {
    subtle: "border border-black/[0.08]",
    cyan: "border border-primary/30",
    none: "",
  };

  // Padding styles
  const paddingStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    none: "",
  };

  return (
    <div
      className={cn(
        // Base styles
        "relative rounded-2xl overflow-hidden",
        // Glass effect
        blur && "bg-white/80 backdrop-blur-xl",
        !blur && "bg-white",
        // Border
        borderStyles[border],
        // Padding
        paddingStyles[padding],
        // Shadow
        "shadow-glass",
        // Hover effects
        "transition-all duration-300",
        scale && "hover:scale-[1.02]",
        glow && "hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.12),0_0_30px_0_rgba(0,179,179,0.15)]",
        className
      )}
    >
      {/* Subtle gradient overlay for glass effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/** Simpler glass card without effects */
export function GlassCardStatic({
  children,
  className,
  border = "subtle",
  padding = "md",
  glow = false,
}: Omit<GlassCardProps, "tilt" | "scale" | "blur">) {
  const borderStyles = {
    subtle: "border border-black/[0.08]",
    cyan: "border border-primary/30",
    none: "",
  };

  const paddingStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    none: "",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/90 backdrop-blur-xl",
        borderStyles[border],
        paddingStyles[padding],
        "shadow-glass",
        "transition-all duration-300",
        glow && "hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.12),0_0_30px_0_rgba(0,179,179,0.15)]",
        !glow && "hover:shadow-glass-hover",
        className
      )}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
