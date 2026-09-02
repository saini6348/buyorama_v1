"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { ApiBrand } from "@/lib/types";
import { brandAccent, brandGlyph } from "@/lib/brand-display";

export default function StoresExplorer({ brands }: { brands: ApiBrand[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((b) => b.name.toLowerCase().includes(q));
  }, [query, brands]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* search */}
      <div className="flex max-w-xl gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stores…"
          className="w-full rounded-xl border-[3px] border-ink bg-white px-4 py-2.5 font-semibold text-ink shadow-pop-sm outline-none placeholder:text-ink/40 focus:border-punk"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="btn-punk border-ink bg-volt text-ink !px-4 !py-2 !text-xs"
          >
            Reset ✕
          </button>
        )}
      </div>

      <p className="mt-6 font-display text-sm font-bold uppercase tracking-widest text-paper/50">
        {filtered.length} store{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length === 0 ? (
        <div className="sticker mt-6 rotate-1 p-10 text-center">
          <span className="text-5xl">🕵️</span>
          <h3 className="mt-4 font-display text-2xl font-extrabold">No stores found!</h3>
          <p className="mt-2 font-semibold text-ink/60">Try a different search — new stores drop all the time.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {filtered.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 12) * 50}>
              <Link
                href={`/brands/${b.slug}`}
                className="sticker group flex flex-col items-center gap-3 p-5 transition-all hover:rotate-0 hover:scale-105 hover:shadow-pop-pink"
                style={{ rotate: `${((i % 3) - 1) * 2}deg` }}
              >
                <span
                  className="grid size-16 place-items-center overflow-hidden rounded-2xl border-[3px] border-ink text-3xl transition-transform group-hover:animate-wiggle"
                  style={{ background: brandAccent(b.slug) }}
                >
                  {b.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.logo_url} alt="" className="size-full object-cover" />
                  ) : (
                    brandGlyph(b.name)
                  )}
                </span>
                <span className="font-display text-sm font-extrabold uppercase tracking-wide">{b.name}</span>
                <span className="rounded-full border-2 border-ink bg-volt px-2 py-0.5 font-display text-[10px] font-black uppercase">
                  {b.coupon_count} Coupons
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
