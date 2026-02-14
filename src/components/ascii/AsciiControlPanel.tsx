"use client";

import React, { useState } from "react";
import { Settings2, ChevronDown, ChevronUp, X } from "lucide-react";
import { useAscii, CHARSETS, COLOR_MODES, PRESETS } from "./AsciiContext";
import { cn } from "@/lib/utils";

export function AsciiControlPanel() {
  const { enabled, setEnabled, options, updateOption, setOptions, hideGradients, setHideGradients } = useAscii();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 rounded-lg shadow-lg transition-all",
          "bg-black/90 text-white hover:bg-black",
          "backdrop-blur-sm border border-white/10"
        )}
        title="ASCII Settings"
      >
        <Settings2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-xl shadow-2xl transition-all",
        "bg-black/95 text-white backdrop-blur-md border border-white/10",
        isMinimized ? "w-72" : "w-80"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-white/60" />
          <span className="text-sm font-medium">ASCII Mode</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div className="p-3 border-b border-white/10 space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm">Enable ASCII Effect</span>
          <div
            onClick={() => setEnabled(!enabled)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative",
              enabled ? "bg-green-500" : "bg-white/20"
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                enabled ? "translate-x-6" : "translate-x-1"
              )}
            />
          </div>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm">Hide Image Gradients</span>
          <div
            onClick={() => setHideGradients(!hideGradients)}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative",
              hideGradients ? "bg-green-500" : "bg-white/20"
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                hideGradients ? "translate-x-6" : "translate-x-1"
              )}
            />
          </div>
        </label>
      </div>

      {/* Controls */}
      {!isMinimized && enabled && (
        <div className="p-3 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Presets */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
              Presets
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setOptions((prev) => ({ ...prev, ...preset.options }))}
                  className="px-2 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Charset */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
              Character Set
            </label>
            <select
              value={options.charset}
              onChange={(e) => updateOption("charset", e.target.value as any)}
              className="w-full px-3 py-2 text-sm rounded bg-white/10 border border-white/10 focus:outline-none focus:border-white/30"
            >
              {CHARSETS.map((charset) => (
                <option key={charset} value={charset} className="bg-gray-900">
                  {charset}
                </option>
              ))}
            </select>
          </div>

          {/* Color Mode */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
              Color Mode
            </label>
            <select
              value={options.colorMode}
              onChange={(e) => updateOption("colorMode", e.target.value as any)}
              className="w-full px-3 py-2 text-sm rounded bg-white/10 border border-white/10 focus:outline-none focus:border-white/30"
            >
              {COLOR_MODES.map((mode) => (
                <option key={mode} value={mode} className="bg-gray-900">
                  {mode}
                </option>
              ))}
            </select>
          </div>

          {/* Cell Size */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
              Cell Size: {options.cellSize}px
            </label>
            <input
              type="range"
              min="4"
              max="16"
              value={options.cellSize}
              onChange={(e) => updateOption("cellSize", parseInt(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          {/* Contrast */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
              Contrast: {options.contrast?.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={options.contrast}
              onChange={(e) => updateOption("contrast", parseFloat(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          {/* Brightness */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
              Brightness: {options.brightness?.toFixed(2)}
            </label>
            <input
              type="range"
              min="-0.5"
              max="0.5"
              step="0.05"
              value={options.brightness}
              onChange={(e) => updateOption("brightness", parseFloat(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          {/* Invert */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.invert}
              onChange={(e) => updateOption("invert", e.target.checked)}
              className="w-4 h-4 rounded accent-white"
            />
            <span className="text-sm">Invert</span>
          </label>

          {/* Colors for monochrome */}
          {options.colorMode === "monochrome" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                  Foreground
                </label>
                <input
                  type="color"
                  value={options.foregroundColor}
                  onChange={(e) => updateOption("foregroundColor", e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                  Background
                </label>
                <input
                  type="color"
                  value={options.backgroundColor}
                  onChange={(e) => updateOption("backgroundColor", e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
