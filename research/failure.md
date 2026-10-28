# Failure — When it can't do the job, what happens?

Candidate patterns: Explainable Fault, Escalation Ladder
(Graceful Degradation already lives here.)

Research status key: **Ready** = incident, interface example and research all found. **Gap** = something still missing, listed under Open.

---

## Explainable Fault — Ready

**Definition:** When something goes wrong, the system names the actual fault in the operator's terms and points to what to do about it, instead of showing only symptoms or a code.

**Moment:** Failure · **Trust job:** Know, Recover

**Anti-pattern name:** Symptoms Without a Cause.

### Incident: Lion Air Flight 610 (2018)
- The root problem was a miscalibrated angle-of-attack sensor, but the AOA DISAGREE alert that should have flagged it was not working on the aircraft.
- The crew saw downstream symptoms instead: stick shaker, airspeed and altitude disagreements, and repeated nose-down trim.
- Investigators noted that without the alert, the faulty sensor could not be documented by the crew and so was not available to help maintenance.
- On the previous flight, the captain attributed the trim behavior to a different system (speed trim), showing how symptoms without a named cause lead to the wrong diagnosis.

### Interface example: Boeing 777 EICAS with electronic checklist
- Each alert message names the condition, and on the 777 a checklist icon appears next to a message whenever an electronic checklist must be completed. The fault and the response sit together.

### Research
- Amershi et al. (2019), Guideline 11: make clear why the system did what it did.
- Google PAIR Guidebook, Errors + Graceful Failure chapter.

### Sources
- [AirlineRatings on KNKT final report](https://www.airlineratings.com/articles/lion-air-max-report-finds-boeing-airline-pilots-contributed-tragedy)
- [Leeham News analysis of JT610](https://leehamnews.com/2019/11/15/bjorns-corner-analysing-the-lion-air-jt610-crash-part-3/)
- [MIT 16.422 alerting systems lecture (EICAS checklist icon)](https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/8d934ba66f80b2ca1f6f82cb0ee3e4bf_040804alertsys_1.pdf)
- [Microsoft Guidelines for Human-AI Interaction](https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/)
- Primary source to pull: KNKT final report (JT610)

---

## Escalation Ladder — Ready

**Definition:** When the machine hits something it can't handle, it has defined steps for getting help: ask a remote human, hand to a local human, or stop safely. It chooses the right step for the severity, and it never picks a "keep moving" fallback after a serious event.

**Moment:** Failure · **Trust job:** Recover

**Anti-pattern name:** Wrong Rung. The system climbs to a fallback that suits a minor problem during a serious one.

### Incident: Cruise robotaxi, San Francisco (October 2023)
- A hit-and-run driver struck a pedestrian and threw her into the path of a Cruise vehicle, which could not avoid hitting her.
- The vehicle classified the collision as a side impact and performed a pullover maneuver to the outer lane instead of an emergency stop.
- During the pullover it dragged the pedestrian about 20 feet.
- California suspended Cruise's driverless permit.

### Interface example: Waymo fleet response
- When the vehicle encounters something it does not know how to handle, it asks a remote fleet response agent for guidance, often as multiple-choice questions.
- The agent does not drive. The vehicle evaluates the input and stays in control of driving.
- About 70 agents are typically on duty for a fleet of roughly 3,000 vehicles.
- Counterexample worth showing: in the reported cone-zone case, fleet response gave incorrect guidance and the vehicle had to be completed by roadside assistance. The ladder needs a rung that can physically stop the vehicle.

### Open
- Pair with Graceful Degradation on the site: degradation is what the machine does; the ladder is who it asks.

### Sources
- [Cruise statement on Quinn Emanuel report](https://getcruise.com/news/blog/2024/cruise-releases-third-party-findings-regarding-october-2)
- [IoT M2M Council on side-impact misclassification](https://www.iotm2mcouncil.org/iot-library/news/connected-transportation-news/accident-report-slams-cruise-leadership/)
- [Mission Local on DMV suspension](https://missionlocal.org/2023/10/cruise-drag-pedestrian-dmv-license/)
- [Changing Lanes on Waymo fleet response](https://www.changinglanesnewsletter.com/p/waymos-remote-assistance-isnt-scandalous)
- [TechCrunch on Waymo remote assistance staffing](https://techcrunch.com/2026/03/25/waymo-relies-on-firefighters-and-police-to-bail-out-stuck-robotaxis/)
- [AI Business on Waymo cone incident](https://aibusiness.com/verticals/waymo-car-filmed-as-it-gets-confused-by-cones-escapes-its-own-support-team)
- Primary source to pull: Exponent root-cause analysis and Quinn Emanuel report (Cruise)
