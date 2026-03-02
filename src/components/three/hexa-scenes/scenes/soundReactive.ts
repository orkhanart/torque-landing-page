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
// Sound Equalizer — Web Audio frequency data drives element transforms
// ---------------------------------------------------------------------------

const factory: SceneFactory = (ctx: SceneContext, logo: LogoGeometry): SceneInstance => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, ctx.viewport.aspect, 0.1, 50);
  camera.position.z = CAM_Z;
  scene.add(logo.root);

  // Audio state
  let audioCtx: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let freqData: Uint8Array<ArrayBuffer> | null = null;
  let source: MediaStreamAudioSourceNode | OscillatorNode | null = null;
  let micActive = false;

  // Create "Enable Mic" button overlay
  const btn = document.createElement("button");
  btn.textContent = "Enable Mic";
  btn.style.cssText = `
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
    z-index: 10; padding: 8px 20px; border-radius: 8px;
    background: rgba(72,87,163,0.9); color: white; border: none;
    font-size: 14px; cursor: pointer; backdrop-filter: blur(8px);
    font-family: inherit;
  `;
  ctx.container.appendChild(btn);

  const startMic = async () => {
    try {
      audioCtx = new AudioContext();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      freqData = new Uint8Array(analyser.frequencyBinCount);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      micActive = true;
      btn.textContent = "Mic Active";
      btn.style.background = "rgba(82,200,140,0.9)";
    } catch {
      // Fallback: generate demo tones
      startDemoAudio();
    }
  };

  const startDemoAudio = () => {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    freqData = new Uint8Array(analyser.frequencyBinCount);

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    gain.gain.value = 0.3;
    osc.type = "sawtooth";
    osc.frequency.value = 110;
    osc.connect(gain);
    gain.connect(analyser);
    // Don't connect to destination to avoid audible noise
    osc.start();
    source = osc as unknown as OscillatorNode;
    micActive = true;
    btn.textContent = "Demo Audio";
    btn.style.background = "rgba(200,160,80,0.9)";
  };

  btn.addEventListener("click", () => {
    if (!micActive) startMic();
  });

  // Store base colors for hue shift
  const baseHues: number[] = [];
  const materials: (THREE.MeshBasicMaterial | THREE.LineBasicMaterial)[] = [];

  logo.elements.forEach((el) => {
    el.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
        const mat = obj.material as THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
        const hsl = { h: 0, s: 0, l: 0 };
        mat.color.getHSL(hsl);
        baseHues.push(hsl.h);
        materials.push(mat);
      }
    });
  });

  return {
    scene,
    camera,
    clearColor: 0x0a0a14,

    tick(t) {
      // Read frequency data
      const amplitudes: number[] = new Array(logo.elements.length).fill(0);
      if (analyser && freqData) {
        analyser.getByteFrequencyData(freqData);
        // Map frequency bands to elements
        const binStep = Math.max(1, Math.floor(freqData.length / logo.elements.length));
        for (let i = 0; i < logo.elements.length; i++) {
          const binIdx = Math.min(i * binStep, freqData.length - 1);
          amplitudes[i] = freqData[binIdx] / 255;
        }
      } else {
        // Idle animation when no audio
        for (let i = 0; i < logo.elements.length; i++) {
          amplitudes[i] = 0.15 + Math.sin(t * 2 + i * 0.5) * 0.1;
        }
      }

      // Apply transforms
      for (let i = 0; i < logo.elements.length; i++) {
        const el = logo.elements[i];
        const amp = amplitudes[i];

        // Scale
        const s = 1.0 + amp * 0.5;
        el.group.scale.setScalar(s);

        // Y offset
        el.group.position.y = amp * 0.15;

        // Rotation
        el.group.rotation.z = amp * 0.3 * Math.sin(t + i);
      }

      // Hue shift on materials
      let matIdx = 0;
      for (let i = 0; i < logo.elements.length; i++) {
        const amp = amplitudes[i];
        logo.elements[i].group.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
            if (matIdx < baseHues.length) {
              const mat = materials[matIdx];
              const hsl = { h: 0, s: 0, l: 0 };
              mat.color.getHSL(hsl);
              mat.color.setHSL(
                (baseHues[matIdx] + amp * 0.3) % 1,
                Math.min(1, hsl.s + amp * 0.3),
                Math.min(1, hsl.l + amp * 0.2),
              );
              matIdx++;
            }
          }
        });
      }

      // Root tilt
      logo.root.rotation.x = -ctx.input.smy * 0.1;
      logo.root.rotation.y = ctx.input.smx * 0.1;
    },

    resize(vp: Viewport) {
      camera.aspect = vp.aspect;
      camera.updateProjectionMatrix();
    },

    dispose() {
      if (source) {
        if ("stop" in source) (source as OscillatorNode).stop();
        source.disconnect();
      }
      if (audioCtx) audioCtx.close();
      if (ctx.container.contains(btn)) ctx.container.removeChild(btn);
    },
  };
};

export default factory;
