# Torque Landing Page - Content Database

## Homepage Content

### Hero Section
```json
{
  "headline": "Turn Incentives into a Revenue Engine.",
  "subheadline": "The intelligent layer between your protocol and growth. Deploy programmable rewards, then let AI optimize retention—automatically.",
  "cta_primary": {
    "text": "Join Torque",
    "action": "open_modal"
  },
  "cta_secondary": {
    "text": "Explore Playbooks",
    "link": "/playbooks"
  },
  "visual_asset": "rewards_dashboard_preview.png"
}
```

### Trust Bar
```json
{
  "label": "Trusted by:",
  "logos": [
    "Solana",
    "Raydium",
    "Metaplex",
    "Darklake"
  ]
}
```

### DataTruth Section
```json
{
  "eyebrow": "Market Blindness",
  "headline": "91% of your supply is idle.",
  "body": "For major governance tokens, 91% of supply sits dormant in wallets. Protocols are paying for 'Active' users who haven't touched the product in 30 days. This is a massive reactivation opportunity that standard airdrops miss.",
  "stats": [
    {
      "value": "$10M+",
      "label": "Rewards Distributed",
      "description": "Infrastructure used by the ecosystem's largest protocols to manage incentive spend.",
      "icon": "Wallet"
    },
    {
      "value": "240%",
      "label": "Average ROI",
      "description": "Average return on incentive spend across all Torque-powered campaigns.",
      "icon": "TrendingUp"
    },
    {
      "value": "3.3x",
      "label": "Volume Lift",
      "description": "Increase in daily trading volume for a leading stablecoin post-integration.",
      "icon": "RefreshCw"
    }
  ]
}
```

### Growth Copilot (CRM) Section
```json
{
  "headline": "Get to Know Your Users.",
  "subheadline": "Don't spray and pray. Use the On-Chain CRM to build rich user profiles and target only the behavior that drives profit.",
  "features": [
    {
      "icon": "Users",
      "title": "360° User Profiling",
      "description": "Torque doesn't just see a wallet. It sees a user. Access Net Worth, Holding Duration, Churn Risk, and Competitor Usage history instantly.",
      "metric": "Track 47+ on-chain signals automatically"
    },
    {
      "icon": "Target",
      "title": "Surgical Segmentation",
      "description": "Filter your audience like a database. Target 'Whales who traded >$10k on Jupiter' or 'LPs who haven't claimed in 30 days'.",
      "metric": "Filter 10M+ wallets in <200ms"
    },
    {
      "icon": "Sparkles",
      "title": "Growth Copilot",
      "description": "Not sure what to launch? The Copilot analyzes your protocol's weak spots (e.g., 'Retention down 5%') and suggests campaigns to fix them.",
      "metric": "Trained on $50M+ in campaign data"
    }
  ]
}
```

### Torque Intelligence Section
```json
{
  "badge_text": "Torque Intelligence",
  "headline": "Turn Raw Data into Revenue.",
  "subheadline": "Ask your growth questions in plain English. Get strategies backed by $10M+ in live campaign data.",
  "features": [
    {
      "icon": "TrendingUp",
      "title": "Simulate ROI",
      "description": "Forecast volume lift with 88% accuracy."
    },
    {
      "icon": "Shield",
      "title": "Protect Budget",
      "description": "Auto-detect wash traders and sybils."
    },
    {
      "icon": "Brain",
      "title": "Automated Strategy",
      "description": "Let AI suggest your next move."
    }
  ],
  "visual_asset": "intelligence_dashboard.png"
}
```

### GrowthStack Section
```json
{
  "headline": "The Intelligent Growth Stack",
  "tabs": [
    {
      "id": 1,
      "title": "Programmable Rewards",
      "description": "Don't just spray and pray. Deploy conditional incentives that only trigger for high-quality users.",
      "visual": "create-incentive.png"
    },
    {
      "id": 2,
      "title": "Velocity Context",
      "description": "Visualize competition. Turn passive holders into active participants with real-time, gamified rankings.",
      "visual": "leaderboard.svg"
    },
    {
      "id": 3,
      "title": "Torque Intelligence",
      "description": "Your growth co-pilot. Ask 'How do I boost retention?' and let the AI generate the optimal strategy.",
      "visual": "intelligence-chat.svg"
    }
  ]
}
```

---

## Playbooks Page Content

### Strategy Cards (9 Total)

