---
number: 10
name: "Explainable Fault"
intent: "When something goes wrong, the system names the actual fault in the operator's terms and points at what to do about it, instead of showing symptoms or a code. On the 777 a checklist icon sits beside the message."

moment: failure
trustJobs: [know, recover]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation]

status: draft
updated: "2026-10-30"

steps:
  - title: "Fault occurs"
    detail: "A sensor, link or subsystem fails"
  - title: "Diagnose it"
    detail: "Find the cause behind the symptoms"
    note: "On JT610 the crew met the symptoms — stick shaker, airspeed and altitude disagreement, repeated nose-down trim — with nothing naming the miscalibrated angle-of-attack sensor behind them. The AOA DISAGREE alert was not working on that aircraft."
  - title: "Name it in the operator's terms"
    detail: "The condition, not an error code"
    key: true
  - title: "Point at the response"
    detail: "The procedure that goes with it"
    note: "The 777's EICAS puts a checklist icon next to a message whenever an electronic checklist has to be completed, so the fault and its response arrive together."
  - title: "Record it"
    detail: "So maintenance inherits the diagnosis"

antiPattern: "Symptoms Without a Cause"

without:
  steps: ["Fault occurs", "Symptoms only", "Wrong diagnosis"]
  caption: "Symptoms Without a Cause: the crew gets the downstream effects and has to infer the fault under time pressure. On the flight before JT610 the captain attributed the trim behaviour to the speed trim system — a different system entirely."

with:
  steps: ["Fault occurs", "Cause named", "Response to hand"]
  caption: "The alert names the condition in terms the operator recognises and carries the procedure with it, so the diagnosis is not left to inference."

related:
  - slug: graceful-degradation
    type: complements
    note: "Degradation is the step down; this is the part that says which fault caused it. A fallback nobody can name is hard to work with."
  - slug: learning-loop
    type: complements
    note: "An unnamed fault cannot feed back. Without the alert, the JT610 crew could not document the faulty sensor, so it was not available to help maintenance."

sources:
  - title: "Lion Air MAX report finds Boeing, airline, pilots contributed to tragedy"
    author: "AirlineRatings"
    year: 2019
    url: "https://www.airlineratings.com/articles/lion-air-max-report-finds-boeing-airline-pilots-contributed-tragedy"
    type: article
    note: "Secondary reporting on the KNKT final report. Carried in the research as the source for the miscalibrated angle-of-attack sensor and the inoperative AOA DISAGREE alert."
  - title: "Bjorn's Corner: Analysing the Lion Air JT610 crash, Part 3"
    author: "Leeham News"
    year: 2019
    url: "https://leehamnews.com/2019/11/15/bjorns-corner-analysing-the-lion-air-jt610-crash-part-3/"
    type: article
    note: "Secondary. The symptoms the crew actually saw, and the previous captain's attribution of the trim behaviour to the speed trim system."
  - title: "16.422 Human Supervisory Control of Automated Systems — alerting systems"
    author: "MIT OpenCourseWare"
    year: 2004
    url: "https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/8d934ba66f80b2ca1f6f82cb0ee3e4bf_040804alertsys_1.pdf"
    type: talk
    note: "Observed. Course material describing the 777 EICAS behaviour: each alert message names the condition, and a checklist icon appears beside a message when an electronic checklist must be completed."
  - title: "Guidelines for Human-AI Interaction"
    author: "Saleema Amershi et al."
    year: 2019
    url: "https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/"
    type: paper
    note: "CHI 2019. Guideline 11 is to make clear why the system did what it did — the same requirement stated for software."
  - title: "People + AI Guidebook — Errors + Graceful Failure"
    author: "Google PAIR"
    type: article
    note: "Listed in the research as supporting material on failure communication. No link is given in the notes and the chapter has not been pulled."

review:
  - "Risk (critical): drafted, not from the research."
  - "Reversibility (irreversible): drafted, not from the research."
  - "Autonomy ([1, 4]): drafted. Nothing in the research speaks to the range."
  - "Mechanism steps: drafted. The research has definition, incident and interface example but no mechanism; the two step notes are sourced, the titles and details are not."
  - "Related links (graceful-degradation, learning-loop): inferred, not from the research."
  - "Open question: drafted. The research has no Open section for this pattern."
  - "KNKT final report (JT610) is flagged in the research as a primary source to pull. Every JT610 claim here rests on secondary reporting until it is."
  - "Google PAIR Guidebook cited without a URL — the research gives none, and the chapter has not been read."
  - "Domains: aviation only. Both examples are flight-deck; no industrial or automotive instance yet."

openQuestions:
  - "How specific the named cause should be when the system cannot tell which of several faults it is seeing. Naming the wrong cause confidently is worse than naming the symptoms, and the honest middle — a short list of candidates — is harder to act on under time pressure."
---

The useful detail in JT610 is that the alert meant to name the fault was not working on that aircraft, so the crew were left with a stick shaker, disagreeing airspeed and altitude, and trim that kept pushing the nose down. Symptoms are not a diagnosis. The previous day's captain had put the same behaviour down to the speed trim system, which is exactly what happens when a cluster of effects arrives without the cause attached: the crew reaches for the system that best explains what they can see.

There is a second cost, further downstream. Investigators noted that without the alert the crew could not document the faulty sensor, so it never reached maintenance. A fault that cannot be named cannot be reported, which means it cannot be fixed, which means the next crew meets it too. That is why the last step here is recording rather than displaying — naming the condition is what makes it transmissible. The 777's answer is the plainest version of the pattern: the message states the condition, and the icon beside it says there is a checklist to run.
