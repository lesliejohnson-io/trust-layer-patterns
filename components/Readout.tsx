import { autonomyRange, humanize } from "@/lib/format";
import {
  REVERSIBILITY,
  REVERSIBILITY_STATUS,
  RISKS,
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

/** One scale in the key: every value it can take, in order, with its state. */
function Scale({
  name,
  values,
  statusOf,
}: {
  name: string;
  values: readonly string[];
  statusOf: (value: string) => StatusLevel;
}) {
  return (
    <span className="readout-key-scale">
      <span className="sr-only">{name}: </span>
      {values.map((value) => (
        <span key={value} className={`readout-key-item is-${statusOf(value)}`}>
          <span className="readout-shape" aria-hidden="true">
            {STATUS_SHAPES[statusOf(value)]}
          </span>
          {humanize(value)}
        </span>
      ))}
    </span>
  );
}

/**
 * The facets as a console status display: ruled cells in one strip, condensed
 * labels over monospaced values. Status is deliberately absent — every pattern
 * is a draft until it is reviewed, which the home page says once instead.
 *
 * The key underneath always runs both scales end to end, not only the two
 * values this pattern happens to take: it is there to show where the pattern
 * sits on each scale, which needs the whole scale to be visible.
 */
export function Readout({ pattern }: { pattern: Pattern }) {
  return (
    <div className="readout-block">
      <dl className="readout">
        <Cell label="Trust jobs" value={pattern.trustJobs.map(humanize)} />
        <Cell label="Risk" value={humanize(pattern.risk)} status={RISK_STATUS[pattern.risk]} />
        <Cell
          label="Reversibility"
          value={humanize(pattern.reversibility)}
          status={REVERSIBILITY_STATUS[pattern.reversibility]}
        />
        <Cell label="Autonomy" value={autonomyRange(pattern.autonomy)} />
        <Cell label="Domains" value={pattern.domains.map(humanize)} />
        <Cell label="Updated" value={pattern.updated} />
      </dl>

      <p className="readout-key">
        <Scale name="Risk" values={RISKS} statusOf={(v) => RISK_STATUS[v as never]} />
        <Scale
          name="Reversibility"
          values={REVERSIBILITY}
          statusOf={(v) => REVERSIBILITY_STATUS[v as never]}
        />
      </p>
    </div>
  );
}
