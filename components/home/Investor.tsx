"use client";
import { Tree, Repeat, Chart, Award, MagicStar } from "iconsax-react";
import { useLanguage } from "@/stores/language";
import { SectionHeader, fluidPad } from "./SectionShell";

const pillars = [
  { t: "inv.p1T", d: "inv.p1D", Icon: Tree },
  { t: "inv.p2T", d: "inv.p2D", Icon: Repeat },
  { t: "inv.p3T", d: "inv.p3D", Icon: MagicStar },
  { t: "inv.p4T", d: "inv.p4D", Icon: Chart },
  { t: "inv.p5T", d: "inv.p5D", Icon: Tree },
];

const streams = [
  ["inv.productMargins", 42, "#14532D"],
  ["inv.premiumProducts", 14, "#1d6a3d"],
  ["inv.subscriptionsStream", 18, "#22C55E"],
  ["inv.deliveryFees", 12, "#D6A85F"],
  ["inv.futureB2B", 14, "#F59E0B"],
] as const;

const phases = [
  { n: "Phase 1", t: "inv.ph1T", p: "Dubai · Abu Dhabi", f: "inv.ph1F", tag: "inv.tag1" },
  { n: "Phase 2", t: "inv.ph2T", p: "Sharjah · Ajman · Al Ain", f: "inv.ph2F", tag: "inv.tag2" },
  { n: "Phase 3", t: "inv.ph3T", p: "Full UAE coverage", f: "inv.ph3F", tag: "inv.tag2" },
  { n: "Phase 4", t: "inv.ph4T", p: "Gulf region · B2B supply", f: "inv.ph4F", tag: "inv.tag2" },
];

export function Investor() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className={fluidPad}>
        <SectionHeader eyebrow={t("inv.eyebrow")} title={<>{t("inv.title")}<span className="text-secondary">{t("inv.title2")}</span></>} subtitle={t("inv.subtitle")} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {pillars.map((p, i) => (
            <div key={p.t} className="group flex flex-col rounded-3xl border border-border bg-bg p-6 transition-all hover:-translate-y-1 hover:border-secondary/40 hover:shadow-card">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-lightgreen text-primary transition-colors group-hover:bg-primary group-hover:text-white"><p.Icon size={22} /></span>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-primary">{t("inv.pillar", { n: String(i + 1) })}</p>
              <p className="mb-2 font-bold text-ink">{t(p.t)}</p>
              <p className="text-sm leading-relaxed text-muted">{t(p.d)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-bg p-7 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("inv.businessModel")}</p>
            <h3 className="mt-1 text-2xl font-extrabold text-ink">{t("inv.howEarn")}</h3>

            <div className="mt-7 flex h-10 w-full overflow-hidden rounded-xl">
              {streams.map(([name, pct, color]) => <div key={name} className="relative" style={{ width: `${pct}%`, backgroundColor: color }} title={t(name)} />)}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {streams.map(([name, pct, color]) => (
                <span key={name} className="flex items-center gap-2 text-xs text-muted"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} /> {t(name)} · {pct}%</span>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-white px-4 py-3 text-xs leading-relaxed text-muted">{t("inv.revenueDisclaimer")}</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-ink p-7 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("inv.roadmap")}</p>
                <h3 className="mt-1 text-2xl font-extrabold text-white">{t("inv.fromDubai")}</h3>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-secondary"><Award size={20} /></span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {phases.map((ph) => (
                <div key={ph.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">{ph.n}</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-100/70">{t(ph.tag)}</span>
                  </div>
                  <p className="mt-2.5 font-bold text-white">{t(ph.t)}</p>
                  <p className="text-xs text-emerald-100/70">{ph.p}</p>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-100/50">{t(ph.f)}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-emerald-100/40">{t("inv.expansionDisclaimer")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}