"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft2, ArrowRight2, ArrowLeft, ArrowRight } from "iconsax-react";
import { products } from "@/data/mock";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/components/ui-utils";
import { useLanguage } from "@/stores/language";

export function Rail({
  eyebrow,
  title,
  subtitle,
  ids,
  viewAllHref = "/shop",
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  ids: string[];
  viewAllHref?: string;
  children?: React.ReactNode;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();
  const items = ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-2xl">
            {eyebrow && <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>}
            <h2 className="text-balance text-2xl font-extrabold tracking-tight text-primary sm:text-3xl xl:text-[34px] xl:leading-[1.15]">{title}</h2>
            {subtitle && <p className="mt-2 text-muted sm:text-base">{subtitle}</p>}
          </div>
          <div className="flex min-w-0 max-w-full items-center gap-2.5">
            <div className="min-w-0 max-w-full flex-1 overflow-x-auto no-scrollbar">{children}</div>
            <button onClick={() => scrollBy(-1)} aria-label={t("rail.scrollLeft")} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary shadow-soft transition-colors hover:bg-lightgreen"><ArrowLeft2 size={18} /></button>
            <button onClick={() => scrollBy(1)} aria-label={t("rail.scrollRight")} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary shadow-soft transition-colors hover:bg-lightgreen"><ArrowRight2 size={18} /></button>
            <Link href={viewAllHref} className="hidden items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline lg:inline-flex">{t("rail.viewAll")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
          </div>
        </div>

        <motion.div ref={scrollRef} className="flex snap-x gap-4 overflow-x-auto pb-3 no-scrollbar sm:gap-5">
          {items.map((p) => (
            <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[24%] lg:w-[20.5%] xl:w-[16.6%] 2xl:w-[14.2%]">
              <ProductCard product={p} />
            </div>
          ))}
        </motion.div>

        <Link href={viewAllHref} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline lg:hidden">{t("rail.viewAll")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
      </div>
    </section>
  );
}