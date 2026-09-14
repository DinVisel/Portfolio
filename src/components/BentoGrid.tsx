import HeroTile from "./HeroTile";
import TechStackTile from "./TechStackTile";
import FeaturedProjectTile from "./FeaturedProjectTile";
import CurrentProjectTile from "./CurrentProjectTile";
import EducationTile from "./EducationTile";
import SocialTile from "./SocialTile";
import Reveal from "./motion/Reveal";

export default function BentoGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-12 grid-rows-none md:grid-rows-4 gap-6">
			<Reveal delay={0}>
				<HeroTile />
			</Reveal>
			<Reveal delay={70}>
				<TechStackTile />
			</Reveal>
			<Reveal delay={140} preserveTransform>
				<FeaturedProjectTile />
			</Reveal>
			<Reveal delay={210}>
				<CurrentProjectTile />
			</Reveal>
			<Reveal delay={280}>
				<EducationTile />
			</Reveal>
			<Reveal delay={350}>
				<SocialTile />
			</Reveal>
		</div>
	);
}
