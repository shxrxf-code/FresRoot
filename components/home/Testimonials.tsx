"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { QuoteDown, Star, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useLanguage } from "@/stores/language";
import { SectionHeader, fluidPad } from "./SectionShell";
import { cn } from "@/components/ui-utils";

const testimonials = [
  {
    quote: "The produce feels genuinely fresh, and being able to see exactly which farm it came from makes a huge difference. It tastes like home-grown.",
    name: "Amina Al Mansour",
    area: "Dubai",
    initials: "AM",
  },
  {
    quote: "I ordered in the morning and it was at my door by evening. The quality check record built real trust — you can see it all.",
    name: "Priya Nair",
    area: "Abu Dhabi",
    initials: "PN",
  },
  {
    quote: "The subscription box keeps my family eating healthy without thinking about it. Skip, swap, pause — it all just works.",
    name: "Omar Haddad",
    area: "Sharjah",
    initials: "OH",
  },
  {
    quote: "Green Points turned our weekly shop into something we look forward to. The rewards are worth real money off.",
    name: "Sarah Wilson",
    area: "Dubai",
    initials: "SW",
  },
];

export function Testimonials() {
  const [idx, setIdx] = React.useState(0);
  const { t } = useLanguage();
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className={fluidPad}>
        <SectionHeader
          eyebrow={t("test.badge")}
          title={<>{t("test.title")}<span className="text-secondary">{t("test.title2")}</span></>}
          subtitle={t("test.subtitle")}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -top-8 left-0 text-[120px] leading-none text-secondary/15"><QuoteDown size={110} /></div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-bg px-6 py-12 shadow-soft sm:px-14">
            <motion.div key={idx} initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="mb-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} variant="Bold" size={18} className="fill-amber-400 text-amber-400" />)}
              </div>
              <blockquote className="text-balance text-lg font-medium leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">"{testimonials[idx].quote}"</blockquote>
              <div className="mt-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-sm font-bold text-white">{testimonials[idx].initials}</span>
                <div>
                  <p className="font-bold text-ink">{testimonials[idx].name}</p>
                  <p className="text-sm text-muted">{testimonials[idx].area}, UAE</p>
                </div>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-lightgreen px-3 py-1.5 text-xs font-semibold text-primary sm:inline-flex">{t("test.verifiedCustomer")}</span>
              </div>
            </motion.div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} aria-label={`${i + 1}`} className={cn("h-2.5 rounded-full transition-all", i === idx ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/40")} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prev} aria-label={t("pagination.previous")} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-lightgreen"><ArrowLeft2 size={19} /></button>
                <button onClick={next} aria-label={t("pagination.next")} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-lightgreen"><ArrowRight2 size={19} /></button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted">{t("test.note")}</p>
        </div>
      </div>
    </section>
  );
}