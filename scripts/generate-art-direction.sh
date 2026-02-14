#!/bin/bash

# Torque Art-Directed Assets Generator
# Uses fal.ai Recraft V3 (SOTA) + FLUX 1.1 Pro for high-end visuals
# Aesthetic: Frutiger Aero Revival + Y3K Hyperfuturism + Liquid Chrome

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
OUTPUT_DIR="public/generated/image/art-direction"

mkdir -p "$OUTPUT_DIR"

# Recraft V3 - Best for stylized, brand-consistent imagery
generate_recraft() {
  local name="$1"
  local prompt="$2"
  local width="${3:-1024}"
  local height="${4:-768}"
  local style="${5:-realistic_image}"

  echo "🎨 Generating $name (Recraft V3)..."

  response=$(curl -s -X POST "https://fal.run/fal-ai/recraft-v3" \
    -H "Authorization: Key $FAL_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"$prompt\",
      \"image_size\": {\"width\": $width, \"height\": $height},
      \"style\": \"$style\"
    }")

  url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)

  if [ -n "$url" ]; then
    curl -s -o "$OUTPUT_DIR/$name.jpg" "$url"
    echo "  ✓ Saved: $OUTPUT_DIR/$name.jpg"
  else
    echo "  ✗ ERROR: $name"
    echo "  $response"
  fi
}

# FLUX 1.1 Pro Ultra - Best photorealism with art direction
generate_flux_ultra() {
  local name="$1"
  local prompt="$2"
  local aspect="${3:-16:9}"

  echo "📸 Generating $name (FLUX Pro Ultra)..."

  response=$(curl -s -X POST "https://fal.run/fal-ai/flux-pro/v1.1-ultra" \
    -H "Authorization: Key $FAL_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"$prompt\",
      \"aspect_ratio\": \"$aspect\",
      \"output_format\": \"jpeg\",
      \"safety_tolerance\": 2
    }")

  url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)

  if [ -n "$url" ]; then
    curl -s -o "$OUTPUT_DIR/$name.jpg" "$url"
    echo "  ✓ Saved: $OUTPUT_DIR/$name.jpg"
  else
    echo "  ✗ ERROR: $name"
    echo "  $response"
  fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TORQUE — Art-Directed Asset Generation"
echo "  Aesthetic: Frutiger Aero × Y3K Hyperfuturism × Liquid Chrome"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# =============================================================================
# HERO VISUALS — Frutiger Aero Revival meets Y3K
# =============================================================================

generate_flux_ultra "hero-main" \
  "Editorial product photography, Phase One IQ4 150MP medium format camera, Schneider Kreuznach 80mm f/2.8 lens, f/11 aperture. A sculptural arrangement of liquid mercury chrome blobs and translucent aurora-gradient glass spheres floating above an infinite white cyclorama. The chrome forms are impossibly smooth with perfect specular highlights showing studio softbox reflections. Glass objects contain swirling internal caustics in electric cyan, soft magenta, and luminous green — reminiscent of Windows Vista aurora wallpaper and early iTunes visualizers. Subtle iridescent rainbow oil-slick sheen on chrome surfaces. One central glass orb pulses with bioluminescent energy. Scattered holographic confetti particles catch light. Shot in a high-end photo studio with Broncolor Para 133 lighting creating crisp shadows and perfect white background falloff. Color science: Fujifilm Pro 400H film emulation with lifted shadows. Frutiger Aero aesthetic, Y3K hyperfuturism, Apple product photography level execution. 8K resolution, extreme sharpness, zero AI artifacts." \
  "16:9"

generate_flux_ultra "hero-abstract" \
  "Hasselblad H6D-400c MS camera, HC 100mm f/2.2 lens, multi-shot mode for extreme resolution. An ethereal composition of interconnected translucent glass tubes forming an abstract neural pathway structure, filled with flowing luminescent cyan liquid. Chrome ball bearings of various sizes float at junction points, each reflecting the pristine white studio environment with mathematical precision. The glass has subtle thickness variations creating natural lens distortion effects. Tiny air bubbles frozen mid-rise inside the liquid. Background is pure 255/255/255 white with imperceptible gradient. Accent lighting from below creates dramatic uplighting through glass elements casting complex caustic shadows. Color palette: electric cyan, chrome silver, hints of aurora borealis green and soft pink. Style references: Bang & Olufsen product photography, Jony Ive era Apple, Windows Aero glass effects. Shot with circular polarizer to eliminate unwanted reflections while preserving intentional specular highlights. Tethered capture to Capture One with Phase One IQ4 color science." \
  "16:9"

