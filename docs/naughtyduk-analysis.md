# NaughtyDuk.com — Full Technical & Design Analysis

> **URL**: https://www.naughtyduk.com/
> **Analyzed**: 2026-03-01
> **Type**: Creative agency portfolio / landing page

---

## 1. Tech Stack

### Core Platform

| Layer | Technology | Notes |
|-------|-----------|-------|
| Platform | Webflow | Website builder, handles CMS + hosting |
| 3D Engine | Three.js | GLTFLoader, DRACOLoader, RGBELoader |
| Animation | GSAP + ScrollTrigger + SplitText | Full GreenSock suite |
| Smooth Scroll | Lenis | `lerp: 0.15`, `wheelMultiplier: 0.7` |
| DOM | jQuery | Legacy dependency via Webflow |
| Tooltips | Tippy.js | Lightweight tooltip library |
| Effects | Custom `ripples.js` | Canvas-based water ripple overlay |

### CDN & Asset Hosting

| Source | Purpose |
|--------|---------|
| `cdn.prod.website-files.com` | Webflow CDN for static assets |
| `naughtydukassets.com` | Custom domain for 3D models + HDR |
| `cdn.jsdelivr.net` | Draco decoder for GLTF compression |

---

## 2. Animation System

### GSAP (GreenSock Animation Platform)

**ScrollTrigger Batch Animations**
- Data attribute driven: `data-animate="slide-up"`
- Batch processing for performance on multiple elements
- Stagger: `0.1s` between elements in batch
- Duration: `0.8s` per element
- Easing: `power2.inOut`

**SplitText Reveals**
- Line-based text splitting (not character-based)
- Initial state: `y: 101%` (fully below line)
- Animate to: `y: 0%`
- Stagger: `0.15s` between lines
- Used on headings and navigation links

**Preloader Timeline**
```
0.00s — Page load, content hidden
1.55s — First element begins fade
1.75s — Main content reveal starts
2.50s — Preloader fully complete, interactions enabled
```

**Navigation Hover**
- Line-based animation with `y: -10px` offset
- Stagger: `0.15s` between elements
- Easing: `power2.inOut`
- Duration: `0.3s`

### CSS Keyframe Animations

**Marquee**
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
/* Duration: 30s, linear, infinite */
/* Pauses on hover */
```

### Lenis Smooth Scroll

```js
{
  lerp: 0.15,           // Interpolation factor (lower = smoother)
  wheelMultiplier: 0.7, // Reduced scroll speed
  // Velocity tracking via _ndScrollActive flag
}
```

### Canvas Ripple Effect

- Fullscreen canvas overlay at `z-index: 9`
- `filter: invert(0.4)` for visual blending
- Mouse-interactive water ripple simulation
- Runs continuously as ambient effect

---

## 3. 3D / WebGL System

### Three.js Setup

| Component | Detail |
|-----------|--------|
| Renderer | Shared instance, `alpha: true` for transparent BG |
| Loader | GLTFLoader + DRACOLoader (Draco compression) |
| Environment | RGBELoader with `the_sky_is_on_fire_1k.hdr` |
| Models | `.glb` format, optimized + Draco-compressed |
| Activation | Intersection Observer (lazy load) |
| Resize | ResizeObserver for responsive canvas sizing |

### 3D Logo Card Interactions

```js
{
  targetRotationX: 0.2,   // Max X rotation on hover
  targetRotationY: 0.3,   // Max Y rotation on hover
  lerp: 0.1,              // Smooth interpolation
  fadeIn: '0.3s',          // Canvas opacity transition
  easing: 'power2.out'
}
```

### Proprietary WebGL Libraries

| Library | Purpose |
|---------|---------|
| spectraGL | Spectrum/gradient effects |
| glitchGL | Digital glitch effects |
| particlesGL | Particle simulations |
| liquidGL | Liquid/fluid simulations |

---

## 4. Design System

### Color Palette

```
Background:     #000000  (pure black)
Primary Text:   #f8f8f8  (off-white)
Dark Text:      #141414  (near-black, for focus states)
Borders:        #dadada  (light gray)
Hover Border:   #acacac  (medium gray)
Form BG:        #1f1f1f  (dark charcoal)
Tooltip BG:     #0a0a0a  (near-black)
Selection BG:   #333333  (dark charcoal)
Tooltip Text:   #f0f0f0  (light gray)
Form Borders:   #dddddd  (light gray)
```

**Theme**: Monochrome dark. No accent colors. Pure black/white/gray.

### Typography

| Property | Value |
|----------|-------|
| Font Family | `Auxmono` (custom monospace, locally loaded) |
| Letter Spacing | `-0.05vw` to `-0.025vw` (tight, negative) |
| Line Heights | `1.0` (tooltips), `1.25` (body text) |
| Text Transform | `uppercase` for UI labels, form messaging |
| Rendering | `-webkit-font-smoothing: antialiased` |
| | `-moz-osx-font-smoothing: grayscale` |
| Smallest Size | `0.625rem` (form errors) |

**Key characteristic**: Single monospace font throughout. No serif/sans-serif mix. The monospace font IS the brand identity.

### Layout System

**Units**: Viewport-relative everywhere
```
Padding:  0.2vw, 0.5vw, 1.5vw, 3vw
Margins:  3vw, 6vw, 9vw, 12vw (staggered rows)
Gaps:     5vw
Heights:  25rem to 40svh (responsive)
```

**Breakpoints**:
| Width | Target |
|-------|--------|
| 992px | Tablet landscape |
| 768px | Tablet portrait |
| 479px | Mobile landscape |
| 362px | Small mobile |

**Aspect Ratios**:
- Client cards: `5:4`
- Work items: `4:3`

**Marquee Card Widths**:
- Desktop: `16.666vw` (6 visible)
- Tablet: `25vw` (4 visible)
- Mobile: `50vw` → `100vw`

### Performance Optimizations

```css
contain: layout style paint;    /* Rendering isolation */
will-change: transform;         /* GPU layer promotion */
```
```js
force3D: true                   // GSAP GPU acceleration
pointer-events: none            // Disabled until activation
```

### Z-Index Hierarchy

```
z-index: 1  — Canvas elements (3D, footer)
z-index: 3  — Navigation
z-index: 9  — Ripple overlay
```

---

## 5. Page Structure

### Section Breakdown

```
1. PRELOADER
   └── Animated intro sequence (1.75s)

