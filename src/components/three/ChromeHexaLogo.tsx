"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  buildLogoGeometry,
  createInputState,
  attachInputListeners,
  updateInputSmooth,
  disposeLogoGeometry,
} from "./hexa-scenes/utils";
import type { Viewport } from "./hexa-scenes/types";
import chromeFactory from "./hexa-scenes/scenes/chromeShowcase";

// ---------------------------------------------------------------------------
// Paint brand text onto a canvas → use as environment texture
// The chrome material will literally reflect the UI text
// ---------------------------------------------------------------------------
function createTextEnvCanvas(): HTMLCanvasElement {
  const W = 2048;
  const H = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Soft warm-white background
  ctx.fillStyle = "#f6f6f4";
  ctx.fillRect(0, 0, W, H);

  // Subtle gradient wash (warm top, cool bottom)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "rgba(241,163,161,0.06)");   // coral tint
  grad.addColorStop(0.5, "rgba(255,255,255,0)");
  grad.addColorStop(1, "rgba(93,253,203,0.06)");     // cyan tint
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // --- Main headline (large, repeated at angles for panoramic wrap) ---
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
  ctx.font = "bold 110px 'Instrument Sans', 'Helvetica Neue', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("The Onchain", W * 0.5, H * 0.30);
  ctx.fillText("Growth Engine", W * 0.5, H * 0.45);

  // Repeated at edges for seamless-ish wrap
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.font = "bold 70px 'Instrument Sans', 'Helvetica Neue', sans-serif";
  ctx.fillText("The Onchain Growth Engine", W * 0.15, H * 0.72);
  ctx.fillText("The Onchain Growth Engine", W * 0.85, H * 0.72);
  ctx.restore();

  // --- Stats numbers ---
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
  ctx.font = "bold 90px 'Instrument Sans', monospace";
  ctx.textAlign = "center";
  ctx.fillText("89M+", W * 0.2, H * 0.58);
  ctx.fillText("$2.1B", W * 0.5, H * 0.58);
  ctx.fillText("150+", W * 0.8, H * 0.58);
  ctx.restore();

  // --- Monospace terminal tag ---
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.font = "500 28px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText("89M+ TRANSACTIONS INDEXED", W * 0.5, H * 0.15);
  ctx.fillText("DEPLOY LOGIC  ·  EXPLORE PRIMITIVES", W * 0.5, H * 0.88);
  ctx.restore();

  // --- Geometric hexagon accents (brand shape echoes) ---
  ctx.save();
  ctx.strokeStyle = "rgba(0, 8, 255, 0.05)";
  ctx.lineWidth = 2;
  const drawHex = (cx: number, cy: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };
  drawHex(W * 0.12, H * 0.3, 60);
  drawHex(W * 0.88, H * 0.3, 60);
  drawHex(W * 0.12, H * 0.7, 45);
  drawHex(W * 0.88, H * 0.7, 45);
  drawHex(W * 0.5, H * 0.82, 35);
  ctx.restore();

  // --- Coral/cyan accent dots ---
  ctx.save();
  const dots = [
    { x: W * 0.3, y: H * 0.2, c: "rgba(241,163,161,0.15)", r: 12 },
    { x: W * 0.7, y: H * 0.2, c: "rgba(93,253,203,0.15)", r: 12 },
    { x: W * 0.15, y: H * 0.5, c: "rgba(0,8,255,0.08)", r: 8 },
    { x: W * 0.85, y: H * 0.5, c: "rgba(0,8,255,0.08)", r: 8 },
    { x: W * 0.4, y: H * 0.9, c: "rgba(241,163,161,0.10)", r: 10 },
    { x: W * 0.6, y: H * 0.9, c: "rgba(93,253,203,0.10)", r: 10 },
  ];
  for (const d of dots) {
    ctx.fillStyle = d.c;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  return canvas;
}

/**
 * Build an environment map that blends RoomEnvironment lighting
 * with floating text panels — so the chrome reflects the UI.
 */
function buildTextEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  // Start with the RoomEnvironment (studio lights)
  const envScene = new RoomEnvironment();

  // Paint brand text to a canvas texture
  const textCanvas = createTextEnvCanvas();
  const textTex = new THREE.CanvasTexture(textCanvas);
  textTex.colorSpace = THREE.SRGBColorSpace;

  const panelMat = new THREE.MeshBasicMaterial({
    map: textTex,
    side: THREE.DoubleSide,
  });
  const panelGeo = new THREE.PlaneGeometry(8, 4);

  // Place text panels around the environment at various angles
  const placements = [
    { pos: [0, 2, -5], rot: [0, 0, 0] },           // front
    { pos: [0, -1, -5], rot: [0.2, 0, 0] },         // front-low
    { pos: [5, 1, 0], rot: [0, -Math.PI / 2, 0] },  // right
    { pos: [-5, 1, 0], rot: [0, Math.PI / 2, 0] },  // left
    { pos: [0, 2, 5], rot: [0, Math.PI, 0] },        // behind
    { pos: [0, 5, 0], rot: [Math.PI / 2, 0, 0] },   // above
  ];

  for (const p of placements) {
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(p.pos[0], p.pos[1], p.pos[2]);
    panel.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
    envScene.add(panel);
  }

  // Generate PMREM envMap from the composite scene
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envMap = pmrem.fromScene(envScene, 0, 0.1, 100).texture;
  pmrem.dispose();

  // Cleanup
  panelGeo.dispose();
  panelMat.dispose();
  textTex.dispose();

  return envMap;
}

