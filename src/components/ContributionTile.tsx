import Icon from "./Icon";
import { contributions } from "@/content/portfolio";

// Deterministic intensity pattern (49 cells) so server/client markup matches.
// Each value indexes into LEVELS — all static classes so Tailwind keeps them.
const LEVELS = [
  "bg-surface-container-highest",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/50",
  "bg-primary/60",
  "bg-primary/70",
  "bg-primary",
];

const PATTERN = [
  6, 0, 3, 1, 0, 5, 6, 1, 0, 2, 6, 4, 1, 0, 2, 6, 1, 0, 4, 2, 6, 1, 0, 2, 4,
  6, 1, 0, 2, 6, 4, 1, 0, 2, 6, 4, 1, 0, 2, 6, 4, 6, 4, 1, 0, 2, 6, 4, 1,
];

export default function ContributionTile() {
  return (
    <div className="md:col-span-4 md:row-span-2 glass-card rounded-xl p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="star" className="text-on-surface" />
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Contribution Stream
        </h3>
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1.5 self-center">
          {PATTERN.map((level, i) => (
            <div
              key={i}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${LEVELS[level]} transition-all hover:scale-110 cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-end">
        <div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">
            Total PRs
          </div>
          <div className="text-2xl font-bold font-headline-md text-primary">
            {contributions.totalPRs}
          </div>
        </div>
        <div className="text-right">
          <div className="text-on-surface-variant font-label-sm text-label-sm">
            Active Streak
          </div>
          <div className="text-2xl font-bold font-headline-md text-secondary">
            {contributions.activeStreak}
          </div>
        </div>
      </div>
    </div>
  );
}
