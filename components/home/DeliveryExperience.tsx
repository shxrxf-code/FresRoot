"use client";
import { motion } from "framer-motion";
import { Truck, Location } from "iconsax-react";
import { useLanguage } from "@/stores/language";
import { fluidPad } from "./SectionShell";

const cities = [
  ["Abu Dhabi", 300, 206],
  ["Dubai", 466, 158],
  ["Sharjah", 500, 136],
  ["Ajman", 518, 122],
  ["Al Ain", 546, 278],
  ["Ras Al Khaimah", 564, 84],
] as const;

const steps = [
  { t: "delivery.orderPlaced", d: "Yesterday · 6:40 PM", done: true },
  { t: "delivery.harvested", d: "Today · 7:30 AM", done: true },
  { t: "delivery.qualityChecked", d: "Today · 9:15 AM", done: true },
  { t: "delivery.outForDelivery", d: "Today · 2:30 PM", done: true },
  { t: "delivery.estimated", d: "Today · 5:00 PM – 8:00 PM", done: false },
];

export function DeliveryExperience() {
  const { t, isRTL } = useLanguage();
  const [startX, startY] = isRTL() ? [470, 168] : [296, 220];
  const [endX, endY] = isRTL() ? [296, 220] : [470, 168];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className={fluidPad}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"><Truck size={13} /> {t("delivery.badge")}</span>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl xl:text-[44px] xl:leading-[1.1]">{t("delivery.title")}</h2>
            <p className="mt-4 max-w-xl text-muted sm:text-lg">
              {t("delivery.subtitle")}
            </p>

            <div className="mt-8 rounded-3xl border border-border bg-bg p-5 shadow-soft sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your order · FRESROOT #FR10248</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink">Dubai Marina, Dubai</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold text-primary"><Location size={13} /> {t("delivery.live")}</span>
              </div>

              <ul className="mt-6 space-y-0">
                {steps.map((s, i) => (
                  <li key={s.t} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < steps.length - 1 && <span aria-hidden className="absolute left-[13px] top-7 bottom-0 w-px bg-border" />}
                    <span className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full ${s.done ? "bg-secondary text-primary" : "bg-amber-100 text-accent"}`}>
                      <Location size={13} />
                    </span>
                    <div>
                      <p className={`text-sm font-semibold ${s.done ? "text-ink" : "text-accent"}`}>{t(s.t)}</p>
                      <p className="text-xs text-muted">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-white px-4 py-3 text-xs leading-relaxed text-muted">{t("delivery.disclaimer")}</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-primary/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-[#0F3D21] p-4 shadow-card sm:p-8">
              <p className="mb-1 flex items-center gap-2 text-sm font-bold text-white">{t("delivery.allEmirates")}</p>
              <p className="mb-5 text-xs text-emerald-100/60">{t("delivery.mapNote")}</p>

              <svg viewBox="0 0 800 480" className="w-full" role="img" aria-label="Stylized map of the United Arab Emirates showing delivery cities">
                <defs>
                  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DCFCE7" />
                    <stop offset="100%" stopColor="#9FE8B8" />
                  </linearGradient>
                  <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#166534" />
                    <stop offset="100%" stopColor="#14532D" />
                  </linearGradient>
                </defs>

                <rect width="800" height="480" fill="url(#sea)" />

                <path
                  d="M 150 300 C 170 280, 180 255, 215 250 C 250 245, 245 222, 268 205 C 300 200, 322 172, 356 162 C 388 150, 402 130, 448 132 M 448 132 C 480 138, 492 116, 522 112 C 552 112, 556 92, 568 80 C 590 78, 596 120, 622 128 C 636 150, 634 176, 648 200 C 650 250, 648 300, 640 340 C 620 372, 600 398, 560 408 C 520 420, 480 430, 430 428 C 360 428, 300 420, 260 398 C 225 385, 195 360, 170 332 C 158 322, 148 312, 150 300 Z"
                  fill="url(#land)"
                  stroke="#0F3D21"
                  strokeWidth="2"
                />

                <motion.path
                  d={`M ${startX} ${startY} Q 380 200 ${endX} ${endY}`}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeDasharray="10 8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1, transition: { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.8 } }}
                />
                <circle cx={startX} cy={startY} r="7" fill="#22C55E" stroke="#0F3D21" strokeWidth="2.5" />
                <circle cx={endX} cy={endY} r="7" fill="#D6A85F" stroke="#0F3D21" strokeWidth="2.5" />

                {cities.map(([name, x, y]) => (
                  <g key={name}>
                    <circle cx={x} cy={y} r="5" fill="#fff" stroke="#F59E0B" strokeWidth="2.5" />
                    <text x={x} y={y - 12} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="700">{name}</text>
                    <text x={x} y={y + 18} textAnchor="middle" fill="#DCFCE7" fontSize="12">{name === "Dubai" ? t("delivery.eta") : t("delivery.covered")}</text>
                  </g>
                ))}

                <g transform="translate(240 300)">
                  <circle cx="0" cy="0" r="26" fill="rgba(22,101,52,0.55)" />
                  <text textAnchor="middle" y="6" fill="#fff" fontSize="26">🌿</text>
                  <text textAnchor="middle" y="46" fill="#DCFCE7" fontSize="15" fontWeight="600">{t("delivery.farms")}</text>
                </g>
              </svg>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-emerald-100/70">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" /> {t("delivery.farm")}</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D6A85F]" /> {t("delivery.yourDoor")}</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> {t("delivery.route")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}