"use client";

import { createContext, useContext } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ReducedMotionContext = createContext(false);

export function useMotionContext() {
	return useContext(ReducedMotionContext);
}

/**
 * Root of the motion system. Every anime.js-powered primitive reads reduced-motion
 * from here instead of re-querying matchMedia, and each primitive still scopes its
 * own animations locally via createScope() so Strict Mode remounts clean up correctly.
 */
export default function MotionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const reduced = useReducedMotion();

	return (
		<ReducedMotionContext.Provider value={reduced}>
			{children}
		</ReducedMotionContext.Provider>
	);
}
