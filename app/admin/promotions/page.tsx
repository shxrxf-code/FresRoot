"use client";
import * as React from "react";
import { promotions } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input, Label } from "@/components/ui/input";
import { Add, Tag, Ticket } from "iconsax-react";
import { StatCard } from "@/components/admin/stat-card";

export default function PromotionsAdmin() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ code: "", value: "", min: "", type: "Percentage" });

  return (
    <div>
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-ink">Promotions</h1><p className="text-sm text-muted">Create coupons and discount campaigns.</p></div><Button size="sm" onClick={() => setOpen(true)}><Add size={16} /> New Offer</Button></div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatCard title="Active Offers" value={String(promotions.filter((p) => p.status === "Active").length)} icon={<Ticket size={20} />} />
        <StatCard title="Redemptions" value="4,660" delta="22.1%" icon={<Tag size={20} />} />
        <StatCard title="Discount Given" value="AED 18,400" delta="10.4%" icon={<Tag size={20} />} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {promotions.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lightgreen text-2xl font-bold text-primary">{p.code}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2"><p className="font-semibold">{p.description}</p><StatusBadge status={p.status} /></div>
              <p className="mt-1 text-xs text-muted">Min order AED {p.minOrder} · {p.uses.toLocaleString()} uses</p>
            </div>
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:text-primary">Edit</button>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create New Offer">
        <div className="space-y-4">
          <div><Label>Coupon Code</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. FRESH20" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Type</Label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary"><option>Percentage</option><option>Fixed</option><option>Free delivery</option></select></div>
            <div><Label>Value</Label><Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="10 or AED 100" /></div>
          </div>
          <div><Label>Minimum Order (AED )</Label><Input value={form.min} onChange={(e) => setForm({ ...form, min: e.target.value })} placeholder="150" /></div>
          <Button className="w-full" onClick={() => setOpen(false)}>Create Offer</Button>
        </div>
      </Modal>
    </div>
  );
}
