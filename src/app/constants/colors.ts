// Sector color mappings
export const SECTOR_COLORS: Record<string, string> = {
  Stablecoins: "bg-green-500/10 text-green-400 border-green-500/20",
  Lending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  DEX: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  LST: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Perps: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  General: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export function getSectorColors(sector: string): string {
  return SECTOR_COLORS[sector] || SECTOR_COLORS.General;
}

// Difficulty color mappings
export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400",
  Intermediate: "bg-yellow-500/20 text-yellow-400",
  Hard: "bg-red-500/20 text-red-400",
};

export function getDifficultyColors(difficulty?: string): string {
  if (!difficulty) return "";
  return DIFFICULTY_COLORS[difficulty] || "";
}

// Strategy type badge colors
export const TYPE_BADGE_COLORS: Record<string, string> = {
  RECIPE: "bg-primary/20 text-primary",
  FRAMEWORK: "bg-purple-500/20 text-purple-400",
  CASE_STUDY: "bg-green-500/20 text-green-400",
};

export function getTypeBadgeColor(type: string): string {
  return TYPE_BADGE_COLORS[type] || TYPE_BADGE_COLORS.RECIPE;
}

// Button text based on strategy type
export const STRATEGY_BUTTON_TEXT: Record<string, string> = {
  RECIPE: "Deploy Strategy →",
  FRAMEWORK: "Read Framework →",
  CASE_STUDY: "Read Case Study →",
};

export function getButtonText(type: string): string {
  return STRATEGY_BUTTON_TEXT[type] || STRATEGY_BUTTON_TEXT.RECIPE;
}
