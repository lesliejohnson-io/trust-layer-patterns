"use client";

/**
 * Light/dark switch. Which icon shows is decided in CSS from the resolved
 * theme, not from React state, so the button renders identically on the
 * server and the client and there is nothing to hydrate or flash.
 *
 * With no stored choice the site follows the system setting; clicking stores
 * an explicit one, which the inline script in the layout re-applies on the
 * next visit before first paint.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage: the choice just won't persist.
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Switch between light and dark mode"
    >
      <svg
        className="theme-icon icon-moon"
        viewBox="0 0 20 20"
        width="17"
        height="17"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="theme-icon icon-sun"
        viewBox="0 0 20 20"
        width="17"
        height="17"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 1.6v2.1M10 16.3v2.1M18.4 10h-2.1M3.7 10H1.6M15.94 4.06l-1.48 1.48M5.54 14.46l-1.48 1.48M15.94 15.94l-1.48-1.48M5.54 5.54 4.06 4.06"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
