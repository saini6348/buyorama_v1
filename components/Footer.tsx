import Link from "next/link";
import { ApiBrand } from "@/lib/types";

export default function Footer({ brands }: { brands: ApiBrand[] }) {
  const cols = [
    { title: "Stores", links: brands.slice(0, 6).map((b) => ({ label: b.name, href: `/brands/${b.slug}` })) },
    {
      title: "Finance",
      links: [
        { label: "All Card Offers", href: "/credit-card-offers" },
        { label: "Lifetime Free Cards", href: "/credit-card-offers?f=lifetime-free-credit-cards" },
        { label: "Cashback Cards", href: "/credit-card-offers?f=cashback-credit-cards" },
        { label: "Airport Lounge", href: "/credit-card-offers?f=airport-lounge-credit-cards" },
      ],
    },
    {
      title: "Sale Events",
      links: [
        { label: "Big Billion Days", href: "/sale-events/big-billion-days" },
        { label: "Prime Day", href: "/sale-events/prime-day" },
        { label: "Great Indian Festival", href: "/sale-events/great-indian-festival" },
        { label: "GOAT Sale", href: "/sale-events/goat" },
      ],
    },
  ];

  return (
    <footer className="mt-20 border-t-[3px] border-ink bg-grape text-paper pb-24 md:pb-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-3">
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-display text-sm font-black uppercase tracking-widest text-volt">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-semibold text-paper/70 transition-colors hover:text-punk">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center">
        <p className="font-display text-lg font-extrabold">
          BUY<span className="text-punk">·</span>O<span className="text-punk">·</span>RAMA
        </p>
        <p className="mt-1 text-xs text-paper/50">© 2026 BUY-O-RAMA — We Do the Searching. You Do the Saving. 🎉</p>
      </div>
    </footer>
  );
}
