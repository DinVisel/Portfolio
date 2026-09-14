"use client";

import { useEffect, useRef } from "react";
import { useMotionContext } from "./MotionProvider";

const MAX_TILT_DEG = 6;

type TiltCardProps = {
	children: React.ReactNode;
	className?: string;
};

/**
 * Pointer-reactive tilt + cursor glow, driven entirely by CSS custom properties
 * written from a rAF-throttled pointermove handler — never React state, so this
 * never triggers a re-render. Disabled on coarse pointers (touch) and reduced motion.
 */
export default function TiltCard({ children, className }: TiltCardProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const el = ref.current;
		if (!el || reduced) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;

		let rafId = 0;
		let pendingX = 0;
		let pendingY = 0;

		const apply = () => {
			rafId = 0;
			const rect = el.getBoundingClientRect();
			const px = (pendingX - rect.left) / rect.width;
			const py = (pendingY - rect.top) / rect.height;
			const tiltX = (0.5 - py) * MAX_TILT_DEG * 2;
			const tiltY = (px - 0.5) * MAX_TILT_DEG * 2;

			el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
			el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
			el.style.setProperty("--glow-x", `${(px * 100).toFixed(1)}%`);
			el.style.setProperty("--glow-y", `${(py * 100).toFixed(1)}%`);
		};

		const onMove = (e: PointerEvent) => {
			pendingX = e.clientX;
			pendingY = e.clientY;
			if (!rafId) rafId = requestAnimationFrame(apply);
		};

		const onLeave = () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			el.style.setProperty("--tilt-x", "0deg");
			el.style.setProperty("--tilt-y", "0deg");
			el.style.setProperty("--glow-x", "50%");
			el.style.setProperty("--glow-y", "50%");
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
			className={`tilt-card ${className ?? ""}`}
			style={{
				transform:
					"perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
				transition: "transform var(--duration-quick) var(--ease-out-expo)",
			}}
		>
			{children}
		</div>
	);
}
