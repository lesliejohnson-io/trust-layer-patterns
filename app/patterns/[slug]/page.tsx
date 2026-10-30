import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  autonomyRange,
  getAllPatterns,
  getMomentNeighbors,
  getPattern,
  getRelationGroups,
  momentHref,
  momentLabel,
  pad,
} from "@/lib/patterns";
import { MechanismFlow } from "@/components/MechanismFlow";
import { Comparison } from "@/components/Comparison";
import { Sources } from "@/components/Sources";
import { Examples } from "@/components/Examples";
import { ExternalLink } from "@/components/ExternalLink";
import { RelatedPatterns } from "@/components/RelatedPatterns";
import { PatternToc, type TocItem } from "@/components/PatternToc";
import { TocDisclosure } from "@/components/TocDisclosure";
import { Readout } from "@/components/Readout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPatterns().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPattern(slug);
  return p ? { title: p.name, description: p.intent } : {};
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params;
  const p = getPattern(slug);
  if (!p) notFound();

  const { prev, next } = getMomentNeighbors(p);
  const relations = getRelationGroups(p);
  const body = p.body;

  const momentName = momentLabel(p.moment);
  const hasWhen = Boolean(body.whenToUse || body.whenNotToUse);
  const hasField = Boolean(body.inTheField) || p.examples.length > 0;
  // An empty Sources section says less than no section; keep it in dev only.
  const showSources = p.sources.length > 0 || process.env.NODE_ENV !== "production";
  const showQuestions = p.showOpenQuestions && p.openQuestions.length > 0;
  // Review flags are for the author, and only while the entry is unfinished.
  // A reviewed or stable pattern that still carries them has had them handled.
  const showReview = p.status === "draft" && p.review.length > 0;

  const toc: TocItem[] = [
    body.problem ? { id: "problem", label: "Problem" } : null,
    { id: "mechanism", label: "The mechanism" },
    { id: "contrast", label: "Without / with" },
    hasWhen ? { id: "when", label: "When to use it" } : null,
    body.considerations ? { id: "considerations", label: "Design considerations" } : null,
    hasField ? { id: "in-the-field", label: "In the field" } : null,
    relations.length > 0 ? { id: "related", label: "Related patterns" } : null,
    p.crossReferences.length > 0 ? { id: "elsewhere", label: "Elsewhere" } : null,
    showSources ? { id: "sources", label: "Sources" } : null,
    showQuestions ? { id: "open-questions", label: "Still figuring out" } : null,
    body.notes ? { id: "notes", label: "Notes" } : null,
  ].filter((item): item is TocItem => item !== null);

  return (
    <div className="wrap pattern-layout">
      <article className="pattern">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">All patterns</Link>
            </li>
            <li>
              <Link href={momentHref(p.moment)}>{momentName}</Link>
            </li>
            <li aria-current="page">{p.name}</li>
          </ol>
        </nav>

        <header className="pattern-head">
          <p className="pattern-number">Pattern {p.number}</p>
          <h1 className="display">{p.name}</h1>
          <p className="lede">{p.intent}</p>

          <Readout pattern={p} />
        </header>

        {showReview && (
          <aside className="review-flag" aria-labelledby="needs-review">
            <h2 id="needs-review" className="review-flag-head">
              Needs your review
            </h2>
            <p className="review-flag-note">
              Drafted or unverified while this entry is a draft. Each item says what to check and
              why.
            </p>
            <ul className="review-flag-list">
              {p.review.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        )}

        <TocDisclosure items={toc} />

        {body.problem && (
          <section className="section" aria-labelledby="problem">
            <h2 id="problem" className="section-head">
              Problem
            </h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: body.problem }} />
          </section>
        )}

        <section className="section" aria-labelledby="mechanism">
          <h2 id="mechanism" className="section-head">
            The mechanism
          </h2>
          <MechanismFlow steps={p.steps} />
        </section>

        <section className="section" aria-labelledby="contrast">
          <h2 id="contrast" className="section-head">
            Without / with the pattern
          </h2>
          {p.interface && (
            <p className="section-note">
              A working demo of the control, not a screenshot. Nothing here flies anything.
            </p>
          )}
          <Comparison
            without={p.without}
            withPattern={p.with}
            antiPattern={p.antiPattern}
            illustration={p.interface?.component}
          />
        </section>

        {hasWhen && (
          <section className="section" aria-labelledby="when">
            <h2 id="when" className="section-head">
              When to use it
            </h2>
            <div className="when-grid">
              {body.whenToUse && (
                <div className="when-col">
                  <h3 className="when-head">Use it when</h3>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: body.whenToUse }} />
                </div>
              )}
              {body.whenNotToUse && (
                <div className="when-col when-col-not">
                  <h3 className="when-head">Leave it out when</h3>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: body.whenNotToUse }} />
                </div>
              )}
            </div>
          </section>
        )}

        {body.considerations && (
          <section className="section" aria-labelledby="considerations">
            <h2 id="considerations" className="section-head">
              Design considerations
            </h2>
            <div
              className="prose considerations"
              dangerouslySetInnerHTML={{ __html: body.considerations }}
            />
          </section>
        )}

        {hasField && (
          <section className="section" aria-labelledby="in-the-field">
            <h2 id="in-the-field" className="section-head">
              In the field
            </h2>
            {body.inTheField && (
              <div className="prose" dangerouslySetInnerHTML={{ __html: body.inTheField }} />
            )}
            {p.examples.length > 0 && <Examples examples={p.examples} />}
          </section>
        )}

        {relations.length > 0 && (
          <section className="section" aria-labelledby="related">
            <h2 id="related" className="section-head">
              Related patterns
            </h2>
            <RelatedPatterns groups={relations} />
          </section>
        )}

        {p.crossReferences.length > 0 && (
          <section className="section" aria-labelledby="elsewhere">
            <h2 id="elsewhere" className="section-head">
              Elsewhere
            </h2>
            <ul className="elsewhere">
              {p.crossReferences.map((x) => (
                <li key={x.url} className="elsewhere-item">
                  <p className="elsewhere-head">
                    <ExternalLink href={x.url} className="elsewhere-name">
                      {x.name}
                    </ExternalLink>
                    <span className="subgroup-head">{x.library}</span>
                  </p>
                  {x.note && <p className="elsewhere-note">{x.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {showSources && (
          <section className="section" aria-labelledby="sources">
            <h2 id="sources" className="section-head">
              Sources
            </h2>
            <Sources sources={p.sources} file={p.file} />
          </section>
        )}

        {showQuestions && (
          <aside className="section fieldnote" aria-labelledby="open-questions">
            <h2 id="open-questions" className="section-head">
              Still figuring out
            </h2>
            <ul className="fieldnote-list">
              {p.openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </aside>
        )}

        {body.notes && (
          <section className="section" aria-labelledby="notes">
            <h2 id="notes" className="section-head">
              Notes
            </h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: body.notes }} />
          </section>
        )}

        <nav className="pager" aria-label={`More ${momentName.toLowerCase()} patterns`}>
          {prev ? (
            <Link href={`/patterns/${prev.slug}`} className="pager-link">
              <span className="label">← {pad(prev.number)}</span>
              <span>{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/patterns/${next.slug}`} className="pager-link pager-next">
              <span className="label">{pad(next.number)} →</span>
              <span>{next.name}</span>
            </Link>
          )}
        </nav>

        <p className="pager-back">
          <Link href={momentHref(p.moment)}>Back to {momentName}</Link>
        </p>
      </article>

      <PatternToc items={toc} />
    </div>
  );
}
