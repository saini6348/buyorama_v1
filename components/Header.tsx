"use client";

import Link from "next/link";
import { useState } from "react";
import { ApiBrand } from "@/lib/types";

export default function Header({ brands }: { brands: ApiBrand[] }) {
  const [open, setOpen] = useState<string | null>(null);

  const nav = [
    { label: "Stores", href: "/stores", children: brands.slice(0, 6).map((b) => ({ label: b.name, href: `/brands/${b.slug}` })) },
    { label: "Coupon Codes", href: "/coupon-codes" },
    {
      label: "Credit Cards",
      href: "/credit-card-offers",
      children: [
        { label: "All Card Offers", href: "/credit-card-offers" },
        { label: "Lifetime Free", href: "/credit-card-offers?f=lifetime-free-credit-cards" },
        { label: "Cashback", href: "/credit-card-offers?f=cashback-credit-cards" },
        { label: "Airport Lounge", href: "/credit-card-offers?f=airport-lounge-credit-cards" },
      ],
    },
    {
      label: "Sale Events",
      href: "/sale-events",
      children: [
        { label: "Big Billion Days", href: "/sale-events/big-billion-days" },
        { label: "Prime Day", href: "/sale-events/prime-day" },
        { label: "Great Indian Festival", href: "/sale-events/great-indian-festival" },
        { label: "GOAT Sale", href: "/sale-events/goat" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-grape text-paper">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-xl border-[3px] border-ink bg-volt text-lg font-black text-ink shadow-pop-sm transition-transform group-hover:animate-wiggle">
            B
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            BUY<span className="text-punk">·</span>O<span className="text-punk">·</span>RAMA
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)}>
          {nav.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.children ? item.label : null)}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white/10"
              >
                {item.label}
              </Link>
              {item.children && open === item.label && (
                <div className="absolute left-0 top-full z-50 min-w-52 rounded-xl border-[3px] border-ink bg-white p-2 text-ink shadow-pop">
                  {item.children.map((c) => (
                    <Link key={c.label} href={c.href} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-volt/40">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/coupon-codes"
            className="btn-punk hidden border-ink bg-punk text-white !shadow-none hover:shadow-none md:inline-flex !py-2"
          >
            🎯 Today&apos;s Top Deal
          </Link>
        </div>
      </div>
    </header>
  );
}
