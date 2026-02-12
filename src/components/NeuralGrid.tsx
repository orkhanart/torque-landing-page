"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface NeuralGridProps {
  className?: string;
  gridSize?: number;
  baseHue?: number;
}

interface Core {
  x: number;
  y: number;
  col: number;
  bright: number;
  connectors: Connector[];
  state: number;
  state2: number;
  doActivate: boolean;
}

interface Connector {
  c1: Core;
  c2: Core;
  state: number;
  state2: number;
  bright: number;
  activationCore: Core | null;
}

const NeuralGrid: React.FC<NeuralGridProps> = ({
  className = "",
  gridSize = 50,
  baseHue = 190, // Blue/cyan hue
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const stateRef = useRef<{
    objects: (Core | Connector)[];
    grid: Core[][];
    running: boolean;
    numGrid: number;
    xStep: number;
    yStep: number;
    coreRadius: number;
    maxState: number;
    darkCol: number;
  } | null>(null);

  // HSB to RGB conversion
  const hsbToRgb = useCallback((h: number, s: number, b: number): [number, number, number] => {
    h = h % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    b = Math.max(0, Math.min(100, b)) / 100;

    const c = b * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = b - c;

    let r = 0, g = 0, bl = 0;

    if (h < 60) { r = c; g = x; bl = 0; }
    else if (h < 120) { r = x; g = c; bl = 0; }
    else if (h < 180) { r = 0; g = c; bl = x; }
    else if (h < 240) { r = 0; g = x; bl = c; }
    else if (h < 300) { r = x; g = 0; bl = c; }
    else { r = c; g = 0; bl = x; }

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((bl + m) * 255)
    ];
  }, []);

  const initGrid = useCallback((width: number, height: number) => {
    const numGrid = Math.min(gridSize, Math.floor(height / 20));
    const xStep = width / numGrid;
    const yStep = height / numGrid;
    const coreRadius = xStep / 8;
    const maxState = Math.floor(xStep / 4);
    const darkCol = 100 - maxState * 2;

    const objects: (Core | Connector)[] = [];
    const grid: Core[][] = [];

    // Create cores
    let yPos = yStep / 2;
    for (let y = 0; y < numGrid; y++) {
      let xPos = xStep / 2;
      grid[y] = [];
      for (let x = 0; x < numGrid; x++) {
        const core: Core = {
          x: xPos,
          y: yPos,
          col: baseHue + Math.random() * 40 - 20, // Vary around base hue
          bright: 0,
          connectors: [],
          state: 0,
          state2: 0,
          doActivate: false,
        };
        objects.push(core);
        grid[y].push(core);
        xPos += xStep;
      }
      yPos += yStep;
    }

    // Create horizontal connectors
    for (let y = 0; y < numGrid; y++) {
      for (let x = 0; x < numGrid - 1; x++) {
        if (Math.random() * 4 > grid[y][x].connectors.length + grid[y][x + 1].connectors.length) {
          const connector: Connector = {
            c1: grid[y][x],
            c2: grid[y][x + 1],
            state: 0,
            state2: 0,
            bright: 0,
            activationCore: null,
          };
          grid[y][x].connectors.push(connector);
          grid[y][x + 1].connectors.push(connector);
          objects.push(connector);
        }
      }
    }

    // Create vertical connectors
    for (let x = 0; x < numGrid; x++) {
      for (let y = 0; y < numGrid - 1; y++) {
        if (Math.random() * 5 > grid[y][x].connectors.length + grid[y + 1][x].connectors.length) {
          const connector: Connector = {
            c1: grid[y][x],
            c2: grid[y + 1][x],
            state: 0,
            state2: 0,
            bright: 0,
            activationCore: null,
          };
          grid[y][x].connectors.push(connector);
          grid[y + 1][x].connectors.push(connector);
          objects.push(connector);
        }
      }
    }

    // Activate a random core
    const randomIndex = Math.floor(Math.random() * numGrid * numGrid);
    const randomCore = objects[randomIndex] as Core;
    if (randomCore && 'connectors' in randomCore) {
      randomCore.state = maxState;
      randomCore.bright = darkCol;
      randomCore.doActivate = true;
    }

    return { objects, grid, running: true, numGrid, xStep, yStep, coreRadius, maxState, darkCol };
  }, [gridSize, baseHue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      stateRef.current = initGrid(rect.width, rect.height);
    };

    const handleClick = () => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current = initGrid(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);

    const isCore = (obj: Core | Connector): obj is Core => {
      return 'connectors' in obj;
    };

    const animate = () => {
      const state = stateRef.current;
      if (!state) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      let running = false;

      // Draw all objects
      for (const obj of state.objects) {
        if (isCore(obj)) {
          // Draw core
          const bsat = obj.bright + obj.state2;
          const [r, g, b] = hsbToRgb(obj.col, bsat, bsat);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, (state.coreRadius + obj.state) / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw connector
          const bsat = obj.bright + obj.state2;
          ctx.lineWidth = (state.coreRadius + obj.state) / 10;

          if (obj.c1.y === obj.c2.y) {
            // Horizontal line
            const deltaX = Math.abs(obj.c1.x - obj.c2.x);
            const delta75 = deltaX * 0.75;

            const [r1, g1, b1] = hsbToRgb(obj.c1.col, bsat, bsat);
            ctx.strokeStyle = `rgba(${r1}, ${g1}, ${b1}, 0.3)`;
            ctx.beginPath();
            ctx.moveTo(obj.c1.x, obj.c1.y);
            ctx.lineTo(obj.c1.x + (obj.c1.x < obj.c2.x ? delta75 : -delta75), obj.c2.y);
            ctx.stroke();

            const [r2, g2, b2] = hsbToRgb(obj.c2.col, bsat, bsat);
            ctx.strokeStyle = `rgba(${r2}, ${g2}, ${b2}, 0.3)`;
            ctx.beginPath();
            ctx.moveTo(obj.c2.x, obj.c1.y);
            ctx.lineTo(obj.c2.x + (obj.c2.x < obj.c1.x ? delta75 : -delta75), obj.c2.y);
            ctx.stroke();
          } else {
            // Vertical line
            const deltaY = Math.abs(obj.c1.y - obj.c2.y);
            const delta75 = deltaY * 0.75;

            const [r1, g1, b1] = hsbToRgb(obj.c1.col, bsat, bsat);
            ctx.strokeStyle = `rgba(${r1}, ${g1}, ${b1}, 0.3)`;
            ctx.beginPath();
            ctx.moveTo(obj.c1.x, obj.c1.y);
            ctx.lineTo(obj.c1.x, obj.c1.y + (obj.c1.y < obj.c2.y ? delta75 : -delta75));
            ctx.stroke();

            const [r2, g2, b2] = hsbToRgb(obj.c2.col, bsat, bsat);
            ctx.strokeStyle = `rgba(${r2}, ${g2}, ${b2}, 0.3)`;
            ctx.beginPath();
            ctx.moveTo(obj.c1.x, obj.c2.y);
            ctx.lineTo(obj.c2.x, obj.c2.y + (obj.c2.y < obj.c1.y ? delta75 : -delta75));
            ctx.stroke();
          }
        }
      }

      // Tick all objects
      for (const obj of state.objects) {
        if (isCore(obj)) {
          // Tick core
          if (obj.state > 0) {
            running = true;
            obj.state--;
            obj.state2 = obj.state * 2;
            if (obj.doActivate && obj.state < state.maxState) {
              for (const connector of obj.connectors) {
                if (connector.state <= 0) {
                  connector.state = state.maxState;
                  connector.bright = state.darkCol;
                  connector.activationCore = obj;
                }
              }
              obj.doActivate = false;
            }
          }
        } else {
          // Tick connector
          if (obj.state > 0) {
            running = true;
            obj.state--;
            obj.state2 = obj.state * 2;
            if (obj.activationCore !== null && obj.state < state.maxState / 2) {
              const targetCore = obj.activationCore === obj.c1 ? obj.c2 : obj.c1;
              if (targetCore.state <= 0) {
                targetCore.state = state.maxState;
                targetCore.bright = state.darkCol;
                targetCore.doActivate = true;
              }
              obj.activationCore = null;
            }
          }
        }
      }

      // Restart if animation stopped
      if (!running) {
        stateRef.current = initGrid(width, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initGrid, hsbToRgb]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full cursor-pointer ${className}`}
      style={{ display: "block" }}
    />
  );
};

export default NeuralGrid;
