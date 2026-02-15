"use client";

import React from "react";
import Image from "next/image";
import { AsciiImage } from "./AsciiRenderer";
import { DitherImage } from "./DitherRenderer";
import { useAscii } from "./AsciiContext";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function SmartImage({
  src,
  alt,
  fill = false,
  className,
  priority,
  width,
  height,
}: SmartImageProps) {
  const { enabled, effectMode, options, ditherOptions } = useAscii();

  if (enabled) {
    if (effectMode === "dither") {
      return (
        <DitherImage
          src={src}
          alt={alt}
          className={className}
          options={ditherOptions}
          fill={fill}
        />
      );
    }

    // Default to ASCII
    return (
      <AsciiImage
        src={src}
        alt={alt}
        className={className}
        options={options}
        fill={fill}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={className}
    />
  );
}
