"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  availableDomains,
  DEFAULT_STATE,
  filterCards,
  GROUP_BY,
  GROUP_LABELS,
  groupCards,
  isFiltered,
  parseState,
  SEARCH_THRESHOLD,
  stateToQuery,
  type BrowseState,
  type Domain,
  type GroupBy,
  type PatternCardData,
} from "@/lib/browse";
import { humanize } from "@/lib/format";
import { LoopHero } from "./LoopHero";
import { PatternCard } from "./PatternCard";

/**
 * The index's controls and results. State lives in the URL so a view can be
 * linked and shared, but the component renders server-side in its default
 * state first, so the full library is in the HTML without JavaScript.
 */
export function PatternBrowser({ cards }: { cards: PatternCardData[] }) {
  const [state, setState] = useState<BrowseState>(DEFAULT_STATE);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Adopt whatever the URL says once mounted, and follow back/forward.
  useEffect(() => {
    const sync = () => setState(parseState(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const update = useCallback((next: BrowseState) => {
    setState(next);
    const url = `${window.location.pathname}${stateToQuery(next)}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, []);

  const domains = useMemo(() => availableDomains(cards), [cards]);
  const visible = useMemo(() => filterCards(cards, state), [cards, state]);
  const groups = useMemo(() => groupCards(visible, state.group), [visible, state.group]);

  const loopNodes = useMemo(
    () =>
      (["before", "during", "transition", "failure", "after"] as const).map((moment) => ({
        moment,
        count: visible.filter((c) => c.moment === moment).length,
      })),
    [visible],
  );

  const toggleDomain = (domain: Domain) => {
    const has = state.domains.includes(domain);
    update({
      ...state,
      domains: has ? state.domains.filter((d) => d !== domain) : [...state.domains, domain],
    });
  };

  // Roving focus across the group-by tabs.
  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: GROUP_BY.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + GROUP_BY.length) % GROUP_BY.length;
    update({ ...state, group: GROUP_BY[next] });
    const buttons = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <>
      {/* Section anchors only exist while grouping by Moment; otherwise send
          people to the Moment's own page rather than a link that goes nowhere. */}
      <LoopHero
        nodes={loopNodes}
        hrefFor={
          state.group === "moment"
            ? (moment) => `#moment-${moment}`
            : (moment) => `/moments/${moment}`
        }
        linkEmpty={state.group !== "moment"}
      />

      <div className="controls">
        <div className="control">
          <span className="ui-label control-label" id="group-by-label">
            Group by
          </span>
          <div className="tabs" role="tablist" aria-labelledby="group-by-label" ref={tabsRef}>
            {GROUP_BY.map((group, i) => {
              const selected = state.group === group;
              return (
                <button
                  key={group}
                  type="button"
                  role="tab"
                  id={`tab-${group}`}
                  aria-selected={selected}
                  aria-controls="pattern-results"
                  tabIndex={selected ? 0 : -1}
                  className="tab"
                  onClick={() => update({ ...state, group })}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                >
                  {GROUP_LABELS[group]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="control">
          <span className="ui-label control-label" id="domain-label">
            Domain
          </span>
          <div className="chips" role="group" aria-labelledby="domain-label">
            {domains.map((domain) => (
              <button
                key={domain}
                type="button"
                className="filter-chip"
                aria-pressed={state.domains.includes(domain)}
                onClick={() => toggleDomain(domain)}
              >
                {humanize(domain)}
              </button>
            ))}
          </div>
        </div>

        {/* Seeds have no control of their own: ?status=all still reveals them,
            which is all the About page promises. */}
        {cards.length >= SEARCH_THRESHOLD && (
          <div className="control control-inline">
            <label className="search">
              <span className="sr-only">Search patterns</span>
              <input
                type="search"
                placeholder="Search patterns"
                value={state.query}
                onChange={(e) => update({ ...state, query: e.target.value })}
              />
            </label>
          </div>
        )}
      </div>

      <div
        id="pattern-results"
        role="tabpanel"
        aria-labelledby={`tab-${state.group}`}
        tabIndex={-1}
      >
        {groups.length === 0 ? (
          <div className="empty empty-results">
            <p>No patterns match these filters.</p>
            <button type="button" className="clear-filters" onClick={() => update(DEFAULT_STATE)}>
              Clear filters
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <section
              key={group.key}
              id={group.anchor}
              className="group"
              aria-labelledby={group.name ? `group-${group.key}` : undefined}
            >
              {group.name && (
                <header className="group-head">
                  <h2 id={`group-${group.key}`} className="group-name">
                    {group.name}
                  </h2>
                  {group.purpose && <p className="group-question">{group.purpose}</p>}
                </header>
              )}
              <ul className="cards">
                {group.cards.map((card) => (
                  <PatternCard
                    key={card.slug}
                    pattern={card}
                    showMoment={state.group !== "moment"}
                    showTrustJob={state.group !== "trustJob"}
                  />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      {isFiltered(state) && groups.length > 0 && (
        <p className="result-count label">
          {visible.length} of {cards.length} patterns shown ·{" "}
          <button type="button" className="clear-filters-inline" onClick={() => update(DEFAULT_STATE)}>
            Clear filters
          </button>
        </p>
      )}
    </>
  );
}
