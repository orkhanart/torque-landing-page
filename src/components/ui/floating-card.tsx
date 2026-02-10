"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'hero';
  glassIntensity?: 'light' | 'medium' | 'strong';
  float?: boolean;
  tilt?: boolean;
  className?: string;
}

export function FloatingCard({
  children,
  variant = 'default',
  glassIntensity = 'medium',
  float = false,
  tilt = false,
  className = '',
}: FloatingCardProps) {

  const getGlassClass = () => {
    switch (glassIntensity) {
      case 'light':
        return 'bg-white/5 border-white/10 backdrop-blur-sm';
      case 'medium':
        return 'bg-white/10 border-white/20 backdrop-blur-md';
      case 'strong':
        return 'bg-white/15 border-white/30 backdrop-blur-lg';
      default:
        return 'bg-white/10 border-white/20 backdrop-blur-md';
    }
  };

  const getShadowClass = () => {
    switch (variant) {
      case 'hero':
        return 'shadow-[0_20px_60px_rgba(0,0,0,0.3)]';
      case 'elevated':
        return 'shadow-[0_12px_40px_rgba(0,0,0,0.2)]';
      default:
        return 'shadow-[0_8px_32px_rgba(31,38,135,0.15)]';
    }
  };

  const floatAnimation = float
    ? {
        animate: {
          y: [0, -20, 0],
        },
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }
    : {};

  const baseClasses = `
    ${getGlassClass()}
    ${getShadowClass()}
    border
    rounded-2xl
    overflow-hidden
    transition-all
    duration-300
    hover:shadow-[0_8px_32px_rgba(31,38,135,0.25)]
    hover:border-white/30
    ${className}
  `;

  if (float || tilt) {
    return (
      <motion.div
        className={baseClasses}
        {...floatAnimation}
        whileHover={tilt ? { rotateX: 5, rotateY: 5 } : {}}
        style={tilt ? { transformStyle: 'preserve-3d' } : {}}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
