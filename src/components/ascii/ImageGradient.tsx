"use client";

import React from "react";
import { useAscii } from "./AsciiContext";
import { cn } from "@/lib/utils";

interface ImageGradientProps {
  className?: string;
}

export function ImageGradient({ className }: ImageGradientProps) {
  const { hideGradients } = useAscii();

  if (hideGradients) {
    return null;
  }

  return <div className={cn("absolute inset-0", className)} />;
}
