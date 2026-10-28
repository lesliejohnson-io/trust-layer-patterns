"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HOLD_MS = 2000;

/** The readout above the control, the same on both screens. */
function Readout({ state }: { state: string }) {
  return (
    <dl className="console-readout">
      <div className="console-cell">
        <dt>Zone</dt>
        <dd>B</dd>
      </div>
      <div className="console-cell">
        <dt>Altitude</dt>
        <dd>120 m</dd>
      </div>
      <div className="console-cell">
        <dt>Payload</dt>
        <dd>{state}</dd>
      </div>
    </dl>
  );
}

/**
 * The anti-pattern: the irreversible action behind a single tap, named no more
 * specifically than its menu item. Deliberately inert — there is nothing to
 * demonstrate about a button that just fires.
 */
function WithoutScreen() {
  return (
    <div className="console">
      <p className="console-title">Payload</p>
      <div className="console-screen">
        <Readout state="Armed" />
        <p className="console-button is-fault is-static" aria-hidden="true">
          <span className="console-shape">■</span>
          Release payload
        </p>
        <p className="console-hint">One tap. No second chance.</p>
      </div>
    </div>
  );
}

/**
 * The pattern: the same control, held for two seconds, with the consequence
 * written on the button rather than in a dialog that follows it.
 *
 * The fill is driven by a rAF clock rather than a CSS transition so that
 * letting go part-way is a real cancellation — the bar reports elapsed hold
 * time, and nothing is committed until it reaches the end. Under reduced
 * motion the same clock runs without the per-frame redraw: the bar sits empty
 * and the state changes once, at the end of the hold.
 */
function WithScreen() {
  const [progress, setProgress] = useState(0);
  const [released, setReleased] = useState(false);
  const [holding, setHolding] = useState(false);
  const frame = useRef<number | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const keyHeld = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stop = useCallback(() => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    if (timer.current !== undefined) clearTimeout(timer.current);
    frame.current = undefined;
    timer.current = undefined;
  }, []);

  useEffect(() => stop, [stop]);

  const finish = useCallback(() => {
    stop();
    setProgress(1);
    setHolding(false);
    setReleased(true);
  }, [stop]);

  const start = useCallback(() => {
    if (released || holding) return;
    setHolding(true);

    // The hold is timed by the clock, not by frames: a throttled tab would
    // otherwise stretch two seconds into however long the next frame takes.
    timer.current = setTimeout(finish, HOLD_MS);
    if (reduced.current) return; // no per-frame redraw; one state change at the end

    const began = performance.now();
    const tick = () => {
      const elapsed = performance.now() - began;
      if (elapsed >= HOLD_MS) return;
      setProgress(elapsed / HOLD_MS);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [finish, holding, released]);

  /** Letting go early is a cancellation, not a pause. */
  const cancel = useCallback(() => {
    if (released) return;
    stop();
    setHolding(false);
    setProgress(0);
  }, [released, stop]);

  const reset = () => {
    stop();
    keyHeld.current = false;
    setReleased(false);
    setHolding(false);
    setProgress(0);
  };

  return (
    <div className="console">
      <p className="console-title">Payload</p>
      <div className="console-screen">
        <Readout state={released ? "Released" : holding ? "Holding" : "Armed"} />

        {released ? (
          <p className="console-button is-fault is-done">
            <span className="console-shape" aria-hidden="true">
              ■
            </span>
            Released over zone B
          </p>
        ) : (
          <button
            type="button"
            className="console-button is-fault is-hold"
            aria-describedby="hold-hint"
            onPointerDown={(e) => {
              // Capture keeps the hold alive if the finger slides off the
              // button; not every pointer can be captured, and a hold that
              // cannot be captured still works.
              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                /* no capture: pointerup on the button still ends the hold */
              }
              start();
            }}
            onPointerUp={cancel}
            onPointerCancel={cancel}
            onLostPointerCapture={cancel}
            onKeyDown={(e) => {
              if (e.key !== " " && e.key !== "Enter") return;
              e.preventDefault(); // Enter would otherwise fire a click.
              if (keyHeld.current) return; // ignore auto-repeat
              keyHeld.current = true;
              start();
            }}
            onKeyUp={(e) => {
              if (e.key !== " " && e.key !== "Enter") return;
              keyHeld.current = false;
              cancel();
            }}
            onBlur={() => {
              keyHeld.current = false;
              cancel();
            }}
          >
            <span
              className="console-fill"
              style={{ transform: `scaleX(${progress})` }}
              aria-hidden="true"
            />
            <span className="console-shape" aria-hidden="true">
              ■
            </span>
            <span className="console-button-text">Release payload over zone B</span>
          </button>
        )}

        <p className="console-hint" id="hold-hint">
          {released
            ? "The payload is gone. Nothing here takes it back."
            : "Hold for two seconds. Let go early and nothing happens."}
        </p>

        {/* The demo's own state, announced rather than only drawn. */}
        <p className="sr-only" role="status">
          {released ? "Released over zone B" : holding ? "Holding" : ""}
        </p>

        {released && (
          <button type="button" className="console-reset" onClick={reset}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function DroneRelease({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
