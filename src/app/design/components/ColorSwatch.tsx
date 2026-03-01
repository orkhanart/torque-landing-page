"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  hex: string;
  grade: number;
  isCore?: boolean;
  familyName?: string;
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export function ColorSwatch({ hex, grade, isCore, familyName }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const light = isLightColor(hex);

  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "group relative flex flex-col justify-between rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:shadow-lg",
        "h-24 md:h-28",
        isCore && "ring-2 ring-offset-2 ring-black/20"
      )}
      style={{ backgroundColor: hex }}
    >
      <div className="flex-1" />
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2",
          light ? "text-black/70" : "text-white/70"
        )}
      >
        <div className="text-left">
          <div className={cn("font-mono text-[10px]", light ? "text-black/40" : "text-white/40")}>
            {grade}
            {isCore && familyName && (
              <span className={cn("ml-1.5", light ? "text-black/60" : "text-white/60")}>core</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px]">{hex}</span>
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </button>
  );
}

export function GradientSwatch({
  name,
  css,
  stops,
}: {
  name: string;
  css: string;
  stops: string[];
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={copy}
      className="group relative flex flex-col justify-between rounded-lg overflow-hidden h-28 md:h-32 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{ background: css }}
    >
      <div className="flex-1" />
      <div className="flex items-center justify-between px-3 py-2 text-white/80">
        <span className="font-mono text-[11px] font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] opacity-60">
            {stops.join(" → ")}
          </span>
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </button>
  );
}
