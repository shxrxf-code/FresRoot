"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Add, Trash, ShoppingBag, ArrowRight, ArrowLeft, Tag, TickCircle, Heart, InfoCircle } from "iconsax-react";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useLanguage } from "@/stores/language";
import { products } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/skeleton";

export default function CartPage() {
  const { t, isRTL } = useLanguage();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const deliveryFee = useCart((s) => s.deliveryFee());
  const discount = useCart((s) => s.discount());
  const vat = useCart((s) => s.vat());
  const total = useCart((s) => s.total());
  const coupon = useCart((s) => s.coupon);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const removeCoupon = useCart((s) => s.removeCoupon);
  const wish = useWishlist((s) => s.items);
  const addWish = useWishlist((s) => s.toggle);
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [couponErr, setCouponErr] = React.useState<string | null>(null);

  const details = items.map((i) => ({ item: i, product: products.find((p) => p.id === i.productId)! })).filter((d) => d.product);

  const submitCoupon = () => {
    const res = applyCoupon(code);
    if (res === "ok") setCouponErr(null);
    else if (res === "invalid") setCouponErr(t("pagecart.invalidCode", { code }));
    else setCouponErr(t("pagecart.minNotMet", { subtotal: subtotal.toFixed(2) }));
  };

  const moveToWishlist = (id: string) => {
    if (!wish.includes(id)) addWish(id);
    remove(id);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">{t("pagecart.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("pagecart.subtitle", { n: String(items.length) })}</p>
        </div>
        <Link href="/shop" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("pagecart.continueShopping")}</Link>
      </div>
      {details.length === 0 ? (
        <div className="mt-8"><EmptyState icon={<ShoppingBag size={30} />} title={t("pagecart.empty")} description={t("pagecart.emptyHint")} action={<Link href="/shop"><Button>{t("pagecart.shopFresh")}</Button></Link>} /></div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {details.map(({ item, product }) => (
              <motion.div key={product.id} layout className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft">
                <Link href={`/product/${product.id}`}><Image src={product.image} alt={product.name} width={92} height={92} unoptimized className="rounded-xl object-cover" style={{ width: 92, height: 92 }} /></Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${product.id}`}><p className="font-semibold text-ink hover:text-primary">{product.name}</p></Link>
                      <p className="text-xs text-muted">{product.farm} · {product.location}</p>
                      <p className="mt-0.5 text-xs text-muted">{product.unit} · AED {product.price}</p>
                    </div>
                    <button onClick={() => remove(product.id)} className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-600" aria-label={t("pagecart.remove")}><Trash size={17} /></button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-white p-1">
                      <button onClick={() => setQty(product.id, item.qty - 1)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-primary/5" aria-label={t("cart.decrease")}><Minus size={14} /></button>
                      <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => setQty(product.id, item.qty + 1)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-primary/5" aria-label={t("cart.increase")}><Add size={14} /></button>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => moveToWishlist(product.id)} className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-red-500"><Heart size={14} /> {t("pagecart.moveToWishlist")}</button>
                      <span className="text-lg font-bold text-ink">AED {(product.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-border bg-white p-5 shadow-soft lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-bold text-ink">{t("pagecart.orderSummary")}</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-muted"><span>{t("pagecart.subtotal")}</span><span className="text-ink">AED {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted"><span>{t("pagecart.deliveryFee")}</span><span className="text-ink">{deliveryFee === 0 ? <span className="font-semibold text-secondary">{t("pagecart.free")}</span> : `AED ${deliveryFee.toFixed(2)}`}</span></div>
              {discount > 0 && <div className="flex justify-between font-medium text-secondary"><span>{t("pagecart.discount")}{coupon ? ` (${coupon})` : ""}</span><span>-AED {discount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-muted"><span>{t("pagecart.vat")}</span><span className="text-ink">AED {vat.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border pt-3 text-lg font-extrabold text-ink"><span>{t("pagecart.total")}</span><span>AED {total.toFixed(2)}</span></div>
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <div className="relative flex-1"><Tag size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted" /><input value={code} onChange={(e) => { setCode(e.target.value); setCouponErr(null); }} placeholder={t("pagecart.couponPlaceholder")} className="h-11 w-full rounded-xl border border-border bg-bg ps-9 pe-3 text-sm uppercase outline-none focus:border-primary focus:ring-2 focus:ring-ring" /></div>
                <Button onClick={submitCoupon} variant="outline" className="h-11 px-5">{t("pagecart.apply")}</Button>
              </div>
              <AnimatePresence>
                {coupon && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 flex items-center gap-1 text-xs font-medium text-secondary"><TickCircle size={14} /> {t("pagecart.couponApplied", { code: coupon })}</motion.p>}
                {couponErr && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-red-600">{couponErr}</motion.p>}
              </AnimatePresence>
              <div className="mt-3 flex items-start gap-1.5 text-[11px] text-muted"><InfoCircle size={13} className="mt-0.5 shrink-0" /> {t("pagecart.couponHint")}</div>
            </div>

            <p className={`mt-4 text-xs ${subtotal >= 150 ? "font-medium text-secondary" : "text-muted"}`}>{subtotal >= 150 ? t("pagecart.freeDeliveryUnlocked") : t("pagecart.addMoreForFree", { x: (150 - subtotal).toFixed(2) })}</p>
            <Button className="mt-3 w-full" size="lg" onClick={() => router.push("/checkout")}>{t("pagecart.proceed")} {isRTL() ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</Button>
          </div>
        </div>
      )}
    </div>
  );
}