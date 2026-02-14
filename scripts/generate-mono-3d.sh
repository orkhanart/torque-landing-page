#!/bin/bash

# Torque Monochrome 3D Assets — Optimized for ASCII conversion
# Glass/Chrome, High Contrast, Network/Finance aesthetic

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
OUTPUT_DIR="public/generated/image/mono-3d"

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
echo "  MONOCHROME 3D — Glass/Chrome Network Finance"
echo "  Optimized for ASCII art source imagery"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Hero compositions - wide format
generate "hero-network-nodes" \
  "Black and white 3D render, extremely high contrast. A minimalist network of interconnected glass spheres floating in pure white void. Spheres are perfectly transparent with visible refraction and sharp caustic highlights. Thin chrome rods connect spheres in geometric pattern. Strong directional lighting from upper left creates dramatic shadows and bright specular reflections. Zero color — pure greyscale from deep black shadows to blown-out white highlights. The spheres vary in size, creating visual hierarchy. Clean, clinical, Swiss design aesthetic. Shot like a 1960s IBM mainframe advertisement. Octane render, 8K, extreme sharpness, maximum contrast for graphic reproduction." \
  "16:9"

generate "hero-liquid-chrome" \
  "Monochrome 3D visualization, black and white only. A single large droplet of liquid mercury frozen mid-splash against pure white background. The chrome surface is mirror-perfect, reflecting an abstract studio environment as distorted greyscale gradients. Secondary smaller droplets scatter from the main form. Dramatic side lighting creates strong shadow on white ground plane. The liquid metal catches light in sharp specular points of pure white against deep black shadow areas. Hyper-realistic chrome material rendering. No color whatsoever — pure black, white, and grey tones. Maximum dynamic range for ASCII conversion. Product photography lighting, Phase One camera aesthetic." \
  "16:9"

generate "hero-glass-architecture" \
  "Black and white architectural 3D render. Intersecting translucent glass planes forming abstract geometric structure against white void. Glass panels have varying opacity — some nearly transparent, others frosted. Strong backlight creates dramatic silhouettes and edge definition. Chrome connection points where planes meet. Shadows layer through multiple glass surfaces creating complex tonal gradations. Minimalist, Bauhaus-influenced composition. Pure monochrome — no color cast. Extreme contrast between bright backlit areas and deep shadow zones. The structure suggests data architecture, network topology, financial infrastructure. Clean lines, precise geometry, corporate modernism." \
  "16:9"

# Square format - iconic compositions
generate "sphere-cluster" \
  "Monochrome 3D still life, high contrast black and white. A cluster of chrome spheres of varying sizes arranged in organic pile against pure white background. Each sphere perfectly reflects its neighbors creating infinite recursive reflections in greyscale. Strong single light source creates crisp shadows beneath the cluster and bright specular highlights on sphere surfaces. Some spheres show pure white hotspots, others fall into deep black shadow. Zero color — clinical greyscale palette. The composition suggests molecular structure, network nodes, accumulated value. Shot like vintage scientific photography. Maximum contrast for graphic reproduction." \
  "1:1"

generate "glass-cube-stack" \
  "Black and white 3D render, extreme contrast. Three transparent glass cubes stacked at slight angles against white void. Each cube shows visible edge refraction — thick dark lines where light bends through glass corners. Internal reflections create complex geometric patterns within each cube. Chrome corner caps catch light as pure white specular points. Strong directional lighting from side creates graduated shadows through glass. Pure monochrome rendering — no color, full greyscale range from 0 to 255. The stacked forms suggest blockchain, accumulated data, financial building blocks. Minimalist Swiss typography poster aesthetic." \
  "1:1"

generate "chrome-torus" \
  "Monochrome product photography, 3D render. A single perfect chrome torus (donut shape) floating against pure white background. The mirror surface reflects studio environment as smooth greyscale gradients — bright on top, dark on underside. Inner ring shows complex reflected geometry. Strong rim light creates bright edge definition against white background. Deep shadow beneath torus grounds the form. Zero color — pure black and white with full tonal range. The form suggests cycles, returns, continuous flow — perfect for financial loop visualization. Shot like a luxury watch advertisement. Hasselblad medium format aesthetic, extreme sharpness." \
  "1:1"

# Network and connection imagery
generate "network-grid" \
  "Black and white technical visualization, 3D render. An isometric grid of chrome nodes connected by thin glass tubes against white background. Nodes are small polished spheres at regular intervals. Glass connection tubes show subtle refraction. The grid extends toward horizon with atmospheric perspective — distant nodes fade to grey. Strong overhead lighting creates circular shadows beneath each node. Pure monochrome — clinical, technical, financial infrastructure aesthetic. Some nodes are larger, suggesting hubs or validators. The grid suggests distributed network, blockchain topology, decentralized system. Technical diagram meets fine art photography." \
  "16:9"

