import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import {
  LOGO_ELEMENTS,
  VIEWBOX,
  CENTER,
  GRADIENTS,
  type LogoElement,
} from "@/components/logo/logoElements";
import type { InputState, LogoGeometry, LogoElementMesh } from "./types";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const SCALE = 4.0 / VIEWBOX.height; // ≈ 0.00209
export const FOV = 50;
export const CAM_Z = 5;

const loader = new SVGLoader();

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------
export function parseSVGPath(d: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX.width} ${VIEWBOX.height}"><path d="${d}"/></svg>`;
  return loader.parse(svg);
}

export function transformGeo(geo: THREE.BufferGeometry) {
  geo.translate(-CENTER.x, -CENTER.y, 0);
  geo.scale(SCALE, -SCALE, SCALE);
  return geo;
}

/** Convert SVG coordinate to Three.js world position */
export function svgToWorld(x: number, y: number): THREE.Vector3 {
  return new THREE.Vector3(
    (x - CENTER.x) * SCALE,
    -(y - CENTER.y) * SCALE,
    0,
  );
}

function isClosed(d: string) {
  return d.includes("Z") || d.includes("z");
}

function getFillColor(elem: LogoElement): string {
  if (elem.fill === "gradient:coralFade")
    return GRADIENTS.coralFade.stops[0].color;
  if (elem.fill === "gradient:indigoFade")
    return GRADIENTS.indigoFade.stops[1].color;
  return elem.fill || "#4857A3";
}

// ---------------------------------------------------------------------------
// 3D Chrome Logo Geometry Builder
// ---------------------------------------------------------------------------

/** Transform SVG path points to world-space Vector3 array */
function pathToWorldPoints(d: string): THREE.Vector3[][] {
  const data = parseSVGPath(d);
  const result: THREE.Vector3[][] = [];
  for (const shapePath of data.paths) {
    for (const subPath of shapePath.subPaths) {
      const pts2d = subPath.getPoints(128);
      if (pts2d.length < 2) continue;
      const pts3d = pts2d.map(
        (p) =>
          new THREE.Vector3(
            (p.x - CENTER.x) * SCALE,
            -(p.y - CENTER.y) * SCALE,
            0,
          ),
      );
      result.push(pts3d);
    }
  }
  return result;
}

export function buildLogoGeometry(): LogoGeometry {
  const disposables: { dispose(): void }[] = [];
  const elements: LogoElementMesh[] = [];

  const root = new THREE.Group();

  const gradientGroup = new THREE.Group();
  gradientGroup.position.z = -0.08;
  root.add(gradientGroup);

  const structureGroup = new THREE.Group();
  structureGroup.position.z = 0;
  root.add(structureGroup);

  const nodeGroup = new THREE.Group();
  nodeGroup.position.z = 0.12;
  root.add(nodeGroup);

  // ---- Chrome material factory -------------------------------------------
  const createChrome = (
    color: string | number,
    roughness = 0.12,
  ): THREE.MeshStandardMaterial => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 1.0,
      roughness,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide,
    });
    disposables.push(mat);
    return mat;
  };

  // ---- Tube (pipe) from stroke path -------------------------------------
  // Each straight edge is an independent cylinder + sphere joints at vertices.
  // This avoids TubeGeometry's Frenet-frame interpolation that curves corners.
  const addTube = (
    parent: THREE.Group,
    elem: LogoElement,
    radius: number,
  ) => {
    const color = elem.stroke || elem.fill || "#4857A3";
    const closed = isClosed(elem.d);
    const pointSets = pathToWorldPoints(elem.d);

    for (let pts of pointSets) {
      if (pts.length < 2) continue;

      // Remove duplicate closing point if SVG repeats the first vertex
      if (
        closed &&
        pts.length > 2 &&
        pts[0].distanceTo(pts[pts.length - 1]) < 0.001
      ) {
        pts = pts.slice(0, -1);
      }

      const mat = createChrome(color, 0.1);

      // Build list of edges (pairs of points)
      const edges: [THREE.Vector3, THREE.Vector3][] = [];
      for (let i = 0; i < pts.length - 1; i++) {
        edges.push([pts[i], pts[i + 1]]);
      }
      if (closed && pts.length > 1) {
        edges.push([pts[pts.length - 1], pts[0]]);
      }

      // Create an independent cylinder for each edge
      for (const [a, b] of edges) {
        const dir = new THREE.Vector3().subVectors(b, a);
        const len = dir.length();
        if (len < 0.0001) continue;

        const cylGeo = new THREE.CylinderGeometry(
          radius,
          radius,
          len,
          8,
          1,
          true,
        );
        // CylinderGeometry is along Y axis — rotate to align with edge
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        cylGeo.translate(0, 0, 0); // centered at origin

        disposables.push(cylGeo);

        const mesh = new THREE.Mesh(cylGeo, mat);
        mesh.position.copy(mid);

        // Orient cylinder from default Y-axis to edge direction
        const up = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          up,
          dir.clone().normalize(),
        );
        mesh.quaternion.copy(quat);

        parent.add(mesh);
      }

      // Place sphere joints at every vertex for clean corners
      const jointGeo = new THREE.SphereGeometry(radius, 8, 8);
      disposables.push(jointGeo);

      const jointVertices = closed ? pts : pts;
      for (const pt of jointVertices) {
        const sphere = new THREE.Mesh(jointGeo, mat);
        sphere.position.copy(pt);
        parent.add(sphere);
      }
    }
  };

  // ---- Extruded shape from fill path ------------------------------------
  const addExtrude = (
    parent: THREE.Group,
    elem: LogoElement,
    depth: number,
  ) => {
    const data = parseSVGPath(elem.d);
    const color = getFillColor(elem);

    for (const shapePath of data.paths) {
      const shapes = SVGLoader.createShapes(shapePath);
      for (const shape of shapes) {
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: depth / SCALE,
          bevelEnabled: true,
          bevelThickness: 4,
          bevelSize: 3,
          bevelSegments: 3,
        });
        transformGeo(geo);
        // Center along Z so the shape straddles the z=0 plane
        geo.translate(0, 0, -depth / 2);
        geo.computeVertexNormals();
        disposables.push(geo);

        const mat = createChrome(color, 0.18);
        parent.add(new THREE.Mesh(geo, mat));
      }
    }
  };

  // ---- Sphere from dot element ------------------------------------------
  const addSphere = (parent: THREE.Group, elem: LogoElement) => {
    const data = parseSVGPath(elem.d);
    for (const shapePath of data.paths) {
      for (const subPath of shapePath.subPaths) {
        const pts = subPath.getPoints(16);
        if (pts.length < 3) continue;

        // Bounding-box → center + radius
        let minX = Infinity,
          maxX = -Infinity;
        let minY = Infinity,
          maxY = -Infinity;
        for (const p of pts) {
          minX = Math.min(minX, p.x);
          maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y);
          maxY = Math.max(maxY, p.y);
        }
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        const r = (Math.max(maxX - minX, maxY - minY) / 2) * SCALE;

        const pos = new THREE.Vector3(
          (cx - CENTER.x) * SCALE,
          -(cy - CENTER.y) * SCALE,
          0,
        );

        const geo = new THREE.SphereGeometry(r, 24, 24);
        disposables.push(geo);

        const mat = createChrome(elem.fill || "#4857A3", 0.05);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        parent.add(mesh);
      }
    }
  };

  // ---- Build all elements -----------------------------------------------
  for (const elem of LOGO_ELEMENTS) {
    const wrapper = new THREE.Group();
    const center = svgToWorld(elem.center[0], elem.center[1]);

    if (elem.type === "dot") {
      // Dots → chrome spheres
      addSphere(wrapper, elem);
    } else if (elem.stroke && !elem.fill) {
      // Stroke-only (structure lines, node outlines) → chrome pipes
      const radius = elem.category === "node" ? 0.008 : 0.015;
      addTube(wrapper, elem, radius);
    } else if (elem.fill) {
      // Filled shapes (gradient triangles, small hexagons) → chrome extrusions
      const depth = elem.category === "gradient" ? 0.04 : 0.03;
      addExtrude(wrapper, elem, depth);
    }

    const parent =
      elem.category === "gradient"
        ? gradientGroup
        : elem.category === "structure"
          ? structureGroup
          : nodeGroup;
    parent.add(wrapper);

    elements.push({
      id: elem.id,
      category: elem.category,
      group: wrapper,
      center,
      restPosition: center.clone(),
    });
  }

  return {
    root,
    structureGroup,
    gradientGroup,
    nodeGroup,
    elements,
    disposables,
  };
}

