"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Tree, Truck, ShieldTick, Verify } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/stores/language";
import { fluidPad } from "./SectionShell";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

const trust = [
  { title: "hero.farmVerified", sub: "hero.trustedFarms", Icon: ShieldTick },
  { title: "hero.qualityChecked", sub: "hero.everyTime", Icon: Verify },
  { title: "hero.freshlyHarvested", sub: "hero.daily", Icon: Tree },
  { title: "hero.doorstep", sub: "hero.acrossUAE", Icon: Truck },
];

export function Hero() {
  const { t, isRTL } = useLanguage();
  return (
    <section className={fluidPad}>
      <div className="grid gap-12 pb-16 pt-10 md:pb-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-14">
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-secondary/25 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            {t("hero.badge")}
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show" className="text-balance text-[38px] font-extrabold leading-[1.04] tracking-tight text-primary sm:text-[46px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px]">
            {t("hero.title1")}
            <br />
            <span className="text-secondary">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t("hero.sub")}
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">{t("hero.shopFresh")} {isRTL() ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</Button></Link>
            <Link href="/farms" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">{t("hero.exploreFarms")}</Button></Link>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4 lg:gap-x-5 lg:border-t lg:border-border lg:pt-8">
            {trust.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lightgreen text-primary"><item.Icon size={20} /></span>
                <div>
                  <p className="text-sm font-bold text-ink">{t(item.title)}</p>
                  <p className="text-xs text-muted">{t(item.sub)}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="relative">
          <div className="absolute -right-16 -top-12 h-72 w-72 rounded-[58%_42%_50%_50%/52%_46%_54%_48%] bg-secondary/15 blur-xl" />
          <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-[50%_50%_44%_56%/45%_55%_45%_55%] bg-primary/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] shadow-card">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px] xl:h-[600px] 2xl:h-[680px]">
              <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80" alt="Farm-fresh produce — lettuce, tomatoes, broccoli, cucumbers and herbs" fill priority unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
          </div>

          <motion.div animate={{ y: [0, -9, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl border border-border bg-white p-3 pr-5 shadow-card sm:left-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-lightgreen text-primary"><Tree size={22} /></span>
            <div>
              <p className="text-sm font-bold">{t("hero.naturallyGrown")}</p>
              <p className="text-xs text-muted">{t("hero.farmsCount")}</p>
            </div>
          </motion.div>

          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute -right-2 top-8 flex items-center gap-3 rounded-2xl border border-border bg-white p-3 pr-5 shadow-card sm:right-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-accent"><Truck size={22} /></span>
            <div>
              <p className="text-sm font-bold">{t("hero.sameDay")}</p>
              <p className="text-xs text-muted">{t("hero.freeAbove")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}