# =============================================================================
# BENTO GRID — Premium Feature Cards
# =============================================================================

generate_flux_ultra "B1-rewards-engine" \
  "Advertising photography, Sinar P3 large format camera, Rodenstock HR Digaron-S 32mm lens, focus stacked 47 exposures. A floating holographic interface panel made of layered translucent glass sheets with chrome edges, displaying abstract code visualization as flowing particle streams in electric cyan. The glass layers create depth through subtle parallax and refraction. Surrounding the main panel: orbiting chrome capsules containing reward tokens that glow from within with warm gold light. Tiny chrome spheres scatter around like mercury droplets. One corner features a cluster of iridescent soap-bubble spheres reflecting rainbow spectrums. The entire composition floats against seamless white infinity cove. Key light from 45-degree angle with large octabox, fill from white v-flat, hair light creating rim separation. Post-production: subtle chromatic aberration on edges for authenticity. References: Teenage Engineering product shots, Dieter Rams Braun catalog photography, 2000s Sony VAIO marketing. Frutiger Aero meets minimalist Scandinavian design." \
  "3:2"

generate_flux_ultra "B2-leaderboard" \
  "Studio product photography, Canon EOS R5 Mark II, RF 100mm f/2.8L Macro IS USM lens, 1:1 magnification. Three ascending podium forms made of solid optical-grade crystal glass with chrome medal inserts — the geometry is soft and organic like polished river stones rather than harsh angular shapes. First place emits subtle inner luminescence in championship gold with cyan rim. Chrome medals feature abstract achievement glyphs etched with laser precision. Floating around the podiums: translucent ranking badges containing holographic numbers, tiny chrome star particles, and aurora-gradient ribbons frozen mid-flutter. Crystal surfaces show realistic micro-scratches and dust particles for authenticity. Background: pure white with subtle horizon gradient. Lighting: three-point setup with beauty dish key, strip softbox rim lights. Color grading: lifted blacks, slight teal in shadows, warm highlights. References: Olympic medal photography, luxury watch advertising, Swarovski crystal catalogs. Y3K trophy aesthetic." \
  "4:3"

generate_flux_ultra "B3-ai-brain" \
  "Scientific visualization meets editorial photography. Nikon Z9, NIKKOR Z 50mm f/1.2 S lens, f/8 for maximum sharpness. An abstract neural network rendered as a constellation of chrome nodes connected by hair-thin glass filaments containing flowing data streams visualized as bioluminescent cyan particles. The central node is larger — a faceted chrome polyhedron with an inner core of swirling aurora energy (cyan, magenta, soft green). Smaller satellite nodes orbit at various distances. Glass connection tubes show visible data packet pulses traveling between nodes. Some filaments branch and merge creating an organic, almost biological network topology. Scattered throughout: tiny floating holographic glyphs representing data types. Background: infinite white with subtle depth fog. Lighting emphasizes the dimensionality through careful shadow placement. References: IBM Watson marketing imagery, MIT Media Lab visualizations, Björk album artwork. Hyper-clean execution with zero visual noise." \
  "4:3"

generate_flux_ultra "B4-developer-api" \
  "Technical product photography, Sony A1, FE 90mm f/2.8 Macro G OSS lens. An isometric arrangement of interconnected glass server modules with chrome framework — each module contains holographic code displays showing API endpoints, JSON structures, and SDK snippets in luminous cyan on transparent surfaces. Chrome data cables connect modules with visible fiber optic cores pulsing with light. The composition suggests infrastructure without being literal — abstract, sculptural, premium. Small chrome tools float nearby: hexagonal wrenches, precision screwdrivers, suggesting developer craftsmanship. One module is partially transparent showing internal circuit patterns as decorative elements. Steam wisps suggest thermal activity. Background: seamless white with dramatic side lighting creating long sculptural shadows. References: Teenage Engineering OP-1 internals, Bang & Olufsen Beosystem, 1960s IBM mainframe marketing photography reimagined for 2026. Retro-futurism meets contemporary minimalism." \
  "3:2"

# =============================================================================
# PLAYBOOKS — Campaign Type Illustrations
# =============================================================================