```json
{
  "strategies": [
    {
      "id": "01",
      "type": "RECIPE",
      "title": "The \"100x\" Volume Raffle",
      "slug": "volume-raffle",
      "sector": "DEX",
      "difficulty": "Intermediate",
      "tags": ["ROI", "Gamification"],
      "description": "Stop paying linear rebates. Use \"Lottery Psychology\" to drive 100x volume per dollar spent.",
      "formula": {
        "trigger": "Trade > $100",
        "condition": "User holds 1 Raffle Ticket",
        "reward": "Daily Jackpot (Non-Linear)"
      },
      "source_note": "Based on Raydium case study - 1 SOL reward generated 102 SOL volume"
    },
    {
      "id": "07",
      "type": "CASE_STUDY",
      "title": "Tier-1 Solana AMM",
      "slug": "dex-case-study",
      "sector": "DEX",
      "tags": ["ROI", "Volume"],
      "description": "How a top Solana DEX generated 102 SOL of volume for every 1 SOL spent on rewards using Torque raffles.",
      "metric_badge": "100x ROI",
      "extended_content": {
        "problem": "DEX wanted to drive sustainable trading volume without burning treasury on linear rebates.",
        "strategy": "Deployed Torque's raffle-based incentive system — traders earn tickets for every trade, then enter a daily jackpot.",
        "psychology": "Non-linear rewards tap into 'lottery psychology' — users trade more for a chance at a big win.",
        "result": "For every 1 SOL spent, generated 102 SOL in trading volume. First-time winners traded ~55 SOL vs ~3 SOL for non-winners.",
        "insight": "Gamification beats linear rebates. Use Torque to deploy raffle mechanics that amplify ROI 100x."
      }
    },
    {
      "id": "02",
      "type": "RECIPE",
      "title": "The Social Distribution Engine",
      "slug": "social-distribution",
      "sector": "Stablecoins",
      "difficulty": "Easy",
      "tags": ["Viral Growth", "Referrals"],
      "description": "Turn passive holders into distribution nodes. Double-sided rewards with Sybil protection.",
      "formula": {
        "trigger": "Referee Volume > $500",
        "condition": "Referee Balance > $10 (7d)",
        "reward": "$75 Referrer / $40 Referee"
      },
      "source_note": "USD1 referral logic - organic acquisition at $75/user"
    },
    {
      "id": "09",
      "type": "FRAMEWORK",
      "title": "The Incentive Standards",
      "slug": "incentive-standards",
      "sector": "General",
      "tags": ["Strategy", "Whitepaper"],
      "description": "The official guide to measuring Velocity, Quality, and Retention on Solana. Stop optimizing for vanity metrics.",
      "extended_content": {
        "intro": "Incentives are not marketing expenses; they are protocol security expenses.",
        "problem": "Most protocols measure TVL. But TVL doesn't tell you if users will stay after the incentive ends.",
        "framework": "Measure three things: Retention (% of users who stay 30 days after incentive ends), Velocity (how many times does a dollar turn over in your protocol?), Quality (is the wallet a real user or a Sybil bot?)",
        "solution": "Use Torque to track these metrics automatically."
      }
    },
    {
      "id": "04",
      "type": "RECIPE",
      "title": "The \"Looping\" Multiplier",
      "slug": "looping-multiplier",
      "sector": "Lending",
      "difficulty": "Hard",
      "tags": ["DeFi Composability", "TVL Boost"],
      "description": "Incentivize sophisticated users to leverage up. Every $1 of incentives generates $3-$5 of TVL.",
      "formula": {
        "trigger": "Open Leveraged Position",
        "condition": "Leverage > 3x AND Hold > 7d",
        "reward": "Tiered Bonus (100 - 350 Tokens)"
      },
      "source_note": "USD1 looping strategy - each $5K position creates $15-25K TVL"
    },
    {
      "id": "08",
      "type": "CASE_STUDY",
      "title": "RWA Stablecoin Issuer",
      "slug": "stablecoin-case-study",
      "sector": "Stablecoins",
      "tags": ["Velocity", "Growth"],
      "description": "By incentivizing creators, this issuer saw a 42x surge in new token pairs and a 3.3x trading volume increase.",
      "metric_badge": "+330% Volume",
      "extended_content": {
        "problem": "RWA stablecoin had high TVL but low velocity. Users were holding, not transacting.",
        "strategy": "Used Torque to incentivize three behaviors: (1) Token creation (liquidity pool bootstrapping), (2) Referrals (viral growth), (3) Leveraged looping (sophisticated DeFi users).",
        "mechanics": "Users who created new trading pairs earned 100-350 tokens based on size. Referrers earned $75 per qualified user. Looping positions (3x+ leverage held for 7 days) unlocked tiered bonuses.",
        "result": "42x increase in new token pairs created. Trading volume increased 330%. Referral program cost $75/user vs $200+ industry average.",
        "insight": "Target behaviors, not just holdings. Torque's composability allows you to reward specific on-chain actions that drive velocity."
      }
    },
    {
      "id": "03",
      "type": "RECIPE",
      "title": "The \"Sticky\" LP Rebate",
      "slug": "sticky-lp",
      "sector": "DEX",
      "difficulty": "Hard",
      "tags": ["Liquidity", "Anti-Wash"],
      "description": "Prevent mercenary capital. Rebates only unlock after positions are held for a specific duration.",
      "formula": {
        "trigger": "Provide LP > $500",
        "condition": "Position Age > 20 Hours",
        "reward": "0.15% Daily Rebate"
      },
      "source_note": "Raydium/USD1 LP logic - 20+ hour position hold requirement"
    },
    {
      "id": "05",
      "type": "RECIPE",
      "title": "The Collateral Anchor",
      "slug": "collateral-anchor",
      "sector": "Perps",
      "difficulty": "Intermediate",
      "tags": ["B2B Growth", "Volume"],
      "description": "Drive demand for your asset by subsidizing its use as collateral on Perps DEXs.",
      "formula": {
        "trigger": "Deposit Token as Collateral",
        "condition": "Maintain > $1k Avg Balance",
        "reward": "0.1% Weekly Rebate"
      },
      "source_note": "Perps integration - incentivizing collateral deposits creates sustained TVL"
    },
    {
      "id": "06",
      "type": "RECIPE",
      "title": "The \"First-Time\" Hook",
      "slug": "first-time-winner",
      "sector": "General",
      "difficulty": "Easy",
      "tags": ["Activation", "Onboarding"],
      "description": "New users who win a reward trade 18x more volume. Hook them with a guaranteed first-time win.",
      "formula": {
        "trigger": "First Trade > $10",
        "condition": "Wallet Age < 7 Days",
        "reward": "Guaranteed \"Welcome\" Bonus"
      },
      "source_note": "Raydium data - first-time winners traded ~55 SOL vs ~3 SOL for non-winners"
    }
  ]
}
```

