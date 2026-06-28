import Icon from "./Icon";
import { profile } from "@/content/portfolio";
import { getContributions } from "@/lib/github";

// Maps the API's 0–4 intensity levels to static Tailwind classes.
const LEVELS = [
  "bg-surface-container-highest",
  "bg-primary/30",
  "bg-primary/50",
  "bg-primary/70",
  "bg-primary",
];

export default async function ContributionTile() {
  const data = await getContributions(profile.githubUsername);

  // Pad the start so the first column begins on the correct weekday (0 = Sun),
  // giving the authentic GitHub layout of 7 day-rows × week-columns.
  const lead = data?.days.length
    ? new Date(data.days[0].date + "T00:00:00Z").getUTCDay()
    : 0;
  const cells: (number | null)[] = data
    ? [...Array(lead).fill(null), ...data.days.map((d) => d.level)]
    : [];

  const total = data?.total ?? 0;

  return (
    <div className="md:col-span-4 md:row-span-2 glass-card rounded-xl p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="calendar_month" className="text-on-surface" />
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Contribution Stream
        </h3>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {data ? (
          <div className="overflow-x-auto custom-scrollbar pb-2">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
              {cells.map((level, i) =>
                level === null ? (
                  <div key={i} className="w-2.5 h-2.5 rounded-[2px]"></div>
                ) : (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-[2px] ${LEVELS[level]} transition-all hover:scale-125 cursor-pointer`}
                  ></div>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon
              name="hub"
              className="text-4xl text-on-surface-variant/40 mb-2"
            />
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {profile.githubUsername
                ? "Couldn't load contributions right now."
                : "Set a GitHub username to show live contributions."}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
        <div>
          {data && (
            <>
              <span className="text-2xl font-bold font-headline-md text-primary">
                {total.toLocaleString()}
              </span>{" "}
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                contributions in the last year
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Less
          </span>
          {LEVELS.map((cls) => (
            <span key={cls} className={`w-2.5 h-2.5 rounded-[2px] ${cls}`}></span>
          ))}
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            More
          </span>
        </div>
      </div>
    </div>
  );
}
