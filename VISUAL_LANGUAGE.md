# Torque Visual Language System

## Design Philosophy

**Cyberpunk Terminal Infrastructure**

Torque is the intelligence layer - the machinery under the hood. The visual language should feel like looking at the engine of a high-performance system: precise, data-dense, alive with information, and unmistakably powerful.

### Core Principles

1. **Data is Visual** - Numbers, transactions, wallets visualized as living patterns
2. **Terminal Aesthetic** - Monospace, grids, scan lines, command-line feel
3. **Restrained Power** - Black/white with strategic intensity
4. **Always Moving** - Subtle constant motion suggests live data
5. **Depth Without Color** - Layers, shadows, and motion create hierarchy

---

## Color System

```css
/* Pure Monochrome - Light Mode */
--black: #000000;
--white: #FFFFFF;

/* Gray Scale */
--gray-50: #FAFAFA;
--gray-100: #F5F5F5;
--gray-200: #E5E5E5;
--gray-300: #D4D4D4;
--gray-400: #A3A3A3;
--gray-500: #737373;
--gray-600: #525252;
--gray-700: #404040;
--gray-800: #262626;
--gray-900: #171717;

/* Semantic (subtle, not primary) */
--positive: #166534;  /* Dark green */
--negative: #991B1B;  /* Dark red */
--warning: #92400E;   /* Dark amber */
```

---

## Typography

### Font Stack

```css
--font-display: 'Funnel Display', system-ui, sans-serif;
--font-body: 'Geist', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale

| Name | Font | Size | Weight | Use |
|------|------|------|--------|-----|
| Hero | Funnel Display | 80-120px | 500 | Main headlines |
| Display XL | Funnel Display | 56-72px | 500 | Section headlines |
| Display LG | Funnel Display | 40-48px | 500 | Subsection heads |
| Display MD | Funnel Display | 28-32px | 500 | Card titles |
| Body LG | Geist | 20px | 400 | Lead paragraphs |
| Body | Geist | 16px | 400 | Body text |
| Body SM | Geist | 14px | 400 | Secondary text |
| Mono LG | JetBrains | 24-32px | 500 | Data numbers |
| Mono | JetBrains | 14px | 400 | Code, data |
| Mono SM | JetBrains | 11px | 500 | Labels, tags |

### Typography Effects

- **Glitch Text**: Subtle RGB split on hover
- **Typing Animation**: Terminal-style character reveal
- **Flicker**: Occasional subtle opacity flicker for "live" feel

---

## Visual Elements

### 1. Grid Pattern Background

**Concept**: Infinite perspective grid suggesting data infrastructure

```
Properties:
- Line color: rgba(0, 0, 0, 0.03) on white
- Grid size: 40px base
- Perspective vanishing point: center-bottom
- Animation: Slow drift upward (parallax with scroll)
- Intensity: Fades toward edges (vignette)
```

### 2. Particle Field

**Concept**: Data points flowing, representing transactions/wallets

```
Properties:
- Particle count: 100-200
- Size: 1-3px (variance)
- Color: Black with varying opacity (0.1-0.5)
- Movement: Slow drift with occasional acceleration
- Connections: Lines between nearby particles (data network)
- Interaction: Particles avoid cursor (repulsion field)
```

### 3. Scan Lines

**Concept**: CRT monitor effect, suggests surveillance/analysis

```
Properties:
- Horizontal lines every 2-4px
- Opacity: 0.02-0.05
- Animation: Slow vertical scroll
- Intensity: Stronger in dark sections
```

### 4. Data Rain

**Concept**: Matrix-style falling characters representing transactions

```
Properties:
- Characters: 0-9, hex characters, wallet fragments
- Fall speed: Varying (50-200px/s)
- Opacity: Gradient from top to bottom
- Density: Sparse, not overwhelming
- Trigger: On scroll into certain sections
```

### 5. Noise Texture

**Concept**: Subtle film grain adds analog/organic feel

```
Properties:
- Type: Gaussian noise
- Opacity: 0.02-0.04
- Animation: Subtle shift every frame
- Layer: Overlay on entire page
```

### 6. Geometric Patterns

**Concept**: Network topology, multi-party orchestration

```
Shapes:
- Hexagons (nodes in network)
- Connecting lines (relationships)
- Circles (wallets/entities)
- Triangles (direction/flow)

