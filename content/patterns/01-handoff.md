---
number: 1
name: "The Handoff"
intent: "The machine yields control on purpose: it signals the transfer, hands over its current state, and gives the human time to orient before they are accountable."

moment: transition
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [2, 4]
domains: [automotive, surgical, drone]

status: draft
updated: "2026-10-23"

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

related:
  - slug: shared-mental-model
    type: requires
    note: "The state briefing only works if the human's model of the situation is already current."

# Add sources as you research. Example:
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://..."
#    note: "Why it matters for this pattern"
sources:
  - title: "Ironies of Automation"
    author: "Lisanne Bainbridge"
    year: 1983
    url: "https://doi.org/10.1016/0005-1098(83)90046-8"
    note: "The classic statement of why the handoff is the hard part: automation leaves the human to monitor for rare failures and take over when things go wrong, with skills gone rusty from disuse. The case for handing off early and at a designed boundary rather than at the moment of failure."
  - title: "Designing for Situation Awareness"
    author: "Mica Endsley and Debra Jones"
    url: "https://www.amazon.com/dp/1420063553"
    note: "The three-level model — what’s happening, what it means, what happens next — is a test for the state briefing. A handoff that delivers the first level alone leaves the human holding data instead of understanding."
  - title: "The Glass Cage"
    author: "Nicholas Carr"
    year: 2014
    url: "https://www.amazon.com/dp/0393351637"
    note: "Why a cold takeover fails even when the alarm works: skill and attention erode while the machine is driving. The orientation window has to be sized for an operator who has been out of the loop, not for one who never left it."

---

When does the machine yield control back to the human, and how? This pattern defines the moment of transfer: what signals it, what state is communicated, and how much time the human gets to orient before they're "in control."

Critical in autonomous vehicles, surgical robots and drone ops.
