"use client";

import Link from "next/link";
import { ApiCoupon } from "@/lib/types";
import { brandAccent, brandGlyph, timeAgo } from "@/lib/brand-display";

export default function CouponCard({ coupon, tilt = -2 }: { coupon: ApiCoupon; tilt?: number }) {
  const brand = coupon.brand;
  const accent = brand ? brandAccent(brand.slug) : "#a7aaad";
  return (
    <div
      className="sticker group relative flex flex-col p-5 transition-transform duration-200 hover:rotate-0 hover:scale-[1.03] hover:shadow-pop-pink"
      style={{ rotate: `${tilt}deg` }}
    >
      {coupon.featured && (
        <span className="absolute -right-3 -top-3 rotate-12 rounded-lg border-[3px] border-ink bg-punk px-2 py-1 font-display text-xs font-black uppercase text-white shadow-pop-sm">
          🔥 Hot
        </span>
      )}
      {coupon.image_url && (
        <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-[13px] border-b-[3px] border-ink/10 bg-ink/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coupon.image_url} alt={coupon.title} className="block h-auto w-full" />
        </div>
      )} 
      <div className="mb-2 flex items-center gap-2">
        <span
          className="grid size-9 place-items-center overflow-hidden rounded-lg border-2 border-ink text-lg"
          style={{ background: accent }}
        >
          {brand?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={brand.logo_url} alt="" className="size-full object-cover" />
          ) : (
            brandGlyph(brand?.name ?? "")
          )}
        </span>
        {brand && (
          <Link
            href={`/brands/${brand.slug}`}
            className="font-display text-xs font-bold uppercase tracking-widest text-ink/60 hover:text-punk"
          >
            {brand.name}
          </Link>
        )}
        <span className="ml-auto text-[11px] font-bold text-ink/40">{timeAgo(coupon.added_at)}</span>
      </div>
      <h3 className="font-display text-xl font-extrabold leading-tight">{coupon.title}</h3>
      <div
        className="mt-1 line-clamp-2 text-sm text-ink/70 [&_div]:inline"
        dangerouslySetInnerHTML={{ __html: coupon.description }}
      />

      <div className="mt-4">
        {coupon.link ? (
          <a
            href={coupon.link}
            target="_blank"
            rel="noopener nofollow"
            className="btn-punk flex w-full border-ink bg-punk text-white !px-3 !py-2 !text-xs"
          >
            <span className="w-full truncate">{coupon.link}</span>
          </a>
        ) : (
          <button
            disabled
            className="btn-punk flex w-full cursor-not-allowed border-ink bg-punk/60 text-white !px-3 !py-2 !text-xs"
          >
            Shop
          </button>
        )}
      </div>
    </div>
  );
}
