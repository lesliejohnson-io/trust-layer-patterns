import { humanize, type Example } from "@/lib/patterns";
import { ExternalLink } from "./ExternalLink";

/**
 * "In the field" cards. Every example is labelled Observed (a real system or
 * incident) or Speculative (the author's concept) — the distinction is what
 * keeps the library honest while examples are still being collected.
 */
export function Examples({ examples }: { examples: Example[] }) {
  return (
    <ul className="examples">
      {examples.map((e) => (
        <li key={e.title} className="example">
          {e.image && (
            // Plain <img>: these are author-supplied paths, often remote.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="example-image" src={e.image} alt={e.alt ?? ""} />
          )}
          <div className="example-body">
            <p className="example-tags">
              <span className="tag">{humanize(e.domain)}</span>
              <span className={`tag tag-evidence tag-${e.evidence}`}>{humanize(e.evidence)}</span>
            </p>
            <h3 className="example-title">{e.title}</h3>
            <p className="example-caption">{e.caption}</p>
            {e.url && (
              <p className="example-source">
                <ExternalLink href={e.url}>{e.source ?? "Source"}</ExternalLink>
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
