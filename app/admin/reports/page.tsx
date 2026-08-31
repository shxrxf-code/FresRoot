"use client";
import { ChartSquare, DocumentDownload, DocumentText, Box, People, Repeat, Shop, TrendUp } from "iconsax-react";
import { ChartCard } from "@/components/admin/chart-card";
import { motion } from "framer-motion";

export default function ReportsAdmin() {
  const reports = [
    { name: "Sales Report", desc: "Revenue and order metrics", icon: TrendUp },
    { name: "Order Report", desc: "Order volume by status", icon: DocumentText },
    { name: "Customer Report", desc: "Acquisition and retention", icon: People },
    { name: "Inventory Report", desc: "Stock levels and alerts", icon: Box },
    { name: "Farm Performance", desc: "Production and ratings", icon: Shop },
    { name: "Product Performance", desc: "Top sellers and margins", icon: ChartSquare },
    { name: "Subscription Report", desc: "Recurring revenue", icon: Repeat },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-ink">Reports</h1><p className="text-sm text-muted">Generate and export detailed reports.</p></div>
        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm hover:border-primary/40"><DocumentDownload size={16} /> Export CSV</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-light"><DocumentDownload size={16} /> Export PDF</button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <select className="h-10 rounded-xl border border-input bg-white px-3 outline-none focus:border-primary"><option>Date: Last 30 days</option><option>Date: Last 7 days</option><option>Date: This month</option></select>
        <select className="h-10 rounded-xl border border-input bg-white px-3 outline-none focus:border-primary"><option>Category: All</option><option>Vegetables</option><option>Fruits</option><option>Millets</option></select>
        <select className="h-10 rounded-xl border border-input bg-white px-3 outline-none focus:border-primary"><option>Farm: All</option><option>Green Valley</option><option>PureHarvest</option></select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r, i) => (
          <motion.button key={r.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 text-left shadow-soft transition-all hover:border-primary/40 hover:shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lightgreen text-primary"><r.icon size={22} /></span>
            <div className="flex-1"><p className="font-semibold text-ink">{r.name}</p><p className="text-xs text-muted">{r.desc}</p></div>
            <DocumentDownload size={18} className="text-muted" />
          </motion.button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ChartCard title="Revenue Trend" subtitle="Last 6 months">
          <div className="flex h-10 items-end gap-2">
            {[40, 55, 48, 70, 62, 85].map((h, i) => <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex-1 rounded-t-lg bg-secondary/70" style={{ height: `${h * 0.7}px` }} />)}
          </div>
        </ChartCard>
        <ChartCard title="Customer Growth" subtitle="New customers per month">
          <div className="flex h-10 items-end gap-2">
            {[30, 45, 38, 55, 60, 72].map((h, i) => <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex-1 rounded-t-lg bg-primary/70" style={{ height: `${h * 0.7}px` }} />)}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
