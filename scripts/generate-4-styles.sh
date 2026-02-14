#!/bin/bash

# Torque Multi-Style Asset Generator
# 4 Distinct Art-Directed Aesthetics with FLUX Pro Ultra

cd "$(dirname "$0")/.."
FAL_KEY=$(grep FAL_KEY .env.local | cut -d'=' -f2)
BASE_DIR="public/generated/image"

generate() {
  local folder="$1"
  local name="$2"
  local prompt="$3"
  local aspect="${4:-4:3}"

  local output_dir="$BASE_DIR/$folder"
  mkdir -p "$output_dir"

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
    curl -s -o "$output_dir/$name.jpg" "$url"
    echo "    ✓ saved"
  else
    echo "    ✗ failed"
  fi
}

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  TORQUE — Multi-Style Art Direction Generator                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# =============================================================================
# STYLE 1: FRUTIGER AERO
# Nostalgic 2000s tech optimism — glossy, bubbly, aurora gradients,
# Windows Vista/early Apple vibes, skeuomorphic shine
# =============================================================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🫧 STYLE 1: FRUTIGER AERO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

generate "frutiger-aero" "hero" \
  "Editorial photograph shot on Phase One IQ4 150MP, Schneider 80mm lens. Arrangement of glossy translucent bubbles and rounded pill-shaped forms floating against soft white-to-sky-blue gradient background. Objects have that iconic 2006 Windows Vista aurora aesthetic — luminous greens, electric cyans, soft magentas bleeding into each other like northern lights trapped in gel capsules. Surfaces are impossibly glossy with sharp specular highlights from studio softboxes. Some bubbles contain smaller bubbles. Subtle lens flare from bright spots. The optimistic, utopian tech aesthetic of early iPod commercials and MSN Messenger. Depth of field creates dreamy bokeh on distant elements. Clean, hopeful, nostalgic yet fresh. Shot by a photographer who worked on Apple campaigns in 2007." \
  "16:9"

generate "frutiger-aero" "rewards" \
  "Product photography, Hasselblad H6D-400c, HC 100mm f/2.2. A floating cluster of glossy reward tokens rendered as oversized vitamin capsules and gel pills in luminous aurora gradients — cyan cores fading to magenta edges, green centers bleeding to gold. Each capsule is plump, rounded, satisfyingly glossy with that 2000s web 2.0 shine. They scatter playfully against a soft gradient background shifting from white to pale sky blue. Some capsules are transparent showing swirling internal colors. Tiny water droplets on surfaces add freshness. The aesthetic of Windows Media Player visualizations made physical. Soft shadows, bright highlights, relentlessly optimistic color palette. Shot for a vitamin brand in 2006 but timeless." \
  "4:3"

generate "frutiger-aero" "leaderboard" \
  "Studio photography, Canon 5D Mark II era aesthetic with modern resolution. Three ascending podium shapes — but they're soft, rounded, like inflated cushions or stress balls. Made of glossy material in graduated aurora colors: bronze position in warm sunset orange-pink, silver in cool cyan-to-white gradient, gold in luminous yellow-green aurora. Each has that satisfying gel-like surface quality. Floating achievement badges nearby rendered as glossy pins with rainbow sheens. Background: the classic Frutiger Aero sky gradient — white at bottom fading to optimistic blue with subtle cloud wisps. Lens flare kisses the gold podium. The trophy ceremony reimagined by the iTunes Store design team circa 2008." \
  "4:3"

generate "frutiger-aero" "network" \
  "Conceptual product shot, Phase One XT, 55mm lens. A molecular network structure where each node is a plump glossy sphere in shifting aurora colors — some cyan-dominant, others magenta-green, all with that wet, fresh, just-unwrapped quality. Connections between nodes are transparent tubes containing flowing gradient liquid. The overall shape suggests organic growth, like neurons or coral. Background: soft white-to-sky gradient with subtle light rays. Some nodes pulse brighter, suggesting activity. Tiny bubble particles float nearby. The visual language of early 2000s tech startups promising to connect the world — naive optimism rendered beautiful. High-key lighting, zero harsh shadows." \
  "4:3"

generate "frutiger-aero" "growth" \
  "Advertising photography for a wellness brand, Leica S3, 70mm lens. An ascending bar chart made of stacked translucent gel rectangles — each layer a different aurora gradient slice. Bottom layers: soft blue-green. Middle: luminous cyan. Top: brilliant magenta-gold sunrise colors. The gel material catches light beautifully, creating internal caustics. Floating above the peak: glossy pill-shaped capsules suggesting continued growth. Background: optimistic gradient from white to pale blue with lens flare. The visual vocabulary of a 2007 health app icon blown up to hero image scale. Satisfying, tactile, impossibly clean." \
  "4:3"

