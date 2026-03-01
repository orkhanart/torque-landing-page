# Torque vs NaughtyDuk — Stack Comparison & Upgrade Recommendations

> **Date**: 2026-03-01
> **Purpose**: Compare Torque landing page stack against NaughtyDuk.com, identify gaps, and recommend improvements.

---

## Side-by-Side Stack Comparison

| Dimension | Torque (Current) | NaughtyDuk | Gap? |
|-----------|-----------------|------------|------|
| **Framework** | Next.js 14 + React 18 + TypeScript | Webflow | Torque wins — full SSR, type safety |
| **3D Engine** | Three.js + custom shaders + AsciiEffect | Three.js + GLTF + Draco + HDR envmaps | Parity — different approaches |
| **Animation** | Framer Motion + CSS keyframes | GSAP + ScrollTrigger + SplitText | **NaughtyDuk wins** |
| **Smooth Scroll** | Lenis (`lerp: 0.1`) | Lenis (`lerp: 0.15`) | Parity |
| **Text Animation** | Custom GlitchText + ScrambleText | GSAP SplitText (line reveals) | **NaughtyDuk more polished** |
| **Scroll Animation** | Basic CSS `animate-fade-up` on view | GSAP ScrollTrigger batch (data-attr driven) | **NaughtyDuk wins — orchestrated** |
| **Canvas Effects** | Procedural 2D visuals (nodes, orbits) | Fullscreen ripple overlay | Torque has more variety |
| **Typography** | 3 fonts (Instrument Sans, Geist, Geist Mono) | 1 font (Auxmono monospace) | Different strategies |
| **Color System** | HSL variables, blue accent, light theme | Pure monochrome black/white | Different strategies |
| **Nav Technique** | Glass-morphism + SVG filter + blur | `mix-blend-mode: difference` | Both sophisticated |
| **Layout Units** | Tailwind (rem/px based) | Viewport-relative (vw/vh) | **NaughtyDuk more fluid** |
| **Preloader** | None | GSAP timeline (1.75s choreographed) | **NaughtyDuk wins** |
| **Component System** | Radix UI + CVA + shadcn patterns | Webflow native | Torque wins — accessible |
| **Forms** | Formspree + Radix Dialog | Webflow native + GDPR | Parity |
| **Performance** | DPR cap, RAF cleanup, passive listeners | `contain`, `will-change`, `force3D`, IntersectionObserver | **NaughtyDuk more thorough** |
| **SEO** | Next.js metadata API | Schema.org structured data | Different approaches |
| **Tooltips** | None | Tippy.js | Minor gap |

---

## Key Gaps & Recommendations

### 1. SCROLL ANIMATIONS — HIGH PRIORITY

**Problem**: Torque uses basic CSS `animate-fade-up` (opacity + translateY). It's functional but feels generic — every element does the same thing at the same speed.

**NaughtyDuk approach**: GSAP ScrollTrigger with batch processing, staggered reveals, data-attribute control, and varied timings per section.

**Recommendation**: Replace CSS scroll animations with GSAP ScrollTrigger.

```
Install: gsap (includes ScrollTrigger plugin)
Approach:
  - Add data-attributes: data-animate="slide-up|fade|scale|stagger"
  - Use ScrollTrigger.batch() for groups of elements
  - Vary duration/stagger per section type
  - Use scrub for parallax sections
```

**Why GSAP over Framer Motion for scroll?**
- ScrollTrigger handles batch animations natively
- Better performance for many simultaneous animations
- Scrub (scroll-linked) animations are first-class
- SplitText plugin for text reveals
- `force3D: true` for GPU compositing

**Coexistence**: GSAP and Framer Motion can coexist. Keep Framer for component-level interactions (hover, tap, layout animations). Use GSAP for scroll-driven orchestration.

---

### 2. TEXT REVEAL ANIMATIONS — HIGH PRIORITY

