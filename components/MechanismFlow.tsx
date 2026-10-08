import type { Step } from "@/lib/patterns";

/**
 * The mechanism diagram: steps left-to-right with arrows, notes hanging
 * beneath their step on a dashed connector. Stacks vertically on phones.
 */
export function MechanismFlow({ steps }: { steps: Step[] }) {
  return (
    <ol
      className="flow"
      style={{ "--cols": steps.length } as React.CSSProperties}
      aria-label="Mechanism, step by step"
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className="flow-item">
            <div className={`flow-card${step.key ? " is-key" : ""}`}>
              {step.key && <span className="flow-key">Key moment</span>}
              <span className="flow-num">{String(i + 1).padStart(2, "0")}</span>
              <strong className="flow-title">{step.title}</strong>
              <span className="flow-detail">{step.detail}</span>
              {!last && <span className="arrow-h" aria-hidden="true" />}
            </div>
            {step.note ? (
              <p className="flow-note">{step.note}</p>
            ) : (
              <span className="flow-note-spacer" aria-hidden="true" />
            )}
            {!last && <span className="arrow-v" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
