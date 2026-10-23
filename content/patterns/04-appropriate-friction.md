---
number: 4
name: "Appropriate Friction"
intent: "Intentional resistance before a high-stakes action. It slows the human down on purpose when an error would be catastrophic — friction is the feature."

moment: before
trustJobs: [intervene, know]
risk: critical
reversibility: irreversible
autonomy: [1, 5]
domains: [drone, surgical, industrial]

status: draft
updated: "2026-10-08"

steps:
  - title: "Intent"
    detail: "Operator starts an action"
  - title: "Weigh stakes"
    detail: "Reversible? Who’s affected?"
    note: "Friction scales with consequence. Low-stakes, reversible actions stay fast."
  - title: "Add friction"
    detail: "Confirm, delay or second trigger"
    key: true
  - title: "Commit"
    detail: "Re-affirm with the consequence shown"
    note: "Restate the consequence — “Release payload over zone B” — never just “Are you sure?”"
  - title: "Execute + log"
    detail: "Action runs, provenance kept"

without:
  steps: ["One tap", "Instant action", "Irreversible error"]
  caption: "Smooth UX makes catastrophic actions as easy as trivial ones. One slip is all it takes."

with:
  steps: ["Initiate", "Friction step", "Deliberate commit"]
  caption: "A pause that restates the consequence catches slips before they become incidents."

# Add sources as you research. Example:
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://..."
#    note: "Why it matters for this pattern"
sources: []
---

Intentional resistance before a high-stakes action. A confirmation step, a delay, a second trigger. Slows the human down on purpose when the consequence of error is catastrophic. (The opposite of UX convention — friction is the feature.)
