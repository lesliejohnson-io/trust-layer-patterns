import { getAllPatterns, toCardData } from "@/lib/patterns";
import { PatternBrowser } from "@/components/PatternBrowser";

export default function Home() {
  const patterns = getAllPatterns();
  const cards = patterns.map(toCardData);
  // Seeds are excluded from the count until the filter reveals them.
  const published = patterns.filter((p) => p.status !== "seed");
  const updated = published
    .map((p) => p.updated)
    .sort()
    .at(-1);

  return (
    <div className="wrap">
      <section className="hero">
        <h1 className="display">Trust Layer Patterns</h1>
        <p className="lede">
          Most AI pattern libraries cover AI inside software; this one covers autonomy with
          physical consequences — vehicles, surgical and industrial robots, drones and warehouse
          systems.
        </p>
        <p className="label hero-meta">
          {published.length} {published.length === 1 ? "pattern" : "patterns"}
          {updated && ` · updated ${updated}`}
        </p>
      </section>

      <PatternBrowser cards={cards} />
    </div>
  );
}
