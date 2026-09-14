"use client";

import dynamic from "next/dynamic";
import StagePoster from "./StagePoster";
import { useCanRender3D } from "@/hooks/useCanRender3D";
import type { Project } from "@/content/portfolio";

const ProjectStage3D = dynamic(() => import("./ProjectStage3D"), { ssr: false });

export default function ProjectVisual({
	project,
	accentHex,
}: {
	project: Project;
	accentHex: string;
}) {
	const canRender3D = useCanRender3D();

	return (
		<div className="relative">
			<StagePoster project={project} />
			{canRender3D && project.image && (
				<ProjectStage3D imageSrc={project.image} accentHex={accentHex} />
			)}
		</div>
	);
}
