"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Element, ShoppingBag, People, Box, Box1, Repeat, Truck, Shop, Chart, Ticket, Notification, ShieldTick, Setting2, Logout, Menu, CloseCircle, SearchNormal, type Icon } from "iconsax-react";
import { Logo } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/stores/auth";
import { cn } from "@/components/ui-utils";

interface SidebarItem { href: string; label: string; icon: Icon; exact?: boolean; }

const sections: { label: string; items: SidebarItem[] }[] = [
  { label: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: Element, exact: true }] },
  { label: "Management", items: [
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/customers", label: "Customers", icon: People },
    { href: "/admin/products", label: "Products", icon: Box },
    { href: "/admin/inventory", label: "Inventory", icon: Box1 },
    { href: "/admin/subscriptions", label: "Subscriptions", icon: Repeat },
    { href: "/admin/deliveries", label: "Deliveries", icon: Truck },
    { href: "/admin/farms", label: "Farms", icon: Shop },
  ]},
  { label: "Growth", items: [
    { href: "/admin/reports", label: "Reports", icon: Chart },
    { href: "/admin/promotions", label: "Promotions", icon: Ticket },
    { href: "/admin/notifications", label: "Notifications", icon: Notification },
  ]},
  { label: "System", items: [
    { href: "/admin/users", label: "Users", icon: ShieldTick },
    { href: "/admin/settings", label: "Settings", icon: Setting2 },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAuth((s) => s.user);
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <Link href="/admin" className="text-white"><Logo light /></Link>
        <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-white/70 lg:hidden hover:bg-white/10"><CloseCircle size={20} /></button>
      </div>
      <nav className="no-scrollbar flex-1 space-y-5 overflow-y-auto p-4">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">{s.label}</p>
            <div className="space-y-0.5">
              {s.items.map((it) => {
                const active = isActive(it.href, it.exact);
                return (
                  <Link key={it.href} href={it.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors", active ? "bg-secondary text-primary" : "text-emerald-100/80 hover:bg-white/10 hover:text-white")}>
                    <it.icon size={18} variant={active ? "Bold" : "Linear"} /> {it.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar || "https://i.pravatar.cc/150?img=12"} name={user?.name || "Admin"} size={38} />
          <div className="flex-1 min-w-0"><p className="truncate text-sm font-medium text-white">{user?.name || "Admin User"}</p><p className="truncate text-xs text-emerald-100/60">admin@fresroot.com</p></div>
          <Link href="/" className="grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white" aria-label="Logout" onClick={useAuth.getState().logout}><Logout size={16} /></Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-[#0F3D21] lg:block">{sidebar}</aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0F3D21] lg:hidden">{sidebar}</motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white/80 px-4 backdrop-blur-lg sm:px-6">
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-primary/5 lg:hidden" aria-label="Open menu"><Menu size={22} /></button>
          <div className="flex flex-1 items-center gap-3">
            <h1 className="hidden text-sm font-semibold text-muted sm:block">Admin Console</h1>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-border bg-bg px-3 py-2 text-sm text-muted md:flex"><SearchNormal size={15} /> Search... <kbd className="ml-6 rounded border border-border bg-white px-1.5 text-[10px]">Ctrl K</kbd></div>
              <Link href="/" className="rounded-xl border border-border px-3 py-2 text-sm text-muted hover:text-primary">View Store</Link>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