generate "frutiger-aero" "blockchain" \
  "Editorial still life, Fujifilm GFX100, 110mm f/2. A chain of connected glossy cubes in aurora gradients — each cube slightly transparent showing internal data patterns as swirling color wisps. Cubes are soft-edged, rounded corners, friendly geometry. The connecting links are translucent gel tubes. Color progression along the chain from cool cyans through magentas to warm golds. Some cubes glow brighter from within. Scattered around: tiny glossy spheres like dew drops. Background: the classic Frutiger sky gradient. This is blockchain explained by the design team that created Windows Vista packaging — approachable, optimistic, trustworthy through aesthetic friendliness." \
  "3:2"


# =============================================================================
# STYLE 2: Y3K HYPERFUTURISM
# Alien, iridescent, chrome liquid, neon accents on black,
# sleek beyond comprehension, cyber-luxury
# =============================================================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "👽 STYLE 2: Y3K HYPERFUTURISM"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

generate "y3k-hyperfuturism" "hero" \
  "Cinematic CGI render, Panavision Millennium DXL2 camera simulation, anamorphic lens characteristics. A surreal landscape of liquid chrome pools and impossibly thin iridescent membrane surfaces stretching across a void. The chrome is alive — rippling slowly, reflecting distorted neon strips of magenta, electric blue, and acid green from unseen sources. Floating above: alien geometric structures with impossible topology, surfaces shifting between matte black and rainbow oil-slick iridescence. The atmosphere is thick with holographic dust particles. Color palette: deep blacks, chrome silvers, neon accent slashes. Background: infinite gradient from charcoal to pure void. This is a fashion campaign for a brand that doesn't exist yet, shot in 3025. Blade Runner meets haute couture." \
  "16:9"

generate "y3k-hyperfuturism" "rewards" \
  "High-fashion product photography from the year 3000. Reward tokens reimagined as alien artifacts — liquid chrome teardrops frozen mid-morph, surfaces crawling with iridescent oil-slick patterns that shift magenta-cyan-gold. Some tokens are hollow shells with neon plasma cores. Others are solid chrome with laser-etched alien glyphs that glow electric blue. They float in formation against absolute black void. A single shaft of neon magenta light cuts through frame diagonally, illuminating chrome surfaces with dramatic reflection. Anamorphic lens flare streaks horizontally. The treasure of a civilization we can't comprehend. Shot for Balenciaga's intergalactic expansion." \
  "4:3"

generate "y3k-hyperfuturism" "leaderboard" \
  "Cinematic frame, ARRI Alexa 65 simulation, Panavision Ultra Vista anamorphic. Three monolithic structures rise from chrome liquid floor — winner's podium as alien obelisks. Surfaces are polished black stone veined with glowing cyan circuitry. The first-place obelisk pulses with internal neon magenta light, casting colored shadows. Floating holographic rank symbols in an alien alphabet hover above each. The chrome floor creates perfect mirror reflections stretching into darkness. Atmospheric fog catches neon edge lights. Background: void black with distant constellation-like data points. This is the victory ceremony at the end of the universe. Directed by Denis Villeneuve." \
  "4:3"

generate "y3k-hyperfuturism" "network" \
  "Abstract CGI visualization, cinema camera simulation. A vast neural network rendered as interconnected black chrome nodes with iridescent surface tension — like mercury drops connected by threads of pure light. Neon data streams travel between nodes as visible pulses of electric blue and magenta. Some nodes are larger, acting as hubs, their surfaces alive with crawling holographic patterns. The structure floats in infinite void. Volumetric light rays in cool blue penetrate from above. Lens artifacts: anamorphic streak flares, subtle chromatic aberration. The connectome of an AI god visualized. Part scientific diagram, part religious icon." \
  "4:3"

generate "y3k-hyperfuturism" "growth" \
  "Architectural CGI render, impossibly perfect. An exponential growth curve rendered as ascending chrome liquid frozen mid-splash — each wave higher than the last, surfaces mirror-perfect reflecting neon gridlines. The liquid defies physics, suspended in time at the moment of explosive growth. Neon magenta and cyan accent lights create dramatic edge definition. Base plane: black mirror floor with visible grid extending to horizon. Data particles stream upward like reverse rain. Background: gradient from charcoal to void with subtle digital noise texture. Growth as a physical force, captured at the moment of breakthrough. Shot for an AI hedge fund's annual report." \
  "4:3"

