"use client";

import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import { profile, terminalCommands } from "@/content/portfolio";

type Entry = { command: string; lines: string[] };

const INITIAL: Entry[] = [
	{
		command: "",
		lines: [`Type 'help' to see available commands.`],
	},
];

export default function TerminalPanel() {
	const [history, setHistory] = useState<Entry[]>(INITIAL);
	const [input, setInput] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);

	function run(raw: string) {
		const command = raw.trim().toLowerCase();
		if (!command) return;

		if (command === "clear") {
			setHistory([]);
			setInput("");
			return;
		}

		const lines = terminalCommands[command] ?? [
			`command not found: ${command} — type 'help' for a list.`,
		];
		setHistory((prev) => [...prev, { command, lines }]);
		setInput("");
		requestAnimationFrame(() => {
			scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
		});
	}

	return (
		<div className="glass-card rounded-xl overflow-hidden max-w-2xl mx-auto">
			<div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/20">
				<Icon name="terminal" className="text-secondary" />
				<span className="font-code-md text-code-md text-secondary">
					{profile.brand} — contact.sh
				</span>
			</div>
			<div
				ref={scrollRef}
				className="p-4 h-64 overflow-y-auto custom-scrollbar font-code-md text-code-md flex flex-col gap-3"
			>
				{history.map((entry, i) => (
					<div key={i}>
						{entry.command && (
							<div className="text-secondary">
								<span className="text-primary">$</span> {entry.command}
							</div>
						)}
						{entry.lines.map((line, j) => (
							<div key={j} className="text-on-surface-variant">
								{line}
							</div>
						))}
					</div>
				))}
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					run(input);
				}}
				className="flex items-center gap-2 px-4 py-3 border-t border-outline-variant/20"
			>
				<span className="text-primary font-code-md text-code-md">$</span>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="help, whoami, projects, stack, contact, resume, clear"
					aria-label="Terminal command"
					className="flex-grow bg-transparent outline-none font-code-md text-code-md text-on-surface placeholder:text-on-surface-variant/50"
					autoComplete="off"
					spellCheck={false}
				/>
			</form>
		</div>
	);
}
