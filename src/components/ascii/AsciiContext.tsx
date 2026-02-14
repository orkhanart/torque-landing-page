"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AsciiOptions, AsciiCharset, AsciiColorMode } from "./AsciiRenderer";

interface AsciiContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  options: AsciiOptions;
  setOptions: React.Dispatch<React.SetStateAction<AsciiOptions>>;
  updateOption: <K extends keyof AsciiOptions>(key: K, value: AsciiOptions[K]) => void;
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

const AsciiContext = createContext<AsciiContextType | null>(null);

export function AsciiProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [options, setOptions] = useState<AsciiOptions>(defaultOptions);
  const [hideGradients, setHideGradients] = useState(false);

  const updateOption = useCallback(<K extends keyof AsciiOptions>(key: K, value: AsciiOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <AsciiContext.Provider value={{ enabled, setEnabled, options, setOptions, updateOption, hideGradients, setHideGradients }}>
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
