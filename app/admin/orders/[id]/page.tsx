"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "iconsax-react";
import { orders } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const order = orders.find((o) => o.id === id) || orders[0];

  return (
    <div className="max-w-3xl">
      <button onClick={() => router.back()} className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary"><ArrowLeft size={16} /> Back</button>
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-ink">Order #{order.id}</h1><StatusBadge status={order.orderStatus} /></div>
      <p className="mt-1 text-sm text-muted">Placed {order.createdAt} · {order.paymentStatus}</p>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-soft">
        <h2 className="mb-4 font-semibold">Items</h2>
        <div className="space-y-2">{order.items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-2"><Image src={it.image} alt={it.name} width={44} height={44} unoptimized className="h-11 w-11 rounded-lg object-cover" /><div className="flex-1"><p className="text-sm font-medium">{it.name}</p><p className="text-xs text-muted">{it.farm}</p></div><span className="text-sm text-muted">×{it.qty}</span><span className="font-medium">AED {it.price * it.qty}</span></div>
        ))}</div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft"><h3 className="mb-2 font-semibold">Customer</h3><p>{order.customer}</p><p className="text-sm text-muted">{order.deliveryAddress}</p></div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft"><h3 className="mb-2 font-semibold">Delivery</h3><p className="text-sm">{order.deliverySlot}</p><p className="text-sm text-muted">Agent: {order.agent}</p></div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button>Update Status</Button>
        <Button variant="outline">Contact Customer</Button>
      </div>
    </div>
  );
}
