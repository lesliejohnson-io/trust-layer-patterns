---
number: 5
title: "Shared Mental Model"
status: draft
updated: "2026-10-08"
summary: "The interface keeps what the human believes about the system’s state in sync with what that state actually is, so human and machine can predict each other."

steps:
  - title: "Machine state"
    detail: "Mode, intent, next move"
  - title: "Externalize"
    detail: "Display, light, sound, motion cue"
    note: "Show intent before motion: where the machine will go next, not only where it is now."
  - title: "Human belief"
    detail: "Believed state, predicted move"
  - title: "Detect drift"
    detail: "Belief ≠ actual state"
    note: "Drift is caught both ways: the machine also models what the human expects it to do."
    key: true
  - title: "Resync"
    detail: "Correct, then confirm alignment"

without:
  steps: ["Robot moves", "Human assumes", "Near miss"]
  caption: "The human’s picture of the machine drifts from reality, and no one notices until something goes wrong."

with:
  steps: ["Intent shown", "Human predicts", "Coordinated work"]
  caption: "Each side can anticipate the other, so they share a workspace safely."

# Add sources as you research. Example:
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://..."
#    note: "Why it matters for this pattern"
sources: []
---

The interface actively synchronizes what the human believes about the system's state with what the system's state actually is. Especially critical in collaborative robotics — human and machine working the same physical space, each needing to predict the other.