generate "y3k-hyperfuturism" "blockchain" \
  "Cinematic still frame, Cooke S8/i lens characteristics. A chain of connected chrome cubes stretching into perspective — but each cube is slightly wrong, geometry non-euclidean, surfaces showing impossible reflections. Cubes are connected by beams of pure neon light rather than physical links. Each cube contains a different alien artifact visible through chrome transparency: plasma orbs, crystalline structures, void portals. The chain disappears into distant fog glowing with diffused neon. Atmospheric particles catch light. Floor: infinite black mirror. The immutable ledger of a post-human civilization. Art direction: HR Giger meets luxury tech advertising." \
  "3:2"


# =============================================================================
# STYLE 3: NEO-BRUTALIST TECH
# Raw concrete, bold geometry, industrial materials,
# exposed structure, anti-sleek, powerful weight
# =============================================================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🏗️ STYLE 3: NEO-BRUTALIST TECH"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

generate "neo-brutalist" "hero" \
  "Architectural photography, Phase One XT, Rodenstock 32mm lens, perspective corrected. Massive concrete geometric forms — raw, board-formed texture visible — stacked and intersecting against overcast white sky. Forms are monolithic: perfect cubes, sharp-edged slabs, cylindrical towers. Weathered steel plates accent corners, rust patina adding warmth to cool grey concrete. One element features a recessed panel of warm amber backlit glass, suggesting technology within the brutalist shell. Scale is ambiguous — could be buildings or tabletop models. Harsh directional light creates dramatic shadows in surface textures. Color palette: concrete grey, oxidized steel rust, warm amber accent. Power through mass and material honesty. Shot for Tadao Ando's tech startup headquarters." \
  "16:9"

generate "neo-brutalist" "rewards" \
  "Product photography with architectural gravitas, Hasselblad X2D, 90mm lens. Reward tokens reimagined as solid cast bronze medallions and raw concrete discs stacked on weathered steel plate. The bronze has satisfying weight and patina — aged but valuable. Concrete tokens show aggregate texture and deliberate imperfections. One token features an inlaid brass emblem that glows warmly in directional light. Background: raw concrete wall with board-form patterns. Lighting: harsh single source creating dramatic shadows emphasizing form and texture. These are rewards with permanence and material truth — no gloss, no deception. Value expressed through substance. Shot for a Swiss wealth management firm." \
  "4:3"

generate "neo-brutalist" "leaderboard" \
  "Architectural still life, large format camera aesthetic. Three ascending concrete blocks — winner's podium as brutalist monuments. Raw board-formed texture shows wood grain imprint. Steel reinforcement rods protrude intentionally from corners as design elements. Ranking numbers cast in bronze and inlaid into concrete faces: 1, 2, 3. The first-place block is slightly larger, more imposing. A single warm spotlight from above creates a pool of light on the scene, everything else falls into shadow. Background: raw concrete wall. This is achievement measured in tonnes and permanence. Victory as architectural statement. Shot by Hélène Binet." \
  "4:3"

generate "neo-brutalist" "network" \
  "Abstract architectural photograph. A network of intersecting concrete beams in three-dimensional space — nodes are massive concrete junction blocks where beams meet. Visible steel cable tension wires add structural honesty. One junction features a glowing amber glass panel suggesting data activity. The structure is heavy, permanent, trustworthy through material presence. Light filters through gaps creating geometric shadow patterns on background wall. Dust particles visible in light shafts. The weight of connection, the permanence of network. Infrastructure as brutalist sculpture. Shot in an unfinished Tadao Ando building." \
  "4:3"

generate "neo-brutalist" "growth" \
  "Sculptural photography, dramatic lighting. Growth chart as ascending concrete slabs — raw material, visible aggregate, honest construction. Each slab taller than the last, proportions following mathematical progression. Steel reinforcement visible at cut edges. The tallest slab catches direct warm light from side, glowing almost golden against shadowed background. Rusty steel base plate grounds the composition. Background: deep shadow with barely visible concrete wall texture. Growth expressed through mass accumulation. Power through material presence. Photographed like a Richard Serra installation." \
  "4:3"

