#!/bin/bash

# Torque Glass/Chrome Style Assets Generator
# Uses fal.ai FLUX Pro to generate premium glass & chrome visuals on light backgrounds

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
OUTPUT_DIR="public/generated/image/glass-chrome"

mkdir -p "$OUTPUT_DIR"

generate_image() {
  local name="$1"
  local prompt="$2"
  local width="${3:-1024}"
  local height="${4:-768}"

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
    echo "  ✓ Saved: $OUTPUT_DIR/$name.jpg"
  else
    echo "  ✗ ERROR: Failed to generate $name"
    echo "  Response: $response"
  fi
}

# =============================================================================
# BENTO GRID - Growth Stack Section
# =============================================================================

# B1 - Programmable Rewards (Large card)
generate_image "B1-programmable-rewards" \
  "Ultra-realistic 3D render of a futuristic floating code editor interface made entirely of translucent frosted glass with polished chrome bezels and frame. The glass panel displays glowing cyan and electric blue holographic code syntax with JavaScript reward distribution logic visible. Surrounding the main panel are smaller floating glass shards containing cryptocurrency reward tokens with metallic gold and silver finishes. Chrome mechanical arms and hinges support the structure. The entire scene floats against a clean pure white studio background with soft gradient to light gray at edges. Bright diffused studio lighting from above and sides. Realistic glass caustics, light refractions, and chrome reflections throughout. Subtle soft shadows beneath floating objects on white surface. Hyper-detailed surface textures showing fingerprint-free pristine glass and brushed chrome metal. Apple product photography style lighting with soft key light and gentle fill. Octane render quality, 8K resolution, photorealistic materials, bright airy commercial aesthetic, white background product shot." \
  1200 800

# B2 - Leaderboards
generate_image "B2-leaderboard-glass" \
  "Stunning 3D visualization of a competitive gaming leaderboard reimagined as a luxury glass and chrome trophy installation. Three ascending podium platforms crafted from thick translucent crystal glass with beveled edges catching light beautifully. The first place platform is tallest and emits a subtle cyan inner glow. Atop each platform sits an intricate chrome trophy with geometric faceted design reflecting the bright environment. Floating holographic rank numbers 1, 2, 3 rendered in chrome with cyan edge lighting hover above each position. Small glass achievement badges and medal icons orbit slowly around the structure. Clean pure white studio background with seamless white floor creating infinity cove effect. Bright soft lighting from multiple directions eliminates harsh shadows. Multiple light sources create delicate caustic patterns through the glass onto white surface below. Chrome surfaces show bright reflections of the white environment. Microscopic surface details visible on metal showing premium craftsmanship. Professional Apple-style product visualization, Octane render, 8K resolution, extreme photorealism, bright commercial photography aesthetic." \
  800 600

# B3 - AI Insights
generate_image "B3-ai-neural" \
  "Breathtaking 3D render of an artificial intelligence neural network constructed from premium glass and chrome materials. Dozens of interconnected chrome spheres of varying sizes float in precise geometric arrangement, each sphere featuring a polished mirror finish that reflects the bright white environment. The connections between nodes are made of thin translucent glass tubes filled with flowing cyan bioluminescent energy that pulses rhythmically. At the center sits a larger anatomical brain shape made entirely of clear crystal glass with visible internal structures and subtle synaptic glow inside. Data streams visualized as tiny glowing particles flow through the network following the pathways. Clean pure white studio background with soft gradient. Bright even lighting creating beautiful caustics through glass elements onto white surface. Chrome reflections show the pristine white studio environment. Subsurface scattering in glass materials creates ethereal glow effects. Soft contact shadows ground the floating objects. Extreme attention to material physics and light behavior. Cinema 4D and Octane render quality, 8K resolution, hyperrealistic CGI, bright airy tech product photography, Apple keynote presentation style." \
  800 600

# B4 - Developer Infrastructure / API
generate_image "B4-api-infrastructure" \
  "Magnificent 3D visualization of cloud computing infrastructure rendered as an architectural glass and chrome masterpiece. A towering server rack structure built from intersecting translucent glass panels, each panel displaying different holographic code snippets, API endpoint documentation, and real-time data visualizations in cyan and blue text. The framework is constructed from precision-machined chrome beams with hexagonal cross-sections and visible bolts with mirror finishes. Glowing fiber optic cables made of glass tubes carry streaming data represented as traveling light pulses between different sections. Multiple floating glass terminal screens surround the main structure showing JSON responses and TypeScript code. The base features a chrome platform with etched circuit patterns that glow cyan from beneath. Pure white studio background with seamless floor. Bright three-point lighting setup with soft diffused key light. Cool vapor wisps around the base suggesting active cooling. Photorealistic glass refraction and chrome reflection showing white environment, soft shadows on white ground, Redshift render quality, 8K resolution, hyper-detailed textures, premium tech product photography." \
  1200 600

