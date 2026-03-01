"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ImageGradient } from "@/components/ascii/ImageGradient";
import { CardVisualWrapper } from "@/components/card-visuals/CardVisualWrapper";
import { useOrientation } from "@/components/card-visuals/useOrientation";

// =============================================================================
// VisualCard — Unified layout shell for visual-backed cards
// =============================================================================
interface VisualCardProps {
  // Visual layer
  visual: React.ReactElement;
  visualColor?: string;
  visualSpeed?: number;
  filename: string;

  // Layout
  minHeight?: string;
  featured?: boolean;
  layout?: "adaptive" | "vertical";
  visualFill?: "box" | "full";

  // Terminal header extras
  headerRight?: React.ReactNode;
  badge?: React.ReactNode;

  // Interaction
  href?: string;
  onClick?: () => void;

  // Content
  children: React.ReactNode;
  className?: string;
}

export function VisualCard({
  visual,
  visualColor = "#0008FF",
  visualSpeed = 1,
  filename,
  minHeight,
  featured = false,
  layout = "vertical",
  visualFill = "box",
  headerRight,
  badge,
  href,
  onClick,
  children,
  className,
}: VisualCardProps) {
  const isAdaptive = layout === "adaptive";
  const isFull = visualFill === "full";
  const orientation = useOrientation(layout);

  const inner = (
    <>
      {/* Procedural visual background */}
      <div
        className={cn(
          "absolute inset-0 opacity-50 group-hover:opacity-100 transition-all duration-500",
          isAdaptive && !isFull &&
            "sm:relative sm:w-2/5 sm:inset-auto sm:scale-y-100 sm:origin-center xl:scale-y-100 xl:absolute xl:inset-0 xl:w-auto",
        )}
      >
        <CardVisualWrapper
          color={visualColor}
          speed={visualSpeed}
          orientation={orientation}
          className="relative w-full h-full"
        >
          {visual}
        </CardVisualWrapper>

        {/* Terminal header — scoped to visual area */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-1.5 z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span className="font-mono text-[9px] text-black/30">
              {filename}
            </span>
          </div>
          {headerRight}
        </div>
      </div>

      {/* White gradient overlays — fade on hover to reveal visual */}
      <ImageGradient
        className={cn(
          "bg-gradient-to-t from-white/70 via-white/40 to-transparent transition-opacity duration-500 group-hover:opacity-0",
          isAdaptive && "sm:hidden xl:block",
        )}
      />
      <ImageGradient
        className={cn(
          "bg-gradient-to-br from-white/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0",
          isAdaptive && "sm:hidden xl:block",
        )}
      />
      {/* Horizontal gradient for full-fill cards in horizontal mode */}
      {isAdaptive && isFull && (
        <ImageGradient
          className="hidden sm:block xl:hidden bg-gradient-to-r from-white/70 via-white/40 to-transparent transition-opacity duration-500 group-hover:opacity-0"
        />
      )}

      {/* Content area */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex flex-col p-4 pt-8",
          isAdaptive && !isFull &&
            "sm:relative sm:w-3/5 sm:inset-auto sm:p-5 sm:pt-5 xl:absolute xl:inset-0 xl:w-auto xl:p-4 xl:pt-8",
          isAdaptive && isFull &&
            "sm:w-3/5 sm:p-5 sm:pt-5 xl:w-auto xl:p-4 xl:pt-8",
        )}
      >
        {/* Horizontal backdrop gradient — full height, only in adaptive horizontal mode */}
        {isAdaptive && (
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none hidden sm:block xl:hidden" />
        )}

        <div
          className={cn(
            "mt-auto relative",
            isAdaptive && "sm:mt-0 xl:mt-auto",
          )}
        >
          {/* Vertical backdrop gradient — bottom up to just above text */}
          <div
            className={cn(
              "absolute -inset-x-4 -top-3 -bottom-4 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none",
              isAdaptive && "sm:hidden xl:block",
            )}
          />

          {children}
        </div>
      </div>

      {/* Optional floating badge */}
      {badge}
    </>
  );

  const wrapperClassName = cn(
    "group relative rounded-[3px] overflow-hidden border transition-all",
    featured
      ? "border-blue/30 shadow-[0_0_20px_rgba(0,8,255,0.08)]"
      : "border-black/10 hover:border-blue/30",
    isAdaptive && !isFull &&
      "min-h-[660px] sm:min-h-0 xl:min-h-[660px] sm:flex sm:flex-row-reverse xl:block",
    isAdaptive && isFull &&
      "min-h-[660px] sm:min-h-0 sm:h-80 xl:h-auto xl:min-h-[660px]",
    minHeight,
    className,
  );

  if (href) {
    return (
      <a href={href} className={wrapperClassName}>
        {inner}
      </a>
    );
  }

  return (
    <div
      className={wrapperClassName}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {inner}
    </div>
  );
}
