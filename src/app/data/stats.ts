export interface Stat {
  value: string;
  label: string;
}

export const heroStats: Stat[] = [
  { value: "$10M+", label: "Distributed" },
  { value: "906K", label: "Wallets" },
  { value: "89M+", label: "Transactions" },
];

// Rotating text phrases for hero
export const heroRotatingPhrases = [
  "On-chain Growth",
  "Token Rewards",
  "Incentives",
  "Leaderboards",
  "Competitions",
];

// Scramble character sets
export const SCRAMBLE_CHARS = {
  stats: "0123456789$MK+%",
  text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&",
};
