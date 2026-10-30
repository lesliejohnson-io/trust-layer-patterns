"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { STATUS_SHAPES } from "@/lib/schema";

/**
 * The 404 as a console that has just handed back: a status panel, then a
 * hold-to-take-control button that does what pattern 04 says a control under
 * this much risk should do — nothing at all until the hold is complete.
 *
 * Nothing here navigates on its own. The only automatic move on the page
 * happens after the reader has held the control for the full two seconds,
 * which is the one case where they have asked for it.
 */

/** The readout's steps, played over roughly two seconds on load. */
const CONFIDENCE = [87, 31, 4, 0];
const COUNTDOWN_MS = 2000;
const HOLD_MS = 2000;
/** Long enough to read "control transferred" before the page changes. */
const HANDOVER_MS = 1000;

const RING_R = 72;
const RING_C = 2 * Math.PI * RING_R;

type Outcome = "none" | "released" | "transferred";

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

export function NotFoundConsole() {
  const router = useRouter();

  /*
   * Starts at the last step, not the first: 0% is the honest answer, so it is
   * what the prerendered page says, what a reader without JavaScript keeps,
   * and what someone who has asked for less motion sees straight away.
   */
  const [confidence, setConfidence] = useState(CONFIDENCE[CONFIDENCE.length - 1]);
  const [progress, setProgress] = useState(0);
  const [outcome, setOutcome] = useState<Outcome>("none");

  const holding = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const step = COUNTDOWN_MS / (CONFIDENCE.length - 1);
    const timers = CONFIDENCE.map((value, i) =>
      window.setTimeout(() => setConfidence(value), i * step),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const start = useCallback(() => {
    if (holding.current || outcome === "transferred") return;
    holding.current = true;
    setOutcome("none");

    const began = performance.now();
    const tick = (now: number) => {
      const done = Math.min((now - began) / HOLD_MS, 1);
      setProgress(done);
      if (done < 1) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      holding.current = false;
      setOutcome("transferred");
    };
    frame.current = requestAnimationFrame(tick);
  }, [outcome]);

  const release = useCallback(() => {
    if (!holding.current) return;
    holding.current = false;
    cancelAnimationFrame(frame.current);
    setProgress(0);
    setOutcome("released");
  }, []);

  /* The one automatic navigation, and only after a completed hold. */
  useEffect(() => {
    if (outcome !== "transferred") return;
    const timer = window.setTimeout(() => router.push("/"), HANDOVER_MS);
    return () => clearTimeout(timer);
  }, [outcome, router]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  /*
   * Space and Enter are held, not pressed: both are stopped from firing the
   * button's own activation (and Space from scrolling the page), and the
   * repeat events a held key sends are ignored so the hold starts once.
   */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (e.repeat) return;
    start();
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    release();
  };

  return (
    <>
      <div className="envelope-panel">
        <h1 className="envelope-status">
          <span className="envelope-shape" aria-hidden="true">
            {STATUS_SHAPES.fault}
          </span>
          Autonomy disengaged
        </h1>
        <p className="envelope-line">This page is outside the operating envelope.</p>
        <p className="envelope-confidence">
          Confidence it exists:{" "}
          <span className="envelope-value">{confidence}%</span>
        </p>
      </div>

      <div className="hold-block">
        <button
          type="button"
          className="hold"
          aria-describedby="hold-hint"
          onPointerDown={start}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={release}
        >
          <svg className="hold-ring" viewBox="0 0 160 160" aria-hidden="true" focusable="false">
            <circle
              cx="80"
              cy="80"
              r={RING_R}
              fill="none"
              stroke="var(--rule)"
              strokeWidth="5"
            />
            <circle
              cx="80"
              cy="80"
              r={RING_R}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - progress)}
              transform="rotate(-90 80 80)"
            />
          </svg>
          <span className="hold-label">Hold to take control</span>
        </button>
        <p className="hold-hint" id="hold-hint">
          Press and hold for two seconds. Keyboard: hold Space or Enter.
        </p>
      </div>

      {/* Always in the DOM, so the outcome is announced when it arrives. */}
      <p className="hold-outcome" role="status" aria-live="polite">
        {outcome === "released" && (
          <>
            Release detected. Nothing happens. That&apos;s{" "}
            <Link href="/patterns/appropriate-friction">pattern 04</Link>.
          </>
        )}
        {outcome === "transferred" && <>Control transferred. Welcome back, operator.</>}
      </p>
    </>
  );
}
