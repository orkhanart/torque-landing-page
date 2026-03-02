"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
import {
  buildLogoGeometry,
  disposeLogoGeometry,
} from "./hexa-scenes/utils";

// =============================================================================
// FooterAsciiLogo — hexa logo rendered through AsciiEffect
// =============================================================================
export function FooterAsciiLogo({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;

    // ---- Renderer ----
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

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

    Object.assign(ascii.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      color: "#ffffff",
      backgroundColor: "transparent",
      textShadow: "0 0 3px rgba(255,255,255,0.25), 0 0 8px rgba(255,255,255,0.1)",
    });

    // ---- Scene ----
    const scene = new THREE.Scene();
    // null background → transparent, blue footer shows through

    // ---- Camera — close + wide FOV so logo fills the footer ----
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 2.8);

    // ---- Lighting (needed for MeshStandardMaterial on logo) ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.3);
    fill.position.set(-3, -2, -3);
    scene.add(fill);

    // ---- Build hexa logo geometry ----
    const logo = buildLogoGeometry();

    // Override all materials to a simple lit white for good ASCII contrast
    logo.root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.3,
          roughness: 0.5,
          side: THREE.DoubleSide,
        });
      }
    });

    scene.add(logo.root);

    // ---- Animation Loop ----
    const clock = new THREE.Clock();
    let raf = 0;
    let dead = false;
    const targetMouse = new THREE.Vector2();
    const smoothMouse = new THREE.Vector2();

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);

      const t = clock.getElapsedTime();

      targetMouse.set(mouse.current.x, mouse.current.y);
      smoothMouse.lerp(targetMouse, 0.05);

      // Root rotation + mouse parallax
      logo.root.rotation.y = t * 0.2 + smoothMouse.x * 0.3;
      logo.root.rotation.x = smoothMouse.y * 0.15;

      // Per-layer independent rotation in XYZ
      // Gradient layer — slow tumble
      logo.gradientGroup.rotation.x = Math.sin(t * 0.25) * 0.15;
      logo.gradientGroup.rotation.y = t * 0.12;
      logo.gradientGroup.rotation.z = Math.cos(t * 0.18) * 0.1;

      // Structure layer — medium orbit
      logo.structureGroup.rotation.x = Math.cos(t * 0.2) * 0.1;
      logo.structureGroup.rotation.y = t * -0.08;
      logo.structureGroup.rotation.z = Math.sin(t * 0.22) * 0.12;

      // Node layer — faster spin
      logo.nodeGroup.rotation.x = Math.sin(t * 0.35) * 0.2;
      logo.nodeGroup.rotation.y = t * 0.18;
      logo.nodeGroup.rotation.z = Math.cos(t * 0.3) * 0.15;

      // Per-element micro-rotation
      for (let i = 0; i < logo.elements.length; i++) {
        const el = logo.elements[i];
        const speed = 0.3 + i * 0.08;
        const offset = i * 1.7;
        el.group.rotation.z = Math.sin(t * speed + offset) * 0.2;
        el.group.rotation.x = Math.cos(t * speed * 0.7 + offset) * 0.1;
      }

      // Scale up + breathing
      const breath = 1.8 + Math.sin(t * 0.4) * 0.04;
      logo.root.scale.setScalar(breath);

      // Camera parallax
      camera.position.x += (smoothMouse.x * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (smoothMouse.y * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

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

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      ascii.setSize(nw, nh);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      disposeLogoGeometry(logo);
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
