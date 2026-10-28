import type { Contrast, InterfaceComponent } from "@/lib/patterns";
import { DroneRelease } from "./illustrations/DroneRelease";

const ILLUSTRATIONS: Record<
  InterfaceComponent,
  (props: { variant: "without" | "with" }) => React.ReactElement
> = {
  "drone-release": DroneRelease,
};

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

/**
 * Side-by-side panels: the failure mode, then the patterned version.
 *
 * A pattern that names an `interface` shows the two screens themselves in
 * place of the beat diagram — for a pattern about what a control does under
 * the hand, a drawing of the control says more than three labelled boxes.
 * The captions stay either way.
 */
export function Comparison({
  without,
  withPattern,
  antiPattern,
  illustration,
}: {
  without: Contrast;
  withPattern: Contrast;
  /** Names the mistake rather than calling it the absence of the pattern. */
  antiPattern?: string;
  illustration?: InterfaceComponent;
}) {
  const Illustration = illustration ? ILLUSTRATIONS[illustration] : null;

  return (
    <div className={`compare${Illustration ? " compare-interface" : ""}`}>
      <section className="panel panel-without" aria-labelledby="without-label">
        <h3 id="without-label" className="subhead">
          {antiPattern ? `Anti-pattern: ${antiPattern}` : "Without"}
        </h3>
        {Illustration ? <Illustration variant="without" /> : <Sequence steps={without.steps} variant="without" />}
        <p className="panel-caption">{without.caption}</p>
      </section>
      <section className="panel panel-with" aria-labelledby="with-label">
        <h3 id="with-label" className="subhead">With the pattern</h3>
        {Illustration ? <Illustration variant="with" /> : <Sequence steps={withPattern.steps} variant="with" />}
        <p className="panel-caption">{withPattern.caption}</p>
      </section>
    </div>
  );
}
