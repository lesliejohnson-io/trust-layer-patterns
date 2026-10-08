---
# Copy this file to e.g. "06-my-pattern.md" (the part after the number becomes the URL).
# Files starting with "_" are ignored by the site.
number: 6
title: "Pattern Name"
status: draft          # draft | researched | stable
updated: "2026-10-08"  # keep the quotes
summary: "One or two sentences: what the pattern does and why it matters."

# 3–6 steps work best. Add `note:` to hang an annotation under a step,
# and `key: true` on the one step that is the pattern's key moment.
steps:
  - title: "Step one"
    detail: "Short detail"
  - title: "Step two"
    detail: "Short detail"
    note: "Optional annotation."
  - title: "Step three"
    detail: "Short detail"
    key: true

without:
  steps: ["Beat one", "Beat two", "Bad outcome"]
  caption: "What goes wrong without the pattern."

with:
  steps: ["Beat one", "Beat two", "Good outcome"]
  caption: "What the pattern makes possible."

sources:
  - title: "Paper or article title"
    author: "Author name"
    year: 2024
    url: "https://example.com"
    note: "Why it matters for this pattern"
---

Free-form research notes go here, in Markdown. They show under "Notes" on the pattern page.
