"use client";
import { Coin, ShoppingBag, Star, Gift, People, Repeat, ArrowRight2 } from "iconsax-react";
import { useLanguage } from "@/stores/language";
import { fluidPad } from "./SectionShell";

const earn = [
  { t: "gp.orders", d: "gp.ordersDesc", Icon: ShoppingBag },
  { t: "gp.reviewsItem", d: "gp.reviewsDesc", Icon: Star },
  { t: "gp.referrals", d: "gp.referralsDesc", Icon: People },
  { t: "gp.subscriptionsItem", d: "gp.subscriptionsDesc", Icon: Gift },
  { t: "gp.reusable", d: "gp.reusableDesc", Icon: Repeat },
];

const tiers = [
  ["500", "25"],
  ["1,000", "60"],
  ["2,000", "150"],
] as const;

export function GreenPoints() {
  const points = 1240;
  const max = 2000;
  const { t } = useLanguage();
  return (
    <section className="bg-bg py-16 lg:py-24">
      <div className={fluidPad}>
        <div className="overflow-hidden rounded-3xl bg-primary shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 px-6 py-6 sm:px-10">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><Coin size={24} /></span>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{t("gp.title")}</h2>
                <p className="text-sm text-emerald-100/70">{t("gp.eyebrow")}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-secondary">{points.toLocaleString()}</p>
              <p className="text-xs text-emerald-100/70">{t("gp.pointsOutOf", { max: max.toLocaleString() })}</p>
            </div>
          </div>

          <div className="px-6 pt-6 sm:px-10">
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-secondary to-[#A3E635]" style={{ width: `${(points / max) * 100}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-emerald-100/60">
              <span>0</span><span className="text-secondary">{points.toLocaleString()}</span><span>{max.toLocaleString("en-US", { style: "currency", currency: "AED", maximumFractionDigits: 0 })} {t("gp.pointsLabel", { value: "" })}</span>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-100/70">{t("gp.waysToEarn")}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {earn.map((e) => (
                  <div key={e.t} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-secondary"><e.Icon size={18} /></span>
                    <div><p className="text-sm font-bold text-white">{t(e.t)}</p><p className="text-xs text-emerald-100/60">{t(e.d)}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-100/70">{t("gp.rewardTiers")}</p>
              <div className="space-y-3">
                {tiers.map(([pts, val], i) => {
                  const reached = points >= Number(pts.replace(",", ""));
                  return (
                    <div key={pts} className={`flex items-center justify-between rounded-2xl px-4 py-3.5 ${reached ? "bg-secondary" : "bg-white/5"}`}>
                      <div className="flex items-center gap-3">
                        <span className={`grid h-9 w-9 place-items-center rounded-xl ${reached ? "bg-primary text-white" : "bg-white/10 text-secondary"}`}><Coin size={17} /></span>
                        <div>
                          <p className={`text-sm font-bold ${reached ? "text-primary" : "text-white"}`}>{t("gp.pointsLabel", { value: pts })}</p>
                          <p className={`text-xs ${reached ? "text-primary/70" : "text-emerald-100/60"}`}>{reached ? t("gp.unlocked") : t("gp.goal")}</p>
                        </div>
                      </div>
                      <span className={`font-extrabold ${reached ? "text-primary" : "text-white"}`}>AED {val}</span>
                    </div>
                  );
                })}
                <button className="inline-flex items-center gap-1 text-sm font-semibold text-secondary underline-offset-4 hover:underline">{t("gp.howPointsWork")} <ArrowRight2 size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}