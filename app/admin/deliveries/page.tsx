"use client";
import * as React from "react";
import { deliveries, deliveriesSummary } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { Truck, TickCircle, Refresh, Timer1, CloseCircle } from "iconsax-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const agents = ["Hassan", "Maryam", "Noor"];

export default function DeliveriesAdmin() {
  const [data, setData] = React.useState(deliveries);
  const [assigning, setAssigning] = React.useState<string | null>(null);

  const assign = (agent: string) => setData(data.map((d) => d.id === assigning ? { ...d, agent, status: "Assigned" } : d));

  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Deliveries</h1><p className="text-sm text-muted">Dispatch and track deliveries.</p></div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Deliveries" value={String(deliveriesSummary.total)} icon={<Truck size={20} />} />
        <StatCard title="Completed" value={String(deliveriesSummary.completed)} icon={<TickCircle size={20} />} />
        <StatCard title="In Progress" value={String(deliveriesSummary.inProgress)} icon={<Refresh size={20} />} />
        <StatCard title="Pending" value={String(deliveriesSummary.pending)} icon={<Timer1 size={20} />} />
        <StatCard title="Failed" value={String(deliveriesSummary.failed)} icon={<CloseCircle size={20} />} />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">Delivery ID</th><th className="px-4 py-3 font-semibold">Order</th><th className="px-4 py-3 font-semibold">Customer</th><th className="px-4 py-3 font-semibold">Agent</th><th className="px-4 py-3 font-semibold">Location</th><th className="px-4 py-3 font-semibold">Slot</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Action</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-4 py-3 font-medium">{d.id}</td>
                  <td className="px-4 py-3 text-primary font-medium">#{d.order}</td>
                  <td className="px-4 py-3">{d.customer}</td>
                  <td className="px-4 py-3">{d.agent}</td>
                  <td className="px-4 py-3 text-muted">{d.location}</td>
                  <td className="px-4 py-3 text-muted">{d.slot}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-right"><Button size="sm" variant="outline" onClick={() => setAssigning(d.id)}>Assign Agent</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!assigning} onClose={() => setAssigning(null)} title="Assign Delivery Agent">
        <div className="space-y-2">
          {agents.map((a) => (
            <button key={a} onClick={() => { assign(a); setAssigning(null); }} className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:border-primary/40 hover:bg-lightgreen/30">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lightgreen text-sm font-bold text-primary">{a.charAt(0)}</span><span className="font-medium">{a}</span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
