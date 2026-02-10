"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import IntegrationRequestModal from "./IntegrationRequestModal";
import { type StrategyCard as StrategyCardType } from "../playbooks/strategies";

interface StrategyCardProps {
  strategy: StrategyCardType;
}

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Unified deploy handler - used by both card button and drawer button
  const handleDeploy = (strategySlug: string) => {
    // Close drawer if it's open
    setIsDrawerOpen(false);

    // Open modal with strategy context
    setIsModalOpen(true);
  };

  // Button handler - Routes based on card type
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (strategy.type === 'RECIPE') {
      // Recipes: Open deploy modal directly (fast lane)
      handleDeploy(strategy.slug);
    } else {
      // Frameworks & Case Studies: Open drawer to read content (slow lane)
      setIsDrawerOpen(true);
    }
  };

  // Card body click - Always opens drawer for details
  const handleCardBodyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrawerOpen(true);
  };

  // Sector color mapping
  const getSectorColors = (sector: string) => {
    switch (sector) {
      case 'Stablecoins':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Lending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'DEX':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'LST':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Perps':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'General':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  // Difficulty color mapping
  const getDifficultyColors = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Hard':
        return 'bg-red-500/20 text-red-400';
      default:
        return '';
    }
  };

  // Button text based on card type
  const getButtonText = () => {
    switch (strategy.type) {
      case 'RECIPE':
        return 'Deploy Strategy →';
      case 'FRAMEWORK':
        return 'Read Framework →';
      case 'CASE_STUDY':
        return 'Read Case Study →';
    }
  };

  // Type badge color
  const getTypeBadgeColor = () => {
    switch (strategy.type) {
      case 'RECIPE':
        return 'bg-primary/20 text-primary';
      case 'FRAMEWORK':
        return 'bg-purple-500/20 text-purple-400';
      case 'CASE_STUDY':
        return 'bg-green-500/20 text-green-400';
    }
  };

  return (
    <>
      <Card className="relative p-6 bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all group">
        {/* Metric Badge (Case Studies Only) */}
        {strategy.metricBadge && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
            {strategy.metricBadge}
          </div>
        )}

        {/* Header: Type, Difficulty, Sector */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Type Badge */}
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded uppercase ${getTypeBadgeColor()}`}>
            {strategy.type.replace('_', ' ')}
          </span>

          {/* Difficulty (Recipes Only) */}
          {strategy.difficulty && (
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getDifficultyColors(strategy.difficulty)}`}>
              {strategy.difficulty}
            </span>
          )}

          {/* Sector */}
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getSectorColors(strategy.sector)}`}>
            {strategy.sector}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {strategy.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {strategy.description}
        </p>

        {/* Formula Block (Recipes Only) - Terminal Style */}
        {strategy.formula && (
          <div className="mb-4 p-3 bg-slate-900 border border-slate-700/50 rounded-md font-mono text-xs space-y-1">
            <div>
              <span className="text-slate-400">Trigger:</span>{' '}
              <span className="text-slate-200">{strategy.formula.trigger}</span>
            </div>
            <div>
              <span className="text-slate-400">Condition:</span>{' '}
              <span className="text-slate-200">{strategy.formula.condition}</span>
            </div>
            <div>
              <span className="text-slate-400">Reward:</span>{' '}
              <span className="text-slate-200">{strategy.formula.reward}</span>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {strategy.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs bg-white/5 text-muted-foreground rounded border border-border/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button - Router */}
        <button
          onClick={handleButtonClick}
          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors text-sm"
        >
          {getButtonText()}
        </button>
      </Card>

      {/* Strategy Drawer - Slow Lane (Optional) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border/20 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>

              {/* Strategy Details */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded uppercase ${getTypeBadgeColor()}`}>
                    {strategy.type.replace('_', ' ')}
                  </span>
                  {strategy.difficulty && (
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getDifficultyColors(strategy.difficulty)}`}>
                      {strategy.difficulty}
                    </span>
                  )}
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getSectorColors(strategy.sector)}`}>
                    {strategy.sector}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-4">{strategy.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{strategy.description}</p>

                {strategy.formula && (
                  <div className="mb-6 p-6 bg-slate-900 border border-slate-700/50 rounded-md">
                    <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Formula</h3>
                    <div className="space-y-3 font-mono text-sm">
                      <div>
                        <span className="text-slate-400">Trigger:</span>{' '}
                        <span className="text-slate-200">{strategy.formula.trigger}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Condition:</span>{' '}
                        <span className="text-slate-200">{strategy.formula.condition}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Reward:</span>{' '}
                        <span className="text-slate-200">{strategy.formula.reward}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Extended Content for Frameworks & Case Studies */}
                {strategy.type === 'FRAMEWORK' && strategy.slug === 'incentive-standards' && (
                  <div className="mb-6 prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Incentives are not marketing expenses; they are protocol security expenses. This framework establishes the 'Quality Score' (QS) metric.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Problem:</strong> Protocols pay for TVL, but get mercenaries who leave the second the yield drops.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Solution:</strong> Measure 'Net Value Added'.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li><strong className="text-foreground">Retention:</strong> What % of users stay 30 days after the incentive ends?</li>
                      <li><strong className="text-foreground">Velocity:</strong> How many times does a dollar turn over in your protocol?</li>
                      <li><strong className="text-foreground">Quality:</strong> Is the wallet a real user or a Sybil bot?</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      Use Torque to track these metrics automatically.
                    </p>
                  </div>
                )}

                {strategy.type === 'CASE_STUDY' && strategy.slug === 'dex-case-study' && (
                  <div className="mb-6 prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      A tier-1 Solana AMM wanted to drive sustainable trading volume without burning through their treasury on linear rebates.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Strategy:</strong> They deployed Torque's raffle-based incentive system — traders earn tickets for every trade, then enter a daily jackpot.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Psychology:</strong> Non-linear rewards tap into "lottery psychology" — users trade more for a chance at a big win, rather than predictable small rebates.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Result:</strong> For every 1 SOL spent on rewards, the protocol generated 102 SOL in trading volume. First-time winners traded ~55 SOL vs ~3 SOL for non-winners.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Key Insight:</strong> Gamification beats linear rebates. Use Torque to deploy raffle mechanics that amplify ROI 100x.
                    </p>
                  </div>
                )}

                {strategy.type === 'CASE_STUDY' && strategy.slug === 'stablecoin-case-study' && (
                  <div className="mb-6 prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      An RWA stablecoin issuer on Solana faced a common problem: high TVL, but low velocity. Users were holding, not transacting.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Strategy:</strong> The issuer used Torque to incentivize three behaviors: (1) Token creation (liquidity pool bootstrapping), (2) Referrals (viral growth), (3) Leveraged looping (sophisticated DeFi users).
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Mechanics:</strong> Users who created new trading pairs earned 100-350 tokens based on size. Referrers earned $75 per qualified user. Looping positions (3x+ leverage held for 7 days) unlocked tiered bonuses.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground">The Result:</strong> 42x increase in new token pairs created. Trading volume increased 330%. Referral program cost $75/user vs $200+ industry average.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Key Insight:</strong> Target behaviors, not just holdings. Torque's composability allows you to reward specific on-chain actions that drive velocity.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button - Context-Aware */}
              {strategy.type === 'RECIPE' ? (
                <button
                  onClick={() => handleDeploy(strategy.slug)}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Deploy This Strategy →
                </button>
              ) : (
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full px-6 py-4 bg-card/50 border-2 border-border/20 text-foreground font-semibold rounded-lg hover:bg-card/80 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal with Strategy Context */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={{
          type: strategy.type === 'RECIPE' ? 'strategy_deploy' : 'general_interest',
          title: strategy.title,
          slug: strategy.slug,
        }}
      />
    </>
  );
}
