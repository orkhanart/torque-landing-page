import * as THREE from "three";
import gsap from "gsap";
import type {
  SceneFactory,
  SceneInstance,
  SceneContext,
  LogoGeometry,
  Viewport,
} from "../types";
import { FOV, CAM_Z } from "../utils";

// ---------------------------------------------------------------------------
// Particle Disintegration — 50k points morph between scattered & formed
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 50000;

const vertexShader = /* glsl */ `
attribute vec3 aTarget;
attribute vec3 aRandom;
uniform float uMorph;
uniform float uTime;

varying float vDist;

void main() {
  // Mix between random scatter and target (logo surface)
  vec3 scattered = aRandom * 4.0;
  scattered += vec3(
    sin(uTime * 0.3 + aRandom.x * 6.28) * 0.5,
    cos(uTime * 0.2 + aRandom.y * 6.28) * 0.5,
    sin(uTime * 0.25 + aRandom.z * 6.28) * 0.3
  );

  vec3 pos = mix(scattered, aTarget, uMorph);
  vDist = length(pos.xy);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = mix(1.5, 2.5, uMorph) * (300.0 / -mvPos.z);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColor;
varying float vDist;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, d);
  gl_FragColor = vec4(uColor, alpha * 0.8);
}
`;

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // Sample target positions from logo meshes
  const targetPositions: number[] = [];
  const meshes: THREE.Mesh[] = [];

  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      meshes.push(obj);
    }
  });

  // Collect all vertices from meshes as potential targets
  const allVertices: THREE.Vector3[] = [];
  for (const mesh of meshes) {
    const pos = mesh.geometry.getAttribute("position");
    if (!pos) continue;
    mesh.updateWorldMatrix(true, false);
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
      v.applyMatrix4(mesh.matrixWorld);
      allVertices.push(v);
    }
  }

  // Also sample line vertices
  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
      const pos = obj.geometry.getAttribute("position");
      if (!pos) return;
      obj.updateWorldMatrix(true, false);
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        v.applyMatrix4(obj.matrixWorld);
        allVertices.push(v);
      }
    }
  });

  // Fill target positions by cycling through available vertices
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    if (allVertices.length > 0) {
      const v = allVertices[i % allVertices.length];
      // Add slight randomness to prevent exact overlap
      targetPositions.push(
        v.x + (Math.random() - 0.5) * 0.02,
        v.y + (Math.random() - 0.5) * 0.02,
        v.z + (Math.random() - 0.5) * 0.02,
      );
    } else {
      targetPositions.push(0, 0, 0);
    }
  }

  // Random positions
  const randomPositions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    randomPositions[i] = (Math.random() - 0.5) * 2;
  }

  // Initial positions (same as targets for now)
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    positions[i] = targetPositions[i] || 0;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aTarget", new THREE.Float32BufferAttribute(targetPositions, 3));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomPositions, 3));

  const uniforms = {
    uMorph: { value: 1.0 },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0x4857a3) },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Hide original logo
  logo.root.visible = false;

  // GSAP morph state
  const state = { morph: 1.0 };
  let lastClicks = ctx.input.clicks;

  // Start formed, click to scatter
  let formed = true;

  return {
    scene,
    camera,
    clearColor: 0x050510,

    tick(t) {
      uniforms.uTime.value = t;
      uniforms.uMorph.value = state.morph;

      // Click toggles morph
      if (ctx.input.clicks !== lastClicks) {
        lastClicks = ctx.input.clicks;
        formed = !formed;
        gsap.to(state, {
          morph: formed ? 1.0 : 0.0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      }

      // Subtle rotation
      points.rotation.y = t * 0.05;
      points.rotation.x = ctx.input.smy * 0.1;
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
    },

    dispose() {
      geometry.dispose();
      material.dispose();
      gsap.killTweensOf(state);
    },
  };
};

export default factory;
