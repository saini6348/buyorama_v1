"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ApiCard, CardSettings } from "@/lib/types";

type Sel = { banks: string[]; categories: string[]; tags: string[] };
const empty: Sel = { banks: [], categories: [], tags: [] };

const toggle = (list: string[], slug: string) => (list.includes(slug) ? list.filter((x) => x !== slug) : [...list, slug]);

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  accent,
}: {
  title: string;
  options: { name: string; slug: string }[];
  selected: string[];
  onToggle: (slug: string) => void;
  accent: string;
}) {
  return (
    <div className="border-b-[3px] border-ink/10 pb-5">
      <h3 className="mb-3 font-display text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
        {title}
      </h3>
      <div className="flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
        {options.map((o) => {
          const on = selected.includes(o.slug);
          return (
            <label
              key={o.slug}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg border-2 border-transparent px-2.5 py-1.5 text-sm font-semibold transition-all duration-100 ${
                on ? "border-ink bg-white text-ink shadow-pop-sm" : "text-paper/70 hover:bg-white/10"
              }`}
            >
              <input type="checkbox" className="sr-only" checked={on} onChange={() => onToggle(o.slug)} />
              <span
                className={`grid size-4 flex-none place-items-center rounded-[4px] border-2 border-ink text-[10px] font-black transition-colors ${on ? "bg-ink text-volt" : "bg-white/20"}`}
              >
                {on ? "✓" : ""}
              </span>
              <span className={on ? "" : "text-paper/70"}>{o.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function CardOffersExplorer({
  cards,
  settings,
}: {
  cards: ApiCard[];
  settings: CardSettings;
}) {
  const searchParams = useSearchParams();
  const initialCard = searchParams.get("card") ?? undefined;
  const initialTag = searchParams.get("f") ?? undefined;

  const [sel, setSel] = useState<Sel>(
    initialTag && settings.tags.some((t) => t.slug === initialTag)
      ? { ...empty, tags: [initialTag] }
      : empty
  );
  const [pulse, setPulse] = useState(0);
  const highlightRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (initialCard && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [initialCard]);

  const change = (group: keyof Sel, slug: string) => {
    setSel((s) => ({ ...s, [group]: toggle(s[group], slug) }));
    setPulse((p) => p + 1);
  };

  const filtered = useMemo(() => {
    const has = (want: string[], have: string[]) => want.length === 0 || want.every((w) => have.includes(w));
    return cards.filter((c) => {
      const banks = c.banks.map((x) => x.slug);
      const cats = c.categories.map((x) => x.slug);
      const tags = c.tags.map((x) => x.slug);
      return has(sel.banks, banks) && has(sel.categories, cats) && has(sel.tags, tags);
    });
  }, [sel, cards]);

  const activeCount = sel.banks.length + sel.categories.length + sel.tags.length;

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[260px_1fr]">
      {/* ---------- Sidebar ---------- */}
      <aside className="h-max rounded-2xl border-[3px] border-ink bg-grape p-5 lg:sticky lg:top-24">
        <div className="mb-5 flex items-center justify-between gap-2">
          <h2 className="font-display text-sm font-black uppercase tracking-widest">Filters</h2>
          <button
            onClick={() => {
              setSel(empty);
              setPulse((p) => p + 1);
            }}
            disabled={activeCount === 0}
            className={`rounded-md border-2 border-ink px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-wide text-ink transition-all ${
              activeCount > 0 ? "bg-volt hover:animate-wiggle" : "cursor-not-allowed bg-white/60 opacity-50"
            }`}
          >
            Clear All ✕
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <FilterGroup title="🏷️ Tags" options={settings.tags} selected={sel.tags} onToggle={(s) => change("tags", s)} accent="#ffe600" />
          <FilterGroup title="📂 Categories" options={settings.categories} selected={sel.categories} onToggle={(s) => change("categories", s)} accent="#22e6ff" />
          <FilterGroup title="🏦 Banks" options={settings.banks} selected={sel.banks} onToggle={(s) => change("banks", s)} accent="#ff2e88" />
        </div>
      </aside>

      {/* ---------- Card list ---------- */}
      <div>
        {initialCard && (
          <div className="sticker mb-6 flex rotate-[-0.5deg] items-center gap-3 p-4">
            <span className="text-2xl">👉</span>
            <p className="text-sm font-bold">
              Taking you straight to the card you picked — filters and the full list are right here too.
            </p>
          </div>
        )}
        <p className="mb-5 font-display text-sm font-bold uppercase tracking-widest text-paper/50">
          {filtered.length} card{filtered.length === 1 ? "" : "s"} found
          {activeCount > 0 && (
            <span className="text-volt">
              {" "}
              · {activeCount} filter{activeCount === 1 ? "" : "s"} on
            </span>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="sticker rotate-1 p-10 text-center">
            <span className="text-5xl">🔍</span>
            <h3 className="mt-4 font-display text-2xl font-extrabold">No cards match!</h3>
            <p className="mt-2 font-semibold text-ink/60">Try removing a filter or two.</p>
          </div>
        ) : (
          <div key={pulse} className="flex flex-col gap-7">
            {filtered.map((card, i) => {
              const isTarget = initialCard === card.slug;
              return (
                <article
                  key={card.slug}
                  ref={isTarget ? highlightRef : undefined}
                  id={card.slug}
                  className={`sticker group relative flex flex-col gap-5 p-6 transition-all hover:rotate-0 md:p-7 ${
                    isTarget ? "!shadow-pop-punk ring-4 ring-punk" : "hover:shadow-pop-pink"
                  }`}
                  style={{
                    rotate: `${(i % 2 ? 0.8 : -0.8)}deg`,
                    animation: `pop-in 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 70}ms both`,
                  }}
                >
                  {/* header: title + tag badge */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{card.title}</h3>
                    {card.tags[0] && (
                      <span className="rotate-2 flex-none rounded-md border-2 border-ink bg-punk px-2.5 py-1 font-display text-[10px] font-black uppercase tracking-wide text-white">
                        {card.tags[0].name}
                      </span>
                    )}
                  </div>

                  {/* image under the title (half width) */}
                  <div
                    className="mx-auto grid min-h-48 w-1/2 min-w-56 place-items-center overflow-hidden rounded-2xl border-[3px] border-ink bg-volt/30 transition-transform duration-300 group-hover:scale-[1.01] md:min-h-64"
                  >
                    {card.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={card.logo_url} alt={card.title} className="size-full object-cover" />
                    ) : (
                      <span className="text-7xl transition-transform group-hover:animate-wiggle">💳</span>
                    )}
                  </div>

                  {/* details */}
                  <div className="min-w-0">
                    <div
                      className="prose-card text-[15px] font-medium leading-relaxed text-ink/70"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {card.banks.map((b) => (
                        <span key={b.slug} className="rounded-full border-2 border-ink/60 bg-white px-2.5 py-0.5 text-[11px] font-bold text-ink/70">
                          🏦 {b.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {card.categories.map((c) => (
                        <span key={c.slug} className="rounded-full border-2 border-ink/60 bg-acid/60 px-2.5 py-0.5 text-[11px] font-bold text-ink/70">
                          📂 {c.name}
                        </span>
                      ))}
                      {card.tags.map((t) => (
                        <span key={t.slug} className="rounded-full border-2 border-ink/60 bg-cyan-pop/50 px-2.5 py-0.5 text-[11px] font-bold text-ink/70">
                          🏷️ {t.name}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row md:ml-auto md:w-fit">
                      <a href={card.link} target="_blank" rel="noopener nofollow" className="btn-punk border-ink bg-punk text-white">
                        Check Offer →
                      </a>
                      <a href={card.link} target="_blank" rel="noopener nofollow" className="btn-punk border-ink bg-white text-ink">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
