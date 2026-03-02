import type * as THREE from "three";

// ---------------------------------------------------------------------------
// Input state tracked by the host
// ---------------------------------------------------------------------------
export interface InputState {
  /** Normalized mouse/touch X: -1 (left) to +1 (right) */
  mx: number;
  /** Normalized mouse/touch Y: -1 (bottom) to +1 (top) */
  my: number;
  /** Smoothed mx */
  smx: number;
  /** Smoothed my */
  smy: number;
  /** Whether primary pointer is down */
  down: boolean;
  /** Cumulative scroll (normalised 0-1 range clamped) */
  scroll: number;
  /** Click counter — increments each click */
  clicks: number;
}

// ---------------------------------------------------------------------------
// Viewport info
// ---------------------------------------------------------------------------
export interface Viewport {
  width: number;
  height: number;
  aspect: number;
  dpr: number;
}

// ---------------------------------------------------------------------------
// Logo geometry built from SVG elements
// ---------------------------------------------------------------------------
export interface LogoElementMesh {
  id: string;
  category: "structure" | "gradient" | "node";
  group: THREE.Group;
  /** Center in Three.js world space */
  center: THREE.Vector3;
  /** Original rest position for the group */
  restPosition: THREE.Vector3;
}

export interface LogoGeometry {
  root: THREE.Group;
  structureGroup: THREE.Group;
  gradientGroup: THREE.Group;
  nodeGroup: THREE.Group;
  elements: LogoElementMesh[];
  disposables: { dispose(): void }[];
}

// ---------------------------------------------------------------------------
// Scene context passed to factory
// ---------------------------------------------------------------------------
export interface SceneContext {
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  viewport: Viewport;
  input: InputState;
  clock: THREE.Clock;
  envMap: THREE.Texture;
}

// ---------------------------------------------------------------------------
// Scene instance returned by factory
// ---------------------------------------------------------------------------
export interface SceneInstance {
  scene: THREE.Scene;
  camera: THREE.Camera;
  /** Called every frame */
  tick(elapsed: number, delta: number): void;
  /** Called on container resize */
  resize(vp: Viewport): void;
  /** Cleanup all resources */
  dispose(): void;
  /** Optional clear color override (hex number) */
  clearColor?: number;
  /** If true, the host should NOT call renderer.render — scene handles it */
  customRender?: boolean;
}

// ---------------------------------------------------------------------------
// Scene factory function — each scene module exports this as default
// ---------------------------------------------------------------------------
export type SceneFactory = (
  ctx: SceneContext,
  logo: LogoGeometry,
) => SceneInstance;
