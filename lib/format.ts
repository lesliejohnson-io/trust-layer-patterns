/**
 * Display helpers for facet values. Kept free of Node imports so client
 * components can use them — `lib/patterns.ts` reads the filesystem.
 */

/** "incident-report" -> "Incident report". */
export function humanize(value: string): string {
  const spaced = value.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** "Levels 2–4", or "Any level" when the pattern applies across the scale. */
export function autonomyRange([low, high]: readonly [number, number]): string {
  if (low === 0 && high === 5) return "Any level";
  return low === high ? `Level ${low}` : `Levels ${low}–${high}`;
}
