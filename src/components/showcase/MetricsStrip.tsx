import Icon from "@/components/Icon";
import CountUp from "@/components/motion/CountUp";
import Stagger from "@/components/motion/Stagger";
import { metrics } from "@/content/portfolio";
import { accentText } from "@/lib/accent";

export default function MetricsStrip() {
	return (
		<section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
			<Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" each={60}>
				{metrics.map((metric) => (
					<div key={metric.label} className="glass-card rounded-xl p-6 flex flex-col items-center text-center gap-2">
						<Icon name={metric.icon} className={`text-2xl ${accentText[metric.accent]}`} />
						<span className="font-headline-lg text-headline-lg text-on-surface">
							<CountUp value={metric.value} suffix={metric.suffix} />
						</span>
						<span className="font-label-sm text-label-sm text-on-surface-variant">
							{metric.label}
						</span>
					</div>
				))}
			</Stagger>
		</section>
	);
}
