import Link from "next/link";
import { pad, type RelationGroup } from "@/lib/patterns";

/**
 * Related patterns, grouped by relationship. Incoming edges are already
 * inverted by `getRelationGroups`, so "Required by" reads the right way round.
 */
export function RelatedPatterns({ groups }: { groups: RelationGroup[] }) {
  return (
    <div className="relations">
      {groups.map((group) => (
        <div key={group.key} className="relation-group">
          <h3 className="label relation-label">{group.label}</h3>
          <ul className="relation-list">
            {group.entries.map(({ pattern, note }) => (
              <li key={pattern.slug}>
                <Link href={`/patterns/${pattern.slug}`} className="relation-card">
                  <span className="relation-num">{pad(pattern.number)}</span>
                  <span className="relation-name">{pattern.name}</span>
                  <span className="relation-note">{note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
