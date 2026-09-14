"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, createDrawable, onScroll, type Scope } from "animejs";
import { useMotionContext } from "./MotionProvider";

/**
 * Replaces the plain `border-l` timeline rail with an SVG line that draws
 * itself in sync with scroll progress through the section — no scroll-jacking,
 * the fill tracks the native scroll position 1:1.
 */
export default function ExperienceTimeline({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<SVGLineElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const container = containerRef.current;
		const line = lineRef.current;
		if (!container || !line) return;

		const setHeight = () => line.setAttribute("y2", String(container.scrollHeight));
		setHeight();
		const ro = new ResizeObserver(setHeight);
		ro.observe(container);

		if (reduced) {
			return () => ro.disconnect();
		}

		const [drawable] = createDrawable(line);
		const scope: Scope = createScope({ root: containerRef }).add(() => {
			animate(drawable, {
				draw: ["0 0", "0 1"],
				ease: "linear",
				autoplay: onScroll({ target: container, sync: true }),
			});
		});

		return () => {
			ro.disconnect();
			scope.revert();
		};
	}, [reduced]);

	return (
		<div ref={containerRef} className="relative ml-2 md:ml-3 flex flex-col gap-10">
			<svg
				className="absolute left-0 top-0 h-full w-px overflow-visible"
				aria-hidden="true"
			>
				<line
					x1="0"
					y1="0"
					x2="0"
					y2="0"
					stroke="var(--color-outline-variant)"
					strokeOpacity="0.25"
					strokeWidth="1"
				/>
				<line
					ref={lineRef}
					x1="0"
					y1="0"
					x2="0"
					y2="0"
					stroke="var(--color-primary)"
					strokeWidth="1.5"
				/>
			</svg>
			{children}
		</div>
	);
}