---

## Platform Page Content

### Hero
```json
{
  "headline": "The Growth Operating System.",
  "subheadline": "Stop flying blind. Torque is the On-Chain CRM and Incentive Engine that helps you identify high-value users, predict their behavior, and retain them with surgical precision.",
  "cta": "Launch Platform"
}
```

### Platform Features (3 Sections)

**1. Growth Copilot (same as homepage)**

**2. Torque Intelligence (same as homepage)**

**3. Growth Engines (Mechanics)**
```json
{
  "headline": "Launch High-ROI Campaigns.",
  "subtitle": "Growth Engines",
  "description": "Don't just yield farm. Deploy mechanics that drive viral loops and retention.",
  "features": [
    {
      "icon": "Zap",
      "title": "Conditional Incentives",
      "description": "Move beyond simple 'Yield Farming.' Create rewards that trigger only on specific high-value actions to ensure you are paying for quality, not just TVL.",
      "capabilities": ["Raffles", "Rebates", "Direct Transfers"]
    },
    {
      "icon": "BarChart3",
      "title": "Embedded Leaderboards",
      "description": "Visualize competition directly on your trading interface. Drive higher velocity by showing users exactly where they rank in real-time.",
      "capabilities": ["Volume Rankings", "Streak Tracking", "PnL Leaderboards"]
    },
    {
      "icon": "Network",
      "title": "On-Chain Referrals",
      "description": "Fix the distribution gap. Launch native referral programs that reward your best users for bringing in new liquidity.",
      "capabilities": ["Multi-tier attribution", "Instant payouts", "Social distribution analytics"],
      "validation": "Helping Stablecoins drive $50M+ in organic transfer volume"
    }
  ]
}
```

