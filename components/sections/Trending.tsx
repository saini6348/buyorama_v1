import Link from "next/link";
import CouponCard from "@/components/CouponCard";
import Reveal from "@/components/Reveal";
import { ApiCoupon } from "@/lib/types";

export default function Trending({ coupons }: { coupons: ApiCoupon[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14">
      <div className="pointer-events-none absolute -right-4 top-2 hidden size-14 -rotate-6 place-items-center rounded-2xl border-[3px] border-punk/40 bg-grape/40 text-xl animate-(--animate-sway) sm:grid">
        🎁
      </div>
      <div className="pointer-events-none absolute -left-6 bottom-6 hidden size-14 rotate-3 place-items-center rounded-full border-[3px] border-volt/40 bg-grape/40 text-xl animate-(--animate-bob) [animation-delay:0.5s] md:grid">
        🔖
      </div>

      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title">
            Trending <span className="text-punk">Deals</span> ⚡
          </h2>
          <Link href="/coupon-codes" className="btn-punk border-ink bg-volt text-ink !py-2 !text-xs">
            View All
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c, i) => (
          <Reveal key={c.slug} delay={i * 120}>
            <CouponCard coupon={c} tilt={i % 2 ? 2 : -2} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
