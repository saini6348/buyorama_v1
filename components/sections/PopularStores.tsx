import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ApiBrand } from "@/lib/types";
import { brandAccent, brandGlyph } from "@/lib/brand-display";

export default function PopularStores({ brands }: { brands: ApiBrand[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title">
            Popular <span className="text-cyan-pop">Stores</span> 🏬
          </h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((b, i) => (
          <Reveal key={b.slug} delay={i * 70}>
            <Link
              href={`/brands/${b.slug}`}
              className="sticker group flex flex-col items-center gap-3 p-5 transition-all hover:rotate-0 hover:scale-105 hover:shadow-pop-pink"
              style={{ rotate: `${(i % 3 - 1) * 2}deg` }}
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
    </section>
  );
}