# =============================================================================
# PLAYBOOKS Section
# =============================================================================

# C1 - Raffle/Lottery Flow
generate_image "C1-raffle-crystal" \
  "Exquisite 3D render of a futuristic lottery machine reimagined as a luxury glass and chrome sculpture. The centerpiece is a large perfectly spherical orb made of flawless crystal glass with subtle blue tint, mounted on an elaborate chrome mechanical base with Art Deco influences. Inside the transparent sphere, dozens of glowing lottery tickets and golden tokens float weightlessly, each ticket emitting soft cyan luminescence. The chrome base features intricate clockwork mechanisms with visible gears, pistons, and rotating rings all in polished mirror-finish metal reflecting white surroundings. Swirling energy currents visualized as cyan plasma ribbons spiral inside the orb creating mesmerizing patterns. Small glass tubes extend from the base carrying flowing particle streams. The entire apparatus sits on a chrome pedestal with geometric patterns. Pure white studio background with seamless infinity cove floor. Bright overhead softbox lighting creating gentle shadows. Glass caustics scatter delicate light patterns on white surface. Chrome reflects the bright clean environment. Museum-quality product photography aesthetic on white background, Octane render, 8K resolution, extreme photorealism, luxury commercial photography." \
  800 600

# C2 - Referral Network
generate_image "C2-referral-network" \
  "Spectacular 3D visualization of a social referral network as an elegant glass and chrome molecular structure floating in bright space. The network consists of numerous translucent glass spheres of three different sizes representing different user tiers, each sphere containing swirling internal energy patterns in cyan and white. The spheres are interconnected by sleek chrome tubes and rods forming a complex three-dimensional web structure. Energy pulses travel visibly along the chrome connections as glowing cyan light packets moving from node to node. The central hub is a larger premium glass orb with a subtle cyan core that pulses gently. Secondary connection points feature small chrome junction boxes with blue LED indicator lights. The entire structure appears to float weightlessly. Clean pure white studio background with soft gradient to light gray. Bright diffused lighting from all angles creating soft shadows beneath. Multiple light sources create intricate caustic patterns through overlapping glass elements onto white floor. Chrome surfaces reflect the pristine white environment creating clean highlights. Floating holographic user icons orbit around key nodes. Cinema 4D render quality, bright airy lighting, 8K resolution, photorealistic glass and metal materials, Apple product photography style." \
  800 600

# C3 - Growth Multiplier
generate_image "C3-growth-multiplier" \
  "Impressive 3D render of exponential growth visualization as a stunning glass and chrome sculptural chart. A series of rectangular glass bars rise from a chrome base platform in a dramatic exponential curve from left to right, each bar taller than the last. The glass bars are made of thick crystal with polished edges that catch and refract light beautifully against white background. Each bar contains internal layers showing accumulated value with cyan gradient coloring intensifying toward the top. The tallest bars on the right emit subtle cyan glow from within, representing peak performance. A chrome framework structure supports the bars with sleek minimal design and visible precision engineering. Floating above the chart are glass multiplication symbols with chrome outlines and subtle holographic glow. Rising particle streams and upward-flowing energy trails emphasize the growth direction. The chrome base features etched grid lines and measurement markers. Pure white studio background with seamless floor. Bright side lighting creates soft shadows and highlights glass edges beautifully. Product visualization quality on white background, Octane render, 8K resolution, hyperrealistic materials, professional Apple advertising aesthetic." \
  800 600

# C4 - Reward Distribution
generate_image "C4-reward-flow" \
  "Elegant 3D render of a reward distribution system visualized as a magnificent glass funnel mechanism with chrome engineering. The top features a wide crystal glass collection basin where hundreds of small glowing reward tokens gather, each token a tiny glass coin with gold and cyan coloring. The funnel narrows through several chrome ring gates with mechanical iris mechanisms that control flow. The glass walls of the funnel are thick crystal with faceted geometric patterns that create beautiful light refractions against white background. Inside the funnel, tokens cascade downward following spiral paths indicated by subtle glass guide rails. At each chrome gate level, holographic condition checkmarks appear in cyan showing validation steps. The output at the bottom releases a stream of processed rewards as glowing particles dispersing outward. Chrome support structure with industrial aesthetic holds the entire apparatus. Pure white studio background with clean seamless floor. Bright even lighting from above. Multiple light sources create delicate caustic patterns on white surface. Soft shadows ground the structure. Vertical composition emphasizing height and flow direction. Octane render, 8K resolution, photorealistic glass physics, premium white background product photography." \
  600 800

