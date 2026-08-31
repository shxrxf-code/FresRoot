"use client";
import { motion } from "framer-motion";
import { cn } from "@/components/ui-utils";

export function ChartCard({ title, subtitle, action, children, className, delay = 0 }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }} className={cn("rounded-2xl border border-border bg-white p-5 shadow-soft", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div><h3 className="font-semibold text-ink">{title}</h3>{subtitle && <p className="text-xs text-muted">{subtitle}</p>}</div>
        {action}
      </div>
      {children}
    </motion.div>
  );
}
