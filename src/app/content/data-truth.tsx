/**
 * Data Truth Section Content
 * Static content and stats for the DataTruth component
 */

import { Wallet, TrendingUp, RefreshCw } from "lucide-react";

export interface StatCard {
  value: string;
  label: string;
  subtext: string;
  link?: string;
  icon: React.ReactNode;
}

export const dataTruthContent = {
  section: {
    id: "market-blindness",
    badge: "The Problem",
    headline: "91% of your supply is idle.",
    description: "For major governance tokens, 91% of supply sits dormant in wallets. Protocols are paying for \"active\" users who haven't touched the product in 30 days. This is a massive reactivation opportunity that standard airdrops miss entirely.",
  },

  stats: [
    {
      value: "$10M+",
      label: "Rewards Distributed",
      subtext: "Trusted by Kamino, Drift, and 15+ leading Solana protocols to manage incentive spend.",
      link: "#",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      value: "240%",
      label: "Average ROI",
      subtext: "Measured return: for every $1 spent on Torque rewards, protocols see $2.40 in attributed volume.",
      link: "#",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      value: "3.3x",
      label: "Volume Lift",
      subtext: "Kamino's PYUSD trading volume increased 3.3x within 2 weeks of launching their Torque campaign.",
      link: "#",
      icon: <RefreshCw className="w-6 h-6" />,
    },
  ] as StatCard[],
};
