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
// Chrome Showcase — bright silver chrome on white, text-reflected environment
// ---------------------------------------------------------------------------

const factory: SceneFactory = (
  ctx: SceneContext,
  logo: LogoGeometry,
): SceneInstance => {
  const scene = new THREE.Scene();
  scene.background = null; // transparent — gradient plane provides bg
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // ---- Fullscreen gradient plane behind logo ----
  const gradGeo = new THREE.PlaneGeometry(2, 2);
  const gradMat = new THREE.ShaderMaterial({
    uniforms: {
      uColorTop:    { value: new THREE.Color(0xeeeee8) }, // warm gray
      uColorBottom: { value: new THREE.Color(0xffffff) }, // white
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy * 2.0, 0.9999, 1.0); // fullscreen NDC quad, far plane
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorTop;
      uniform vec3 uColorBottom;
      varying vec2 vUv;
      void main() {
        vec3 col = mix(uColorBottom, uColorTop, vUv.y);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    depthTest: false,
    depthWrite: false,
  });
  const gradQuad = new THREE.Mesh(gradGeo, gradMat);
  gradQuad.frustumCulled = false;
  gradQuad.renderOrder = -1;
  scene.add(gradQuad);

  // Bright silver chrome — high reflectivity for text env reflections
  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const mat = obj.material as THREE.MeshStandardMaterial;
      if (mat.isMeshStandardMaterial) {
        mat.color.set(0xf0f0f5);
        mat.metalness = 1.0;
        mat.roughness = 0.04;
        mat.envMapIntensity = 2.5;
      }
    }
  });

  scene.add(logo.root);

  // Subtle bloom — high threshold so only specular highlights glow
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(ctx.viewport.width, ctx.viewport.height),
    0.15,
    0.4,
    0.97,
  );
  composer.addPass(bloom);

  return {
    scene,
    camera,
    clearColor: 0xffffff,
    customRender: true,

    tick(t) {
      // Mouse parallax — Y only so scroll turn-around stays clean
      logo.root.rotation.y = ctx.input.smx * 0.15;

      // Subtle scale breathing
      const breath = 1.0 + Math.sin(t * 0.4) * 0.008;
      logo.root.scale.setScalar(breath);

      // Camera subtle drift
      camera.position.x = ctx.input.smx * 0.06;
      camera.position.y = ctx.input.smy * 0.06;

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
      gradGeo.dispose();
      gradMat.dispose();
    },
  };
};

export default factory;
