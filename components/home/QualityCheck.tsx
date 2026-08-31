"use client";
import Image from "next/image";
import { Tree, Verify, Scan, TickCircle } from "iconsax-react";
import { useLanguage } from "@/stores/language";
import { SectionHeader, fluidPad } from "./SectionShell";

const checks = [
  ["qc.freshness", "8/10 · 9:15 AM"],
  ["qc.appearance", "Pass · 9:16 AM"],
  ["qc.weight", "410 g · 9:18 AM"],
  ["qc.packaging", "Sealed · 10:30 AM"],
  ["qc.temperature", "6°C · in range"],
];

const pillars = [
  { t: "qc.farmVerified", d: "qc.p1D", Icon: Tree },
  { t: "qc.qualityChecked", d: "qc.p2D", Icon: Verify },
  { t: "qc.traceable", d: "qc.p3D", Icon: Scan },
  { t: "qc.naturallyGrown", d: "qc.p4D", Icon: Tree },
];

export function QualityCheck() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className={fluidPad}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={t("qc.badge")}
              title={<>{t("qc.title")}<span className="text-secondary">{t("qc.title2")}</span></>}
              subtitle={t("qc.subtitle")}
              align="left"
            />
            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.t} className="flex items-start gap-3 rounded-2xl border border-border bg-bg p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lightgreen text-primary"><p.Icon size={19} /></span>
                  <div><p className="text-sm font-bold text-ink">{t(p.t)}</p><p className="text-xs text-muted">{t(p.d)}</p></div>
                </div>
              ))}
            </div>
            <p className="max-w-md text-sm text-muted">{t("qc.disclaimer")}</p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-lightgreen/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lightgreen/70" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                    <Image src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=200&q=60" alt="Butterhead lettuce" fill unoptimized sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-ink">Butterhead Lettuce</p>
                    <p className="text-xs text-muted">Green Valley Farm · Al Ain, UAE</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-secondary">Batch FR-2401</p>
                  </div>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white"><Scan size={22} /></span>
              </div>

              <div className="mt-6 space-y-2.5">
                {checks.map(([c, v]) => (
                  <div key={c} className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3">
                    <span className="flex items-center gap-2.5 text-sm font-semibold text-ink"><TickCircle size={17} className="text-secondary" /> {t(c)}</span>
                    <span className="text-xs font-medium text-muted">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-primary px-5 py-4 text-white">
                <span className="text-sm font-bold uppercase tracking-[0.2em]">{t("qc.verified")}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">{t("qc.passed")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}