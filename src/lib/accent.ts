import type { Accent } from "@/content/portfolio";

// Full static class strings keyed by accent so Tailwind's scanner keeps them.

export const accentText: Record<Accent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  "on-surface": "text-on-surface",
};

export const accentTag: Record<Accent, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  tertiary: "bg-tertiary/10 text-tertiary border-tertiary/20",
  "on-surface": "bg-on-surface/10 text-on-surface border-on-surface/20",
};

export const accentHoverBorder: Record<Accent, string> = {
  primary: "hover:border-primary/20",
  secondary: "hover:border-secondary/20",
  tertiary: "hover:border-tertiary/20",
  "on-surface": "hover:border-primary/20",
};

export const accentGroupHoverText: Record<Accent, string> = {
  primary: "group-hover/item:text-primary",
  secondary: "group-hover/item:text-secondary",
  tertiary: "group-hover/item:text-tertiary",
  "on-surface": "group-hover/item:text-on-surface",
};

export const accentHoverText: Record<Accent, string> = {
  primary: "hover:text-primary",
  secondary: "hover:text-secondary",
  tertiary: "hover:text-tertiary",
  "on-surface": "hover:text-on-surface",
};
