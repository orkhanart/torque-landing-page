# Wallet Authentication Setup Guide

This document explains how to complete the setup for the wallet-based authentication flow.

## Overview

The "Smart Auth" flow has been implemented with the following components:

1. **WalletAuthButton** - Handles wallet connection and routing logic
2. **ProtocolIntegrationModal** - Captures new user information
3. **API Routes** - Backend endpoints for user verification and protocol submission

## What's Already Implemented

### Frontend Components

- ✅ `WalletAuthButton.tsx` - Replaces the old "Sign In" button
- ✅ `ProtocolIntegrationModal.tsx` - Modal for new user onboarding
- ✅ Updated `Navbar.tsx` - Removed search bar, replaced "Sign In" with "Launch App"
- ✅ Updated `Hero.tsx` - "Launch App" button triggers wallet auth

### API Routes (Placeholders)

- ⚠️ `/api/auth/check-user/route.ts` - Checks if wallet exists (NEEDS DATABASE)
- ⚠️ `/api/protocol/submit/route.ts` - Saves protocol requests (NEEDS DATABASE)

## Database Setup Required

### Step 1: Choose Your Database

You need to set up a database to store:
1. **Users table** - Whitelisted wallet addresses
2. **Protocol Requests table** - Pending integration requests

**Recommended Options:**
- **Vercel Postgres** (easiest if using Vercel)
- **Supabase** (great free tier)
- **PlanetScale** (MySQL)
- **MongoDB Atlas**

### Step 2: Database Schema

#### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(44) UNIQUE NOT NULL,
  whitelisted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_wallet_address ON users(wallet_address);
```

#### Protocol Requests Table

```sql
CREATE TABLE protocol_requests (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(44) NOT NULL,
  protocol_name VARCHAR(255) NOT NULL,
  token_contract_address VARCHAR(44) NOT NULL,
  idl_source TEXT,
  contact_info VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING_REVIEW',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add index for filtering by status
CREATE INDEX idx_status ON protocol_requests(status);
CREATE INDEX idx_wallet_address_requests ON protocol_requests(wallet_address);
```

### Step 3: Install Database Client

#### Option A: Prisma (Recommended)

```bash
npm install prisma @prisma/client
npx prisma init
```

Create `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            Int      @id @default(autoincrement())
  walletAddress String   @unique @map("wallet_address")
  whitelisted   Boolean  @default(false)
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@index([walletAddress])
  @@map("users")
}

model ProtocolRequest {
  id                   Int      @id @default(autoincrement())
  walletAddress        String   @map("wallet_address")
  protocolName         String   @map("protocol_name")
  tokenContractAddress String   @map("token_contract_address")
  idlSource            String?  @map("idl_source")
  contactInfo          String   @map("contact_info")
  status               String   @default("PENDING_REVIEW")
  createdAt            DateTime @default(now()) @map("created_at")
  updatedAt            DateTime @updatedAt @map("updated_at")

  @@index([status])
  @@index([walletAddress])
  @@map("protocol_requests")
}
```

Run migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### Option B: Direct SQL Client

```bash
npm install pg  # for PostgreSQL
# OR
npm install mysql2  # for MySQL
```

### Step 4: Update API Routes

#### Update `/api/auth/check-user/route.ts`

Replace the placeholder logic with actual database queries:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Query database for user
    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    return NextResponse.json({
      exists: !!user,
      user: user
        ? {
            walletAddress: user.walletAddress,
            whitelisted: user.whitelisted,
          }
        : null,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Update `/api/protocol/submit/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const walletAddress = formData.get("walletAddress") as string;
    const protocolName = formData.get("protocolName") as string;
    const tokenContractAddress = formData.get("tokenContractAddress") as string;
    const idlInput = formData.get("idlInput") as string;
    const contactInfo = formData.get("contactInfo") as string;
    const idlFile = formData.get("idlFile") as File | null;

    // Validate required fields
    if (!walletAddress || !protocolName || !tokenContractAddress || !contactInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    const protocolRequest = await prisma.protocolRequest.create({
      data: {
        walletAddress,
        protocolName,
        tokenContractAddress,
        idlSource: idlInput || "file_upload",
        contactInfo,
        status: "PENDING_REVIEW",
      },
    });

    // TODO: Send notification to your team
    // await sendSlackNotification({...});
    // await sendTelegramMessage({...});

    return NextResponse.json({
      success: true,
      message: "Protocol integration request submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting protocol:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Step 5: Environment Variables

Add to `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Or for Supabase
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

## Testing the Flow

### Test as New User

1. Click "Launch App" button
2. Connect wallet (use a wallet address NOT in your database)
3. Should see Protocol Integration Modal
4. Fill in form and submit
5. Check database for new entry in `protocol_requests` table

### Test as Existing User

1. Add a wallet address to your `users` table with `whitelisted = true`
2. Click "Launch App" button
3. Connect with the whitelisted wallet
4. Should redirect to `https://app.torque.so`

## Admin Dashboard (Optional)

You may want to create an admin page at `/admin/protocol-requests` to:

- View all pending protocol requests
- Approve/reject requests
- Manually whitelist wallet addresses
- View IDL files

## Wallet Support

Currently supports:
- Phantom
- Solflare
- Any Solana wallet with `window.solana` provider

To add more wallets, install `@solana/wallet-adapter-react`:

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui
```

## Security Considerations

1. **Rate Limiting** - Add rate limiting to prevent spam submissions
2. **Validation** - Validate Solana addresses on the backend
3. **CORS** - Ensure API routes are only accessible from your domain
4. **File Upload** - If accepting IDL files, validate file types and scan for malware
5. **Database** - Use parameterized queries (Prisma does this automatically)

## Next Steps

1. ✅ Set up database (Prisma, Supabase, etc.)
2. ✅ Update API routes with actual database queries
3. ✅ Add environment variables
4. ✅ Test the flow with different wallets
5. ⚠️ (Optional) Create admin dashboard for managing requests
6. ⚠️ (Optional) Add email/Telegram notifications
7. ⚠️ (Optional) Add analytics tracking

## Troubleshooting

### "Wallet not found" error
- User doesn't have a Solana wallet installed
- Prompt them to install Phantom or Solflare

### Modal doesn't open
- Check browser console for errors
- Ensure API routes are returning correct responses

### Database connection fails
- Verify `DATABASE_URL` in `.env.local`
- Check database credentials
- Ensure database is running

## Support

For questions or issues, contact the development team.
