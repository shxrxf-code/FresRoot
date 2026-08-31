"use client";
import * as React from "react";
import { subscriptions, subscriptionPlans } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { Repeat, PauseCircle, CloseCircle, UserAdd, Wallet } from "iconsax-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function SubscriptionsAdmin() {
  const [data, setData] = React.useState(subscriptions);
  const mrr = subscriptions.reduce((s, x) => s + (x.status === "Active" ? x.price : 0), 0);

  const toggle = (id: string, status: "Active" | "Paused" | "Cancelled") => setData(data.map((s) => s.id === id ? { ...s, status } : s));

  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Subscriptions</h1><p className="text-sm text-muted">Manage recurring farm boxes.</p></div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Active" value={String(data.filter((s) => s.status === "Active").length)} icon={<Repeat size={20} />} />
        <StatCard title="Paused" value={String(data.filter((s) => s.status === "Paused").length)} icon={<PauseCircle size={20} />} />
        <StatCard title="Cancelled" value={String(data.filter((s) => s.status === "Cancelled").length)} icon={<CloseCircle size={20} />} />
        <StatCard title="New This Week" value="21" delta="18%" icon={<UserAdd size={20} />} />
        <StatCard title="MRR" value={`AED ${(subscriptions.length * 900).toLocaleString()}`} icon={<Wallet size={20} />} />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">Customer</th><th className="px-4 py-3 font-semibold">Plan</th><th className="px-4 py-3 font-semibold">Frequency</th><th className="px-4 py-3 font-semibold">Next Delivery</th><th className="px-4 py-3 font-semibold">Amount</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar src="https://i.pravatar.cc/100?u=x" name={s.customer} size={32} /><span className="font-medium">{s.customer}</span></div></td>
                  <td className="px-4 py-3">{s.plan}</td>
                  <td className="px-4 py-3 text-muted">{s.frequency}</td>
                  <td className="px-4 py-3 text-muted">{s.nextDelivery}</td>
                  <td className="px-4 py-3">AED {s.price}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Button size="sm" variant="outline" onClick={() => toggle(s.id, s.status === "Active" ? "Paused" : "Active")}>{s.status === "Active" ? "Pause" : "Resume"}</Button>
                    <Button size="sm" variant="ghost" onClick={() => toggle(s.id, "Cancelled")} className="ml-1 text-red-600">Cancel</Button>
                    <Button size="sm" variant="ghost" className="ml-1">Modify</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
