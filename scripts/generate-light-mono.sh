#!/bin/bash

# Torque Light Monochrome — Blue on White, Dithered Minimal
# Clean, airy, sophisticated data visualization

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
OUTPUT_DIR="public/generated/image/light-mono"

mkdir -p "$OUTPUT_DIR"

generate() {
  local name="$1"
  local prompt="$2"
  local aspect="${3:-1:1}"

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
echo "  LIGHT MONOCHROME — Blue on White, Dithered Minimal"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# =============================================================================
# FLOATING GEOMETRIC CLUSTERS — Like the reference image
# =============================================================================

generate "cluster-cubes-01" \
  "Abstract geometric composition on pure white background. Floating cluster of overlapping cubic and rectangular forms in blue monochrome palette — ranging from pale sky blue to deep cobalt blue. Forms are rendered with visible dithered halftone texture creating smooth tonal gradients. Horizontal glitch lines and scan artifacts slice through the cluster. The geometric mass floats in upper portion of frame. Below: minimal pale gray horizon line with subtle shadow/reflection on light gray ground plane. Small blue sphere floating nearby as accent. Pure white to off-white cream background. The entire image has risograph printing aesthetic — visible dot patterns, clean color separation. Minimalist, airy, sophisticated. Blue ink on white paper quality. Contemporary data visualization as fine art print." \
  "1:1"

generate "cluster-cubes-02" \
  "Floating architectural cluster of geometric blocks against pure white void. Blue monochrome only — pale cerulean to medium blue to deep navy tones. Interconnected cubes and rectangular prisms forming abstract structure. Visible dithered halftone texture throughout creating all tonal values. Horizontal glitch bands and thin scan lines cut through forms. Forms cast soft shadow on pale gray ground plane below. Minimal horizon line barely visible. Single small sphere accent. Background: pure white, bright, airy. The aesthetic of risograph print — limited color, visible texture, clean separation. No other colors — strictly blue and white. Geometric abstraction meets glitch art on pristine white canvas. Serene, minimal, sophisticated." \
  "1:1"

generate "cluster-spheres" \
  "Abstract composition of overlapping spheres and circular forms floating against pure white background. Blue monochrome palette — light sky blue through medium azure to deep blue. Spheres vary in size, some overlapping, creating layered depth. All forms rendered with visible dithered halftone dot pattern. Horizontal glitch lines slice through the cluster creating fragmentation effect. Soft shadow on pale gray ground plane below. Minimal horizon line. Background: bright white, clean, airy. The quality of blue ink risograph print on white paper. Some spheres more solid, others more transparent/faded. Scattered small pixel fragments. Contemplative, minimal, refined. Data nodes as abstract art." \
  "1:1"

# =============================================================================
# NETWORK VISUALIZATIONS
# =============================================================================

generate "network-nodes-light" \
  "Network diagram of connected nodes on pure white background. Blue monochrome only. Multiple small spheres connected by thin lines forming constellation pattern. Spheres rendered in varying blue tones — some pale, some deep blue. Visible dithered halftone texture on all forms. Horizontal glitch artifacts and scan lines throughout. The network floats in bright white space with subtle pale gray ground plane and shadow below. Clean, minimal, technical yet artistic. Risograph print aesthetic — visible dot pattern, blue ink on white. No other colors. The topology of connection rendered as refined abstract print. Airy, sophisticated, data-forward." \
  "4:3"

generate "network-grid-light" \
  "Isometric grid of nodes on pure white background. Small blue spheres arranged in geometric pattern receding toward horizon. Connection lines between nodes in pale blue. Blue monochrome palette from sky blue to cobalt. Visible dithered halftone texture throughout. Horizontal glitch bands slice through grid. Pale gray ground plane with subtle reflection. Bright white background, airy atmosphere. The aesthetic of technical diagram meets risograph art print. Grid suggests infrastructure, distributed system. Clean, minimal, sophisticated. Blue ink on pristine white paper quality." \
  "16:9"

generate "network-pulse-light" \
  "Abstract data flow visualization on pure white background. Horizontal stream of geometric forms — rectangles, circles — moving across frame with motion blur. Blue monochrome only — forms transition from pale blue to deep blue. Visible dithered halftone texture. Horizontal glitch lines and scan artifacts. Small scattered pixel particles trail from moving forms. Background: pure bright white. Pale gray ground plane with minimal horizon. Energy and motion rendered in refined minimal style. Risograph print aesthetic. The visualization of network activity as serene abstract composition. Clean, airy, sophisticated." \
  "16:9"

# =============================================================================
# GROWTH & VALUE
# =============================================================================

generate "growth-bars-light" \
  "Ascending bar chart as abstract art on pure white background. Vertical rectangular bars rising left to right in growth curve. Blue monochrome — bars graduate from pale sky blue to deep cobalt blue as they ascend. Visible dithered halftone texture creating tonal gradients. Horizontal glitch lines slice through bars. Pale gray ground plane with subtle shadow beneath bars. Bright white background, airy and clean. Small sphere accent floating near peak. Risograph print aesthetic — blue ink on white paper. Financial growth rendered as minimal geometric abstraction. Sophisticated, refined, data visualization as art." \
  "4:3"

generate "value-stack-light" \
  "Stack of geometric forms representing accumulated value on pure white background. Cylindrical discs or coins stacked vertically. Blue monochrome palette — pale blue at top graduating to deeper blue at base. Visible dithered halftone dot pattern throughout. Horizontal glitch artifacts slice through stack. Soft shadow on pale gray ground plane. Bright white background. The forms suggest currency, value, accumulation. Risograph print quality — limited color, visible texture. Minimal, clean, sophisticated. Wealth as abstract geometric composition." \
  "1:1"

generate "ascending-platforms" \
  "Ascending platform levels as abstract visualization on pure white background. Three or four horizontal rectangular platforms at different heights creating stair pattern. Blue monochrome — platforms range from pale to deep blue. Visible dithered halftone texture. Horizontal glitch bands cut through forms. Small spheres on different platform levels suggesting progression. Pale gray ground with soft shadows. Bright white airy background. The aesthetic of risograph print — blue ink, visible dot pattern. Achievement tiers as minimal geometric art. Clean, sophisticated, aspirational." \
  "1:1"

# =============================================================================
# BLOCKCHAIN & INFRASTRUCTURE
# =============================================================================

generate "blocks-chain-light" \
  "Chain of connected cubes on pure white background representing blockchain. Cubes arranged in gentle curve extending into depth. Blue monochrome — cubes range from pale to deep blue. Visible internal grid patterns suggesting data. Dithered halftone texture throughout. Horizontal glitch lines slice through chain. Chrome-like connection elements between cubes rendered as thin lines. Pale gray ground plane with subtle shadow. Bright white background. Risograph print aesthetic — blue ink on white paper. The immutable ledger as minimal abstract composition. Clean, technical, sophisticated." \
  "3:2"

generate "infrastructure-light" \
  "Abstract infrastructure visualization on pure white background. Isometric arrangement of geometric forms — cubes, rectangles, lines — suggesting server architecture. Blue monochrome only — forms in varying blue tones from sky to navy. Visible dithered halftone texture. Horizontal glitch artifacts and scan lines. Connection lines between elements. Pale gray ground plane. Bright white airy background. The backbone of digital systems as refined geometric print. Risograph aesthetic — limited palette, visible texture. Technical diagram meets fine art." \
  "16:9"

generate "vault-light" \
  "Abstract vault/container form on pure white background. Central geometric mass — cube or rectangular form — suggesting secure storage. Blue monochrome — deep blue form against bright white. Visible dithered halftone texture throughout. Horizontal glitch lines cut through form. Form casts soft shadow on pale gray ground plane. Small sphere accent nearby. Background: pure white, clean, airy. The concept of security rendered as minimal geometric abstraction. Risograph print quality. Solid, trustworthy, sophisticated." \
  "1:1"

# =============================================================================
# ABSTRACT MINIMAL — Hero/decorative use
# =============================================================================

generate "floating-mass-01" \
  "Single abstract floating form on pure white background. Ambiguous organic-geometric shape — cluster of overlapping planes and curves. Blue monochrome — form shows range from pale to deep blue tones. Heavy dithered halftone texture creating all tonal values. Horizontal glitch lines fragment the form. Form floats in upper-center of frame. Pale gray horizon line and ground plane with soft shadow below. Small sphere accent. Pure white background, bright and airy. Risograph print aesthetic — blue ink on white paper. Contemplative, minimal, serene. Abstract data form as refined art print." \
  "1:1"

generate "floating-mass-02" \
  "Abstract geometric cluster floating against pure white void. Interconnected angular forms — triangular, rectangular planes overlapping. Blue monochrome palette — pale sky blue to deep cobalt. Visible dithered dot pattern throughout. Horizontal scan line glitches slice through mass. Soft shadow on minimal pale gray ground. Bright white background. Small scattered pixel fragments around main form. The aesthetic of corrupted 3D geometry rendered as risograph print. Clean, minimal, sophisticated. Digital abstraction on pristine white canvas." \
  "1:1"

generate "horizon-minimal" \
  "Extremely minimal composition on pure white background. Simple pale gray horizon line in lower third. Single small blue sphere floating in upper portion. Subtle dithered texture on sphere showing tonal gradient. Faint horizontal glitch line through center. Tiny shadow beneath sphere on pale ground. Background: pure bright white, vast empty space. Blue monochrome only. The absolute minimum of elements. Zen-like simplicity. Risograph print quality — blue ink dot pattern visible on sphere. Serene, contemplative, sophisticated negative space." \
  "1:1"

generate "data-particles" \
  "Scattered geometric particles on pure white background. Small cubes, spheres, rectangular fragments dispersed across frame in organic distribution. Blue monochrome — particles in varying blue tones. Visible dithered halftone texture. Some particles have horizontal glitch distortion. Particles denser in center, sparser at edges. Background: pure white, bright. Subtle pale gray ground plane suggestion. The visualization of data points, network activity, distributed elements. Risograph print aesthetic. Clean, minimal, technical yet artistic. Particles as abstract composition." \
  "16:9"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ Complete! Output: $OUTPUT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
