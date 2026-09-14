"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import StackOrbitFlat from "./StackOrbitFlat";
import { useCanRender3D } from "@/hooks/useCanRender3D";
import { techStack, type Tech } from "@/content/portfolio";

const StackOrbit3D = dynamic(() => import("./StackOrbit3D"), { ssr: false });

export default function StackOrbit() {
	const canRender3D = useCanRender3D();
	const [hovered, setHovered] = useState<Tech | null>(null);
	const onHoverChange = useCallback((tech: Tech | null) => setHovered(tech), []);

	if (!canRender3D) return <StackOrbitFlat />;

	return (
		<div>
			<div className="relative h-[22rem] w-full">
				<StackOrbit3D items={techStack} onHoverChange={onHoverChange} />
			</div>
			<p
				role="status"
				aria-live="polite"
				className="text-center font-body-md text-body-md text-on-surface-variant mt-4 min-h-6"
			>
				{hovered
					? `${hovered.name}${hovered.note ? " — " + hovered.note : ""}`
					: "Hover a label to see what it's for."}
			</p>
		</div>
	);
}
