"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Add, ShoppingBag, Trash, CloseCircle, ArrowRight, ArrowLeft } from "iconsax-react";
import { useCart } from "@/stores/cart";
import { products } from "@/data/mock";
import { Button } from "./ui/button";
import { useLanguage } from "@/stores/language";

export function CartDrawer() {
  const { t, isRTL } = useLanguage();
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const details = useCart((s) => s.details());
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const deliveryFee = useCart((s) => s.deliveryFee());
  const discount = useCart((s) => s.discount());
  const vat = useCart((s) => s.vat());
  const total = useCart((s) => s.total());
  const coupon = useCart((s) => s.coupon);
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-card"
            aria-label={t("cart.shoppingCart")}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold"><ShoppingBag size={20} className="text-primary" /> {t("cart.yourCart")}</h2>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-primary/5" aria-label={t("cart.closeCart")}><CloseCircle size={20} /></button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-lightgreen text-primary"><ShoppingBag size={28} /></span>
                <p className="font-medium">{t("cart.empty")}</p>
                <p className="text-sm text-muted">{t("cart.emptyHint")}</p>
                <Button onClick={() => { setOpen(false); router.push("/shop"); }} className="mt-2">{t("cart.shopFreshProduce")}</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {items.map((item) => {
                    const p = products.find((pr) => pr.id === item.productId);
                    if (!p) return null;
                    return (
                      <motion.div key={item.productId} layout className="flex gap-3 rounded-2xl border border-border bg-white p-3 shadow-soft">
                        <Image src={p.image} alt={p.name} width={72} height={72} unoptimized className="h-18 w-18 rounded-xl object-cover" style={{ width: 72, height: 72 }} />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-ink">{p.name}</p>
                              <p className="text-xs text-muted">{p.unit} · {p.farm}</p>
                            </div>
                            <button onClick={() => remove(p.id)} className="text-muted hover:text-red-600" aria-label={t("cart.remove")}><Trash size={16} /></button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-xl border border-border p-1">
                              <button onClick={() => setQty(p.id, item.qty - 1)} className="grid h-6 w-6 place-items-center rounded-lg hover:bg-primary/5" aria-label={t("cart.decrease")}><Minus size={14} /></button>
                              <span className="w-5 text-center text-sm font-medium">{item.qty}</span>
                              <button onClick={() => setQty(p.id, item.qty + 1)} className="grid h-6 w-6 place-items-center rounded-lg hover:bg-primary/5" aria-label={t("cart.increase")}><Add size={14} /></button>
                            </div>
                            <span className="font-semibold text-ink">AED {p.price * item.qty}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="border-t border-border p-4">
                  <div className="mb-1 flex justify-between text-sm text-muted"><span>{t("cart.subtotal")}</span><span>AED {subtotal.toFixed(2)}</span></div>
                  <div className="mb-1 flex justify-between text-sm text-muted"><span>{t("cart.delivery")}</span><span>{deliveryFee === 0 ? <span className="font-semibold text-secondary">{t("cart.free")}</span> : `AED ${deliveryFee}`}</span></div>
                  {discount > 0 && <div className="mb-1 flex justify-between text-sm text-secondary"><span>{t("cart.discount")}{coupon ? ` (${coupon})` : ""}</span><span>-AED {discount.toFixed(2)}</span></div>}
                  <div className="mb-1 flex justify-between text-sm text-muted"><span>{t("cart.vat")}</span><span>AED {vat.toFixed(2)}</span></div>
                  <div className="flex justify-between text-base font-bold text-ink"><span>{t("cart.total")}</span><span>AED {total.toFixed(2)}</span></div>
                  <p className="mb-3 mt-1 text-xs text-secondary">{subtotal < 150 ? t("cart.addMoreForFree", { amount: (150 - subtotal).toFixed(2) }) : t("cart.freeDeliveryUnlocked")}</p>
                  <Button className="w-full" onClick={() => { setOpen(false); router.push("/checkout"); }}>{t("cart.checkout")} {isRTL() ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</Button>
                  <Link href="/cart" onClick={() => setOpen(false)} className="mt-2 block text-center text-sm font-medium text-primary hover:underline">{t("cart.viewFullCart")}</Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
