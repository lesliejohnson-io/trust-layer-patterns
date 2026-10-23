import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { formatIssues, frontmatterSchema, type Frontmatter } from "./schema";

export type {
  Domain,
  Moment,
  Relation,
  Reversibility,
  Risk,
  Status,
  TrustJob,
} from "./schema";
export { DOMAINS, MOMENT_QUESTIONS, MOMENTS, RELATIONS, STATUSES, TRUST_JOBS } from "./schema";

/** One step in a pattern's mechanism flow. */
export type Step = Frontmatter["steps"][number];

/** A short three-beat sequence for the without / with comparison. */
export type Contrast = Frontmatter["without"];

export type Source = Frontmatter["sources"][number];
export type Related = Frontmatter["related"][number];
export type CrossReference = Frontmatter["crossReferences"][number];

export type Pattern = Frontmatter & {
  /** Derived from the filename: "01-handoff.md" -> "handoff". */
  slug: string;
  bodyHtml: string;
  file: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "patterns");

/** A frontmatter failure in one file, held so the build can report them all at once. */
class ContentError extends Error {
  constructor(
    readonly file: string,
    readonly problems: string[],
  ) {
    super(`${file}\n${problems.map((p) => `    ${p}`).join("\n")}`);
    this.name = "ContentError";
  }
}

function readPattern(file: string): Pattern {
  const rel = `content/patterns/${file}`;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) throw new ContentError(rel, formatIssues(parsed.error));

  return {
    ...parsed.data,
    slug: file.replace(/\.md$/, "").replace(/^\d+-/, ""),
    bodyHtml: marked.parse(content, { async: false }) as string,
    file: rel,
  };
}

/** Checks that no single file can make on its own. */
function checkLibrary(patterns: Pattern[]): void {
  const problems: string[] = [];
  const seenNumbers = new Map<number, string>();
  const seenSlugs = new Map<string, string>();
  const bySlug = new Map(patterns.map((p) => [p.slug, p]));

  for (const p of patterns) {
    const clashingNumber = seenNumbers.get(p.number);
    if (clashingNumber) problems.push(`${p.file}: number ${p.number} is already used by ${clashingNumber}`);
    else seenNumbers.set(p.number, p.file);

    const clashingSlug = seenSlugs.get(p.slug);
    if (clashingSlug) problems.push(`${p.file}: slug "${p.slug}" is already used by ${clashingSlug}`);
    else seenSlugs.set(p.slug, p.file);

    for (const r of p.related) {
      if (r.slug === p.slug) problems.push(`${p.file}: related "${r.slug}" points at itself`);
      else if (!bySlug.has(r.slug)) problems.push(`${p.file}: related "${r.slug}" is not a pattern`);
    }
  }

  if (problems.length > 0) {
    throw new Error(`Content problems across patterns:\n\n${problems.map((p) => `  ${p}`).join("\n")}`);
  }
}

let cache: Pattern[] | undefined;

/** All patterns, ordered by their `number`. Files starting with "_" are ignored. */
export function getAllPatterns(): Pattern[] {
  if (cache) return cache;

  const patterns: Pattern[] = [];
  const failures: ContentError[] = [];

  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    try {
      patterns.push(readPattern(file));
    } catch (err) {
      if (err instanceof ContentError) failures.push(err);
      else throw err;
    }
  }

  if (failures.length > 0) {
    const files = failures.length === 1 ? "file" : "files";
    throw new Error(
      `Invalid frontmatter in ${failures.length} ${files}:\n\n` +
        failures.map((f) => `  ${f.message}`).join("\n\n"),
    );
  }

  patterns.sort((a, b) => a.number - b.number);
  checkLibrary(patterns);

  // Only cache in production: in dev, editing a .md file should show up on reload.
  if (process.env.NODE_ENV === "production") cache = patterns;
  return patterns;
}

export function getPattern(slug: string): Pattern | undefined {
  return getAllPatterns().find((p) => p.slug === slug);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