generate "node-connections" \
  "Monochrome 3D render, high contrast. Close-up view of three chrome spheres connected by transparent glass tubes. Spheres are highly reflective, showing environment as curved distortions. Glass tubes contain visible internal structure — thin chrome wire running through center like fiber optic. Strong side lighting creates dramatic light/shadow contrast. Background fades from white to light grey. Zero color — pure greyscale. The intimate view suggests peer-to-peer connection, data transfer, value exchange. Macro photography aesthetic with shallow depth of field effect on distant elements." \
  "4:3"

generate "data-stream" \
  "Black and white 3D visualization. A single transparent glass tube running diagonally through frame, containing a stream of small chrome spheres in motion. Motion blur on spheres suggests flow and velocity. The glass tube shows realistic refraction distorting the spheres inside. Background is pure white gradient. Strong contrast between bright tube highlights and dark shadow areas. Pure monochrome rendering. The composition suggests data flow, transaction stream, continuous value transfer. Technical diagram aesthetic with artistic execution." \
  "16:9"

# Financial and value imagery
generate "ascending-bars" \
  "Monochrome 3D chart visualization, extreme contrast. Five ascending rectangular glass bars rising from chrome base plate — classic growth chart composition. Glass bars have varying opacity, darkest at base, clearest at top. Chrome base shows perfect mirror reflection of the bars. Strong side lighting creates dramatic shadow gradient across the bars and long shadows on white background. Pure black and white — no color. Each bar edge catches light as bright line. The financial chart reimagined as minimalist sculpture. Bloomberg terminal meets Swiss design." \
  "4:3"

generate "value-stack" \
  "Black and white 3D render. Stack of chrome coins/discs viewed from slight angle, creating elliptical shapes. Each disc is mirror chrome, reflecting neighbors and environment. The stack rises from white surface, casting soft shadow. Top disc catches overhead light as bright specular highlight. Graduated tones through the stack from bright top to shadowed bottom. Pure monochrome — clinical, financial, valuable. The composition suggests accumulated wealth, stacked transactions, growing treasury. Numismatic photography aesthetic meets abstract minimalism." \
  "1:1"

generate "vault-door" \
  "Monochrome architectural 3D render. A circular chrome vault door, partially open, set in white wall. The door mechanism shows concentric chrome rings and geometric locking bolts. Through the opening: pure black void suggesting protected interior. Chrome surfaces reflect the white environment with smooth gradients. Strong frontal lighting creates even illumination with subtle shadows defining form. Pure black and white — the contrast between bright chrome door and black void interior creates maximum dynamic range. Security, protection, stored value. Bank vault photography meets minimalist art." \
  "1:1"

# Abstract and artistic
generate "glass-wave" \
  "Black and white 3D abstract. A wave form made of transparent glass, frozen mid-motion against white background. The glass thickness varies, creating dark edges where light refracts through curves. The wave casts complex caustic shadow patterns on white ground. Chrome spray droplets scatter from the wave crest, each a tiny mirror reflecting environment. Strong backlight creates dramatic silhouette effect on wave edges. Pure monochrome with extreme contrast. The form suggests market movement, volatility, dynamic flow. Fluid dynamics meets financial visualization." \
  "16:9"

generate "crystal-growth" \
  "Monochrome 3D render, scientific aesthetic. A cluster of glass crystal formations growing upward from chrome base — geometric, angular, mineral-like. Crystals are transparent with visible internal facets creating complex refraction patterns. Some crystals catch light as bright white, others fall into shadow showing dark facet edges. Chrome base reflects the crystal structure as distorted mirror image. Pure black and white, maximum contrast. The composition suggests organic growth, compound returns, natural accumulation. Mineralogy photography meets abstract finance." \
  "4:3"

generate "infinite-reflection" \
  "Black and white 3D render, op-art aesthetic. Two parallel chrome planes facing each other, creating infinite mirror reflection tunnel effect. A single glass sphere floats between the planes, reflected infinitely into the distance. The recursive reflections create hypnotic pattern of spheres diminishing to vanishing point. Strong contrast between bright chrome surfaces and dark reflection depths. Pure monochrome — dizzying, mathematical, infinite. The composition suggests recursive systems, compound effects, infinite scalability. Escher meets financial infrastructure." \
  "16:9"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ Complete! Output: $OUTPUT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
