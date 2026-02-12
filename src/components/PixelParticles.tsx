"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface PixelParticlesProps {
  className?: string;
}

const PixelParticles: React.FC<PixelParticlesProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    container.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    // Colors
    const cyan = new THREE.Color(0xABFFFF);
    const dark = new THREE.Color(0x0A0F1C);
    const mid = new THREE.Color(0x3D6B7D);

    for (let i = 0; i < particleCount; i++) {
      // Position - spread in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Color - mix between colors based on depth
      const colorMix = Math.random();
      const color = colorMix < 0.3 ? cyan : colorMix < 0.6 ? mid : dark;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size - varying
      sizes[i] = Math.random() * 3 + 1;

      // Speed for animation
      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for square particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vColor = color;

          vec3 pos = position;

          // Subtle floating motion
          pos.y += sin(uTime * 0.5 + position.x * 0.1) * 0.5;
          pos.x += cos(uTime * 0.3 + position.y * 0.1) * 0.3;

          // Mouse influence - particles drift away from cursor
          vec2 mouseWorld = uMouse * 20.0;
          float dist = length(pos.xy - mouseWorld);
          float influence = 1.0 - smoothstep(0.0, 15.0, dist);
          pos.xy += normalize(pos.xy - mouseWorld + 0.001) * influence * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (20.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          // Square particles
          vec2 coord = gl_PointCoord - 0.5;
          if (abs(coord.x) > 0.4 || abs(coord.y) > 0.4) discard;

          gl_FragColor = vec4(vColor, 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

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
      material.uniforms.uTime.value += 0.016;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Subtle camera movement
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.02;
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

export default PixelParticles;
