import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import type {
  SceneFactory,
  SceneInstance,
  SceneContext,
  LogoGeometry,
  Viewport,
} from "../types";
import { FOV, CAM_Z } from "../utils";

// ---------------------------------------------------------------------------
// Typographic Collapse — morph between logo vertices and "TORQUE" text
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
attribute vec3 aLogoPos;
attribute vec3 aTextPos;
uniform float uMorph;
uniform float uTime;

varying float vMorph;

void main() {
  vMorph = uMorph;

  vec3 pos = mix(aLogoPos, aTextPos, uMorph);

  // Add wave perturbation during morph
  float midMorph = sin(uMorph * 3.14159);
  pos.z += sin(pos.x * 4.0 + uTime * 2.0) * midMorph * 0.08;
  pos.y += cos(pos.y * 3.0 + uTime * 1.5) * midMorph * 0.05;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = 2.0 * (300.0 / -mvPos.z);
}
`;

const fragmentShader = /* glsl */ `
uniform float uMorph;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  // Color lerp: indigo → coral
  vec3 indigo = vec3(0.282, 0.341, 0.639);
  vec3 coral = vec3(0.949, 0.639, 0.631);
  vec3 color = mix(indigo, coral, uMorph);

  float alpha = smoothstep(0.5, 0.15, d);
  gl_FragColor = vec4(color, alpha * 0.9);
}
`;

const POINT_COUNT = 15000;

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // Collect logo vertices
  const logoVertices: THREE.Vector3[] = [];
  logo.root.updateMatrixWorld(true);
  logo.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
      const pos = obj.geometry.getAttribute("position");
      if (!pos) return;
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        v.applyMatrix4(obj.matrixWorld);
        logoVertices.push(v);
      }
    }
  });

  // Hide original logo
  logo.root.visible = false;

  // Placeholder text vertices — filled when font loads
  const textVertices: THREE.Vector3[] = [];

  // Build point arrays
  const logoPositions = new Float32Array(POINT_COUNT * 3);
  const textPositions = new Float32Array(POINT_COUNT * 3);

  // Fill logo positions
  for (let i = 0; i < POINT_COUNT; i++) {
    if (logoVertices.length > 0) {
      const v = logoVertices[i % logoVertices.length];
      logoPositions[i * 3] = v.x + (Math.random() - 0.5) * 0.015;
      logoPositions[i * 3 + 1] = v.y + (Math.random() - 0.5) * 0.015;
      logoPositions[i * 3 + 2] = v.z + (Math.random() - 0.5) * 0.01;
    }
  }

  // Initial text positions (will be updated when font loads)
  textPositions.set(logoPositions);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(logoPositions, 3));
  geometry.setAttribute("aLogoPos", new THREE.Float32BufferAttribute(logoPositions, 3));
  geometry.setAttribute("aTextPos", new THREE.Float32BufferAttribute(textPositions, 3));

  const uniforms = {
    uMorph: { value: 0 },
    uTime: { value: 0 },
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

  // Load font and extract text vertices
  const fontLoader = new FontLoader();
  fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
    const textGeo = new TextGeometry("TORQUE", {
      font,
      size: 0.8,
      depth: 0.01, // Use depth instead of deprecated height
      curveSegments: 12,
    });
    textGeo.computeBoundingBox();
    textGeo.center();

    // Sample vertices from text geometry
    const tPos = textGeo.getAttribute("position");
    for (let i = 0; i < tPos.count; i++) {
      textVertices.push(new THREE.Vector3(tPos.getX(i), tPos.getY(i), tPos.getZ(i)));
    }

    // Fill text positions
    const attr = geometry.getAttribute("aTextPos") as THREE.BufferAttribute;
    for (let i = 0; i < POINT_COUNT; i++) {
      if (textVertices.length > 0) {
        const v = textVertices[i % textVertices.length];
        attr.setXYZ(
          i,
          v.x + (Math.random() - 0.5) * 0.01,
          v.y + (Math.random() - 0.5) * 0.01,
          v.z + (Math.random() - 0.5) * 0.01,
        );
      }
    }
    attr.needsUpdate = true;

    textGeo.dispose();
  });

  return {
    scene,
    camera,
    clearColor: 0x0a0a14,

    tick(t) {
      uniforms.uTime.value = t;
      // Auto-morph oscillation
      uniforms.uMorph.value = (Math.sin(t * 0.3) + 1) * 0.5;

      // Gentle rotation
      points.rotation.y = Math.sin(t * 0.15) * 0.1;
      points.rotation.x = ctx.input.smy * 0.05;
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
    },

    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
};

export default factory;
