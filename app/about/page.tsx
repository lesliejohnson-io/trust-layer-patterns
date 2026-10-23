import type { Metadata } from "next";
import { getAllPatterns } from "@/lib/patterns";

export const metadata: Metadata = {
  title: "About",
  description:
    "What a pattern means in this library, and how to cite it.",
};

const SITE = "trust-layer-patterns.vercel.app";

export default function AboutPage() {
  const example = getAllPatterns()[0];

  return (
    <div className="wrap">
      <article className="pattern about">
        <header className="pattern-head">
          <p className="label label-accent">About</p>
          <h1 className="display">About this library</h1>
          <p className="lede">
            A reference library of named, reusable design patterns for the trust layer between
            humans and autonomous machines — vehicles, surgical and industrial robots, drones and
            warehouse systems. It is for practitioners, and it is also a learning tool written in
            public.
          </p>
        </header>

        <section className="section" aria-labelledby="cite">
          <h2 id="cite" className="label">
            How to cite
          </h2>
          <div className="prose">
            <p>Cite an individual pattern, not the library as a whole:</p>
            <p className="cite-format">
              Johnson, L. (2026). {"{Pattern name}"}. Trust Layer Patterns. {SITE}/patterns/
              {"{slug}"}
            </p>
            {example && (
              <>
                <p>For example:</p>
                <p className="cite-format">
                  Johnson, L. (2026). {example.name}. Trust Layer Patterns. {SITE}/patterns/
                  {example.slug}
                </p>
              </>
            )}
            <p>
              The patterns are shareable under CC BY 4.0, so you are free to quote and adapt them
              with attribution.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
