# Trust Layer Patterns

A working library of named, reusable design patterns for the trust layer between humans and autonomous machines. Built with Next.js; every pattern is a single Markdown file.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Deploy: push to GitHub and import the repo in Vercel (no config needed).

## Editing a pattern

Everything for a pattern lives in `content/patterns/NN-slug.md`. You never need to touch components to update your research.

| Field | What it drives |
| --- | --- |
| `title`, `summary` | Page header and the home-page index |
| `status` | Badge: `draft`, `researched` or `stable` |
| `updated` | "Updated" date on the page (keep the quotes) |
| `steps` | The mechanism diagram. 3–6 steps work best. `note:` hangs an annotation under a step; `key: true` highlights the key moment |
| `without`, `with` | The comparison panels: three short beats + a caption each |
| `sources` | The Sources list (`title` required; `author`, `year`, `url`, `note` optional) |
| Body (below the `---`) | Free-form Markdown, shown under "Notes" |

Adding a source:

```yaml
sources:
  - title: "Paper or article title"
    author: "Author name"
    year: 2024
    url: "https://..."
    note: "Why it matters for this pattern"
```

## Adding a pattern

Copy `content/patterns/_template.md` to `06-your-pattern.md`. The number sets the order; the words after it become the URL (`/patterns/your-pattern`). Files starting with `_` are ignored.

## Structure

```
app/                     pages (home, /patterns/[slug])
components/              MechanismFlow, Comparison, Sources
content/patterns/        one .md file per pattern  ← edit here
lib/patterns.ts          reads + parses the content files
```

Light and dark mode follow the system setting. Colors are tokens at the top of `app/globals.css`.
