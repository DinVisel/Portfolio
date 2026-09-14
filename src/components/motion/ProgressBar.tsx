"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, type Scope } from "animejs";
import { duration, easeOutExpo } from "@/lib/motion";
import { useMotionContext } from "./MotionProvider";

type ProgressBarProps = {
	progress: number;
};

/** Progress fill that animates 0 → progress% on scroll-enter, with a shimmer sweep. */
export default function ProgressBar({ progress }: ProgressBarProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const fillRef = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	useEffect(() => {
		const track = trackRef.current;
		const fill = fillRef.current;
		if (!track || !fill) return;

		if (reduced) {
			fill.style.width = `${progress}%`;
			return;
		}

		const scope: Scope = createScope({ root: trackRef }).add(() => {
			animate(fill, {
				width: [`0%`, `${progress}%`],
				duration: duration.slow,
				ease: easeOutExpo,
				autoplay: onScroll({ target: track, enter: "bottom-=10% top", repeat: false }),
			});
		});

		return () => scope.revert();
	}, [reduced, progress]);

	return (
		<div
			ref={trackRef}
			className="h-1.5 w-full rounded-full bg-surface-container-highest overflow-hidden"
		>
			<div
				ref={fillRef}
				className="h-full rounded-full bg-secondary relative overflow-hidden"
				style={{ width: reduced ? `${progress}%` : "0%" }}
			>
				<span
					aria-hidden="true"
					className="absolute inset-0 -translate-x-full"
					style={{
						background:
							"linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
						animation: reduced ? undefined : "shimmer 1.6s ease-in-out 0.6s 1",
					}}
				/>
			</div>
		</div>
	);
}
