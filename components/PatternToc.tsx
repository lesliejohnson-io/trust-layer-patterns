"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * The sticky section rail on the pattern page. It highlights whichever
 * section is currently highest on screen. Hidden on narrow viewports, where
 * the page renders a "Jump to" disclosure instead.
 */
export function PatternToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    visible.current = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        // Whichever visible section comes first in document order wins.
        const first = items.find((i) => visible.current.has(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-72px 0px -65% 0px" },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label="On this page">
      <p className="label toc-title">On this page</p>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="toc-link"
              aria-current={item.id === active ? "true" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