generate_flux_ultra "C1-raffle-fortune" \
  "Conceptual still life photography, Leica S3, Summarit-S 70mm f/2.5 ASPH lens. A kinetic sculpture depicting chance and reward: a large transparent glass sphere containing hundreds of floating golden tickets and chrome lottery balls in zero gravity. The sphere rests on an Art Deco chrome pedestal with geometric patterns. Inside the sphere, visible probability streams rendered as interweaving aurora ribbons guide the floating elements. Some tickets cluster near the top, others drift lazily. Chrome balls of various sizes create visual rhythm. One ticket glows brighter than others — the winner emerging. Outside the sphere: scattered chrome confetti and holographic sparkles. The glass shows perfect specular highlights from studio lighting and subtle internal reflections. References: vintage fortune telling machines, early Pixar rendering tests, luxury perfume bottle photography. Background: pure white cyclorama. Magical realism aesthetic." \
  "4:3"

generate_flux_ultra "C2-referral-viral" \
  "Network visualization as sculptural photography, Phase One XT, 23mm f/5.6 lens. An organic molecular structure made of translucent glass nodes connected by chrome tubes — representing viral network growth. The central node is largest, with progressively smaller nodes branching outward in a fibonacci spiral pattern. Each glass node contains a tiny floating chrome avatar silhouette and pulsing energy core. The chrome connection tubes show visible data/value flowing as luminescent particles traveling from outer nodes toward center. Some branches are still growing — indicated by forming/incomplete connections with particle trails. Color coding through internal node glow: cyan for active, soft pink for new, gold for high-value. The entire structure appears to gently rotate, captured with slight motion blur on outer elements. Background: white with subtle radial gradient suggesting expansion. References: molecular biology imagery, social network visualizations, luxury jewelry advertising." \
  "4:3"

generate_flux_ultra "C3-multiplier-growth" \
  "Data visualization as luxury product photography, Fujifilm GFX100 II, GF 110mm f/2 R LM WR lens. An ascending series of translucent glass bars forming an exponential growth curve — but rendered as polished gemstones rather than clinical chart elements. Each bar is a different cut: emerald, baguette, cushion — creating visual interest through variety. Chrome base platform with etched measurement grid that glows cyan from beneath. The bars increase in internal luminosity as they rise — bottom bars are clear, top bars pulse with electric cyan energy. Floating above the peak: chrome multiplication symbols (×10, ×100) with holographic glow. Particle streams rise upward suggesting continued growth beyond frame. Small chrome spheres scattered on base like mercury droplets. Background: seamless white with hero lighting from upper right. References: Cartier jewelry photography, Bloomberg terminal aesthetics reimagined as physical objects, Swarovski annual report imagery." \
  "4:3"

generate_flux_ultra "C4-distribution-flow" \
  "Fluid dynamics visualization as still life, Hasselblad X2D 100C, XCD 90mm f/2.5 V lens. A vertical glass funnel sculpture with chrome mechanical iris gates at multiple levels — reward tokens flow through like a luxury hourglass. Top reservoir contains swirling golden tokens in liquid suspension. Chrome gates control flow rate, some open, some partially closed, creating accumulation pools. The glass shows fluid dynamics: vortex patterns, laminar flow sections, turbulent zones near gates. Each gate level displays holographic validation checkmarks in cyan. Output stream at bottom disperses tokens into organized channels. Chrome support structure with Art Deco geometric patterns. Internal lighting makes the liquid glow subtly gold. Background: pure white with dramatic vertical composition emphasizing gravity and flow. References: scientific glass apparatus, luxury perfume bottle mechanics, Rube Goldberg machines rendered as high art." \
  "9:16"

# =============================================================================
# SOLUTION CARDS — Use Case Specifics
# =============================================================================

generate_flux_ultra "D1-velocity-motion" \
  "High-speed photography simulation, Canon EOS R3, RF 85mm f/1.2L USM lens, 1/8000 shutter speed aesthetic. Glass coins with chrome edges captured mid-flight in perfect frozen motion — but with intentional motion blur trails rendered as translucent glass ribbons showing trajectory paths. The coins travel along curved chrome guide rails that appear and disappear. Speed is conveyed through stretched specular highlights, directional particle sprays, and compressed space in motion direction. Some coins stack mid-air at acceleration points marked by chrome ring gates pulsing with blue energy. The composition is dynamic, diagonal, energetic. Background: white with motion blur gradient suggesting camera pan. Color: predominantly chrome and glass with cyan energy accents. References: Harold Edgerton high-speed photography, automotive advertising freeze frames, bullet-time visual effects as still image. Pure kinetic energy captured." \
  "3:2"

