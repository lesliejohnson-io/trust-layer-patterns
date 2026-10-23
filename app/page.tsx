import Link from "next/link";
import { getAllPatterns, pad } from "@/lib/patterns";

export default function Home() {
  const patterns = getAllPatterns();

  return (
    <>
      <section className="hero">
        <p className="label label-accent">Pattern library · {patterns.length} patterns</p>
        <h1 className="display">Trust Layer Patterns</h1>
        <p className="lede">
          Like software design patterns: named, reusable solutions to recurring problems in the
          trust layer between humans and machines. Practitioner-level, and specific to the places
          where autonomy meets human judgment.
        </p>
      </section>

      <ol className="index">
        {patterns.map((p) => (
          <li key={p.slug}>
            <Link href={`/patterns/${p.slug}`} className="index-card">
              <span className="index-num">{pad(p.number)}</span>
              <span className="index-body">
                <span className="index-title">{p.name}</span>
                <span className="index-summary">{p.intent}</span>
              </span>
              <span className="index-meta">
                <span className={`status status-${p.status}`}>{p.status}</span>
                <span className="label">
                  {p.sources.length} {p.sources.length === 1 ? "source" : "sources"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
