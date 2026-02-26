"use client";

import React, { useEffect, useRef } from "react";

interface DistributionWebProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function DistributionWeb({ color = "#0000FF", className = "", paused = false }: DistributionWebProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pausedRef = useRef(paused);
  const animateFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused && animateFnRef.current) {
      animationRef.current = requestAnimationFrame(animateFnRef.current);
    }
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width; h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();

    const hex = (v: number) => Math.floor(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");

    // Central node
    const getCenterX = () => w * 0.5;
    const getCenterY = () => h * 0.45;
    const centralRadius = 16;

    // Ring nodes
    interface WebNode {
      angle: number;
      ring: number; // 1, 2, or 3
      radius: number;
      activated: boolean;
      activationProgress: number;
      neighborIndices: number[];
    }

    const ringRadii = [55, 95, 135];
    const ringCounts = [4, 6, 8]; // inner to outer
    const nodes: WebNode[] = [];

    // Create ring nodes
    ringCounts.forEach((count, ringIdx) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (ringIdx * 0.3); // offset each ring
        nodes.push({
          angle,
          ring: ringIdx + 1,
          radius: 4 + (3 - ringIdx) * 2, // inner nodes slightly bigger
          activated: false,
          activationProgress: 0,
          neighborIndices: [],
        });
      }
    });

    // Build neighbor connections (connect to nearby nodes in same ring and adjacent rings)
    nodes.forEach((node, idx) => {
      nodes.forEach((other, otherIdx) => {
        if (idx === otherIdx) return;
        const angleDiff = Math.abs(node.angle - other.angle);
        const normalizedDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);
        const ringDiff = Math.abs(node.ring - other.ring);

        if (ringDiff === 0 && normalizedDiff < Math.PI * 2 / ringCounts[node.ring - 1] * 1.5) {
          node.neighborIndices.push(otherIdx);
        } else if (ringDiff === 1 && normalizedDiff < Math.PI / 3) {
          node.neighborIndices.push(otherIdx);
        }
      });
    });

    // Pulses traveling along connections
    interface WebPulse {
      fromIdx: number; // -1 for center
      toIdx: number;
      t: number;
      speed: number;
      generation: number; // 0 = from center, 1 = from ring1, etc.
    }

    const pulses: WebPulse[] = [];

    // Velocity particles drifting outward from outer ring
    interface VelocityParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }

    const velocityParticles: VelocityParticle[] = [];

    // Ripple from center
    let rippleRadius = 0;
    let rippleAlpha = 0;
    let rippleActive = false;
    let rippleTimer = 0;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = getCenterX();
      const cy = getCenterY();

      // Trigger ripple every 4 seconds
      rippleTimer += 0.016;
      if (rippleTimer > 4) {
        rippleTimer = 0;
        rippleActive = true;
        rippleRadius = 0;
        rippleAlpha = 0.2;

        // Activate ring 1 nodes and send pulses
        nodes.forEach((node, idx) => {
          if (node.ring === 1) {
            pulses.push({
              fromIdx: -1,
              toIdx: idx,
              t: 0,
              speed: 0.025 + Math.random() * 0.01,
              generation: 0,
            });
          }
        });
      }

      // Update ripple
      if (rippleActive) {
        rippleRadius += 1.5;
        rippleAlpha *= 0.985;
        if (rippleAlpha < 0.005) rippleActive = false;
      }

      // Decay activation
      nodes.forEach(node => {
        if (node.activated) {
          node.activationProgress *= 0.995;
          if (node.activationProgress < 0.01) {
            node.activated = false;
            node.activationProgress = 0;
          }
        }
      });

      // Draw connection lines
      nodes.forEach((node, idx) => {
        const nx = cx + Math.cos(node.angle) * ringRadii[node.ring - 1];
        const ny = cy + Math.sin(node.angle) * ringRadii[node.ring - 1];

        // Connection to center (ring 1 only)
        if (node.ring === 1) {
          const lineAlpha = 0.03 + (node.activated ? node.activationProgress * 0.08 : 0);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = `${color}${hex(lineAlpha * 255)}`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Connections to neighbors
        node.neighborIndices.forEach(nIdx => {
          if (nIdx <= idx) return; // avoid drawing twice
          const other = nodes[nIdx];
          const ox = cx + Math.cos(other.angle) * ringRadii[other.ring - 1];
          const oy = cy + Math.sin(other.angle) * ringRadii[other.ring - 1];

          const bothActive = node.activated && other.activated;
          const lineAlpha = bothActive ? 0.06 + Math.min(node.activationProgress, other.activationProgress) * 0.1 : 0.02;

          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = `${color}${hex(lineAlpha * 255)}`;
          ctx.lineWidth = bothActive ? 1 : 0.5;
          ctx.stroke();
        });
      });

      // Draw ripple
      if (rippleActive) {
        ctx.beginPath();
        ctx.arc(cx, cy, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(rippleAlpha * 255)}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.t += pulse.speed;

        let fx: number, fy: number;

        if (pulse.fromIdx === -1) {
          fx = cx; fy = cy;
        } else {
          const fn = nodes[pulse.fromIdx];
          fx = cx + Math.cos(fn.angle) * ringRadii[fn.ring - 1];
          fy = cy + Math.sin(fn.angle) * ringRadii[fn.ring - 1];
        }

        const tn = nodes[pulse.toIdx];
        const tx = cx + Math.cos(tn.angle) * ringRadii[tn.ring - 1];
        const ty = cy + Math.sin(tn.angle) * ringRadii[tn.ring - 1];

        const px = fx + (tx - fx) * pulse.t;
        const py = fy + (ty - fy) * pulse.t;

        // Draw pulse
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
        pg.addColorStop(0, `${color}${hex(60)}`);
        pg.addColorStop(0.5, `${color}${hex(20)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(160)}`;
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();

        if (pulse.t >= 1) {
          // Activate target node
          const targetNode = nodes[pulse.toIdx];
          targetNode.activated = true;
          targetNode.activationProgress = 1;

          // Cascade: send pulses to neighbors in the next ring
          if (pulse.generation < 2) {
            targetNode.neighborIndices.forEach(nIdx => {
              const neighbor = nodes[nIdx];
              if (neighbor.ring > targetNode.ring && !neighbor.activated) {
                pulses.push({
                  fromIdx: pulse.toIdx,
                  toIdx: nIdx,
                  t: 0,
                  speed: 0.02 + Math.random() * 0.015,
                  generation: pulse.generation + 1,
                });
              }
            });
          }

          // Outer ring nodes spawn velocity particles
          if (targetNode.ring === 3) {
            const vnx = cx + Math.cos(targetNode.angle) * ringRadii[2];
            const vny = cy + Math.sin(targetNode.angle) * ringRadii[2];
            for (let v = 0; v < 2; v++) {
              const spreadAngle = targetNode.angle + (Math.random() - 0.5) * 0.4;
              const speed = 0.3 + Math.random() * 0.5;
              velocityParticles.push({
                x: vnx,
                y: vny,
                vx: Math.cos(spreadAngle) * speed,
                vy: Math.sin(spreadAngle) * speed,
                alpha: 0.4 + Math.random() * 0.3,
                size: 1 + Math.random() * 1.5,
              });
            }
          }

          pulses.splice(i, 1);
        }
      }

      // Draw velocity particles
      for (let i = velocityParticles.length - 1; i >= 0; i--) {
        const vp = velocityParticles[i];
        vp.x += vp.vx;
        vp.y += vp.vy;
        vp.alpha -= 0.004;

        if (vp.alpha <= 0) {
          velocityParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(vp.alpha * 255)}`;
        ctx.arc(vp.x, vp.y, vp.size, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(vp.alpha * 0.3 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(vp.x, vp.y);
        ctx.lineTo(vp.x - vp.vx * 6, vp.y - vp.vy * 6);
        ctx.stroke();
      }

      // Draw central node
      const centralPulse = Math.sin(time * 1.5) * 0.5 + 0.5;

      // Central glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, centralRadius * 2.5);
      cg.addColorStop(0, `${color}${hex((0.06 + centralPulse * 0.04) * 255)}`);
      cg.addColorStop(0.5, `${color}${hex((0.03 + centralPulse * 0.02) * 255)}`);
      cg.addColorStop(1, `${color}00`);
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, centralRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Central circle
      ctx.beginPath();
      ctx.strokeStyle = `${color}${hex(0.15 * 255)}`;
      ctx.lineWidth = 2;
      ctx.arc(cx, cy, centralRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Central inner fill
      const cig = ctx.createRadialGradient(cx, cy, 0, cx, cy, centralRadius);
      cig.addColorStop(0, `${color}${hex(0.1 * 255)}`);
      cig.addColorStop(1, `${color}${hex(0.03 * 255)}`);
      ctx.fillStyle = cig;
      ctx.beginPath();
      ctx.arc(cx, cy, centralRadius, 0, Math.PI * 2);
      ctx.fill();

      // Central label
      ctx.font = "bold 6px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `${color}${hex(0.2 * 255)}`;
      ctx.fillText("$", cx, cy + 1);
      ctx.textBaseline = "alphabetic";

      // Draw ring nodes
      nodes.forEach((node) => {
        const nx = cx + Math.cos(node.angle) * ringRadii[node.ring - 1];
        const ny = cy + Math.sin(node.angle) * ringRadii[node.ring - 1];
        const ap = node.activationProgress;
        const pulse = Math.sin(time * 1.8 + node.angle * 2) * 0.5 + 0.5;

        const r = node.radius + (node.activated ? ap * 2 : 0);
        const baseAlpha = node.activated ? 0.06 + ap * 0.15 : 0.03;

        // Activation glow
        if (node.activated) {
          const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 3);
          ng.addColorStop(0, `${color}${hex(ap * 0.08 * 255)}`);
          ng.addColorStop(1, `${color}00`);
          ctx.fillStyle = ng;
          ctx.beginPath();
          ctx.arc(nx, ny, r * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.strokeStyle = `${color}${hex(baseAlpha * 255)}`;
        ctx.lineWidth = node.activated ? 1.5 : 0.8;
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.stroke();

        // Fill
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex((baseAlpha * 0.5 + pulse * 0.01) * 255)}`;
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animateFnRef.current = animate;
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}

export default DistributionWeb;
