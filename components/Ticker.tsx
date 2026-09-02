import { ApiBrand } from "@/lib/types";

export default function Ticker({ brands }: { brands: ApiBrand[] }) {
  const items = brands.flatMap((b) => [`⚡ ${b.name.toUpperCase()} — ${b.coupon_count} LIVE COUPONS`]);
  if (items.length === 0) items.push("⚡ DEALS DROP ALL DAY — STAY TUNED");
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-b-[3px] border-ink bg-volt py-2 text-ink" aria-hidden>
      <div className="marquee-track flex w-max animate-(--animate-marquee) gap-8 pr-8">
        {doubled.map((t, i) => (
          <span key={i} className="font-display text-sm font-extrabold uppercase tracking-wider whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
