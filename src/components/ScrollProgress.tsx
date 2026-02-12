"use client";

import React from "react";
import { useScrollProgress } from "@/hooks/useScroll";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
  showAtTop?: boolean;
  showAtBottom?: boolean;
}

export function ScrollProgress({
  color = "#0000FF",
  height = 2,
  zIndex = 50,
  showAtTop = false,
  showAtBottom = false,
}: ScrollProgressProps) {
  const { progress } = useScrollProgress();

  // Hide at very top or very bottom if configured
  const shouldHide =
    (!showAtTop && progress < 0.01) || (!showAtBottom && progress > 0.99);

  return (
    <div
      className="fixed left-0 top-0 w-full transition-opacity duration-300"
      style={{
        height: `${height}px`,
        zIndex,
        opacity: shouldHide ? 0 : 1,
      }}
    >
      <div
        className="h-full transition-transform duration-75 ease-out"
        style={{
          backgroundColor: color,
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
        }}
      />
    </div>
  );
}

export default ScrollProgress;
