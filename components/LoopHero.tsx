import Link from "next/link";
import { MOMENT_LABELS, MOMENT_PROMPTS, type Moment } from "@/lib/schema";

export type LoopNode = { moment: Moment; count: number };

/** A ruled shaft with a head: the arrow between two stations. Rotated by CSS
 *  to point down when the loop becomes a vertical sequence. */
function ForwardArrow() {
  return (
    <svg className="station-arrow" viewBox="0 0 34 12" width="34" height="12" aria-hidden="true">
      <path d="M0 6H25" stroke="currentColor" strokeWidth="2" />
      <path d="M34 6 23 11.6V0.4Z" fill="currentColor" />
    </svg>
  );
}

/** The head on the end of the return path, pointing back into Before. */
function ReturnHead() {
  return (
    <svg className="return-head" viewBox="0 0 14 12" width="14" height="12" aria-hidden="true">
      <path d="M7 0 14 12H0Z" fill="currentColor" />
    </svg>
  );
}

/**
 * The control loop as the index's hero: five stations in order, connected by
 * drawn arrows, with the path from the last station returning into the first.
 *
 * The return is the argument the diagram exists to make — what a system learns
 * after an event changes what its operator agrees to before the next one — so
 * it is drawn at the weight of the forward arrows rather than implied.
 *
 * Ink only. The straight runs are ruled borders and the heads are SVG, so
 * nothing stretches as the loop reflows: the same markup becomes a vertical
 * sequence with the return path up its left side below 760px, where five
 * columns leave each station too narrow to read.
 */
export function LoopHero({
  nodes,
  hrefFor,
  current,
  compact = false,
  linkEmpty = false,
}: {
  nodes: LoopNode[];
  hrefFor: (moment: Moment) => string;
  /** Marks the station the reader is already on. */
  current?: Moment;
  /** On a Moment's own page the loop is navigation, not the hero: same
   *  drawing, names and counts only. */
  compact?: boolean;
  /** Moment pages exist even when empty, so they stay linkable. */
  linkEmpty?: boolean;
}) {
  return (
    <nav
      className={`loop-hero${compact ? " is-compact" : ""}`}
      id="moments"
      aria-label="Moments in the control loop"
    >
      <ol className="stations">
        {nodes.map(({ moment, count }, i) => {
          const empty = count === 0;
          const isCurrent = moment === current;
          const body = (
            <>
              <span className="station-name">{MOMENT_LABELS[moment]}</span>
              {!compact && <span className="station-prompt">{MOMENT_PROMPTS[moment]}</span>}
              <span className="station-count">
                {empty ? "None yet" : `${count} ${count === 1 ? "pattern" : "patterns"}`}
              </span>
            </>
          );

          return (
            <li
              key={moment}
              className={`station${empty ? " is-empty" : ""}${isCurrent ? " is-current" : ""}`}
            >
              {i > 0 && <ForwardArrow />}
              {empty && !linkEmpty ? (
                <span className="station-body">{body}</span>
              ) : (
                <Link
                  href={hrefFor(moment)}
                  className="station-body"
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <div className="return-path" aria-hidden="true">
        <ReturnHead />
      </div>
      {/* The drawn return says it visually; this says it for a screen reader. */}
      <p className="return-label">
        <span>After and over time feeds back into Before</span>
      </p>
    </nav>
  );
}
