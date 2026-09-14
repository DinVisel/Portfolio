import ShimmerImage from "@/components/motion/ShimmerImage";
import type { Project } from "@/content/portfolio";

/** Flat SSR'd baseline for a project's showcase visual — always renders, 3D upgrades over it. */
export default function StagePoster({ project }: { project: Project }) {
	return (
		<div className="aspect-[16/10] w-full rounded-xl overflow-hidden glass-card relative">
			{project.image ? (
				<ShimmerImage
					className="w-full h-full object-cover"
					alt={project.imageAlt}
					src={project.image}
					fill
					sizes="(max-width: 1024px) 100vw, 50vw"
				/>
			) : (
				<div
					className="w-full h-full"
					style={{
						backgroundImage:
							"radial-gradient(circle at 30% 20%, rgba(178,205,187,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(184,200,218,0.2), transparent 55%)",
					}}
					aria-label={project.imageAlt}
				/>
			)}
		</div>
	);
}