generate_flux_ultra "D2-yield-vault" \
  "Architectural product photography, ALPA 12 TC, Rodenstock HR Digaron-W 32mm lens. A premium glass vault cube with chrome framework and mechanical door mechanism — the door slightly ajar revealing stacked luminescent assets inside. The glass walls are thick optical crystal showing edge refraction. Inside: organized rows of glowing digital assets represented as various geometric forms (cubes, spheres, pyramids) in gold, cyan, and soft pink. Rising from the open top: a continuous stream of yield particles floating upward like inverse rain. The chrome door features an intricate circular lock mechanism with visible gears and status indicators. Chrome hinges show premium engineering. Base platform: brushed chrome with status display showing APY in holographic numerals. Background: white with subtle shadow from vault mass. References: luxury watch safe photography, bank vault door engineering, Apple Pro Display XDR stand aesthetics. Trust and security visualized." \
  "4:3"

generate_flux_ultra "D3-progression-tiers" \
  "Epic scale product photography, Phase One XT IQ4, 150mm f/4.5 lens. A monumental ascending tier structure rendered as stacked glass platforms with chrome supports — each tier more luminous and prestigious than the last. Bottom tier: clear glass, industrial. Middle tiers: increasing cyan inner glow, refined details. Top tier: brilliant aurora glow, chrome throne element, floating achievement crown. Glass staircases with chrome railings connect levels with integrated LED step lighting. Floating around each tier: holographic rank badges, achievement icons, particle effects indicating energy required to advance. Scale is deliberately ambiguous — could be tabletop model or architectural installation. Background: pure white with dramatic upward lighting creating aspirational atmosphere. References: video game progression UI as physical sculpture, Olympic podium reimagined, Maslow's hierarchy as luxury object. Aspiration materialized." \
  "3:4"

# =============================================================================
# ABSTRACT BRAND ELEMENTS
# =============================================================================

generate_recraft "icon-reward" \
  "Isometric 3D icon, single object on pure white background. A translucent glass gift box with aurora gradient coloring (cyan to soft pink to pale green) and chrome ribbon bow. The glass shows realistic refraction and internal caustics. Chrome ribbon has perfect mirror finish. Subtle glow emanates from inside suggesting valuable contents. Clean, minimal, iconic. Style: Frutiger Aero meets contemporary app icon design. No shadows, floating in white void. Vector-clean edges with photorealistic materials." \
  512 512 "realistic_image"

generate_recraft "icon-network" \
  "Isometric 3D icon, single object on pure white background. Three chrome spheres arranged in triangle formation, connected by translucent glass tubes containing flowing cyan energy particles. Central connection point features small aurora-gradient crystal. Perfect mirror reflections on chrome. Glass tubes show realistic thickness and refraction. Minimal, iconic, premium. Style: Y3K hyperfuturism meets contemporary UI design. No shadows, floating composition." \
  512 512 "realistic_image"

generate_recraft "icon-analytics" \
  "Isometric 3D icon, single object on pure white background. Three ascending glass bars in exponential arrangement — clear, soft cyan, bright cyan gradient. Chrome base platform with subtle glow. Bars have gemstone-cut quality with faceted edges catching light. Minimal, iconic, data-forward. Style: Bloomberg terminal meets luxury crystal. Clean vector edges with photorealistic glass material." \
  512 512 "realistic_image"

generate_recraft "icon-blockchain" \
  "Isometric 3D icon, single object on pure white background. A single translucent glass cube containing visible internal circuit pattern in glowing cyan. Chrome chain link attached to one edge. The glass shows depth through multiple internal layers. Chain link has perfect chrome mirror finish. Minimal, iconic, tech-forward. Style: Enterprise blockchain meets luxury materials. Frutiger Aero color palette." \
  512 512 "realistic_image"

generate_flux_ultra "pattern-particles" \
  "Abstract particle field on pure white background. Hundreds of small chrome spheres and translucent glass beads of varying sizes scattered across frame in organic distribution — denser in center, sparser at edges. Some spheres cluster, others float alone. Glass beads contain tiny aurora-gradient cores. Chrome spheres show perfect environment reflections. Subtle depth of field with sharp focus band across middle third. No other elements, just particles and white void. References: pharmaceutical advertising hero shots, luxury cosmetic texture photography. Clean, premium, versatile as background element." \
  "16:9"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ Generation complete!"
echo "  Output: $OUTPUT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
