import Link from "next/link";
import type { PatternCardData } from "@/lib/browse";
import { humanize, momentLabel, pad } from "@/lib/format";

/**
 * An index card. The whole card is the link.
 *
 * The footer carries only what the card's surroundings don't already say: the
 * moment tag is dropped when the cards sit under a moment heading, the trust
 * job when they sit under a trust-job heading. Status shows only once a
 * pattern is `reviewed` or `stable` — everything before that is a draft, which
 * the index says once at the top rather than on every card.
 */
export function PatternCard({
  pattern,
  showMoment = true,
  showTrustJob = true,
}: {
  pattern: PatternCardData;
  showMoment?: boolean;
  showTrustJob?: boolean;
}) {
  const sources = pattern.sourceCount;
  const showStatus = pattern.status === "reviewed" || pattern.status === "stable";

  return (
    <li className="card-item">
      <Link href={`/patterns/${pattern.slug}`} className="card">
        <span className="card-num">{pad(pattern.number)}</span>
        <span className="card-name">{pattern.name}</span>
        <span className="card-intent">{pattern.intent}</span>
        <span className="card-foot">
          {showMoment && <span className="tag">{momentLabel(pattern.moment)}</span>}
          {showTrustJob && <span className="tag">{humanize(pattern.trustJobs[0])}</span>}
          {showStatus && <span className="tag tag-status">{humanize(pattern.status)}</span>}
          {sources > 0 && (
            <span className="label card-sources">
              {sources} {sources === 1 ? "source" : "sources"}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}
