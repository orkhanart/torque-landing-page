"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import {
  STRUCTURE_ELEMENTS,
  GRADIENT_ELEMENTS,
  NODE_ELEMENTS,
  CENTER,
  VIEWBOX,
  GRADIENTS,
  type LogoElement,
} from "@/components/logo/logoElements";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SCALE = 4.0 / VIEWBOX.height; // ≈ 0.00209
const FOV = 50;
const CAM_Z = 5;
const MAX_TILT = 0.18; // radians (~10°)

// ---------------------------------------------------------------------------
// Animation bookkeeping
// ---------------------------------------------------------------------------
interface AnimatedGradient {
  group: THREE.Group;
  material: THREE.MeshBasicMaterial;
  index: number;
}

interface AnimatedNode {
  group: THREE.Group;
  index: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function HexaLogoScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let w = el.clientWidth;
    let h = el.clientHeight;
    if (!w || !h) return;

    let dead = false;
    let raf = 0;

    // ---- Renderer ----------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    });

    // ---- Scene & Camera ----------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, w / h, 0.1, 50);
    camera.position.z = CAM_Z;

    // ---- Scene graph -------------------------------------------------------
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const gradientGroup = new THREE.Group();
    gradientGroup.position.z = -0.15;
    rootGroup.add(gradientGroup);

    const structureGroup = new THREE.Group();
    structureGroup.position.z = 0;
    rootGroup.add(structureGroup);

    const nodeGroup = new THREE.Group();
    nodeGroup.position.z = 0.2;
    rootGroup.add(nodeGroup);

    // ---- SVG → Three.js helpers -------------------------------------------
    const loader = new SVGLoader();
    const disposables: { dispose(): void }[] = [];

    const parsePath = (d: string) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX.width} ${VIEWBOX.height}"><path d="${d}"/></svg>`;
      return loader.parse(svg);
    };

    /** Center at origin, flip Y, scale to ~4 units tall */
    const transformGeo = (geo: THREE.BufferGeometry) => {
      geo.translate(-CENTER.x, -CENTER.y, 0);
      geo.scale(SCALE, -SCALE, SCALE);
      return geo;
    };

    const isClosed = (d: string) => d.includes("Z") || d.includes("z");

    /** Add stroke lines from an element's path data */
    const addStrokes = (parent: THREE.Group, elem: LogoElement) => {
      const data = parsePath(elem.d);
      const color = new THREE.Color(elem.stroke || "#4857A3");
      const closed = isClosed(elem.d);

      for (const shapePath of data.paths) {
        for (const subPath of shapePath.subPaths) {
          const pts2d = subPath.getPoints(24);
          if (pts2d.length < 2) continue;

          const pts = pts2d.map((p) => new THREE.Vector3(p.x, p.y, 0));
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          transformGeo(geo);
          disposables.push(geo);

          const mat = new THREE.LineBasicMaterial({ color });
          disposables.push(mat);

          parent.add(
            closed
              ? new THREE.LineLoop(geo, mat)
              : new THREE.Line(geo, mat),
          );
        }
      }
    };

    /** Resolve gradient refs / literal colours */
    const getFillColor = (elem: LogoElement): string => {
      if (elem.fill === "gradient:coralFade")
        return GRADIENTS.coralFade.stops[0].color;
      if (elem.fill === "gradient:indigoFade")
        return GRADIENTS.indigoFade.stops[1].color;
      return elem.fill || "#4857A3";
    };

    /** Add filled mesh(es) and return the last material (for opacity anim) */
    const addFills = (
      parent: THREE.Group,
      elem: LogoElement,
      opacity = 1,
    ): THREE.MeshBasicMaterial | null => {
      const data = parsePath(elem.d);
      const color = getFillColor(elem);
      let lastMat: THREE.MeshBasicMaterial | null = null;

      for (const shapePath of data.paths) {
        const shapes = SVGLoader.createShapes(shapePath);
        for (const shape of shapes) {
          const geo = new THREE.ShapeGeometry(shape, 12);
          transformGeo(geo);
          disposables.push(geo);

          const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            transparent: opacity < 1,
            opacity,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          disposables.push(mat);
          lastMat = mat;

          parent.add(new THREE.Mesh(geo, mat));
        }
      }
      return lastMat;
    };

    // ---- Build structure (stroke-only wireframes) --------------------------
    for (const elem of STRUCTURE_ELEMENTS) {
      addStrokes(structureGroup, elem);
    }

    // ---- Build gradient triangles ------------------------------------------
    const animatedGradients: AnimatedGradient[] = [];
    GRADIENT_ELEMENTS.forEach((elem, i) => {
      const wrapper = new THREE.Group();
      const mat = addFills(wrapper, elem, elem.opacity);
      if (mat) {
        gradientGroup.add(wrapper);
        animatedGradients.push({ group: wrapper, material: mat, index: i });
      }
    });

    // ---- Build nodes -------------------------------------------------------
    const animatedNodes: AnimatedNode[] = [];
    NODE_ELEMENTS.forEach((elem, i) => {
      const wrapper = new THREE.Group();
      if (elem.fill) addFills(wrapper, elem);
      if (elem.stroke) addStrokes(wrapper, elem);
      nodeGroup.add(wrapper);
      animatedNodes.push({ group: wrapper, index: i });
    });

    // ---- Animation loop ----------------------------------------------------
    const clock = new THREE.Clock();
    const smoothMouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetMouse.set(mouse.current.x, mouse.current.y);
      smoothMouse.lerp(targetMouse, 0.04);

      // Root group — mouse tilt
      rootGroup.rotation.x = -smoothMouse.y * MAX_TILT;
      rootGroup.rotation.y = smoothMouse.x * MAX_TILT;

      // Camera subtle parallax
      camera.position.x = smoothMouse.x * 0.08;
      camera.position.y = smoothMouse.y * 0.08;

      // Structure — slow majestic rotation + scale breathing
      structureGroup.rotation.y = t * 0.08;
      structureGroup.rotation.x = Math.sin(t * 0.15) * 0.06;
      structureGroup.rotation.z = Math.sin(t * 0.1 + 1) * 0.03;
      structureGroup.scale.setScalar(1.0 + Math.sin(t * 0.3) * 0.012);

      // Gradients — drift + opacity pulse
      gradientGroup.rotation.y = t * 0.04;
      for (const ag of animatedGradients) {
        const phase = ag.index * Math.PI;
        ag.group.position.x = Math.sin(t * 0.2 + phase) * 0.05;
        ag.group.position.y = Math.cos(t * 0.2 + phase) * 0.03;
        ag.material.opacity = 0.15 + Math.sin(t * 0.5 + phase) * 0.05;
      }

      // Nodes — orbital micro-motion + scale pulsing
      nodeGroup.rotation.y = t * 0.12;
      for (const an of animatedNodes) {
        const phase = an.index * 0.7;
        const freq = 0.8 + an.index * 0.1;
        an.group.position.x = Math.sin(t * 0.3 + phase) * 0.02;
        an.group.position.y = Math.cos(t * 0.25 + phase) * 0.02;
        an.group.scale.setScalar(1.0 + Math.sin(t * freq + phase) * 0.08);
      }

      renderer.render(scene, camera);
    };
    tick();

    // ---- Events ------------------------------------------------------------
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const r = el.getBoundingClientRect();
      mouse.current.x = ((touch.clientX - r.left) / r.width) * 2 - 1;
      mouse.current.y = -((touch.clientY - r.top) / r.height) * 2 + 1;
    };

    const onResize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    // ---- Cleanup -----------------------------------------------------------
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ minHeight: "100vh" }}
    />
  );
}
