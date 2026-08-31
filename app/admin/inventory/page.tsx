"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { products, inventory } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Warning2, Add, NotificationBing } from "iconsax-react";
import { StatCard } from "@/components/admin/stat-card";

export default function InventoryAdmin() {
  const [stockAdj, setStockAdj] = React.useState<{ id: string; amount: number } | null>(null);
  const lowStock = inventory.filter((i) => i.status === "Low Stock" || i.status === "Out of Stock");
  const [list, setList] = React.useState(inventory);

  const adjust = () => {
    if (stockAdj) {
      setList(list.map((i) => i.id === stockAdj.id ? { ...i, stockKg: i.stockKg + stockAdj.amount, status: "In Stock" } : i));
      setStockAdj(null);
    }
  };

  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Inventory</h1><p className="text-sm text-muted">Track stock levels across all farms.</p></div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total SKUs" value={String(products.length)} icon={<Add size={20} />} />
        <StatCard title="In Stock" value={String(inventory.filter((i) => i.status === "In Stock").length)} icon={<Add size={20} />} />
        <StatCard title="Low Stock" value={String(lowStock.filter((i) => i.status === "Low Stock").length)} delta="" icon={<Warning2 size={20} />} />
        <StatCard title="Out of Stock" value={String(lowStock.filter((i) => i.status === "Out of Stock").length)} icon={<Warning2 size={20} />} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-4"><h2 className="font-semibold">All Inventory</h2><button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary/40">Set Reorder Level</button></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">Category</th><th className="px-4 py-3 font-semibold">Stock</th><th className="px-4 py-3 font-semibold">Farm</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Last Updated</th></tr></thead>
              <tbody>{list.map((i) => {
                const p = products.find((pr) => pr.id === i.id);
                return <tr key={i.id} className="border-b border-border last:border-0 hover:bg-bg/50"><td className="px-4 py-3"><div className="flex items-center gap-3">{p && <Image src={p.image} alt={p.name} width={36} height={36} unoptimized className="h-9 w-9 rounded-lg object-cover" />}<span className="font-medium">{i.name}</span></div></td><td className="px-4 py-3 text-muted">{i.category}</td><td className="px-4 py-3">{i.stockKg} kg</td><td className="px-4 py-3 text-muted">{i.farm}</td><td className="px-4 py-3"><StatusBadge status={i.status} /></td><td className="px-4 py-3 text-muted">{i.lastUpdated}</td></tr>;
              })}</tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800"><NotificationBing size={18} /> Low Stock Alerts</h3>
          <div className="mt-3 space-y-2">
            {lowStock.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                <div><p className="text-sm font-medium">{i.name}</p><p className="text-xs text-muted">{i.stockKg} kg remaining</p></div>
                <button onClick={() => setStockAdj({ id: i.id, amount: 0 })} className="rounded-lg bg-primary px-2.5 py-1 text-xs font-medium text-white hover:bg-primary-light">Add Stock</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={!!stockAdj} onClose={() => setStockAdj(null)} title="Add Stock">
        <div className="space-y-4">
          <div><Label>Quantity to add (kg)</Label><Input type="number" placeholder="e.g. 20" onChange={(e) => setStockAdj((s) => s ? { ...s, amount: +e.target.value } : s)} /></div>
          <Button className="w-full" onClick={adjust}>Update Stock</Button>
        </div>
      </Modal>
    </div>
  );
}
