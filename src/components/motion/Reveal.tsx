"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, type Scope } from "animejs";
import { duration, easeOutExpo } from "@/lib/motion";
import { useMotionContext } from "./MotionProvider";

type RevealProps = {
	children: React.ReactNode;
	/** Delay in ms before the entrance starts, once in view. */
	delay?: number;
	/** Vertical travel distance in px. */
	distance?: number;
	/**
	 * Set when the child manages its own `transform` (e.g. it's rooted in
	 * TiltCard/HeroParallax): animates opacity only, since anime.js's
	 * transform tween would otherwise overwrite the child's inline transform
	 * once it takes ownership of the property.
	 */
	preserveTransform?: boolean;
};

/**
 * Scroll-triggered entrance wrapper. Takes children as a prop so the wrapped
 * content (often a Server Component) never enters the client bundle.
 *
 * The wrapper itself is `display: contents` — it never generates a box, so a
 * child that's a CSS grid item (e.g. a BentoGrid tile) keeps its own
 * col-span/row-span placement as if Reveal weren't there. The animation and
 * scroll observation target the child's real DOM node instead.
 *
 * Starts from opacity: 1 in markup — the hidden state is applied by JS only
 * after mount, so content stays visible if JS fails to load.
 */
export default function Reveal({
	children,
	delay = 0,
	distance = 24,
	preserveTransform = false,
}: RevealProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const target = wrapperRef.current?.firstElementChild as HTMLElement | null;
		if (reduced || !target) return;

		const scope: Scope = createScope({ root: wrapperRef }).add(() => {
			animate(target, {
				opacity: [0, 1],
				...(preserveTransform ? {} : { translateY: [distance, 0] }),
				duration: duration.base,
				delay,
				ease: easeOutExpo,
				autoplay: onScroll({
					target,
					enter: "bottom-=10% top",
					repeat: false,
				}),
			});
		});

		return () => scope.revert();
	}, [reduced, delay, distance, preserveTransform]);

	return (
		<div ref={wrapperRef} className="contents">
			{children}
		</div>
	);
}
