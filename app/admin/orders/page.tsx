"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/ui/status-badge";
import { orders } from "@/data/mock";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const filters = ["All", "Pending", "Confirmed", "Preparing", "Packed", "Out for Delivery", "Delivered", "Cancelled", "Returned"];

export default function OrdersAdmin() {
  const [filter, setFilter] = React.useState("All");
  const [selected, setSelected] = React.useState<string | null>(null);
  const statusOptions = ["Pending", "Confirmed", "Preparing", "Packed", "Out for Delivery", "Delivered"];
  const [orderStates, setOrderStates] = React.useState<Record<string, string>>({});
  const list = orders.filter((o) => filter === "All" || (orderStates[o.id] || o.orderStatus) === filter);
  const sel = orders.find((o) => o.id === selected);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-ink">Orders</h1><p className="text-sm text-muted">Manage and update order statuses.</p></div>
        <button className="rounded-xl border border-border bg-white px-4 py-2 text-sm hover:border-primary/40">Export</button>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${filter === f ? "border-primary bg-primary text-white" : "border-border bg-white text-muted hover:text-primary"}`}>{f}</button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">Order ID</th><th className="px-4 py-3 font-semibold">Customer</th><th className="px-4 py-3 font-semibold">Date</th><th className="px-4 py-3 font-semibold">Amount</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead>
            <tbody>
              {list.map((o) => <tr key={o.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                <td className="px-4 py-3 font-semibold text-primary">#{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3 text-muted">{o.createdAt}</td>
                <td className="px-4 py-3">AED {o.total}</td>
                <td className="px-4 py-3"><StatusBadge status={orderStates[o.id] || o.orderStatus} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelected(o.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-primary">View</button>
                  <button className="ml-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-primary">Edit</button>
                  <button className="ml-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Cancel</button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={sel ? `Order #${sel.id}` : ""} className="max-w-2xl">
        {sel && (
          <div className="space-y-5">
            <div className="flex items-center justify-between"><StatusBadge status={orderStates[sel.id] || sel.orderStatus} /><span className="text-2xl font-bold">AED {sel.total}</span></div>
            <div className="space-y-2">{sel.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-2"><Image src={it.image} alt={it.name} width={40} height={40} unoptimized className="h-10 w-10 rounded-lg object-cover" /><div className="flex-1"><p className="text-sm font-medium">{it.name}</p><p className="text-xs text-muted">{it.farm} · {it.unit}</p></div><span className="text-sm">×{it.qty}</span><span className="font-medium">AED {it.price * it.qty}</span></div>
            ))}</div>
            <div className="grid gap-3 rounded-xl bg-bg p-4 text-sm sm:grid-cols-2">
              <p className="text-muted"><span className="block font-medium text-ink">Customer</span>{sel.customer}</p>
              <p className="text-muted"><span className="block font-medium text-ink">Payment</span>{sel.paymentStatus}</p>
              <p className="text-muted col-span-2"><span className="block font-medium text-ink">Delivery Address</span>{sel.deliveryAddress}</p>
              <p className="text-muted"><span className="block font-medium text-ink">Slot</span>{sel.deliverySlot}</p>
              <p className="text-muted"><span className="block font-medium text-ink">Delivery Agent</span>{sel.agent}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <button key={s} onClick={() => setOrderStates({ ...orderStates, [sel.id]: s })} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${(orderStates[sel.id] || sel.orderStatus) === s ? "border-primary bg-primary text-white" : "border-border text-muted hover:text-primary"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div><p className="mb-2 text-sm font-medium">Order Timeline</p><div className="flex gap-1">{statusOptions.map((s, i) => <span key={s} className={`h-1.5 flex-1 rounded-full ${i <= statusOptions.indexOf(orderStates[sel.id] || sel.orderStatus) ? "bg-secondary" : "bg-border"}`} />)}</div></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
