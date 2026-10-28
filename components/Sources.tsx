import { SOURCE_TYPES, SOURCE_TYPE_LABELS, type Source } from "@/lib/patterns";
import { ExternalLink } from "./ExternalLink";

const GROUP_ORDER = [...SOURCE_TYPES, "other"] as const;

/**
 * A numbered list grouped by source type, numbered continuously so a source
 * can be cited as "[3]" regardless of which group it sits in. Untyped sources
 * fall under "Other" rather than being hidden.
 */
export function Sources({ sources, file }: { sources: Source[]; file: string }) {
  if (sources.length === 0) {
    // Nothing in production: an empty Sources section says less than no
    // section at all. In development it's a reminder to go and research.
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="empty">
        <p>No sources yet.</p>
        <p className="empty-hint">
          Add them under <code>sources:</code> in <code>{file}</code>. This reminder is only shown
          in development.
        </p>
      </div>
    );
  }

  const groups = GROUP_ORDER.map((type) => ({
    type,
    label: SOURCE_TYPE_LABELS[type],
    items: sources.filter((s) => (s.type ?? "other") === type),
  })).filter((g) => g.items.length > 0);

  let counter = 0;

  return (
    <div className="source-groups">
      {groups.map((group) => {
        const start = counter + 1;
        counter += group.items.length;
        return (
          <div key={group.type} className="source-group">
            {groups.length > 1 && <h3 className="subgroup-head source-group-label">{group.label}</h3>}
            <ol className="sources" start={start}>
              {group.items.map((s, i) => (
                <li key={`${s.title}-${i}`} className="source">
                  <span className="source-title">
                    {s.url ? <ExternalLink href={s.url}>{s.title}</ExternalLink> : s.title}
                  </span>
                  {(s.author || s.year) && (
                    <span className="source-meta">{[s.author, s.year].filter(Boolean).join(" · ")}</span>
                  )}
                  {s.note && <span className="source-note">{s.note}</span>}
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
