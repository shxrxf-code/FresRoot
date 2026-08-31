"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, People, Wallet, Repeat, Truck, Warning2, Add, Shop, Ticket, Notification, Box1, DocumentDownload } from "iconsax-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { stats, salesChart, orderDonut, orders, topProducts, customers, farms } from "@/data/mock";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select } from "@/components/admin/data-table";

export default function AdminDashboard() {
  const donut = orderDonut;
  const quickActions = [
    { label: "Add New Product", icon: Add, href: "/admin/products" },
    { label: "Add New Farm", icon: Shop, href: "/admin/farms" },
    { label: "Create New Offer", icon: Ticket, href: "/admin/promotions" },
    { label: "Send Notification", icon: Notification, href: "/admin/notifications" },
    { label: "Update Inventory", icon: Box1, href: "/admin/inventory" },
    { label: "Generate Report", icon: DocumentDownload, href: "/admin/reports" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-ink">Dashboard</h1><p className="text-sm text-muted">Welcome back, Admin!</p></div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d" aria-label="Date range"><option value="7d">Last 7 Days</option><option value="30d">Last 30 Days</option><option value="90d">Last 90 Days</option></Select>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-light"><DocumentDownload size={16} /> Export Report</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} delta={`${stats.totalOrdersDelta}%`} icon={<ShoppingBag size={20} />} />
        <StatCard title="Total Customers" value={stats.totalCustomers.toLocaleString()} delta={`${stats.totalCustomersDelta}%`} icon={<People size={20} />} />
        <StatCard title="Total Revenue" value={`AED ${stats.totalRevenue.toLocaleString()}`} delta={`${stats.totalRevenueDelta}%`} icon={<Wallet size={20} />} />
        <StatCard title="Active Subscriptions" value={stats.activeSubscriptions.toLocaleString()} delta={`${stats.activeSubscriptionsDelta}%`} icon={<Repeat size={20} />} delay={0.1} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-700"><Truck size={20} /></span><div><p className="text-xl font-bold text-ink">{stats.pendingDeliveries}</p><p className="text-xs text-muted">Pending Deliveries</p></div></div>
        <div className="flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-100 text-orange-600"><Warning2 size={20} /></span><div><p className="text-xl font-bold text-ink">{stats.lowStockItems}</p><p className="text-xs text-muted">Low Stock Items</p></div></div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <ChartCard title="Sales Overview" subtitle="Revenue this week" className="lg:col-span-2" action={<Select defaultValue="week"><option value="week">This Week</option><option value="7d">Last 7 Days</option><option value="30d">Last 30 Days</option></Select>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChart} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity={0.35} /><stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} formatter={(v: any) => [`AED ${v}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
            <div><p className="text-lg font-bold text-ink">AED 32.4k</p><p className="text-xs text-muted">Revenue</p></div>
            <div><p className="text-lg font-bold text-ink">1,316</p><p className="text-xs text-muted">Orders</p></div>
            <div><p className="text-lg font-bold text-ink">AED 24.6</p><p className="text-xs text-muted">Avg Order Value</p></div>
          </div>
        </ChartCard>

        <ChartCard title="Order Status" subtitle="Distribution by status">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donut} dataKey="value" nameKey="name" innerRadius={60} outerRadius={85} paddingAngle={3}>
                  {donut.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {donut.map((d) => {
              const pct = Math.round((d.value / donut.reduce((s, x) => s + x.value, 0)) * 100);
              return <div key={d.name} className="flex items-center gap-2 text-sm"><span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} /><span className="flex-1 text-muted">{d.name}</span><span className="font-semibold">{d.value}</span><span className="w-12 text-right text-muted">{pct}%</span></div>;
            })}
          </div>
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <ChartCard title="Recent Orders" className="lg:col-span-3" action={<Link href="/admin/orders" className="text-sm font-medium text-primary hover:underline">View all</Link>}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead><tr className="border-b border-border text-xs text-muted"><th className="py-2 font-semibold">Order</th><th className="py-2 font-semibold">Customer</th><th className="py-2 font-semibold">Date</th><th className="py-2 text-right font-semibold">Amount</th><th className="py-2 pl-3 text-right font-semibold">Status</th></tr></thead>
              <tbody>{orders.slice(0, 5).map((o) => <tr key={o.id} className="border-b border-border last:border-0"><td className="py-3 font-semibold text-primary">#{o.id}</td><td className="py-3">{o.customer}</td><td className="py-3 text-muted">{o.createdAt}</td><td className="py-3 text-right font-medium">AED {o.total}</td><td className="py-3 pl-3 text-right"><StatusBadge status={o.orderStatus} /></td></tr>)}</tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard title="Top Selling Products" className="lg:col-span-2" action={<Link href="/admin/products" className="text-sm font-medium text-primary hover:underline">Products</Link>}>
          <div className="space-y-3">
            {topProducts.map((tp, i) => (
              <div key={tp.product}>
                <div className="flex justify-between text-sm"><span className="font-medium">{tp.product}</span><span className="text-muted">{tp.sold}</span></div>
                <div className="mt-1 h-2 rounded-full bg-bg"><motion.div initial={{ width: 0 }} whileInView={{ width: `${(topProducts[0].revenue - tp.revenue) / topProducts[0].revenue * 100 + 15}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }} className="h-2 rounded-full bg-secondary" /></div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <ChartCard title="Quick Actions" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickActions.map((qa) => (
              <Link key={qa.label} href={qa.href} className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center transition-colors hover:border-primary/40 hover:bg-lightgreen/40">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lightgreen text-primary"><qa.icon size={18} /></span><span className="text-xs font-medium text-muted">{qa.label}</span>
              </Link>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Farm Distribution" subtitle="Active partner farms">
          <div className="space-y-3">
            {farms.slice(0, 4).map((f) => (
              <div key={f.id} className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-lightgreen text-sm font-bold text-primary">{f.name.charAt(0)}</span><div className="flex-1"><p className="text-sm font-medium">{f.name}</p><p className="text-xs text-muted">{f.city}</p></div><StatusBadge status={f.status} /></div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
