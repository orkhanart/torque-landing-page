"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface DitheredTerrainProps {
  className?: string;
}

// Bayer 4x4 dither matrix
const bayerMatrix = `
  const int bayer[16] = int[16](
    0, 8, 2, 10,
    12, 4, 14, 6,
    3, 11, 1, 9,
    15, 7, 13, 5
  );
`;

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;

  uniform float uTime;
  uniform vec2 uMouse;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Multiple octaves of noise for terrain
    float elevation = 0.0;
    elevation += snoise(pos.xy * 0.5 + uTime * 0.1) * 0.5;
    elevation += snoise(pos.xy * 1.0 + uTime * 0.05) * 0.25;
    elevation += snoise(pos.xy * 2.0) * 0.125;

    // Mouse influence
    float mouseInfluence = 1.0 - smoothstep(0.0, 2.0, length(pos.xy - uMouse * 3.0));
    elevation += mouseInfluence * 0.3;

    pos.z = elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader with dithering
const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;

  uniform vec2 uResolution;

  ${bayerMatrix}

  // Color palette
  vec3 color1 = vec3(0.04, 0.06, 0.11); // Dark blue-gray #0A0F1C
  vec3 color2 = vec3(0.67, 1.0, 1.0);   // Cyan #ABFFFF
  vec3 color3 = vec3(0.2, 0.4, 0.5);    // Mid tone

  float dither(vec2 pos, float value) {
    int x = int(mod(pos.x, 4.0));
    int y = int(mod(pos.y, 4.0));
    int index = x + y * 4;
    float threshold = float(bayer[index]) / 16.0;
    return step(threshold, value);
  }

  void main() {
    vec2 pixelPos = gl_FragCoord.xy;

    // Pixelate
    float pixelSize = 3.0;
    pixelPos = floor(pixelPos / pixelSize);

    // Map elevation to color
    float t = (vElevation + 1.0) * 0.5; // Normalize to 0-1
    t = clamp(t, 0.0, 1.0);

    // Dithered color selection
    vec3 finalColor;

    if (t < 0.5) {
      float localT = t * 2.0;
      float dithered = dither(pixelPos, localT);
      finalColor = mix(color1, color3, dithered);
    } else {
      float localT = (t - 0.5) * 2.0;
      float dithered = dither(pixelPos, localT);
      finalColor = mix(color3, color2, dithered);
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const DitheredTerrain: React.FC<DitheredTerrainProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, -2, 2.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Keep pixelated
    container.appendChild(renderer.domElement);

    // Terrain geometry
    const geometry = new THREE.PlaneGeometry(8, 8, 128, 128);

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      side: THREE.DoubleSide,
    });

    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI * 0.3;
    scene.add(terrain);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / width) * 2 - 1,
        y: -((e.clientY - rect.top) / height) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      material.uniforms.uTime.value += 0.01;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Subtle camera movement based on mouse
      camera.position.x = mouseRef.current.x * 0.3;
      camera.position.y = -2 + mouseRef.current.y * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      material.uniforms.uResolution.value.set(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
};

export default DitheredTerrain;
