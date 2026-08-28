import Reveal from "@/components/Reveal";

export default function Newsletter() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <Reveal>
        <div className="sticker relative rotate-1 p-8 md:p-12">
          <span className="absolute -top-5 left-6 -rotate-6 rounded-lg border-[3px] border-ink bg-punk px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-white shadow-pop-sm">
            No Spam, Promise
          </span>
          <h2 className="section-title">
            Never miss a <span className="sweep px-1">70%-off</span> moment 📬
          </h2>
          <p className="mx-auto mt-4 max-w-md font-semibold text-ink/70">
            One email a day. Only the hottest deals. Unsubscribe whenever, no hard feelings.
          </p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border-[3px] border-ink px-4 py-3 font-semibold text-ink shadow-pop-sm outline-none placeholder:text-ink/40 focus:border-punk"
            />
            <button type="submit" className="btn-punk border-ink bg-punk text-white !px-5">
              Notify Me
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