// ---------------------------------------------------------------------------
// Drag-to-rotate manipulator
// ---------------------------------------------------------------------------
function createManipulator(container: HTMLElement) {
  const pivot = new THREE.Group();
  const targetPos = new THREE.Vector3();

  let dragging = false;
  let button = -1;
  let lastX = 0;
  let lastY = 0;
  let altKey = false;
  let ctrlKey = false;
  let velX = 0;
  let velY = 0;

  const ROTATE_SPEED = 0.006;
  const PAN_SPEED = 0.004;
  const FRICTION = 0.97;
  const DAMPING = 0.12;

  const applyRotation = (dx: number, dy: number) => {
    velX = dx * ROTATE_SPEED;
    velY = dy * ROTATE_SPEED;
  };

  const onPointerDown = (e: PointerEvent) => {
    dragging = true;
    button = e.button;
    lastX = e.clientX;
    lastY = e.clientY;
    altKey = e.altKey;
    ctrlKey = e.ctrlKey || e.metaKey;
    velX = 0;
    velY = 0;
    container.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    const isPan =
      button === 2 || button === 1 ||
      (button === 0 && ctrlKey) ||
      (button === 0 && altKey);

    if (isPan) {
      targetPos.x += dx * PAN_SPEED;
      targetPos.y -= dy * PAN_SPEED;
    } else {
      applyRotation(dx, dy);
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    dragging = false;
    button = -1;
    container.releasePointerCapture(e.pointerId);
  };

  const onContextMenu = (e: Event) => e.preventDefault();

  let lastTouchCenter = { x: 0, y: 0 };

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      lastTouchCenter = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
    } else if (e.touches.length === 1) {
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      dragging = true;
      button = 0;
      velX = 0;
      velY = 0;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const center = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
      targetPos.x += (center.x - lastTouchCenter.x) * PAN_SPEED * 0.5;
      targetPos.y -= (center.y - lastTouchCenter.y) * PAN_SPEED * 0.5;
      lastTouchCenter = center;
    } else if (e.touches.length === 1 && dragging) {
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      applyRotation(dx, dy);
    }
  };

  const onTouchEnd = () => { dragging = false; };

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerUp);
  container.addEventListener("contextmenu", onContextMenu);
  container.addEventListener("touchstart", onTouchStart, { passive: true });
  container.addEventListener("touchmove", onTouchMove, { passive: true });
  container.addEventListener("touchend", onTouchEnd);

  return {
    pivot,
    update() {
      if (!dragging && (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001)) {
        const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), velX);
        const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), velY);
        pivot.quaternion.premultiply(qx).premultiply(qy);
        velX *= FRICTION;
        velY *= FRICTION;
      } else if (dragging) {
        const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), velX);
        const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), velY);
        pivot.quaternion.premultiply(qx).premultiply(qy);
      }
      pivot.position.lerp(targetPos, DAMPING);
    },
    dispose() {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("contextmenu", onContextMenu);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    },
  };
}

// ---------------------------------------------------------------------------
// Layer map for scroll-driven explode
// ---------------------------------------------------------------------------
const LAYER_MAP: Record<string, number> = {
  gradientTriangleCoral: -2,
  gradientTriangleIndigo: -2,
  outerHexagon: -1,
  diagonalTopLeftToCenter: -1,
  diagonalCenterToBottomRight: -1,
  diagonalBottomLeftToCenter: -1,
  diagonalTopRightToCenter: -1,
  inscribedCircle: 0,
  verticalAxis: 0,
  innerDiagonal: 0,
  innerHexagon: 1,
  nodeLeftHexagon: 2,
  nodeLeftCircleLarge: 2,
  nodeLeftCircleSmall: 2,
  nodeTopHexagon: 2,
  nodeTopCircle: 2,
  nodeTopHexagonSmall: 2,
  nodeBottomHexagon: 2,
  nodeBottomCircle: 2,
  nodeBottomHexagonSmall: 2,
  nodeRightDotCoral: 2,
  nodeRightDotIndigo: 2,
};

