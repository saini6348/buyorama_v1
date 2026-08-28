import Link from "next/link";
import { ApiBrand } from "@/lib/types";
import { brandAccent, brandGlyph } from "@/lib/brand-display";

export default function Hero({ brands }: { brands: ApiBrand[] }) {
  return (
    <section className="relative overflow-hidden">
      {/* floating deco shapes */}
      <div className="pointer-events-none absolute -left-10 top-16 size-40 rounded-full border-[3px] border-punk/40 animate-(--animate-bob)" />
      <div className="pointer-events-none absolute right-8 top-40 size-24 rotate-12 rounded-2xl border-[3px] border-volt/50 animate-(--animate-bob) [animation-delay:1.2s]" />
      <div className="pointer-events-none absolute -right-6 top-10 grid size-28 place-items-center rounded-full border-[3px] border-acid/50 animate-(--animate-spin-slow) text-2xl">
        ✂️
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center md:pt-28">
        <span className="inline-block -rotate-2 rounded-lg border-[3px] border-ink bg-acid px-4 py-1.5 font-display text-sm font-black uppercase tracking-widest text-ink shadow-pop-sm">
          🔥 New · Up to 60% OFF
        </span>

        <h1 className="section-title mt-6">
          WE DO THE <span className="sweep px-1">SEARCHING</span>.
          <br />
          YOU DO THE <span className="text-punk">SAVING</span> 💸
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base font-medium text-paper/70 md:text-lg">
          Coupons, card offers & sale events from India&apos;s biggest stores — refreshed all day, every day. Zero spam, all steal.
        </p>

        <form action="/coupon-codes" className="mx-auto mt-8 flex max-w-xl gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search brands, coupons, cards…"
            className="w-full rounded-xl border-[3px] border-ink bg-white px-4 py-3 font-semibold text-ink shadow-pop-sm outline-none placeholder:text-ink/40 focus:border-punk"
          />
          <button type="submit" className="btn-punk border-ink bg-punk text-white !px-5">
            Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {brands.slice(0, 6).map((b, i) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="group flex items-center gap-2 rounded-xl border-[3px] border-ink bg-white px-3 py-2 shadow-pop-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              style={{ rotate: `${[-3, 2, -1, 3, -2, 1][i % 6]}deg` }}
            >
              <span
                className="grid size-7 place-items-center overflow-hidden rounded-md border-2 border-ink text-sm"
                style={{ background: brandAccent(b.slug) }}
              >
                {b.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.logo_url} alt="" className="size-full object-cover" />
                ) : (
                  brandGlyph(b.name)
                )}
              </span>
              <span className="font-display text-xs font-bold uppercase tracking-wide text-ink">{b.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="zigzag" />
    </section>
  );
}
