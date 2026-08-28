import type { Metadata } from "next";
import { Suspense } from "react";
import CardOffersExplorer from "@/components/sections/CardOffersExplorer";
import { getCardSettings, getCards } from "@/lib/api";

export const metadata: Metadata = {
  title: "Credit Card Offers — BUY-O-RAMA",
  description: "Cashback, travel, lifetime free, fuel & RuPay credit cards — compare and pick your plastic.",
};

export default async function CreditCardOffersPage() {
  const [cards, settings] = await Promise.all([getCards({ limit: 200 }), getCardSettings()]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-8 top-10 size-28 rounded-full border-[3px] border-acid/50 animate-(--animate-bob)" />
        <div className="pointer-events-none absolute -right-6 top-24 size-20 rotate-12 rounded-2xl border-[3px] border-punk/50 animate-(--animate-bob) [animation-delay:1s]" />
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center">
          <span className="inline-block -rotate-2 rounded-lg border-[3px] border-ink bg-volt px-4 py-1.5 font-display text-sm font-black uppercase tracking-widest text-ink shadow-pop-sm">
            💳 Cards That Pay You Back
          </span>
          <h1 className="section-title mt-6 flex flex-wrap justify-center gap-x-[0.35em]">
            <span className="inline-block animate-(--animate-bob)">Credit</span>
            <span className="inline-block animate-(--animate-bob) [animation-duration:4.5s] [animation-delay:0.4s]">Card</span>
            <span className="inline-block animate-(--animate-bob) [animation-duration:3.2s] [animation-delay:0.8s] text-punk">Offers</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-paper/70 md:text-lg">
            Filter by bank, category or perk. Find the plastic that actually pays you back — literally.
          </p>
        </div>
        <div className="zigzag" />
      </section>
      <Suspense fallback={null}>
        <CardOffersExplorer cards={cards} settings={settings} />
      </Suspense>
    </>
  );
}
