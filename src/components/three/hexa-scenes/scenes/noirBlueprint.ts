import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import type {
  SceneFactory,
  SceneInstance,
  SceneContext,
  LogoGeometry,
  Viewport,
} from "../types";
import { FOV, CAM_Z } from "../utils";

// ---------------------------------------------------------------------------
// Noir Blueprint — cyan wireframe on dark bg, CRT scanlines, film grain
// ---------------------------------------------------------------------------

// CRT Scanline shader
const ScanlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uCount: { value: 400.0 },
    uIntensity: { value: 0.12 },
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
    uniform float uTime;
    uniform float uCount;
    uniform float uIntensity;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float scanline = sin(vUv.y * uCount + uTime * 2.0) * uIntensity;
      color.rgb -= scanline;

      // Vignette
      float dist = distance(vUv, vec2(0.5));
      color.rgb *= 1.0 - dist * 0.6;

      gl_FragColor = color;
    }
  `,
};

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // --- Convert all materials to cyan wireframe ---
  const cyanColor = new THREE.Color(0x00ffff);

  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const mat = obj.material as THREE.MeshBasicMaterial;
      mat.color.copy(cyanColor);
      mat.wireframe = true;
      mat.transparent = true;
      mat.opacity = 0.6;
      mat.depthWrite = false;
    }
    if (obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
      const mat = obj.material as THREE.LineBasicMaterial;
      mat.color.copy(cyanColor);
      mat.transparent = true;
      mat.opacity = 0.8;
    }
  });

  scene.add(logo.root);

  // --- Grid background ---
  const gridHelper = new THREE.GridHelper(8, 40, 0x003344, 0x001a22);
  gridHelper.rotation.x = Math.PI / 2;
  gridHelper.position.z = -0.5;
  scene.add(gridHelper);

  // --- Dimension annotation lines ---
  const annotationDisposables: { dispose(): void }[] = [];

  // Horizontal dimension line
  const hLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1.8, -2.3, 0),
    new THREE.Vector3(1.8, -2.3, 0),
  ]);
  const hLineMat = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.4,
  });
  scene.add(new THREE.Line(hLineGeo, hLineMat));
  annotationDisposables.push(hLineGeo, hLineMat);

  // Vertical dimension line
  const vLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-2.3, -2.0, 0),
    new THREE.Vector3(-2.3, 2.0, 0),
  ]);
  const vLineMat = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.4,
  });
  scene.add(new THREE.Line(vLineGeo, vLineMat));
  annotationDisposables.push(vLineGeo, vLineMat);

  // End ticks for dimension lines
  const tickSize = 0.1;
  const ticks = [
    [[-1.8, -2.3 - tickSize, 0], [-1.8, -2.3 + tickSize, 0]],
    [[1.8, -2.3 - tickSize, 0], [1.8, -2.3 + tickSize, 0]],
    [[-2.3 - tickSize, -2.0, 0], [-2.3 + tickSize, -2.0, 0]],
    [[-2.3 - tickSize, 2.0, 0], [-2.3 + tickSize, 2.0, 0]],
  ];
  for (const [a, b] of ticks) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...(a as [number, number, number])),
      new THREE.Vector3(...(b as [number, number, number])),
    ]);
    const m = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.4,
    });
    scene.add(new THREE.Line(g, m));
    annotationDisposables.push(g, m);
  }

  // --- CSS overlay labels ---
  const labelsDiv = document.createElement("div");
  labelsDiv.style.cssText = `
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 5;
  `;

  const createLabel = (text: string, bottom: string, left: string) => {
    const label = document.createElement("div");
    label.textContent = text;
    label.style.cssText = `
      position: absolute; bottom: ${bottom}; left: ${left};
      color: #00ffff; font-size: 10px; font-family: monospace;
      opacity: 0.5; letter-spacing: 1px;
    `;
    labelsDiv.appendChild(label);
  };

  createLabel("3.6 UNITS", "12%", "50%");
  createLabel("4.0 UNITS", "50%", "8%");
  createLabel("TORQUE LOGO v2.1", "5%", "5%");
  createLabel("SCALE 1:1", "5%", "80%");

  ctx.container.appendChild(labelsDiv);

  // --- Post-processing ---
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));

  const scanlinePass = new ShaderPass(ScanlineShader);
  composer.addPass(scanlinePass);

  const filmPass = new FilmPass(0.2);
  composer.addPass(filmPass);

  return {
    scene,
    camera,
    clearColor: 0x0a0a0a,
    customRender: true,

    tick(t) {
      // Slow auto-orbit
      logo.root.rotation.y = Math.sin(t * 0.08) * 0.15;
      logo.root.rotation.x = Math.cos(t * 0.06) * 0.08;

      // Mouse influence
      logo.root.rotation.y += ctx.input.smx * 0.08;
      logo.root.rotation.x += -ctx.input.smy * 0.06;

      scanlinePass.uniforms.uTime.value = t;

      composer.render();
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
      composer.setSize(vp.width, vp.height);
    },

    dispose() {
      for (const d of annotationDisposables) d.dispose();
      composer.dispose();
      if (ctx.container.contains(labelsDiv)) ctx.container.removeChild(labelsDiv);
    },
  };
};

export default factory;