generate "neo-brutalist" "blockchain" \
  "Architectural detail photography. A chain of connected concrete blocks — but the connection is honest: visible steel bolts, welded plates, tension cables. Each block shows unique board-form patterns from its casting mold. Blocks progress into shadow with decreasing visibility. One block features a recessed steel panel with warm amber backlight suggesting contained data. The physical truth of distributed infrastructure. Immutability expressed through material permanence. Shot in harsh construction site lighting with visible dust in air. Documentary aesthetic meets conceptual art." \
  "3:2"


# =============================================================================
# STYLE 4: ETHEREAL ORGANIC
# Soft gradients, flowing forms, zen minimalism,
# muted earth tones, biomorphic shapes, meditative
# =============================================================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌿 STYLE 4: ETHEREAL ORGANIC"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

generate "ethereal-organic" "hero" \
  "Fine art photography, Hasselblad 907X, XCD 65mm lens. Soft biomorphic forms floating in endless muted gradient — shapes suggest clouds, pebbles, distant hills but abstracted to pure form. Colors shift through warm earth tones: terracotta fading to sand, sand dissolving into fog grey, hints of sage green. Surfaces have subtle texture like handmade paper or natural stone. Forms cast soft diffused shadows onto each other. No harsh edges — everything transitions gradually. Depth created through atmospheric perspective, distant forms fading to silhouette. The visual equivalent of a meditation retreat. Shot by Hiroshi Sugimoto if he designed tech branding. Peaceful, contemplative, grounding." \
  "16:9"

generate "ethereal-organic" "rewards" \
  "Still life photography, natural light through rice paper diffusion. Reward tokens as smooth river stones and hand-formed ceramic pieces in muted earth palette — terracotta, warm grey, sage, sand. Surfaces show subtle organic texture: mineral veins in stone, gentle tool marks in ceramic. Some pieces have faint gold-leaf accents, worn and subtle. Arranged with deliberate asymmetry on pale linen textile. Soft shadows, no harsh contrast. One ceramic piece has a warm internal glow visible through thin walls. Value expressed through material authenticity and craft. Shot for a mindfulness app by a still life photographer who trained in Kyoto." \
  "4:3"

generate "ethereal-organic" "leaderboard" \
  "Zen garden photography aesthetic, morning light. Three ascending forms — but rendered as stacked smooth stones in graduating sizes, balanced impossibly. Each stone a different earth tone: warm terracotta, cool grey, pale sand. Surfaces show natural mineral texture and veining. Small dried botanical elements scattered nearby: seed pods, twigs, pressed leaves in muted tones. Background: soft gradient of morning fog colors, no visible horizon. Ranking suggested through height and scale rather than explicit numbers. Achievement as a state of balance. Recognition as natural accumulation. Shot at golden hour with mist rising." \
  "4:3"

generate "ethereal-organic" "network" \
  "Abstract botanical photography. A network visualization as intertwining roots, branches, mycelium — organic connection rendered visible. Elements are actual natural materials: dried vine tendrils, root fragments, seed filaments. Color palette: muted sage, warm bark brown, pale mushroom grey. Some connection points feature small crystalline formations catching soft light. The network grows organically, no rigid geometry. Background: soft paper texture gradient in warm off-white. Connection as natural phenomenon. Network as living system. Shot for a documentary about forest communication systems." \
  "4:3"

generate "ethereal-organic" "growth" \
  "Nature study photography, macro lens, soft focus. Growth expressed through unfurling fern frond, sprouting seed, opening flower bud — captured at different stages in a sequence. Each form in progressively warmer earth tones suggesting development. Soft bokeh background in muted sage green. Dew droplets catch highlights. The subjects float without visible support against gradient. Growth as natural unfolding rather than aggressive accumulation. Time made visible through form. Shot for a meditation center's seasonal calendar." \
  "4:3"

generate "ethereal-organic" "blockchain" \
  "Conceptual still life with natural materials. Chain expressed through connected organic forms — smooth stones with natural holes, worn shells, seed pods strung on aged hemp thread. Each element unique but connected. Color progression through warm earth tones: dark soil brown to pale sand to weathered bone white. The thread shows wear and age but holds. Background: soft handmade paper texture with subtle gradient. Permanence through natural processes. Trust built over deep time. The oldest verification system: nature itself. Shot like a museum archaeology catalog." \
  "3:2"


echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✓ All 4 styles generated successfully!                        ║"
echo "║                                                                ║"
echo "║  📁 $BASE_DIR/frutiger-aero/                              ║"
echo "║  📁 $BASE_DIR/y3k-hyperfuturism/                          ║"
echo "║  📁 $BASE_DIR/neo-brutalist/                              ║"
echo "║  📁 $BASE_DIR/ethereal-organic/                           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