**Problem**: Torque has GlitchText (character distortion) and ScrambleText (random chars), but no line-by-line text reveal on scroll. Headings just fade up — no text-specific choreography.

**NaughtyDuk approach**: GSAP SplitText splits headings into lines, each line reveals with `y: 101%` → `y: 0` with 0.15s stagger and overflow-hidden mask.

**Recommendation**: Add GSAP SplitText for heading reveals.

```
Install: gsap (SplitText is a Club plugin, or use a free alternative)
Free alternatives:
  - splitting.js (lightweight, line/char/word split)
  - Custom implementation with CSS clip-path

Pattern:
  - Split heading into <span> per line
  - Each line wrapped in overflow-hidden container
  - GSAP staggers y-transform per line on ScrollTrigger enter
  - Duration: 0.8s, stagger: 0.1s, ease: power2.out
```

---

### 3. PAGE PRELOADER — MEDIUM PRIORITY

**Problem**: Torque has no preloader. Page loads and everything is immediately visible, including the 3D scene which may take a moment to render (flash of empty canvas).

**NaughtyDuk approach**: Choreographed GSAP timeline — content hidden for 1.75s, then orchestrated reveal of nav, hero, and background.

**Recommendation**: Add a minimal preloader.

```
Approach:
  - Show brand mark / loading state while 3D initializes
  - Wait for Three.js scene ready + fonts loaded
  - GSAP timeline: fade loader out → stagger nav items in → reveal hero
  - Total duration: ~1.5s after assets ready
  - CSS: body overflow hidden during preload
```

---

### 4. VIEWPORT-RELATIVE SPACING — MEDIUM PRIORITY

**Problem**: Torque uses Tailwind's default rem/px spacing. This creates inconsistencies at extreme viewport sizes (very large monitors or small tablets).

**NaughtyDuk approach**: All spacing in `vw` units — `0.5vw`, `1.5vw`, `3vw`, `5vw`. Section margins use staggered vw values. Layout scales proportionally at every size.

**Recommendation**: Add fluid spacing utilities to Tailwind config.

```js
// tailwind.config.ts - extend spacing
spacing: {
  'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
  'fluid-sm': 'clamp(0.5rem, 1vw, 1rem)',
  'fluid-md': 'clamp(1rem, 2vw, 2rem)',
  'fluid-lg': 'clamp(1.5rem, 3vw, 3rem)',
  'fluid-xl': 'clamp(2rem, 5vw, 5rem)',
  'fluid-2xl': 'clamp(3rem, 8vw, 8rem)',
}

// Also consider fluid typography
fontSize: {
  'fluid-sm': 'clamp(0.75rem, 1vw, 0.875rem)',
  'fluid-base': 'clamp(0.875rem, 1.2vw, 1rem)',
  'fluid-lg': 'clamp(1.25rem, 2vw, 1.75rem)',
  'fluid-xl': 'clamp(2rem, 4vw, 3.5rem)',
  'fluid-2xl': 'clamp(3rem, 6vw, 5rem)',
}
```

**Why `clamp()` instead of pure `vw`?** Pure vw gets too small on mobile and too large on ultrawide. `clamp()` provides floor and ceiling while scaling fluidly in between.

---

### 5. AMBIENT CANVAS OVERLAY — LOW PRIORITY

**Problem**: Torque has procedural visuals on cards (RewardFlow, RankOrbit) but no ambient fullscreen effect. The page background is static.

**NaughtyDuk approach**: Fullscreen canvas ripple at `z-index: 9`, always-on, subtle mouse-reactive water simulation.

**Recommendation**: Consider a subtle fullscreen interactive layer.

```
Options:
  - Noise grain overlay (lightweight, CSS-only possible)
  - Dot grid that subtly responds to mouse position
  - Very faint particle field
  - Subtle cursor trail / glow effect

Implementation:
  - Fixed-position canvas, z-index above bg, below content
  - pointer-events: none
  - Very low opacity (0.05-0.15)
  - Should enhance, not distract
```

