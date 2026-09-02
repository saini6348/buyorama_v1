import Link from "next/link";
import CouponCard from "@/components/CouponCard";
import Reveal from "@/components/Reveal";
import { ApiCoupon } from "@/lib/types";

export default function LatestCoupons({ coupons }: { coupons: ApiCoupon[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14">
      <div className="pointer-events-none absolute -right-8 top-4 hidden size-14 rotate-6 place-items-center rounded-2xl border-[3px] border-volt/40 bg-grape/40 text-xl animate-(--animate-bob) [animation-delay:0.7s] md:grid">
        🧾
      </div>
      <div className="pointer-events-none absolute -left-6 bottom-10 hidden size-14 -rotate-3 place-items-center rounded-full border-[3px] border-punk/40 bg-grape/40 text-xl animate-(--animate-sway) [animation-delay:0.2s] lg:grid">
        ⌚
      </div>

      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title">
            Latest <span className="text-volt">Coupons</span> 🎟️
          </h2>
          <Link href="/coupon-codes" className="btn-punk border-ink bg-punk text-white !py-2 !text-xs">
            Grab Them
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 120}>
            <CouponCard coupon={c} tilt={i % 2 ? 1 : -1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
