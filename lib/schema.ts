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

/**
 * Whether an example is a real system or incident, or the author's concept.
 * Keeping the two apart is what keeps the library honest.
 */
export const EVIDENCE = ["observed", "speculative"] as const;

export type Moment = (typeof MOMENTS)[number];
export type TrustJob = (typeof TRUST_JOBS)[number];
export type Risk = (typeof RISKS)[number];
export type Reversibility = (typeof REVERSIBILITY)[number];
export type Status = (typeof STATUSES)[number];
export type Domain = (typeof DOMAINS)[number];
export type Relation = (typeof RELATIONS)[number];
export type Evidence = (typeof EVIDENCE)[number];

/**
 * A relationship read from the other end. If B requires A, then A's page lists
 * B under "Required by" — the same edge, inverted, so each one is written once.
 */
export const INVERSE_RELATIONS = {
  requires: "required-by",
  precedes: "follows",
  complements: "complements",
  "alternative-to": "alternative-to",
  "tension-with": "tension-with",
} as const satisfies Record<Relation, string>;

export type RelationKey = Relation | (typeof INVERSE_RELATIONS)[Relation];

/** Group headings on the pattern page, in the order they are shown. */
export const RELATION_LABELS: Record<RelationKey, string> = {
  requires: "Requires",
  "required-by": "Required by",
  precedes: "Precedes",
  follows: "Follows",
  complements: "Complements",
  "alternative-to": "Alternative to",
  "tension-with": "In tension with",
};

export const RELATION_ORDER: RelationKey[] = [
  "requires",
  "required-by",
  "precedes",
  "follows",
  "complements",
  "alternative-to",
  "tension-with",
];

export const SOURCE_TYPE_LABELS: Record<(typeof SOURCE_TYPES)[number] | "other", string> = {
  paper: "Papers",
  book: "Books",
  standard: "Standards",
  "incident-report": "Incident reports",
  article: "Articles",
  talk: "Talks",
  other: "Other",
};

/** The question each Moment answers, used as the one-line purpose under group headings. */
export const MOMENT_QUESTIONS: Record<Moment, string> = {
  before: "Before the machine acts, does the human agree?",
  during: "While it runs, can the human see and predict it?",
  transition: "When control changes hands, is the human ready?",
  failure: "When it can't do the job, what happens?",
  after: "After something happens, can trust be rebuilt or recalibrated?",
};

/** The two or three sentences that open each Moment's page. */
export const MOMENT_EXPLANATIONS: Record<Moment, string> = {
  before:
    "Autonomy starts with consent. Before the machine acts, the human needs to know what it intends to do, agree that it should, and have a way to say no. These patterns cover the moment of authorization — what gets shown, what gets confirmed, and how much friction the consequence deserves.",
  during:
    "Once the machine is running, the human's job shifts from deciding to supervising. That only works if its state, reasoning and next move are legible without being noisy. These patterns keep the human able to see what is happening and predict what comes next, so trouble is noticed before it becomes an event.",
  transition:
    "Control changing hands is the most dangerous moment in a partly autonomous system. Someone who has been out of the loop has to rebuild their picture of the situation before they are accountable for it. These patterns cover how a transfer is announced, what state moves with it, and how much time the human gets to orient.",
  failure:
    "Every autonomous system eventually meets a situation it was not built for. What matters is whether it steps down into a defined state and says so, or just quietly stops being trustworthy. These patterns cover fallback ladders, minimal risk states, and how limits get communicated when capability is lost.",
  after:
    "Trust is not set once. It is repaired and recalibrated after every surprise, which means the human has to reconstruct what the machine saw and decided, then adjust how much to rely on it next time. This is the newest part of the library: recovery, review and calibration over time.",
};

/**
 * The 0–5 autonomy scale used by the `autonomy` facet. SAE's driving-
 * automation levels are the reference point, generalized here because the
 * library also covers robots, drones and warehouse systems.
 */
export const AUTONOMY_LEVELS: { level: number; name: string; detail: string }[] = [
  { level: 0, name: "None", detail: "The human performs the task. The machine does nothing on its own." },
  {
    level: 1,
    name: "Assistance",
    detail: "The machine handles one narrow part of the task. The human does the rest and stays responsible throughout.",
  },
  {
    level: 2,
    name: "Partial",
    detail: "The machine controls several parts of the task at once, but the human supervises continuously and is expected to intervene.",
  },
  {
    level: 3,
    name: "Conditional",
    detail: "Within defined conditions the machine runs the task itself. The human can disengage, but must take over when asked.",
  },
  {
    level: 4,
    name: "High",
    detail: "Inside its operating envelope the machine handles everything, including reaching a safe state on its own if nobody responds.",
  },
  {
    level: 5,
    name: "Full",
    detail: "No operating envelope limits, and no expectation of a human fallback.",
  },
];

/** What each relationship between two patterns means. */
export const RELATION_DEFINITIONS: Record<Relation, string> = {
  requires: "The other pattern has to be in place for this one to work at all.",
  complements: "They reinforce each other, but neither depends on the other.",
  "alternative-to": "Two ways of solving the same problem. Pick one.",
  "tension-with": "Applying one makes the other harder. The trade-off is the point.",
  precedes: "One runs before the other in the control loop.",
};

export const RISK_DEFINITIONS: Record<Risk, string> = {
  low: "A mistake is an inconvenience. Nothing is damaged and nobody is hurt.",
  elevated:
    "A mistake costs time, money or equipment, or puts someone in a situation they have to recover from.",
  critical:
    "A mistake can injure or kill, or do damage at a scale that reaches past the people operating it.",
};

export const REVERSIBILITY_DEFINITIONS: Record<Reversibility, string> = {
  reversible: "Undo it and the world is as it was.",
  costly: "It can be put right, but it takes time, money or an apology.",
  irreversible: "Once it has happened, it cannot be taken back.",
};

export const STATUS_DEFINITIONS: Record<Status, string> = {
  seed: "A candidate: name and intent only. Kept in the repo but off the index until it is written up.",
  draft: "Mechanism and problem written, with few sources so far.",
  reviewed: "Every section filled, at least three sources and at least one observed example.",
  stable: "Reviewed, then revisited after real-world use or feedback.",
};

export const EVIDENCE_DEFINITIONS: Record<Evidence, string> = {
  observed: "A real system or a documented incident, with a source you can follow.",
  speculative: "The author's own concept — plausible, but not yet seen in the field.",
};

/** What each trust job buys the human, used as the one-line group purpose. */
export const TRUST_JOB_PURPOSES: Record<TrustJob, string> = {
  know: "See the machine's state and reasoning.",
  predict: "Anticipate what it will do next.",
  intervene: "Act, override or stop it.",
  recover: "Get back to a safe state.",
  calibrate: "Trust it the right amount over time.",
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

const exampleSchema = z
  .object({
    title: z.string().min(1),
    domain: z.enum(DOMAINS),
    evidence: z.enum(EVIDENCE),
    caption: z.string().min(1),
    url: z.url().optional(),
    source: z.string().min(1).optional(),
    image: z.string().min(1).optional(),
    alt: z.string().min(1).optional(),
  })
  .refine((e) => !e.image || e.alt, {
    message: "an example with an image needs alt text",
    path: ["alt"],
  })
  .refine((e) => !e.source || e.url, {
    message: "a source label needs a url to link to",
    path: ["url"],
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
    examples: z.array(exampleSchema).default([]),

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
