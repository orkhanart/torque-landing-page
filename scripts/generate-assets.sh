#!/bin/bash

# Torque Visual Assets Generator
# Uses fal.ai FLUX Pro to generate images from prompts

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
OUTPUT_DIR="public/generated/image"

mkdir -p "$OUTPUT_DIR"

generate_image() {
  local name="$1"
  local prompt="$2"
  local width="${3:-1024}"
  local height="${4:-1024}"

  echo "Generating $name..."

  response=$(curl -s -X POST "https://fal.run/fal-ai/flux-pro/v1.1" \
    -H "Authorization: Key $FAL_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"$prompt\",
      \"image_size\": {\"width\": $width, \"height\": $height},
      \"num_inference_steps\": 28,
      \"guidance_scale\": 3.5,
      \"num_images\": 1,
      \"enable_safety_checker\": true
    }")

  url=$(echo "$response" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)

  if [ -n "$url" ]; then
    curl -s -o "$OUTPUT_DIR/$name.jpg" "$url"
    echo "  Saved: $OUTPUT_DIR/$name.jpg"
  else
    echo "  ERROR: Failed to generate $name"
    echo "  Response: $response"
  fi
}

# A. HERO SECTION
generate_image "A1-hero-grid" \
  "Minimal perspective grid pattern on pure white background. Light gray thin lines converging toward horizon. Small glowing cyan dots at intersection points, subtle lens flare. Clean, airy, modern fintech aesthetic. No objects, no text. Professional SaaS website hero background. 4K resolution, sharp details." \
  1920 1080

generate_image "A2-hero-shapes" \
  "Three floating 3D geometric shapes on pure white background. One rounded white cube, one light gray sphere, one white torus. Matte ceramic material with soft studio lighting. Subtle shadows beneath each shape. One shape has faint cyan edge glow. Clean minimal tech aesthetic. Modern fintech branding. 4K, photorealistic render." \
  1920 1080

# B. BENTO GRID CARDS
generate_image "B1-code-editor" \
  "Modern code editor interface screenshot. Light theme IDE with white background. JavaScript code showing reward distribution logic. Syntax highlighting: functions in cyan, strings in coral, keywords in navy. Clean monospace typography. Floating panel with rounded corners and soft drop shadow. Professional developer tool aesthetic. 4K, crisp UI details." \
  800 600

generate_image "B2-leaderboard" \
  "Leaderboard interface mockup on light gray background. White card with soft shadow showing ranked list. Five rows with circular avatar placeholders, usernames, and score numbers. Top 3 positions have cyan badge indicators. Clean data table design. Modern fintech dashboard aesthetic. Rounded corners, subtle borders. 4K resolution, sharp typography." \
  600 400

generate_image "B3-neural-network" \
  "Abstract neural network visualization on white background. Interconnected nodes in white and light gray circles. Thin glowing cyan lines connecting nodes in layered pattern. Some connection points pulse with brighter cyan glow. Clean, minimal, technical diagram style. Modern AI and machine learning aesthetic. No text. 4K resolution." \
  600 400

generate_image "B4-api-docs" \
  "Split-view developer documentation visual. Two floating white cards on light gray background. Left card shows JSON API response with syntax highlighting. Right card shows TypeScript SDK code snippet. Clean monospace font, cyan accents for key values. Soft shadows, rounded corners. Professional dev tools aesthetic. 4K, crisp text rendering." \
  1200 600

# C. PLAYBOOK ILLUSTRATIONS
generate_image "C1-raffle-flow" \
  "Horizontal flow diagram with four connected nodes on white background. Left to right: trading icon, ticket icon, checkmark icon, trophy icon. White rounded rectangle cards connected by cyan arrows. Clean line art icons inside each node. Minimal fintech infographic style. Light gray subtle background gradient. No text labels. 4K resolution." \
  800 400

generate_image "C2-referral-network" \
  "Social network referral diagram on white background. Large central circle connected to six smaller circles arranged around it. Cyan connection lines between nodes. Small arrow indicators showing flow direction. Abstract, no faces. Clean vector illustration style. Modern fintech referral program visualization. Soft shadows on nodes. 4K resolution." \
  600 500

generate_image "C3-growth-chart" \
  "Line chart visualization in white card with soft shadow. Single upward trending line from bottom left to top right showing exponential growth. Cyan gradient fill under the curve. Minimal gray axis lines. Small 100x badge in top right corner. Clean fintech analytics aesthetic. Light gray background. 4K resolution, crisp lines." \
  600 400

