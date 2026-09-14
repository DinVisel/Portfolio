"use client";

import { useEffect, useRef } from "react";
import { useMotionContext } from "./MotionProvider";

const MAX_OFFSET = 8;

type HeroParallaxProps = {
	children: React.ReactNode;
	className?: string;
};

/**
 * Pointer-tracked root for the hero tile. Writes --parallax-x/--parallax-y
 * (rAF-throttled, no React state) so background layers can move at different
 * depths via `calc(var(--parallax-x) * <depth>)`.
 */
export default function HeroParallax({ children, className }: HeroParallaxProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const el = ref.current;
		if (!el || reduced) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;

		let rafId = 0;

		const onMove = (e: PointerEvent) => {
			if (rafId) return;
			rafId = requestAnimationFrame(() => {
				rafId = 0;
				const rect = el.getBoundingClientRect();
				const px = (e.clientX - rect.left) / rect.width - 0.5;
				const py = (e.clientY - rect.top) / rect.height - 0.5;
				el.style.setProperty("--parallax-x", `${(px * MAX_OFFSET * 2).toFixed(1)}px`);
				el.style.setProperty("--parallax-y", `${(py * MAX_OFFSET * 2).toFixed(1)}px`);
			});
		};

		const onLeave = () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			el.style.setProperty("--parallax-x", "0px");
			el.style.setProperty("--parallax-y", "0px");
		};

		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerleave", onLeave);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerleave", onLeave);
		};
	}, [reduced]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