# =============================================================================
# SOLUTION CARDS
# =============================================================================

# D1 - Stablecoin Velocity
generate_image "D1-stablecoin-velocity" \
  "Dynamic 3D render capturing the speed and movement of digital currency as glass coins in high-velocity motion against white background. Multiple translucent crystal coins with embedded dollar and stablecoin symbols streak across the frame following curved trajectories. Each coin is made of premium glass with chrome metallic edge banding that catches light. Long exposure motion blur trails extend behind each coin rendered as transparent glass ribbons with cyan energy cores. The fastest coins leave chrome particle spray in their wake. Speed lines and velocity indicators float in the space rendered as thin holographic cyan graphics. The coins travel through invisible curved pathways suggested by faint glass tube guides. Some coins stack momentarily at velocity boost points marked by chrome ring accelerators with blue energy fields. Pure white studio background with subtle motion blur suggesting rapid movement. Bright lighting emphasizes the sense of speed with clean highlights and subtle lens flares. Frozen motion photography aesthetic capturing split-second action. Energy wake effects, particle systems, glass caustics visible against white. Cinema 4D with Redshift render, 8K resolution, hyperrealistic motion capture style, bright commercial photography." \
  800 600

# D2 - Lending/Yield
generate_image "D2-lending-yield" \
  "Luxurious 3D render of a DeFi lending vault reimagined as an opulent glass and chrome safe installation on white background. The main vault is a large cubic structure with thick crystal glass walls allowing full visibility of contents inside. The vault door is heavy chrome with an intricate circular locking mechanism featuring multiple rotating rings and geometric patterns, slightly ajar to reveal the interior. Inside the vault, neatly stacked glass containers hold glowing digital assets represented as luminescent cubes and spheres in gold, cyan, and white colors. Rising from the assets are continuous streams of yield particles floating upward through the open top, representing passive income generation. The chrome door frame features decorative Art Deco patterns with cyan LED accent lighting in the grooves. A digital display panel on the front shows APY percentage in holographic cyan numbers. The vault sits on a raised chrome platform. Pure white studio background with seamless infinity floor. Bright soft lighting from multiple angles. Clean reflections in chrome showing white environment. Gentle shadows beneath on white surface. Premium banking aesthetic meets futuristic technology. Octane render, 8K resolution, photorealistic materials, luxury white background product photography." \
  800 600

# D3 - Trader Progression
generate_image "D3-trader-levels" \
  "Epic 3D visualization of a gamified trader progression system as a monumental glass and chrome tier structure against white background. Five ascending platform levels rise dramatically from bottom to top, each level a thick slab of translucent crystal glass with chrome edge trim and support columns. The platforms increase in visual prestige with each tier - bottom levels are clear glass while top tiers feature increasingly intense cyan inner glow. Each platform displays a chrome rank emblem in the center: bronze, silver, gold, platinum, and diamond geometric badges with appropriate metallic finishes reflecting white surroundings. Holographic achievement icons and reward symbols orbit around each tier level. Glass staircases with chrome railings connect each level with glowing cyan step lighting. Particle effects rise between levels suggesting the energy required to advance. The top platform features a magnificent chrome throne or champion seat with glass armrests. Pure white studio background with seamless floor. Bright upward lighting emphasizes the aspirational height of progression. Soft shadows on white ground floor. Victory particles and celebration effects around the highest tier. Clean bright airy atmosphere. Unreal Engine quality render, 8K resolution, cinematic game art style on white background, bright commercial lighting." \
  800 600

# =============================================================================
# HERO / DECORATIVE ELEMENTS
# =============================================================================

