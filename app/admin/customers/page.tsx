"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { customers } from "@/data/mock";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { DataTable, Column } from "@/components/admin/data-table";
import { StatCard } from "@/components/admin/stat-card";
import { People, UserAdd, Activity, Wallet } from "iconsax-react";

export default function CustomersAdmin() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const sel = customers.find((c) => c.id === selected);

  const columns: Column<(typeof customers)[0]>[] = [
    { key: "name", header: "Customer", render: (r) => <div className="flex items-center gap-3"><Avatar src={`https://i.pravatar.cc/100?u=${r.id}`} name={r.name} size={34} /><div><p className="font-medium">{r.name}</p><p className="text-xs text-muted"><UserAdd size={11} className="inline mr-0.5" />{r.email}</p></div></div> },
    { key: "phone", header: "Phone" },
    { key: "orders", header: "Orders" },
    { key: "totalSpent", header: "Total Spent", render: (r) => `AED ${r.totalSpent}` },
    { key: "subscription", header: "Subscription", render: (r) => r.subscription === "-" ? <span className="text-muted">—</span> : <StatusBadge status="Active" /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "joined", header: "Joined" },
  ];

  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Customers</h1><p className="text-sm text-muted">Manage your customer base.</p></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Customers" value="982" delta="14.3%" icon={<People size={20} />} />
        <StatCard title="New This Month" value="64" delta="9.2%" icon={<UserAdd size={20} />} />
        <StatCard title="Active Subscribers" value="356" delta="12.6%" icon={<Activity size={20} />} />
        <StatCard title="Avg Spend" value="AED 1,240" delta="6.1%" icon={<Wallet size={20} />} />
      </div>
      <DataTable columns={columns} data={customers} searchPlaceholder="Search customers by name, email..." searchKeys={["name", "email"]} />
    </div>
  );
}
