import Reveal from "@/components/Reveal";

const REQUEST_EXAMPLES = [
  { emoji: "💻", label: "Laptop under ₹50,000" },
  { emoji: "👟", label: "Nike shoes" },
  { emoji: "💄", label: "Skincare offers" },
  { emoji: "🔋", label: "Power bank on Amazon" },
  { emoji: "💳", label: "Credit card with lounge access" },
];

const SOCIAL_LINKS = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@buy-o-rama",
    bg: "bg-[#FF0000]",
    icon: (
      <svg viewBox="0 0 24 24" className="size-11 sm:size-12" fill="currentColor" aria-hidden="true">
        <path d="M9.5 7.5v9l8-4.5-8-4.5z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/buyorama/",
    bg: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" className="size-11 sm:size-12" fill="currentColor" aria-hidden="true">
        <path d="M14.5 8.5H16V5.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.5V15h2.3v7h2.9v-7h2.4l.4-2.9h-2.8V9.7c0-.8.2-1.2 1.3-1.2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/buy_o_rama/",
    bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    icon: (
      <svg viewBox="0 0 24 24" className="size-11 sm:size-12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/buyorama/",
    bg: "bg-[#E60023]",
    icon: (
      <svg viewBox="0 0 24 24" className="size-11 sm:size-12" fill="currentColor" aria-hidden="true">
        <path d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5 0 3.6 2.2 6.6 5.3 7.9-.1-.7-.1-1.7 0-2.4l1.1-4.7s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.1 2.9-4.6 0-1.9-1.3-3.4-3.7-3.4-2.7 0-4.4 2-4.4 4.2 0 .8.3 1.6.6 2.1.1.1.1.2.1.3l-.3 1c0 .2-.1.2-.3.1-1.1-.5-1.8-2-1.8-3.2 0-2.6 1.9-5 5.4-5 2.9 0 5.1 2.1 5.1 4.8 0 2.9-1.8 5.2-4.3 5.2-.8 0-1.6-.4-1.9-.9l-.5 2c-.2.7-.7 1.6-1 2.1.8.2 1.6.4 2.5.4 4.7 0 8.5-3.8 8.5-8.5S16.7 3.5 12 3.5z" />
      </svg>
    ),
  },
];

const ICON_ROTATE = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
const CHIP_ROTATE = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

export default function RequestDeals() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-20 text-center">
      <div className="pointer-events-none absolute left-2 top-8 hidden size-14 rotate-6 place-items-center rounded-2xl border-[3px] border-volt/40 bg-grape/40 text-xl animate-(--animate-bob) sm:grid">
        🔍
      </div>
      <div className="pointer-events-none absolute right-4 bottom-2 hidden size-14 -rotate-3 place-items-center rounded-full border-[3px] border-cyan-pop/40 bg-grape/40 text-xl animate-(--animate-sway) [animation-delay:0.6s] md:grid">
        💬
      </div>

      <Reveal>
        <div className="sticker relative rotate-1 p-8 md:p-12">
          <span className="absolute -top-5 left-6 -rotate-6 rounded-lg border-[3px] border-ink bg-cyan-pop px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-ink shadow-pop-sm">
            We&apos;re Listening 👂
          </span>

          <h2 className="section-title">
            🔍 Tell Us What <span className="sweep px-1">You&apos;re Looking For</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-display text-lg font-extrabold sm:text-xl">
            Can&apos;t find the deal you want?{" "}
            <span className="text-punk">Let us know!</span>
          </p>
          <p className="mx-auto mt-4 max-w-lg font-semibold text-ink/70">
            Tell us what you&apos;re planning to buy and which store you&apos;d like to shop
            from. Comment on our social media posts with your requests, and we&apos;ll keep
            an eye out for deals, discounts and offers that match.
          </p>

          <div className="mt-6 -rotate-1 inline-block rounded-xl border-[3px] border-ink bg-ink px-6 py-3 shadow-pop-sm">
            <p className="font-display text-base font-black uppercase tracking-wide text-white sm:text-lg">
              <span className="text-volt">You Ask.</span>{" "}
              <span className="text-cyan-pop">We Search.</span>{" "}
              <span className="text-acid">You Save.</span>
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
            {REQUEST_EXAMPLES.map((ex, i) => (
              <span
                key={ex.label}
                className={`inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide shadow-pop-sm transition-transform hover:-translate-y-1 hover:shadow-pop-pink sm:text-sm ${CHIP_ROTATE[i % CHIP_ROTATE.length]}`}
              >
                <span>{ex.emoji}</span> {ex.label}
              </span>
            ))}
          </div>

          <div className="zigzag -mx-8 my-10 md:-mx-12" />

          <h3 className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Follow <span className="text-punk">Buy-O-Rama</span>
          </h3>
          <p className="mt-2 font-semibold text-ink/70">Daily deals. Fresh finds. New offers.</p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className={`grid size-18 place-items-center rounded-full border-[3px] border-ink text-white shadow-pop transition-transform hover:-translate-y-1.5 hover:rotate-0 hover:scale-110 hover:shadow-pop-pink sm:size-20 ${ICON_ROTATE[i % ICON_ROTATE.length]} ${s.bg}`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-ink/70">
            💬 Follow us &amp; tell us what you want us to find
          </p>
        </div>
      </Reveal>
    </section>
  );
}
