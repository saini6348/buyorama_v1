"use client";

import { useMemo, useState } from "react";
import CouponCard from "@/components/CouponCard";
import Reveal from "@/components/Reveal";
import { ApiCoupon } from "@/lib/types";

export default function CouponCodesExplorer({ coupons }: { coupons: ApiCoupon[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coupons;
    return coupons.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.brand?.name.toLowerCase().includes(q) ?? false)
    );
  }, [query, coupons]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* search */}
      <div className="flex max-w-xl gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coupons…"
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
        {filtered.length} coupon{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length === 0 ? (
        <div className="sticker mt-6 rotate-1 p-10 text-center">
          <span className="text-5xl">🕵️</span>
          <h3 className="mt-4 font-display text-2xl font-extrabold">No coupons found!</h3>
          <p className="mt-2 font-semibold text-ink/60">
            Try a different store or clear the filters — new deals drop all day.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 100}>
              <CouponCard coupon={c} tilt={i % 2 ? 1.5 : -1.5} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
