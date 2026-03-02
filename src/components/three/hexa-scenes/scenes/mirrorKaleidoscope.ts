import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import type {
  SceneFactory,
  SceneInstance,
  SceneContext,
  LogoGeometry,
  Viewport,
} from "../types";
import { FOV } from "../utils";

// ---------------------------------------------------------------------------
// Mirror Kaleidoscope — N-fold reflective symmetry with auto-rotation
// ---------------------------------------------------------------------------

// Kaleidoscope shader
const KaleidoShader = {
  uniforms: {
    tDiffuse: { value: null },
    uSides: { value: 6.0 },
    uAngle: { value: 0.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uSides;
    uniform float uAngle;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv - 0.5;
      float angle = atan(p.y, p.x) + uAngle;
      float radius = length(p);

      // Kaleidoscope fold
      float slice = 6.28318 / uSides;
      angle = mod(angle, slice);
      angle = abs(angle - slice * 0.5);

      p = vec2(cos(angle), sin(angle)) * radius + 0.5;
      gl_FragColor = texture2D(tDiffuse, p);
    }
  `,
};

const FOLD_STEPS = [3, 6, 12, 24];

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = 3; // Closer to logo for tunnel effect

  // Color the logo more vibrantly for kaleidoscope effect
  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const mat = obj.material as THREE.MeshBasicMaterial;
      const hsl = { h: 0, s: 0, l: 0 };
      mat.color.getHSL(hsl);
      mat.color.setHSL(hsl.h, Math.min(1, hsl.s * 1.5), Math.min(0.8, hsl.l * 1.3));
    }
    if (obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
      const mat = obj.material as THREE.LineBasicMaterial;
      mat.color.multiplyScalar(1.5);
    }
  });

  scene.add(logo.root);

  // Add some colored lights for visual interest
  const light1 = new THREE.PointLight(0xff6666, 1, 10);
  light1.position.set(2, 1, 2);
  scene.add(light1);
  const light2 = new THREE.PointLight(0x6666ff, 1, 10);
  light2.position.set(-2, -1, 2);
  scene.add(light2);

  // Post-processing
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));

  const kaleidoPass = new ShaderPass(KaleidoShader);
  composer.addPass(kaleidoPass);

  let foldIdx = 1; // Start at 6-fold
  let lastClicks = ctx.input.clicks;
  let baseZ = 3;

  return {
    scene,
    camera,
    clearColor: 0x080810,
    customRender: true,

    tick(t) {
      // Click cycles fold count
      if (ctx.input.clicks !== lastClicks) {
        lastClicks = ctx.input.clicks;
        foldIdx = (foldIdx + 1) % FOLD_STEPS.length;
      }

      // Smoothly interpolate sides
      const targetSides = FOLD_STEPS[foldIdx];
      kaleidoPass.uniforms.uSides.value +=
        (targetSides - kaleidoPass.uniforms.uSides.value) * 0.05;

      // Auto-rotation
      kaleidoPass.uniforms.uAngle.value = t * 0.2;

      // Hue shift via rotation
      logo.root.rotation.z = t * 0.3;
      logo.root.rotation.y = Math.sin(t * 0.2) * 0.3;
      logo.root.rotation.x = Math.cos(t * 0.15) * 0.2;

      camera.position.z = baseZ;

      // Mouse offset
      camera.position.x = ctx.input.smx * 0.2;
      camera.position.y = ctx.input.smy * 0.2;

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
