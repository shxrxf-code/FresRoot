"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "iconsax-react";
import { customers, orders } from "@/data/mock";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

export default function AdminCustomerDetail() {
  const { id } = useParams();
  const router = useRouter();
  const c = customers.find((x) => x.id === id) || customers[0];
  const cOrders = orders.filter((o) => o.customerId === c.id);

  return (
    <div className="max-w-3xl">
      <button onClick={() => router.back()} className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary"><ArrowLeft size={16} /> Back</button>
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <Avatar src={`https://i.pravatar.cc/100?u=${c.id}`} name={c.name} size={64} />
        <div className="flex-1"><h1 className="text-2xl font-bold text-ink">{c.name}</h1><p className="text-sm text-muted">{c.email} · {c.phone}</p><p className="mt-1 inline-flex items-center gap-1 rounded-full bg-lightgreen px-2.5 py-0.5 text-xs font-medium text-primary">🌱 {c.greenPoints} Green Points</p></div>
        <StatusBadge status="Active" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-soft"><p className="text-2xl font-bold text-ink">{c.orders}</p><p className="text-xs text-muted">Orders</p></div>
        <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-soft"><p className="text-2xl font-bold text-ink">AED {c.totalSpent}</p><p className="text-xs text-muted">Total Spent</p></div>
        <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-soft"><p className="text-2xl font-bold text-ink">{c.subscription === "-" ? "—" : "1"}</p><p className="text-xs text-muted">Subscriptions</p></div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h2 className="mb-4 font-semibold">Order History</h2>
        <div className="space-y-2">{cOrders.length === 0 ? <p className="text-sm text-muted">No orders recorded for this customer.</p> : cOrders.map((o) => (
          <div key={o.id} className="flex items-center justify-between rounded-xl border border-border p-3"><div><p className="text-sm font-medium text-primary">#{o.id}</p><p className="text-xs text-muted">{o.createdAt}</p></div><div className="flex items-center gap-3"><StatusBadge status={o.orderStatus} /><span className="font-semibold">AED {o.total}</span></div></div>
        ))}</div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline">Edit</Button>
        <Button variant="danger">Suspend</Button>
        <Button variant="ghost" className="text-red-600">Delete</Button>
      </div>
    </div>
  );
}
