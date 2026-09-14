"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, type Scope } from "animejs";
import { duration } from "@/lib/motion";
import { useMotionContext } from "./MotionProvider";

type CountUpProps = {
	value: number;
	suffix?: string;
	className?: string;
};

/** Animates a numeric value from 0 to `value` on scroll-enter. */
export default function CountUp({ value, suffix = "", className }: CountUpProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (reduced) {
			el.textContent = `${value}${suffix}`;
			return;
		}

		const obj = { count: 0 };
		const scope: Scope = createScope({ root: ref }).add(() => {
			animate(obj, {
				count: value,
				duration: duration.slow,
				ease: "outExpo",
				modifier: Math.round,
				onUpdate: () => {
					el.textContent = `${obj.count}${suffix}`;
				},
				autoplay: onScroll({ target: el, enter: "bottom-=10% top", repeat: false }),
			});
		});

		return () => scope.revert();
	}, [reduced, value, suffix]);

	return (
		<span ref={ref} className={className}>
			{value}
			{suffix}
		</span>
	);
}
