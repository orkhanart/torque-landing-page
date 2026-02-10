"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import StrategyCard from "../components/StrategyCard";
import { STRATEGIES, type CardType } from "./strategies";

export default function PlaybooksPage() {
  const [activeFilter, setActiveFilter] = useState<CardType | "ALL">("ALL");

  const filteredStrategies = activeFilter === "ALL"
    ? STRATEGIES
    : STRATEGIES.filter(strategy => strategy.type === activeFilter);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-normal leading-[1.1] tracking-[-0.02em] text-foreground mb-6 md:mb-8">
              The Growth Strategy Library.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Don't start from scratch. Deploy battle-tested recipes to solve specific gaps in Velocity, Retention, and Liquidity.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveFilter("ALL")}
              className={`px-4 py-2 rounded-lg border text-sm font-mono hover:bg-primary/20 transition-colors ${
                activeFilter === "ALL"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card/30 border-border/20 text-muted-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("RECIPE")}
              className={`px-4 py-2 rounded-lg border text-sm font-mono hover:bg-primary/20 transition-colors ${
                activeFilter === "RECIPE"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card/30 border-border/20 text-muted-foreground"
              }`}
            >
              Recipes
            </button>
            <button
              onClick={() => setActiveFilter("FRAMEWORK")}
              className={`px-4 py-2 rounded-lg border text-sm font-mono hover:bg-primary/20 transition-colors ${
                activeFilter === "FRAMEWORK"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card/30 border-border/20 text-muted-foreground"
              }`}
            >
              Frameworks
            </button>
            <button
              onClick={() => setActiveFilter("CASE_STUDY")}
              className={`px-4 py-2 rounded-lg border text-sm font-mono hover:bg-primary/20 transition-colors ${
                activeFilter === "CASE_STUDY"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card/30 border-border/20 text-muted-foreground"
              }`}
            >
              Case Studies
            </button>
          </div>

          {/* Playbook Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStrategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-b from-transparent to-card/30 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-sans font-normal text-foreground mb-4">
              Have a custom strategy in mind?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our drag-and-drop builder to create any combination of Triggers, Conditions, and Rewards.
            </p>
            <CustomButton
              buttonSize="big"
              buttonColor="primary"
              href="https://platform.torque.so/"
              className="shadow-cyan-glow min-w-[200px]"
            >
              Open Builder
            </CustomButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
