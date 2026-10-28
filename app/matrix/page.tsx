import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllPatterns,
  humanize,
  pad,
  REVERSIBILITY,
  REVERSIBILITY_DEFINITIONS,
  RISKS,
  RISK_DEFINITIONS,
  type Pattern,
} from "@/lib/patterns";

export const metadata: Metadata = {
  title: "Risk × reversibility",
  description: "Where the patterns sit on the two axes that decide how much friction is justified.",
};

// Worst case first, so the top-left of the grid is the corner that matters.
const ROWS = [...RISKS].reverse();
const COLS = [...REVERSIBILITY].reverse();

export default function MatrixPage() {
  const patterns = getAllPatterns().filter((p) => p.status !== "seed");

  const cell = (risk: string, reversibility: string): Pattern[] =>
    patterns.filter((p) => p.risk === risk && p.reversibility === reversibility);

  const filled = ROWS.flatMap((r) => COLS.map((c) => cell(r, c))).filter((c) => c.length > 0).length;

  return (
    <div className="wrap">
      <article className="pattern about">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">All patterns</Link>
            </li>
            <li aria-current="page">Risk × reversibility</li>
          </ol>
        </nav>

        <header className="pattern-head">
          <h1 className="display">Risk × reversibility</h1>
          <p className="lede">
            The two axes that decide how much friction a pattern can justify. This is a view of
            the library, not a way to navigate it — the questions it answers are about coverage,
            not about finding a particular pattern.
          </p>
        </header>

        <div className="matrix-scroll">
          <table className="matrix">
            <caption className="sr-only">
              Patterns arranged by risk and reversibility
            </caption>
            <thead>
              <tr>
                <td className="matrix-corner" />
                {COLS.map((col) => (
                  <th key={col} scope="col">
                    {humanize(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row}>
                  <th scope="row">{humanize(row)}</th>
                  {COLS.map((col) => {
                    const here = cell(row, col);
                    return (
                      <td key={col} className={here.length === 0 ? "matrix-cell is-empty" : "matrix-cell"}>
                        {here.length === 0 ? (
                          <span className="matrix-none" aria-hidden="true">
                            —
                          </span>
                        ) : (
                          <ul className="matrix-list">
                            {here.map((p) => (
                              <li key={p.slug}>
                                <Link href={`/patterns/${p.slug}`}>
                                  <span className="matrix-num">{pad(p.number)}</span> {p.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="anatomy-caption">
          {filled} of {ROWS.length * COLS.length} cells are filled. A library about autonomy with
          physical consequences will always lean toward the top-left; the useful question is
          whether the gaps are real or just unwritten.
        </p>

        <section className="section" aria-labelledby="risk-defs">
          <h2 id="risk-defs" className="section-head">
            Risk
          </h2>
          <dl className="defs">
            {ROWS.map((risk) => (
              <div key={risk} className="def">
                <dt>{humanize(risk)}</dt>
                <dd>{RISK_DEFINITIONS[risk]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section" aria-labelledby="rev-defs">
          <h2 id="rev-defs" className="section-head">
            Reversibility
          </h2>
          <dl className="defs">
            {COLS.map((reversibility) => (
              <div key={reversibility} className="def">
                <dt>{humanize(reversibility)}</dt>
                <dd>{REVERSIBILITY_DEFINITIONS[reversibility]}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </div>
  );
}
