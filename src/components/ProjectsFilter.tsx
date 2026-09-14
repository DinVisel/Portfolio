"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ViewTransition } from "react";
import { animate, stagger } from "animejs";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/content/portfolio";
import { useMotionContext } from "./motion/MotionProvider";

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
	const allTags = useMemo(() => {
		const set = new Set<string>();
		projects.forEach((p) => p.tags.forEach((t) => set.add(t.label)));
		return Array.from(set);
	}, [projects]);

	const [filter, setFilter] = useState<string | null>(null);
	const [, startTransition] = useTransition();
	const gridRef = useRef<HTMLDivElement>(null);
	const reduced = useMotionContext();

	const filtered = useMemo(
		() =>
			filter ? projects.filter((p) => p.tags.some((t) => t.label === filter)) : projects,
		[projects, filter]
	);

	useEffect(() => {
		const grid = gridRef.current;
		if (!grid || reduced) return;
		// Opacity only — the cards' own TiltCard root already owns `transform`.
		animate(grid.children, {
			opacity: [0, 1],
			duration: 320,
			delay: stagger(40),
		});
	}, [filtered, reduced]);

	function selectFilter(tag: string | null) {
		startTransition(() => setFilter(tag));
	}

	function chipClass(active: boolean) {
		return `px-3 py-1.5 rounded-full font-label-sm text-label-sm border transition-colors ${
			active
				? "bg-primary text-on-primary border-primary"
				: "text-on-surface-variant border-outline-variant/20 hover:border-secondary/30 hover:text-secondary"
		}`;
	}

	return (
		<div>
			<div
				className="flex flex-wrap gap-2 mb-8"
				role="group"
				aria-label="Filter projects by technology"
			>
				<button
					type="button"
					onClick={() => selectFilter(null)}
					aria-pressed={filter === null}
					className={chipClass(filter === null)}
				>
					All
				</button>
				{allTags.map((tag) => (
					<button
						key={tag}
						type="button"
						onClick={() => selectFilter(tag)}
						aria-pressed={filter === tag}
						className={chipClass(filter === tag)}
					>
						{tag}
					</button>
				))}
			</div>

			<ViewTransition
				key={filter ?? "all"}
				name="projects-grid"
				share="auto"
				enter="auto"
				default="none"
			>
				<div
					ref={gridRef}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{filtered.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</ViewTransition>

			{filtered.length === 0 && (
				<p className="mt-10 text-on-surface-variant font-body-md text-body-md">
					No projects tagged &quot;{filter}&quot; yet.
				</p>
			)}
		</div>
	);
}
