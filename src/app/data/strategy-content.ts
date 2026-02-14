// Extended content for frameworks and case studies
// Used in the StrategyCard drawer

export interface StrategyContent {
  paragraphs: string[];
  highlights?: {
    label: string;
    value: string;
  }[];
}

export const strategyContent: Record<string, StrategyContent> = {
  "incentive-standards": {
    paragraphs: [
      "Incentives are not marketing expenses; they are protocol security expenses. This framework establishes the 'Quality Score' (QS) metric.",
    ],
    highlights: [
      { label: "The Problem", value: "Protocols pay for TVL, but get mercenaries who leave the second the yield drops." },
      { label: "The Solution", value: "Measure 'Net Value Added'." },
    ],
  },
  "dex-case-study": {
    paragraphs: [
      "A tier-1 Solana AMM wanted to drive sustainable trading volume without burning through their treasury on linear rebates.",
    ],
    highlights: [
      { label: "The Strategy", value: "They deployed Torque's raffle-based incentive system — traders earn tickets for every trade, then enter a daily jackpot." },
      { label: "The Psychology", value: 'Non-linear rewards tap into "lottery psychology" — users trade more for a chance at a big win, rather than predictable small rebates.' },
      { label: "The Result", value: "For every 1 SOL spent on rewards, the protocol generated 102 SOL in trading volume. First-time winners traded ~55 SOL vs ~3 SOL for non-winners." },
      { label: "Key Insight", value: "Gamification beats linear rebates. Use Torque to deploy raffle mechanics that amplify ROI 100x." },
    ],
  },
  "stablecoin-case-study": {
    paragraphs: [
      "An RWA stablecoin issuer on Solana faced a common problem: high TVL, but low velocity. Users were holding, not transacting.",
    ],
    highlights: [
      { label: "The Strategy", value: "The issuer used Torque to incentivize three behaviors: (1) Token creation (liquidity pool bootstrapping), (2) Referrals (viral growth), (3) Leveraged looping (sophisticated DeFi users)." },
      { label: "The Mechanics", value: "Users who created new trading pairs earned 100-350 tokens based on size. Referrers earned $75 per qualified user. Looping positions (3x+ leverage held for 7 days) unlocked tiered bonuses." },
      { label: "The Result", value: "42x increase in new token pairs created. Trading volume increased 330%. Referral program cost $75/user vs $200+ industry average." },
      { label: "Key Insight", value: "Target behaviors, not just holdings. Torque's composability allows you to reward specific on-chain actions that drive velocity." },
    ],
  },
};

// Quality metrics for the incentive standards framework
export const qualityMetrics = [
  { label: "Retention", description: "What % of users stay 30 days after the incentive ends?" },
  { label: "Velocity", description: "How many times does a dollar turn over in your protocol?" },
  { label: "Quality", description: "Is the wallet a real user or a Sybil bot?" },
];
