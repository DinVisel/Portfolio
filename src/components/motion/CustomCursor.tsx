"use client";

import { useEffect, useRef } from "react";
import { useMotionContext } from "./MotionProvider";

const INTERACTIVE_SELECTOR =
	'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]';

/**
 * A ring that follows the pointer and scales up over interactive elements.
 * Pointer-fine only (no-op on touch); cheap since it only ever writes CSS
 * custom properties from rAF-throttled listeners, never React state.
 */
export default function CustomCursor() {
	const ringRef = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		if (reduced) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;

		const ring = ringRef.current;
		if (!ring) return;

		let rafId = 0;
		let visible = false;

		const onMove = (e: PointerEvent) => {
			if (!visible) {
				visible = true;
				ring.style.opacity = "1";
			}
			if (!rafId) {
				rafId = requestAnimationFrame(() => {
					rafId = 0;
					ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
				});
			}
			const target = (e.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
			ring.classList.toggle("cursor-ring--active", !!target);
		};

		const onLeave = () => {
			visible = false;
			ring.style.opacity = "0";
		};

		document.addEventListener("pointermove", onMove);
		document.addEventListener("pointerleave", onLeave);
		document.documentElement.classList.add("has-custom-cursor");

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			document.removeEventListener("pointermove", onMove);
			document.removeEventListener("pointerleave", onLeave);
			document.documentElement.classList.remove("has-custom-cursor");
		};
	}, [reduced]);

	if (reduced) return null;

	return (
		<div ref={ringRef} className="cursor-ring" aria-hidden="true">
			<div className="cursor-ring__dot" />
		</div>
	);
}
