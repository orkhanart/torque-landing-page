"use client";

import React from "react";

interface DitherTextureProps {
  className?: string;
  opacity?: number;
  color?: string;
}

// SVG-based dither pattern - extremely lightweight
const DitherTexture: React.FC<DitherTextureProps> = ({
  className = "",
  opacity = 0.03,
  color = "#ABFFFF",
}) => {
  // Create a simple 4x4 Bayer dither pattern as SVG
  const pattern = `
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
      <rect x="0" y="0" width="2" height="2" fill="${color}" opacity="0.1"/>
      <rect x="4" y="0" width="2" height="2" fill="${color}" opacity="0.5"/>
      <rect x="2" y="2" width="2" height="2" fill="${color}" opacity="0.7"/>
      <rect x="6" y="2" width="2" height="2" fill="${color}" opacity="0.3"/>
      <rect x="0" y="4" width="2" height="2" fill="${color}" opacity="0.8"/>
      <rect x="4" y="4" width="2" height="2" fill="${color}" opacity="0.2"/>
      <rect x="2" y="6" width="2" height="2" fill="${color}" opacity="0.4"/>
      <rect x="6" y="6" width="2" height="2" fill="${color}" opacity="0.6"/>
    </svg>
  `;

  const encodedPattern = `data:image/svg+xml,${encodeURIComponent(pattern)}`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("${encodedPattern}")`,
        backgroundRepeat: "repeat",
        opacity,
        mixBlendMode: "multiply",
      }}
    />
  );
};

export default DitherTexture;
