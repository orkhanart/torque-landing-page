"use client";

import React, { useEffect, useRef } from "react";

interface LoyaltyLayersProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function LoyaltyLayers({ color = "#0000FF", className = "", paused = false }: LoyaltyLayersProps) {
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

    // XP layers stacked vertically
    const layerCount = 5;
    const layerHeight = 18;
    const layerGap = 6;
    const totalHeight = layerCount * layerHeight + (layerCount - 1) * layerGap;
    const startY = h * 0.5 - totalHeight / 2;
    const layerLeft = w * 0.15;
    const layerWidth = w * 0.7;

    interface XPLayer {
      y: number;
      fill: number;        // 0-1 fill progress
      fillSpeed: number;    // how fast this layer fills
      opacity: number;      // bottom layers more opaque
      level: number;        // level number
      glowTimer: number;    // glow when complete
      complete: boolean;
    }

    const layers: XPLayer[] = [];
    for (let i = 0; i < layerCount; i++) {
      const layerY = startY + i * (layerHeight + layerGap);
      // Bottom layers start more filled, top layers less
      const initialFill = Math.max(0, 0.9 - i * 0.2 + (Math.random() - 0.5) * 0.1);
      layers.push({
        y: layerY,
        fill: i < 2 ? 1 : initialFill, // bottom 2 layers start complete
        fillSpeed: 0.001 + Math.random() * 0.002,
        opacity: 1 - (i * 0.15), // bottom = more opaque
        level: i + 1,
        glowTimer: 0,
        complete: i < 2,
      });
    }

