"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { TickCircle, Box } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/stores/language";

export default function OrderSuccess() {
  const { t } = useLanguage();
  return (
    <React.Suspense fallback={<div className="px-4 py-16 text-center text-muted">{t("ordersuccess.loading")}</div>}>
      <OrderSuccessInner />
    </React.Suspense>
  );
}

function OrderSuccessInner() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "FR10248";

  const timeline = [
    t("orderPlaced"),
    t("orderConfirmed"),
    t("orderHarvested"),
    t("orderQualityChecked"),
    t("orderPacked"),
    t("orderOutForDelivery"),
    t("orderDelivered"),
  ];

  const done = 3;
  const active = 4;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary text-white shadow-card">
        <TickCircle size={40} />
      </motion.div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-primary">{t("ordersuccess.title")}</h1>
      <p className="mt-3 text-muted">{t("ordersuccess.thanks")}</p>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <p className="text-sm text-muted">{t("ordersuccess.orderId")}</p>
        <p className="text-2xl font-extrabold text-primary">#{orderId}</p>
        <div className="my-4 h-px bg-border" />
        <p className="text-sm font-medium">{t("ordersuccess.expectedDelivery")}</p>
        <p className="mt-1 text-lg font-semibold">{t("ordersuccess.deliveryWindow")}</p>
      </div>

      <div className="mt-8">
        <h2 className="mb-5 text-lg font-semibold">{t("ordersuccess.timeline")}</h2>
        {timeline.map((t, i) => (
          <div key={t} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-white ${i <= done ? "bg-secondary" : i === active ? "bg-primary shadow-lg" : "bg-gray-200 text-gray-500"}`}>{i <= done ? <TickCircle size={16} /> : i === active ? <Box size={16} /> : <Box size={16} />}</span>
              {i < timeline.length - 1 && <span className={`w-0.5 flex-1 ${i < active ? "bg-secondary" : "bg-border"}`} style={{ minHeight: 24 }} />}
            </div>
            <p className={`pt-1.5 text-sm font-medium ${i <= active ? "text-ink" : "text-muted"}`}>{t}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={`/orders/${orderId}`}><Button>{t("ordersuccess.trackOrder")}</Button></Link>
        <Link href="/shop"><Button variant="outline">{t("orderd.continueShopping")}</Button></Link>
      </div>
    </div>
  );
}