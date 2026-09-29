"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ApiBrand, ApiFeed } from "@/lib/types";
import { brandAccent, brandGlyph, timeAgo } from "@/lib/brand-display";

export default function StoreFeedSpotlight({
  brands,
  feedsByBrand,
}: {
  brands: ApiBrand[];
  feedsByBrand: Record<string, ApiFeed[]>;
}) {
  const initialSlug = brands.find((b) => (feedsByBrand[b.slug]?.length ?? 0) > 0)?.slug ?? brands[0]?.slug ?? "";
  const [active, setActive] = useState(initialSlug);

  if (brands.length === 0) return null;

  const activeBrand = brands.find((b) => b.slug === active) ?? brands[0];
  const feeds = feedsByBrand[activeBrand.slug] ?? [];
  const accent = brandAccent(activeBrand.slug);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14">
      <div className="pointer-events-none absolute -right-6 top-8 hidden size-14 rotate-6 place-items-center rounded-2xl border-[3px] border-cyan-pop/40 bg-grape/40 text-xl animate-(--animate-sway) md:grid">
        📡
      </div>
      <div className="pointer-events-none absolute -left-8 bottom-10 hidden size-14 -rotate-6 place-items-center rounded-full border-[3px] border-punk/40 bg-grape/40 text-xl animate-(--animate-bob) [animation-delay:0.4s] lg:grid">
        📰
      </div>

      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title">
            Fresh <span className="text-cyan-pop">Store Feeds</span> 📡
          </h2>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex flex-wrap gap-3">
          {brands.map((b) => {
            const isActive = b.slug === activeBrand.slug;
            return (
              <button
                key={b.slug}
                onClick={() => setActive(b.slug)}
                className={`flex flex-none items-center gap-2 rounded-xl border-2 px-3 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide transition-all duration-150 ${
                  isActive
                    ? "border-ink bg-cyan-pop text-ink shadow-pop-sm"
                    : "border-paper/15 bg-white/5 text-paper/60 hover:border-paper/30 hover:bg-white/10 hover:text-paper"
                }`}
              >
                <span
                  className="grid size-7 flex-none place-items-center overflow-hidden rounded-full border-2 border-ink text-sm"
                  style={{ background: brandAccent(b.slug) }}
                >
                  {b.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.logo_url} alt="" className="size-full object-cover" />
                  ) : (
                    brandGlyph(b.name)
                  )}
                </span>
                <span className="truncate">{b.name}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div key={activeBrand.slug} className="mx-auto mt-5 flex w-full flex-col gap-6 md:w-[70%]">
        {feeds.length === 0 ? (
          <div className="sticker -rotate-1 p-10 text-center">
            <span className="text-5xl">📭</span>
            <h3 className="mt-4 font-display text-2xl font-extrabold">No feeds yet!</h3>
            <p className="mt-2 font-semibold text-ink/60">We&apos;re watching — deals will appear here first.</p>
          </div>
        ) : (
          feeds.map((f, i) => (
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
                  {activeBrand.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={activeBrand.logo_url} alt="" className="size-full object-cover" />
                  ) : (
                    brandGlyph(activeBrand.name)
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-extrabold uppercase tracking-wide">{activeBrand.name}</p>
                  <p className="text-xs font-semibold text-ink/50">Sponsored · {timeAgo(f.added_at)}</p>
                </div>
                <span className="ml-auto rotate-3 rounded-md border-2 border-ink bg-volt px-2 py-0.5 font-display text-[10px] font-black uppercase">
                  Feed {i + 1}
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
                  {activeBrand.site_url && (
                    <a
                      href={activeBrand.site_url}
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
          ))
        )}

        <Link href={`/stores/${activeBrand.slug}`} className="btn-punk w-full border-ink bg-volt text-ink !py-3">
          View More →
        </Link>
      </div>
    </section>
  );
}
