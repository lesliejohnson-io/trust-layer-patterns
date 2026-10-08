import type { Contrast } from "@/lib/patterns";

function Sequence({ steps, variant }: { steps: string[]; variant: "without" | "with" }) {
  return (
    <ol className="seq">
      {steps.map((s, i) => (
        <li key={s} className="seq-item">
          <span
            className={`chip chip-${variant}${variant === "with" && i === steps.length - 1 ? " is-key" : ""}`}
          >
            {s}
          </span>
          {i < steps.length - 1 && <span className="seq-arrow" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

/** Side-by-side panels: the failure mode, then the patterned version. */
export function Comparison({ without, withPattern }: { without: Contrast; withPattern: Contrast }) {
  return (
    <div className="compare">
      <section className="panel panel-without" aria-labelledby="without-label">
        <h3 id="without-label" className="label">Without</h3>
        <Sequence steps={without.steps} variant="without" />
        <p className="panel-caption">{without.caption}</p>
      </section>
      <section className="panel panel-with" aria-labelledby="with-label">
        <h3 id="with-label" className="label label-accent">With the pattern</h3>
        <Sequence steps={withPattern.steps} variant="with" />
        <p className="panel-caption">{withPattern.caption}</p>
      </section>
    </div>
  );
}
