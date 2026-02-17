"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AsciiOptions, AsciiCharset, AsciiColorMode } from "./AsciiRenderer";
import { DitherOptions, DitherAlgorithm, DitherColorMode } from "./DitherRenderer";

export type EffectMode = "none" | "ascii" | "dither";

interface AsciiContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  effectMode: EffectMode;
  setEffectMode: (mode: EffectMode) => void;
  options: AsciiOptions;
  setOptions: React.Dispatch<React.SetStateAction<AsciiOptions>>;
  updateOption: <K extends keyof AsciiOptions>(key: K, value: AsciiOptions[K]) => void;
  ditherOptions: DitherOptions;
  setDitherOptions: React.Dispatch<React.SetStateAction<DitherOptions>>;
  updateDitherOption: <K extends keyof DitherOptions>(key: K, value: DitherOptions[K]) => void;
  hideGradients: boolean;
  setHideGradients: (hide: boolean) => void;
}

const defaultOptions: AsciiOptions = {
  charset: "standard",
  colorMode: "grayscale",
  backgroundColor: "#ffffff",
  foregroundColor: "#000000",
  cellSize: 6,
  contrast: 1.3,
  brightness: 0,
  invert: false,
};

const defaultDitherOptions: DitherOptions = {
  algorithm: "bayer",
  colorMode: "monochrome",
  threshold: 128,
  scale: 0.35,
  primaryColor: "#0A0F1C",
  secondaryColor: "#ffffff",
  tertiaryColor: "#888888",
  contrast: 1.4,
  brightness: 0.05,
};

const AsciiContext = createContext<AsciiContextType | null>(null);

export function AsciiProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [effectMode, setEffectMode] = useState<EffectMode>("dither");
  const [options, setOptions] = useState<AsciiOptions>(defaultOptions);
  const [ditherOptions, setDitherOptions] = useState<DitherOptions>(defaultDitherOptions);
  const [hideGradients, setHideGradients] = useState(true);

  const updateOption = useCallback(<K extends keyof AsciiOptions>(key: K, value: AsciiOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateDitherOption = useCallback(<K extends keyof DitherOptions>(key: K, value: DitherOptions[K]) => {
    setDitherOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <AsciiContext.Provider value={{
      enabled,
      setEnabled,
      effectMode,
      setEffectMode,
      options,
      setOptions,
      updateOption,
      ditherOptions,
      setDitherOptions,
      updateDitherOption,
      hideGradients,
      setHideGradients
    }}>
      {children}
    </AsciiContext.Provider>
  );
}

export function useAscii() {
  const context = useContext(AsciiContext);
  if (!context) {
    throw new Error("useAscii must be used within an AsciiProvider");
  }
  return context;
}

export const CHARSETS: AsciiCharset[] = [
  "standard",
  "blocks",
  "binary",
  "minimal",
  "detailed",
  "mixed",
  "dots",
  "geometric",
];

export const COLOR_MODES: AsciiColorMode[] = [
  "monochrome",
  "grayscale",
  "colored",
  "matrix",
  "neon",
  "cyberpunk",
];

export const PRESETS: { name: string; options: Partial<AsciiOptions> }[] = [
  { name: "Clean", options: { colorMode: "grayscale", charset: "standard", cellSize: 6 } },
  { name: "Matrix", options: { colorMode: "matrix", charset: "standard", backgroundColor: "#000000" } },
  { name: "Minimal", options: { colorMode: "monochrome", charset: "minimal", cellSize: 8 } },
  { name: "Detailed", options: { colorMode: "grayscale", charset: "detailed", cellSize: 4 } },
  { name: "Neon", options: { colorMode: "neon", charset: "mixed", backgroundColor: "#0a0010" } },
  { name: "Blocks", options: { colorMode: "grayscale", charset: "blocks", cellSize: 10 } },
];

export const DITHER_ALGORITHMS: DitherAlgorithm[] = [
  "floyd-steinberg",
  "atkinson",
  "bayer",
  "ordered",
  "halftone",
  "noise",
];

export const DITHER_COLOR_MODES: DitherColorMode[] = [
  "monochrome",
  "grayscale",
  "duotone",
  "tritone",
];

export const DITHER_PRESETS: { name: string; options: Partial<DitherOptions> }[] = [
  { name: "Classic", options: { algorithm: "floyd-steinberg", colorMode: "monochrome", scale: 0.5 } },
  { name: "Retro", options: { algorithm: "bayer", colorMode: "monochrome", scale: 0.3 } },
  { name: "Halftone", options: { algorithm: "halftone", colorMode: "monochrome", scale: 1 } },
  { name: "Soft", options: { algorithm: "atkinson", colorMode: "grayscale", scale: 0.6 } },
  { name: "Noise", options: { algorithm: "noise", colorMode: "monochrome", scale: 0.5 } },
  { name: "Ordered", options: { algorithm: "ordered", colorMode: "monochrome", scale: 0.4 } },
];