# Hero background element
generate_image "hero-glass-shapes" \
  "Serene and sophisticated 3D composition of abstract geometric shapes crafted from premium glass and chrome materials floating weightlessly against pure white background. The arrangement includes a large translucent glass torus with smooth rounded profile and subtle blue tint, a perfect chrome sphere with mirror finish reflecting the white studio environment, a crystal glass cube with chamfered edges refracting light into rainbow spectrums, and several smaller glass and chrome accent shapes scattered harmoniously. Each object floats at different depths creating layered dimensional composition. The glass objects feature realistic subsurface scattering creating soft internal glow in cyan tones. Chrome elements provide contrast with their sharp reflections of the bright white surroundings. Objects cast soft diffused shadows on an invisible white ground plane below. Background is pure clean white with subtle soft gradient. Minimalist luxury tech aesthetic suitable for premium brand hero imagery. Soft diffused lighting from multiple angles eliminates harsh shadows while maintaining form definition. Octane render with physical camera settings, 8K resolution, editorial photography quality on white background, Apple-inspired product aesthetic, bright airy commercial style." \
  1920 1080

# Blockchain concept
generate_image "blockchain-glass-chain" \
  "Stunning 3D visualization of blockchain technology as an elegant chain of connected glass and chrome blocks against pure white background. Each block is a perfect cube made of thick translucent crystal glass with visible internal data patterns rendered as glowing cyan circuit traces and binary code streams. The blocks connect via heavy chrome chain links with polished mirror finish reflecting white environment, each link featuring small cyan LED indicators showing active status. The chain arrangement follows a gentle S-curve creating dynamic visual flow through the frame. Newer blocks at the front appear crisp while older blocks fade softly into bright distance. Inside each glass block, holographic transaction records float as tiny text snippets and wallet address fragments. Small glass shards and chrome particles float around the chain suggesting recent block creation activity. The entire chain floats in bright white space with soft shadows beneath on white surface. Delicate rim lighting defines the edges of each block. Caustic light patterns from glass refraction dance on white ground below. Reflections in chrome links show the clean white studio. Enterprise blockchain marketing aesthetic meets luxury product visualization. Cinema 4D with Octane, 8K resolution, hyperrealistic CGI on white background, bright commercial photography style." \
  1200 800

# Reward tokens
generate_image "reward-tokens-glass" \
  "Breathtaking 3D still life arrangement of cryptocurrency reward tokens reimagined as precious glass and chrome collectibles on white background. The composition features an artful scatter of valuable tokens on an invisible white reflective surface - large crystal glass coins with faceted diamond-cut edges, smaller chrome medallions with embossed geometric patterns reflecting white surroundings, translucent glass gems in various cuts (round, emerald, pear), and rare chrome-framed glass tokens with holographic center inserts. Each glass piece contains subtle internal structures - some with trapped cyan energy wisps, others with floating metallic flakes, some with etched reward symbols. The tokens overlap and stack naturally creating visual depth and material interaction. Light passes through glass pieces casting colorful caustic patterns on white surface while chrome elements provide sharp accent reflections of bright environment. Floating above the pile are several tokens caught mid-fall with subtle motion blur. Small sparkle particles and lens flares add magical quality. Pure white studio background with seamless floor. Dramatic jewelry photography lighting with soft boxes and precise rim lights. Shallow depth of field with tack-sharp focus on hero tokens. Luxury crypto collectibles aesthetic, numismatic quality. Octane render, 8K resolution, photorealistic precious materials on white, Vogue jewelry editorial style, bright commercial aesthetic." \
  1000 800

# Infrastructure abstract
generate_image "infra-glass-abstract" \
  "Abstract architectural 3D visualization of backend infrastructure as an intricate network of glass pipes and chrome nodes against pure white background. The structure resembles a complex plumbing or nervous system with translucent glass tubes of varying diameters running in organized pathways - some horizontal, some vertical, with elegant curved bends. Inside the glass tubes, visible data flows as streams of glowing cyan particles moving at different speeds based on pipe diameter. Chrome junction nodes connect multiple pipes at intersection points, each node a geometric polyhedron shape with visible internal routing chambers reflecting white environment. Some junctions feature small glass observation windows showing the data mixing and redirecting inside. Larger chrome server node boxes are positioned at key points with multiple input/output glass tube connections and status indicator lights. The entire system pulses with life as energy flows continuously through the network. Glass tube walls show subtle condensation suggesting active cooling. Light vapor wisps escape from chrome pressure release valves. Pure white studio background with seamless floor. Soft shadows beneath structure on white surface. Bright even lighting from multiple angles. Isometric-influenced perspective showing system complexity. Industrial design meets futuristic tech aesthetic. Data center reimagined as art installation on white background. Redshift render, 8K resolution, hyperrealistic materials, technical illustration meets Apple product photography, bright commercial style." \
  1200 800

echo ""
echo "============================================="
echo "Generation complete!"
echo "Check $OUTPUT_DIR for generated images."
echo "============================================="
