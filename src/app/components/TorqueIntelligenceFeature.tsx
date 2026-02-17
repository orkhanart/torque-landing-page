"use client";

import React from "react";
import { TrendingUp, Shield, Brain } from "lucide-react";

export default function TorqueIntelligenceFeature() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            {/* Glassy Badge Title */}
            <div className="flex justify-start mb-6">
              <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <span className="font-mono text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 tracking-tight">
                  Torque Intelligence
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-display font-medium text-white mb-4">
              Stop Guessing. Start Observing.
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Our diagnostic core monitors the chain to detect the subtle difference between mercenary churn and long-term alignment. Filter for signal; ignore the noise.
            </p>

            {/* Feature List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Simulate ROI
                  </h3>
                  <p className="text-sm text-slate-400">
                    Forecast volume lift with 88% accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Protect Budget
                  </h3>
                  <p className="text-sm text-slate-400">
                    Auto-detect wash traders and sybils.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Automated Strategy
                  </h3>
                  <p className="text-sm text-slate-400">
                    Let AI suggest your next move.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual/Graphic Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-slate-400 text-sm">
                  Intelligence Dashboard Visual
                </p>
              </div>
            </div>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
