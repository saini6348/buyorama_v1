import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandTabs from "@/components/BrandTabs";
import Reveal from "@/components/Reveal";
import { getBrandDetail, getBrands } from "@/lib/api";
import { ApiBrand } from "@/lib/types";
import { brandAccent, brandGlyph } from "@/lib/brand-display";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const brands = await getBrands();
    return brands.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { brand } = await getBrandDetail(slug);
    return {
      title: `${brand.name} Coupons & Deals — BUY-O-RAMA`,
      description: `Latest ${brand.name} coupons, feeds and deals — verified daily on BUY-O-RAMA.`,
    };
  } catch {
    return { title: "Brand not found — BUY-O-RAMA" };
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let detail;
  try {
    detail = await getBrandDetail(slug);
  } catch {
    notFound();
  }
  const { brand, coupons, feeds } = detail;
  let allBrands: ApiBrand[] = [];
  try {
    allBrands = await getBrands();
  } catch {
    allBrands = [];
  }
  const others = allBrands.filter((b) => b.slug !== brand.slug);
  const accent = brandAccent(brand.slug);

  return (
    <>
      {/* ============ Brand hero ============ */}
      <section className="relative overflow-hidden border-b-[3px] border-ink" style={{ background: `${accent}1a` }}>
        <div className="pointer-events-none absolute -right-10 top-6 size-36 rounded-full border-[3px] border-punk/30 animate-(--animate-bob)" />
        <div className="pointer-events-none absolute -left-6 bottom-4 size-20 rotate-12 rounded-2xl border-[3px] border-volt/40 animate-(--animate-bob) [animation-delay:1.1s]" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14">
          <div className="flex flex-col items-start gap-7 md:flex-row md:items-center">
            <Reveal>
              <span
                className="grid size-28 place-items-center overflow-hidden rounded-3xl border-[3px] border-ink text-6xl shadow-pop md:size-32"
                style={{ background: accent }}
              >
                {brand.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={brand.logo_url} alt="" className="size-full object-cover" />
                ) : (
                  brandGlyph(brand.name)
                )}
              </span>
            </Reveal>

            <div className="min-w-0">
              <Reveal delay={100}>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="section-title !text-[clamp(2.2rem,6vw,4rem)]">{brand.name}</h1>
                  <span className="rotate-2 rounded-md border-[3px] border-ink bg-punk px-3 py-1 font-display text-xs font-black uppercase tracking-wide text-white shadow-pop-sm">
                    Live Deals
                  </span>
                </div>
                <p className="mt-2 font-display text-sm font-bold uppercase tracking-widest text-paper/60">
                  {brand.site_url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="sticker rotate-[-1deg] px-4 py-2 font-display text-xs font-black uppercase">
                    📰 {feeds.length} Feeds
                  </span>
                  <span className="sticker rotate-[1deg] px-4 py-2 font-display text-xs font-black uppercase">
                    🎟️ {coupons.length} Coupons
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 md:ml-auto md:items-end">
              {brand.site_url && (
                <a href={brand.site_url} target="_blank" rel="noopener nofollow" className="btn-punk border-ink bg-punk text-white">
                  Visit Store ↗
                </a>
              )}
              <Link href="/coupon-codes" className="btn-punk border-ink bg-volt text-ink">
                All Coupons
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Tabs | wall | other brands ============ */}
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <BrandTabs
            brand={{ name: brand.name, slug: brand.slug, site_url: brand.site_url, logo_url: brand.logo_url }}
            coupons={coupons}
            feeds={feeds}
            others={others.map((b) => ({ name: b.name, slug: b.slug, logo_url: b.logo_url, coupon_count: b.coupon_count }))}
          />
        </div>

        {/* ---------- Right sidebar: Other Brands (sticky) ---------- */}
        <aside className="lg:sticky lg:top-[84px] lg:h-max lg:self-start">
          <div className="rounded-2xl border-[3px] border-ink bg-grape p-5">
            <h2 className="mb-4 font-display text-sm font-black uppercase tracking-widest text-volt">
              Other Stores 🏬
            </h2>
            <div className="flex flex-col gap-3">
              {others.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="group flex items-center gap-3 rounded-xl border-2 border-transparent p-2 transition-all hover:border-ink hover:bg-white"
                >
                  <span
                    className="grid size-11 flex-none place-items-center overflow-hidden rounded-xl border-[3px] border-ink text-xl transition-transform group-hover:animate-wiggle"
                    style={{ background: brandAccent(b.slug) }}
                  >
                    {b.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logo_url} alt="" className="size-full object-cover" />
                    ) : (
                      brandGlyph(b.name)
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm font-extrabold uppercase text-paper group-hover:text-ink">
                      {b.name}
                    </span>
                    <span className="block text-[11px] font-bold text-paper/50 group-hover:text-ink/60">
                      {b.coupon_count} live deals
                    </span>
                  </span>
                  <span className="font-display text-lg text-paper/40 transition-colors group-hover:text-punk">→</span>
                </Link>
              ))}
            </div>
            <Link href="/stores" className="btn-punk mt-5 w-full border-ink bg-volt text-ink !py-2 !text-xs">
              All Stores
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
