// =============================================================================
// Torque Logo — Decomposed Elements for Three.js Animation
// =============================================================================
// ViewBox: 0 0 1594.3 1917.4
// Center: ~(814, 951)
//
// Color Palette:
//   indigo:  #4857A3 / #5560A9
//   coral:   #F2A3A1
//   gray:    #898695
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type ElementType = "line" | "hexagon" | "circle" | "triangle" | "dot";
export type ElementCategory = "structure" | "node" | "gradient";

export interface LogoElement {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Element geometry type */
  type: ElementType;
  /** Grouping category */
  category: ElementCategory;
  /** SVG path data (d attribute) */
  d: string;
  /** Stroke color (null = no stroke) */
  stroke: string | null;
  /** Fill color (null = no fill / "gradient") */
  fill: string | null;
  /** Stroke width in SVG units */
  strokeWidth: number;
  /** Opacity (1 = fully opaque) */
  opacity: number;
  /** Approximate center [x, y] in SVG coordinates */
  center: [number, number];
  /** Description for animation reference */
  description: string;
}

// -----------------------------------------------------------------------------
// ViewBox & Palette
// -----------------------------------------------------------------------------
export const VIEWBOX = { width: 1594.3, height: 1917.4 };
export const CENTER = { x: 814, y: 951 };

export const COLORS = {
  indigo: "#4857A3",
  indigoLight: "#5560A9",
  coral: "#F2A3A1",
  gray: "#898695",
} as const;

// -----------------------------------------------------------------------------
// Gradient Definitions (for reconstruction in canvas/WebGL)
// -----------------------------------------------------------------------------
export const GRADIENTS = {
  coralFade: {
    id: "linear-gradient",
    type: "linear" as const,
    // In userSpaceOnUse after gradient transform
    x1: 535.2, y1: 1832.9,
    x2: 426.5, y2: 1004.8,
    stops: [
      { offset: 0, color: "#F2A3A1", opacity: 1 },
      { offset: 1, color: "#F2A3A1", opacity: 0 },
    ],
  },
  indigoFade: {
    id: "linear-gradient1",
    type: "linear" as const,
    x1: 1203.6, y1: 903.8,
    x2: 1097.2, y2: 58.7,
    stops: [
      { offset: 0, color: "#5561AA", opacity: 0 },
      { offset: 1, color: "#5560A9", opacity: 1 },
    ],
  },
};