generate_image "C4-reward-flow" \
  "Vertical flow diagram showing reward distribution. Three connected stages: trigger event at top, condition check in middle, reward output at bottom. White cards with cyan connecting arrows. Simple line icons in each card. Clean technical documentation style. White background. Modern SaaS aesthetic. 4K resolution." \
  400 600

# D. SOLUTION CARDS
generate_image "D1-stablecoin-velocity" \
  "Abstract stablecoin velocity visualization. Multiple circular coin shapes flowing through curved transparent pathways. Motion blur suggesting speed and flow. Cyan and white color palette. Clean minimal vector style. Light gray background. Fintech money movement concept. No text, no logos. 4K resolution." \
  500 400

generate_image "D2-lending-yield" \
  "Abstract yield curve illustration. Smooth upward curving layers stacked vertically suggesting compound growth. Gradient from light gray at bottom to cyan at top. Clean minimal financial diagram aesthetic. White background with subtle depth. Modern DeFi lending visualization. No numbers, no text. 4K resolution." \
  500 400

generate_image "D3-trader-progression" \
  "Abstract progression visualization. Ascending platforms or steps from bottom to top. Small geometric shapes circles and squares on each level representing traders advancing. Higher tiers glow with cyan accent. Clean minimal gamification aesthetic. White and light gray color scheme. Modern fintech progression system. 4K resolution." \
  500 400

# F. 3D ELEMENTS
generate_image "F1-floating-shapes" \
  "3D render of abstract floating shapes on pure white background. White rounded cube, light gray sphere, white torus ring. Matte ceramic material with soft studio lighting. One shape has subtle cyan color gradient. Soft contact shadows beneath each object. Clean minimal modern tech branding. Balanced asymmetric composition. 4K photorealistic render." \
  1200 800

generate_image "F2-glass-blob" \
  "Abstract 3D liquid glass blob shape floating on white background. Transparent material with subtle refraction and caustics. Hints of cyan light passing through. Organic flowing form. Soft shadow beneath. Clean minimal premium tech aesthetic. Modern fintech branding element. 4K photorealistic render." \
  800 800

generate_image "F3-isometric-platform" \
  "3D isometric platform render on white background. White multi-level surfaces with subtle depth. Small abstract UI elements on top suggesting dashboard widgets. Cyan accent lighting from beneath platform edge. Clean architectural visualization style. Modern SaaS platform concept. Soft shadows. 4K render." \
  1200 800

generate_image "F4-icon-rewards" \
  "3D gift box icon on white background. White matte ceramic material. Cyan ribbon and bow on top. Soft studio lighting from above left. Subtle shadow beneath. Clean minimal app icon style. Modern fintech rewards concept. 4K photorealistic render, centered composition." \
  400 400

generate_image "F5-icon-network" \
  "3D network icon on white background. Three white ceramic spheres arranged in triangle formation. Glowing cyan connection rods linking them. Soft studio lighting. Subtle shadow beneath. Clean minimal tech icon style. Modern connectivity concept. 4K photorealistic render, centered." \
  400 400

generate_image "F6-icon-analytics" \
  "3D bar chart icon on white background. Three white ceramic rectangular bars of increasing height. Tallest bar has cyan color. Soft studio lighting from above. Subtle shadow beneath. Clean minimal app icon style. Modern analytics concept. 4K photorealistic render, centered." \
  400 400

# H. UI SCREENSHOTS
generate_image "H1-campaign-builder" \
  "SaaS campaign builder dashboard mockup. White interface with left sidebar navigation. Main content area shows form fields, dropdowns, and preview panel. Cyan primary action buttons. Clean modern fintech design. Light gray background sections. Realistic software screenshot style. 4K resolution, crisp typography." \
  1440 900

generate_image "H2-analytics-dashboard" \
  "Analytics dashboard interface mockup. White background with multiple widget cards. Line chart, bar chart, pie chart, and metric number cards arranged in grid. Cyan data visualization colors. Clean modern SaaS design. Realistic dashboard screenshot. Light shadows on cards. 4K resolution, sharp details." \
  1440 900

generate_image "H3-rewards-config" \
  "Settings panel UI mockup for rewards configuration. White card with form inputs, toggle switches, dropdown selectors. Section headers in navy. Cyan active states and primary buttons. Clean SaaS interface design. Floating on light gray background. Realistic software aesthetic. 4K, crisp UI elements." \
  800 600

echo ""
echo "Generation complete! Check $OUTPUT_DIR for generated images."
