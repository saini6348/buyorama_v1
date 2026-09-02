import Link from "next/link";

const items = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Stores", href: "/stores", icon: "🏬" },
  { label: "Coupons", href: "/coupon-codes", icon: "🎟️" },
  { label: "Cards", href: "/credit-card-offers", icon: "💳" },
];

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border-[3px] border-ink bg-white p-1.5 shadow-pop md:hidden">
      {items.map((i) => (
        <Link
          key={i.label}
          href={i.href}
          className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-ink transition-colors active:bg-volt"
        >
          <span className="text-lg">{i.icon}</span>
          <span className="font-display text-[10px] font-bold uppercase tracking-wide">{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}
