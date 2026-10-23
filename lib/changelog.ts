import { execFileSync } from "node:child_process";

export type Commit = {
  hash: string;
  date: string;
  subject: string;
  /** Slugs of the patterns this commit touched. */
  patterns: string[];
};

const RECORD = "\x1e";
const FIELD = "\x1f";

/**
 * Commit history, used alongside the `updated` fields to build the changelog.
 *
 * Deliberately best-effort: a build can run without a .git directory, and
 * hosts commonly use a shallow clone, so a missing or partial history returns
 * an empty list and the page falls back to the frontmatter dates rather than
 * failing the build.
 */
function readCommits(): Commit[] {
  let raw: string;
  try {
    raw = execFileSync(
      "git",
      [
        "log",
        "--date=short",
        `--pretty=format:${RECORD}%h${FIELD}%ad${FIELD}%s`,
        "--name-only",
        "--no-merges",
        "-n",
        "200",
      ],
      { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
  } catch {
    return [];
  }

  return raw
    .split(RECORD)
    .filter((block) => block.trim() !== "")
    .map((block) => {
      const [header, ...fileLines] = block.split("\n");
      const [hash, date, subject] = header.split(FIELD);
      const patterns = fileLines
        .map((line) => line.trim())
        .filter((line) => /^content\/patterns\/.+\.md$/.test(line) && !line.includes("/_"))
        .map((line) => line.replace(/^content\/patterns\/\d*-?/, "").replace(/\.md$/, ""));

      return { hash, date, subject, patterns: [...new Set(patterns)] };
    })
    .filter((c) => Boolean(c.hash && c.date));
}

let cache: Commit[] | undefined;

export function getCommits(): Commit[] {
  if (cache) return cache;
  const commits = readCommits();
  if (process.env.NODE_ENV === "production") cache = commits;
  return commits;
}

export type ChangelogDay = {
  date: string;
  commits: Commit[];
  /** Patterns whose frontmatter records this date as their last update. */
  updated: string[];
};

/** One entry per date, newest first, merging both sources. */
export function buildChangelog(
  commits: Commit[],
  patterns: { slug: string; updated: string }[],
): ChangelogDay[] {
  const days = new Map<string, ChangelogDay>();

  const day = (date: string): ChangelogDay => {
    const existing = days.get(date);
    if (existing) return existing;
    const created = { date, commits: [], updated: [] };
    days.set(date, created);
    return created;
  };

  for (const commit of commits) day(commit.date).commits.push(commit);
  for (const p of patterns) day(p.updated).updated.push(p.slug);

  return [...days.values()].sort((a, b) => b.date.localeCompare(a.date));
}
