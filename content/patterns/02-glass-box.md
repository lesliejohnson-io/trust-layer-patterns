---
number: 2
name: "The Glass Box"
intent: "The machine shows its reasoning, not just its output, so operators can trust or override it with context."

moment: during
trustJobs: [know, calibrate]
risk: elevated
reversibility: costly
autonomy: [2, 4]
domains: [industrial, surgical, maritime]

status: draft
updated: "2026-10-08"

steps:
  - title: "Inputs"
    detail: "Sensors, history, thresholds"
  - title: "Inference"
    detail: "Model weighs the evidence"
  - title: "Recommend + why"
    detail: "“X, because of A, B and C”"
    note: "Surface the drivers: sensor confidence, historical match, and which threshold was breached."
    key: true
  - title: "Operator judges"
    detail: "Agree, question or override"
  - title: "Decision logged"
    detail: "With the reasons behind it"
    note: "Overrides feed back, so disagreement becomes signal instead of noise."

without:
  steps: ["Black-box model", "“Do X”", "Blind accept or ignore"]
  caption: "Operators either rubber-stamp or distrust everything. Neither is calibrated trust."

with:
  steps: ["Model + evidence", "“X, because…”", "Informed decision"]
  caption: "Operators check the reasoning against what they see, and override when the machine is missing something."

# Add sources as you research. Example:
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://..."
#    note: "Why it matters for this pattern"
sources: []
---

The machine shows its reasoning, not just its output. Instead of "I recommend X," it surfaces "I recommend X because [sensor confidence / historical data / threshold breach]." Lets operators trust or override with context.
