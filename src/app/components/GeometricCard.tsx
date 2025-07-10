"use client";

import { motion } from "framer-motion";

export function GeometricCard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="relative h-full bg-gray-900/50 border border-gray-800 hover:border-[#a1ffff]/50 transition-all duration-500 overflow-hidden flex flex-col group">
      {/* Top Accent Line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#a1ffff] to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.5 }}
      />

      <div className="p-8 pt-12 flex-1 flex flex-col">
        <div className="absolute top-4 left-4 opacity-30 group-hover:opacity-60 transition-opacity">
          <div className="absolute top-0 left-0 w-4 h-px bg-[#a1ffff]" />
          <div className="absolute top-0 left-0 w-px h-4 bg-[#a1ffff]" />
        </div>
        <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity rotate-90">
          <div className="absolute top-0 left-0 w-4 h-px bg-[#a1ffff]" />
          <div className="absolute top-0 left-0 w-px h-4 bg-[#a1ffff]" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl font-bold tracking-tight group-hover:text-[#a1ffff] transition-colors duration-300">
            {title}
          </h3>
          {description ? (
            <p className="text-white leading-relaxed font-normal flex-1 mt-4">
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
