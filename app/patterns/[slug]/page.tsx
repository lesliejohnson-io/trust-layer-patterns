import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPatterns, getPattern, pad } from "@/lib/patterns";
import { MechanismFlow } from "@/components/MechanismFlow";
import { Comparison } from "@/components/Comparison";
import { Sources } from "@/components/Sources";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPatterns().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPattern(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params;
  const all = getAllPatterns();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = all[index];
  const prev = all[index - 1];
  const next = all[index + 1];

  return (
    <article className="pattern">
      <Link href="/" className="back">
        ← All patterns
      </Link>

      <header className="pattern-head">
        <p className="label label-accent">Pattern {pad(p.number)} · Trust layer</p>
        <h1 className="display">{p.title}</h1>
        <p className="lede">{p.summary}</p>
        <p className="pattern-meta">
          <span className={`status status-${p.status}`}>{p.status}</span>
          {p.updated && <span className="label">Updated {p.updated}</span>}
        </p>
      </header>

      <section className="section" aria-labelledby="mechanism">
        <h2 id="mechanism" className="label">The mechanism</h2>
        <MechanismFlow steps={p.steps} />
      </section>

      <section className="section" aria-labelledby="contrast">
        <h2 id="contrast" className="label">Without / with the pattern</h2>
        <Comparison without={p.without} withPattern={p.with} />
      </section>

      {p.bodyHtml.trim() && (
        <section className="section" aria-labelledby="notes">
          <h2 id="notes" className="label">Notes</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: p.bodyHtml }} />
        </section>
      )}

      <section className="section" aria-labelledby="sources">
        <h2 id="sources" className="label">Sources</h2>
        <Sources sources={p.sources} file={p.file} />
      </section>

      <nav className="pager" aria-label="More patterns">
        {prev ? (
          <Link href={`/patterns/${prev.slug}`} className="pager-link">
            <span className="label">← {pad(prev.number)}</span>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/patterns/${next.slug}`} className="pager-link pager-next">
            <span className="label">{pad(next.number)} →</span>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
