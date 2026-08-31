"use client";
import Link from "next/link";
import { Mobile, Apple, Play } from "iconsax-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/stores/language";
import { fluidPad } from "./SectionShell";

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex w-[210px] shrink-0 flex-col items-center">
      <div className="w-full overflow-hidden rounded-[2.5rem] border-[7px] border-ink bg-white shadow-card">
        <div className="flex items-center justify-between bg-lightgreen px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            <span className="text-[11px] font-extrabold text-primary">FRESROOT</span>
          </div>
          <span className="text-[10px] font-semibold text-primary/70">AED {150 - 0}</span>
        </div>
        {children}
      </div>
      <p className="mt-3 text-xs font-semibold text-muted">{label}</p>
    </div>
  );
}

export function AppPreview() {
  const { t } = useLanguage();
  return (
    <section className="bg-lightgreen/60 py-16 lg:py-24">
      <div className={fluidPad}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft"><Mobile size={13} /> {t("app.badge")}</span>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl xl:text-[44px] xl:leading-[1.1]">{t("app.title")}</h2>
          <p className="mt-4 text-muted sm:text-lg">{t("app.subtitle")}</p>
        </div>

        <div className="mt-14 flex items-end justify-center gap-4 sm:gap-8">
          <motion.div initial={{ opacity: 0, y: 30, rotate: 6 }} whileInView={{ opacity: 1, y: 0, rotate: -5 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="hidden scale-90 md:block">
            <Phone label={t("app.shop")}>
              <div className="space-y-2.5 p-3">
                <div className="rounded-lg bg-primary px-3 py-2"><p className="text-[11px] font-bold text-white">{t("cat.shopByCategory")}</p></div>
                <div className="flex gap-1.5">
                  {["bg-secondary", "bg-amber-300", "bg-emerald-300", "bg-primary/40"].map((c) => <span key={c} className={`h-12 flex-1 rounded-lg ${c}`} />)}
                </div>
                <div className="flex gap-1.5">
                  <span className="h-20 flex-1 rounded-lg bg-bg border border-border" />
                  <span className="h-20 flex-1 rounded-lg bg-bg border border-border" />
                </div>
              </div>
            </Phone>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Phone label={t("app.home")}>
              <div className="space-y-2.5 p-3">
                <div className="rounded-lg bg-primary px-3 py-3">
                  <p className="text-[10px] text-secondary">{t("hero.title1")}</p>
                  <p className="text-[13px] font-extrabold text-white">{t("hero.title2")}</p>
                </div>
                <div className="flex gap-1.5">
                  {["bg-secondary", "bg-amber-300", "bg-emerald-300", "bg-primary/40", "bg-amber-200"].map((c) => <span key={c} className={`h-2.5 flex-1 rounded-full ${c}`} />)}
                </div>
                <div className="relative flex gap-1.5 overflow-hidden rounded-lg border border-border bg-white p-1.5">
                  <span className="h-16 w-12 rounded-md bg-green-200" />
                  <span className="h-16 flex-1 rounded-md bg-green-100" />
                  <button className="absolute bottom-1.5 right-1.5 rounded-md bg-secondary px-2 py-1 text-[9px] font-bold text-primary">+ ADD</button>
                </div>
                <div className="rounded-lg bg-lightgreen px-3 py-2 text-center text-[10px] font-bold text-primary">{t("sb.title")}</div>
              </div>
            </Phone>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30, rotate: -6 }} whileInView={{ opacity: 1, y: 0, rotate: 5 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="hidden scale-90 md:block">
            <Phone label={t("app.orderTracking")}>
              <div className="space-y-2.5 p-3">
                <div className="rounded-lg bg-ink px-3 py-2 text-center"><p className="text-[10px] font-bold text-white">Tracking · FR10248</p></div>
                <div className="rounded-lg bg-bg p-2.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="h-1.5 w-full rounded bg-secondary" />
                    <span className="h-1.5 w-2/3 rounded bg-secondary" />
                    <span className="h-1.5 w-1/3 rounded bg-amber-300" />
                  </div>
                  <p className="mt-2 text-center text-[9px] text-muted">Delivering today 5–8 PM</p>
                </div>
                <div className="rounded-lg bg-secondary px-3 py-2 text-center text-[10px] font-bold text-primary">📦 Out for delivery</div>
              </div>
            </Phone>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">{t("app.comingSoon")}</span>
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-colors hover:bg-lightgreen"><Apple size={17} /> {t("app.appStore")}</Link>
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-colors hover:bg-lightgreen"><Play size={17} /> {t("app.googlePlay")}</Link>
        </div>
      </div>
    </section>
  );
}