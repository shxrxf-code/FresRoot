"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldTick, Star } from "iconsax-react";
import { farms } from "@/data/mock";
import { useLanguage } from "@/stores/language";
import { SectionHeader, fluidPad } from "./SectionShell";

export function FarmDiscovery() {
  const { t, isRTL } = useLanguage();
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className={fluidPad}>
        <SectionHeader
          eyebrow={t("farms.eyebrow")}
          title={<>{t("farms.title")}<span className="text-secondary">{t("farms.title2")}</span></>}
          subtitle={t("farms.subtitle")}
          action={<Link href="/farms" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("farms.all")} {isRTL() ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</Link>}
        />

        <div className="flex snap-x gap-5 overflow-x-auto pb-3 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
          {farms.map((f) => (
            <article key={f.id} className="group w-[84%] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition-shadow hover:shadow-card sm:w-[60%] md:w-auto">
              <Link href={`/farms/${f.id}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={f.image} alt={f.name} fill unoptimized sizes="(max-width:768px) 84vw, (max-width:1280px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm"><ShieldTick size={14} className="text-secondary" /> {t("farms.verified")}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">{f.farmingMethod}</span>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-bold text-white">{f.name}</h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/85"><span>📍</span> {f.location}, UAE</p>
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted">{f.bio}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div><p className="font-bold text-ink">{f.products}</p><p className="text-xs text-muted">{t("farms.products")}</p></div>
                    <div><p className="flex items-center gap-1 font-bold text-ink"><Star size={13} variant="Bold" className="fill-amber-400 text-amber-400" /> {f.rating}</p><p className="text-xs text-muted">{t("farms.reviews", { count: String(f.reviews) })}</p></div>
                  </div>
                  <Link href={`/farms/${f.id}`} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light">
                    {t("farms.explore")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}