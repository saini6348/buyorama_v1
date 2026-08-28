import Link from "next/link";
import CouponCard from "@/components/CouponCard";
import Reveal from "@/components/Reveal";
import { ApiCoupon } from "@/lib/types";

export default function Trending({ coupons }: { coupons: ApiCoupon[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
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
