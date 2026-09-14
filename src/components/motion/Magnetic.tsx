"use client";

import { useEffect, useRef } from "react";
import { animate, createSpring } from "animejs";
import { useMotionContext } from "./MotionProvider";

const MAX_OFFSET = 6;
const RADIUS = 24;

type MagneticProps = {
	children: React.ReactNode;
	className?: string;
};

/**
 * Nudges the element toward the cursor within a small radius, then springs
 * back on leave. Pointer tracking writes CSS vars directly (rAF-throttled);
 * the return trip is the one place a real anime.js spring animates a value.
 */
export default function Magnetic({ children, className }: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const el = ref.current;
		if (!el || reduced) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;

		let rafId = 0;

		const onMove = (e: PointerEvent) => {
			const rect = el.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const dist = Math.hypot(dx, dy);
			if (dist > rect.width / 2 + RADIUS) return;

			if (!rafId) {
				rafId = requestAnimationFrame(() => {
					rafId = 0;
					const pull = Math.min(1, RADIUS / (dist || 1));
					const offsetX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx * pull));
					const offsetY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy * pull));
					el.style.setProperty("--mag-x", `${offsetX.toFixed(1)}px`);
					el.style.setProperty("--mag-y", `${offsetY.toFixed(1)}px`);
				});
			}
		};

		const onLeave = () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			animate(el, {
				"--mag-x": 0,
				"--mag-y": 0,
				ease: createSpring({ stiffness: 120, damping: 14 }),
			});
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
		<div
			ref={ref}
			className={`inline-flex ${className ?? ""}`}
			style={{
				transform: "translate(var(--mag-x, 0px), var(--mag-y, 0px))",
			}}
		>
			{children}
		</div>
	);
}