// ---------------------------------------------------------------------------
// Input tracking
// ---------------------------------------------------------------------------
export function createInputState(): InputState {
  return {
    mx: 0,
    my: 0,
    smx: 0,
    smy: 0,
    down: false,
    scroll: 0,
    clicks: 0,
  };
}

export function attachInputListeners(
  container: HTMLDivElement,
  state: InputState,
): () => void {
  const onMove = (e: MouseEvent) => {
    const r = container.getBoundingClientRect();
    state.mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    state.my = -((e.clientY - r.top) / r.height) * 2 + 1;
  };

  const onTouch = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    const r = container.getBoundingClientRect();
    state.mx = ((touch.clientX - r.left) / r.width) * 2 - 1;
    state.my = -((touch.clientY - r.top) / r.height) * 2 + 1;
  };

  const onDown = () => {
    state.down = true;
  };
  const onUp = () => {
    state.down = false;
  };
  const onClick = () => {
    state.clicks++;
  };

  const onWheel = (e: WheelEvent) => {
    state.scroll = Math.max(0, Math.min(1, state.scroll + e.deltaY * 0.001));
  };

  container.addEventListener("mousemove", onMove);
  container.addEventListener("touchmove", onTouch, { passive: true });
  container.addEventListener("mousedown", onDown);
  container.addEventListener("mouseup", onUp);
  container.addEventListener("touchstart", onDown, { passive: true });
  container.addEventListener("touchend", onUp);
  container.addEventListener("click", onClick);
  container.addEventListener("wheel", onWheel, { passive: true });

  return () => {
    container.removeEventListener("mousemove", onMove);
    container.removeEventListener("touchmove", onTouch);
    container.removeEventListener("mousedown", onDown);
    container.removeEventListener("mouseup", onUp);
    container.removeEventListener("touchstart", onDown);
    container.removeEventListener("touchend", onUp);
    container.removeEventListener("click", onClick);
    container.removeEventListener("wheel", onWheel);
  };
}

/** Call each frame to smooth-lerp input */
export function updateInputSmooth(state: InputState, lerpFactor = 0.06) {
  state.smx += (state.mx - state.smx) * lerpFactor;
  state.smy += (state.my - state.smy) * lerpFactor;
}

// ---------------------------------------------------------------------------
// Disposal
// ---------------------------------------------------------------------------
export function disposeLogoGeometry(logo: LogoGeometry) {
  for (const d of logo.disposables) d.dispose();
  logo.elements.length = 0;
}
