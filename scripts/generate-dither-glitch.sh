#!/bin/bash

# Torque Dithered Glitch Art Style
# Risograph texture, synthwave colors, geometric abstraction, data visualization aesthetic

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
OUTPUT_DIR="public/generated/image/dither-glitch"

mkdir -p "$OUTPUT_DIR"

generate() {
  local name="$1"
  local prompt="$2"
  local aspect="${3:-16:9}"

  echo "  → $name"

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
    echo "    ✓ saved"
  else
    echo "    ✗ failed"
  fi
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DITHERED GLITCH — Risograph Synthwave Data Art"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# =============================================================================
# HERO IMAGES — Wide format, maximum impact
# =============================================================================

generate "hero-data-city" \
  "Abstract digital cityscape with dithered risograph printing texture throughout entire image. Vertical rectangular towers and blocks in varying heights creating urban skyline silhouette. Large glowing gradient sphere (sun/moon) in pink-to-orange positioned in upper portion. Color palette: deep magenta, electric cyan, soft pink, purple shadows. Horizontal glitch lines and scan artifacts cutting through the composition. Overlapping translucent rectangular color blocks creating depth layers. Reflective water surface at bottom mirroring the city with ripple distortion. Visible halftone dot pattern and pixel dithering on all surfaces. Synthwave vaporwave aesthetic. The entire image looks like it was printed on a risograph with slight misregistration between color layers. Atmospheric fog between buildings. No photorealism — stylized graphic art with intentional lo-fi digital texture." \
  "16:9"

generate "hero-abstract-network" \
  "Abstract data visualization artwork with heavy dithered halftone texture. Central cluster of geometric forms — overlapping circles, squares, rectangles in various sizes — appearing to dissolve and reform. Forms rendered in gradient fills from cyan to pink to orange. Horizontal glitch streaks and scan lines extend from the central mass toward edges. Small scattered pixel particles and data fragments float around composition. Background: deep navy blue to black gradient. Color accents: electric blue, soft pink, warm orange highlights. The entire image has visible risograph-style dot pattern and color separation artifacts. Some elements have motion blur suggesting data in transit. Thin vertical lines like rain or data streams in background. Abstract representation of network activity and data flow. Lo-fi digital aesthetic meets fine art printmaking." \
  "16:9"

generate "hero-geometric-void" \
  "Minimalist abstract composition with prominent dithered texture. A large floating geometric cluster — interconnected cubes and rectangular prisms — hovering above flat horizon line. The forms are rendered in grayscale with subtle blue tint and visible halftone pattern creating tonal gradations. Horizontal glitch artifacts slice through the floating mass. Small sphere floating nearby as accent. Background: pure white sky gradient to pale gray ground. Ground plane shows subtle reflection/shadow of floating forms. The geometric cluster appears slightly corrupted — edges fragmenting into pixels, some faces showing scan line interference. Monochromatic with hint of blue. Risograph printing aesthetic with intentional imperfection. Serene yet digital, calm yet glitched. Contemporary art meets data corruption." \
  "1:1"

# =============================================================================
# NETWORK & CONNECTION — Core Torque themes
# =============================================================================

generate "network-nodes-pink" \
  "Abstract network visualization with dithered risograph texture. Multiple spheres of varying sizes connected by thin lines forming constellation pattern. Spheres rendered with gradient fills — hot pink cores fading to cyan edges. Connection lines pulse with traveling data particles. Background: deep purple to black gradient. Overlapping translucent rectangular blocks in pink and cyan create depth layers. Horizontal scan line glitches cut across entire image. Small scattered pixels and fragments float in space. The spheres have visible halftone dot pattern creating smooth tonal transitions. Some nodes glow brighter suggesting activity hubs. Synthwave color palette: magenta, cyan, purple, touches of orange. The aesthetic of 80s computer graphics reimagined as fine art print. Data network as abstract constellation." \
  "4:3"

generate "network-grid-blue" \
  "Isometric grid of connected nodes with heavy dithered texture throughout. Nodes are small spheres arranged in precise geometric pattern extending toward horizon. Color palette: deep blue monochrome with variations from navy to electric blue to pale cyan. Single warm accent — small orange/red glow at one node suggesting activity point. Connection lines between nodes visible. Horizontal glitch bands and scan line artifacts create visual interference. Background: dark blue gradient. Visible halftone risograph dot pattern on all surfaces. Overlapping rectangular color blocks create layered atmosphere. Some grid lines fade into pixelated dissolution at edges. The entire image has lo-fi digital print quality — slightly misregistered colors, visible texture. Minimalist data infrastructure visualization as abstract art." \
  "16:9"

generate "network-pulse" \
  "Abstract visualization of data pulse traveling through network. Central horizontal beam of light/energy rendered with motion blur and glitch fragmentation. Beam transitions through color spectrum: orange to pink to cyan to blue. Geometric rectangular blocks scatter around the beam — some solid, some translucent overlays. Heavy dithered halftone texture throughout entire image. Background: deep navy transitioning to black at edges. Horizontal scan lines and digital artifacts visible. Small particles and pixel fragments trail behind the energy pulse. Two spheres on either side suggest origin and destination nodes. The entire composition has risograph printing aesthetic with visible dot patterns and color separation. Energy and motion captured in lo-fi digital style." \
  "16:9"

# =============================================================================
# VALUE & GROWTH — Financial visualization
# =============================================================================

generate "growth-chart-vaporwave" \
  "Abstract ascending bar chart rendered in synthwave vaporwave style with dithered risograph texture. Bars rise from left to right in exponential curve — rendered as vertical rectangular blocks. Color gradient across bars: deep purple at base through magenta, pink, to bright cyan at peak. Large gradient sun/circle in background — orange to yellow. Horizontal glitch lines cut through composition. Reflective surface below creates mirror image of bars. Overlapping translucent color rectangles add depth layers. Visible halftone dot pattern throughout. Small scattered pixels and data fragments. Background: deep blue to purple gradient. The aesthetic of 80s business graphics meets contemporary glitch art. Financial growth visualized as retro-futurist abstract print." \
  "4:3"

generate "value-spheres" \
  "Collection of floating spheres representing value/tokens with dithered texture. Spheres vary in size — largest in center, smaller scattered around. Each sphere has gradient fill: golden orange core fading to pink then cyan edge. Heavy risograph halftone pattern visible on sphere surfaces creating retro print quality. Background: deep teal to black gradient. Horizontal scan line glitches cut through spheres. Small rectangular block overlays in translucent colors. Scattered pixel particles suggest digital nature. Some spheres have motion blur trails. Reflection on dark ground plane. The spheres glow softly, suggesting contained value. Synthwave meets numismatic — currency reimagined as abstract digital art. Lo-fi aesthetic with warm color accent." \
  "1:1"

generate "ascending-blocks" \
  "Abstract growth visualization — ascending rectangular blocks creating staircase pattern. Blocks rendered in color gradient from cool blue-green at bottom to warm yellow-orange at top. Heavy dithered halftone texture on all surfaces. Overlapping translucent rectangular color layers create depth and atmosphere. Horizontal glitch bands and scan line artifacts throughout. Background: lime green to cyan gradient with visible pixel texture. Some blocks fragment at edges into scattered pixels. Small sphere accent floating near peak. The entire image has risograph printing quality — visible dot patterns, slight color misregistration, lo-fi charm. Progress and growth rendered as abstract geometric print. Optimistic color palette with digital corruption aesthetic." \
  "4:3"

# =============================================================================
# ABSTRACT ELEMENTS — Versatile compositions
# =============================================================================

generate "floating-form-minimal" \
  "Single abstract floating form against minimal background with heavy dithered texture. The form is an ambiguous organic-geometric shape — part sphere, part blob, suggestion of face or mask. Rendered in grayscale with subtle blue tint and horizontal glitch distortion fragmenting its surface. Visible halftone risograph dot pattern creating all tonal values. Background: pure white to pale gray gradient. Ground plane: flat gray horizon with subtle reflection/shadow. The form casts soft shadow suggesting it floats above surface. Horizontal scan lines slice through the form. Edges pixelate and dissolve into scattered fragments. Monochromatic, contemplative, serene yet corrupted. The aesthetic of corrupted 3D render meets fine art printmaking. Minimalist abstract with digital decay." \
  "1:1"

generate "sphere-planet-blue" \
  "Large sphere dominating composition with dithered texture throughout. Sphere rendered in deep blue gradient with visible internal structure — curved lines, geometric divisions suggesting technological planet or data structure. Small secondary sphere nearby. Background: darker blue gradient. Orange/red warm accent glow at center of main sphere suggesting core energy or activity. Heavy horizontal glitch bands and scan line artifacts. Overlapping translucent rectangular blocks in varying blues. Visible risograph halftone dot pattern on all surfaces. Some areas of sphere fragment into pixels at edges. Atmospheric haze rendered with dithered gradients. Planetary scale meets data visualization. The aesthetic of vintage sci-fi illustration filtered through glitch art sensibility." \
  "4:3"

generate "corridor-perspective" \
  "Abstract corridor/pathway stretching toward horizon with synthwave aesthetic and dithered texture. Vertical rectangular columns on both sides creating tunnel perspective. Reflective floor surface with perfect mirror reflection. Glowing sun/orb at vanishing point — gradient from yellow to orange. Color palette: predominantly cyan and blue columns with pink/magenta accent lighting. Neon grid lines on floor. Heavy horizontal glitch bands slice through entire image. Visible halftone risograph dot pattern throughout. Atmospheric fog/haze with dithered rendering. Small human silhouettes for scale at various distances. The aesthetic of outrun/synthwave album covers with fine art print quality. Retro-futurist architecture as abstract composition." \
  "16:9"

generate "data-stream-abstract" \
  "Abstract horizontal data stream with dithered texture. Central band of flowing forms — overlapping rectangles, circles, organic shapes — moving left to right with motion blur. Color transition through the stream: blue to cyan to pink to orange. Heavy glitch fragmentation and scan line artifacts. Scattered pixel particles trail from moving forms. Background: dark gradient, neutral. Overlapping translucent color rectangles create depth. Visible risograph halftone pattern throughout. Some forms more defined, others dissolving into pixel spray. The visualization of data in motion — network traffic, value transfer, information flow. Lo-fi digital aesthetic meets kinetic abstract art. Speed and direction with retro print quality." \
  "16:9"

# =============================================================================
# BLOCKCHAIN & INFRASTRUCTURE
# =============================================================================

generate "blocks-chain-glitch" \
  "Chain of connected cubes representing blockchain with dithered risograph texture. Cubes arranged in subtle curve extending into depth. Each cube shows visible internal data patterns — grid lines, circuit traces rendered as simple geometric marks. Color palette: predominantly cyan and blue with pink accent glow on active blocks. Chrome/silver reflection on cube surfaces rendered with halftone pattern. Heavy horizontal glitch bands cut through chain. Overlapping translucent rectangular color layers. Background: deep navy gradient. Scattered pixels and data fragments around chain. Some blocks more solid, others fragmenting at edges. The immutable ledger visualized as corrupted digital print. Blockchain infrastructure as abstract art with lo-fi aesthetic." \
  "3:2"

generate "infrastructure-grid" \
  "Abstract infrastructure grid with dithered texture throughout. Isometric arrangement of geometric forms — cubes, rectangles, lines suggesting server architecture or data center. Color palette: blue monochrome with warm orange accent lights suggesting activity points. Heavy halftone risograph dot pattern visible on all surfaces. Horizontal glitch bands and scan line artifacts. Overlapping translucent rectangular blocks create atmospheric depth. Background: dark gradient. Some elements fragment into pixels at edges. Connection lines between nodes visible but subtle. The backbone of digital systems rendered as abstract fine art print. Infrastructure as geometric composition with intentional lo-fi corruption." \
  "16:9"

generate "vault-abstract" \
  "Abstract representation of secure vault/storage with dithered texture. Central geometric form suggesting cube or container — solid, massive, protective. Rendered in deep blue-gray tones with visible halftone pattern. Warm golden glow emanating from within — the stored value visible through geometric opening. Heavy horizontal glitch bands slice through composition. Overlapping translucent rectangular color blocks in blue and gold tones. Background: dark gradient. Scattered pixel fragments suggest digital nature. The form casts strong shadow on ground plane. Security and protection rendered as abstract geometric print. The aesthetic of bank vault meets corrupted digital art. Trust through visual weight with lo-fi texture." \
  "1:1"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ Complete! Output: $OUTPUT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
