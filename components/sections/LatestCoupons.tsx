import Link from "next/link";
import CouponCard from "@/components/CouponCard";
import Reveal from "@/components/Reveal";
import { ApiCoupon } from "@/lib/types";

export default function LatestCoupons({ coupons }: { coupons: ApiCoupon[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
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
