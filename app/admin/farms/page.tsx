"use client";
import * as React from "react";
import Image from "next/image";
import { farms } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { Shop, Star, Location, Add } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input, Label } from "@/components/ui/input";

export default function FarmsAdmin() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", farmer: "", location: "", method: "Organic" });

  return (
    <div>
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-ink">Farm Management</h1><p className="text-sm text-muted">Manage partner farms.</p></div><Button size="sm" onClick={() => setOpen(true)}><Add size={16} /> Add Farm</Button></div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatCard title="Active Farms" value={String(farms.filter((f) => f.status === "Active").length)} icon={<Shop size={20} />} />
        <StatCard title="Pending Approval" value={String(farms.filter((f) => f.status === "Pending").length)} icon={<Shop size={20} />} />
        <StatCard title="Avg Rating" value="4.7" delta="" icon={<Star size={20} />} />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">Farm</th><th className="px-4 py-3 font-semibold">Farmer</th><th className="px-4 py-3 font-semibold">Location</th><th className="px-4 py-3 font-semibold">Products</th><th className="px-4 py-3 font-semibold">Rating</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead>
            <tbody>
              {farms.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><Image src={f.image} alt={f.name} width={40} height={40} unoptimized className="h-10 w-10 rounded-lg object-cover" /><span className="font-medium">{f.name}</span></div></td>
                  <td className="px-4 py-3">{f.farmer}</td>
                  <td className="px-4 py-3 text-muted flex items-center gap-1"><Location size={13} />{f.location}</td>
                  <td className="px-4 py-3 text-muted">{f.products}</td>
                  <td className="px-4 py-3">★ {f.rating}</td>
                  <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:text-primary">View</button>
                    <button className="ml-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:text-primary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add New Farm">
        <div className="space-y-4">
          <div><Label>Farm Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Green Valley Farm" /></div>
          <div><Label>Farmer Name</Label><Input value={form.farmer} onChange={(e) => setForm({ ...form, farmer: e.target.value })} placeholder="e.g. Ahmed Al Mansouri" /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Dubai" /></div>
          <div><Label>Farming Method</Label><select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary"><option>Organic</option><option>Natural</option><option>Biodynamic</option></select></div>
          <Button className="w-full" onClick={() => setOpen(false)}>Save Farm</Button>
        </div>
      </Modal>
    </div>
  );
}
