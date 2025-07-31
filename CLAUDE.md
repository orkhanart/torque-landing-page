# Torque Landing Page - Claude Code Guide

## Project Overview
This is a modern Next.js 14 landing page for **Torque**, a Solana-based growth protocol. The project is built with React 18, TypeScript, and Tailwind CSS, featuring a sophisticated animated background using Three.js and advanced UI components.

## Tech Stack & Architecture

### Core Framework
- **Next.js 14** (App Router) - React framework with server-side rendering
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript with strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework with custom design system

### Key Dependencies
- **UI Components**: Radix UI primitives (@radix-ui/react-*) for accessible components
- **Styling**: 
  - `tailwind-merge` + `clsx` for conditional CSS classes (via `cn` utility)
  - `class-variance-authority` for component variants
  - `tailwindcss-animate` for animations
- **Animation**: 
  - `framer-motion` for React animations
  - `three.js` + `postprocessing` for 3D background effects
- **Form Handling**: `@formspree/react` for contact forms
- **Icons**: `lucide-react` and `react-icons`
- **Carousel**: `embla-carousel-react`

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Page-specific components
│   │   ├── hero.tsx       # Main hero section
│   │   ├── navbar.tsx     # Navigation component
│   │   ├── footer.tsx     # Footer component
│   │   └── [others].tsx   # Various landing page sections
│   ├── fonts/             # Local font files (Geist)
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage component
├── blocks/                # Reusable block components
│   └── Backgrounds/
│       └── Hyperspeed/    # 3D animated background
├── components/            # Shared components
│   └── ui/                # shadcn/ui components
│       ├── button.tsx     # Button variants
│       ├── card.tsx       # Card components
│       └── [others].tsx   # Other UI primitives
└── lib/
    └── utils.ts           # Utility functions (cn helper)
```

## Design System

### Color Scheme (Dark Theme)
The project uses a sophisticated dark theme with custom CSS variables:
- **Primary**: Cyan (#ABFFFF) - main brand color
- **Accent**: Coral (#F1A3A1) - secondary accent color  
- **Background**: Dark blue-gray (#0A0F1C)
- **Card**: Semi-transparent dark (#0F1F2E)

### Typography
- **Primary Font**: Instrument Sans (Google Fonts)
- **Fallback Fonts**: Geist Sans & Geist Mono (local)
- Custom line heights and font weights defined in Tailwind config

### Components
- Built with **shadcn/ui** component system
- Uses **Radix UI** primitives for accessibility
- **CVA (class-variance-authority)** for component variants
- Custom components extend the base shadcn system

## Development Commands

### Package Manager
The project uses **pnpm** (preferred) with npm/yarn as alternatives:
```bash
# Development server
pnpm dev          # or npm run dev / yarn dev

# Build for production
pnpm build        # or npm run build / yarn build

# Start production server
pnpm start        # or npm run start / yarn start

# Linting
pnpm lint         # or npm run lint / yarn lint
```

### Development Server
- Runs on `http://localhost:3000`
- Hot reload enabled for all file changes
- TypeScript checking in development mode

## Key Features & Components

### Animated Background
- **Hyperspeed component** - 3D animated tunnel effect using Three.js
- Rendered as fixed background layer with z-index layering
- Uses postprocessing effects (Bloom, SMAA) for visual enhancement

### Hero Section
- Dynamic logo carousel showing partner companies
- Animated elements with Framer Motion
- Contact modal integration
- Responsive design with mobile-first approach

### UI Patterns
- **Geometric cards** - Custom card components with unique styling
- **Custom buttons** - Multiple variants (primary, accent, white)
- **Progressive disclosure** - Sections reveal content progressively
- **Modal system** - Contact forms and overlays

### Form Handling
- **Formspree integration** for contact forms
- Custom form validation and success states
- Modal-based form interactions

## File Organization Patterns

### Component Structure
- **Page components** in `src/app/components/` - specific to landing page
- **Reusable UI** in `src/components/ui/` - shared across project
- **Block components** in `src/blocks/` - complex, self-contained features

### Styling Patterns
- **CSS Variables** for theming in `globals.css`
- **Utility classes** for layout and spacing
- **Component-scoped** styles using Tailwind
- **Custom utilities** defined in Tailwind config

### Asset Management
- **Public folder** - static assets (images, icons, videos)
- **Optimized images** - Next.js Image component throughout
- **SVG icons** - Mix of Lucide React and custom SVGs

## Development Guidelines

### Code Patterns
- **Functional components** with TypeScript
- **Custom hooks** for state management
- **Server/Client components** - proper use of "use client" directive
- **Responsive design** - mobile-first approach

### Naming Conventions
- **PascalCase** for components
- **camelCase** for functions and variables
- **kebab-case** for file names (some exceptions)
- **UPPERCASE** for constants

### Import Patterns
```typescript
// Standard Next.js imports
import Image from "next/image";
import { Metadata } from "next";

// UI components
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/customButton";

// Utilities
import { cn } from "@/lib/utils";
```

## Common Tasks

### Adding New Components
1. Create in appropriate directory (`src/components/ui/` for reusable, `src/app/components/` for page-specific)
2. Use TypeScript interfaces for props
3. Follow shadcn/ui patterns for styling
4. Export from component file

### Styling Components
1. Use `cn()` utility for conditional classes
2. Leverage CSS variables for colors
3. Use Tailwind responsive prefixes
4. Custom variants with CVA when needed

### Managing State
- Use React hooks (`useState`, `useEffect`)
- Framer Motion for animation state
- Form state with Formspree integration

### Adding New Pages
- Create in `src/app/` directory
- Follow App Router conventions
- Use proper metadata for SEO
- Maintain consistent layout patterns

## Environment & Configuration

### Next.js Configuration
- Standard Next.js config (minimal customization)
- TypeScript paths configured for `@/` alias
- App Router enabled by default

### Tailwind Configuration
- Extended color palette with custom variables
- Custom animations and keyframes
- Modified component defaults
- CSS variables integration

### Build Process
- TypeScript compilation
- Tailwind CSS processing
- Next.js optimization
- Asset optimization and compression

This codebase represents a modern, well-architected landing page with sophisticated animations and a robust component system. Focus on maintaining the established patterns and leveraging the existing UI component library when making changes or additions.