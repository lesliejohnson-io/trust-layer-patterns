import type { Metadata } from "next";
import Link from "next/link";
import { NotFoundConsole } from "@/components/NotFoundConsole";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is outside the operating envelope.",
};

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="envelope">
        <NotFoundConsole />

        {/* Always visible, and never behind the hold: the way out for anyone
            who would rather not play with the control. */}
        <nav className="envelope-links" aria-label="Elsewhere on the site">
          <Link href="/">All patterns</Link>
          <span aria-hidden="true">·</span>
          <Link href="/about">About</Link>
          <span aria-hidden="true">·</span>
          <Link href="/changelog">Changelog</Link>
        </nav>
      </div>
    </div>
  );
}
