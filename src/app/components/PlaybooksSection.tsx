"use client";

import React, { useRef } from "react";
import { ArrowUpRight, Zap, Users, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const formulaVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const featuredPlaybooks = [
  {
    id: "01",
    type: "RECIPE",
    title: 'The "100x" Volume Raffle',
    sector: "DEX",
    description:
      'Stop paying linear rebates. Use "Lottery Psychology" to drive 100x volume per dollar spent.',
    formula: {
      trigger: "Trade > $100",
      condition: "User holds 1 Raffle Ticket",
      reward: "Daily Jackpot",
    },
    icon: Zap,
  },
  {
    id: "02",
    type: "RECIPE",
    title: "The Social Distribution Engine",
    sector: "Stablecoins",
    description:
      "Turn passive holders into distribution nodes. Double-sided rewards with Sybil protection.",
    formula: {
      trigger: "Referee Volume > $500",
      condition: "Referee Balance > $10 (7d)",
      reward: "$75 / $40 Split",
    },
    icon: Users,
  },
  {
    id: "07",
    type: "CASE_STUDY",
    title: "Tier-1 Solana AMM",
    sector: "DEX",
    description:
      "How a top Solana DEX generated 102 SOL of volume for every 1 SOL spent on rewards.",
    metricBadge: "100x ROI",
    icon: TrendingUp,
  },
];

export default function PlaybooksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-20 md:py-32 bg-white border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-black/60 border border-black/10 px-3 py-1.5 rounded-[3px]">
              <BookOpen className="w-3 h-3" />
              <span>Growth Playbooks</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-[1.1] tracking-tight">
              Battle-tested
              <br />
              <span className="text-black/40">Strategies</span>
            </h2>
          </div>
          <Button variant="outline" href="/playbooks" className="w-fit">
            View All Playbooks
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Playbooks Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {featuredPlaybooks.map((playbook) => (
            <motion.a
              key={playbook.id}
              variants={cardVariants}
              href="/playbooks"
              className="group bg-white border border-black/10 rounded-[3px] overflow-hidden hover:border-black/30 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 bg-black/5">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-[2px] ${
                      playbook.type === "RECIPE"
                        ? "bg-blue/10 text-blue"
                        : "bg-black/10 text-black/60"
                    }`}
                  >
                    {playbook.type === "CASE_STUDY" ? "Case Study" : playbook.type}
                  </span>
                  <span className="text-[10px] font-mono text-black/40">
                    {playbook.sector}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-black/30 group-hover:text-blue transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-6">
                <motion.div
                  className="w-10 h-10 rounded-[3px] bg-black/5 flex items-center justify-center mb-4 group-hover:bg-blue/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <playbook.icon className="w-5 h-5 text-black/60 group-hover:text-blue transition-colors" />
                </motion.div>

                <h3 className="font-display text-lg md:text-xl font-medium text-black mb-2 group-hover:text-blue transition-colors">
                  {playbook.title}
                </h3>

                <p className="text-sm text-black/50 leading-relaxed mb-4">
                  {playbook.description}
                </p>

                {/* Formula or Metric */}
                {playbook.formula ? (
                  <motion.div
                    className="space-y-2 pt-4 border-t border-black/10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.1 },
                      },
                    }}
                  >
                    <motion.div variants={formulaVariants} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-black/30 w-16">Trigger</span>
                      <span className="text-black/70">{playbook.formula.trigger}</span>
                    </motion.div>
                    <motion.div variants={formulaVariants} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-black/30 w-16">Condition</span>
                      <span className="text-black/70">{playbook.formula.condition}</span>
                    </motion.div>
                    <motion.div variants={formulaVariants} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-blue/60 w-16">Reward</span>
                      <span className="text-blue">{playbook.formula.reward}</span>
                    </motion.div>
                  </motion.div>
                ) : playbook.metricBadge ? (
                  <div className="pt-4 border-t border-black/10">
                    <motion.span
                      className="inline-flex items-center px-3 py-1.5 bg-blue/10 text-blue text-sm font-medium rounded-[3px]"
                      whileHover={{ scale: 1.05 }}
                    >
                      {playbook.metricBadge}
                    </motion.span>
                  </div>
                ) : null}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