2. NAVIGATION
   ├── Logo wrap (left)
   ├── Menu items (right)
   ├── Live GMT clock display
   └── mix-blend-mode: difference (inverts over content)

3. HERO
   └── Client logo marquee (continuous scroll)

4. STATISTICS CAROUSEL
   ├── 2M monthly visitors
   ├── 7 awards
   ├── 15+ years experience
   ├── Desktop: drag-to-scroll (50px threshold)
   ├── Mobile: swipe navigation
   └── Progress indicators (pagination dots)

5. FEATURED WORK
   ├── Teletech case study
   ├── Mobile app preview images
   └── Video container (aspect-ratio responsive)

6. CLIENT GRID
   ├── 8+ entertainment brand logos
   ├── 3D-rendered via Three.js (not flat images)
   └── Mouse hover = subtle 3D tilt

7. SERVICES
   ├── Brand Identity
   ├── Web Development
   ├── Mobile Apps
   ├── API Integration
   ├── Infrastructure
   └── WebGL Libraries
   (border-top: 1px solid #dadada between items)

8. LIBRARIES SHOWCASE
   ├── spectraGL
   ├── glitchGL
   ├── particlesGL
   └── liquidGL

9. FOOTER
   ├── ASCII art logo (text-based)
   ├── Canvas gradient effect
   └── Opacity: 1.0 (desktop), 0.5 (tablet), 0.35 (mobile)

10. CONTACT MODAL
    ├── Service selection (radio buttons)
    ├── Budget/timeline fields
    ├── GDPR checkbox (required)
    └── Custom validation + success/error states
```

---

## 6. Interactive Elements

### Marquee (Statistics)

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Interaction | Mouse drag-to-scroll | Swipe (50px threshold) |
| On hover | Pauses animation | N/A |
| On release | Smooth resume to auto-scroll | Snap to card |
| Pagination | Hidden | Progress dots visible |

### 3D Logo Cards

- Lazy-loaded via Intersection Observer
- Shared Three.js renderer (performance)
- Mouse position → rotation mapping
- Smooth interpolation (lerp: 0.1)
- Canvas fade-in on load (0.3s, power2.out)

### Form System

- Radio buttons with custom `.is-active-inputactive` class
- Checkbox filter: `invert(1) brightness(10)` when checked
- Border transitions: `#dddddd` → `#acacac` (hover) → `#141414` (focus)
- Webflow native form submission

### Navigation

- `mix-blend-mode: difference` — auto-inverts over any background
- SplitText line animations on hover
- Staggered reveal on page load

---

## 7. Image & Asset Formats

| Format | Usage |
|--------|-------|
| SVG | Logos, UI icons |
| WebP | Product/project images (optimized) |
| JPG | Fallback images |
| GLB/GLTF | 3D models (Draco-compressed) |
| HDR | Environment maps for 3D lighting |

---

## 8. SEO & Meta

### Schema.org Structured Data

```json
{
  "@type": "Organization",
  "knowsAbout": [
    "Brand Identity",
    "Web Development",
    "WebGL Libraries"
  ],
  "hasOfferCatalog": {
    "itemListElement": [
      "Brand Identity",
      "Web Development",
      "Mobile Apps",
      "API Integration",
      "Infrastructure"
    ]
  }
}
```

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| `fs-cc` | GDPR cookie consent framework |
| Webflow Forms | Native form submission |
| GitHub | Open-source library repos |

---

## 9. Key Design Principles

1. **Monochrome only** — zero color, pure black/white/gray
2. **Single typeface** — monospace font is the entire brand
3. **Viewport-relative everything** — no fixed pixel values for spacing
4. **3D as differentiator** — logos rendered in 3D, not flat images
5. **Ambient interactivity** — ripple canvas always active, subtle but present
6. **Performance-first** — Intersection Observer, shared renderers, contain CSS, Draco compression
7. **Blend mode navigation** — nav always readable regardless of background
8. **Minimal UI chrome** — thin borders, no shadows, no gradients (except WebGL)
9. **Text as graphic** — ASCII art footer, SplitText animations, tight letter-spacing

---

## 10. Stack Summary (for comparison)

```
Platform:       Webflow
3D:             Three.js (GLTF + Draco + HDR)
Animation:      GSAP + ScrollTrigger + SplitText
Scroll:         Lenis
Effects:        Custom canvas ripples, proprietary WebGL libs
Font:           Auxmono (monospace)
Colors:         Black + White + Gray (monochrome)
Layout:         Viewport-relative units, Flexbox, CSS Grid
Performance:    contain, will-change, force3D, Intersection Observer
Forms:          Webflow native + GDPR consent
```