const EXPLODE_XY = 3.0;
const EXPLODE_Z = 4.0;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ChromeHexaLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.clientWidth;
    const height = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    el.appendChild(renderer.domElement);

    // Build custom envMap: RoomEnvironment + floating text panels
    const envMap = buildTextEnvMap(renderer);

    // Input
    const input = createInputState();
    const detachInput = attachInputListeners(el, input);

    // Logo + scene
    const logo = buildLogoGeometry();
    const clock = new THREE.Clock();
    const vp: Viewport = {
      width,
      height,
      aspect: width / height,
      dpr: Math.min(window.devicePixelRatio, 2),
    };

    const instance = chromeFactory(
      { renderer, container: el, viewport: vp, input, clock, envMap },
      logo,
    );

    // Apply text-enriched envMap
    instance.scene.environment = envMap;

    // Lighting
    instance.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(5, 5, 10);
    instance.scene.add(key);
    const fill = new THREE.DirectionalLight(0x8888cc, 0.3);
    fill.position.set(-5, -3, -5);
    instance.scene.add(fill);

    renderer.setClearColor(0xffffff, 0);

    // Manipulator — reparent logo.root into pivot
    const manip = createManipulator(el);
    if (logo.root.parent) logo.root.parent.remove(logo.root);
    manip.pivot.add(logo.root);

    // Outer group for scroll-driven Z rotation (layers on top of auto-orbit + drag)
    const scrollGroup = new THREE.Group();
    scrollGroup.add(manip.pivot);
    instance.scene.add(scrollGroup);

    // Resize
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      instance.resize({ width: w, height: h, aspect: w / h, dpr: Math.min(window.devicePixelRatio, 2) });
    };
    window.addEventListener("resize", onResize);

    // Scroll-driven phases
    let smoothScroll = 0;
    let scrollTarget = 0;
    let smoothRotation = 0;
    let rotationTarget = 0;

    const onPageScroll = () => {
      const vh = window.innerHeight;
      // Phase 1 (0 → 1vh): assembly — explode 1 → 0
      scrollTarget = Math.max(0, Math.min(1, 1 - window.scrollY / vh));
      // Phase 2 (1vh → 1.5vh): dwell — just enjoy the assembled logo
      // Phase 3 (1.5vh → 2.5vh): 180° Z rotation
      rotationTarget = Math.max(0, Math.min(1, (window.scrollY - vh * 1.5) / vh)) * Math.PI;
    };
    window.addEventListener("scroll", onPageScroll, { passive: true });
    onPageScroll();

    // Animation loop
    let raf = 0;
    let orbitAngle = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      updateInputSmooth(input);
      manip.update();

      // Track scroll directly — just enough smoothing to prevent jitter
      smoothScroll += (scrollTarget - smoothScroll) * 0.25;
      smoothRotation += (rotationTarget - smoothRotation) * 0.25;

      // Auto-orbit: spins while exploded, fades out as logo assembles
      orbitAngle += 0.5 * dt * smoothScroll;

      // Orbit accumulates while exploded and naturally stops when assembled
      // (rate already scales with smoothScroll). The 180° flip adds on top
      // in the same direction — no mid-assembly reversal.
      scrollGroup.rotation.y = orbitAngle + smoothRotation;

      // Explode elements on scroll
      for (const elem of logo.elements) {
        const layer = LAYER_MAP[elem.id] ?? 0;
        const dir = elem.restPosition.clone();
        const len = dir.length();
        if (len > 0.001) {
          dir.normalize();
          elem.group.position.x = dir.x * smoothScroll * EXPLODE_XY * len;
          elem.group.position.y = dir.y * smoothScroll * EXPLODE_XY * len;
        } else {
          elem.group.position.x = 0;
          elem.group.position.y = 0;
        }
        elem.group.position.z = layer * smoothScroll * EXPLODE_Z;
      }

      instance.tick(t, dt);
      if (!instance.customRender) {
        renderer.render(instance.scene, instance.camera);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onPageScroll);
      manip.dispose();
      instance.dispose();
      detachInput();
      disposeLogoGeometry(logo);
      envMap.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
