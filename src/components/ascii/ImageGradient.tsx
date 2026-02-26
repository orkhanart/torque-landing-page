"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ImageGradientProps {
  className?: string;
}

export function ImageGradient({ className }: ImageGradientProps) {
  return <div className={cn("absolute inset-0", className)} />;
}