    // Particles along fill edge
    interface XPParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }

    const particles: XPParticle[] = [];

    // Level-up indicators
    interface LevelUp {
      layerIdx: number;
      age: number;
      alpha: number;
    }

    const levelUps: LevelUp[] = [];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Update layers
      layers.forEach((layer, i) => {
        if (!layer.complete) {
          layer.fill += layer.fillSpeed;

          // Spawn particles at fill edge
          if (Math.random() < 0.15) {
            const edgeX = layerLeft + layer.fill * layerWidth;
            particles.push({
              x: edgeX + (Math.random() - 0.5) * 4,
              y: layer.y + Math.random() * layerHeight,
              vx: 0.3 + Math.random() * 0.5,
              vy: (Math.random() - 0.5) * 0.3,
              alpha: 0.4 + Math.random() * 0.4,
              size: 1 + Math.random() * 1.5,
            });
          }

          // Layer completion
          if (layer.fill >= 1) {
            layer.fill = 1;
            layer.complete = true;
            layer.glowTimer = 1.5;

            // Level up indicator
            levelUps.push({
              layerIdx: i,
              age: 0,
              alpha: 1,
            });

            // Reset a later layer or add new behavior
            // Find the next incomplete layer and speed it up
            const nextLayer = layers.find((l, idx) => idx > i && !l.complete);
            if (nextLayer) {
              nextLayer.fillSpeed *= 1.5;
            }
          }
        }

        // Decay glow timer
        if (layer.glowTimer > 0) {
          layer.glowTimer -= 0.016;
        }

        // Slowly reset completed layers (cycle effect)
        if (layer.complete && i >= 2) {
          // After some time, start draining to restart
          if (layer.glowTimer <= -3) {
            layer.fill -= 0.003;
            if (layer.fill <= 0.1) {
              layer.fill = 0.1;
              layer.complete = false;
              layer.fillSpeed = 0.001 + Math.random() * 0.002;
              layer.glowTimer = 0;
            }
          }
        }
      });

      // Draw layers from bottom to top
      for (let i = layerCount - 1; i >= 0; i--) {
        const layer = layers[i];
        const fillW = layer.fill * layerWidth;
        const layerAlpha = layer.opacity;
        const glowActive = layer.glowTimer > 0;
        const glowIntensity = glowActive ? Math.max(0, layer.glowTimer / 1.5) : 0;

        // Layer background (empty part)
        ctx.fillStyle = `${color}${hex(layerAlpha * 0.03 * 255)}`;
        ctx.fillRect(layerLeft, layer.y, layerWidth, layerHeight);

        // Layer border
        ctx.strokeStyle = `${color}${hex(layerAlpha * 0.06 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(layerLeft, layer.y, layerWidth, layerHeight);

        // Filled part with gradient
        if (fillW > 0) {
          const fillGrad = ctx.createLinearGradient(layerLeft, layer.y, layerLeft + fillW, layer.y);
          const baseAlpha = layerAlpha * (0.04 + (layer.complete ? 0.06 : 0));
          const edgeAlpha = layerAlpha * (0.08 + (layer.complete ? 0.08 : 0));

          fillGrad.addColorStop(0, `${color}${hex((baseAlpha + glowIntensity * 0.08) * 255)}`);
          fillGrad.addColorStop(0.8, `${color}${hex((edgeAlpha + glowIntensity * 0.12) * 255)}`);
          fillGrad.addColorStop(1, `${color}${hex((edgeAlpha * 1.3 + glowIntensity * 0.15) * 255)}`);
          ctx.fillStyle = fillGrad;
          ctx.fillRect(layerLeft, layer.y, fillW, layerHeight);

          // Glow effect when just completed
          if (glowActive) {
            ctx.fillStyle = `${color}${hex(glowIntensity * 0.1 * 255)}`;
            ctx.fillRect(layerLeft - 2, layer.y - 2, fillW + 4, layerHeight + 4);
          }

          // Fill edge highlight
          if (!layer.complete) {
            ctx.beginPath();
            ctx.strokeStyle = `${color}${hex(layerAlpha * 0.2 * 255)}`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(layerLeft + fillW, layer.y + 1);
            ctx.lineTo(layerLeft + fillW, layer.y + layerHeight - 1);
            ctx.stroke();
          }
        }

        // Strata texture lines (subtle horizontal lines within)
        const lineCount = 3;
        for (let l = 1; l < lineCount; l++) {
          const ly = layer.y + (layerHeight / lineCount) * l;
          const lineEnd = Math.min(layerLeft + fillW, layerLeft + layerWidth);
          ctx.beginPath();
          ctx.moveTo(layerLeft, ly);
          ctx.lineTo(lineEnd, ly);
          ctx.strokeStyle = `${color}${hex(layerAlpha * 0.02 * 255)}`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }

        // Level label on the left
        const labelPulse = Math.sin(time * 0.8 + i) * 0.02;
        ctx.font = "bold 7px monospace";
        ctx.textAlign = "right";
        ctx.fillStyle = `${color}${hex((layerAlpha * 0.1 + labelPulse + glowIntensity * 0.1) * 255)}`;
        ctx.fillText(`L${layer.level}`, layerLeft - 8, layer.y + layerHeight / 2 + 3);

        // Level-up arrow indicator
        if (layer.complete) {
          const arrowX = layerLeft - 18;
          const arrowY = layer.y + layerHeight / 2;
          const arrowAlpha = layerAlpha * (0.06 + glowIntensity * 0.1);

          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY + 3);
          ctx.lineTo(arrowX + 3, arrowY - 2);
          ctx.lineTo(arrowX + 6, arrowY + 3);
          ctx.strokeStyle = `${color}${hex(arrowAlpha * 255)}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Percentage on the right
        const pct = Math.round(layer.fill * 100);
        ctx.font = "7px monospace";
        ctx.textAlign = "left";
        ctx.fillStyle = `${color}${hex(layerAlpha * 0.08 * 255)}`;
        ctx.fillText(`${pct}%`, layerLeft + layerWidth + 8, layer.y + layerHeight / 2 + 3);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.008;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Particle glow
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        pg.addColorStop(0, `${color}${hex(p.alpha * 50)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(p.alpha * 180)}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw level-up indicators
      for (let i = levelUps.length - 1; i >= 0; i--) {
        const lu = levelUps[i];
        lu.age += 0.016;
        lu.alpha = Math.max(0, 1 - lu.age / 2);

        if (lu.alpha <= 0) {
          levelUps.splice(i, 1);
          continue;
        }

        const layer = layers[lu.layerIdx];
        const luX = layerLeft + layerWidth + 25;
        const luY = layer.y + layerHeight / 2 - lu.age * 10;

        ctx.font = "bold 8px monospace";
        ctx.textAlign = "left";
        ctx.fillStyle = `${color}${hex(lu.alpha * 0.3 * 255)}`;
        ctx.fillText(`LVL ${layer.level}`, luX, luY + 3);
      }

      // Header label
      const labelAlpha = 0.06 + Math.sin(time * 0.5) * 0.02;
      ctx.font = "bold 7px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = `${color}${hex(labelAlpha * 255)}`;
      ctx.fillText("XP LAYERS", w * 0.5, startY - 16);

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

export default LoyaltyLayers;