Animation:
- Pulse on connections
- Rotate slowly
- Scale on hover
```

---

## Component Patterns

### Terminal Card

```
Structure:
┌─────────────────────────────────────┐
│ ● ● ●   COMPONENT_NAME              │
├─────────────────────────────────────┤
│                                     │
│  Content area                       │
│                                     │
│  > cursor blinks here_              │
│                                     │
└─────────────────────────────────────┘

Properties:
- Border: 1px solid black
- Background: white
- Header: Black bar with dots and title
- Font: Monospace in header
- Corner radius: 0 (sharp) or 2px (subtle)
```

### Insight Card (Live Data)

```
Structure:
┌─────────────────────────────────────┐
│ ◉ ACTIVATION_OPPORTUNITY      LIVE  │
├─────────────────────────────────────┤
│                                     │
│ 47 high-volume traders identified   │
│                                     │
│ ┌─────┬─────┬─────┐                │
│ │$3.8M│ 73% │ 12d │                │
│ │ VOL │ RSP │ WIN │                │
│ └─────┴─────┴─────┘                │
│                                     │
│ [████████████░░░░░░] PROCESSING     │
│                                     │
│ > EXECUTE_TARGETING                 │
└─────────────────────────────────────┘

Effects:
- Pulsing dot indicator
- Progress bar animation
- Typing effect on text reveal
- Scan line overlay
```

### Stat Block

```
Structure:
┌───────────────┐
│               │
│    89M+       │  <- Funnel Display, large
│               │
│ TRANSACTIONS  │  <- JetBrains Mono, tiny
│   INDEXED     │
│               │
└───────────────┘

Effects:
- Number count-up animation
- Subtle background pulse
- Glitch on hover
```

### Navigation

```
Structure:
TORQUE          PRODUCT  SOLUTIONS  PRICING  DOCS          [GET ACCESS]
─────────────────────────────────────────────────────────────────────────

Properties:
- Minimal, borderless
- Monospace for links
- Underline on hover (typing effect)
- CTA: Inverted (black bg, white text)
```

---

## Animation Principles

### Timing

```
--duration-instant: 100ms   /* Micro-interactions */
--duration-fast: 200ms      /* Hovers, toggles */
--duration-normal: 300ms    /* Transitions */
--duration-slow: 500ms      /* Section reveals */
--duration-slower: 800ms    /* Major animations */

