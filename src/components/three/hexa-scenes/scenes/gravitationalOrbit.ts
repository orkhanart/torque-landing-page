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
// Gravitational Orbit — inner hex = sun, nodes orbit, trails + nebula
// ---------------------------------------------------------------------------

interface Orbiter {
  group: THREE.Group;
  angle: number;
  radius: number;
  speed: number;
  /** Trail positions ring buffer */
  trail: THREE.Vector3[];
  trailLine: THREE.Line;
  trailGeo: THREE.BufferGeometry;
}

const TRAIL_LENGTH = 60;

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  // --- Sun (inner hexagon) — glowing center ---
  const sunGeo = new THREE.CircleGeometry(0.18, 32);
  const sunMat = new THREE.MeshBasicMaterial({
    color: 0xffaa33,
    transparent: true,
    opacity: 0.9,
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.z = 0.1;
  scene.add(sun);

  // Sun glow
  const glowGeo = new THREE.CircleGeometry(0.35, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffcc66,
    transparent: true,
    opacity: 0.15,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.z = 0.05;
  scene.add(glow);

  // --- Structure elements as dashed orbital guides ---
  const structures = logo.elements.filter((e) => e.category === "structure");
  for (const el of structures) {
    el.group.traverse((obj) => {
      if (obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
        const mat = obj.material as THREE.LineBasicMaterial;
        mat.color.set(0x334466);
        // Can't convert to dashed easily, just dim the color
        if ("opacity" in mat) {
          (mat as THREE.LineBasicMaterial & { opacity: number }).opacity = 0.3;
          mat.transparent = true;
        }
      }
    });
  }
  scene.add(logo.root);

  // Hide gradients — replace with nebula particles
  logo.gradientGroup.visible = false;

  // --- Nebula particles ---
  const nebulaCount = 2000;
  const nebPositions = new Float32Array(nebulaCount * 3);
  const nebColors = new Float32Array(nebulaCount * 3);
  const nebSpeeds = new Float32Array(nebulaCount);

  for (let i = 0; i < nebulaCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.8 + Math.random() * 2.5;
    nebPositions[i * 3] = Math.cos(angle) * r;
    nebPositions[i * 3 + 1] = Math.sin(angle) * r;
    nebPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    nebSpeeds[i] = 0.1 + Math.random() * 0.3;

    // Color: mix coral and indigo
    const t = Math.random();
    nebColors[i * 3] = 0.3 + t * 0.6; // R
    nebColors[i * 3 + 1] = 0.2 + (1 - t) * 0.4; // G
    nebColors[i * 3 + 2] = 0.5 + (1 - t) * 0.3; // B
  }

  const nebulaGeo = new THREE.BufferGeometry();
  nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebPositions, 3));
  nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebColors, 3));
  const nebulaMat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const nebula = new THREE.Points(nebulaGeo, nebulaMat);
  scene.add(nebula);

  // --- Orbiting nodes ---
  const nodes = logo.elements.filter((e) => e.category === "node");
  const orbiters: Orbiter[] = [];
  const disposables: { dispose(): void }[] = [sunGeo, sunMat, glowGeo, glowMat, nebulaGeo, nebulaMat];

  nodes.forEach((node, i) => {
    const radius = 0.6 + i * 0.18;
    const speed = 0.3 + i * 0.08;
    const angle = (i / nodes.length) * Math.PI * 2;

    // Trail
    const trail: THREE.Vector3[] = [];
    for (let j = 0; j < TRAIL_LENGTH; j++) {
      trail.push(new THREE.Vector3(
        Math.cos(angle - j * 0.02) * radius,
        Math.sin(angle - j * 0.02) * radius,
        0,
      ));
    }
    const trailGeo = new THREE.BufferGeometry().setFromPoints(trail);
    const trailMat = new THREE.LineBasicMaterial({
      color: 0x4857a3,
      transparent: true,
      opacity: 0.3,
    });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    scene.add(trailLine);
    disposables.push(trailGeo, trailMat);

    orbiters.push({ group: node.group, angle, radius, speed, trail, trailLine, trailGeo });
  });

  // Post-processing
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(ctx.viewport.width, ctx.viewport.height),
    1.0, 0.4, 0.2,
  );
  composer.addPass(bloom);

  // Gravitational center offset by mouse
  const gravCenter = new THREE.Vector2(0, 0);

  return {
    scene,
    camera,
    clearColor: 0x020208,
    customRender: true,

    tick(t, dt) {
      // Shift gravity center with mouse
      gravCenter.set(ctx.input.smx * 0.3, ctx.input.smy * 0.3);

      // Sun pulsing
      const pulse = 1.0 + Math.sin(t * 2) * 0.1;
      sun.scale.setScalar(pulse);
      glow.scale.setScalar(pulse * 1.3);
      sun.position.set(gravCenter.x, gravCenter.y, 0.1);
      glow.position.set(gravCenter.x, gravCenter.y, 0.05);

      // Orbit nodes
      for (const orb of orbiters) {
        orb.angle += orb.speed * dt;
        const x = gravCenter.x + Math.cos(orb.angle) * orb.radius;
        const y = gravCenter.y + Math.sin(orb.angle) * orb.radius;

        orb.group.position.set(x - orb.group.parent!.position.x, y, 0);

        // Update trail
        orb.trail.unshift(new THREE.Vector3(x, y, 0));
        if (orb.trail.length > TRAIL_LENGTH) orb.trail.pop();
        orb.trailGeo.setFromPoints(orb.trail);
      }

      // Rotate nebula
      nebula.rotation.z = t * 0.02;
      // Animate nebula positions slightly
      const nbPos = nebulaGeo.getAttribute("position");
      for (let i = 0; i < nebulaCount; i++) {
        const angle = Math.atan2(
          nbPos.getY(i) - gravCenter.y,
          nbPos.getX(i) - gravCenter.x,
        );
        const speed = nebSpeeds[i] * dt;
        nbPos.setX(i, nbPos.getX(i) + Math.cos(angle + Math.PI * 0.5) * speed * 0.1);
        nbPos.setY(i, nbPos.getY(i) + Math.sin(angle + Math.PI * 0.5) * speed * 0.1);
      }
      nbPos.needsUpdate = true;

      // Camera subtle movement
      camera.position.x = gravCenter.x * 0.1;
      camera.position.y = gravCenter.y * 0.1;

      composer.render();
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
      composer.setSize(vp.width, vp.height);
    },

    dispose() {
      for (const d of disposables) d.dispose();
      composer.dispose();
    },
  };
};

export default factory;
