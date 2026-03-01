"use client";

import { useState, useEffect } from "react";

export type Orientation = "vertical" | "horizontal";

const HORIZONTAL_QUERY = "(min-width: 640px) and (max-width: 1279px)";

export function useOrientation(
  layout: "adaptive" | "vertical",
): Orientation {
  const [orientation, setOrientation] = useState<Orientation>("vertical");

  useEffect(() => {
    if (layout !== "adaptive") return;

    const mql = window.matchMedia(HORIZONTAL_QUERY);
    setOrientation(mql.matches ? "horizontal" : "vertical");

    const handler = (e: MediaQueryListEvent) => {
      setOrientation(e.matches ? "horizontal" : "vertical");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [layout]);

  return orientation;
}
