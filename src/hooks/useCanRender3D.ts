"use client";

import { useEffect, useState } from "react";

function detect(): boolean {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

	const nav = navigator as Navigator & {
		connection?: { saveData?: boolean };
		hardwareConcurrency?: number;
	};
	if (nav.connection?.saveData) return false;
	if ((nav.hardwareConcurrency ?? 8) <= 4) return false;

	try {
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
		return !!gl;
	} catch {
		return false;
	}
}

/**
 * Gates three.js scenes behind reduced-motion, WebGL support, low core count,
 * and Save-Data. False means: render the flat poster instead — 3D is a
 * progressive enhancement over content that already works without it.
 *
 * Always starts `false` (matching the SSR'd poster markup) and flips after
 * mount once the capability check runs — the poster and the 3D scene are
 * different DOM subtrees, so the initial value can't safely differ between
 * server and client the way a same-markup flag (e.g. reduced motion) can.
 */
export function useCanRender3D(): boolean {
	const [can, setCan] = useState(false);

	useEffect(() => {
		// Capability detection is only possible post-mount; SSR and first paint
		// must both render the poster to avoid hydrating into a different subtree.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCan(detect());
	}, []);

	return can;
}
