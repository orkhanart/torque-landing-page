import { Zap, Users, TrendingUp, type LucideIcon } from "lucide-react";

export interface PlaybookFormula {
  trigger: string;
  condition: string;
  reward: string;
}

export interface Playbook {
  id: string;
  type: "RECIPE" | "CASE_STUDY" | "FRAMEWORK";
  title: string;
  sector: string;
  description: string;
  formula?: PlaybookFormula;
  metricBadge?: string;
  icon: LucideIcon;
  image: string;
}

export const featuredPlaybooks: Playbook[] = [
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
    image: "/generated/image/light-mono/ascending-platforms.jpg",
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
    image: "/generated/image/light-mono/cluster-cubes-02.jpg",
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
    image: "/generated/image/light-mono/floating-mass-02.jpg",
  },
];
