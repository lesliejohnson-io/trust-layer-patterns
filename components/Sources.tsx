import type { Source } from "@/lib/patterns";

export function Sources({ sources, file }: { sources: Source[]; file: string }) {
  if (sources.length === 0) {
    return (
      <div className="empty">
        <p>No sources yet.</p>
        <p className="empty-hint">
          Add them under <code>sources:</code> in <code>{file}</code>.
        </p>
      </div>
    );
  }

  return (
    <ol className="sources">
      {sources.map((s, i) => (
        <li key={`${s.title}-${i}`} className="source">
          <span className="source-title">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title}
              </a>
            ) : (
              s.title
            )}
          </span>
          {(s.author || s.year) && (
            <span className="source-meta">
              {[s.author, s.year].filter(Boolean).join(" · ")}
            </span>
          )}
          {s.note && <span className="source-note">{s.note}</span>}
        </li>
      ))}
    </ol>
  );
}
