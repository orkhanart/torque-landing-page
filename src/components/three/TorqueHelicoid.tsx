"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

// =============================================================================
// Helicoid Parametric Surface — the mathematical shape of torque
// =============================================================================
function makeHelicoid(segs: number): ParametricGeometry {
  return new ParametricGeometry(
    (u: number, v: number, target: THREE.Vector3) => {
      const uu = (u - 0.5) * 4;
      const vv = (v - 0.5) * 4;
      const tau = Math.PI;

      const sinhV = Math.sinh(vv);
      const coshV = Math.cosh(vv);
      const sinhU = Math.sinh(uu);
      const coshU = Math.cosh(uu);
      const d = 1 + coshU * coshV;

      target.set(
        ((sinhV * Math.cos(tau * uu)) / d) * 2,
        ((coshV * sinhU) / d) * 2,
        ((sinhV * Math.sin(tau * uu)) / d) * 2
      );
    },
    segs,
    segs
  );
}

// =============================================================================
// Drag-to-rotate manipulator
// =============================================================================
function createManipulator(container: HTMLElement) {
  const pivot = new THREE.Group();

  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let velX = 0;
  let velY = 0;

  const ROTATE_SPEED = 0.005;
  const FRICTION = 0.95;

  const applyRotation = (dx: number, dy: number) => {
    velX = dx * ROTATE_SPEED;
    velY = dy * ROTATE_SPEED;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return; // left-click only
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
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
    applyRotation(dx, dy);
  };

  const onPointerUp = (e: PointerEvent) => {
    dragging = false;
    container.releasePointerCapture(e.pointerId);
  };

  let touchDragging = false;

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      touchDragging = true;
      dragging = true;
      velX = 0;
      velY = 0;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1 && touchDragging) {
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      applyRotation(dx, dy);
    }
  };

  const onTouchEnd = () => {
    touchDragging = false;
    dragging = false;
  };

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerUp);
  container.addEventListener("touchstart", onTouchStart, { passive: true });
  container.addEventListener("touchmove", onTouchMove, { passive: true });
  container.addEventListener("touchend", onTouchEnd);

  return {
    pivot,
    dragging: () => dragging,
    update() {
      // Apply velocity as quaternion rotation
      if (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001) {
        const qx = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          velX
        );
        const qy = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          velY
        );
        pivot.quaternion.premultiply(qx).premultiply(qy);
      }
      // Friction when not dragging
      if (!dragging) {
        velX *= FRICTION;
        velY *= FRICTION;
      }
    },
    dispose() {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    },
  };
}

// =============================================================================
// TorqueHelicoid Component
// =============================================================================
interface TorqueHelicoidProps {
  className?: string;
  /** "light" = blue text on white bg (default), "dark" = white text on transparent bg */
  variant?: "light" | "dark";
}

