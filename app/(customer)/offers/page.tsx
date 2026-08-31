"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, TickCircle, Tag, Ticket, InfoCircle } from "iconsax-react";
import { offers } from "@/data/mock";
import { couponRules } from "@/stores/cart";
import { useLanguage } from "@/stores/language";

const toneStyles: Record<string, string> = {
  primary: "from-primary to-primary-light",
  sand: "from-[#B8863B] to-[#D6A85F]",
  green: "from-secondary to-emerald-600",
  white: "from-neutral-800 to-neutral-900",
};

export default function OffersPage() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const { t, isRTL } = useLanguage();

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="w-full px-4 pb-14 pt-5 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
      <div className="rounded-3xl bg-primary p-8 text-white sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-emerald-100/80">{t("offers.title")}</p>
            <h1 className="mt-1 text-balance text-3xl font-extrabold sm:text-4xl">{t("offers.subtitle")}</h1>
            <p className="mt-2 max-w-lg text-emerald-100/80">{t("offers.desc")}</p>
          </div>
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10"><Ticket size={32} className="text-secondary" /></span>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o, i) => {
          const rule = couponRules.find((r) => r.code === o.code);
          return (
            <motion.div key={o.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <div className={`relative bg-gradient-to-br ${toneStyles[o.tone] ?? toneStyles.primary} p-6 text-white`}>
                <div className="absolute -end-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition-transform group-hover:scale-125" />
                <span className="text-3xl">{o.icon}</span>
                <h3 className="mt-2 text-xl font-bold">{o.title}</h3>
                <p className="mt-1 text-xs text-white/80">{o.desc}</p>
                <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold">{o.min}</span>
              </div>
              <div className="p-5">
                <button onClick={() => copy(o.code)} className="flex w-full items-center justify-between rounded-xl border-2 border-dashed border-primary/30 bg-lightgreen/40 px-4 py-3 transition-colors hover:border-primary">
                  <span className="font-mono text-lg font-extrabold tracking-[0.18em] text-primary">{o.code}</span>
                  {copied === o.code ? <TickCircle size={18} className="text-secondary" /> : <Copy size={17} className="text-muted" />}
                </button>
                {rule && <p className="mt-3 flex items-start gap-1.5 text-xs text-muted"><InfoCircle size={13} className="mt-0.5 shrink-0 text-primary" /> {t("offers.minOrder", { n: String(rule.minOrder) })}{rule.code === "WELCOME20" ? t("offers.upTo50") : rule.code === "FREESHIP" ? t("offers.waived") : ""}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-white p-7 shadow-soft lg:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink"><Tag size={18} className="text-primary" /> {t("offers.howTo")}</h2>
          <ol className="mt-3 space-y-2.5 text-sm text-muted">
            {[t("offers.step1"), t("offers.step2"), t("offers.step3"), t("offers.step4"), t("offers.step5")].map((s, i) => (
              <li key={i} className="flex items-start gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lightgreen text-xs font-bold text-primary">{i + 1}</span>{s}</li>
            ))}
          </ol>
        </div>
        <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
          <Image src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&q=60" alt={t("offers.altGreens")} fill unoptimized sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
          <div className="absolute bottom-5 start-5 end-5 text-white">
            <p className="font-bold">{t("offers.cta")}</p>
            <Link href="/shop" className="text-sm text-secondary underline-offset-4 hover:underline">{t("offers.shopCollection")} <span aria-hidden>{isRTL() ? "←" : "→"}</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}