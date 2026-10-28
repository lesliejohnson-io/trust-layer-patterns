import { autonomyRange, humanize } from "@/lib/format";
import {
  REVERSIBILITY_STATUS,
  RISK_STATUS,
  STATUS_SHAPES,
  type StatusLevel,
} from "@/lib/schema";
import type { Pattern } from "@/lib/patterns";

/**
 * One cell of the readout. A cell with a status carries its shape as well as
 * its colour, so the state is legible without seeing the hue; the value's own
 * word ("Critical") is what screen readers announce, which is why the shape is
 * hidden from them rather than read out as "black square". A cell holding
 * several values stacks them a line each, so no separator mark is needed.
 */
function Cell({
  label,
  value,
  status,
}: {
  label: string;
  value: string | string[];
  status?: StatusLevel;
}) {
  return (
    <div className={`readout-cell${status ? ` is-${status}` : ""}`}>
      <dt className="readout-label">{label}</dt>
      <dd className="readout-value">
        {status && (
          <span className="readout-shape" aria-hidden="true">
            {STATUS_SHAPES[status]}
          </span>
        )}
        {Array.isArray(value)
          ? value.map((v) => (
              <span className="readout-item" key={v}>
                {v}
              </span>
            ))
          : value}
      </dd>
    </div>
  );
}

/**
 * The facets as a console status display: ruled cells in one strip, condensed
 * labels over monospaced values. Status is deliberately absent — every pattern
 * is a draft until it is reviewed, which the home page says once instead.
 */
export function Readout({ pattern }: { pattern: Pattern }) {
  return (
    <dl className="readout">
      <Cell label="Trust jobs" value={pattern.trustJobs.map(humanize)} />
      <Cell
        label="Risk"
        value={humanize(pattern.risk)}
        status={RISK_STATUS[pattern.risk]}
      />
      <Cell
        label="Reversibility"
        value={humanize(pattern.reversibility)}
        status={REVERSIBILITY_STATUS[pattern.reversibility]}
      />
      <Cell label="Autonomy" value={autonomyRange(pattern.autonomy)} />
      <Cell label="Domains" value={pattern.domains.map(humanize)} />
      <Cell label="Updated" value={pattern.updated} />
    </dl>
  );
}
