'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  particleCount?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  connectionDistance?: number;
  showConnections?: boolean;
  mouseInteraction?: boolean;
  className?: string;
}

export default function ParticleField({
  particleCount = 150,
  color = '#000000',
  opacity = 0.4,
  speed = 0.2,
  connectionDistance = 100,
  showConnections = true,
  mouseInteraction = true,
  className = '',
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Orthographic camera for 2D-like effect
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000
    );
    camera.position.z = 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle positions and velocities
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const originalPositions: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = 0;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed,
          0
        )
      );

      originalPositions.push(new THREE.Vector3(x, y, z));
    }

    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 2,
      transparent: true,
      opacity: opacity,
      sizeAttenuation: false,
    });

    // Particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connection lines
    let lineGeometry: THREE.BufferGeometry | null = null;
    let lineMaterial: THREE.LineBasicMaterial | null = null;
    let lines: THREE.LineSegments | null = null;

    if (showConnections) {
      lineGeometry = new THREE.BufferGeometry();
      lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: opacity * 0.3,
      });
      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
    }

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left - width / 2;
      mouseRef.current.y = -(event.clientY - rect.top - height / 2);
    };

    if (mouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const positionAttribute = geometry.getAttribute('position');
      const positionArray = positionAttribute.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        let x = positionArray[i * 3];
        let y = positionArray[i * 3 + 1];

        // Add velocity
        x += velocities[i].x;
        y += velocities[i].y;

        // Mouse repulsion
        if (mouseInteraction) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 100;

          if (dist < repulsionRadius) {
            const force = (repulsionRadius - dist) / repulsionRadius;
            x += (dx / dist) * force * 2;
            y += (dy / dist) * force * 2;
          }
        }

        // Boundary wrapping
        if (x > width / 2) x = -width / 2;
        if (x < -width / 2) x = width / 2;
        if (y > height / 2) y = -height / 2;
        if (y < -height / 2) y = height / 2;

        positionArray[i * 3] = x;
        positionArray[i * 3 + 1] = y;
      }

      positionAttribute.needsUpdate = true;

      // Update connection lines
      if (showConnections && lineGeometry) {
        const linePositions: number[] = [];

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const x1 = positionArray[i * 3];
            const y1 = positionArray[i * 3 + 1];
            const x2 = positionArray[j * 3];
            const y2 = positionArray[j * 3 + 1];

            const dx = x1 - x2;
            const dy = y1 - y2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              linePositions.push(x1, y1, 0, x2, y2, 0);
            }
          }
        }

        lineGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(linePositions, 3)
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      if (mouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (lineGeometry) lineGeometry.dispose();
      if (lineMaterial) lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, color, opacity, speed, connectionDistance, showConnections, mouseInteraction]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
