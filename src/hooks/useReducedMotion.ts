"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitial(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
	const [reduced, setReduced] = useState(getInitial);

	useEffect(() => {
		const mql = window.matchMedia(QUERY);
		const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
		mql.addEventListener("change", listener);
		return () => mql.removeEventListener("change", listener);
	}, []);

	return reduced;
}