--ease-out: cubic-bezier(0.16, 1, 0.3, 1)     /* Deceleration */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1) /* Smooth */
--ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6) /* Bounce */
```

### Scroll Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section headers | Slide up + fade | Enter viewport |
| Stats | Count up | Enter viewport |
| Cards | Stagger reveal | Enter viewport |
| Background | Parallax | Scroll position |
| Grid | Perspective shift | Scroll position |

### Hover States

| Element | Effect |
|---------|--------|
| Links | Underline types from left |
| Buttons | Invert colors + subtle scale |
| Cards | Border appears + shadow |
| Data points | Glow + expand info |

### Loading States

- Skeleton with scan line sweep
- Pulsing placeholder blocks
- Terminal cursor blink

---

## Interaction Patterns

### Cursor Effects

```
Default: Crosshair or custom pointer
Hover (interactive): Pointer with ring
Hover (data): Plus sign (expand data)
Drag: Grabbing hand
```

### Scroll Behavior

```
- Smooth scroll enabled
- Snap points on major sections (optional)
- Progress indicator (vertical line or dots)
- Parallax layers (3 depths)
```

### Mouse Tracking

```
- Particle field reacts to cursor
- Subtle spotlight effect following mouse
- Tilt effect on cards (3D perspective)
```

---

## Section Breakdown

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Grid background with perspective]                         │
│                                                             │
│  [Particle field - sparse, floating]                        │
│                                                             │
│                                                             │
│     TORQUE___                                               │
│     INTELLIGENCE_LAYER                                      │
│                                                             │
│     Stop guessing.                                          │
│     Start knowing.                                          │
│                                                             │
│     > We've analyzed 90M+ trades_                           │
│                                                             │
│     [GET ACCESS]  [VIEW DEMO]                               │
│                                                             │
│                                                             │
│  ┌──────────────────────────────────────┐                  │
│  │ ◉ LIVE_INSIGHT                       │                  │
│  │ 47 traders identified for activation │                  │
│  │ $3.8M combined volume                │                  │
│  └──────────────────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Stats Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  $10M   │ │  906K   │ │  89M+   │ │   40%   │          │
│  │DISTRIBUTED│ │PROFILES│ │INDEXED │ │ SAVED  │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  [Numbers count up on scroll, glitch effect]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Problem Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Dark section - inverted colors]                           │
│  [Scan lines more prominent]                                │
│                                                             │
│     THE_PROBLEM                                             │
│                                                             │
│     40% of incentive spend is wasted on:                    │
│                                                             │
│     > BOT_FARMS ████████████░░░░░░ 31%                     │
│     > MERCENARIES ██████████░░░░░░ 28%                     │
│     > BLIND_TARGETING █████░░░░░░░ 22%                     │
│     > MANUAL_OPS ████░░░░░░░░░░░░ 19%                      │
│                                                             │
│  [Progress bars animate on scroll]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Network Visualization Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     MULTI_PARTY_ORCHESTRATION                               │
│                                                             │
│           ┌─────┐                                           │
│           │ DEX │                                           │
│           └──┬──┘                                           │
│              │                                              │
│      ┌───────┼───────┐                                     │
│      │       │       │                                     │
│   ┌──┴──┐ ┌──┴──┐ ┌──┴──┐                                │
│   │LAUNCH│ │TORQUE│ │COMM │                                │
│   │ PAD │ │      │ │UNITY│                                │
│   └─────┘ └─────┘ └─────┘                                 │
│                                                             │
│  [WebGL visualization with connecting lines]                │
│  [Nodes pulse, connections animate]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### Background Layers (z-index)

```
z-0:  Grid pattern (CSS or Canvas)
z-1:  Particle field (Three.js/Canvas)
z-2:  Scan lines (CSS pseudo-element)
z-3:  Noise texture (CSS)
z-10: Content
z-50: Navigation
z-100: Modals
```

### Performance Targets

```
- 60fps animations
- < 3s initial load
- Lazy load heavy visuals
- Reduce motion for prefers-reduced-motion
- Fallback for WebGL not supported
```

### Files to Create

```
src/
├── components/
│   ├── backgrounds/
│   │   ├── GridBackground.tsx
│   │   ├── ParticleField.tsx
│   │   ├── ScanLines.tsx
│   │   └── NoiseTexture.tsx
│   ├── terminal/
│   │   ├── TerminalCard.tsx
│   │   ├── TerminalText.tsx
│   │   ├── DataTable.tsx
│   │   └── ProgressBar.tsx
│   ├── animations/
│   │   ├── CountUp.tsx
│   │   ├── TypeWriter.tsx
│   │   ├── GlitchText.tsx
│   │   └── ScrollReveal.tsx
│   └── visualizations/
│       ├── NetworkGraph.tsx
│       └── DataFlow.tsx
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useMousePosition.ts
│   └── useInView.ts
└── styles/
    └── terminal.css
```

---

## Next Steps

1. Set up base styles (fonts, colors, CSS variables)
2. Create background layer components
3. Build terminal UI components
4. Implement scroll animations
5. Create hero section
6. Build remaining sections
7. Polish and optimize

---

*This document serves as the source of truth for Torque's visual language.*
