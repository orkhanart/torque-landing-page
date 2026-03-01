"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

interface AsciiPortraitProps {
  src: string;
  alt?: string;
  className?: string;
}

export function AsciiPortrait({ src, alt = "", className = "" }: AsciiPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let w = el.clientWidth;
    let h = el.clientHeight;
    if (!w || !h) return;

    let dead = false;
    let raf = 0;
    let hoverTarget = 0;

    // Renderer (offscreen — AsciiEffect reads from it)
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(1);

    // ASCII Effect — higher resolution for portrait detail
    const ascii = new AsciiEffect(renderer, " .,:;+*?%T#@", {
      resolution: 0.22,
      scale: 1,
      color: false,
      alpha: false,
      invert: true,
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
      color: "#888888",
      backgroundColor: "white",
      textShadow: "none",
      transition: "color 0.5s ease, text-shadow 0.5s ease",
    });

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Orthographic camera
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    // Uniforms
    const uTime = { value: 0 };
    const uHover = { value: 0 };

    // Shader material with idle + hover effects
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime,
        uHover,
        uTexture: { value: null },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uHover;
        uniform sampler2D uTexture;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;

          // --- Hover: horizontal glitch displacement ---
          float glitchStrength = uHover * 0.025;
          float row = floor(uv.y * 60.0);
          float glitchRand = hash(vec2(row, floor(uTime * 8.0)));
          // Only glitch ~30% of rows at a time
          float glitchMask = step(0.7, glitchRand);
          uv.x += glitchMask * glitchStrength * (hash(vec2(row, uTime)) - 0.5) * 2.0;

          // --- Hover: wave distortion ---
          float wave = sin(uv.y * 20.0 + uTime * 4.0) * 0.006 * uHover;
          uv.x += wave;

          vec4 tex = texture2D(uTexture, uv);
          float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

          // Idle: subtle scan line
          float scan = sin(vUv.y * 40.0 - uTime * 1.5) * 0.03;

          // Idle: subtle flicker noise
          float noise = (hash(vUv * 100.0 + uTime * 0.3) - 0.5) * 0.04;

          // Idle: gentle breathing
          float breath = sin(uTime * 0.8) * 0.02;

          // --- Hover: intensify effects ---
          // Stronger scan lines on hover
          float hoverScan = sin(vUv.y * 80.0 - uTime * 6.0) * 0.06 * uHover;

          // Heavier noise on hover
          float hoverNoise = (hash(vUv * 200.0 + uTime * 2.0) - 0.5) * 0.1 * uHover;

          // Contrast boost on hover (push darks darker, lights lighter)
          float contrast = 1.0 + uHover * 0.4;

          float brightness = gray + scan + noise + breath + hoverScan + hoverNoise;
          brightness = (brightness - 0.5) * contrast + 0.5;
          brightness = clamp(brightness, 0.0, 1.0);

          gl_FragColor = vec4(vec3(brightness), 1.0);
        }
      `,
    });

    // Plane
    const geo = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.load(src, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      mat.uniforms.uTexture.value = texture;

      const imgAspect = texture.image.width / texture.image.height;
      const containerAspect = w / h;
      if (imgAspect > containerAspect) {
        mesh.scale.set(imgAspect / containerAspect, 1, 1);
      } else {
        mesh.scale.set(1, containerAspect / imgAspect, 1);
      }
    });

    // Animation loop
    const clock = new THREE.Clock();

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);

      uTime.value = clock.getElapsedTime();

      // Smooth lerp hover 0↔1
      hoverRef.current += (hoverTarget - hoverRef.current) * 0.08;
      uHover.value = hoverRef.current;

      ascii.render(scene, camera);
    };
    tick();

    // Hover events — also transition color gray → blue
    const onEnter = () => {
      hoverTarget = 1;
      ascii.domElement.style.color = "#0008FF";
      ascii.domElement.style.textShadow = "0 0 3px rgba(0,8,255,0.35), 0 0 8px rgba(0,8,255,0.15)";
    };
    const onLeave = () => {
      hoverTarget = 0;
      ascii.domElement.style.color = "#888888";
      ascii.domElement.style.textShadow = "none";
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // Resize
    const onResize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      if (!w || !h) return;

      ascii.setSize(w, h);

      const texture = mat.uniforms.uTexture.value;
      if (texture) {
        const imgAspect = texture.image.width / texture.image.height;
        const containerAspect = w / h;
        if (imgAspect > containerAspect) {
          mesh.scale.set(imgAspect / containerAspect, 1, 1);
        } else {
          mesh.scale.set(1, containerAspect / imgAspect, 1);
        }
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      const texture = mat.uniforms.uTexture.value;
      if (texture) texture.dispose();
      renderer.dispose();
      if (el.contains(ascii.domElement)) el.removeChild(ascii.domElement);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="img"
      aria-label={alt}
    />
  );
}