**Caution**: This can hurt performance on low-end devices. Gate behind a performance check or `prefers-reduced-motion`.

---

### 6. PERFORMANCE CSS PROPERTIES — LOW PRIORITY

**Problem**: Torque doesn't use `contain` or `will-change` in CSS. Relies on React/Next.js defaults.

**NaughtyDuk approach**: Explicit `contain: layout style paint` on sections, `will-change: transform` on animated elements, GSAP `force3D: true`.

**Recommendation**: Add containment and compositing hints.

```css
/* globals.css */

/* Sections that don't affect outside layout */
.section-contained {
  contain: layout style paint;
}

/* Elements that will animate (apply sparingly) */
[data-animate] {
  will-change: transform, opacity;
}

/* Remove will-change after animation completes */
[data-animate].is-animated {
  will-change: auto;
}
```

**Note**: Over-using `will-change` can actually hurt performance by consuming GPU memory. Only apply to elements that will animate.

---

### 7. MIX-BLEND-MODE NAV (OPTIONAL)

**Problem**: Torque's glass-morphism nav looks great on light backgrounds but may need adjustment on dark sections.

**NaughtyDuk approach**: `mix-blend-mode: difference` — nav text automatically inverts against any background. Zero manual adjustment needed.

**Consideration**: This is a design choice, not a gap. Torque's glass nav is sophisticated. But if Torque adds dark sections, `mix-blend-mode: difference` is an elegant solution.

---

## Implementation Priority

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| **P0** | Add GSAP + ScrollTrigger for scroll animations | Medium | High — transforms page feel |
| **P0** | Add text split/reveal animations for headings | Medium | High — premium polish |
| **P1** | Add page preloader with choreographed reveal | Small | Medium — smoother first impression |
| **P1** | Add fluid spacing utilities to Tailwind | Small | Medium — better scaling |
| **P2** | Add subtle ambient canvas overlay | Medium | Low — nice-to-have |
| **P2** | Add CSS containment for performance | Small | Low — marginal gain |

---

## Package Changes Required

### Add
```bash
pnpm add gsap        # GSAP + ScrollTrigger + SplitText (Club)
# OR for free text splitting:
pnpm add splitting    # Lightweight text split alternative
```

### Keep (already solid)
- `three` — 3D rendering (Torque's shader approach is more advanced than NaughtyDuk)
- `lenis` — smooth scroll (both sites use it)
- `framer-motion` — keep for component interactions
- `tailwindcss` — keep, extend with fluid utilities

### Consider Removing
- Nothing — all current deps serve a purpose

---

## What Torque Does BETTER Than NaughtyDuk

Not everything is a gap. Torque has clear advantages:

1. **Custom shaders** — Torque's vertex/fragment shaders with parametric helicoid geometry are more technically sophisticated than NaughtyDuk's GLTF model loading
2. **ASCII art rendering** — The Three.js → AsciiEffect pipeline is a unique visual signature
3. **Procedural card visuals** — Canvas 2D animated node graphs (RewardFlow, RankOrbit) are original; NaughtyDuk uses static images
4. **Component architecture** — Radix UI + CVA provides better accessibility and variant management than Webflow
5. **Type safety** — Full TypeScript with strict mode, NaughtyDuk has none
6. **Glass-morphism nav** — SVG filter-based glass effect is more complex than blend-mode inversion
7. **Color system** — HSL CSS variables with semantic naming is more maintainable
8. **React ecosystem** — Server components, context providers, hooks — proper state management

---

## Summary

Torque's core tech (Next.js, Three.js, custom shaders, Radix UI) is **stronger** than NaughtyDuk's Webflow setup. The gap is in **motion choreography** — NaughtyDuk uses GSAP to orchestrate scroll-driven animations with precision timing that Torque's CSS-only approach can't match.

The single highest-impact change: **Add GSAP ScrollTrigger for orchestrated scroll animations and text reveals.** This alone would close the biggest perceived quality gap.
