import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getSalesEventDetail, getSalesEvents } from "@/lib/api";
import { brandAccent, brandGlyph, timeAgo } from "@/lib/brand-display";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const events = await getSalesEvents();
    return events.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { event } = await getSalesEventDetail(slug);
    return {
      title: `${event.title} Deals & Feeds — BUY-O-RAMA`,
      description: `Live ${event.title} sale feeds and deals — tracked and verified daily on BUY-O-RAMA.`,
    };
  } catch {
    return { title: "Sale event not found — BUY-O-RAMA" };
  }
}

export default async function SaleEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let detail;
  try {
    detail = await getSalesEventDetail(slug);
  } catch {
    notFound();
  }
  const { event, feeds } = detail;
  const accent = brandAccent(event.slug);

  return (
    <>
      {/* ============ Event hero ============ */}
      <section className="relative overflow-hidden border-b-[3px] border-ink" style={{ background: `${accent}1a` }}>
        <div className="pointer-events-none absolute -right-10 top-6 size-36 rounded-full border-[3px] border-punk/30 animate-(--animate-bob)" />
        <div className="pointer-events-none absolute -left-6 bottom-4 size-20 rotate-12 rounded-2xl border-[3px] border-volt/40 animate-(--animate-bob) [animation-delay:1.1s]" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14">
          <Reveal>
            <Link href="/sale-events" className="font-display text-xs font-black uppercase tracking-widest text-paper/60 hover:text-paper">
              ← All Sale Events
            </Link>
          </Reveal>
          <div className="mt-4 flex flex-col items-start gap-7 md:flex-row md:items-center">
            <Reveal>
              <span
                className="grid size-24 place-items-center rounded-3xl border-[3px] border-ink text-5xl shadow-pop md:size-28"
                style={{ background: accent }}
              >
                {brandGlyph(event.title)}
              </span>
            </Reveal>

            <div className="min-w-0">
              <Reveal delay={100}>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="section-title !text-[clamp(2rem,5.5vw,3.6rem)]">{event.title}</h1>
                  <span className="rotate-2 rounded-md border-[3px] border-ink bg-punk px-3 py-1 font-display text-xs font-black uppercase tracking-wide text-white shadow-pop-sm">
                    Sale Live
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="sticker rotate-[-1deg] px-4 py-2 font-display text-xs font-black uppercase">
                    📰 {feeds.length} Feeds
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Feeds wall ============ */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        {feeds.length === 0 ? (
          <div className="sticker -rotate-1 p-10 text-center">
            <span className="text-5xl">📭</span>
            <h3 className="mt-4 font-display text-2xl font-extrabold">No feeds yet!</h3>
            <p className="mt-2 font-semibold text-ink/60">We&apos;re watching — deals will appear here first.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {feeds.map((f, i) => (
              <article
                key={f.slug}
                className="sticker group overflow-hidden transition-all hover:rotate-0 hover:shadow-pop-volt"
                style={{
                  rotate: `${i % 2 ? 0.5 : -0.5}deg`,
                  animation: `pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 90}ms both`,
                }}
              >
                {/* post header */}
                <div className="flex items-center gap-3 border-b-[3px] border-ink/10 px-6 py-4">
                  <span
                    className="grid size-12 flex-none place-items-center overflow-hidden rounded-full border-[3px] border-ink bg-white text-2xl"
                    style={{ background: accent }}
                  >
                    {brandGlyph(event.title)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-extrabold uppercase tracking-wide">{event.title}</p>
                    <p className="text-xs font-semibold text-ink/50">Sale Event · {timeAgo(f.added_at)}</p>
                  </div>
                  <span className="ml-auto rotate-3 rounded-md border-2 border-ink bg-volt px-2 py-0.5 font-display text-[10px] font-black uppercase">
                    Feed
                  </span>
                </div>

                {/* image banner (only when the feed has an image) */}
                {f.image_url && (
                  <div
                    className="grid min-h-56 place-items-center overflow-hidden border-b-[3px] border-ink/10 md:min-h-64"
                    style={{ background: `${accent}26` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image_url} alt={f.title} className="size-full object-cover" />
                  </div>
                )}

                {/* article body */}
                <div className="px-6 py-5">
                  <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{f.title}</h3>
                  <div
                    className="mt-3 whitespace-pre-line text-[15px] font-medium leading-[1.8] text-ink/75 md:text-base [&_a]:text-punk [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: f.description }}
                  />
                  <div className="mt-6 flex gap-2 text-sm font-bold text-ink/50">
                    <span className="rounded-full border-2 border-ink/15 px-3 py-1">👍 Grabbed by many</span>
                    <span className="rounded-full border-2 border-ink/15 px-3 py-1">🔖 Save</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
