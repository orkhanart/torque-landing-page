"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FooterLogoBgProps {
  className?: string;
}

const LAYER_CONFIG = [
  { src: "/logos/logoart-bg.svg", depth: 0.25 },
  { src: "/logos/logoart-structure.svg", depth: 0 },
  { src: "/logos/logoart-nodes.svg", depth: -0.25 },
];

const FOV = 50;
const CAM_Z = 2;
const MAX_TILT = 0.12; // radians (~7°)
const OVERSCALE = 1.2;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float getHeight(vec2 uv) {
    vec4 c = texture2D(uTexture, uv);
    float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    return c.a * (0.3 + lum * 0.7);
  }

  void main() {
    vec4 tex = texture2D(uTexture, vUv);

    if (tex.a < 0.01) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec2 texel = 1.0 / uResolution;
    float hL = getHeight(vUv - vec2(texel.x, 0.0));
    float hR = getHeight(vUv + vec2(texel.x, 0.0));
    float hD = getHeight(vUv - vec2(0.0, texel.y));
    float hU = getHeight(vUv + vec2(0.0, texel.y));

    float bumpStrength = 6.0;
    vec3 normal = normalize(vec3(
      (hL - hR) * bumpStrength,
      (hD - hU) * bumpStrength,
      1.0
    ));

    vec3 lightDir = normalize(vec3(
      uMouse.x * 1.5,
      uMouse.y * 1.5,
      0.8
    ));

    float ambient = 0.35;
    float diff = max(dot(normal, lightDir), 0.0);

    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 48.0);

    vec3 color = tex.rgb * (ambient + diff * 0.65) + vec3(1.0) * spec * 0.25;

    float edge = 1.0 - smoothstep(0.0, 0.05, abs(tex.a - 0.5));
    color += vec3(1.0) * edge * spec * 0.1;

    gl_FragColor = vec4(color, tex.a * 0.85);
  }
`;

interface LayerData {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  geo: THREE.PlaneGeometry;
  depth: number;
  imgW: number;
  imgH: number;
}

export function FooterLogoBg({ className = "" }: FooterLogoBgProps) {
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
    const vFov = (FOV * Math.PI) / 180;

    // ---- Renderer ----
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    Object.assign(renderer.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    });

    // ---- Scene & Camera (Perspective for real 3D depth) ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, w / h, 0.1, 10);
    camera.position.z = CAM_Z;

    // ---- Group for 3D rotation ----
    const group = new THREE.Group();
    scene.add(group);

    // ---- Build layers ----
    const layerData: LayerData[] = [];
    const textures: THREE.CanvasTexture[] = [];

    const scaleMesh = (ld: LayerData) => {
      if (!ld.imgW) return;
      const dist = CAM_Z - ld.depth;
      const viewH = 2 * dist * Math.tan(vFov / 2);
      const viewW = viewH * (w / h);
      const svgAspect = ld.imgW / ld.imgH;
      const viewAspect = w / h;

      if (svgAspect > viewAspect) {
        ld.mesh.scale.set(viewW * OVERSCALE, (viewW / svgAspect) * OVERSCALE, 1);
      } else {
        ld.mesh.scale.set((viewH * svgAspect) * OVERSCALE, viewH * OVERSCALE, 1);
      }
    };

    LAYER_CONFIG.forEach((layer, index) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uTexture: { value: new THREE.Texture() },
          uResolution: { value: new THREE.Vector2(w, h) },
        },
        transparent: true,
        depthWrite: false,
        vertexShader: VERT,
        fragmentShader: FRAG,
      });

      const geo = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = layer.depth;
      mesh.renderOrder = index;
      group.add(mesh);

      const ld: LayerData = { mesh, mat, geo, depth: layer.depth, imgW: 0, imgH: 0 };
      layerData.push(ld);

      // Load SVG as texture
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 2048;
        canvas.width = size;
        canvas.height = Math.round(size * (img.naturalHeight / img.naturalWidth));
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        mat.uniforms.uTexture.value = texture;
        mat.uniforms.uResolution.value.set(canvas.width, canvas.height);
        textures.push(texture);

        ld.imgW = img.naturalWidth;
        ld.imgH = img.naturalHeight;
        scaleMesh(ld);
      };
      img.src = layer.src;
    });

    // ---- Animation ----
    const clock = new THREE.Clock();
    const smoothMouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const currentTilt = new THREE.Vector2(0, 0);
    const targetTilt = new THREE.Vector2(0, 0);

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);

      const t = clock.getElapsedTime();
      targetMouse.set(mouse.current.x, mouse.current.y);
      smoothMouse.lerp(targetMouse, 0.04);

      // Idle floating animation
      const idleX = Math.sin(t * 0.3) * 0.025;
      const idleY = Math.cos(t * 0.4) * 0.02;
      const idleZ = Math.sin(t * 0.2) * 0.01;

      // 3D tilt rotation (mouse + idle drift)
      targetTilt.set(
        -smoothMouse.y * MAX_TILT + idleX,
        smoothMouse.x * MAX_TILT + idleY
      );
      currentTilt.lerp(targetTilt, 0.06);
      group.rotation.x = currentTilt.x;
      group.rotation.y = currentTilt.y;
      group.rotation.z = idleZ;

      // Update uniforms + per-layer z-breathing
      layerData.forEach((ld, i) => {
        ld.mat.uniforms.uTime.value = t;
        ld.mat.uniforms.uMouse.value.copy(smoothMouse);

        // Each layer breathes at its own frequency
        const breathFreq = 0.5 + i * 0.25;
        const breathAmp = 0.03;
        ld.mesh.position.z = ld.depth + Math.sin(t * breathFreq + i * 1.8) * breathAmp;
      });

      renderer.render(scene, camera);
    };
    tick();

    // ---- Events ----
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
      layerData.forEach(scaleMesh);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      layerData.forEach((ld) => {
        ld.geo.dispose();
        ld.mat.dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    />
  );
}
