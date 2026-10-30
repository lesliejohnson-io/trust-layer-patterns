# After and over time — What happened, and does it feed back into Before?

Candidate patterns: Incident Replay, Provenance Log, Trust Repair, Learning Loop
(This bucket is empty on the site today. These four would fill it.)

Research status key: **Ready** = incident, interface example and research all found. **Gap** = something still missing, listed under Open.

---

## Incident Replay — Gap (interface example)

**Definition:** After an event, the people responsible can replay what the machine sensed, decided and did, in a form a non-engineer can follow, with the critical moments called out rather than left to be noticed.

**Moment:** After · **Trust job:** Know, Recover

**Anti-pattern name:** The Video Will Speak for Itself.

### Incident: Cruise robotaxi, San Francisco (October 2023)
- Cruise played a 45-second, nine-pane video of the event for regulators, but did not verbally point out the pullover maneuver or the dragging of the pedestrian.
- Connection problems kept regulators from seeing that part of the video clearly.
- The investigation concluded Cruise assumed regulators would ask questions after watching. The lesson for design: raw footage is not a replay. The key moment must be marked.

### Supporting finding: Williston (2016)
- Among NTSB's recommendations after the Tesla crash: event data should be captured and available in standard formats on vehicles with automated control systems.

### Open
- Need a concrete interface example of a good replay tool (e.g., aviation flight-data animation used in investigations, or an AV company's internal event-review tool if any are public).

### Sources
- [Cruise statement on Quinn Emanuel report](https://getcruise.com/news/blog/2024/cruise-releases-third-party-findings-regarding-october-2)
- [Gizmodo on the video regulators couldn't see](https://gizmodo.com/bad-internet-concealed-cruise-s-dragging-incident-1851200958)
- [New Equipment Digest on NTSB recommendations](https://www.newequipment.com/node/5238)

---

## Provenance Log — Ready

**Definition:** Every action that changed the machine's state is recorded with who or what did it, automatically and in a way that can't be quietly altered, so responsibility can be traced after the fact.

**Moment:** After · **Trust job:** Know

**Anti-pattern name:** The Unseen Hand. Changes happen with no record of who made them.

### Incident: UK Post Office Horizon scandal (1999–2015 prosecutions)
- Approximately 1,000 people were prosecuted and convicted across the UK on Horizon evidence (Inquiry Volume 1, para 3.24; the Chair declines to be more precise). Between 50 and 60 more were prosecuted without being convicted (para 3.25).
- The Post Office maintained in court that branch accounts could not be changed remotely.
- Fujitsu engineers could in fact alter branch data remotely, and a Fujitsu engineer told the inquiry he learned only in 2018 that such changes could be indistinguishable from the subpostmaster's own.
- A 2011 Ernst & Young report had warned that Fujitsu staff had unrestricted access to subpostmasters' accounts.

### Interface example: EU AI Act, Article 12 (record-keeping)
- High-risk AI systems must technically allow automatic recording of events (logs) across the system's lifetime.
- Logs must support traceability appropriate to the system's purpose; deployers keep them for at least six months.
- Not a UI, but it is the requirement your interface would be serving. Pair with a real audit-trail view for the site.

### Open
- Find a physical-AI example of a good operator-facing audit trail (who overrode what, when).
- Converted to `content/patterns/08-provenance-log.md` (2026-10-30). Physical-autonomy examples: NTSB/HAR-19/03 (Tempe) confirmed from the report — investigators rebuilt the detection, reclassification and suppressed-braking timeline from the vehicle's own ADS data. UN R157 is cited too: para 8 requires a DSSAD, para 8.2.1 lists the occurrences to record, para 8.3 the reason, date, timestamp to within a second and software version (verified outside the session; EUR-Lex refuses automated retrieval).

### Sources
- [Silicon Canals on remote access](https://siliconcanals.com/?p=102909)
- [The Courier on Gareth Jenkins testimony](https://thecourier.co.uk/?p=5022953)
- [Inquiry Volume 1 on the conviction figure](https://www.postofficehorizoninquiry.org.uk/volume-1-post-office-horizon-it-inquirys-final-report)
- [Ernst & Young warning via Hack Liberty summary](https://links.hackliberty.org/post/771296)
- [EU AI Act Article 12](https://artificialintelligenceact.eu/article/12/)
- [Help Net Security on Article 12 logging](https://www.helpnetsecurity.com/2026/04/16/eu-ai-act-logging-requirements/)

---

## Trust Repair — Gap (incident, interface example)

**Definition:** After a mistake, the machine acknowledges it, explains what changed, and helps the human recalibrate. The goal is not to restore full trust, but to restore the right amount.

**Moment:** After · **Trust job:** Recover

**Anti-pattern name:** Carry On Regardless. The system errs and behaves as if nothing happened.

### Research
- Lee, Kiesler, Forlizzi, Srinivasa & Rybski, "Gracefully Mitigating Breakdowns in Robotic Services," HRI 2010 (Carnegie Mellon, Best Paper). With 317 participants, breakdowns hurt evaluations of the robot, but forewarning and recovery strategies reduced the damage. People with a relational orientation responded best to an apology; those with a utilitarian orientation responded best to compensation.
- Robinette et al., "Overtrust of Robots in Emergency Evacuation Scenarios," HRI 2016 (Georgia Tech). All 26 participants followed a robot in a simulated fire emergency, even though half had just watched it perform poorly. Repair has to work in both directions: lowering trust after failure matters as much as rebuilding it.

### Open
- Incident: find a real deployment where a robot or AV fleet lost operator trust after an error and had to rebuild it (or failed to).
- Interface example: find a shipped product that tells the operator what changed after a fault.
- Pittsburgh angle: the 2010 paper is CMU work, with Jodi Forlizzi as an author.

### Sources
- [Lee et al. 2010, CMU Robotics Institute](https://www.ri.cmu.edu/publications/gracefully-mitigating-breakdowns-in-robotic-services)
- [Lee et al. 2010 PDF](https://minlee.ischool.utexas.edu/materials/Publication/2010-HRI-mitigating_breakdown.pdf)
- [Kurzweil AI on Robinette et al. 2016](https://www.kurzweilai.net/in-emergencies-should-you-trust-a-robot)
- [Penn State record of Robinette et al. 2016](https://pure.psu.edu/en/publications/overtrust-of-robots-in-emergency-evacuation-scenarios/)

---

## Learning Loop — Ready

**Definition:** What operators notice in the field (oddities, near-misses, workarounds) is easy to report, reaches the people who can change the machine, and visibly leads to changes. This is how After feeds back into Before.

**Moment:** After → Before · **Trust job:** Recover

**Anti-pattern name:** Reported and Forgotten.

### Incident 1: Lion Air, the flight before JT610 (2018)
- The day before the crash, the same aircraft experienced MCAS nose-down trim on another flight. That crew cut out the stabilizer trim and landed.
- The captain reported an airspeed disagreement after landing, but the use of the trim cutout switches was not recorded in the maintenance log.
- The next crew took off without knowing what the previous crew had learned.

### Incident 2: Air France 447 (2009)
- The BEA documented nine unreliable-airspeed events on Air France A330 and A340 aircraft in the year before the accident.
- It concluded the operator's feedback mechanisms had not ensured that crews' repeated non-use of the unreliable-airspeed procedure was identified and corrected.

### Interface example: NASA Aviation Safety Reporting System (ASRS)
- Since 1976, a voluntary, confidential, non-punitive reporting system run by NASA, independent of the FAA's enforcement role.
- Reports are turned into safety alerts and the CALLBACK bulletin, which feeds lessons back to the people doing the work.
- Intake in 2023 averaged about 2,040 reports per week.

### Research
- Amershi et al. (2019), Guideline 15: encourage granular feedback during regular interaction.

- Converted to `content/patterns/09-learning-loop.md` (2026-10-30). Main Observed examples are aviation: the flight before JT610, and AF447. The BEA final report was pulled and confirms the nine air safety reports (May 2008 to March 2009, A330/A340 fleet, seven mentioning stall warning), plus six further incidents found only after the accident whose maintenance write-ups described the symptoms partially or not at all. ASRS now cited from the NASA program briefing: established 1975 by NASA and the FAA, intake from 1976, about 2,329 reports a week through December 2025, CALLBACK monthly since 1979.
### Sources
- [Leeham News on JT043 report and maintenance log](https://leehamnews.com/2019/11/15/bjorns-corner-analysing-the-lion-air-jt610-crash-part-3/)
- [AIN on the KNKT preliminary report](https://oldain.ainonline.com/aviation-news/air-transport/2018-11-28/report-lion-air-flight-610-raises-more-questions)
- [btw.media on BEA feedback findings](https://btw.media/en/air-france-447-automation-handoff-stall-recovery-accountability)
- [NASA ASRS Program Briefing](https://asrs.arc.nasa.gov/docs/ASRS_ProgramBriefing.pdf)
- [NASA CALLBACK 50th anniversary issue](https://asrs.arc.nasa.gov/publications/callback/cb_555.html)
- Primary sources to pull: KNKT final report (JT610), BEA final report (AF447)
