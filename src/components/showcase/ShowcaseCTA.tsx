import Icon from "@/components/Icon";
import Reveal from "@/components/motion/Reveal";
import TerminalPanel from "./TerminalPanel";
import { contact, contactChannels } from "@/content/portfolio";
import { accentText } from "@/lib/accent";

export default function ShowcaseCTA() {
	return (
		<section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full text-center">
			<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
				{"// get_in_touch"}
			</span>
			<h2 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-10">
				{contact.heading}
			</h2>

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
