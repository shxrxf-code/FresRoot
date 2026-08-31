"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, TickCircle } from "iconsax-react";
import { subscriptionPlans } from "@/data/mock";
import { formatAED } from "@/lib/format";
import { useLanguage } from "@/stores/language";
import { SectionHeader, fluidPad } from "./SectionShell";

export function SubscriptionSection() {
  const { t, isRTL } = useLanguage();
  return (
    <section className="bg-bg py-16 lg:py-24">
      <div className={fluidPad}>
        <SectionHeader
          eyebrow={t("sub.eyebrow")}
          title={<>{t("sub.title")}<span className="text-secondary">{t("sub.title2")}</span></>}
          subtitle={t("sub.subtitle")}
          action={<Link href="/subscriptions" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("sub.manage")} {isRTL() ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</Link>}
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {subscriptionPlans.map((p, i) => (
            <Link key={p.id} href="/subscriptions" className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.img} alt={p.name} fill unoptimized sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">{p.save}</span>
                <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white">{p.name}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <ul className="space-y-1.5">
                  {p.items.slice(0, 4).map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-muted"><TickCircle size={15} className="shrink-0 text-secondary" /> {it}</li>
                  ))}
                  {p.items.length > 4 && <li className="flex items-center gap-2 text-sm font-medium text-primary">+ {t("sub.moreItems", { n: String(p.items.length - 4) })}</li>}
                </ul>
                <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-2xl font-extrabold text-ink">{formatAED(p.price)}</p>
                    <p className="text-xs text-muted">{t("sub.per", { per: p.per, day: p.deliveryDay })}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-transform group-hover:translate-x-0.5">{t("sub.choose")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}