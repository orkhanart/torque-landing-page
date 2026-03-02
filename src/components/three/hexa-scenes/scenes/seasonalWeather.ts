import * as THREE from "three";
import type {
  SceneFactory,
  SceneInstance,
  SceneContext,
  LogoGeometry,
  Viewport,
} from "../types";
import { FOV, CAM_Z } from "../utils";

// ---------------------------------------------------------------------------
// Seasonal Weather — rain/snow/wind/lightning particle system
// ---------------------------------------------------------------------------

type WeatherMode = "rain" | "snow" | "wind" | "lightning";

const PARTICLE_COUNT = 15000;
const MODES: WeatherMode[] = ["rain", "snow", "wind", "lightning"];
const MODE_DURATION = 8; // seconds per mode

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  scene.add(logo.root);

  // --- Particle system ---
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  const resetParticle = (i: number, mode: WeatherMode) => {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 6;
    positions[i3 + 1] = 3 + Math.random() * 2;
    positions[i3 + 2] = (Math.random() - 0.5) * 1;

    switch (mode) {
      case "rain":
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = -(3 + Math.random() * 2);
        velocities[i3 + 2] = 0;
        sizes[i] = 1.5;
        break;
      case "snow":
        velocities[i3] = (Math.random() - 0.5) * 0.3;
        velocities[i3 + 1] = -(0.3 + Math.random() * 0.5);
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
        sizes[i] = 2 + Math.random() * 2;
        break;
      case "wind":
        velocities[i3] = 2 + Math.random() * 3;
        velocities[i3 + 1] = -(0.5 + Math.random() * 0.5);
        velocities[i3 + 2] = 0;
        positions[i3] = -4;
        sizes[i] = 1;
        break;
      case "lightning":
        velocities[i3] = (Math.random() - 0.5) * 0.5;
        velocities[i3 + 1] = -(1 + Math.random() * 1.5);
        velocities[i3 + 2] = 0;
        sizes[i] = 1.5;
        break;
    }
  };

  // Initialize
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    resetParticle(i, "rain");
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // Spread initially
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color: 0xaaccff,
    size: 0.02,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // --- Lightning bolt geometry ---
  const boltGeo = new THREE.BufferGeometry();
  const boltMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
  });
  const bolt = new THREE.Line(boltGeo, boltMat);
  scene.add(bolt);

  // Flash plane for lightning
  const flashGeo = new THREE.PlaneGeometry(10, 10);
  const flashMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const flash = new THREE.Mesh(flashGeo, flashMat);
  flash.position.z = -1;
  scene.add(flash);

  let currentMode: WeatherMode = "rain";
  let lastClicks = ctx.input.clicks;
  let flashTimer = 0;

  const generateBolt = () => {
    const points: THREE.Vector3[] = [];
    let x = (Math.random() - 0.5) * 3;
    let y = 3;
    const segments = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < segments; i++) {
      points.push(new THREE.Vector3(x, y, 0.5));
      x += (Math.random() - 0.5) * 0.8;
      y -= (3 + Math.random()) / segments;
    }
    boltGeo.setFromPoints(points);
    boltMat.opacity = 1;
    flashMat.opacity = 0.4;
    flashTimer = 0.15;
  };

  return {
    scene,
    camera,
    clearColor: 0x0a0e14,

    tick(t, dt) {
      // Cycle modes
      const modeIdx = Math.floor(t / MODE_DURATION) % MODES.length;
      const newMode = MODES[modeIdx];
      if (newMode !== currentMode) {
        currentMode = newMode;
        material.color.set(
          currentMode === "snow" ? 0xeeeeff :
          currentMode === "wind" ? 0x99bbdd :
          currentMode === "lightning" ? 0xccddff :
          0xaaccff,
        );
      }

      // Click triggers lightning
      if (ctx.input.clicks !== lastClicks) {
        lastClicks = ctx.input.clicks;
        generateBolt();
      }

      // Auto-lightning in lightning mode
      if (currentMode === "lightning" && Math.random() < 0.005) {
        generateBolt();
      }

      // Update particles
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Apply velocity
        positions[i3] += velocities[i3] * dt;
        positions[i3 + 1] += velocities[i3 + 1] * dt;
        positions[i3 + 2] += velocities[i3 + 2] * dt;

        // Snow: add drift
        if (currentMode === "snow") {
          positions[i3] += Math.sin(t * 2 + i * 0.1) * 0.003;
        }

        // Reset when below scene
        if (positions[i3 + 1] < -3 || positions[i3] > 4) {
          resetParticle(i, currentMode);
        }
      }
      posAttr.needsUpdate = true;

      // Flash decay
      if (flashTimer > 0) {
        flashTimer -= dt;
        flashMat.opacity *= 0.85;
        boltMat.opacity *= 0.88;
      }

      // Logo subtle motion
      logo.root.rotation.y = ctx.input.smx * 0.08;
      logo.root.rotation.x = -ctx.input.smy * 0.06;

      // Dim logo materials slightly
      logo.root.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
          const mat = obj.material as THREE.MeshBasicMaterial;
          if (mat.color) {
            // Keep original colors but slightly muted in the weather
            mat.transparent = true;
            if ("opacity" in mat) mat.opacity = Math.max(0.5, mat.opacity);
          }
        }
      });
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
    },

    dispose() {
      geometry.dispose();
      material.dispose();
      boltGeo.dispose();
      boltMat.dispose();
      flashGeo.dispose();
      flashMat.dispose();
    },
  };
};

export default factory;
