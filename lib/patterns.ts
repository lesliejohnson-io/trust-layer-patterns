import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/** One step in a pattern's mechanism flow. */
export type Step = {
  title: string;
  detail: string;
  /** Optional annotation shown under the step with a dashed connector. */
  note?: string;
  /** Marks the pattern's key moment (highlighted in the diagram). */
  key?: boolean;
};

/** A short three-beat sequence for the without / with comparison. */
export type Contrast = {
  steps: string[];
  caption: string;
};

export type Source = {
  title: string;
  author?: string;
  year?: string | number;
  url?: string;
  note?: string;
};

export type Pattern = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  status: string;
  updated?: string;
  steps: Step[];
  without: Contrast;
  with: Contrast;
  sources: Source[];
  bodyHtml: string;
  file: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "patterns");

function readPattern(file: string): Pattern {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  // Slug comes from the filename: "01-handoff.md" -> "handoff"
  const slug = file.replace(/\.md$/, "").replace(/^\d+-/, "");

  return {
    slug,
    number: Number(data.number ?? 0),
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    status: String(data.status ?? "draft"),
    updated: data.updated ? String(data.updated) : undefined,
    steps: (data.steps ?? []) as Step[],
    without: (data.without ?? { steps: [], caption: "" }) as Contrast,
    with: (data.with ?? { steps: [], caption: "" }) as Contrast,
    sources: (data.sources ?? []) as Source[],
    bodyHtml: marked.parse(content, { async: false }) as string,
    file: `content/patterns/${file}`,
  };
}

/** All patterns, ordered by their `number`. Files starting with "_" are ignored. */
export function getAllPatterns(): Pattern[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readPattern)
    .sort((a, b) => a.number - b.number);
}

export function getPattern(slug: string): Pattern | undefined {
  return getAllPatterns().find((p) => p.slug === slug);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
