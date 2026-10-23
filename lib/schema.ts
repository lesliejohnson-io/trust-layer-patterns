import { z } from "zod";

/**
 * The vocabularies behind the facets. Exported as `as const` arrays so the UI
 * can build filter chips and the About page's definitions from the same source
 * the validator uses.
 */
export const MOMENTS = ["before", "during", "transition", "failure", "after"] as const;
export const TRUST_JOBS = ["know", "predict", "intervene", "recover", "calibrate"] as const;
export const RISKS = ["low", "elevated", "critical"] as const;
export const REVERSIBILITY = ["reversible", "costly", "irreversible"] as const;
export const STATUSES = ["seed", "draft", "reviewed", "stable"] as const;
export const DOMAINS = [
  "automotive",
  "surgical",
  "industrial",
  "drone",
  "warehouse",
  "maritime",
  "aviation",
  "home",
  "general",
] as const;
export const SOURCE_TYPES = ["paper", "book", "standard", "incident-report", "article", "talk"] as const;
export const RELATIONS = ["requires", "complements", "alternative-to", "tension-with", "precedes"] as const;

export type Moment = (typeof MOMENTS)[number];
export type TrustJob = (typeof TRUST_JOBS)[number];
export type Risk = (typeof RISKS)[number];
export type Reversibility = (typeof REVERSIBILITY)[number];
export type Status = (typeof STATUSES)[number];
export type Domain = (typeof DOMAINS)[number];
export type Relation = (typeof RELATIONS)[number];

/** The question each Moment answers, used as the one-line purpose under group headings. */
export const MOMENT_QUESTIONS: Record<Moment, string> = {
  before: "Before the machine acts, does the human agree?",
  during: "While it runs, can the human see and predict it?",
  transition: "When control changes hands, is the human ready?",
  failure: "When it can't do the job, what happens?",
  after: "After something happens, can trust be rebuilt or recalibrated?",
};

const hasNoDuplicates = (values: readonly string[]) => new Set(values).size === values.length;

/**
 * gray-matter turns an unquoted YAML date into a JS Date, so accept both and
 * normalize to YYYY-MM-DD.
 */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v.trim()))
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), "expected a YYYY-MM-DD date");

const stepSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  note: z.string().min(1).optional(),
  key: z.boolean().optional(),
});

const contrastSchema = z.object({
  steps: z.array(z.string().min(1)).length(3, "needs exactly three beats"),
  caption: z.string().min(1),
});

const sourceSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1).optional(),
  year: z.union([z.string(), z.number()]).optional(),
  url: z.url().optional(),
  note: z.string().min(1).optional(),
  type: z.enum(SOURCE_TYPES).optional(),
});

const relatedSchema = z.object({
  slug: z.string().min(1),
  type: z.enum(RELATIONS),
  note: z.string().min(1, "every related pattern needs a one-sentence note"),
});

const crossReferenceSchema = z.object({
  library: z.string().min(1),
  name: z.string().min(1),
  url: z.url(),
  note: z.string().min(1).optional(),
});

const autonomySchema = z
  .tuple([z.number().int().min(0).max(5), z.number().int().min(0).max(5)])
  .refine(([low, high]) => low <= high, "expected [low, high] with low <= high")
  .default([0, 5]);

const domainsSchema = z
  .array(z.enum(DOMAINS))
  .min(1)
  .refine(hasNoDuplicates, "contains duplicates")
  .refine(
    (d) => !(d.includes("general") && d.length > 1),
    '"general" cannot be combined with a specific domain',
  )
  .default(["general"]);

/**
 * A pattern's frontmatter. `moment` and `trustJobs` are the only new required
 * fields: they drive grouping, and a silent default would file a pattern under
 * the wrong heading instead of failing the build. Everything else has a default.
 */
export const frontmatterSchema = z
  .object({
    number: z.number().int().min(1),
    name: z.string().min(1),
    intent: z.string().min(1).max(240, "keep the intent to one sentence (240 characters)"),

    moment: z.enum(MOMENTS),
    trustJobs: z
      .array(z.enum(TRUST_JOBS))
      .min(1)
      .max(2, "a pattern has one or two trust jobs")
      .refine(hasNoDuplicates, "contains duplicates"),
    risk: z.enum(RISKS).default("elevated"),
    reversibility: z.enum(REVERSIBILITY).default("costly"),
    autonomy: autonomySchema,
    domains: domainsSchema,

    status: z.enum(STATUSES).default("draft"),
    updated: isoDate,
    aliases: z.array(z.string().min(1)).default([]),

    related: z.array(relatedSchema).default([]),
    crossReferences: z.array(crossReferenceSchema).default([]),
    sources: z.array(sourceSchema).default([]),

    openQuestions: z.array(z.string().min(1)).default([]),
    showOpenQuestions: z.boolean().optional(),

    steps: z
      .array(stepSchema)
      .min(2)
      .max(8, "3-6 steps work best; 8 is the hard limit")
      .refine(
        (steps) => steps.filter((s) => s.key).length <= 1,
        "only one step can be the key moment",
      ),
    without: contrastSchema,
    with: contrastSchema,
  })
  .transform((fm) => ({
    ...fm,
    showOpenQuestions: fm.showOpenQuestions ?? fm.openQuestions.length > 0,
  }));

export type Frontmatter = z.infer<typeof frontmatterSchema>;

/** One "field — what's wrong" line per problem, aligned for readable build output. */
export function formatIssues(error: z.ZodError): string[] {
  const rows = error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    message: issue.message,
  }));
  const width = Math.max(...rows.map((r) => r.field.length));
  return rows.map((r) => `${r.field.padEnd(width)}  ${r.message}`);
}
