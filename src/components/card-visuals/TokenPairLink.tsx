"use client";

import React, { useEffect, useRef } from "react";

interface TokenPairLinkProps {
  color?: string;
  className?: string;
  paused?: boolean;
}

export function TokenPairLink({ color = "#0000FF", className = "", paused = false }: TokenPairLinkProps) {
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

    // Token circles
    const tokenCount = 6;
    const leftX = w * 0.2;
    const rightX = w * 0.8;
    const startY = h * 0.12;
    const spacingY = (h * 0.7) / (tokenCount - 1);

    interface Token {
      x: number;
      y: number;
      side: "left" | "right";
      index: number;
      pulse: number;
    }

    const leftTokens: Token[] = [];
    const rightTokens: Token[] = [];
    for (let i = 0; i < tokenCount; i++) {
      leftTokens.push({ x: leftX, y: startY + i * spacingY, side: "left", index: i, pulse: 0 });
      rightTokens.push({ x: rightX, y: startY + i * spacingY, side: "right", index: i, pulse: 0 });
    }

    // Connections between pairs
    interface Connection {
      leftIndex: number;
      rightIndex: number;
      alpha: number;
      thickness: number;
      volumeParticle: number; // 0-1 position of traveling particle
      volumeSpeed: number;
      born: number;
    }

    const connections: Connection[] = [];
    let time = 0;
    let connectTimer = 0;
    let pairCount = 0;

    // Growth bar
    let growthBarTarget = 0;
    let growthBarCurrent = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Add new connections periodically
      connectTimer += 0.016;
      if (connectTimer > 1.5 && connections.length < tokenCount * 2) {
        connectTimer = 0;

        // Pick a random pair that doesn't exist yet or add parallel
        const li = Math.floor(Math.random() * tokenCount);
        const ri = Math.floor(Math.random() * tokenCount);

        // Check if this exact pair exists
        const exists = connections.some(c => c.leftIndex === li && c.rightIndex === ri);
        if (!exists) {
          connections.push({
            leftIndex: li,
            rightIndex: ri,
            alpha: 0,
            thickness: 0.5 + Math.random() * 1.5,
            volumeParticle: 0,
            volumeSpeed: 0.008 + Math.random() * 0.006,
            born: time,
          });
          pairCount++;
          growthBarTarget = Math.min(1, pairCount / (tokenCount * 1.5));

          // Pulse the connected tokens
          leftTokens[li].pulse = 1;
          rightTokens[ri].pulse = 1;
        }
      }

      // Increase existing connection thickness over time (higher volume)
      connections.forEach(conn => {
        const age = time - conn.born;
        if (age > 4 && conn.thickness < 3) {
          conn.thickness += 0.001;
        }
      });

      // Draw column labels
      ctx.font = "7px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = `${color}20`;
      ctx.fillText("TOKEN A", leftX, startY - 16);
      ctx.fillText("TOKEN B", rightX, startY - 16);

      // Draw connections
      connections.forEach(conn => {
        conn.alpha = Math.min(0.25, conn.alpha + 0.005);
        conn.volumeParticle += conn.volumeSpeed;
        if (conn.volumeParticle > 1) conn.volumeParticle = 0;

        const lt = leftTokens[conn.leftIndex];
        const rt = rightTokens[conn.rightIndex];

        // Connection line
        ctx.beginPath();
        ctx.moveTo(lt.x + 6, lt.y);
        ctx.lineTo(rt.x - 6, rt.y);
        ctx.strokeStyle = `${color}${hex(conn.alpha * 255)}`;
        ctx.lineWidth = conn.thickness;
        ctx.stroke();

        // Line glow for thicker connections
        if (conn.thickness > 1.5) {
          ctx.beginPath();
          ctx.moveTo(lt.x + 6, lt.y);
          ctx.lineTo(rt.x - 6, rt.y);
          ctx.strokeStyle = `${color}${hex(conn.alpha * 0.3 * 255)}`;
          ctx.lineWidth = conn.thickness + 4;
          ctx.stroke();
        }

        // Volume particle traveling along the line
        const px = lt.x + 6 + (rt.x - 6 - lt.x - 6) * conn.volumeParticle;
        const py = lt.y + (rt.y - lt.y) * conn.volumeParticle;

        const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        pg.addColorStop(0, `${color}${hex(conn.alpha * 1.5 * 255)}`);
        pg.addColorStop(1, `${color}00`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `${color}${hex(conn.alpha * 2 * 255)}`;
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw tokens
      const drawToken = (token: Token) => {
        // Pulse animation
        if (token.pulse > 0) {
          token.pulse = Math.max(0, token.pulse - 0.02);
          const rippleR = 6 + (1 - token.pulse) * 12;
          ctx.beginPath();
          ctx.arc(token.x, token.y, rippleR, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${hex(token.pulse * 0.3 * 255)}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Token circle glow
        const tg = ctx.createRadialGradient(token.x, token.y, 0, token.x, token.y, 10);
        tg.addColorStop(0, `${color}${hex(15 + token.pulse * 20)}`);
        tg.addColorStop(1, `${color}00`);
        ctx.fillStyle = tg;
        ctx.beginPath(); ctx.arc(token.x, token.y, 10, 0, Math.PI * 2); ctx.fill();

        // Token circle
        ctx.beginPath();
        ctx.arc(token.x, token.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex((0.12 + token.pulse * 0.3) * 255)}`;
        ctx.fill();

        // Token ring
        ctx.beginPath();
        ctx.arc(token.x, token.y, 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${hex(0.2 * 255)}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(token.x, token.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${hex(0.35 * 255)}`;
        ctx.fill();
      };

      leftTokens.forEach(drawToken);
      rightTokens.forEach(drawToken);

      // Growth bar on the right side
      const barX = w * 0.92;
      const barY = startY;
      const barH = h * 0.7;
      const barW = 4;

      // Bar background
      ctx.fillStyle = `${color}06`;
      ctx.fillRect(barX - barW / 2, barY, barW, barH);

      // Bar fill (animated)
      growthBarCurrent += (growthBarTarget - growthBarCurrent) * 0.02;
      const fillH = barH * growthBarCurrent;
      if (fillH > 0) {
        const bg = ctx.createLinearGradient(0, barY + barH, 0, barY + barH - fillH);
        bg.addColorStop(0, `${color}${hex(0.2 * 255)}`);
        bg.addColorStop(1, `${color}${hex(0.08 * 255)}`);
        ctx.fillStyle = bg;
        ctx.fillRect(barX - barW / 2, barY + barH - fillH, barW, fillH);
      }

      // Bar label
      ctx.font = "7px system-ui";
      ctx.textAlign = "center";
      ctx.fillStyle = `${color}20`;
      ctx.fillText(`${pairCount}`, barX, barY + barH + 14);
      ctx.fillText("pairs", barX, barY + barH + 22);

      // Reset cycle after many connections
      if (connections.length >= tokenCount * 2) {
        // Slowly fade and reset
        const allOld = connections.every(c => time - c.born > 8);
        if (allOld) {
          connections.length = 0;
          pairCount = 0;
          growthBarTarget = 0;
          connectTimer = 0;
        }
      }

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

export default TokenPairLink;
