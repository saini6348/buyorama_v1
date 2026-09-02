import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ApiCard } from "@/lib/types";

export default function CardOffers({ cards }: { cards: ApiCard[] }) {
  return (
    <section className="relative py-14">
      <div className="zigzag rotate-180" />
      <div className="pointer-events-none absolute left-6 top-6 hidden size-14 rotate-3 place-items-center rounded-2xl border-[3px] border-cyan-pop/40 bg-grape/40 text-xl animate-(--animate-spin-slow) lg:grid">
        🚚
      </div>
      <div className="pointer-events-none absolute left-6 bottom-6 hidden size-12 -rotate-6 place-items-center rounded-full border-[3px] border-punk/40 bg-grape/40 text-lg animate-(--animate-wiggle-loop) [animation-delay:0.4s] lg:grid">
        🎯
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">
                Credit Card <span className="text-punk">Offers</span> 💳
              </h2>
              <p className="mt-2 font-semibold text-paper/60">Cards that pay you back. Literally.</p>
            </div>
            <Link href="/credit-card-offers" className="btn-punk border-ink bg-cyan-pop text-ink !py-2 !text-xs">
              All Cards
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.slice(0, 4).map((card, i) => (
            <Reveal key={card.slug} delay={i * 100}>
              <Link
                href={`/credit-card-offers?card=${card.slug}`}
                className="sticker group flex h-full flex-col gap-3 p-5 transition-all hover:rotate-0 hover:scale-[1.03] hover:shadow-pop-volt"
                style={{ rotate: `${(i % 2 ? 1 : -1) * 1.5}deg` }}
              >
                <div className="-mx-5 -mt-5 overflow-hidden rounded-t-[13px] border-b-[3px] border-ink/10 bg-volt">
                  {card.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.logo_url}
                      alt=""
                      className="block h-auto w-full transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-36 place-items-center">
                      <span className="text-4xl">💳</span>
                    </div>
                  )}
                </div>
                {card.tags[0] && (
                  <span className="-rotate-3 self-start rounded-md border-2 border-ink bg-punk px-2 py-0.5 font-display text-[10px] font-black uppercase text-white">
                    {card.tags[0].name}
                  </span>
                )}
                <h3 className="line-clamp-2 font-display text-lg font-extrabold leading-tight">{card.title}</h3>
                <div
                  className="line-clamp-3 text-sm text-ink/70 [&_div]:inline"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
                <span className="mt-auto font-display text-sm font-bold uppercase text-punk">View Details →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
