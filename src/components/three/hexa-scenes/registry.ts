import type { SceneFactory } from "./types";

export interface SceneEntry {
  name: string;
  load: () => Promise<{ default: SceneFactory }>;
}

export const SCENE_REGISTRY: SceneEntry[] = [
  {
    name: "Chrome",
    load: () => import("./scenes/chromeShowcase"),
  },
  {
    name: "Colorful",
    load: () => import("./scenes/colorfulShowcase"),
  },
  {
    name: "Gradient",
    load: () => import("./scenes/gradientShowcase"),
  },
];
