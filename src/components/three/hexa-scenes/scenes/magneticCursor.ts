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
// Magnetic Cursor — spring-physics cursor attraction / repulsion
// ---------------------------------------------------------------------------

interface Body {
  group: THREE.Group;
  rest: THREE.Vector3;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
}

const SPRING = 3.0; // spring constant
const DAMPING = 0.88; // velocity damping per frame
const ATTRACT_RADIUS = 2.0;
const FORCE_STRENGTH = 0.12;

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;

  scene.add(logo.root);

  // Build bodies
  const bodies: Body[] = logo.elements.map((el) => ({
    group: el.group,
    rest: el.restPosition.clone(),
    pos: el.restPosition.clone(),
    vel: new THREE.Vector3(),
  }));

  // Raycaster helper — project mouse onto z=0 plane
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouseWorld = new THREE.Vector3();

  let polarity = 1; // +1 attract, -1 repel
  let lastClicks = ctx.input.clicks;

  return {
    scene,
    camera,
    clearColor: 0xffffff,

    tick(t, dt) {
      // Toggle polarity on click
      if (ctx.input.clicks !== lastClicks) {
        polarity *= -1;
        lastClicks = ctx.input.clicks;
      }

      // Project mouse to world
      raycaster.setFromCamera(
        new THREE.Vector2(ctx.input.smx, ctx.input.smy),
        camera,
      );
      raycaster.ray.intersectPlane(plane, mouseWorld);

      const dtClamped = Math.min(dt, 0.05);

      for (const b of bodies) {
        // Spring force toward rest position
        const springForce = new THREE.Vector3()
          .subVectors(b.rest, b.pos)
          .multiplyScalar(SPRING);

        // Cursor force
        const toMouse = new THREE.Vector3().subVectors(mouseWorld, b.pos);
        const dist = toMouse.length();
        if (dist < ATTRACT_RADIUS && dist > 0.01) {
          const falloff = 1 - dist / ATTRACT_RADIUS;
          toMouse
            .normalize()
            .multiplyScalar(FORCE_STRENGTH * falloff * falloff * polarity);
          springForce.add(toMouse);
        }

        b.vel.add(springForce.multiplyScalar(dtClamped * 60));
        b.vel.multiplyScalar(DAMPING);
        b.pos.add(b.vel.clone().multiplyScalar(dtClamped * 60));

        b.group.position.copy(b.pos).sub(b.rest);
      }

      // Gentle root tilt
      logo.root.rotation.x = -ctx.input.smy * 0.12;
      logo.root.rotation.y = ctx.input.smx * 0.12;
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
    },

    dispose() {
      // Nothing extra to dispose — logo handled by host
    },
  };
};

export default factory;
