"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Box, Heart, Refresh, Tree, ArrowLeft, ArrowRight, Location, Card, Notification, Lifebuoy, User, ShoppingBag, SearchNormal } from "iconsax-react";
import { useAuth } from "@/stores/auth";
import { useWishlist } from "@/stores/wishlist";
import { useLanguage } from "@/stores/language";
import { orders } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/components/ui-utils";
import { Input } from "@/components/ui/input";

const sections = [
  { labelKey: "profile.myOrders", icon: Box, href: "/orders", descKey: "dash.trackReorder", tone: "bg-lightgreen text-primary" },
  { labelKey: "nav.wishlist", icon: Heart, href: "/wishlist", descKey: "dash.savedFavourites", tone: "bg-red-50 text-red-500" },
  { labelKey: "dash.addresses", icon: Location, href: "/addresses", descKey: "dash.manageDelivery", tone: "bg-blue-50 text-blue-600" },
  { labelKey: "pay.title", icon: Card, href: "/payment-methods", descKey: "dash.cardsWallets", tone: "bg-amber-50 text-amber-600" },
  { labelKey: "nav.subscriptions", icon: Refresh, href: "/subscriptions", descKey: "dash.farmBoxes", tone: "bg-lightgreen text-primary" },
  { labelKey: "dash.greenPoints", icon: Tree, href: "/profile", descKey: "dash.rewards", tone: "bg-emerald-50 text-emerald-700" },
  { labelKey: "notif.title", icon: Notification, href: "/notifications", descKey: "dash.updatesAlerts", tone: "bg-purple-50 text-purple-600" },
  { labelKey: "nav.profile", icon: User, href: "/profile", descKey: "dash.editDetails", tone: "bg-slate-100 text-slate-700" },
  { labelKey: "profile.helpSupport", icon: Lifebuoy, href: "/contact", descKey: "dash.here247", tone: "bg-rose-50 text-rose-600" },
];

export default function DashboardPage() {
  const user = useAuth((s) => s.user);
  const wishCount = useWishlist((s) => s.items.length);
  const { t, isRTL } = useLanguage();
  const [q, setQ] = React.useState("");

  const myOrders = orders.filter((o) => o.customerId === user?.id || !user);
  const activeSubs = user?.id === "u1" ? 1 : user ? 0 : 0;
  const points = user?.greenPoints || 0;

  if (!user) {
    return <div className="mx-auto max-w-md px-4 py-24 text-center"><h1 className="text-2xl font-bold">{t("profile.pleaseSignIn")}</h1><Link href="/login" className="mt-3 inline-block text-primary">{t("profile.goToLogin")}</Link></div>;
  }

  return (
    <div className="w-full px-4 pb-14 pt-6 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{t("dash.signedIn")}</p>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{t("dash.hi", { name: user.name.split(" ")[0] })}</h1>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("dash.shopFreshToday")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
      </div>

      <div className="relative mt-5 max-w-xl">
        <SearchNormal size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) window.location.href = `/shop/?q=${encodeURIComponent(q)}`; }} placeholder={t("dash.searchPlaceholder")} className="h-12 rounded-2xl ps-11 shadow-soft" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { v: myOrders.length, lk: "dash.orders", href: "/orders" },
          { v: wishCount, lk: "dash.wishlistItems", href: "/wishlist" },
          { v: activeSubs, lk: "dash.activeSubscription", href: "/subscriptions" },
          { v: `${points} pts`, lk: "dash.greenPoints", href: "/profile" },
        ].map((s, i) => (
          <Link key={s.lk} href={s.href} className="group rounded-2xl border border-border bg-white p-5 shadow-soft transition-all hover:border-primary/30 hover:shadow-card">
            <p className="text-2xl font-extrabold text-primary">{s.v}</p>
            <p className="mt-1 text-sm text-muted">{t(s.lk)}</p>
            {isRTL() ? <ArrowLeft size={15} className="mt-2 text-muted opacity-0 transition-opacity group-hover:opacity-100" /> : <ArrowRight size={15} className="mt-2 text-muted opacity-0 transition-opacity group-hover:opacity-100" />}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-5 text-xl font-extrabold tracking-tight text-primary sm:text-2xl">{t("dash.myAccount")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5" style={{ gridAutoFlow: "dense" }}>
          {sections.map((s, i) => (
            <motion.div key={s.labelKey} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.04 }} className={cn("xl:[&:nth-child(10)]:col-span-2")}>
              <Link href={s.href} className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card">
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl", s.tone)}><s.icon size={20} /></span>
                <span>
                  <span className="block font-semibold text-ink">{t(s.labelKey)}</span>
                  <span className="block text-xs text-muted">{t(s.descKey)}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">{t("dash.recentOrders")}</h2>
          <Link href="/orders" className="text-sm font-semibold text-primary hover:underline">{t("dash.seeAll")}</Link>
        </div>
        <div className="space-y-3">
          {myOrders.slice(0, 3).map((o) => (
            <Link key={o.id} href={`/orders/${o.id}`} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft transition-shadow hover:shadow-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lightgreen text-primary"><ShoppingBag size={20} /></span>
              <div className="flex-1">
                <p className="font-semibold text-ink">#{o.id}</p>
                <p className="text-xs text-muted">{o.createdAt} · {o.deliverySlot} · {t("orders.items", { n: o.items.length })}</p>
              </div>
              <StatusBadge status={o.orderStatus} />
              <span className="hidden font-bold text-ink sm:block">AED {o.total}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}