"use client";

import { useState } from "react";
import Icon from "./Icon";
import TiltCard from "./motion/TiltCard";
import type { ContactChannel } from "@/content/portfolio";
import { accentText } from "@/lib/accent";

const isCopyable = (channel: ContactChannel) => channel.href.startsWith("mailto:");

export default function ContactChannelCard({ channel }: { channel: ContactChannel }) {
	const [copied, setCopied] = useState(false);

	async function handleCopy(e: React.MouseEvent) {
		if (!isCopyable(channel)) return;
		e.preventDefault();
		try {
			await navigator.clipboard.writeText(channel.value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			window.location.href = channel.href;
		}
	}

	return (
		<TiltCard>
			<a
				href={channel.href}
				onClick={handleCopy}
				target={channel.href.startsWith("http") ? "_blank" : undefined}
				rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
				className="glass-card rounded-xl p-5 flex items-center gap-4 group"
			>
				<span className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant/10">
					<Icon name={channel.icon} className={accentText[channel.accent]} />
				</span>
				<div className="flex-grow">
					<div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
						{channel.label}
					</div>
					<div className="font-body-md text-body-md text-on-surface">
						{channel.value}
					</div>
				</div>
				<span className="relative w-5 h-5 flex items-center justify-center">
					<Icon
						name="north_east"
						className={`absolute text-on-surface-variant transition-all duration-[220ms] group-hover:translate-x-1 group-hover:-translate-y-1 ${
							copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
						}`}
					/>
					<Icon
						name="check"
						className={`absolute text-primary transition-all duration-[220ms] ${
							copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
						}`}
					/>
				</span>
				{isCopyable(channel) && (
					<span
						role="status"
						aria-live="polite"
						className={`absolute -top-2 right-4 font-label-sm text-label-sm text-primary bg-surface-container-highest px-2 py-0.5 rounded-full border border-outline-variant/20 transition-all duration-[220ms] ${
							copied ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0 pointer-events-none"
						}`}
					>
						Copied!
					</span>
				)}
			</a>
		</TiltCard>
	);
}
