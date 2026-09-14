"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A brief top-of-viewport progress flash on route change. Since every route
 * here is statically exported, there's no real network wait to track — this
 * is purely a perceived-motion cue that a navigation happened, timed to
 * roughly match the view transition duration.
 */
export default function RouteProgress() {
	const pathname = usePathname();
	const [visible, setVisible] = useState(false);
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		setVisible(true);
		const hide = setTimeout(() => setVisible(false), 500);
		return () => clearTimeout(hide);
	}, [pathname]);

	return (
		<div
			aria-hidden="true"
			className={`fixed top-0 left-0 h-[2px] bg-primary z-[70] transition-all ${
				visible ? "w-full duration-[400ms] ease-[var(--ease-out-expo)] opacity-100" : "w-0 duration-0 opacity-0"
			}`}
		/>
	);
}
