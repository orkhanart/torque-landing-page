# Playbook Card with Strategy Context - Implementation Guide

## Overview

This guide shows how to update playbook cards to pass strategy context to the modal, enabling targeted lead capture with pre-filled strategy information.

## 1. PlaybookCard Component Structure

### TypeScript Interface

```typescript
interface PlaybookCardProps {
  title: string;
  slug: string; // Unique identifier for database
  difficulty: "Easy" | "Intermediate" | "Advanced";
  sector: string;
  description: string;
  // ... other props
}
```

### Example Card Data

```typescript
const playbooks = [
  {
    title: "The Social Distribution Engine",
    slug: "social-distribution-engine",
    difficulty: "Easy",
    sector: "Stablecoins",
    description: "Fix the '1% Velocity' gap. Trigger: Referral Volume. Reward: Flat Bonus + 0.1% Volume Release...",
  },
  {
    title: "The Diamond Hand Boost",
    slug: "diamond-hand-boost",
    difficulty: "Intermediate",
    sector: "LST / Staking",
    description: "Reduce churn in volatile markets...",
  },
  // ...
];
```

## 2. Updated PlaybookCard Component

```tsx
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import IntegrationRequestModal from "./IntegrationRequestModal";

interface PlaybookCardProps {
  title: string;
  slug: string;
  difficulty: string;
  sector: string;
  description: string;
}

export default function PlaybookCard({
  title,
  slug,
  difficulty,
  sector,
  description,
}: PlaybookCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler that prevents navigation and opens modal with context
  const handleDeployClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Open modal with strategy-specific context
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/20 hover:border-primary/50 transition-all">
        <div className="mb-4">
          <span className={`inline-block px-2 py-1 text-xs rounded ${
            difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
            difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-red-500/20 text-red-400"
          }`}>
            {difficulty}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            {sector}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-6">
          {description}
        </p>

        {/* Deploy Button - Opens Modal */}
        <button
          onClick={handleDeployClick}
          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Deploy Strategy →
        </button>
      </Card>

      {/* Strategy-Specific Modal */}
      <IntegrationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        context={{
          type: "strategy_deploy",
          title: title,
          slug: slug,
        }}
      />
    </>
  );
}
```

## 3. How It Works

### Step 1: User Clicks "Deploy Strategy"

```tsx
const handleDeployClick = (e: React.MouseEvent) => {
  e.preventDefault(); // Prevent navigation
  setIsModalOpen(true); // Open modal
};
```

### Step 2: Modal Receives Context

The modal receives:
```typescript
context={{
  type: "strategy_deploy",
  title: "The Social Distribution Engine",
  slug: "social-distribution-engine",
}}
```

### Step 3: Modal UI Adapts

**Default Title:**
```
Ready to grow?
```

**With Strategy Context:**
```
Deploy The Social Distribution Engine
```

### Step 4: Hidden Field Captures Strategy

```tsx
<input
  type="hidden"
  name="interestedStrategy"
  value="social-distribution-engine"  // Automatically set
/>
```

### Step 5: Form Submission

When submitted, the API receives:
```json
{
  "protocolName": "Jupiter",
  "tokenAddress": "JUPy...",
  "idlSource": "https://github.com/...",
  "contactInfo": "@johndoe",
  "interestedStrategy": "social-distribution-engine"  // ← This tells you what they want!
}
```

## 4. Database Schema Update

Update your API to handle the new field:

```typescript
// /api/integration/submit/route.ts

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    protocolName,
    tokenAddress,
    idlSource,
    contactInfo,
    interestedStrategy  // ← New field
  } = body;

  // Save to database
  await prisma.integrationRequest.create({
    data: {
      protocolName,
      tokenAddress,
      idlSource,
      contactInfo,
      interestedStrategy, // ← Track which strategy they want
      status: "PENDING_REVIEW",
    },
  });

  // Send notification to your team
  await sendSlackNotification({
    text: `New lead wants: ${interestedStrategy}\\nProtocol: ${protocolName}\\nContact: ${contactInfo}`,
  });

  return NextResponse.json({ success: true });
}
```

## 5. Benefits

✅ **Targeted Lead Capture**: Know exactly which strategy interests each lead
✅ **Better Qualification**: Prioritize leads based on strategy interest
✅ **Personalized Outreach**: "I saw you're interested in the Social Distribution Engine..."
✅ **Product Analytics**: Track which strategies generate the most interest
✅ **No Extra Fields**: Users don't see extra complexity, it's captured automatically

## 6. Usage in Playbooks Page

```tsx
// /app/playbooks/page.tsx

export default function PlaybooksPage() {
  const playbooks = [
    {
      title: "The Social Distribution Engine",
      slug: "social-distribution-engine",
      difficulty: "Easy",
      sector: "Stablecoins",
      description: "Fix the '1% Velocity' gap...",
    },
    // ... more playbooks
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playbooks.map((playbook) => (
        <PlaybookCard key={playbook.slug} {...playbook} />
      ))}
    </div>
  );
}
```

## 7. Testing the Flow

1. Go to http://localhost:3000/playbooks
2. Click "Deploy Strategy" on any card
3. Modal opens with title: "Deploy [Strategy Name]"
4. Fill out the form
5. Submit
6. Check API logs - you'll see `interestedStrategy: "social-distribution-engine"`

## Complete!

Now every playbook card can capture leads with context about which specific strategy they're interested in deploying.
