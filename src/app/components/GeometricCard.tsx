"use client";

import { motion } from "framer-motion";

export function GeometricCard({
  title,
  description,
  isActive = false,
}: {
  title: string;
  description?: string;
  isActive?: boolean;
}) {
  return (
    <div className={`relative h-full bg-gray-900/50 border transition-all duration-500 overflow-hidden flex flex-col group ${
      isActive 
        ? "border-[#a1ffff] bg-[#a1ffff]/10" 
        : "border-gray-800 hover:border-[#a1ffff]/50"
    }`}>
      {/* Top Accent Line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#a1ffff] to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.5 }}
      />

      <div className="p-6 flex-1 flex flex-col justify-center">
        <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <div className="absolute top-0 left-0 w-4 h-px bg-[#a1ffff]" />
          <div className="absolute top-0 left-0 w-px h-4 bg-[#a1ffff]" />
        </div>
        <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity rotate-90">
          <div className="absolute top-0 left-0 w-4 h-px bg-[#a1ffff]" />
          <div className="absolute top-0 left-0 w-px h-4 bg-[#a1ffff]" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 mb-2 ${
            isActive ? "text-[#a1ffff]" : "group-hover:text-[#a1ffff]"
          }`}>
            {title}
          </h3>
          {description ? (
            <p className="text-white text-xs leading-relaxed font-normal flex-1">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#a1ffff] to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.5 }}
      />

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-[#a1ffff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(161, 255, 255, 0.05) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
