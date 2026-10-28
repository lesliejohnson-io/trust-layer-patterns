# Transition — When control changes hands, is the human ready?

Candidate patterns: Takeover Request with Lead Time, Return of Control, Operator-to-Operator Handover
(The Handoff already lives here. These three refine it: machine-to-human with time, human-to-machine, and human-to-human.)

Research status key: **Ready** = incident, interface example and research all found. **Gap** = something still missing, listed under Open.

---

## Takeover Request with Lead Time — Ready

**Definition:** When the machine needs the human to take over, it asks early, escalates clearly, and keeps the situation stable while the human gets oriented. If the human never responds, it reaches a safe state on its own.

**Moment:** Transition · **Trust job:** Intervene

**Anti-pattern name:** The Hot Potato. Control is dropped into the human's hands at the worst moment, with no warning.

### Incident: Air France Flight 447 (2009)
- Ice crystals blocked the pitot probes, producing unreliable airspeed data, and the autopilot and autothrust disconnected at cruise altitude over the Atlantic.
- Control passed instantly to the pilot flying. The BEA attributed his excessive control inputs to the startle effect and emotional shock at the autopilot disconnection.
- The BEA also cited the lack of a clear cockpit display of the airspeed inconsistencies.
- Neither pilot called for the unreliable-airspeed procedure. All 228 aboard died.

### Interface example 1: Mercedes-Benz DRIVE PILOT (SAE Level 3)
- When the system needs the driver, it issues a takeover request with a maximum of ten seconds to respond.
- If the driver does not take over, it performs an emergency stop that is safe for the car and following traffic.
- During that stop it also switches on hazard lights and, once stationary, activates the emergency call and unlocks the doors.

### Interface example 2: GM Super Cruise escalation
- Light bar flashes green, then red with chimes and seat vibration, then a voice prompt; if still unanswered, the car slows to a stop.

### Research
- The takeover-time literature in automated driving is large; add a review paper on how many seconds drivers actually need (e.g., Eriksson & Stanton 2017) before publishing.

### Sources
- [BEA final report presentation](https://bea.aero:443/fileadmin/uploads/tx_elyextendttnews/presentation.rapport.final.05juillet2012.en_04.pdf)
- [Flight Safety Foundation on the BEA report](https://flightsafety.org/?p=1999)
- [Mercedes DRIVE PILOT via S&P Global](https://autotechinsight.spglobal.com/news/5265622/mercedes-benz-opens-sales-of-level-3-autonomous-driving-system-drive-pilot-in-germany)
- [eeNews Europe on DRIVE PILOT safety stop](https://www.eenewseurope.com/en/mercedes-hands-free-driving-available-in-series-production/)
- [GMC Super Cruise](https://www.gmc.com/supercruise)

---

## Return of Control — Ready

**Definition:** When the machine takes control back from the human, it does so visibly and only once conditions are right, and it does not keep re-asserting itself against what the human is doing.

**Moment:** Transition · **Trust job:** Intervene, Predict

**Anti-pattern name:** The Tug-of-War. The machine silently takes control back, over and over.

### Incident: Lion Air Flight 610 (2018) and Ethiopian Airlines Flight 302 (2019)
- On both flights, erroneous angle-of-attack data triggered MCAS, which repeatedly moved the stabilizer trim to push the nose down.
- On Lion Air 610, the trim moved more than 30 times; the pilots repeatedly trimmed back against it.
- When a pilot used electric trim, MCAS paused and then reset to command nose-down again.
- After the crashes, Boeing changed MCAS so it no longer activates repeatedly and gives only one input per elevated-AoA event.
- 346 people died across the two accidents.

### Interface example 1: GM Super Cruise resuming steering
- When the driver steers, the light bar pulses blue and the system stands back.
- To let Super Cruise steer again, the driver centers the car in the lane and waits for the light bar to turn green. The system resumes only on a visible, confirmed state.

### Interface example 2: Machinery emergency stop reset (ISO 13850)
- A stop is maintained until reset, and reset requires an intentional human action at the location where the stop was triggered.

### Sources
- [Wikipedia summary of MCAS changes](https://en.wikipedia.org/wiki/Maneuvering_Characteristics_Augmentation_System)
- [Claims Journal on JT610 flight data](https://www.claimsjournal.com/news/international/2018/11/27/288002.htm)
- [Satcom Guru on MCAS reset behavior](https://www.satcom.guru/2019/03/taking-next-steps-while-awaiting-on.html)
- [GM TechLink on Super Cruise escalation](https://gm-techlink.com/?p=15965)
- [Farnell/IDEC on ISO 13850 reset](https://www.farnell.com/datasheets/4129338.pdf)
- Primary sources to pull: KNKT final report (JT610), NTSB safety recommendation report ASR-19-01

---

## Operator-to-Operator Handover — Ready

**Definition:** When responsibility for a machine passes between people (shift change, remote operator to local), the system carries the machine's true state across, including work in progress and anything disabled, rather than relying on memory and paper.

**Moment:** Transition · **Trust job:** Know

**Anti-pattern name:** Lost at Shift Change.

### Incident: Piper Alpha, North Sea (1988)
- During the day shift, a pressure safety valve was removed from condensate pump A for maintenance and a blind flange fitted in its place. The work was not finished by shift end.
- The permits for the pump work and the valve work were separate and not cross-referenced.
- That night, the other pump failed. The night shift restarted pump A without knowing its safety valve was missing.
- Lord Cullen found there was no clear procedure for shift handovers, and that the permit-to-work system was inadequate and habitually departed from.
- 167 people died.

### Interface example: I-PASS (hospital handoffs)
- A structured handoff: Illness severity, Patient summary, Action list, Situational awareness and contingency planning, Synthesis by receiver.
- In a nine-hospital study of 10,740 admissions (NEJM 2014), medical errors fell 23% and preventable adverse events fell 30%, without adding time to handoffs.
- The last step, the receiver restating what they heard, is the part most worth borrowing for robot fleet handovers.

### Open
- Warehouse angle: robot fleet shift handover. What should an incoming operator see about robots that are paused, in maintenance, or running with a disabled sensor?

### Sources
- [btw.media on the Cullen findings](https://btw.media/en/articles/piper-alpha-permit-to-work-shift-handover-accountability)
- [IChemE Loss Prevention Bulletin 261](https://www.icheme.org/media/1982/lpb261_pg03.pdf)
- [Flight Safety Australia quoting Lord Cullen](https://www.flightsafetyaustralia.com/?p=207044)
- [AHRQ PSNet on Starmer et al. 2014](https://psnet.ahrq.gov/issue/changes-medical-errors-after-implementation-handoff-program)
- [Intermountain Healthcare on I-PASS results](https://intermountainhealthcare.org/news/2014/12/multicenter-patientsafety-study-reduces-medical-error-injuries-by-30)
