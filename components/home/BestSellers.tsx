"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft2, ArrowRight2, ArrowLeft, ArrowRight, Medal } from "iconsax-react";
import { products } from "@/data/mock";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/stores/language";

const BEST_SELLER_IDS = ["p1", "p7", "p12", "p3", "p2", "p4"];

export function BestSellers() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();
  const items = BEST_SELLER_IDS.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <section className="bg-white">
      <div className="w-full px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:mb-6">
          <div className="max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary sm:mb-2.5 sm:px-3.5 sm:py-1.5 sm:text-xs">
              <Medal size={12} className="text-accent" />
              {t("bestSellers.badge")}
            </span>
            <h2 className="text-balance text-xl font-extrabold tracking-tight text-primary sm:text-3xl xl:text-[34px] xl:leading-[1.15]">
              {t("bestSellers.title")}
              <span className="text-secondary">{t("bestSellers.title2")}</span>
            </h2>
            <p className="mt-1.5 text-[13px] text-muted sm:mt-2 sm:text-base">{t("bestSellers.subtitle")}</p>
          </div>

          <div className="flex min-w-0 items-center gap-2.5">
            <button
              onClick={() => scrollBy(-1)}
              aria-label={t("bestSellers.scrollLeft")}
              className="hidden h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary shadow-soft transition-colors hover:bg-lightgreen sm:grid"
            >
              <ArrowLeft2 size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label={t("bestSellers.scrollRight")}
              className="hidden h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary shadow-soft transition-colors hover:bg-lightgreen sm:grid"
            >
              <ArrowRight2 size={18} />
            </button>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline lg:inline-flex"
            >
              {t("bestSellers.viewAll")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
            </Link>
          </div>
        </div>

        <motion.div
          ref={scrollRef}
          className="-mx-0.5 flex snap-x gap-3 overflow-x-auto px-0.5 pb-3 no-scrollbar sm:gap-5"
        >
          {items.map((p, i) => (
            <div key={p.id} className="w-[47%] shrink-0 snap-start sm:w-[31%] md:w-[24%] lg:w-[20.5%] xl:w-[16.6%] 2xl:w-[14.2%]">
              <ProductCard product={p} bestSeller={i < 3} />
            </div>
          ))}
        </motion.div>

        <Link
          href="/shop"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline sm:mt-5 lg:hidden"
        >
          {t("bestSellers.viewAll")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
        </Link>
      </div>
    </section>
  );
}
