"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import IntegrationRequestModal from "./IntegrationRequestModal";
import { type StrategyCard as StrategyCardType } from "../playbooks/strategies";
import {
  getSectorColors,
  getDifficultyColors,
  getTypeBadgeColor,
  getButtonText,
} from "@/app/constants/colors";
import { strategyContent, qualityMetrics } from "@/app/data/strategy-content";

interface StrategyCardProps {
  strategy: StrategyCardType;
}

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDeploy = () => {
    setIsDrawerOpen(false);
    setIsModalOpen(true);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (strategy.type === "RECIPE") {
      handleDeploy();
    } else {
      setIsDrawerOpen(true);
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
        <StrategyBadges strategy={strategy} />

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {strategy.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {strategy.description}
        </p>

        {/* Formula Block (Recipes Only) */}
        {strategy.formula && <FormulaBlock formula={strategy.formula} />}

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

        {/* Action Button */}
        <button
          onClick={handleButtonClick}
          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors text-sm"
        >
          {getButtonText(strategy.type)}
        </button>
      </Card>

      {/* Strategy Drawer */}
      {isDrawerOpen && (
        <StrategyDrawer
          strategy={strategy}
          onClose={() => setIsDrawerOpen(false)}
          onDeploy={handleDeploy}
        />
      )}

      {/* Modal with Strategy Context */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={{
          type: strategy.type === "RECIPE" ? "strategy_deploy" : "general_interest",
          title: strategy.title,
          slug: strategy.slug,
        }}
      />
    </>
  );
}

// =============================================================================
// Strategy Badges Component
// =============================================================================
function StrategyBadges({ strategy }: { strategy: StrategyCardType }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded uppercase ${getTypeBadgeColor(
          strategy.type
        )}`}
      >
        {strategy.type.replace("_", " ")}
      </span>

      {strategy.difficulty && (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getDifficultyColors(
            strategy.difficulty
          )}`}
        >
          {strategy.difficulty}
        </span>
      )}

      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getSectorColors(
          strategy.sector
        )}`}
      >
        {strategy.sector}
      </span>
    </div>
  );
}

// =============================================================================
// Formula Block Component
// =============================================================================
interface FormulaBlockProps {
  formula: {
    trigger: string;
    condition: string;
    reward: string;
  };
  large?: boolean;
}

function FormulaBlock({ formula, large = false }: FormulaBlockProps) {
  const baseClasses = large
    ? "mb-6 p-6 bg-slate-900 border border-slate-700/50 rounded-md"
    : "mb-4 p-3 bg-slate-900 border border-slate-700/50 rounded-md font-mono text-xs space-y-1";

  return (
    <div className={baseClasses}>
      {large && (
        <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">
          Formula
        </h3>
      )}
      <div className={large ? "space-y-3 font-mono text-sm" : "space-y-1"}>
        <div>
          <span className="text-slate-400">Trigger:</span>{" "}
          <span className="text-slate-200">{formula.trigger}</span>
        </div>
        <div>
          <span className="text-slate-400">Condition:</span>{" "}
          <span className="text-slate-200">{formula.condition}</span>
        </div>
        <div>
          <span className="text-slate-400">Reward:</span>{" "}
          <span className="text-slate-200">{formula.reward}</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Strategy Drawer Component
// =============================================================================
interface StrategyDrawerProps {
  strategy: StrategyCardType;
  onClose: () => void;
  onDeploy: () => void;
}

function StrategyDrawer({ strategy, onClose, onDeploy }: StrategyDrawerProps) {
  const content = strategyContent[strategy.slug];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border/20 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>

          {/* Strategy Details */}
          <div className="mb-6">
            <StrategyBadges strategy={strategy} />

            <h2 className="text-3xl font-bold text-foreground mb-4">
              {strategy.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {strategy.description}
            </p>

            {strategy.formula && <FormulaBlock formula={strategy.formula} large />}

            {/* Extended Content */}
            {content && <StrategyExtendedContent content={content} strategy={strategy} />}
          </div>

          {/* Action Button */}
          {strategy.type === "RECIPE" ? (
            <button
              onClick={onDeploy}
              className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Deploy This Strategy →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-6 py-4 bg-card/50 border-2 border-border/20 text-foreground font-semibold rounded-lg hover:bg-card/80 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Strategy Extended Content Component
// =============================================================================
interface StrategyExtendedContentProps {
  content: {
    paragraphs: string[];
    highlights?: { label: string; value: string }[];
  };
  strategy: StrategyCardType;
}

function StrategyExtendedContent({ content, strategy }: StrategyExtendedContentProps) {
  return (
    <div className="mb-6 prose prose-invert max-w-none">
      {content.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}

      {content.highlights?.map((highlight, index) => (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          <strong className="text-foreground">{highlight.label}:</strong>{" "}
          {highlight.value}
        </p>
      ))}

      {/* Quality Metrics for incentive-standards */}
      {strategy.slug === "incentive-standards" && (
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          {qualityMetrics.map((metric, index) => (
            <li key={index}>
              <strong className="text-foreground">{metric.label}:</strong>{" "}
              {metric.description}
            </li>
          ))}
        </ul>
      )}

      {strategy.slug === "incentive-standards" && (
        <p className="text-muted-foreground leading-relaxed">
          Use Torque to track these metrics automatically.
        </p>
      )}
    </div>
  );
}
