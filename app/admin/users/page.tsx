"use client";
import { users } from "@/data/mock";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/stat-card";
import { ShieldTick, User, Shield } from "iconsax-react";

export default function UsersAdmin() {
  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Users</h1><p className="text-sm text-muted">Manage system users and roles.</p></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Users" value={String(users.length)} icon={<User size={20} />} />
        <StatCard title="Admins" value={String(users.filter((u) => u.role === "ADMIN").length)} icon={<Shield size={20} />} />
        <StatCard title="Customers" value={String(users.filter((u) => u.role === "CUSTOMER").length)} icon={<ShieldTick size={20} />} />
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">User</th><th className="px-4 py-3 font-semibold">Role</th><th className="px-4 py-3 font-semibold">Phone</th><th className="px-4 py-3 font-semibold">Joined</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar src={u.avatar} name={u.name} size={34} /><div><p className="font-medium">{u.name}</p><p className="text-xs text-muted">{u.email}</p></div></div></td>
                  <td className="px-4 py-3"><Badge tone={u.role === "ADMIN" ? "purple" : "green"}>{u.role}</Badge></td>
                  <td className="px-4 py-3 text-muted">{u.phone}</td>
                  <td className="px-4 py-3 text-muted">{u.createdAt}</td>
                  <td className="px-4 py-3"><StatusBadge status="Active" /></td>
                  <td className="px-4 py-3 text-right"><button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:text-primary">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
