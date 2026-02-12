"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface DistortedTextProps {
  text: string;
  className?: string;
}

export function DistortedText({ text, className = "" }: DistortedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll-driven wave effect
  const waveOffset = useTransform(scrollYProgress, [0, 1], [0, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ y: waveOffset }}
    >
      <div
        className="font-mono font-bold leading-none select-none w-full"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {text.split("").map((char, i) => {
          const charX = (i + 0.5) / text.length;
          const distFromMouse = Math.abs(charX - mousePosition.x);
          const rippleEffect = isHovering
            ? Math.max(0, 1 - distFromMouse * 3) * 10
            : 0;

          return (
            <motion.span
              key={i}
              animate={{
                y: rippleEffect * Math.sin(Date.now() * 0.005 + i),
                scale: 1 + rippleEffect * 0.02,
              }}
              transition={{ duration: 0.1 }}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default DistortedText;
