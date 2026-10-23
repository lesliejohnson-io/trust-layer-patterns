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
updated: "2026-10-23"

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

sources:
  - title: "Design Frictions for Mindful Interactions: The Case for Microboundaries"
    author: "Anna L. Cox et al."
    year: 2016
    url: "https://discovery.ucl.ac.uk/id/eprint/1475258/"
    type: paper
    note: "The HCI case for intentional friction — microboundaries that interrupt mindless interaction, including as a way to reduce error."
  - title: "A Model for Types and Levels of Human Interaction with Automation"
    author: "Raja Parasuraman, Thomas B. Sheridan and Christopher D. Wickens"
    year: 2000
    url: "https://doi.org/10.1109/3468.844354"
    type: paper
    note: "Its levels of automation include a veto window, which gives friction a place on a formal scale and ties it to the cost of the action's outcome."
  - title: "Humans and Automation: Use, Misuse, Disuse, Abuse"
    author: "Raja Parasuraman and Victor Riley"
    year: 1997
    url: "https://doi.org/10.1518/001872097778543886"
    type: paper
    note: "Misuse is overreliance and complacency. Friction is a countermeasure for automation bias at exactly the moments where it costs most."
  - title: "An Investigation of the Therac-25 Accidents"
    author: "Nancy G. Leveson and Clark S. Turner"
    year: 1993
    url: "https://web.stanford.edu/class/cs240/old/sp2014/readings/therac-25.pdf"
    type: incident-report
    note: "Observed: hardware interlocks were replaced with software, and operators could edit and proceed past error messages at speed. The cost of missing friction."
---

Intentional resistance before a high-stakes action. A confirmation step, a delay, a second trigger. Slows the human down on purpose when the consequence of error is catastrophic. (The opposite of UX convention — friction is the feature.)
