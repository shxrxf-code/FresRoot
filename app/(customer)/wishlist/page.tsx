"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash, ShoppingBag, ArrowLeft, ArrowRight } from "iconsax-react";
import { useWishlist } from "@/stores/wishlist";
import { useCart } from "@/stores/cart";
import { useLanguage } from "@/stores/language";
import { products } from "@/data/mock";
import { EmptyState } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star";

export default function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const remove = useWishlist((s) => s.remove);
  const add = useCart((s) => s.add);
  const { t, isRTL } = useLanguage();
  const wished = products.filter((p) => items.includes(p.id));

  return (
    <div className="w-full px-4 pb-14 pt-6 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{t("wish.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("wish.subtitle", { n: wished.length })}</p>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("wish.continueShopping")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
      </div>

      {wished.length === 0 ? (
        <EmptyState icon={<Heart size={30} />} title={t("wish.empty")} description={t("wish.emptyHint")} action={<Link href="/shop"><Button>{t("wish.browseShop")}</Button></Link>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1.8fr] gap-4 border-b border-border bg-bg px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted md:grid">
            <span>{t("wish.product")}</span>
            <span>{t("wish.farm")}</span>
            <span>{t("wish.price")}</span>
            <span>{t("wish.availability")}</span>
            <span className="text-end">{t("wish.actions")}</span>
          </div>
          {wished.map((p) => {
            return (
              <div key={p.id} className="grid grid-cols-[64px_1fr] items-center gap-4 border-b border-border px-4 py-4 transition-colors last:border-0 hover:bg-bg/50 md:grid-cols-[2fr_1fr_1fr_1fr_1.8fr] md:px-5">
                <Link href={`/product/${p.id}`} className="flex items-center gap-4">
                  <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={p.image} alt={p.name} fill unoptimized sizes="64px" className="object-cover" />
                  </span>
                  <span className="hidden min-w-0 md:block">
                    <span className="block truncate font-semibold text-ink hover:text-primary">{p.name}</span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted"><StarRating rating={p.rating} size={11} /> {p.rating} ({p.reviews})</span>
                  </span>
                </Link>
                <span className="hidden truncate text-sm text-muted md:block">{p.farm}</span>
                <span className="hidden text-sm font-bold text-ink md:block">AED {p.price}</span>
                <span className="hidden md:block">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.stock === "In Stock" ? "bg-secondary/15 text-secondary" : p.stock === "Low Stock" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                    {p.stock === "In Stock" ? "In Stock" : p.stock}
                  </span>
                </span>
                <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-end">
                  <span className="grid grid-cols-[1fr_auto] items-center gap-2 md:hidden">
                    <span className="truncate font-semibold text-ink">{p.name}</span>
                    <span className="font-bold text-primary">AED {p.price}</span>
                  </span>
                  <Button size="sm" variant="secondary" onClick={() => add(p.id)} className="w-full md:w-auto"><ShoppingBag size={15} /> {t("wish.addToCart")}</Button>
                  <button onClick={() => remove(p.id)} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50" aria-label={t("wish.removeAria", { name: p.name })}><Trash size={14} /> {t("wish.remove")}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}