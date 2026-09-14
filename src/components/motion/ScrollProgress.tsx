"use client";

import { useEffect, useRef } from "react";

/** Fixed reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const bar = ref.current;
		if (!bar) return;

		let rafId = 0;

		const update = () => {
			rafId = 0;
			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
			bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
		};

		const onScroll = () => {
			if (!rafId) rafId = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<div
			className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent"
			aria-hidden="true"
		>
			<div
				ref={ref}
				className="h-full bg-primary origin-left"
				style={{ transform: "scaleX(0)" }}
			/>
		</div>
	);
}
