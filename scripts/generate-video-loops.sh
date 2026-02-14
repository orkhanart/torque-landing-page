#!/bin/bash

# Convert light-mono images to seamless looping videos using fal.ai Kling

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
INPUT_DIR="public/generated/image/light-mono"
OUTPUT_DIR="public/generated/video/light-mono"

mkdir -p "$OUTPUT_DIR"

generate_video() {
  local name="$1"
  local prompt="$2"
  local input_file="$INPUT_DIR/$name.jpg"

  if [ ! -f "$input_file" ]; then
    echo "  ✗ $name.jpg not found"
    return
  fi

  echo "  → $name"
  echo "    encoding image..."

  # Convert image to base64 data URI
  base64_data=$(base64 -i "$input_file" | tr -d '\n')
  data_uri="data:image/jpeg;base64,$base64_data"

  echo "    generating video (this takes ~60s)..."

  response=$(curl -s -X POST "https://fal.run/fal-ai/kling-video/v1.5/pro/image-to-video" \
    -H "Authorization: Key $FAL_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"$prompt\",
      \"image_url\": \"$data_uri\",
      \"duration\": \"5\",
      \"aspect_ratio\": \"1:1\"
    }")

  # Extract video URL using python for reliable JSON parsing
  video_url=$(echo "$response" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('video', {}).get('url', ''))
except:
    print('')
" 2>/dev/null)

  if [ -n "$video_url" ]; then
    echo "    downloading..."
    curl -s -o "$OUTPUT_DIR/$name.mp4" "$video_url"
    echo "    ✓ saved: $name.mp4"
  else
    echo "    ✗ failed"
    echo "    Response: $(echo "$response" | head -c 200)"
  fi
  echo ""
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  VIDEO LOOPS — Light Monochrome Animations"
echo "  Note: Each video takes ~60 seconds to generate"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Floating clusters
generate_video "cluster-cubes-01" \
  "Subtle gentle floating motion, geometric blue forms slowly rotating and drifting in white void, smooth seamless loop, minimal movement, serene meditative atmosphere, abstract 3D art animation"

generate_video "cluster-cubes-02" \
  "Gentle floating animation, blue architectural forms slowly rotating in white space, smooth continuous motion, seamless perfect loop, subtle drift, calm meditative movement"

generate_video "cluster-spheres" \
  "Blue spheres gently bobbing and floating against white background, subtle rotation, smooth seamless loop animation, minimal calm movement, forms slowly orbiting each other"

# Network
generate_video "network-nodes-light" \
  "Network nodes gently pulsing with subtle glow, energy flowing along connection lines as small particles, smooth seamless loop, calm rhythmic animation, blue on white"

generate_video "network-grid-light" \
  "Isometric grid with subtle wave motion rippling through, nodes gently pulsing, smooth continuous animation, seamless perfect loop, minimal elegant movement"

generate_video "network-pulse-light" \
  "Data stream flowing horizontally with gentle motion blur, particles moving smoothly left to right, seamless loop animation, continuous flow effect"

# Growth
generate_video "growth-bars-light" \
  "Bar chart with subtle breathing animation, bars gently pulsing in sequence from left to right, smooth seamless loop, minimal elegant motion"

generate_video "value-stack-light" \
  "Stacked coins gently floating and slowly rotating, subtle hover animation, smooth seamless perfect loop, calm minimal movement"

generate_video "ascending-platforms" \
  "Platforms with gentle floating motion, subtle particle effects rising upward, smooth seamless loop, calm aspirational animation"

# Blockchain
generate_video "blocks-chain-light" \
  "Blockchain cubes with subtle rotation, gentle floating drift, data particles flowing between blocks, smooth seamless loop animation"

generate_video "infrastructure-light" \
  "Infrastructure grid with gentle pulse animation, subtle data flow particles moving through connections, smooth continuous seamless loop"

generate_video "vault-light" \
  "Vault form with subtle breathing pulse expanding and contracting, gentle glow animation, smooth seamless perfect loop, secure calm motion"

# Abstract
generate_video "floating-mass-01" \
  "Abstract geometric form gently rotating and floating, subtle drift motion, smooth seamless loop, meditative calm animation, blue forms on white"

generate_video "floating-mass-02" \
  "Geometric cluster slowly rotating in white space, gentle floating drift, smooth continuous seamless loop, minimal movement"

generate_video "horizon-minimal" \
  "Single blue sphere gently bobbing up and down, subtle shadow movement on ground, extremely minimal motion, smooth seamless perfect loop, zen calm"

generate_video "data-particles" \
  "Blue particles gently drifting and floating against white background, subtle random organic motion, smooth seamless loop animation, calm scattered movement"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ Complete! Output: $OUTPUT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
