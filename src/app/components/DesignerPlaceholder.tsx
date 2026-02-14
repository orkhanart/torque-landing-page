"use client";

import React from "react";
import { SmartImage } from "@/components/ascii/SmartImage";

interface DesignerPlaceholderProps {
  type: 'image' | 'video' | 'illustration';
  aspectRatio?: string;
  label: string;
  assetPath?: string;
  className?: string;
}

export default function DesignerPlaceholder({
  type,
  aspectRatio = "4/3",
  label,
  assetPath,
  className = '',
}: DesignerPlaceholderProps) {

  const getEmoji = () => {
    switch (type) {
      case 'image':
        return '📊';
      case 'video':
        return '🎬';
      case 'illustration':
        return '🎨';
      default:
        return '📊';
    }
  };

  if (assetPath) {
    return (
      <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
        <SmartImage
          src={assetPath}
          alt={label}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio }}
    >
      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/10 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-6xl mb-3">{getEmoji()}</div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-xs text-muted-foreground/60 mt-2">Designer asset placeholder</p>
        </div>
      </div>
    </div>
  );
}
