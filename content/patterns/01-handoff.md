---
number: 1
title: "The Handoff"
status: draft
updated: "2026-10-08"
summary: "The machine yields control on purpose: it signals the transfer, hands over its current state, and gives the human time to orient before they are accountable."

steps:
  - title: "Machine leads"
    detail: "Autonomy nominal"
  - title: "Trigger"
    detail: "Approaching the edge of its limits"
    note: "Hand off early and on purpose, at a designed boundary — not at the moment of failure."
  - title: "Signal + state"
    detail: "Mode, intent, hazards, time left"
    key: true
  - title: "Orient"
    detail: "Human acknowledges, gets bearings"
    note: "The window is sized to how long a human needs to re-enter the task, not to when the machine runs out."
  - title: "Human leads"
    detail: "Machine confirms release"

without:
  steps: ["Machine driving", "Sudden alarm", "Human takes over cold"]
  caption: "Control drops with no context. The human inherits the situation at the worst possible moment."

with:
  steps: ["Early signal", "State briefing", "Confirmed takeover"]
  caption: "The transfer is announced, explained and acknowledged. Responsibility moves only once the human is oriented."

# Add sources as you research. Example:
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://..."
#    note: "Why it matters for this pattern"
sources: []
---

When does the machine yield control back to the human, and how? This pattern defines the moment of transfer: what signals it, what state is communicated, and how much time the human gets to orient before they're "in control."

Critical in autonomous vehicles, surgical robots and drone ops.
