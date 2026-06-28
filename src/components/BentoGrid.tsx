import HeroTile from "./HeroTile";
import TechStackTile from "./TechStackTile";
import FeaturedProjectTile from "./FeaturedProjectTile";
import ContributionTile from "./ContributionTile";
import ArticleTile from "./ArticleTile";
import SocialTile from "./SocialTile";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-none md:grid-rows-4 gap-6">
      <HeroTile />
      <TechStackTile />
      <FeaturedProjectTile />
      <ContributionTile />
      <ArticleTile />
      <SocialTile />
    </div>
  );
}
