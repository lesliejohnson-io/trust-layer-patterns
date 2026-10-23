---
number: 3
name: "Graceful Degradation"
intent: "When the system can’t do what it’s supposed to, it steps down to a defined fallback state and says so — without panic or silence."

moment: failure
trustJobs: [recover, know]
risk: critical
reversibility: costly
autonomy: [3, 5]
domains: [automotive, drone, industrial]

status: draft
updated: "2026-10-08"

steps:
  - title: "Full capability"
    detail: "All systems nominal"
  - title: "Fault detected"
    detail: "Sensor, link or model loss"
  - title: "Step down"
    detail: "To the next defined fallback"
    note: "Fallbacks are designed in advance as a ladder: full → reduced → minimal-safe → stop."
    key: true
  - title: "Signal limits"
    detail: "What still works, what doesn’t"
  - title: "Restore"
    detail: "Or escalate via a Handoff"
    note: "Restore when you can; hand control to the human when you can’t."

without:
  steps: ["Fault occurs", "Silence or alarm flood", "Operator guesses"]
  caption: "Either nothing changes on screen, or everything screams at once. No one can tell what still works."

with:
  steps: ["Fault occurs", "Calm step-down", "Known limits"]
  caption: "The system names its new state and limits, so the operator adjusts instead of panicking."

related:
  - slug: handoff
    type: precedes
    note: "When the ladder runs out of fallbacks, the system escalates by handing control back."

# Add sources as you research. Example:
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://..."
#    note: "Why it matters for this pattern"
sources: []
---

What the system does when it can't do what it's supposed to — and how it communicates that without panic or silence. Partial capability is still capability. The pattern defines the fallback states and how they're signaled.
