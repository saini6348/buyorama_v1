import type { Metadata } from "next";
import StoresExplorer from "@/components/sections/StoresExplorer";
import { getBrands } from "@/lib/api";
import { ApiBrand } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Stores — BUY-O-RAMA",
  description: "Browse every store on BUY-O-RAMA — coupons, feeds and deals from India's biggest brands.",
};

export const revalidate = 60;

export default async function StoresPage() {
  let brands: ApiBrand[] = [];
  try {
    brands = await getBrands();
  } catch {
    brands = [];
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 top-8 size-32 rounded-full border-[3px] border-cyan-pop/40 animate-(--animate-bob)" />
        <div className="pointer-events-none absolute -left-6 bottom-4 size-20 rotate-12 rounded-2xl border-[3px] border-volt/40 animate-(--animate-bob) [animation-delay:1.1s]" />
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center">
          <span className="inline-block -rotate-2 rounded-lg border-[3px] border-ink bg-cyan-pop px-4 py-1.5 font-display text-sm font-black uppercase tracking-widest text-ink shadow-pop-sm">
            🏬 Every Store, One Page
          </span>
          <h1 className="section-title mt-6">
            All <span className="sweep px-1">Stores</span> 🛍️
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-paper/70 md:text-lg">
            Every brand we track, in one place — jump straight to its coupons, feeds and deals.
          </p>
        </div>
        <div className="zigzag" />
      </section>
      <StoresExplorer brands={brands} />
    </>
  );
}
