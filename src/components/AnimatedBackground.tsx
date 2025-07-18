"use client";

import { useState, useEffect } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Mouse-following Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, #A1FFFF 0%, transparent 70%)",
          left: `${mousePosition.x * 0.02}px`,
          top: `${mousePosition.y * 0.02}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, #F1A3A1 0%, transparent 70%)",
          right: `${mousePosition.x * -0.01}px`,
          bottom: `${mousePosition.y * -0.01}px`,
          transform: "translate(50%, 50%)",
          animationDelay: "1s",
        }}
      />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(161, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(161, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div
        className="absolute top-20 left-20 w-4 h-4 border-2 border-[#A1FFFF] rotate-45 animate-spin -z-10"
        style={{ animationDuration: "8s" }}
      />
      <div className="absolute top-40 right-32 w-6 h-6 border-2 border-[#F1A3A1] animate-bounce -z-10" />
      <div
        className="absolute bottom-20 right-20 w-5 h-5 border-2 border-[#F1A3A1] rotate-12 animate-spin -z-10"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute top-1/3 right-10 w-4 h-4 border border-[#A1FFFF] animate-spin -z-10"
        style={{ animationDuration: "10s" }}
      />
      <div
        className="absolute top-1/4 left-1/3 w-5 h-5 border-2 border-[#A1FFFF] rotate-30 animate-spin -z-10"
        style={{ animationDuration: "7s" }}
      />
      <div className="absolute bottom-40 left-32 w-6 h-6 border-2 border-[#F1A3A1] animate-bounce -z-10" />
      <div
        className="absolute top-20 right-1/4 w-4 h-4 border-2 border-[#F1A3A1] rotate-20 animate-spin -z-10"
        style={{ animationDuration: "9s" }}
      />
      <div
        className="absolute bottom-1/3 left-10 w-5 h-5 border border-[#A1FFFF] animate-spin -z-10"
        style={{ animationDuration: "11s" }}
      />
      <div
        className="absolute top-2/3 left-1/4 w-4 h-4 border-2 border-[#A1FFFF] rotate-15 animate-spin -z-10"
        style={{ animationDuration: "8.5s" }}
      />
    </div>
  );
}
