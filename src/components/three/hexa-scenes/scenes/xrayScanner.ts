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
// X-Ray Scanner — scan plane reveals wireframe vs solid
// ---------------------------------------------------------------------------

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // Soft ambient light
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(2, 3, 4);
  scene.add(dirLight);

  scene.add(logo.root);

  // Create scan plane (glowing horizontal line)
  const scanGeo = new THREE.PlaneGeometry(6, 0.02);
  const scanMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const scanPlane = new THREE.Mesh(scanGeo, scanMat);
  scanPlane.position.z = 0.5;
  scene.add(scanPlane);

  // Scan glow — wider faint plane
  const glowGeo = new THREE.PlaneGeometry(6, 0.15);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glowPlane = new THREE.Mesh(glowGeo, glowMat);
  glowPlane.position.z = 0.5;
  scene.add(glowPlane);

  // Track all materials for scan-line effect
  interface TrackedMat {
    mat: THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
    origColor: THREE.Color;
    origOpacity: number;
    yCenter: number;
  }
  const tracked: TrackedMat[] = [];

  for (const el of logo.elements) {
    el.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
        const mat = obj.material as THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
        tracked.push({
          mat,
          origColor: mat.color.clone(),
          origOpacity: (mat as THREE.MeshBasicMaterial).opacity ?? 1,
          yCenter: el.center.y,
        });
      }
    });
  }

  // Post-processing
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(ctx.viewport.width, ctx.viewport.height),
    0.6, // strength
    0.4, // radius
    0.85, // threshold
  );
  composer.addPass(bloom);

  let scanY = 0;

  return {
    scene,
    camera,
    clearColor: 0x050510,
    customRender: true,

    tick(t) {
      // Scan plane follows mouse Y (mapped to logo height range)
      const targetY = ctx.input.smy * 2.2;
      scanY += (targetY - scanY) * 0.08;
      scanPlane.position.y = scanY;
      glowPlane.position.y = scanY;

      // Update element materials based on scan position
      for (const tr of tracked) {
        const diff = tr.yCenter - scanY;
        const absDiff = Math.abs(diff);

        if (absDiff < 0.1) {
          // On the scan line — bright cyan glow
          tr.mat.color.set(0x00ffff);
          if ("opacity" in tr.mat) {
            (tr.mat as THREE.MeshBasicMaterial).opacity = 1;
            (tr.mat as THREE.MeshBasicMaterial).transparent = true;
          }
        } else if (diff > 0) {
          // Above scan — ghosted wireframe look
          tr.mat.color.copy(tr.origColor).multiplyScalar(0.3);
          if ("opacity" in tr.mat) {
            (tr.mat as THREE.MeshBasicMaterial).opacity = 0.2;
            (tr.mat as THREE.MeshBasicMaterial).transparent = true;
          }
        } else {
          // Below scan — full color revealed
          tr.mat.color.copy(tr.origColor);
          if ("opacity" in tr.mat) {
            (tr.mat as THREE.MeshBasicMaterial).opacity = tr.origOpacity;
          }
        }
      }

      // Subtle tilt
      logo.root.rotation.x = -ctx.input.smy * 0.06;
      logo.root.rotation.y = ctx.input.smx * 0.08 + Math.sin(t * 0.2) * 0.03;

      composer.render();
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
      composer.setSize(vp.width, vp.height);
    },

    dispose() {
      scanGeo.dispose();
      scanMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      composer.dispose();
    },
  };
};

export default factory;
