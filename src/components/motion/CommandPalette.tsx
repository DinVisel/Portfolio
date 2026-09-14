"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { navLinks, profile } from "@/content/portfolio";

const staticEntries = [
	{ label: "Showcase", href: "/", external: false },
	...navLinks.map((link) => ({ ...link, external: false })),
	{ label: "Resume", href: profile.resumeUrl, external: true },
];

export default function CommandPalette() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return staticEntries;
		return staticEntries.filter((entry) =>
			entry.label.toLowerCase().includes(q)
		);
	}, [query]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((prev) => {
					const next = !prev;
					if (next) {
						setQuery("");
						setActiveIndex(0);
					}
					return next;
				});
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	useEffect(() => {
		if (open) requestAnimationFrame(() => inputRef.current?.focus());
	}, [open]);

	function onQueryChange(next: string) {
		setQuery(next);
		setActiveIndex(0);
	}

	function navigate(entry: (typeof staticEntries)[number]) {
		setOpen(false);
		if (entry.external) {
			window.open(entry.href, "_blank", "noopener,noreferrer");
			return;
		}
		router.push(entry.href, {
			transitionTypes: [entry.href === "/" ? "nav-back" : "nav-forward"],
		});
	}

	function onDialogKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") {
			e.preventDefault();
			setOpen(false);
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => Math.min(results.length - 1, i + 1));
			return;
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => Math.max(0, i - 1));
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault();
			const entry = results[activeIndex];
			if (entry) navigate(entry);
			return;
		}
		if (e.key === "Tab") {
			// Single focusable element (the input) — keep focus trapped inside.
			e.preventDefault();
			inputRef.current?.focus();
		}
	}

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-background/70 backdrop-blur-sm"
			onClick={() => setOpen(false)}
			role="presentation"
		>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label="Command palette"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={onDialogKeyDown}
				className="w-full max-w-lg glass-card rounded-xl overflow-hidden shadow-xl"
			>
				<div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/20">
					<Icon name="terminal" className="text-secondary" />
					<input
						ref={inputRef}
						value={query}
						onChange={(e) => onQueryChange(e.target.value)}
						placeholder={`Jump to a route on ${profile.brand}…`}
						className="flex-grow bg-transparent outline-none font-code-md text-code-md text-on-surface placeholder:text-on-surface-variant/60"
					/>
					<kbd className="font-label-sm text-label-sm text-on-surface-variant/70 border border-outline-variant/30 rounded px-1.5 py-0.5">
						Esc
					</kbd>
				</div>
				<ul className="max-h-72 overflow-y-auto custom-scrollbar py-2">
					{results.length === 0 && (
						<li className="px-4 py-3 font-body-md text-body-md text-on-surface-variant">
							No routes match &quot;{query}&quot;.
						</li>
					)}
					{results.map((entry, index) => (
						<li key={entry.href}>
							<button
								type="button"
								onMouseEnter={() => setActiveIndex(index)}
								onClick={() => navigate(entry)}
								className={`w-full text-left px-4 py-2.5 flex items-center justify-between font-body-md text-body-md transition-colors ${
									index === activeIndex
										? "bg-surface-container-high text-primary"
										: "text-on-surface-variant"
								}`}
							>
								{entry.label}
								<Icon name="north_east" className="text-sm opacity-60" />
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
