import Icon from "@/components/Icon";
import Reveal from "@/components/motion/Reveal";
import TerminalPanel from "./TerminalPanel";
import { contact, contactChannels, profile } from "@/content/portfolio";
import { accentText } from "@/lib/accent";

export default function ShowcaseCTA() {
	const linkedin = contactChannels.find((c) => c.label === "LinkedIn");

	return (
		<section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full text-center">
			<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
				{"// get_in_touch"}
			</span>
			<h2 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-6">
				{contact.heading}
			</h2>

			<div className="flex flex-wrap items-center justify-center gap-4 mb-10">
				<a
					href={`mailto:${profile.email}`}
					className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-lg font-body-md text-on-primary font-bold hover:brightness-105 transition-all active:scale-95"
				>
					<Icon name="mail" />
					{profile.email}
				</a>
				{linkedin && (
					<a
						href={linkedin.href}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 border border-secondary/30 px-6 py-3 rounded-lg font-body-md text-secondary font-bold hover:bg-secondary/5 transition-all active:scale-95"
					>
						<Icon name="person" />
						LinkedIn
					</a>
				)}
			</div>

			<Reveal>
				<TerminalPanel />
			</Reveal>

			{/* No-JS fallback — the terminal above needs a script to be interactive. */}
			<noscript>
				<div className="max-w-lg mx-auto flex flex-col gap-4 mt-8">
					{contactChannels.map((channel) => (
						<a
							key={channel.label}
							href={channel.href}
							className="glass-card rounded-xl p-5 flex items-center gap-4"
						>
							<Icon name={channel.icon} className={accentText[channel.accent]} />
							<div className="text-left">
								<div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
									{channel.label}
								</div>
								<div className="font-body-md text-body-md text-on-surface">
									{channel.value}
								</div>
							</div>
						</a>
					))}
				</div>
			</noscript>
		</section>
	);
}
