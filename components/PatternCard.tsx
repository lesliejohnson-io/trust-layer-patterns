import Link from "next/link";
import type { PatternCardData } from "@/lib/browse";
import { humanize, pad } from "@/lib/format";

/**
 * An index card. The whole card is the link. A status badge shows only while
 * the pattern is short of `stable`, and the source count only once there is
 * at least one — "0 sources" says nothing worth the row.
 */
export function PatternCard({ pattern }: { pattern: PatternCardData }) {
  const sources = pattern.sourceCount;

  return (
    <li className="card-item">
      <Link href={`/patterns/${pattern.slug}`} className="card">
        <span className="card-num">{pad(pattern.number)}</span>
        <span className="card-name">{pattern.name}</span>
        <span className="card-intent">{pattern.intent}</span>
        <span className="card-foot">
          <span className="tag tag-moment" data-moment={pattern.moment}>
            {humanize(pattern.moment)}
          </span>
          <span className="tag">{humanize(pattern.trustJobs[0])}</span>
          {pattern.status !== "stable" && (
            <span className="status status-muted">{pattern.status}</span>
          )}
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
