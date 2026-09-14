"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { navLinks, profile } from "@/content/portfolio";

export default function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const linksRef = useRef<HTMLDivElement>(null);
	const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
		null
	);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const container = linksRef.current;
		if (!container) return;
		const active = container.querySelector<HTMLElement>('[data-active="true"]');
		if (!active) {
			setIndicator(null);
			return;
		}
		setIndicator({
			left: active.offsetLeft,
			width: active.offsetWidth,
		});
	}, [pathname]);

	return (
		<nav
			style={{ viewTransitionName: "site-header" }}
			className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
		>
			<div
				className={`flex justify-between items-center px-margin-desktop max-w-[1280px] mx-auto w-full transition-[padding] duration-[220ms] ease-[var(--ease-out-expo)] ${
					scrolled ? "py-2" : "py-4"
				}`}
			>
				<Link
					href="/"
					aria-label="Home"
					transitionTypes={["nav-back"]}
					className="flex items-center gap-2 hover:opacity-80 transition-opacity"
				>
					<span className="font-code-md text-code-md font-bold text-secondary">
						{profile.brand}
					</span>
				</Link>
				<div ref={linksRef} className="hidden md:flex gap-8 items-center relative">
					{navLinks.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.label}
								data-active={isActive ? "true" : undefined}
								transitionTypes={["nav-forward"]}
								className={`relative font-body-md text-body-md transition-colors duration-200 ${
									isActive
										? "text-secondary"
										: "text-on-surface-variant hover:text-secondary"
								}`}
								href={link.href}
							>
								{link.label}
							</Link>
						);
					})}
					{indicator && (
						<span
							aria-hidden="true"
							className="absolute -bottom-2 h-[2px] bg-secondary rounded-full transition-all duration-[220ms] ease-[var(--ease-out-expo)]"
							style={{ left: indicator.left, width: indicator.width }}
						/>
					)}
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() =>
							window.dispatchEvent(
								new KeyboardEvent("keydown", { key: "k", metaKey: true })
							)
						}
						aria-label="Open command palette"
						className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-secondary hover:border-secondary/30 transition-colors font-label-sm text-label-sm"
					>
						<Icon name="search" className="text-base" />
						<kbd className="font-code-md text-code-md">⌘K</kbd>
					</button>
					<Link
						href="/"
						aria-label="Home"
						transitionTypes={["nav-back"]}
						className="p-2 rounded-lg hover:bg-surface-variant transition-colors active:scale-95"
					>
						<Icon name="terminal" className="text-primary" />
					</Link>
				</div>
			</div>
		</nav>
	);
}
