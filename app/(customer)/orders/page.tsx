"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Box, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { orders } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/skeleton";
import { useLanguage } from "@/stores/language";

export default function OrdersPage() {
  const myOrders = orders;
  const { t, isRTL } = useLanguage();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary">{t("orders.title")}</h1>
      <p className="mt-1 text-muted">{t("orders.subtitle")}</p>

      <div className="mt-8 space-y-4">
        {myOrders.length === 0 ? <EmptyState icon={<Box size={30} />} title={t("orders.empty")} /> : myOrders.map((o) => (
          <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link href={`/orders/${o.id}`} className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft transition-shadow hover:shadow-card sm:flex-row sm:items-center">
              <div className="flex -space-x-3">
                {o.items.slice(0, 3).map((it, i) => <Image key={i} src={it.image} alt={it.name} width={48} height={48} unoptimized className="h-14 w-14 rounded-xl border-2 border-white object-cover" />)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2"><p className="font-semibold">#{o.id}</p><StatusBadge status={o.orderStatus} /></div>
                <p className="mt-1 text-sm text-muted">{o.createdAt} · {t("orders.items", { n: o.items.length })} · {o.deliverySlot}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-ink">AED {o.total}</p>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">{isRTL() ? <ArrowLeft2 size={18} /> : <ArrowRight2 size={18} />}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}