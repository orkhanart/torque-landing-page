/**
 * Platform Features Content
 * Static content for the PlatformFeatures component
 */

export interface FeatureData {
  image: string;
  alt: string;
  title?: string;
  description?: string;
  gradientType?: "blue" | "black" | "none";
  titlePosition?: "top" | "bottom";
  slideDirection?: "top" | "bottom";
}

export const platformFeatures = {
  sectionTitle: "Features",
  sectionSubtitle: "What makes us different",

  leftColumn: {
    productCRM: {
      image: "/Incentive.png",
      alt: "Product and Token CRM",
      title: "Product and Token CRM",
      description: "Dive into your product and token data to understand your user segments.",
      gradientType: "blue" as const,
      titlePosition: "top" as const,
      slideDirection: "bottom" as const,
    },

    rewardEngine: {
      title: "In-Product Reward Engine",
      description: "Create targeted campaigns, spot key contributors, and distribute rewards — all in just a few clicks with our built-in rewards system.",
      image: "/leaderboard-feature.svg",
      imageAlt: "Explore data visualization",
    },

    smartIncentives: {
      image: "/Campaign.png",
      alt: "Smart Incentives",
      title: "Smart Incentives",
      description: "Intelligent incentive programs that automatically reward users for verifiable on-chain actions.",
      gradientType: "black" as const,
      titlePosition: "bottom" as const,
      slideDirection: "top" as const,
    },
  },

  rightColumn: {
    intelligence: {
      title: "Torque\nIntelligence",
      description: "AI-powered recommendations that analyze performance and suggest incentive improvements.",
    },

    analytics: {
      title: "Move Faster with data-driven decisions",
      description: "Stop relying on hunches, scattered insights, or outdated data. Torque lets you dive into real on-chain data for consistent, scalable results.",
      backgroundImage: "/feature-analytics.svg",
      badgesImage: "/feature-badges.svg",
    },

    noCode: {
      image: "/No-code.png",
      alt: "No-code Deployment",
      title: "No-code Deployment",
      description: "Build powerful incentive programs with our visual interface. No code required.",
      gradientType: "black" as const,
      titlePosition: "bottom" as const,
      slideDirection: "top" as const,
    },
  },
};
