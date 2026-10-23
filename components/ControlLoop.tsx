import Link from "next/link";
import { humanize } from "@/lib/format";
import type { Moment } from "@/lib/schema";

export type LoopNode = { moment: Moment; count: number };

/**
 * The five Moments as a loop: Before → During → Transition → Failure → After,
 * with After feeding back to Before. This is the site's signature visual and
 * its primary navigation, so it stays typographic rather than illustrated.
 *
 * On the index it links to each group's anchor; on a Moment page it links to
 * the sibling Moment pages and highlights the current one. A Moment with no
 * patterns is shown but not linked.
 */
export function ControlLoop({
  nodes,
  current,
  hrefFor = (moment) => `#moment-${moment}`,
  compact = false,
  linkEmpty = false,
}: {
  nodes: LoopNode[];
  current?: Moment;
  hrefFor?: (moment: Moment) => string;
  compact?: boolean;
  /** Moment pages exist even when empty, so they stay linkable. */
  linkEmpty?: boolean;
}) {
  return (
    <nav
      className={`loop${compact ? " loop-compact" : ""}`}
      id="moments"
      aria-label="Moments in the control loop"
    >
      <ol className="loop-track">
        {nodes.map(({ moment, count }) => {
          const isCurrent = moment === current;
          const label = (
            <>
              <span className="loop-name">{humanize(moment)}</span>
              <span className="loop-count">
                {count === 0 ? "None yet" : `${count} ${count === 1 ? "pattern" : "patterns"}`}
              </span>
            </>
          );
          return (
            <li
              key={moment}
              className={`loop-node${isCurrent ? " is-current" : ""}`}
              data-moment={moment}
            >
              {count > 0 || linkEmpty ? (
                <Link
                  href={hrefFor(moment)}
                  className={`loop-link${count === 0 ? " is-empty" : ""}`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {label}
                </Link>
              ) : (
                <span className="loop-link is-empty">{label}</span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="loop-return">
        <span>After feeds back to Before</span>
      </p>
    </nav>
  );
}
