import Icon from "@/components/Icon";
import Stagger from "@/components/motion/Stagger";
import { techStack } from "@/content/portfolio";
import { accentText, accentHoverBorder } from "@/lib/accent";

/** Static 2-column fallback — reduced motion, no WebGL, or the 3D orbit hasn't mounted yet. */
export default function StackOrbitFlat() {
	return (
		<Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" each={50} preserveTransform>
			{techStack.map((tech) => (
				<div
					key={tech.name}
					className={`bg-surface-container-low rounded-lg p-4 flex flex-col items-center text-center gap-2 border border-outline-variant/10 ${accentHoverBorder[tech.accent]} transition-colors`}
				>
					<Icon name={tech.icon} className={`text-2xl ${accentText[tech.accent]}`} />
					<span className="font-label-sm text-label-sm text-on-surface">{tech.name}</span>
					{tech.note && (
						<span className="font-label-sm text-label-sm text-on-surface-variant/70">
							{tech.note}
						</span>
					)}
				</div>
			))}
		</Stagger>
	);
}
