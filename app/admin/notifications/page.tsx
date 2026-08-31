"use client";
import * as React from "react";
import { notifications } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Send, Box, Truck, Card, Shop, Warning2, TickCircle } from "iconsax-react";
import { StatCard } from "@/components/admin/stat-card";

const types = ["Order Updates", "Promotions", "Delivery Alerts", "Subscription Reminders", "Farm Updates"];
const audiences = ["All Customers", "Subscribers", "New Customers", "Inactive Customers"];

const iconMap: Record<string, React.ReactNode> = { Stock: <Warning2 size={18} />, Order: <Box size={18} />, Delivery: <Truck size={18} />, Payment: <Card size={18} />, Farm: <Shop size={18} /> };

export default function NotificationsAdmin() {
  const [form, setForm] = React.useState({ title: "", message: "", type: "Order Updates", audience: "All Customers" });
  const [sent, setSent] = React.useState(false);

  const send = () => { setSent(true); setTimeout(() => setSent(false), 2500); };

  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Notifications</h1><p className="text-sm text-muted">Send updates to your customers.</p></div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatCard title="Sent This Week" value="14" delta="8%" icon={<Send size={20} />} />
        <StatCard title="Avg Open Rate" value="62%" delta="4.2%" icon={<Send size={20} />} />
        <StatCard title="Active Subscribers" value="982" icon={<Send size={20} />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-semibold">Compose Notification</h2>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Fresh harvest this week!" /></div>
            <div><Label>Message</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Write your notification message..." /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Audience</Label><select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary">{audiences.map((a) => <option key={a}>{a}</option>)}</select></div>
              <div><Label>Schedule</Label><select className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary"><option>Send now</option><option>Tomorrow 9 AM</option><option>This weekend</option></select></div>
            </div>
            <Button className="w-full" size="lg" onClick={send}>{sent ? <><TickCircle size={16} /> Sent!</> : <><Send size={16} /> Send Notification</>}</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-semibold">Recent Notifications</h2>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${n.type === "Stock" ? "bg-orange-50 text-orange-600" : "bg-lightgreen text-primary"}`}>{iconMap[n.type]}</span>
                <div className="flex-1"><p className="text-sm font-medium">{n.title}</p><p className="text-xs text-muted">{n.time}</p></div>
                {n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
