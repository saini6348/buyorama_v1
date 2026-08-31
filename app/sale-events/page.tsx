import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getSalesEvents } from "@/lib/api";
import { ApiSalesEvent } from "@/lib/types";
import { brandAccent, brandGlyph } from "@/lib/brand-display";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sale Events — BUY-O-RAMA",
  description:
    "Every mega sale event tracked by BUY-O-RAMA — Big Billion Days, Great Indian Festival and more, all in one place.",
};

export default async function SaleEventsPage() {
  let events: ApiSalesEvent[] = [];
  try {
    events = await getSalesEvents();
  } catch {
    events = [];
  }

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b-[3px] border-ink bg-grape text-paper">
        <div className="pointer-events-none absolute -right-10 top-6 size-36 rounded-full border-[3px] border-punk/30 animate-(--animate-bob)" />
        <div className="pointer-events-none absolute -left-6 bottom-4 size-20 rotate-12 rounded-2xl border-[3px] border-volt/40 animate-(--animate-bob) [animation-delay:1.1s]" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14">
          <Reveal>
            <span className="sticker -rotate-1 px-4 py-1 font-display text-xs font-black uppercase">🔥 Never miss a sale</span>
            <h1 className="section-title mt-4 !text-[clamp(2.2rem,6vw,4rem)]">Sale Events</h1>
            <p className="mt-3 max-w-xl font-semibold text-paper/70">
              The year&apos;s biggest shopping festivals — tracked with live feeds so you always know when the deals drop.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Event grid ============ */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        {events.length === 0 ? (
          <div className="sticker -rotate-1 p-10 text-center">
            <span className="text-5xl">🗓️</span>
            <h3 className="mt-4 font-display text-2xl font-extrabold">No sale events yet!</h3>
            <p className="mt-2 font-semibold text-ink/60">Check back soon — big sales are on the way.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => {
              const accent = brandAccent(e.slug);
              return (
                <Link
                  key={e.slug}
                  href={`/sale-events/${e.slug}`}
                  className="sticker group overflow-hidden transition-all hover:rotate-0 hover:shadow-pop-volt"
                  style={{ rotate: `${i % 2 ? 1 : -1}deg`, animation: `pop-in 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms both` }}
                >
                  <div className="flex items-center gap-4 border-b-[3px] border-ink p-5" style={{ background: `${accent}1f` }}>
                    <span
                      className="grid size-16 flex-none place-items-center rounded-2xl border-[3px] border-ink text-3xl shadow-pop-sm transition-transform group-hover:animate-wiggle"
                      style={{ background: accent }}
                    >
                      {brandGlyph(e.title)}
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-xl font-extrabold uppercase leading-tight">{e.title}</h2>
                      <p className="mt-1 text-xs font-bold text-ink/50">{e.feed_count} live {e.feed_count === 1 ? "feed" : "feeds"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="font-display text-xs font-black uppercase tracking-widest text-ink/50">View deals</span>
                    <span className="font-display text-xl transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
