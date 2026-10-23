import Link from "next/link";
import { humanize, type Moment } from "@/lib/patterns";

export type LoopNode = { moment: Moment; count: number };

/**
 * The five Moments as a loop: Before → During → Transition → Failure → After,
 * with After feeding back to Before. This is the site's signature visual and
 * its primary navigation, so it stays typographic rather than illustrated.
 * A Moment with no patterns yet is shown but not linked.
 */
export function ControlLoop({ nodes }: { nodes: LoopNode[] }) {
  return (
    <nav className="loop" id="moments" aria-label="Moments in the control loop">
      <ol className="loop-track">
        {nodes.map(({ moment, count }) => {
          const label = (
            <>
              <span className="loop-name">{humanize(moment)}</span>
              <span className="loop-count">
                {count === 0 ? "None yet" : `${count} ${count === 1 ? "pattern" : "patterns"}`}
              </span>
            </>
          );
          return (
            <li key={moment} className="loop-node" data-moment={moment}>
              {count > 0 ? (
                <Link href={`#moment-${moment}`} className="loop-link">
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
