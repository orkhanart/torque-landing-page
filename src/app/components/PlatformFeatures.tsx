"use client";

import { cn } from "@/lib/utils";

export function PlatformFeatures({ className }: { className?: string }) {
  // Component is temporarily hidden - both feature cards and title text are hidden
  // Maintaining the div structure to preserve spacing
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20",
        className
      )}
    >
      {/* All content temporarily hidden */}
    </div>
  );
}
