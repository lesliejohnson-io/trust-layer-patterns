import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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
            <span className="label">Working library</span>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <span className="label">Patterns for the human–machine trust layer · in progress</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
