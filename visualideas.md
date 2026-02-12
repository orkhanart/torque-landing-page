# Hero Visual Ideas - Dither & Pixel Style

## Brand Colors
- Primary Cyan: #ABFFFF
- Dark Blue-Gray: #0A0F1C
- Accent Coral: #F1A3A1

---

## Idea 1: Dithered 3D Terrain
**Style:** Low-poly mountains/waves with shader-based dithering

**Technical:**
- Three.js with custom dither shader
- Bayer matrix 4x4 or 8x8 dithering
- Limited color palette (2-4 colors)

**Interaction:**
- Mouse X/Y controls camera rotation
- Terrain gently animates (wave motion)
- Parallax depth on scroll

**Mood:** Dark, moody, professional

---

## Idea 2: Pixel Particle Field
**Style:** Thousands of small squares in 3D space

**Technical:**
- Three.js PointsMaterial or instanced squares
- Depth-based sizing
- Dithered background gradient

**Interaction:**
- Particles part around cursor
- Subtle drift animation
- Click creates ripple effect

**Mood:** Cosmic, data-driven, tech

---

## Idea 3: Retro 3D Grid
**Style:** 80s synthwave grid but pixelated

**Technical:**
- Perspective grid plane
- Objects/shapes rise from grid
- Scanline overlay effect
- 1-bit color reduction

**Interaction:**
- Grid scrolls infinitely
- Mouse tilt effect
- Elements appear on scroll

**Mood:** Retro-futuristic, bold

---

## Idea 4: ASCII/Dot Matrix 3D
**Style:** 3D scene rendered as text characters

**Technical:**
- Render to texture, sample brightness
- Map to character set (. : + # @)
- Or use dot/circle patterns

**Interaction:**
- Mouse reveals high-res areas
- Typewriter animation on load
- Characters shift/glitch

**Mood:** Hacker, terminal, unique

---

## Idea 5: Dithered Metaballs
**Style:** Organic blobs with heavy dithering

**Technical:**
- Marching squares or SDF metaballs
- Real-time dither shader
- High contrast B&W or limited palette

**Interaction:**
- Blobs follow cursor smoothly
- Merge and separate
- Subtle morphing animation

**Mood:** Organic, artistic, premium

---

## Implementation Order
1. [ ] Dithered 3D Terrain
2. [ ] Pixel Particle Field
3. [ ] Retro 3D Grid
4. [ ] ASCII/Dot Matrix 3D
5. [ ] Dithered Metaballs

## Current Status
Starting with Idea 1...
