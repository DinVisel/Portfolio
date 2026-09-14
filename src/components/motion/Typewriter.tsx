"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, stagger, splitText, type Scope } from "animejs";
import { useMotionContext } from "./MotionProvider";

type TypewriterProps = {
	text: string;
	className?: string;
	/** Delay per character, in ms. */
	each?: number;
};

/** Terminal-style per-character typing, built on animejs's splitText(). */
export default function Typewriter({ text, className, each = 28 }: TypewriterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const el = ref.current;
		if (!el || reduced) return;

		const splitter = splitText(el, { chars: true });

		const scope: Scope = createScope({ root: ref }).add(() => {
			animate(splitter.chars, {
				opacity: [0, 1],
				duration: 1,
				delay: stagger(each),
			});
		});

		return () => {
			scope.revert();
			splitter.revert();
		};
	}, [reduced, text, each]);

	if (reduced) {
		return <span className={className}>{text}</span>;
	}

	return (
		<span ref={ref} className={className}>
			{text}
		</span>
	);
}