**4. Native Experience (SDK)**
```json
{
  "headline": "Native Experience",
  "subtitle": "Your Brand. Your UI. Our Engine.",
  "description": "Keep your users on your app.",
  "features": [
    {
      "icon": "Target",
      "title": "Embeddable SDK",
      "description": "Most incentive platforms force users to leave your site. Torque embeds directly into your dApp. Users stay, trade, and engage without breaking flow.",
      "capabilities": ["Embeddable SDK & Components", "React, Vue, Vanilla JS support", "5-minute integration"]
    },
    {
      "icon": "Users",
      "title": "Customizable UI/UX",
      "description": "Match your brand perfectly. Every component is themeable and customizable to fit seamlessly into your application design.",
      "capabilities": ["Fully customizable UI/UX", "Brand color integration", "Flexible layout options"]
    },
    {
      "icon": "Zap",
      "title": "Zero-Redirect Claims",
      "description": "Users claim rewards without leaving your app. Eliminate friction and maximize retention by keeping the entire experience native.",
      "capabilities": ["Zero-redirect claim flows", "In-app reward claiming", "Seamless transaction flows"]
    }
  ]
}
```

---

## Company Page Content

### Hero
```json
{
  "mission": "We're building the Growth Operating System for Solana protocols."
}
```

### Backing
```json
{
  "amount_raised": "$3M",
  "investors": [
    "6th Man Ventures",
    "Solana Ventures",
    "Colosseum",
    "Metaplex"
  ]
}
```

### Origin Timeline
```json
{
  "events": [
    {
      "date": "2024 Q1",
      "title": "Metaplex cHack Winner",
      "badge": "metaplex_chack_badge.png"
    },
    {
      "date": "2024 Q2",
      "title": "Colosseum Accelerator",
      "badge": "colosseum_badge.png"
    }
  ]
}
```

### Team
```json
{
  "members": [
    {
      "name": "Sheldon Smickley",
      "role": "Co-Founder & CEO",
      "bio": "Ex-Metaplex, Enigma.",
      "pfp": "sheldon-pfp.png",
      "border_color": "purple-500"
    },
    {
      "name": "Parker Woodruff",
      "role": "Co-Founder & CTO",
      "bio": "Ex-Metaplex Core Contributor.",
      "pfp": "parker-pfp.png",
      "border_color": "blue-500"
    },
    {
      "name": "Trent Ellingsen",
      "role": "Protocol Engineer",
      "bio": "Built growth systems at scale.",
      "pfp": "trent-pfp.png",
      "border_color": "green-500"
    },
    {
      "name": "Alex Chen",
      "role": "Data Scientist",
      "bio": "ML/AI for on-chain behavior.",
      "pfp": "alex-pfp.png",
      "border_color": "orange-500"
    }
  ]
}
```

---

## Modal Content

### Integration Request Modal
```json
{
  "title": "Ready to grow?",
  "subtitle": "Torque is currently invite-only. Tell us what you're building to skip the line.",
  "fields": [
    {
      "name": "project_name",
      "label": "Project Name",
      "type": "text",
      "required": true
    },
    {
      "name": "token_ca",
      "label": "Token CA",
      "type": "text",
      "required": false
    },
    {
      "name": "idl_repo",
      "label": "Link to IDL / Repo",
      "type": "url",
      "required": false
    },
    {
      "name": "telegram",
      "label": "Your Telegram Handle",
      "type": "text",
      "required": true
    }
  ],
  "cta_button": "Get Whitelisted 🚀",
  "success_message": "We see you. 👁️ Our founder will reach out shortly."
}
```

---

## Metadata & SEO

### Homepage
```json
{
  "title": "Torque - Turn Incentives into a Revenue Engine",
  "description": "The Growth Operating System for Solana protocols. Deploy programmable rewards, then let AI optimize retention automatically.",
  "og_image": "torque-og-image.png",
  "keywords": ["Solana", "DeFi", "Incentives", "Growth", "CRM", "On-Chain Analytics"]
}
```

### Playbooks Page
```json
{
  "title": "Playbooks - Torque Growth Strategies",
  "description": "Launch Library: 9 proven incentive strategies with real ROI data from Solana's top protocols.",
  "og_image": "playbooks-og-image.png"
}
```

### Platform Page
```json
{
  "title": "Platform - Torque Growth OS",
  "description": "On-Chain CRM, AI Intelligence, and Programmable Rewards. Build high-ROI campaigns in minutes.",
  "og_image": "platform-og-image.png"
}
```

### Company Page
```json
{
  "title": "Company - About Torque",
  "description": "Backed by $3M from 6MV, Solana Ventures, Colosseum, and Metaplex. Building the future of protocol growth.",
  "og_image": "company-og-image.png"
}
```
