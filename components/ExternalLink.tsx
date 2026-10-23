/**
 * An outbound link. Stays in the same tab by choice — the icon tells people
 * they are leaving, and lets them decide how to open it.
 */
export function ExternalLink({
  href,
  children,
  className,
  rel = "noreferrer",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  rel?: string;
}) {
  return (
    <a href={href} className={className} rel={rel}>
      {children}
      <svg
        className="ext-icon"
        viewBox="0 0 12 12"
        width="11"
        height="11"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4.5 2h5.5v5.5M9.8 2.2 5 7M8 8.5V10H2V4h1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
