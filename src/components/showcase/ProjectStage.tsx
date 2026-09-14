import { ViewTransition } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import ProjectVisual from "./ProjectVisual";
import type { Project } from "@/content/portfolio";
import { accentTag, accentHex, accentText } from "@/lib/accent";

export default function ProjectStage({ project, index }: { project: Project; index: number }) {
	const accent = project.tags[0]?.accent ?? "primary";
	const reversed = index % 2 === 1;

	return (
		<section className="relative min-h-[80vh] flex items-center py-stack-lg border-b border-outline-variant/10 overflow-hidden">
			<div
				aria-hidden="true"
				className="absolute -z-10 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-[0.08] animate-[drift_18s_ease-in-out_infinite]"
				style={{
					background: accentHex[accent],
					left: reversed ? "auto" : "-10%",
					right: reversed ? "-10%" : "auto",
					top: "10%",
				}}
			/>

			<div
				className={`max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
					reversed ? "lg:[&>*:first-child]:order-2" : ""
				}`}
			>
				<div className="lg:sticky lg:top-28">
					<ViewTransition name={`project-${project.slug}`} share="morph">
						<ProjectVisual project={project} accentHex={accentHex[accent]} />
					</ViewTransition>
				</div>

				<div>
					<Reveal>
						<div>
							<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
								{project.badge}
							</span>
							<h2 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-4">
								{project.title}
							</h2>
							<p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
								{project.summary}
							</p>
						</div>
					</Reveal>

					<Stagger className="flex flex-wrap gap-2 mb-6" each={40} distance={8}>
						{project.tags.map((tag) => (
							<span
								key={tag.label}
								className={`px-2 py-0.5 rounded font-label-sm text-label-sm border ${accentTag[tag.accent]}`}
							>
								{tag.label}
							</span>
						))}
					</Stagger>

					<Stagger as="ul" className="font-code-md text-code-md flex flex-col gap-1 mb-8" each={40}>
						{project.stack.map((item) => (
							<li key={item.label} className="text-on-surface-variant">
								<span className={accentText[accent]}>$</span> {item.label.toLowerCase()}:{" "}
								{item.value}
							</li>
						))}
					</Stagger>

					<Link
						href={`/projects/${project.slug}`}
						transitionTypes={["nav-forward"]}
						className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm hover:underline"
					>
						View Case Study <Icon name="north_east" className="text-sm" />
					</Link>
				</div>
			</div>
		</section>
	);
}