// -----------------------------------------------------------------------------
// All Logo Elements
// -----------------------------------------------------------------------------
export const LOGO_ELEMENTS: LogoElement[] = [
  // ===========================================================================
  // STRUCTURE — Lines & Shapes (stroke only, indigo)
  // ===========================================================================
  {
    id: "outerHexagon",
    name: "Outer Hexagon",
    type: "hexagon",
    category: "structure",
    d: "M83.4,525.6v849.9l731.6,425,731.6-425v-849.9L815,100.6,83.4,525.6Z",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [814, 951],
    description: "The main outer hexagonal frame of the logo",
  },
  {
    id: "innerHexagon",
    name: "Inner Hexagon",
    type: "hexagon",
    category: "structure",
    d: "M642.4,850.4v200.2l172.5,100.1,172.5-100.1v-200.2l-172.5-100.1-172.5,100.1Z",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [814, 951],
    description: "Small centered hexagon at the heart of the logo",
  },
  {
    id: "inscribedCircle",
    name: "Inscribed Circle",
    type: "circle",
    category: "structure",
    d: "M1319,951.8c0-279.1-226.2-505.3-505.3-505.3-279.1,0-505.3,226.2-505.3,505.3s226.2,505.3,505.3,505.3,505.3-226.2,505.3-505.3Z",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [813.7, 951.8],
    description: "Circle inscribed between outer and inner hexagons (r≈505)",
  },
  {
    id: "verticalAxis",
    name: "Vertical Axis",
    type: "line",
    category: "structure",
    d: "M813.7,100.6v1704.9",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [813.7, 953],
    description: "Vertical center line from top vertex to bottom vertex",
  },
  {
    id: "innerDiagonal",
    name: "Inner Diagonal",
    type: "line",
    category: "structure",
    d: "M642.4,1052.5l341.2-200.2",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [813, 952],
    description: "Diagonal line across the inner hexagon (bottom-left to top-right)",
  },
  {
    id: "diagonalTopLeftToCenter",
    name: "Diagonal: Top-Left → Center",
    type: "line",
    category: "structure",
    d: "M643.2,850.3L85.9,524.9",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [364, 688],
    description: "Line from inner hexagon top-left to outer hexagon top-left vertex",
  },
  {
    id: "diagonalCenterToBottomRight",
    name: "Diagonal: Center → Bottom-Right",
    type: "line",
    category: "structure",
    d: "M987.5,1048.8l557.8,326.1",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [1266, 1212],
    description: "Line from inner hexagon bottom-right to outer hexagon bottom-right vertex",
  },
  {
    id: "diagonalBottomLeftToCenter",
    name: "Diagonal: Bottom-Left → Center",
    type: "line",
    category: "structure",
    d: "M84.6,1374.9l561.7-325.1",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [365, 1212],
    description: "Line from outer hexagon bottom-left vertex to inner hexagon bottom-left",
  },
  {
    id: "diagonalTopRightToCenter",
    name: "Diagonal: Top-Right → Center",
    type: "line",
    category: "structure",
    d: "M1546.5,527.5l-565.4,326.4",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [1264, 691],
    description: "Line from outer hexagon top-right vertex to inner hexagon top-right",
  },

  // ===========================================================================
  // GRADIENT FILLS — Triangular color washes
  // ===========================================================================
  {
    id: "gradientTriangleCoral",
    name: "Gradient Triangle: Coral (Bottom-Left)",
    type: "triangle",
    category: "gradient",
    d: "M78.7,1375.4l736.9-425.5v850.9L78.7,1375.4Z",
    stroke: null,
    fill: "gradient:coralFade",
    strokeWidth: 0,
    opacity: 0.2,
    center: [298, 1392],
    description: "Coral gradient triangle filling bottom-left sector",
  },
  {
    id: "gradientTriangleIndigo",
    name: "Gradient Triangle: Indigo (Top-Right)",
    type: "triangle",
    category: "gradient",
    d: "M814,952.8V101s737.7,425.9,737.7,425.9l-737.7,425.9Z",
    stroke: null,
    fill: "gradient:indigoFade",
    strokeWidth: 0,
    opacity: 0.2,
    center: [1306, 527],
    description: "Indigo gradient triangle filling top-right sector",
  },

  // ===========================================================================
  // NODES — Decorative dots, mini-hexagons, and circles at key positions
  // ===========================================================================

  // --- Left vertex (outer hexagon mid-left) ---
  {
    id: "nodeLeftHexagon",
    name: "Node: Left Hexagon Outline",
    type: "hexagon",
    category: "node",
    d: "M43.1,927.2v48.3s41.2,24.2,41.2,24.2l41.2-24.2v-48.3l-41.2-24.2-41.2,24.2Z",
    stroke: COLORS.indigo,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [84, 951],
    description: "Small hexagon outline at the left vertex of the outer hexagon",
  },
  {
    id: "nodeLeftCircleLarge",
    name: "Node: Left Circle (Large)",
    type: "dot",
    category: "node",
    d: "M105.1,950.8c0-11.2-9.1-20.3-20.3-20.3s-20.3,9.1-20.3,20.3,9.1,20.3,20.3,20.3,20.3-9.1,20.3-20.3Z",
    stroke: null,
    fill: COLORS.gray,
    strokeWidth: 0,
    opacity: 1,
    center: [84.8, 950.8],
    description: "Gray filled circle inside the left hexagon node (r≈20)",
  },
  {
    id: "nodeLeftCircleSmall",
    name: "Node: Left Circle (Small)",
    type: "dot",
    category: "node",
    d: "M327.6,949.3c0-9.7-7.9-17.6-17.6-17.6s-17.6,7.9-17.6,17.6,7.9,17.6,17.6,17.6,17.6-7.9,17.6-17.6Z",
    stroke: null,
    fill: COLORS.gray,
    strokeWidth: 0,
    opacity: 1,
    center: [310, 949.3],
    description: "Small gray dot on the left, where circle meets the horizontal",
  },

  // --- Top vertex ---
  {
    id: "nodeTopHexagon",
    name: "Node: Top Hexagon Outline",
    type: "hexagon",
    category: "node",
    d: "M773.4,76v48.3l41.2,24.2,41.2-24.2v-48.3l-41.2-24.2-41.2,24.2Z",
    stroke: COLORS.coral,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [814.6, 100],
    description: "Small hexagon outline at the top vertex (coral stroke)",
  },
  {
    id: "nodeTopCircle",
    name: "Node: Top Circle",
    type: "dot",
    category: "node",
    d: "M835.4,99.5c0-11.2-9.1-20.3-20.3-20.3s-20.3,9.1-20.3,20.3,9.1,20.3,20.3,20.3,20.3-9.1,20.3-20.3Z",
    stroke: null,
    fill: COLORS.indigoLight,
    strokeWidth: 0,
    opacity: 1,
    center: [815.1, 99.5],
    description: "Indigo filled circle inside the top hexagon node (r≈20)",
  },
  {
    id: "nodeTopHexagonSmall",
    name: "Node: Top Small Hexagon (Filled)",
    type: "hexagon",
    category: "node",
    d: "M778.4,423.8v41.4l35.3,20.7,35.3-20.7v-41.4l-35.3-20.7-35.3,20.7Z",
    stroke: null,
    fill: COLORS.coral,
    strokeWidth: 0,
    opacity: 1,
    center: [813.7, 444.5],
    description: "Small coral filled hexagon on the vertical axis, upper region",
  },

  // --- Bottom vertex ---
  {
    id: "nodeBottomHexagon",
    name: "Node: Bottom Hexagon Outline",
    type: "hexagon",
    category: "node",
    d: "M773.4,1775.9v48.3l41.2,24.2,41.2-24.2v-48.3l-41.2-24.2-41.2,24.2Z",
    stroke: COLORS.gray,
    fill: null,
    strokeWidth: 1.2,
    opacity: 1,
    center: [814.6, 1800],
    description: "Small hexagon outline at the bottom vertex (gray stroke)",
  },
  {
    id: "nodeBottomCircle",
    name: "Node: Bottom Circle",
    type: "dot",
    category: "node",
    d: "M835.4,1799.4c0-11.2-9.1-20.3-20.3-20.3s-20.3,9.1-20.3,20.3,9.1,20.3,20.3,20.3,20.3-9.1,20.3-20.3Z",
    stroke: null,
    fill: COLORS.coral,
    strokeWidth: 0,
    opacity: 1,
    center: [815.1, 1799.4],
    description: "Coral filled circle inside the bottom hexagon node (r≈20)",
  },
  {
    id: "nodeBottomHexagonSmall",
    name: "Node: Bottom Small Hexagon (Filled)",
    type: "hexagon",
    category: "node",
    d: "M778.4,1436.2v41.4l35.3,20.7,35.3-20.7v-41.4l-35.3-20.7-35.3,20.7Z",
    stroke: null,
    fill: COLORS.indigo,
    strokeWidth: 0,
    opacity: 1,
    center: [813.7, 1456.9],
    description: "Small indigo filled hexagon on the vertical axis, lower region",
  },

  // --- Right side dots ---
  {
    id: "nodeRightDotCoral",
    name: "Node: Right Dot (Coral)",
    type: "dot",
    category: "node",
    d: "M1270.3,1204c0-9.6-8.2-17.4-18.3-17.4s-18.3,7.8-18.3,17.4,8.2,17.4,18.3,17.4,18.3-7.8,18.3-17.4Z",
    stroke: null,
    fill: COLORS.coral,
    strokeWidth: 0,
    opacity: 1,
    center: [1252, 1204],
    description: "Coral dot on the right side, where circle meets the lower diagonal",
  },
  {
    id: "nodeRightDotIndigo",
    name: "Node: Right Dot (Indigo)",
    type: "dot",
    category: "node",
    d: "M1270.3,698c0-9.6-8.2-17.4-18.3-17.4s-18.3,7.8-18.3,17.4,8.2,17.4,18.3,17.4,18.3-7.8,18.3-17.4Z",
    stroke: null,
    fill: COLORS.indigoLight,
    strokeWidth: 0,
    opacity: 1,
    center: [1252, 698],
    description: "Indigo dot on the right side, where circle meets the upper diagonal",
  },
];

// -----------------------------------------------------------------------------
// Helpers — Group by category
// -----------------------------------------------------------------------------
export const STRUCTURE_ELEMENTS = LOGO_ELEMENTS.filter(e => e.category === "structure");
export const GRADIENT_ELEMENTS = LOGO_ELEMENTS.filter(e => e.category === "gradient");
export const NODE_ELEMENTS = LOGO_ELEMENTS.filter(e => e.category === "node");

// Element count: 21 total
//   Structure: 9 (outer hex, inner hex, circle, vertical axis, inner diagonal, 4 cross diagonals)
//   Gradients: 2 (coral triangle, indigo triangle)
//   Nodes:    10 (3 left, 3 top, 3 bottom, 2 right)
