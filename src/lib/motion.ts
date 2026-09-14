// Durations/easings mirroring the CSS tokens in globals.css `@theme`.
// Keep both in sync by hand — anime.js reads these constants, CSS reads the custom properties.

export const easeOutExpo = "cubic-bezier(0.16, 1, 0.3, 1)" as const;
export const easeInOutQuad = "cubic-bezier(0.45, 0, 0.55, 1)" as const;

export const duration = {
	instant: 120,
	quick: 220,
	base: 420,
	slow: 700,
} as const;

export const springs = {
	pressable: { stiffness: 300, damping: 20 },
	magnetic: { stiffness: 120, damping: 14 },
} as const;
