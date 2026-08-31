"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Box, Truck, Card, Shop, Warning2, TickCircle } from "iconsax-react";
import { useLanguage } from "@/stores/language";

const iconMap: Record<string, React.ReactNode> = {
  Stock: <Warning2 size={18} />,
  Order: <Box size={18} />,
  Delivery: <Truck size={18} />,
  Payment: <Card size={18} />,
  Farm: <Shop size={18} />,
};

const toneMap: Record<string, string> = {
  Stock: "bg-orange-50 text-orange-600",
  Order: "bg-lightgreen text-primary",
  Delivery: "bg-blue-50 text-blue-600",
  Payment: "bg-amber-50 text-amber-700",
  Farm: "bg-purple-50 text-purple-600",
};

const nots = [
  { id: 1, type: "Order", titleKey: "notif.msgOrderConfirmed", timeKey: "notif.timeMinAgo", unread: true },
  { id: 2, type: "Delivery", titleKey: "notif.msgBoxOutForDelivery", timeKey: "notif.timeHourAgo", unread: true },
  { id: 3, type: "Payment", titleKey: "notif.msgPaymentReceived", timeKey: "notif.timeYesterday", unread: true },
  { id: 4, type: "Farm", titleKey: "notif.msgNewHarvest", timeKey: "notif.time2DaysAgo", unread: false },
  { id: 5, type: "Order", titleKey: "notif.msgRateOrder", timeKey: "notif.time3DaysAgo", unread: false },
  { id: 6, type: "Delivery", titleKey: "notif.msgSlotUpdated", timeKey: "notif.time1WeekAgo", unread: false },
];

export default function NotificationsPage() {
  const { t } = useLanguage();
  const [all, setAll] = React.useState(nots);
  const unreadCount = all.filter((n) => n.unread).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-primary">{t("notif.title")}</h1><p className="mt-1 text-sm text-muted">{t("notif.unread", { n: unreadCount })}</p></div>
        <button onClick={() => setAll(all.map((n) => ({ ...n, unread: false })))} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"><TickCircle size={16} /> {t("notif.markAllRead")}</button>
      </div>
      <div className="mt-6 space-y-3">
        {all.map((n) => (
          <motion.div key={n.id} layout className={`flex gap-4 rounded-2xl border p-4 ${n.unread ? "border-primary/20 bg-lightgreen/30" : "border-border bg-white"}`}>
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneMap[n.type]}`}>{iconMap[n.type]}</span>
            <div className="flex-1"><p className="text-sm font-medium">{t(n.titleKey)}</p><p className="mt-1 text-xs text-muted">{t(n.timeKey)}</p></div>
            {n.unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}