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
// TorqueHelicoid Component
// =============================================================================
interface TorqueHelicoidProps {
  className?: string;
}

export function TorqueHelicoid({ className = "" }: TorqueHelicoidProps) {
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
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // ---- ASCII Effect ----
    const ascii = new AsciiEffect(renderer, " .,:;+*?%S#@", {
      resolution: 0.15,
      scale: 1,
      color: false,
      alpha: false,
      invert: false,
    });
    ascii.setSize(w, h);
    el.appendChild(ascii.domElement);

    // Style the ASCII DOM output
    Object.assign(ascii.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      color: "#0000FF",
      backgroundColor: "transparent",
      textShadow: "0 0 3px rgba(0,0,255,0.35), 0 0 8px rgba(0,0,255,0.15)",
    });

    // ---- Scene ----
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

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

          // Twist deformation
          float tw = 1.5 + uMouse.x * 0.8 + uScroll * 1.5;
          float ang = pos.y * tw + uTime * 0.3;
          pos.xz = rot2(ang) * pos.xz;
          norm.xz = rot2(ang) * norm.xz;

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
    scene.add(mesh);

    // ---- Animation Loop ----
    const clock = new THREE.Clock();
    let raf = 0;
    let dead = false;
    const targetMouse = new THREE.Vector2();

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);

      const t = clock.getElapsedTime();
      uTime.value = t;

      targetMouse.set(mouse.current.x, mouse.current.y);
      uMouse.value.lerp(targetMouse, 0.05);
      uScroll.value += (scroll.current - uScroll.value) * 0.05;

      mesh.rotation.y += 0.003;
      mesh.rotation.x = Math.sin(t * 0.2) * 0.1;

      // Camera parallax from mouse
      camera.position.x +=
        (mouse.current.x * 0.4 - camera.position.x) * 0.02;
      camera.position.y +=
        (mouse.current.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Fade on scroll
      ascii.domElement.style.opacity = String(
        Math.max(0, 1 - scroll.current * 1.5)
      );

      ascii.render(scene, camera);
    };
    tick();

    // ---- Event Handlers ----
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ---- Cleanup ----
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
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
