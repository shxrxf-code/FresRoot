"use client";
import { motion } from "framer-motion";
import { ArrowDown2, ArrowUp } from "iconsax-react";
import { cn } from "@/components/ui-utils";

export function StatCard({ title, value, delta, deltaUp = true, icon, delay = 0 }: { title: string; value: string; delta?: string; deltaUp?: boolean; icon?: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
        </div>
        {icon && <span className="grid h-10 w-10 place-items-center rounded-xl bg-lightgreen text-primary">{icon}</span>}
      </div>
      {delta && (
        <p className={cn("mt-3 inline-flex items-center gap-1 text-xs font-medium", deltaUp ? "text-green-600" : "text-red-600")}>
          {deltaUp ? <ArrowUp size={14} /> : <ArrowDown2 size={14} />} {delta} <span className="text-muted">vs last month</span>
        </p>
      )}
    </motion.div>
  );
}
