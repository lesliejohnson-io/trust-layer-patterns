---
# Copy this file to e.g. "06-my-pattern.md" (the part after the number becomes
# the URL). Files starting with "_" are ignored by the site.
#
# Required: number, name, intent, moment, trustJobs, updated, steps, without, with.
# Everything else can be deleted and falls back to the default shown in [].

number: 6
name: "Pattern Name"
intent: "One sentence: what the machine does and what it buys the human. Shown on cards and as the page lede."

# --- Facets -----------------------------------------------------------------
# moment: where in the control loop this sits. Exactly one. Drives grouping.
#   before      Before the machine acts, does the human agree?
#   during      While it runs, can the human see and predict it?
#   transition  When control changes hands, is the human ready?
#   failure     When it can't do the job, what happens?
#   after       What happened, and what is it doing to us over time?
#               (written in the interface as "After and over time")
moment: during

# trustJobs: what the human needs. One or two of:
#   know · predict · intervene · recover · calibrate
trustJobs: [know]

risk: elevated            # low | elevated | critical            [elevated]
reversibility: costly     # reversible | costly | irreversible   [costly]

# autonomy: the range of automation levels this applies to, on the 0–5 scale
# defined on the About page.
autonomy: [0, 5]          # [[0, 5]]

# domains: one or more of automotive, surgical, industrial, drone, warehouse,
# maritime, aviation, home, general. Use "general" on its own, never alongside
# a specific domain.
domains: [general]        # [[general]]

# --- Housekeeping -----------------------------------------------------------
status: draft             # seed | draft | reviewed | stable     [draft]
updated: "2026-10-23"     # keep the quotes
aliases: []               # other names people search for        [[]]

# --- Links ------------------------------------------------------------------
# related: other patterns in this library. `slug` must exist; the note is
# required and is shown on the card. type is one of:
#   requires | complements | alternative-to | tension-with | precedes
# You only need to write a relationship once — the other pattern picks it up
# as an incoming link.
related: []
#  - slug: shared-mental-model
#    type: requires
#    note: "One sentence on why."

# crossReferences: patterns in other libraries. Link only, never copied content.
crossReferences: []
#  - library: "Shape of AI"
#    name: "Verification"
#    url: "https://www.shapeof.ai/patterns/verification"
#    note: "Software analog; this pattern adds time-to-orient and physical stakes."

# sources: `title` required. `type` is one of paper, book, standard,
# incident-report, article, talk.
sources: []
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://example.com"
#    type: paper
#    note: "Why it matters for this pattern"

# examples: the "In the field" cards. `evidence` is required and is either
# `observed` (a real system or incident) or `speculative` (your own concept) —
# the distinction is what keeps the library honest. An image needs alt text.
examples: []
#  - title: "What the example is called"
#    domain: automotive
#    evidence: observed
#    caption: "One or two sentences on what this shows."
#    url: "https://example.com"
#    source: "Name of the source, shown as the link text"
#    image: "/examples/my-image.png"
#    alt: "What the image shows, for screen readers"

# --- Learning log -----------------------------------------------------------
# openQuestions renders as the "Still figuring out" block. It shows whenever
# there is at least one question; set showOpenQuestions: false to keep them in
# the file but off the page.
openQuestions: []
#  - "What is still unresolved about this pattern?"
# showOpenQuestions: true

# --- Diagrams ---------------------------------------------------------------
# 3–6 steps work best. Add `note:` to hang an annotation under a step, and
# `key: true` on the one step that is the pattern's key moment.
steps:
  - title: "Step one"
    detail: "Short detail"
  - title: "Step two"
    detail: "Short detail"
    note: "Optional annotation."
  - title: "Step three"
    detail: "Short detail"
    key: true

# antiPattern: the name of the mistake the "without" panel shows. A named
# mistake people actually make, not just the absence of the pattern. Leave it
# out if the left side is only a gap.
# antiPattern: "One-Tap Catastrophe"

# interface: show built interface screens in the without / with section
# instead of the box diagram below. Only patterns with an illustration built
# for them can use it; the names that exist are listed in lib/schema.ts
# (INTERFACE_COMPONENTS). Leave it out and the box diagram is used.
# interface:
#   component: "drone-release"

without:
  steps: ["Beat one", "Beat two", "Bad outcome"]
  caption: "What goes wrong without the pattern."

with:
  steps: ["Beat one", "Beat two", "Good outcome"]
  caption: "What the pattern makes possible."
---

## Problem

The tension this pattern resolves, framed as competing forces — "the machine
must keep going *and* the human must be ready". One to three short paragraphs.

## When to use

- A condition tied to risk or reversibility.
- Another condition.

## When not to use

- Where the cost of the pattern outweighs what it buys.
- Another exclusion.

## Design considerations

- **Write each item as a bold imperative rule.** Then one or two sentences on
  why it matters and what breaks without it. Aim for three to six items.

## In the field

Example cards go here. Each one needs a domain, a caption, a source link, and a
label that is either **Observed** (a real system or incident) or **Speculative**
(the author's concept).

## Notes

Free-form research notes.
