"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Location, Box, Refresh, Heart, Notification, Lifebuoy, Share, Logout, Tree, ArrowLeft2, ArrowRight2, Edit } from "iconsax-react";
import { useAuth } from "@/stores/auth";
import { useLanguage } from "@/stores/language";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const menuItems = [
  { labelKey: "profile.addresses", icon: Location, href: "/addresses" },
  { labelKey: "profile.myOrders", icon: Box, href: "/orders" },
  { labelKey: "profile.mySubscriptions", icon: Refresh, href: "/subscriptions" },
  { labelKey: "profile.wishlist", icon: Heart, href: "/wishlist" },
  { labelKey: "profile.notifications", icon: Notification, href: "/notifications" },
];

export default function ProfilePage() {
  const user = useAuth((s) => s.user);
  const updateProfile = useAuth((s) => s.updateProfile);
  const logout = useAuth((s) => s.logout);
  const { t, isRTL } = useLanguage();
  const router = useRouter();
  const [editOpen, setEditOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });

  const points = user?.greenPoints || 0;
  const nextReward = 500;
  const isAdmin = user?.role === "ADMIN";

  if (!user) {
    return <div className="mx-auto max-w-md px-4 py-24 text-center"><h1 className="text-2xl font-bold">{t("profile.pleaseSignIn")}</h1><Link href="/login" className="mt-3 inline-block text-primary">{t("profile.goToLogin")}</Link></div>;
  }

  const handleSave = () => {
    updateProfile(form);
    setEditOpen(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-primary p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar src={user.avatar} name={user.name} size={72} />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-emerald-100/80">{user.email}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium"><Tree size={13} className="text-secondary" /> {t("profile.greenPoints", { n: points })}</p>
          </div>
          <button onClick={() => { setForm({ name: user.name, email: user.email, phone: user.phone }); setEditOpen(true); }} className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"><Edit size={15} /> {t("profile.edit")}</button>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-emerald-100/80"><span>{t("profile.pointsProgress", { a: points, b: nextReward })}</span><span className="font-medium text-secondary">{t("profile.ptsToReward", { n: nextReward - points })}</span></div>
          <div className="mt-2 h-2 rounded-full bg-white/15"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, (points / nextReward) * 100)}%` }} transition={{ duration: 1 }} className="h-2 rounded-full bg-secondary" /></div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[{ v: "AED 50", lk: "profile.reward100", c: 100 }, { v: "FREE", lk: "profile.reward250", c: 250 }, { v: "AED 150", lk: "profile.reward500", c: 500 }].map((r, i) => (
          <div key={r.lk} className={`rounded-2xl border p-4 ${points >= r.c ? "border-secondary bg-lightgreen/60" : "border-border bg-white"}`}>
            <p className="text-xl font-bold text-primary">{r.v}</p><p className="text-sm text-muted">{t(r.lk)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {menuItems.map((m) => (
          <Link key={m.labelKey} href={m.href} className="group flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:border-primary/30 hover:shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-lightgreen text-primary"><m.icon size={20} /></span>
            <span className="flex-1 font-medium">{t(m.labelKey)}</span>
            {isRTL() ? <ArrowLeft2 size={18} className="text-muted transition-transform group-hover:-translate-x-0.5" /> : <ArrowRight2 size={18} className="text-muted transition-transform group-hover:translate-x-0.5" />}
          </Link>
        ))}
        <div className="flex gap-3">
          <Link href="/contact" className="group flex flex-1 items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:border-primary/30 hover:shadow-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-lightgreen text-primary"><Lifebuoy size={20} /></span><span className="font-medium">{t("profile.helpSupport")}</span></Link>
          <Link href="/addresses" className="group flex flex-1 items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:border-primary/30 hover:shadow-card"><span className="grid h-11 w-11 place-items-center rounded-xl bg-lightgreen text-primary"><Share size={20} /></span><span className="font-medium">{t("profile.inviteEarn")}</span></Link>
        </div>
        {isAdmin && <Link href="/admin" className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft"><Button className="flex-1" variant="outline">{t("profile.adminDashboard")}</Button></Link>}
        <button onClick={() => { logout(); router.push("/"); }} className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 transition-colors hover:bg-red-100"><Logout size={20} /> <span className="font-medium">{t("profile.logout")}</span></button>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={t("profile.editProfile")}>
        <div className="space-y-4">
          <div><Label>{t("profile.fullName")}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>{t("profile.email")}</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><Label>{t("profile.phone")}</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <Button className="w-full" onClick={handleSave}>{t("profile.saveChanges")}</Button>
        </div>
      </Modal>
    </div>
  );
}