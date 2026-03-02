"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SCENE_REGISTRY } from "./registry";
import {
  buildLogoGeometry,
  createInputState,
  attachInputListeners,
  updateInputSmooth,
  disposeLogoGeometry,
} from "./utils";
import type { SceneInstance, Viewport } from "./types";

/** Add default lighting for chrome materials */
function addDefaultLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const key = new THREE.DirectionalLight(0xffffff, 1.0);
  key.position.set(5, 5, 10);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x8888cc, 0.4);
  fill.position.set(-5, -3, -5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 0.3);
  rim.position.set(0, -5, -3);
  scene.add(rim);
}

// ---------------------------------------------------------------------------
// Object manipulator — rotate/pan the object, zoom the camera
// ---------------------------------------------------------------------------
interface Manipulator {
  pivot: THREE.Group;
  update(): void;
  dispose(): void;
}

function createManipulator(
  container: HTMLElement,
): Manipulator {
  const pivot = new THREE.Group();

  // Smooth state
  const targetPos = new THREE.Vector3();

  // Interaction state
  let dragging = false;
  let button = -1;
  let lastX = 0;
  let lastY = 0;
  let altKey = false;
  let ctrlKey = false;

  // Momentum / inertia — angular velocity persists after release
  let velX = 0; // horizontal angular velocity (around Y axis)
  let velY = 0; // vertical angular velocity (around X axis)

  const ROTATE_SPEED = 0.006;
  const PAN_SPEED = 0.004;
  const FRICTION = 0.97; // velocity decay per frame (1 = no friction)
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
    // Stop momentum when grabbing
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

    // Determine action: rotate or pan
    const isPan =
      button === 2 || // right click
      button === 1 || // middle click
      (button === 0 && ctrlKey) || // ctrl + left
      (button === 0 && altKey); // alt + left

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
    // velX/velY retain last drag velocity → momentum continues
  };

  const onContextMenu = (e: Event) => e.preventDefault();

  // Touch handling
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
      const panDx = center.x - lastTouchCenter.x;
      const panDy = center.y - lastTouchCenter.y;
      targetPos.x += panDx * PAN_SPEED * 0.5;
      targetPos.y -= panDy * PAN_SPEED * 0.5;
      lastTouchCenter = center;
    } else if (e.touches.length === 1 && dragging) {
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      applyRotation(dx, dy);
    }
  };

  const onTouchEnd = () => {
    dragging = false;
  };

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
      // Apply angular velocity as rotation (momentum)
      if (!dragging && (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001)) {
        const qx = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          velX,
        );
        const qy = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          velY,
        );
        pivot.quaternion.premultiply(qx).premultiply(qy);
        // Decay
        velX *= FRICTION;
        velY *= FRICTION;
      } else if (dragging) {
        // While dragging, apply velocity directly each frame
        const qx = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          velX,
        );
        const qy = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          velY,
        );
        pivot.quaternion.premultiply(qx).premultiply(qy);
      }

      // Smooth-lerp pivot position
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
// SceneHost Component
// ---------------------------------------------------------------------------
export function SceneHost() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const envMapRef = useRef<THREE.Texture | null>(null);
  const activeRef = useRef<{
    instance: SceneInstance;
    raf: number;
    cleanup: () => void;
  } | null>(null);

  const inputRef = useRef(createInputState());

  const getViewport = useCallback((): Viewport => {
    const el = containerRef.current;
    if (!el) return { width: 1, height: 1, aspect: 1, dpr: 1 };
    return {
      width: el.clientWidth,
      height: el.clientHeight,
      aspect: el.clientWidth / el.clientHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
    };
  }, []);

  // Initialize renderer + envMap once
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const vp = getViewport();
    renderer.setSize(vp.width, vp.height);
    renderer.setPixelRatio(vp.dpr);
    renderer.setClearColor(0xffffff, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    });
    rendererRef.current = renderer;

    // Generate environment map for chrome reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromScene(new RoomEnvironment()).texture;
    pmrem.dispose();
    envMapRef.current = envMap;

    const detachInput = attachInputListeners(el, inputRef.current);

    return () => {
      if (activeRef.current) {
        cancelAnimationFrame(activeRef.current.raf);
        activeRef.current.instance.dispose();
        activeRef.current.cleanup();
        activeRef.current = null;
      }
      detachInput();
      envMap.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      rendererRef.current = null;
      envMapRef.current = null;
    };
  }, [getViewport]);

  // Load / switch scene
  useEffect(() => {
    const renderer = rendererRef.current;
    const envMap = envMapRef.current;
    const el = containerRef.current;
    if (!renderer || !envMap || !el) return;

    let cancelled = false;

    // Teardown previous scene
    if (activeRef.current) {
      cancelAnimationFrame(activeRef.current.raf);
      activeRef.current.instance.dispose();
      activeRef.current.cleanup();
      activeRef.current = null;
    }

    setLoading(true);

    const entry = SCENE_REGISTRY[sceneIndex];
    entry.load().then((mod) => {
      if (cancelled) return;

      const factory = mod.default;
      const logo = buildLogoGeometry();
      const vp = getViewport();
      const clock = new THREE.Clock();
      const input = inputRef.current;

      const instance = factory(
        { renderer, container: el, viewport: vp, input, clock, envMap },
        logo,
      );

      // Chrome environment
      instance.scene.environment = envMap;

      // Default lighting
      addDefaultLights(instance.scene);

      // Clear color
      renderer.setClearColor(
        instance.clearColor !== undefined ? instance.clearColor : 0xffffff,
        1,
      );

      // Object manipulator — reparent logo.root into a pivot group
      const manip = createManipulator(el);
      if (logo.root.parent) {
        logo.root.parent.remove(logo.root);
      }
      manip.pivot.add(logo.root);
      instance.scene.add(manip.pivot);

      // Resize handler
      const onResize = () => {
        const nvp = getViewport();
        renderer.setSize(nvp.width, nvp.height);
        renderer.setPixelRatio(nvp.dpr);
        instance.resize(nvp);
      };
      window.addEventListener("resize", onResize);

      // Scroll-driven explode: elements separate into Z layers + spread in XY
      const EXPLODE_XY = 3.0;
      const EXPLODE_Z = 4.0;
      let smoothScroll = 0;

      // Assign each element a Z-layer based on its role in the logo
      const layerMap: Record<string, number> = {
        // Layer -2: gradient triangles (behind everything)
        gradientTriangleCoral: -2,
        gradientTriangleIndigo: -2,
        // Layer -1: outer hexagon + diagonal structure lines
        outerHexagon: -1,
        diagonalTopLeftToCenter: -1,
        diagonalCenterToBottomRight: -1,
        diagonalBottomLeftToCenter: -1,
        diagonalTopRightToCenter: -1,
        // Layer 0: inscribed circle + vertical axis
        inscribedCircle: 0,
        verticalAxis: 0,
        innerDiagonal: 0,
        // Layer 1: inner hexagon
        innerHexagon: 1,
        // Layer 2: nodes (small hexagons, circles, dots)
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

      // Animation loop
      let raf = 0;
      const tick = () => {
        if (cancelled) return;
        raf = requestAnimationFrame(tick);
        const dt = clock.getDelta();
        const t = clock.getElapsedTime();
        updateInputSmooth(input);
        manip.update();

        // Smooth-lerp scroll value
        smoothScroll += (input.scroll - smoothScroll) * 0.08;

        // Move each element: spread in XY + separate layers in Z
        for (const el of logo.elements) {
          const layer = layerMap[el.id] ?? 0;

          // XY: push outward from center
          const dir = el.restPosition.clone();
          const len = dir.length();
          if (len > 0.001) {
            dir.normalize();
            el.group.position.x = dir.x * smoothScroll * EXPLODE_XY * len;
            el.group.position.y = dir.y * smoothScroll * EXPLODE_XY * len;
          } else {
            el.group.position.x = 0;
            el.group.position.y = 0;
          }

          // Z: separate layers
          el.group.position.z = layer * smoothScroll * EXPLODE_Z;
        }

        instance.tick(t, dt);
        if (!instance.customRender) {
          renderer.render(instance.scene, instance.camera);
        }
      };
      raf = requestAnimationFrame(tick);

      activeRef.current = {
        instance,
        raf,
        cleanup: () => {
          manip.dispose();
          window.removeEventListener("resize", onResize);
          disposeLogoGeometry(logo);
        },
      };

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [sceneIndex, getViewport]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ minHeight: "100vh" }}
    >
      {/* Scene selector dropdown */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <select
          value={sceneIndex}
          onChange={(e) => setSceneIndex(Number(e.target.value))}
          className="px-3 py-1.5 rounded-md text-sm font-medium
                     bg-white/80 backdrop-blur-md border border-gray-200
                     text-gray-800 shadow-sm cursor-pointer
                     hover:bg-white/90 transition-colors
                     outline-none focus:ring-2 focus:ring-blue-400"
        >
          {SCENE_REGISTRY.map((entry, i) => (
            <option key={entry.name} value={i}>
              {entry.name}
            </option>
          ))}
        </select>
        {loading && (
          <span className="text-xs text-gray-500 animate-pulse">
            Loading...
          </span>
        )}
      </div>
    </div>
  );
}
