import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconBeltProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  gapClassName?: string; // Tailwind gap classes for responsive spacing (e.g., "gap-10 md:gap-20")
  pauseOnHover?: boolean;
  className?: string;
  repeatCount?: number; // How many times to repeat the items array
}

export function IconBelt({
  items,
  speed = 18,
  direction = "left",
  gap = 28,
  gapClassName,
  pauseOnHover = true,
  className = "",
  repeatCount = 4,
}: IconBeltProps) {
  const prefersReducedMotion = useReducedMotion();

  // Repeat items multiple times to make the belt longer
  const repeatedItems = Array.from({ length: repeatCount }, () => items).flat();

  // Keyframe targets for the seamless loop
  // Since we duplicate items, we only need to animate halfway (-50%)
  // At -50%, the second set of items is in the same position as the first set was at 0%
  const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pauseOnHover || prefersReducedMotion) return;
    const el = e.currentTarget as HTMLElement;
    const computedStyle = window.getComputedStyle(el);
    const transform = computedStyle.transform;
    // Lock the current position
    el.style.transform = transform;
    // Remove Framer Motion's animation by setting animation to none
    el.style.animation = "none";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pauseOnHover || prefersReducedMotion) return;
    const el = e.currentTarget as HTMLElement;
    // Clear the locked transform to resume animation
    el.style.transform = "";
    el.style.animation = "";
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={{
        // soft edge fade (works in modern browsers); harmless where unsupported
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        whiteSpace: "nowrap",
        display: "flex",
      }}
    >
      <motion.div
        role="list"
        aria-label="moving icon belt"
        style={{
          display: "inline-flex",
          ...(gapClassName ? {} : { gap: `${gap}px` }),
        }}
        className={gapClassName || ""}
        animate={!prefersReducedMotion ? { x: animateX } : undefined}
        transition={
          !prefersReducedMotion
            ? {
                duration: speed,
                ease: "linear",
                repeat: Infinity,
              }
            : undefined
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Render repeated icons twice so the loop can be seamless */}
        {[...repeatedItems, ...repeatedItems].map((node, i) => (
          <div key={i} role="listitem" style={{ display: "inline-block" }}>
            {node}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
