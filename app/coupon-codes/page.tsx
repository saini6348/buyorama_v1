import type { Metadata } from "next";
import CouponCodesExplorer from "@/components/sections/CouponCodesExplorer";
import { getCoupons } from "@/lib/api";

export const metadata: Metadata = {
  title: "Coupon Codes — BUY-O-RAMA",
  description: "Copy a code, land at the store, pay less. Fresh coupons verified daily.",
};

export const revalidate = 60;

export default async function CouponCodesPage() {
  const coupons = await getCoupons({ limit: 200 });

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 top-8 size-32 rounded-full border-[3px] border-punk/40 animate-(--animate-bob)" />
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center">
          <span className="inline-block rotate-2 rounded-lg border-[3px] border-ink bg-cyan-pop px-4 py-1.5 font-display text-sm font-black uppercase tracking-widest text-ink shadow-pop-sm">
            🎟️ Copy · Shop · Save
          </span>
          <h1 className="section-title mt-6 flex flex-wrap justify-center gap-x-[0.35em]">
            <span className="inline-block animate-(--animate-bob)">Coupon</span>
            <span className="inline-block animate-(--animate-bob) [animation-duration:4.5s] [animation-delay:0.4s] sweep px-1">Codes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-paper/70 md:text-lg">
            Copy a code, land at the store ready to use it. Fresh codes, verified daily — no expiry surprises.
          </p>
        </div>
        <div className="zigzag" />
      </section>
      <CouponCodesExplorer coupons={coupons} />
    </>
  );
}
