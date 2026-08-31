"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowLeft2, ArrowRight2, MagicStar, Truck } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui-utils";
import { useLanguage } from "@/stores/language";

const slides = [
  {
    id: "s1",
    tag: "promo.s1Tag",
    title: "promo.s1Title",
    sub: "promo.s1Sub",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80",
    href: "/shop",
    cta: "promo.shopNow",
  },
  {
    id: "s2",
    tag: "promo.s2Tag",
    title: "promo.s2Title",
    sub: "promo.s2Sub",
    img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1600&q=80",
    href: "/shop",
    cta: "promo.shopFresh",
  },
  {
    id: "s3",
    tag: "promo.s3Tag",
    title: "promo.s3Title",
    sub: "promo.s3Sub",
    img: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=1600&q=80",
    href: "/shop",
    cta: "promo.shopNow",
  },
  {
    id: "s4",
    tag: "promo.s4Tag",
    title: "promo.s4Title",
    sub: "promo.s4Sub",
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1600&q=80",
    href: "/shop",
    cta: "promo.shopNow",
  },
];

// Infinite track: [last, s0, s1, s2, s3, first]
const track = [slides[slides.length - 1], ...slides, slides[0]];
const TRACK_OFFSET = 1; // logical slide 0 sits at track index 1
const TRACK_LAST = track.length - 1; // 5 -> clone of first slide
const SLIDE_DURATION = 2000;
const SLIDE_TRANSITION = 700;

export function PromoBanner() {
  const { t, isRTL } = useLanguage();
  const [trackIndex, setTrackIndex] = React.useState(TRACK_OFFSET);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const transitionRef = React.useRef(true);

  const activeSlide = trackIndex - TRACK_OFFSET;
  const slide = slides[activeSlide];

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const moveTo = (index: number) => {
    transitionRef.current = true;
    setTrackIndex(index);
  };

  const step = (dir: -1 | 1) => {
    transitionRef.current = true;
    setTrackIndex((cur) => cur + dir);
  };

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      transitionRef.current = true;
      setTrackIndex((cur) => cur + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, trackIndex]);

  // Seamless loop: after the slide animation finishes on a cloned edge,
  // jump to the matching real slide instantly (content is identical).
  React.useEffect(() => {
    if (trackIndex !== TRACK_LAST && trackIndex !== 0) return;
    const t = setTimeout(() => {
      transitionRef.current = false;
      setTrackIndex(trackIndex === TRACK_LAST ? TRACK_OFFSET : TRACK_LAST - 1);
      requestAnimationFrame(() => requestAnimationFrame(() => { transitionRef.current = true; }));
    }, SLIDE_TRANSITION);
    return () => clearTimeout(t);
  }, [trackIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        step(1);
      } else {
        step(-1);
      }
    }
  };

  return (
    <section className="w-full bg-white pt-2">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative h-[380px] w-full overflow-hidden sm:h-[420px] lg:h-[520px]"
        >
          <div
            className="flex h-full w-full will-change-transform"
            style={{
              transform: `translate3d(${-(trackIndex * width)}px, 0, 0)`,
              transition: transitionRef.current
                ? `transform ${SLIDE_TRANSITION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
          >
            {track.map((s, i) => (
              <div key={`${s.id}-${i}`} className="relative h-full w-full shrink-0 overflow-hidden">
                <Image src={s.img} alt={s.title} fill unoptimized sizes="100vw" priority={i === TRACK_OFFSET} className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full px-6 py-8 sm:px-10 lg:px-14 xl:px-20 2xl:px-24">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      {s.id === "s4" ? <Truck size={13} /> : <MagicStar size={13} />} {t(s.tag)}
                    </span>
                    <h2 className="mt-4 max-w-xl whitespace-pre-line text-balance text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">{t(s.title)}</h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:max-w-lg sm:text-base">{t(s.sub)}</p>
                    <div className="mt-7">
                      <Link href={s.href}>
                        <Button size="lg" variant="secondary">{t(s.cta)} {isRTL() ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => moveTo(i + TRACK_OFFSET)} aria-label={t("promo.goToSlide", { n: String(i + 1) })} className={cn("h-2 rounded-full transition-all", i === activeSlide ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40")} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => step(-1)} aria-label={t("promo.prev")} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary shadow-soft transition-colors hover:bg-lightgreen"><ArrowLeft2 size={18} /></button>
            <button onClick={() => step(1)} aria-label={t("promo.next")} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary shadow-soft transition-colors hover:bg-lightgreen"><ArrowRight2 size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
