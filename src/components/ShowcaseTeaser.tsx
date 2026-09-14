import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./motion/Reveal";
import Magnetic from "./motion/Magnetic";

/**
 * Animated-gradient substitute for a captured video loop (see design plan §5,
 * option 2 — "zero-effort" teaser). No three.js here: the homepage stays on
 * the ≤15 KB shared bundle, and the showcase's three.js chunk only loads once
 * a visitor actually opts into /showcase.
 */
export default function ShowcaseTeaser() {
	return (
		<Reveal>
			<div className="relative glass-card rounded-xl overflow-hidden p-10 md:p-16 flex flex-col items-center text-center gap-4">
				<div
					aria-hidden="true"
					className="absolute inset-0 opacity-40 animate-[drift_14s_ease-in-out_infinite]"
					style={{
						background:
							"radial-gradient(circle at 20% 30%, rgba(178,205,187,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(184,200,218,0.2), transparent 55%), radial-gradient(circle at 50% 100%, rgba(248,184,160,0.15), transparent 60%)",
					}}
				/>
				<span className="relative font-label-sm text-label-sm text-secondary uppercase tracking-widest">
					{"// full_showcase"}
				</span>
				<h2 className="relative font-headline-lg text-headline-lg text-on-surface max-w-xl">
					See the whole system boot up.
				</h2>
				<p className="relative font-body-md text-body-md text-on-surface-variant max-w-md">
					Metrics, project stages, and the stack behind them — walked
					through in one interactive scroll.
				</p>
				<Magnetic className="relative">
					<Link
						href="/showcase"
						prefetch
						transitionTypes={["nav-forward"]}
						className="mt-2 inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-lg font-body-md text-on-primary font-bold hover:brightness-105 transition-all active:scale-95"
					>
						Enter the showcase
						<Icon name="arrow_forward" />
					</Link>
				</Magnetic>
			</div>
		</Reveal>
	);
}
