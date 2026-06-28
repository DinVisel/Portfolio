// Fetches a public GitHub contribution calendar via the tokenless
// github-contributions-api (jogruber). No auth required.

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionData = {
  total: number;
  days: ContributionDay[];
};

export async function getContributions(
  username: string,
): Promise<ContributionData | null> {
  if (!username) return null;

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username,
      )}?y=last`,
      // Revalidate hourly so the graph stays fresh without per-request cost.
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      total: Record<string, number>;
      contributions: ContributionDay[];
    };

    return {
      total: json.total.lastYear ?? 0,
      days: json.contributions ?? [],
    };
  } catch {
    return null;
  }
}
