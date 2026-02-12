"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Code, Trophy, Brain, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// 3D Tilt Card Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

function TiltCard({ children, className = "", intensity = 10 }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXVal = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYVal = (mouseX / (rect.width / 2)) * intensity;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02, z: 20 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function GrowthStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="growth-stack" className="w-full bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-32" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/40 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <span className="w-1.5 h-1.5 bg-blue rounded-full" />
              Platform Features
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight">
              Your Complete
              <br />
              <span className="text-black/40">Growth Stack</span>
            </h2>
          </div>
          <Button variant="outline" href="/platform" className="w-fit">
            Explore Platform
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          style={{ perspective: 1000 }}
        >

          {/* Large Card - Programmable Rewards (spans 2 cols on lg) */}
          <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-2">
            <TiltCard intensity={5} className="h-full">
              <div className="bg-black text-white p-8 md:p-10 rounded-[3px] group hover:bg-black-light transition-all duration-300 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-[3px] bg-white/10 flex items-center justify-center">
                      <Code className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-white/50">Core Feature</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
                    Programmable Rewards
                  </h3>

                  <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    Set conditions like &quot;only reward users who hold &gt;$1K and traded 3+ times this week.&quot; No more paying for bots or one-time farmers.
                  </p>

                  <div className="mt-auto flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Zap className="w-4 h-4" />
                      <span>Conditional Logic</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <span className="w-1.5 h-1.5 bg-blue rounded-full" />
                      <span>Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Small Card - Leaderboards */}
          <motion.div variants={cardVariants}>
            <TiltCard intensity={8} className="h-full">
              <div className="bg-white border border-black/10 p-6 md:p-8 rounded-[3px] group hover:border-black/30 transition-all duration-300 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-[3px] bg-black/5 flex items-center justify-center mb-6 group-hover:bg-blue/10 transition-colors">
                    <Trophy className="w-5 h-5 text-black group-hover:text-blue transition-colors" />
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-medium text-black mb-3">
                    Leaderboards
                  </h3>

                  <p className="text-black/50 text-sm leading-relaxed mb-6">
                    Real-time rankings turn passive holders into competing power users.
                  </p>

                  <div className="mt-auto">
                    <span className="inline-flex items-center text-sm font-medium text-black/60 group-hover:text-blue transition-colors">
                      2.1x volume increase
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Small Card - AI Insights */}
          <motion.div variants={cardVariants}>
            <TiltCard intensity={8} className="h-full">
              <div className="bg-white border border-black/10 p-6 md:p-8 rounded-[3px] group hover:border-black/30 transition-all duration-300 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-[3px] bg-black/5 flex items-center justify-center mb-6 group-hover:bg-blue/10 transition-colors">
                    <Brain className="w-5 h-5 text-black group-hover:text-blue transition-colors" />
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-medium text-black mb-3">
                    AI Insights
                  </h3>

                  <p className="text-black/50 text-sm leading-relaxed mb-6">
                    Ask &quot;Which wallets are about to churn?&quot; and get actionable recommendations.
                  </p>

                  <div className="mt-auto">
                    <span className="inline-flex items-center text-sm font-medium text-black/60 group-hover:text-blue transition-colors">
                      Predictive analytics
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Wide Card - API / SDK */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <TiltCard intensity={3} className="h-full">
              <div className="bg-black/5 border border-black/10 p-6 md:p-8 rounded-[3px] group hover:border-black/30 transition-all duration-300 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="font-display text-xl font-medium text-black mb-2">
                      Developer-first Infrastructure
                    </h3>
                    <p className="text-black/50 text-sm">
                      Full API access, webhooks, and SDK for seamless integration with your stack.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-black/10 rounded-[3px] font-mono text-xs text-black/60 group-hover:bg-blue/10 group-hover:text-blue transition-colors">REST API</span>
                    <span className="px-3 py-1.5 bg-black/10 rounded-[3px] font-mono text-xs text-black/60 group-hover:bg-blue/10 group-hover:text-blue transition-colors">Webhooks</span>
                    <span className="px-3 py-1.5 bg-black/10 rounded-[3px] font-mono text-xs text-black/60 group-hover:bg-blue/10 group-hover:text-blue transition-colors">SDK</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
