import {
  getAllPatterns,
  humanize,
  MOMENTS,
  MOMENT_QUESTIONS,
  type Pattern,
} from "@/lib/patterns";
import { ControlLoop } from "@/components/ControlLoop";
import { PatternCard } from "@/components/PatternCard";

export default function Home() {
  // Seeds are candidate patterns: in the repo, but kept off the index until
  // they are written up. Phase 4 adds a filter to reveal them.
  const patterns = getAllPatterns().filter((p) => p.status !== "seed");
  const updated = patterns.map((p) => p.updated).sort().at(-1);

  const groups = MOMENTS.map((moment) => ({
    moment,
    question: MOMENT_QUESTIONS[moment],
    patterns: patterns.filter((p: Pattern) => p.moment === moment),
  }));

  return (
    <div className="wrap">
      <section className="hero">
        <h1 className="display">Trust Layer Patterns</h1>
        <p className="lede">
          Most AI pattern libraries cover AI inside software; this one covers autonomy with
          physical consequences — vehicles, surgical and industrial robots, drones and warehouse
          systems.
        </p>
        <p className="label hero-meta">
          {patterns.length} {patterns.length === 1 ? "pattern" : "patterns"}
          {updated && ` · updated ${updated}`}
        </p>
      </section>

      <ControlLoop nodes={groups.map((g) => ({ moment: g.moment, count: g.patterns.length }))} />

      {groups
        .filter((g) => g.patterns.length > 0)
        .map((group) => (
          <section
            key={group.moment}
            id={`moment-${group.moment}`}
            className="group"
            aria-labelledby={`moment-${group.moment}-heading`}
          >
            <header className="group-head">
              <h2 id={`moment-${group.moment}-heading`} className="group-name">
                {humanize(group.moment)}
              </h2>
              <p className="group-question">{group.question}</p>
            </header>
            <ul className="cards">
              {group.patterns.map((p) => (
                <PatternCard key={p.slug} pattern={p} />
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
