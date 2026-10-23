import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ExternalLink } from "@/components/ExternalLink";
import { ByIcon, CcIcon } from "@/components/LicenseIcons";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Trust Layer Patterns", template: "%s · Trust Layer Patterns" },
  description:
    "Named, reusable design patterns for the trust layer between humans and autonomous machines.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <header className="site-header">
          <div className="wrap site-header-inner">
            <Link href="/" className="brand">
              Trust Layer Patterns
            </Link>
            <nav className="site-nav" aria-label="Main">
              <span className="label">Working library</span>
              <Link href="/about" className="label site-nav-link">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p className="label footer-line">
              <span>
                ©&nbsp;2026{" "}
                <ExternalLink href="https://www.linkedin.com/in/lesliejohnson-ux">
                  Leslie Johnson
                </ExternalLink>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Shareable under{" "}
                <ExternalLink
                  href="https://creativecommons.org/licenses/by/4.0/"
                  rel="license noreferrer"
                >
                  <CcIcon />
                  <ByIcon />
                  CC BY 4.0
                </ExternalLink>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <a href="mailto:leslie@lesliejohnson.io">Contact</a>
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
