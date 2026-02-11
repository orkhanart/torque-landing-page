"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Layers,
  Users,
  BarChart3,
  Gift,
  Zap,
} from "lucide-react";

// =============================================================================
// InfrastructureGraph - Interactive infographic showing Torque's ecosystem
// =============================================================================

// Star geometry constants
const VIEWBOX_SIZE = 400;
const CENTER = { x: 200, y: 200 };

// Calculate 5 star points (72° apart, starting from top)
const STAR_POINTS = [
  { x: 200, y: 40 },    // Top - Protocols
  { x: 352, y: 151 },   // Top-Right - Analytics
  { x: 294, y: 329 },   // Bottom-Right - Rewards
  { x: 106, y: 329 },   // Bottom-Left - Users
  { x: 48, y: 151 },    // Top-Left - Growth
];

interface NodeProps {
  icon: React.ElementType;
  label: string;
  description: string;
  point: { x: number; y: number };
  isActive: boolean;
  onClick: () => void;
  delay: number;
  tooltipPosition: "top" | "bottom";
}

const Node = ({ icon: Icon, label, description, point, isActive, onClick, delay, tooltipPosition }: NodeProps) => {
  // Calculate percentage-based positioning from star points
  const positionStyle = {
    left: `${(point.x / VIEWBOX_SIZE) * 100}%`,
    top: `${(point.y / VIEWBOX_SIZE) * 100}%`,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <button
      onClick={onClick}
      className="absolute flex flex-col items-center gap-2 transition-all duration-500 group"
      style={{ ...positionStyle, animationDelay: `${delay}ms` }}
    >
      {/* Node Circle */}
      <div
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300",
          "border-2",
          isActive
            ? "bg-black border-black text-white scale-110"
            : "bg-white border-black/20 text-black/60 hover:border-black/40 hover:text-black"
        )}
      >
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>

      {/* Label */}
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-wider transition-colors duration-300",
          isActive ? "text-black" : "text-black/50"
        )}
      >
        {label}
      </span>

      {/* Description tooltip on active - positioned based on node location */}
      <div
        className={cn(
          "absolute px-4 py-2 bg-black text-white text-xs rounded-lg max-w-[180px] text-center transition-all duration-300 whitespace-normal",
          tooltipPosition === "top"
            ? "bottom-full mb-6"
            : "top-full mt-6",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        {description}
        {/* Tooltip arrow */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45",
            tooltipPosition === "top"
              ? "-bottom-1"
              : "-top-1"
          )}
        />
      </div>
    </button>
  );
};

const InfrastructureGraph = () => {
  const [activeNode, setActiveNode] = useState<string | null>("torque");

  const nodes = [
    {
      id: "protocols",
      icon: Layers,
      label: "Protocols",
      description: "DeFi protocols seeking to optimize their growth and user acquisition",
      point: STAR_POINTS[0],
      tooltipPosition: "bottom" as const,
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      description: "Real-time data and insights on user behavior and campaign performance",
      point: STAR_POINTS[1],
      tooltipPosition: "bottom" as const,
    },
    {
      id: "rewards",
      icon: Gift,
      label: "Rewards",
      description: "Intelligent token distribution based on user value and engagement",
      point: STAR_POINTS[2],
      tooltipPosition: "top" as const,
    },
    {
      id: "users",
      icon: Users,
      label: "Users",
      description: "900K+ wallets earning rewards for meaningful protocol engagement",
      point: STAR_POINTS[3],
      tooltipPosition: "top" as const,
    },
    {
      id: "growth",
      icon: Zap,
      label: "Growth",
      description: "Sustainable user acquisition with 40% better capital efficiency",
      point: STAR_POINTS[4],
      tooltipPosition: "bottom" as const,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Graph Container */}
      <div className="relative aspect-square max-w-[500px] mx-auto">
        {/* Connection Lines - SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          fill="none"
        >
          {/* Star outline connecting every other point */}
          <path
            d={`M${STAR_POINTS[0].x} ${STAR_POINTS[0].y} L${STAR_POINTS[2].x} ${STAR_POINTS[2].y} L${STAR_POINTS[4].x} ${STAR_POINTS[4].y} L${STAR_POINTS[1].x} ${STAR_POINTS[1].y} L${STAR_POINTS[3].x} ${STAR_POINTS[3].y} Z`}
            stroke="black"
            strokeOpacity="0.1"
            strokeWidth="1"
            fill="none"
          />

          {/* Lines from center to each node */}
          {STAR_POINTS.map((point, i) => (
            <path
              key={i}
              d={`M${CENTER.x} ${CENTER.y} L${point.x} ${point.y}`}
              stroke="black"
              strokeOpacity={activeNode === nodes[i]?.id ? "0.3" : "0.08"}
              strokeWidth={activeNode === nodes[i]?.id ? "2" : "1"}
              strokeDasharray={activeNode === nodes[i]?.id ? "none" : "4 4"}
              className="transition-all duration-300"
            />
          ))}

          {/* Animated pulse circles */}
          <circle cx="200" cy="200" r="60" stroke="black" strokeOpacity="0.05" fill="none">
            <animate attributeName="r" values="60;80;60" dur="3s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.05;0.02;0.05" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="100" stroke="black" strokeOpacity="0.03" fill="none">
            <animate attributeName="r" values="100;120;100" dur="4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.03;0.01;0.03" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Center - TORQUE */}
        <button
          onClick={() => setActiveNode("torque")}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
            "w-24 h-24 md:w-32 md:h-32 rounded-full",
            "flex flex-col items-center justify-center gap-1",
            "transition-all duration-300",
            activeNode === "torque"
              ? "bg-black text-white scale-110"
              : "bg-white border-2 border-black text-black hover:bg-black/5"
          )}
        >
          <span className="font-display text-lg md:text-xl font-medium">TORQUE</span>
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-60">Intelligence</span>
        </button>

        {/* Surrounding Nodes */}
        <div className="absolute inset-0">
          {nodes.map((node, index) => (
            <Node
              key={node.id}
              {...node}
              isActive={activeNode === node.id}
              onClick={() => setActiveNode(node.id)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-12 text-center">
        <p className="text-black/50 text-sm max-w-md mx-auto">
          Click on any node to learn how Torque connects the pieces of the growth puzzle
        </p>
      </div>
    </div>
  );
};

export default InfrastructureGraph;
