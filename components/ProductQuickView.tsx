"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Add, ArrowRight, ArrowLeft, CloseCircle } from "iconsax-react";
import { Product } from "@/data/interface";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { StarRating } from "./ui/star";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatAED } from "@/lib/format";
import { useLanguage } from "@/stores/language";

export function ProductQuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { t, isRTL } = useLanguage();
  const add = useCart((s) => s.add);
  const wish = useWishlist((s) => s.items);
  const toggle = useWishlist((s) => s.toggle);
  const isWished = product ? wish.includes(product.id) : false;

  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-primary/40 p-4 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="grid w-full max-w-2xl gap-5 overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:grid-cols-2"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative h-56 sm:h-full">
              <Image src={product.image} alt={product.name} fill unoptimized sizes="(max-width:640px) 100vw, 384px" className="object-cover" />
              <button onClick={onClose} className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm hover:bg-white" aria-label={t("qv.close")}><CloseCircle size={18} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2"><StarRating rating={product.rating} /><span className="text-sm text-muted">{t("product.ratingReviews", { r: product.rating, c: product.reviews })}</span></div>
              <h3 className="mt-1 text-2xl font-bold text-ink">{product.name}</h3>
              <p className="text-sm text-muted">{t("qv.byFarm", { farm: product.farm, location: product.location })}</p>
              <div className="mt-3"><span className="text-2xl font-bold text-ink">{formatAED(product.price)}</span><span className="text-muted"> / {product.unit}</span></div>
              <div className="mt-3 flex flex-wrap gap-1.5">{product.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
              <p className="mt-3 line-clamp-3 text-sm text-muted">{product.description}</p>
              <div className="mt-5 flex gap-2">
                <Button onClick={() => add(product.id)} className="flex-1"><Add size={16} /> {t("wish.addToCart")}</Button>
                <Button variant="outline" size="icon" onClick={() => toggle(product.id)} aria-label={t("product.wishlist")}><Heart size={18} variant={isWished ? "Bold" : "Linear"} /></Button>
              </div>
              <Link href={`/product/${product.id}`} onClick={onClose} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">{t("qv.viewFullDetails")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
