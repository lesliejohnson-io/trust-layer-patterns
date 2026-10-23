---
number: 5
name: "Shared Mental Model"
intent: "The interface keeps what the human believes about the system’s state in sync with what that state actually is, so human and machine can predict each other."

moment: during
trustJobs: [predict, know]
risk: elevated
reversibility: costly
autonomy: [2, 5]
domains: [industrial, warehouse, surgical]

status: draft
updated: "2026-10-23"

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

sources:
  - title: "How in the World Did We Ever Get into That Mode? Mode Error and Awareness in Supervisory Control"
    author: "Nadine B. Sarter and David D. Woods"
    year: 1995
    url: "https://trid.trb.org/View/426376"
    type: paper
    note: "Mode error and automation surprises: what happens when the operator's model of the system's mode diverges from its actual mode."
  - title: "Ten Challenges for Making Automation a “Team Player” in Joint Human-Agent Activity"
    author: "Gary Klein, David D. Woods, Jeffrey M. Bradshaw, Robert R. Hoffman and Paul J. Feltovich"
    year: 2004
    url: "https://doi.org/10.1109/MIS.2004.74"
    type: paper
    note: "Mutual predictability, common ground, making current state obvious, and communicating status and intention. Close to a specification for this pattern."
  - title: "Toward a Theory of Situation Awareness in Dynamic Systems"
    author: "Mica R. Endsley"
    year: 1995
    url: "https://doi.org/10.1518/001872095779049543"
    type: paper
    note: "Perception, comprehension and projection — the vocabulary for what being “in sync” actually means."
  - title: "Shared Mental Models in Expert Team Decision Making"
    author: "Janis A. Cannon-Bowers, Eduardo Salas and Sharolyn Converse"
    year: 1993
    url: "https://www.proquest.com/docview/38428594"
    type: paper
    note: "The origin of the term in team research: compatible models are what let teammates coordinate without saying anything."
---

The interface actively synchronizes what the human believes about the system's state with what the system's state actually is. Especially critical in collaborative robotics — human and machine working the same physical space, each needing to predict the other.
