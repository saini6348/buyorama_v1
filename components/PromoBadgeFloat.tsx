"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Phase = "shake" | "straighten" | "swing" | "falling" | "hidden" | "resetting" | "entering" | "landed";

const BADGE_CLASS =
  "inline-block select-none whitespace-nowrap rounded-lg border-[3px] border-ink bg-acid px-4 py-1.5 font-display text-sm font-black uppercase tracking-widest text-ink shadow-pop-sm";

export default function PromoBadgeFloat() {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<Phase>("shake");
  const [floatStyle, setFloatStyle] = useState<React.CSSProperties | null>(null);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (reduced) {
      setFloatStyle(null);
      setPhase("shake");
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    async function run() {
      while (!cancelled) {
        // 1) vibrate in place, still tilted
        setFloatStyle(null);
        setPhase("shake");
        await wait(2000);
        if (cancelled) return;

        // 2) straighten out
        setPhase("straighten");
        await wait(450);
        if (cancelled) return;

        // 3) hang and swing like a sign on a hook
        setPhase("swing");
        await wait(3200);
        if (cancelled) return;

        // 4) detach and fall toward the footer
        const el = wrapperRef.current;
        if (!el) return;
        const homeRect = el.getBoundingClientRect();

        setPhase("falling");
        setFloatStyle({
          position: "fixed",
          top: homeRect.top,
          left: homeRect.left,
          width: homeRect.width,
          margin: 0,
          zIndex: 40,
          transition: "none",
          opacity: 1,
        });
        await wait(20);
        if (cancelled) return;

        const footer = document.querySelector("footer");
        const footerRect = footer?.getBoundingClientRect();
        const dropTarget = footerRect ? footerRect.top + footerRect.height * 0.4 : homeRect.top + window.innerHeight * 2.2;
        const dropDistance = Math.max(dropTarget - homeRect.top, window.innerHeight * 0.6);
        const fallMs = Math.min(2600, Math.max(1200, Math.round(dropDistance * 0.55)));

        setFloatStyle((s) =>
          s
            ? {
                ...s,
                top: dropTarget,
                opacity: 0,
                transition: `top ${fallMs}ms cubic-bezier(.55,0,.85,.4), opacity ${fallMs}ms ease-in`,
              }
            : s
        );
        await wait(fallMs);
        if (cancelled) return;

        // 5) hide behind the footer for a beat
        setPhase("hidden");
        await wait(1600);
        if (cancelled) return;

        // 6) reset above the header, no transition
        setPhase("resetting");
        setFloatStyle((s) => (s ? { ...s, top: -140, opacity: 0, transition: "none" } : s));
        await wait(40);
        if (cancelled) return;

        // 7) drop back in from the top, into its home slot
        const homeAgain = wrapperRef.current?.getBoundingClientRect();
        const landTop = homeAgain ? homeAgain.top : homeRect.top;

        setPhase("entering");
        setFloatStyle((s) =>
          s
            ? {
                ...s,
                top: landTop,
                opacity: 1,
                transition: "top 900ms cubic-bezier(.2,.8,.3,1.05), opacity 500ms ease-out",
              }
            : s
        );
        await wait(950);
        if (cancelled) return;

        // 8) land with a little squash, then go back to being a normal in-flow badge
        setPhase("landed");
        await wait(350);
        if (cancelled) return;

        setFloatStyle(null);
        setLoop((n) => n + 1);
        await wait(30);
      }
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [mounted, reduced]);

  const isFloating = floatStyle !== null;

  const phaseClass = reduced
    ? "-rotate-2"
    : phase === "shake"
      ? "animate-(--animate-badge-shake)"
      : phase === "straighten"
        ? "rotate-0 transition-transform duration-500 ease-out"
        : phase === "swing"
          ? "origin-top animate-(--animate-badge-swing)"
          : phase === "landed"
            ? "animate-(--animate-badge-land)"
            : "rotate-0";

  return (
    <>
      <span ref={wrapperRef} className="inline-block">
        {isFloating ? (
          <span className={`${BADGE_CLASS} invisible`} aria-hidden="true">
            🔥 New · Up to 60% OFF
          </span>
        ) : (
          <span key={`${loop}-${phase}`} className={`${BADGE_CLASS} ${phaseClass}`}>
            🔥 New · Up to 60% OFF
          </span>
        )}
      </span>
      {mounted &&
        isFloating &&
        createPortal(
          <span
            key={`${loop}-${phase}-float`}
            aria-hidden="true"
            style={floatStyle ?? undefined}
            className={`${BADGE_CLASS} pointer-events-none ${phase === "landed" ? "animate-(--animate-badge-land)" : ""}`}
          >
            🔥 New · Up to 60% OFF
          </span>,
          document.body
        )}
    </>
  );
}
