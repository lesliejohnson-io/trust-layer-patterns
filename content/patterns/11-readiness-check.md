---
number: 11
name: "Readiness Check"
intent: "The system confirms the human is actually able to supervise — looking, present, hands available — and escalates when they are not, instead of treating a body in the seat as a human in the loop."

moment: before
trustJobs: [intervene]
risk: critical
reversibility: irreversible
autonomy: [2, 3]
domains: [automotive]

status: draft
updated: "2026-10-30"

steps:
  - title: "Supervision assumed"
    detail: "A human is nominally responsible"
  - title: "Check it"
    detail: "Eyes, head position, hands, presence"
    note: "Super Cruise watches with an infrared camera on the steering column, tracking head position and eye movement rather than asking for a periodic wheel tug."
  - title: "Escalate when it fails"
    detail: "Quietly, then insistently"
    key: true
    note: "The ladder runs light bar flashing green, then flashing red with chimes and seat vibration, then a voice prompt to take control."
  - title: "Act if nobody answers"
    detail: "Slow to a stop rather than continue"
  - title: "Re-check while running"
    detail: "Attention lapses mid-task, not before it"

antiPattern: "Body in the Seat"

without:
  steps: ["Human in the seat", "Attention elsewhere", "Nobody supervising"]
  caption: "Body in the Seat: presence is treated as attention. At Tempe the NTSB found the probable cause was the operator's failure to monitor the road and the automation because she was visually distracted by her phone; Uber had cameras watching operators but did not spot-check that they were paying attention."

with:
  steps: ["Attention checked", "Escalating prompts", "Stop if unanswered"]
  caption: "The machine verifies the thing it is relying on, and stops relying on it when the check fails rather than continuing on an assumption."

related:
  - slug: capability-disclosure
    type: complements
    note: "Disclosure says where the machine will run; this says whether the human it is counting on is actually there. Both are preconditions checked before engagement rather than claims made in a manual."
  - slug: handoff
    type: precedes
    note: "A takeover request assumes someone is ready to receive it. This is the check that assumption rests on, and the reason the escalation ends in a stop rather than a handover."

sources:
  - title: "NTSB calls for federal review process for AV testing on public roads"
    author: "The Trucker"
    year: 2019
    url: "https://www.thetrucker.com/trucking-news/the-nation/ntsb-calls-for-federal-review-process-for-av-testing-on-public-roads"
    type: article
    note: "Secondary reporting on the NTSB's Tempe findings: the probable cause, the ineffective oversight of operators, the absence of a mechanism to address automation complacency, and the recommendation that testing applications include plans to manage operator inattentiveness."
  - title: "Safety agency says distracted driver caused fatal Uber crash"
    author: "Associated Press, via Fox Business"
    year: 2019
    url: "https://www.foxbusiness.com/technology/safety-agency-says-distracted-driver-caused-fatal-uber-crash"
    type: article
    note: "Secondary. Contemporary reporting from the NTSB hearing on the probable cause."
  - title: "NTSB findings on the Uber automated vehicle crash"
    author: "Eckert Seamans"
    year: 2019
    url: "https://www.eckertseamans.com/?p=17389"
    type: article
    note: "Secondary summary of the same findings, carried in the research alongside the other two."
  - title: "Super Cruise"
    author: "GMC"
    url: "https://www.gmc.com/supercruise"
    type: article
    note: "Observed. The Driver Attention System and its escalation: light bar flashing green, then flashing red with chimes and seat vibration, then a voice prompt, and a slowdown to a stop if the driver still does not respond."
  - title: "Seeing Machines technology enables GM Super Cruise driver assistance system"
    year: 2019
    url: "https://internationalfinance.com/company/seeing-machines-technology-enables-gm-super-cruise-driver-assistance-system/"
    type: article
    note: "Secondary. The infrared camera on the steering column tracking head position and eye movement."
  - title: "Trust in Automation: Designing for Appropriate Reliance"
    author: "John D. Lee and Katrina A. See"
    year: 2004
    url: "https://journals.sagepub.com/doi/10.1518/hfes.46.1.50_30392"
    type: paper
    note: "The calibration argument behind the pattern: reliance has to match capability, and a supervisor who has stopped supervising is the clearest case of it not doing so."

review:
  - "Risk (critical): drafted, not from the research."
  - "Reversibility (irreversible): drafted, not from the research."
  - "Autonomy ([2, 3]): drafted. Chosen because the pattern only makes sense where a human is expected to supervise continuously or be fallback-ready; at 4 and 5 there is no such expectation. Not from the research."
  - "Mechanism steps: drafted. The escalation ladder in steps 3 and 4 is sourced from Super Cruise; the step titles, details and the fifth step are not."
  - "Related links (capability-disclosure, handoff): inferred, not from the research. The handoff link is written as `precedes`, which also gives handoff an incoming `follows` — check that reads correctly on that page."
  - "Open question 2: drafted. The research's own Open item is the bucket question, which is carried as the first open question."
  - "NTSB HAR-19/03 (Tempe) is flagged in the research as a primary source to pull. All three Tempe sources here are secondary, and the report itself is already cited on provenance-log — it should replace them."
  - "Domains: automotive only. Both the incident and the interface example are driving; nothing yet from industrial or warehouse supervision."

openQuestions:
  - "The research leaves this pattern's moment unsettled: it is written as Before but continues During, and the notes ask whether it belongs in Before, During, or a new Setup bucket. It sits in Before here because the check gates engagement, but the re-check step is squarely During."
  - "Whether attention monitoring earns its keep at level 2, or whether it mostly makes a fundamentally unsupervisable task look supervised. Tempe suggests the monitoring was not the missing piece so much as the expectation that a person could watch an automated system for hours."
---

The NTSB's framing after Williston was that humans are very poor at monitoring automated systems, and this pattern is the uncomfortable consequence of taking that seriously. If supervision is the safety case, then supervision is a system component, and an unverified component is a guess. Uber had cameras pointed at its operators and did not check what they showed. The cameras were not the control; looking at them would have been.

What makes the Super Cruise version work is that the ladder ends somewhere. Flashing, chiming and speaking are all ways of asking, and a system that only asks has no answer for the case where nobody replies — which is precisely the case the check exists for. Slowing to a stop is the part that makes the rest honest. The harder question is the one the research leaves open: if a person cannot reliably watch an automated system for an hour, a check that catches them not watching has established something true without making the arrangement sound.
