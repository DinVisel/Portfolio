"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, stagger, type Scope } from "animejs";
import { duration, easeOutExpo } from "@/lib/motion";
import { useMotionContext } from "./MotionProvider";

type StaggerProps = {
	children: React.ReactNode;
	/** Selector (within this wrapper) for the items to stagger. Defaults to direct children. */
	itemSelector?: string;
	/** Delay between each item's entrance, in ms. */
	each?: number;
	distance?: number;
	className?: string;
};

/**
 * Staggers the entrance of its direct children on scroll-enter.
 * Takes children as a prop so wrapped content stays server-rendered.
 */
export default function Stagger({
	children,
	itemSelector = ":scope > *",
	each = 70,
	distance = 24,
	className,
}: StaggerProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		if (reduced || !ref.current) return;
		const root = ref.current;
		const items = root.querySelectorAll<HTMLElement>(itemSelector);
		if (!items.length) return;

		const scope: Scope = createScope({ root: ref }).add(() => {
			animate(items, {
				opacity: [0, 1],
				translateY: [distance, 0],
				duration: duration.base,
				delay: stagger(each),
				ease: easeOutExpo,
				autoplay: onScroll({
					target: root,
					enter: "bottom-=10% top",
					repeat: false,
				}),
			});
		});

		return () => scope.revert();
	}, [reduced, itemSelector, each, distance]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