export function TorqueHelicoid({ className = "", variant = "light" }: TorqueHelicoidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;

    // ---- Renderer (offscreen canvas, AsciiEffect reads from it) ----
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: variant === "dark" });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    if (variant === "dark") renderer.setClearColor(0x000000, 0);

    // ---- ASCII Effect ----
    const ascii = new AsciiEffect(renderer, " .,:;+*?%T#@", {
      resolution: 0.15,
      scale: 1,
      color: false,
      alpha: false,
      invert: false,
    });
    ascii.setSize(w, h);
    el.appendChild(ascii.domElement);

    // Style the ASCII DOM output
    const isDark = variant === "dark";
    Object.assign(ascii.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      color: isDark ? "#ffffff" : "#0000FF",
      backgroundColor: "transparent",
      textShadow: isDark
        ? "0 0 3px rgba(255,255,255,0.25), 0 0 8px rgba(255,255,255,0.1)"
        : "0 0 3px rgba(0,0,255,0.35), 0 0 8px rgba(0,0,255,0.15)",
      cursor: "grab",
      userSelect: "none",
      WebkitUserSelect: "none",
    });

    // ---- Scene ----
    const scene = new THREE.Scene();
    scene.background = isDark ? null : new THREE.Color(0xffffff);

    // ---- Camera ----
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 4);

    // ---- Geometry ----
    const mobile = w < 768;
    const geo = makeHelicoid(mobile ? 60 : 100);
    geo.computeVertexNormals();

    // ---- Uniforms ----
    const uTime = { value: 0 };
    const uMouse = { value: new THREE.Vector2() };
    const uScroll = { value: 0 };

    // ---- Custom ShaderMaterial for full control over shading ----
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime,
        uMouse,
        uScroll,
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScroll;
        varying vec3 vNormal;
        varying vec3 vViewPos;

        mat2 rot2(float a) {
          float s = sin(a), c = cos(a);
          return mat2(c, -s, s, c);
        }

        void main() {
          vec3 pos = position;
          vec3 norm = normal;

          // Twist deformation (X mouse controls twist, Y mouse controls warp)
          float tw = 1.5 + uMouse.x * 0.8 + uScroll * 1.5;
          float ang = pos.y * tw + uTime * 0.3;
          pos.xz = rot2(ang) * pos.xz;
          norm.xz = rot2(ang) * norm.xz;

          // Vertical warp from mouse Y
          float vertWarp = uMouse.y * 0.5;
          pos.yz = rot2(vertWarp * pos.x) * pos.yz;
          norm.yz = rot2(vertWarp * pos.x) * norm.yz;

          // Breathing
          pos *= 1.0 + sin(uTime * 0.5) * 0.04;

          vNormal = normalize(normalMatrix * norm);
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          vViewPos = mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vViewPos;

        void main() {
          vec3 n = normalize(vNormal);
          vec3 viewDir = normalize(-vViewPos);

          // Key light — strong, from top-right
          vec3 keyDir = normalize(vec3(1.0, 0.8, 0.6));
          float key = max(dot(n, keyDir), 0.0);

          // Fill light — softer, opposite side
          vec3 fillDir = normalize(vec3(-0.7, -0.3, 0.5));
          float fill = max(dot(n, fillDir), 0.0) * 0.25;

          // Fresnel rim — bright edges facing away from camera
          float fresnel = pow(1.0 - abs(dot(n, viewDir)), 2.5);

          // Specular highlight
          vec3 halfDir = normalize(keyDir + viewDir);
          float spec = pow(max(dot(n, halfDir), 0.0), 32.0) * 0.4;

          // Compose: wide 0.0–1.0 range for ASCII variation
          float brightness = 0.03 + key * 0.55 + fill + fresnel * 0.3 + spec;

          // Invert: bright surface → dark pixel (dense ASCII chars)
          // dark surface → bright pixel (sparse/space chars)
          // This way lit faces show dense characters, shadows fade to nothing
          float inverted = 1.0 - clamp(brightness, 0.0, 1.0);

          gl_FragColor = vec4(vec3(inverted), 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    // Dark variant: rotate 90° on X so the helicoid lies horizontal (fills wide footer)
    if (isDark) mesh.rotation.x = Math.PI / 2;

    // ---- Drag-to-rotate manipulator ----
    const manip = createManipulator(el);
    manip.pivot.add(mesh);
    scene.add(manip.pivot);

    // Dark variant: pull camera back + widen FOV so it fills the full footer
    if (isDark) {
      camera.fov = 65;
      camera.position.set(0, 0, 3.2);
      camera.updateProjectionMatrix();
    }

    // ---- Animation Loop ----
    const clock = new THREE.Clock();
    let raf = 0;
    let dead = false;
    const targetMouse = new THREE.Vector2();
    const baseRotX = isDark ? Math.PI / 2 : 0;

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);

      const t = clock.getElapsedTime();
      uTime.value = t;

      // Update drag manipulator (applies inertia/friction)
      manip.update();

      // Update cursor style
      ascii.domElement.style.cursor = manip.dragging() ? "grabbing" : "grab";

      targetMouse.set(mouse.current.x, mouse.current.y);
      uMouse.value.lerp(targetMouse, 0.05);
      uScroll.value += (scroll.current - uScroll.value) * 0.05;

      // Slow idle auto-rotation (pauses during drag)
      if (!manip.dragging()) {
        mesh.rotation.y += 0.003;
      }
      mesh.rotation.x = baseRotX + Math.sin(t * 0.2) * 0.1 + mouse.current.y * 0.3;

      // Camera parallax from mouse (only when not dragging)
      if (!manip.dragging()) {
        camera.position.x +=
          (mouse.current.x * 0.4 - camera.position.x) * 0.02;
        camera.position.y +=
          (mouse.current.y * 0.3 - camera.position.y) * 0.02;
      }
      camera.lookAt(0, 0, 0);

      // Fade on scroll (only in light/hero mode)
      if (!isDark) {
        ascii.domElement.style.opacity = String(
          Math.max(0, 1 - scroll.current * 1.5)
        );
      }

      ascii.render(scene, camera);
    };
    tick();

    // ---- Event Handlers ----
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

    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      ascii.setSize(nw, nh);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ---- Cleanup ----
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      manip.dispose();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (el.contains(ascii.domElement)) el.removeChild(ascii.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    />
  );
}

export default TorqueHelicoid;
