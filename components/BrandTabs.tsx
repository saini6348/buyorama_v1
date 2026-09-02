"use client";

import { useState } from "react";
import CouponCard from "@/components/CouponCard";
import { ApiCoupon, ApiFeed } from "@/lib/types";
import { brandAccent, brandGlyph, timeAgo } from "@/lib/brand-display";

type Tab = "feeds" | "coupons";

export default function BrandTabs({
  brand,
  coupons,
  feeds,
  others,
}: {
  brand: { name: string; slug: string; site_url: string; logo_url: string };
  coupons: ApiCoupon[];
  feeds: ApiFeed[];
  others: { name: string; slug: string; logo_url: string; coupon_count: number }[];
}) {
  const [tab, setTab] = useState<Tab>("feeds");
  const accent = brandAccent(brand.slug);
  const glyph = brandGlyph(brand.name);

  return (
    <div className="grid gap-8 lg:grid-cols-[150px_1fr]">
      {/* ---------- Left: tab buttons (sticky) ---------- */}
      <aside className="lg:sticky lg:top-[84px] lg:h-max lg:self-start">
        <div className="flex gap-3 lg:flex-col lg:gap-4">
          <button
            onClick={() => setTab("feeds")}
            className={`btn-punk w-full flex-col !gap-1 !py-4 lg:flex-col ${
              tab === "feeds" ? "border-ink bg-cyan-pop text-ink shadow-pop-sm" : "border-ink bg-white text-ink"
            }`}
          >
            <span className="text-2xl">📰</span>
            Feeds
            <span className="rounded-full border-2 border-ink/40 px-1.5 text-[10px]">{feeds.length}</span>
          </button>
          <button
            onClick={() => setTab("coupons")}
            className={`btn-punk w-full flex-col !gap-1 !py-4 lg:flex-col ${
              tab === "coupons" ? "border-ink bg-punk text-white shadow-pop-sm" : "border-ink bg-white text-ink"
            }`}
          >
            <span className="text-2xl">🎟️</span>
            Coupons
            <span className="rounded-full border-2 border-ink/40 px-1.5 text-[10px]">{coupons.length}</span>
          </button>
        </div>
      </aside>

      {/* ---------- Center: active tab ---------- */}
      <div key={tab} className="min-w-0">
        {tab === "feeds" ? (
          feeds.length === 0 ? (
            <div className="sticker -rotate-1 p-10 text-center">
              <span className="text-5xl">📭</span>
              <h3 className="mt-4 font-display text-2xl font-extrabold">No feeds yet!</h3>
              <p className="mt-2 font-semibold text-ink/60">We&apos;re watching — deals will appear here first.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {feeds.map((f, i) => (
                <article
                  key={f.slug}
                  className="sticker group overflow-hidden transition-all hover:rotate-0 hover:shadow-pop-volt"
                  style={{
                    rotate: `${i % 2 ? 0.5 : -0.5}deg`,
                    animation: `pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 90}ms both`,
                  }}
                >
                  {/* post header */}
                  <div className="flex items-center gap-3 border-b-[3px] border-ink/10 px-6 py-4">
                    <span
                      className="grid size-12 flex-none place-items-center overflow-hidden rounded-full border-[3px] border-ink bg-white text-2xl"
                      style={{ background: accent }}
                    >
                      {brand.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={brand.logo_url} alt="" className="size-full object-cover" />
                      ) : (
                        glyph
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-extrabold uppercase tracking-wide">{brand.name}</p>
                      <p className="text-xs font-semibold text-ink/50">Sponsored · {timeAgo(f.added_at)}</p>
                    </div>
                    <span className="ml-auto rotate-3 rounded-md border-2 border-ink bg-volt px-2 py-0.5 font-display text-[10px] font-black uppercase">
                      Feed
                    </span>
                  </div>

                  {/* image banner */}
                  <div
                    className="grid min-h-56 place-items-center overflow-hidden border-b-[3px] border-ink/10 md:min-h-64"
                    style={{ background: `${accent}26` }}
                  >
                    {f.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={f.image_url} alt={f.title} className="size-full object-cover" />
                    ) : (
                      <span className="text-8xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        🛍️
                      </span>
                    )}
                  </div>

                  {/* article body */}
                  <div className="px-6 py-5">
                    <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{f.title}</h3>
                    <div
                      className="mt-3 whitespace-pre-line text-[15px] font-medium leading-[1.8] text-ink/75 md:text-base [&_a]:text-punk [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: f.description }}
                    />

                    <div className="mt-6 flex flex-col gap-3 border-t-[3px] border-dashed border-ink/15 pt-4 sm:flex-row sm:items-center">
                      {brand.site_url && (
                        <a
                          href={brand.site_url}
                          target="_blank"
                          rel="noopener nofollow"
                          className="btn-punk sm:ml-auto border-ink bg-punk text-white !py-2.5"
                        >
                          Grab Deal →
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : coupons.length === 0 ? (
          <div className="sticker rotate-1 p-10 text-center">
            <span className="text-5xl">🐞</span>
            <h3 className="mt-4 font-display text-2xl font-extrabold">No coupons right now!</h3>
            <p className="mt-2 font-semibold text-ink/60">New codes drop all day — check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {coupons.map((c, i) => (
              <div key={c.slug} style={{ animation: `pop-in 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms both` }}>
                <CouponCard coupon={c} tilt={i % 2 ? 1.5 : -1.5} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
