"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { createScope, createTimeline, splitText, stagger, type Scope, type Timeline } from "animejs";
import { useMotionContext } from "@/components/motion/MotionProvider";
import { useCanRender3D } from "@/hooks/useCanRender3D";
import { bootLog, profile } from "@/content/portfolio";
import Icon from "@/components/Icon";

const BootField3D = dynamic(() => import("./BootField3D"), { ssr: false });

const SESSION_KEY = "showcase-boot-played";

export default function ShowcaseBoot() {
	const reduced = useMotionContext();
	const canRender3D = useCanRender3D();
	const [skipped, setSkipped] = useState(true); // default true: matches SSR (no boot animation) until we know better
	const linesRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<Timeline | null>(null);

	useEffect(() => {
		// sessionStorage/reduced-motion are only knowable post-mount; the default
		// `skipped=true` already matches SSR, so this only ever un-skips fresh sessions.
		const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
		if (reduced || alreadyPlayed) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSkipped(true);
			return;
		}
		sessionStorage.setItem(SESSION_KEY, "1");
		setSkipped(false);
	}, [reduced]);

	useEffect(() => {
		if (skipped || !linesRef.current) return;
		const lineEls = Array.from(linesRef.current.children) as HTMLElement[];

		const scope: Scope = createScope({ root: linesRef }).add(() => {
			const timeline: Timeline = createTimeline({
				onComplete: () => setSkipped(true),
			});
			timelineRef.current = timeline;

			lineEls.forEach((lineEl, i) => {
				const splitter = splitText(lineEl, { chars: true });
				timeline.add(
					splitter.chars,
					{ opacity: [0, 1], duration: 1, delay: stagger(14) },
					i === 0 ? 0 : "+=120"
				);
			});
		});

		function skip() {
			timelineRef.current?.complete();
		}
		window.addEventListener("keydown", skip, { once: true });
		window.addEventListener("wheel", skip, { once: true, passive: true });
		window.addEventListener("touchstart", skip, { once: true, passive: true });

		return () => {
			scope.revert();
			window.removeEventListener("keydown", skip);
			window.removeEventListener("wheel", skip);
			window.removeEventListener("touchstart", skip);
		};
	}, [skipped]);

	return (
		<section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-outline-variant/20">
			{canRender3D && !reduced && <BootField3D resolved={skipped} />}

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				{!skipped && (
					<div
						ref={linesRef}
						className="font-code-md text-code-md text-secondary mb-8 flex flex-col gap-1 items-start"
						aria-hidden="true"
					>
						{bootLog.map((line) => (
							<div key={line}>{line}</div>
						))}
					</div>
				)}

				<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4">
					{profile.brand}
				</span>
				<h1 className="font-headline-xl text-headline-xl text-on-surface max-w-3xl">
					{profile.name}
				</h1>
				<p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-xl">
					{profile.headline.before}
					<span className="text-primary">{profile.headline.highlight}</span>
					{profile.headline.after}
				</p>

				<div className="mt-10 flex items-center gap-2 text-on-surface-variant animate-pulse">
					<Icon name="keyboard_arrow_down" />
					<span className="font-label-sm text-label-sm uppercase tracking-widest">
						Scroll to explore
					</span>
				</div>
			</div>
		</section>
	);
}
