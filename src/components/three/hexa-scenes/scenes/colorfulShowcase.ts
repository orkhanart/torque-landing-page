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
// Colorful Showcase — Torque design-system colors on 3D metallic geometry
// ---------------------------------------------------------------------------

// Design system palette
const BLUE = new THREE.Color("#0008FF"); // structure
const CYAN = new THREE.Color("#5DFDCB"); // nodes
const CORAL = new THREE.Color("#F1A3A1"); // gradients
const GRAY90 = new THREE.Color("#1A1F27"); // dark accents

// Per-element node colors to vary the palette
const NODE_COLORS = [
  new THREE.Color("#5DFDCB"), // cyan 40
  new THREE.Color("#7CC6FE"), // aqua
  new THREE.Color("#6666FF"), // blue 40
  new THREE.Color("#5DFDCB"),
  new THREE.Color("#F1A3A1"), // coral 40
  new THREE.Color("#3DDAA8"), // cyan 50
  new THREE.Color("#9999FF"), // blue 30
  new THREE.Color("#7CC6FE"),
  new THREE.Color("#F1A3A1"),
  new THREE.Color("#5DFDCB"),
];

interface TrackedElement {
  meshes: THREE.Mesh[];
  baseColor: THREE.Color;
  index: number;
}

const factory: SceneFactory = (
  ctx: SceneContext,
  logo: LogoGeometry,
): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // Apply design system colors per category
  const tracked: TrackedElement[] = [];
  let nodeIdx = 0;

  for (const el of logo.elements) {
    const meshes: THREE.Mesh[] = [];
    let baseColor: THREE.Color;

    if (el.category === "structure") {
      baseColor = BLUE.clone();
    } else if (el.category === "gradient") {
      baseColor = CORAL.clone();
    } else {
      baseColor = NODE_COLORS[nodeIdx % NODE_COLORS.length].clone();
      nodeIdx++;
    }

    el.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.color.copy(baseColor);
          mat.metalness = 0.85;
          mat.roughness = 0.18;
          mat.envMapIntensity = 1.8;
        }
        meshes.push(obj);
      }
    });

    tracked.push({
      meshes,
      baseColor,
      index: tracked.length,
    });
  }

  scene.add(logo.root);

  // Subtle bloom for glowing metallic colors
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(ctx.viewport.width, ctx.viewport.height),
    0.5,
    0.6,
    0.7,
  );
  composer.addPass(bloom);

  return {
    scene,
    camera,
    clearColor: 0x08090a,
    customRender: true,

    tick(t) {
      // Slow rotation
      logo.root.rotation.y = t * 0.1;
      logo.root.rotation.x = Math.sin(t * 0.07) * 0.06;

      // Mouse parallax
      logo.root.rotation.y += ctx.input.smx * 0.12;
      logo.root.rotation.x += -ctx.input.smy * 0.08;

      // Per-element animations
      for (const tr of tracked) {
        const phase = tr.index * 0.4;

        // Subtle brightness pulse
        const brightness = 1.0 + Math.sin(t * 0.8 + phase) * 0.12;
        for (const mesh of tr.meshes) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color
            .copy(tr.baseColor)
            .multiplyScalar(brightness);
        }
      }

      // Nodes — gentle scale pulse
      for (const el of logo.elements) {
        if (el.category === "node") {
          const phase = el.center.y * 2;
          el.group.scale.setScalar(
            1.0 + Math.sin(t * 1.2 + phase) * 0.06,
          );
        }
      }

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
    },
  };
};

export default factory;
