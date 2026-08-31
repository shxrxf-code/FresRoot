"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, TickCircle, Card, Mobile, Bank, Truck, ShieldTick, Refresh, Box } from "iconsax-react";
import { useCart } from "@/stores/cart";
import { useAuth } from "@/stores/auth";
import { useLanguage } from "@/stores/language";
import { products, deliverySlots } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/components/ui-utils";

export default function CheckoutPage() {
  const { t } = useLanguage();

  const steps = [t("checkout.stepAddress"), t("checkout.stepSlot"), t("checkout.stepPayment"), t("checkout.stepReview")];
  const addresses = [
    { type: t("checkout.home"), icon: Home, line: t("checkout.addrHomeLine") },
    { type: t("checkout.office"), icon: Briefcase, line: t("checkout.addrOfficeLine") },
  ];
  const payments = [
    { id: "card", name: t("checkout.cardPayment"), desc: t("checkout.cardPaymentDesc"), icon: Card },
    { id: "applepay", name: t("checkout.applePay"), desc: t("checkout.applePayDesc"), icon: Mobile },
    { id: "gpay", name: t("checkout.googlePay"), desc: t("checkout.googlePayDesc"), icon: Mobile },
    { id: "cod", name: t("checkout.cod"), desc: t("checkout.codDesc"), icon: Bank, cash: true },
  ];
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const deliveryFee = useCart((s) => s.deliveryFee());
  const discount = useCart((s) => s.discount());
  const vat = useCart((s) => s.vat());
  const total = useCart((s) => s.total());
  const coupon = useCart((s) => s.coupon);
  const clear = useCart((s) => s.clear);
  const user = useAuth((s) => s.user);
  const [step, setStep] = React.useState(1);
  const [addr, setAddr] = React.useState(0);
  const [slot, setSlot] = React.useState(1);
  const [payment, setPayment] = React.useState("card");
  const [processing, setProcessing] = React.useState(false);
  const [form, setForm] = React.useState({ name: user?.name || "", phone: user?.phone || "", line: "", city: "Dubai", area: "" });

  const details = items.map((i) => ({ item: i, product: products.find((p) => p.id === i.productId)! })).filter((d) => d.product);

  const handlePlaceOrder = () => {
    const orderId = `FR${Math.floor(10000 + Math.random() * 40000)}`;
    if (!payments.find((p) => p.id === payment)?.cash) {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); clear(); router.push(`/order-success?id=${orderId}`); }, 1500);
    } else {
      clear();
      router.push(`/order-success?id=${orderId}`);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-primary">{t("checkout.title")}</h1>

      <div className="mt-6 flex items-center gap-0 overflow-x-auto no-scrollbar">
        {steps.map((s, i) => {
          const n = i + 1;
          return (
            <React.Fragment key={s}>
              <button onClick={() => n < step && setStep(n)} className={cn("flex items-center gap-2 whitespace-nowrap", n < step && "cursor-pointer")}>
                <span className={cn("grid h-8 w-8 place-items-center rounded-full text-sm font-semibold", n < step ? "bg-secondary text-white" : n === step ? "bg-primary text-white" : "bg-gray-100 text-muted")}>{n < step ? <TickCircle size={15} /> : n}</span>
                <span className={cn("text-sm font-medium", n === step ? "text-primary" : "text-muted")}>{s}</span>
              </button>
              {n < steps.length && <div className="mx-3 h-px flex-1 min-w-6 bg-border" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              {step === 1 && (
                <div>
                  <h2 className="mb-1 text-lg font-semibold text-ink">{t("checkout.stepAddress")}</h2>
                  <p className="mb-4 text-sm text-muted">{t("checkout.receivingIn")}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {addresses.map((a, i) => (
                      <button key={a.type} onClick={() => setAddr(i)} className={cn("rounded-2xl border p-4 text-start transition-colors", addr === i ? "border-primary bg-lightgreen/50" : "border-border hover:border-primary/40")}>
                        <div className="flex items-center gap-2"><a.icon size={18} className="text-primary" /><span className="font-medium text-ink">{a.type}</span></div>
                        <p className="mt-2 text-sm text-muted">{a.line}</p>
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">{t("checkout.addNewAddress")}</p>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div><Label>{t("checkout.fullName")}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("checkout.fullNamePh")} /></div>
                    <div><Label>{t("checkout.phone")}</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t("checkout.phonePh")} /></div>
                    <div className="sm:col-span-2"><Label>{t("checkout.address")}</Label><Input value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} placeholder={t("checkout.addressPh")} /></div>
                    <div><Label>{t("checkout.city")}</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder={t("checkout.cityPh")} /></div>
                    <div><Label>{t("checkout.emirate")}</Label><Input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder={t("checkout.emiratePh")} /></div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-ink">{t("checkout.stepSlot")}</h2>
                  <p className="mb-4 flex items-center gap-2 text-sm text-muted"><Truck size={16} /> {t("checkout.slotInfo")}</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {deliverySlots.map((s, i) => (
                      <button key={s} onClick={() => setSlot(i)} className={cn("rounded-2xl border p-4 text-center transition-colors", slot === i ? "border-primary bg-lightgreen/50 ring-2 ring-ring" : "border-border hover:border-primary/40")}>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{i < 2 ? t("checkout.today") : t("checkout.tomorrow")}</p>
                        <p className={cn("mt-1 text-base font-bold", slot === i ? "text-primary" : "text-ink")}>{s}</p>
                        <p className="mt-1 text-xs text-muted">{i === 0 ? t("checkout.earlyDrop") : i === 3 ? t("checkout.popularSlot") : i === 4 ? t("checkout.lateEvening") : t("checkout.quickFresh")}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-ink">{t("checkout.paymentMethod")}</h2>
                  <div className="grid gap-3">
                    {payments.map((p) => (
                      <button key={p.id} onClick={() => setPayment(p.id)} className={cn("flex items-center gap-4 rounded-2xl border p-4 text-start transition-colors", payment === p.id ? "border-primary bg-lightgreen/50" : "border-border hover:border-primary/40")}>
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary shadow-sm"><p.icon size={22} /></span>
                        <div className="flex-1"><p className="font-medium text-ink">{p.name}</p><p className="text-xs text-muted">{p.desc}</p></div>
                        <span className={cn("grid h-5 w-5 place-items-center rounded-full border-2", payment === p.id ? "border-primary" : "border-gray-300")}>{payment === p.id && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}</span>
                      </button>
                    ))}
                  </div>
                  {payment === "card" && <div className="mt-4 grid gap-3 sm:grid-cols-2"><div><Label>{t("checkout.cardNumber")}</Label><Input placeholder={t("checkout.cardNumberPh")} /></div><div><Label>{t("checkout.expiryCvv")}</Label><Input placeholder={t("checkout.expiryCvvPh")} /></div></div>}
                  {(payment === "applepay" || payment === "gpay") && <p className="mt-4 rounded-xl bg-bg p-4 text-sm text-muted">{t("checkout.secureNote")}</p>}
                  <p className="mt-4 flex items-center gap-2 text-xs text-muted"><ShieldTick size={14} className="text-secondary" /> {t("checkout.demoNote")}</p>
                </div>
              )}
              {step === 4 && (
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-ink">{t("checkout.reviewOrder")}</h2>
                  <div className="space-y-3">
                    {details.map(({ item, product }) => (
                      <div key={product.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                        <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-lg"><Image src={product.image} alt={product.name} fill unoptimized sizes="48px" className="object-cover" /></span>
                        <div className="flex-1"><p className="text-sm font-medium text-ink">{product.name}</p><p className="text-xs text-muted">{product.unit} · {item.qty} × AED {product.price.toFixed(2)}</p></div>
                        <span className="font-semibold text-ink">AED {(product.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-bg p-4 text-sm">
                    <p className="flex justify-between"><span className="text-muted">{t("checkout.deliverTo")}</span><span className="font-medium text-ink">{addresses[addr].type} · {addresses[addr].line}</span></p>
                    <p className="mt-1 flex justify-between"><span className="text-muted">{t("checkout.slot")}</span><span className="font-medium text-ink">{slot < 2 ? t("checkout.today") : t("checkout.tomorrow")}, {deliverySlots[slot]}</span></p>
                    <p className="mt-1 flex justify-between"><span className="text-muted">{t("checkout.payment")}</span><span className="font-medium text-ink">{payments.find((p) => p.id === payment)?.name}</span></p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between border-t border-border pt-4">
            <Button variant="outline" onClick={() => (step > 1 ? setStep(step - 1) : router.back())}>{t("checkout.back")}</Button>
            {step < 4 ? <Button onClick={() => setStep(step + 1)}>{t("checkout.continue")}</Button> : (
              <Button size="lg" onClick={handlePlaceOrder} disabled={processing}>{processing ? (<><Refresh size={18} className="animate-spin" /> {t("checkout.processing")}</>) : payment === "cod" ? t("checkout.placeOrder") : t("checkout.payPlaceOrder")}</Button>
            )}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-border bg-white p-5 shadow-soft">
          <h2 className="mb-3 text-lg font-bold text-ink">{t("checkout.orderSummary")}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted"><span>{t("checkout.subtotal", { n: String(items.reduce((s, i) => s + i.qty, 0)) })}</span><span className="text-ink">AED {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted"><span>{t("checkout.deliveryFee")}</span><span className="text-ink">{deliveryFee === 0 ? <span className="font-semibold text-secondary">{t("checkout.free")}</span> : `AED ${deliveryFee.toFixed(2)}`}</span></div>
            {discount > 0 && <div className="flex justify-between font-medium text-secondary"><span>{t("checkout.discount")}{coupon ? ` (${coupon})` : ""}</span><span>-AED {discount.toFixed(2)}</span></div>}
            <div className="flex justify-between text-muted"><span>{t("checkout.vat")}</span><span className="text-ink">AED {vat.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-border pt-2.5 text-lg font-extrabold text-ink"><span>{t("checkout.total")}</span><span>AED {total.toFixed(2)}</span></div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-secondary"><Truck size={14} /> {t("checkout.freeDeliveryNote")}</p>
          <div className="mt-4 rounded-xl bg-lightgreen/50 p-3 text-xs text-primary"><p className="flex items-center gap-1.5 font-semibold"><Box size={14} /> {t("checkout.qualityCheckedNote")}</p><p className="mt-0.5 text-primary/80">{t("checkout.qualityCheckedDesc")}</p></div>
        </div>
      </div>
    </div>
  );
}