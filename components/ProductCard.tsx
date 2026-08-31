"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Add, Eye, Tree, Star, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useMemo, useRef, useState } from "react";
import { Product } from "@/data/interface";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { StarRating } from "./ui/star";
import { Badge } from "./ui/badge";
import { formatAED } from "@/lib/format";
import { useLanguage } from "@/stores/language";

export function ProductCard({ product, quickView, bestSeller = false }: { product: Product; quickView?: (p: Product) => void; bestSeller?: boolean }) {
  const { t } = useLanguage();
  const add = useCart((s) => s.add);
  const wish = useWishlist((s) => s.items);
  const toggle = useWishlist((s) => s.toggle);
  const isWished = wish.includes(product.id);
  const outOfStock = product.stock === "Out of Stock";

  const images = useMemo(() => (product.images?.length ? product.images : [product.image]), [product]);
  const [idx, setIdx] = useState(0);

  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    startY.current = e.clientY;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (startX.current == null || startY.current == null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) setIdx((i) => Math.min(i + 1, images.length - 1));
      else setIdx((i) => Math.max(i - 1, 0));
    }
    startX.current = null;
    startY.current = null;
  }

  const freshnessBadge =
    product.harvestDate === "Today"
      ? { tone: "green" as const, label: t("card.harvestedToday") }
      : product.badges.includes("New Arrival")
        ? { tone: "orange" as const, label: t("card.newArrival") }
        : { tone: "green" as const, label: t("card.farmFresh") };

  const harvestText = product.harvestDate === "Today" ? t("card.harvestedToday") : t("card.harvestedThisWeek");
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-soft transition-shadow hover:shadow-card sm:rounded-2xl"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-bg sm:aspect-[4/3]" dir="ltr">
        <div
          className="flex h-full w-full touch-pan-y select-none transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {images.map((src, i) => (
            <Link
              key={i}
              href={`/product/${product.id}`}
              className="relative h-full w-full shrink-0 overflow-hidden"
              draggable={false}
            >
              <Image
                src={src}
                alt={`${product.name} ${i + 1}`}
                fill
                unoptimized
                draggable={false}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 46vw, (max-width: 1280px) 25vw, 16vw"
              />
            </Link>
          ))}
        </div>

        {bestSeller && (
          <span className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-md bg-amber-400/95 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm sm:text-xs sm:px-2.5 sm:py-1">
            <Star size={8} variant="Bold" className="sm:size-3" /> {t("card.bestSeller")}
          </span>
        )}
        {!bestSeller && <Badge className="absolute start-2 top-2 text-[9px] px-1.5 py-0.5 sm:text-xs sm:px-2.5 sm:py-1" tone={freshnessBadge.tone}>{freshnessBadge.label}</Badge>}
        {hasDiscount && (
          <span className="absolute bottom-2 start-2 rounded-md bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm sm:text-xs sm:px-2.5 sm:py-1">
            -{discountPct}% OFF
          </span>
        )}
        {outOfStock && (
          <div className="grid absolute inset-0 place-items-center bg-white/70">
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-medium text-white sm:px-3 sm:py-1 sm:text-xs">{t("card.outOfStock")}</span>
          </div>
        )}

        <button
          onClick={() => toggle(product.id)}
          className="absolute end-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-red-500 shadow-sm transition-transform hover:scale-110 sm:h-9 sm:w-9"
          aria-label={isWished ? t("card.removeFromWishlist") : t("card.addToWishlist")}
        >
          <Heart size={16} variant={isWished ? "Bold" : "Linear"} />
        </button>

        {images.length > 1 && (
          <>
            {idx > 0 && (
              <button
                onClick={() => setIdx(idx - 1)}
                className="absolute start-2 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/85 p-1.5 text-ink shadow-sm transition-colors hover:bg-white group-hover:grid"
                aria-label="Previous image"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  startX.current = null;
                  startY.current = null;
                }}
              >
                <ArrowLeft2 size={16} />
              </button>
            )}
            {idx < images.length - 1 && (
              <button
                onClick={() => setIdx(idx + 1)}
                className="absolute end-2 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/85 p-1.5 text-ink shadow-sm transition-colors hover:bg-white group-hover:grid"
                aria-label="Next image"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  startX.current = null;
                  startY.current = null;
                }}
              >
                <ArrowRight2 size={16} />
              </button>
            )}
          </>
        )}

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-1.5 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-primary" : "w-1.5 bg-black/30"}`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  startX.current = null;
                  startY.current = null;
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <p className="truncate text-[10px] text-muted sm:text-xs">
          {product.farm} · <span className="text-ink/70">{product.location.replace(", UAE", "")}</span>
        </p>
        <Link href={`/product/${product.id}`} className="mt-0.5 leading-snug">
          <h3 className="line-clamp-2 text-[13px] font-semibold text-ink transition-colors group-hover:text-primary sm:text-[15px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1">
          <StarRating rating={product.rating} size={10} />
          <span className="text-[11px] font-medium text-ink sm:text-xs">{product.rating}</span>
          <span className="text-[10px] text-muted sm:text-[11px]">({product.reviews})</span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
          <p className="text-sm font-bold leading-none text-ink sm:text-lg">{formatAED(product.price)}</p>
          {hasDiscount && (
            <p className="text-[10px] text-muted line-through sm:text-xs">{formatAED(product.compareAtPrice!)}</p>
          )}
          <p className="text-[10px] font-normal text-muted sm:text-xs">/ {product.unit}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="flex min-w-0 items-center gap-1 text-[10px] font-medium text-secondary sm:text-[11px]">
            <Tree size={11} className="shrink-0" /> <span className="truncate">{harvestText}</span>
          </p>
          {!outOfStock && (
            <button
              onClick={() => add(product.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center gap-1 rounded-full bg-primary text-white shadow-sm transition-colors hover:bg-primary-light sm:h-auto sm:w-auto sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs"
              aria-label={t("card.addToCart", { name: product.name })}
            >
              <Add size={15} /> <span className="hidden sm:inline">{t("card.quickAdd")}</span>
            </button>
          )}
        </div>

        {quickView && (
          <button
            onClick={() => quickView(product)}
            className="mt-2 flex h-8 items-center justify-center gap-1.5 rounded-xl border border-border text-xs font-medium text-primary transition-colors hover:bg-lightgreen sm:h-9"
            aria-label={t("card.quickView", { name: product.name })}
          >
            <Eye size={15} /> {t("card.quickView")}
          </button>
        )}
      </div>
    </motion.div>
  );
}
