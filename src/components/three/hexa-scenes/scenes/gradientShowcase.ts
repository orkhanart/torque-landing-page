import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type {
  SceneFactory,
  SceneInstance,
  SceneContext,
  LogoGeometry,
  Viewport,
} from "../types";
import { FOV, CAM_Z } from "../utils";

// ---------------------------------------------------------------------------
// Gradient Showcase — brand gradients mapped across 3D metallic logo
// ---------------------------------------------------------------------------

// Torque brand gradients (from design system)
interface GradientDef {
  name: string;
  stops: THREE.Color[];
}

const GRADIENTS: GradientDef[] = [
  {
    name: "Warm",
    stops: [new THREE.Color("#F1A3A1"), new THREE.Color("#7CC6FE")],
  },
  {
    name: "Aqua",
    stops: [new THREE.Color("#5DFDCB"), new THREE.Color("#7CC6FE")],
  },
  {
    name: "Primary",
    stops: [new THREE.Color("#0008FF"), new THREE.Color("#0006CC")],
  },
  {
    name: "Brand",
    stops: [
      new THREE.Color("#F4FAFF"),
      new THREE.Color("#5DFDCB"),
      new THREE.Color("#7CC6FE"),
    ],
  },
];

/** Sample a multi-stop gradient at position t (0-1) */
function sampleGradient(stops: THREE.Color[], t: number): THREE.Color {
  const clamped = Math.max(0, Math.min(1, t));
  if (stops.length === 1) return stops[0].clone();
  if (stops.length === 2) {
    return new THREE.Color().lerpColors(stops[0], stops[1], clamped);
  }
  // Multi-stop
  const segment = clamped * (stops.length - 1);
  const idx = Math.min(Math.floor(segment), stops.length - 2);
  const local = segment - idx;
  return new THREE.Color().lerpColors(stops[idx], stops[idx + 1], local);
}

interface TrackedMesh {
  mesh: THREE.Mesh;
  /** Projection value along gradient direction (normalized 0-1) */
  projNorm: number;
  currentColor: THREE.Color;
  targetColor: THREE.Color;
}

const factory: SceneFactory = (
  ctx: SceneContext,
  logo: LogoGeometry,
): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // Set all materials to metallic with high env intensity
  const meshes: TrackedMesh[] = [];
  logo.root.updateMatrixWorld(true);

  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const mat = obj.material as THREE.MeshStandardMaterial;
      if (mat.isMeshStandardMaterial) {
        mat.metalness = 0.9;
        mat.roughness = 0.12;
        mat.envMapIntensity = 2.0;
      }

      // Compute world-space center of this mesh for gradient mapping
      const box = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box.getCenter(center);

      meshes.push({
        mesh: obj,
        projNorm: 0,
        currentColor: mat.color.clone(),
        targetColor: mat.color.clone(),
      });
    }
  });

  scene.add(logo.root);

  // Compute projection bounds from all element centers
  const allCenters = logo.elements.map((e) => e.center);
  let gradIdx = 0;
  let lastClicks = ctx.input.clicks;

  // Gradient label overlay
  const labelDiv = document.createElement("div");
  labelDiv.style.cssText = `
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
    z-index: 10; padding: 6px 16px; border-radius: 6px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
    color: white; font-size: 13px; font-family: inherit;
    letter-spacing: 0.5px; pointer-events: none;
    transition: opacity 0.3s ease;
  `;
  labelDiv.textContent = GRADIENTS[gradIdx].name;
  ctx.container.appendChild(labelDiv);

  // Bloom
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(ctx.viewport.width, ctx.viewport.height),
    0.4,
    0.5,
    0.85,
  );
  composer.addPass(bloom);

  return {
    scene,
    camera,
    clearColor: 0x0a0a0e,
    customRender: true,

    tick(t) {
      // Click cycles gradient
      if (ctx.input.clicks !== lastClicks) {
        lastClicks = ctx.input.clicks;
        gradIdx = (gradIdx + 1) % GRADIENTS.length;
        labelDiv.textContent = GRADIENTS[gradIdx].name;
      }

      const grad = GRADIENTS[gradIdx];

      // Rotating gradient direction
      const angle = t * 0.15;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);

      // Project all centers onto gradient axis, find range
      let minProj = Infinity;
      let maxProj = -Infinity;
      for (const c of allCenters) {
        const proj = c.x * dirX + c.y * dirY;
        minProj = Math.min(minProj, proj);
        maxProj = Math.max(maxProj, proj);
      }
      const range = maxProj - minProj || 1;

      // Compute per-mesh gradient mapping
      for (const tm of meshes) {
        const box = new THREE.Box3().setFromObject(tm.mesh);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const proj = center.x * dirX + center.y * dirY;
        tm.projNorm = (proj - minProj) / range;

        // Target color from gradient
        tm.targetColor.copy(sampleGradient(grad.stops, tm.projNorm));

        // Smooth color interpolation
        tm.currentColor.lerp(tm.targetColor, 0.08);

        const mat = tm.mesh.material as THREE.MeshStandardMaterial;
        mat.color.copy(tm.currentColor);
      }

      // Slow rotation
      logo.root.rotation.y = t * 0.1;
      logo.root.rotation.x = Math.sin(t * 0.06) * 0.06;

      // Mouse parallax
      logo.root.rotation.y += ctx.input.smx * 0.12;
      logo.root.rotation.x += -ctx.input.smy * 0.08;

      // Camera
      camera.position.x = ctx.input.smx * 0.05;
      camera.position.y = ctx.input.smy * 0.05;
      camera.position.z = CAM_Z;

      composer.render();
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
      composer.setSize(vp.width, vp.height);
    },

    dispose() {
      composer.dispose();
      if (ctx.container.contains(labelDiv)) ctx.container.removeChild(labelDiv);
    },
  };
};

export default factory;
