"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TickCircle, Box, Truck, Location, User, ArrowLeft, ArrowRight } from "iconsax-react";
import { orders } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/stores/language";

const statuses = [
  { labelKey: "orderPlaced", descKey: "orderPlacedDesc" },
  { labelKey: "orderConfirmed", descKey: "orderConfirmedDesc" },
  { labelKey: "orderHarvested", descKey: "orderHarvestedDesc" },
  { labelKey: "orderQualityChecked", descKey: "orderQualityCheckedDesc" },
  { labelKey: "orderPacked", descKey: "orderPackedDesc" },
  { labelKey: "orderOutForDelivery", descKey: "orderOutForDeliveryDesc" },
  { labelKey: "orderDelivered", descKey: "orderDeliveredDesc" },
];

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const order = orders.find((o) => o.id === id) || orders[0];
  const current = 5;
  const { t, isRTL } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">{t("orderd.back")} {isRTL() ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}</button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-primary">{t("orderd.orderNo", { id: order.id })}</h1><p className="text-sm text-muted">{t("orderd.placedAt", { date: order.createdAt })}</p></div>
        <StatusBadge status={order.orderStatus} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-primary p-4 text-white">
          <p className="text-xs text-emerald-200">{t("orderd.estimatedDelivery")}</p>
          <p className="mt-1 text-lg font-bold">{t("orderd.estimateSlot")}</p>
          <p className="text-xs text-emerald-200">{t("orderd.phoneAlert")}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
          <p className="flex items-center gap-1.5 text-xs text-muted"><Location size={14} className="text-primary" /> {t("orderd.deliveringTo")}</p>
          <p className="mt-1 font-semibold text-ink">42, Lakeview Avenue, Al Barari</p>
          <p className="text-xs text-muted">Dubai, UAE · 25.0513° N, 55.3962° E</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h2 className="mb-6 font-semibold">{t("orderd.tracking")}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {statuses.map((s, i) => {
            const done = i < current;
            const now = i === current;
            return (
              <div key={s.labelKey} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className={`grid h-9 w-9 place-items-center rounded-full text-white ${done ? "bg-secondary" : now ? "bg-primary shadow-lg" : "bg-gray-200 text-gray-500"}`}>{done ? <TickCircle size={17} /> : now ? <Truck size={17} /> : <Box size={17} />}</span>
                  {i < statuses.length - 1 && <span className={`mt-1 w-0.5 flex-1 ${done ? "bg-secondary" : "bg-border"}`} style={{ minHeight: 20 }} />}
                </div>
                <div className="pt-0.5">
                  <p className={`text-sm font-semibold ${done || now ? "text-ink" : "text-muted"}`}>{t(s.labelKey)}</p>
                  <p className="text-xs text-muted">{t(s.descKey)}</p>
                  {now && <span className="mt-1 inline-block rounded-full bg-lightgreen px-2 py-0.5 text-[11px] font-semibold text-primary">{t("orderd.arriving")}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-semibold">{t("orderd.items")}</h2>
          <div className="space-y-3">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <Image src={it.image} alt={it.name} width={48} height={48} unoptimized className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1"><p className="text-sm font-medium">{it.name}</p><p className="text-xs text-muted">{it.farm}</p></div>
                <span className="text-sm text-muted">×{it.qty}</span>
                <span className="font-medium">AED {it.price * it.qty}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h3 className="mb-3 flex items-center gap-2 font-semibold"><Location size={18} className="text-primary" /> {t("orderd.deliveryAddress")}</h3>
            <p className="text-sm text-muted">{order.deliveryAddress}<br />Dubai, UAE</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h3 className="mb-3 flex items-center gap-2 font-semibold"><User size={18} className="text-primary" /> {t("orderd.deliveryAgent")}</h3>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lightgreen text-sm font-bold text-primary">{order.agent.charAt(0)}</span>
              <div><p className="text-sm font-medium">{order.agent}</p><p className="text-xs text-muted">+971 5x xxx xxxx</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h3 className="mb-2 font-semibold">{t("orderd.summary")}</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted"><span>{t("cart.subtotal")}</span><span>AED {order.subtotal}</span></div>
              <div className="flex justify-between text-muted"><span>{t("cart.delivery")}</span><span>{order.deliveryFee === 0 ? t("pagecart.free") : `AED ${order.deliveryFee}`}</span></div>
              <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>{t("orderd.total")}</span><span>AED {order.total}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* simulated map */}
      <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-lightgreen/60 to-emerald-100 p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-primary"><Location size={16} /> {t("orderd.liveRoute")}</div>
        <div className="relative mt-4 h-32 rounded-xl bg-white/70">
          <div className="absolute inset-4 flex items-center">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">🏠</div>
            <div className="mx-2 flex-1"><div className="relative h-1 rounded-full bg-emerald-200"><motion.div initial={{ width: "35%" }} animate={{ width: "75%" }} transition={{ duration: 1.5 }} className="absolute h-1 rounded-full bg-secondary" /></div><div className="mt-1 flex justify-between text-[10px] text-muted"><span>{t("delivery.farm")}</span><span>{t("orderd.onTheWay")}</span><span>{t("delivery.yourDoor")}</span></div></div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">🚚</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/orders"><Button variant="outline">{t("orderd.allOrders")}</Button></Link>
        <Link href="/shop"><Button>{t("orderd.continueShopping")}</Button></Link>
      </div>
    </div>
  );
}