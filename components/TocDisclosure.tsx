import type { TocItem } from "./PatternToc";

/**
 * The narrow-screen half of the table of contents: the same items as the
 * sticky rail, behind a disclosure, shown only where the rail is hidden.
 *
 * A control that looks like one: the collapsed state used to read as an empty
 * input. It needs no JavaScript, so unlike the rail it stays on the server.
 */
export function TocDisclosure({ items }: { items: TocItem[] }) {
  return (
    <details className="toc-mobile">
      <summary className="toc-summary">
        <span>On this page</span>
        <svg className="toc-chevron" viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
          <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      </summary>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="toc-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
