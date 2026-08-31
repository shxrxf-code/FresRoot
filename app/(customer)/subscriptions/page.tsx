"use client";
import Image from "next/image";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TickCircle, CalendarTick, Pause, Play, Next, Setting2, Location, Tree, ArrowRotateLeft, CloseCircle } from "iconsax-react";
import { subscriptionPlans, subscriptions } from "@/data/mock";
import { useAuth } from "@/stores/auth";
import { useLanguage } from "@/stores/language";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/components/ui-utils";

type Manage = Record<string, { paused?: boolean; skipped?: boolean; modified?: boolean; cancelled?: boolean }>;

export default function SubscriptionsPage() {
  const user = useAuth((s) => s.user);
  const { t } = useLanguage();
  const [mySubs, setMySubs] = React.useState(subscriptions.slice(0, user?.id === "u1" ? 1 : 0));
  const [manage, setManage] = React.useState<Manage>({});
  const [toast, setToast] = React.useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const subscribe = (planId: string) => {
    const plan = subscriptionPlans.find((p) => p.id === planId)!;
    const existing = mySubs.find((s) => s.plan === plan.name);
    if (existing) {
      if (manage[`sub-new-${plan.id}`]?.paused) {
        toggle(`sub-new-${plan.id}`, "paused");
      }
      return;
    }
    setMySubs((s) => [
      {
        id: `sub-new-${plan.id}`,
        customerId: user?.id ?? "u1",
        customer: user?.name ?? "You",
        plan: plan.name,
        frequency: plan.per === "month" ? t("subsp.monthly") : t("subsp.weekly"),
        price: plan.price,
        nextDelivery: plan.deliveryDay,
        status: "Active",
        deliveryDay: plan.deliveryDay,
        items: plan.items,
      },
      ...s,
    ]);
    notify(t("subsp.subscribeSuccess", { plan: plan.name }));
  };

  const toggle = (id: string, key: keyof Manage[string]) => {
    setManage((m) => ({ ...m, [id]: { ...m[id], [key]: !m[id]?.[key] } }));
    const sub = mySubs.find((s) => s.id === id);
    const action =
      key === "paused" ? (manage[id]?.paused ? t("subsp.toastResumed") : t("subsp.paused"))
      : key === "skipped" ? t("subsp.toastSkip")
      : key === "modified" ? t("subsp.itemsUpdated")
      : t("subsp.cancelled");
    notify(`${sub?.plan ?? t("subsp.plan")} ${action}.`);
  };

  const cancel = (id: string) => {
    setMySubs((s) => s.filter((x) => x.id !== id));
    notify(t("subsp.cancelMsg"));
  };

  return (
    <div className="w-full px-4 pb-14 pt-5 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
      <div className="rounded-3xl bg-primary p-8 text-white sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-emerald-100/80">{t("subsp.title")}</p>
            <h1 className="mt-1 text-balance text-3xl font-extrabold sm:text-4xl">{t("sub.title")}{t("sub.title2")}</h1>
            <p className="mt-2 max-w-lg text-emerald-100/80">{t("subsp.subtitle")}</p>
          </div>
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10"><Tree size={32} className="text-secondary" /></span>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subscriptionPlans.map((p, i) => {
          const active = mySubs.some((s) => s.plan === p.name && !manage[`sub-new-${p.id}`]?.cancelled);
          const managing = manage[`sub-new-${p.id}`];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <div className="relative h-36">
                <Image src={p.img} alt={p.name} fill unoptimized sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 to-transparent" />
                <h3 className="absolute bottom-3 left-4 text-lg font-semibold text-white">{p.name}</h3>
                <span className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-primary">{p.save}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm text-muted">{p.desc}</p>
                <div className="mt-3 space-y-1.5">
                  {p.items.map((it) => <p key={it} className="flex items-center gap-2 text-sm text-ink"><TickCircle size={15} className="text-secondary" /> {it}</p>)}
                </div>
                <div className="mt-4 mb-4">
                  <span className="text-2xl font-bold text-ink">AED {p.price}</span>
                  <span className="text-sm text-muted">{p.per === "month" ? t("subsp.perMonth") : t("subsp.perWeek")}</span>
                  <p className="mt-1 text-xs text-muted">{t("subsp.deliveryDay", { day: p.deliveryDay })}</p>
                </div>
                <Button className="mt-auto w-full" variant={active && !managing?.paused ? "secondary" : "primary"} onClick={() => subscribe(p.id)} disabled={active && !managing?.paused && !managing?.cancelled}>
                  {active ? (managing?.paused ? t("subsp.pausedResume") : t("subsp.subscribed")) : t("subsp.subscribe")}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">{t("subsp.mySubscriptions")}</h2>
        {mySubs.length === 0 ? (
          <p className="rounded-2xl border border-dashed bg-white p-10 text-center text-muted">{t("subsp.empty")}</p>
        ) : (
          <div className="space-y-4">
            {mySubs.map((s) => {
              const m = manage[s.id];
              const state = m?.cancelled ? "Cancelled" : m?.paused ? "Paused" : "Active";
              const freq = s.frequency.toLowerCase() === "weekly" ? t("subsp.weekly") : s.frequency.toLowerCase() === "monthly" ? t("subsp.monthly") : s.frequency;
              const arrival = state === "Paused" ? t("subsp.paused") : state === "Cancelled" ? t("subsp.cancelled") : s.deliveryDay;
              return (
                <div key={s.id} className={cn("rounded-2xl border bg-white p-5 shadow-soft transition-colors", m?.cancelled ? "border-border opacity-70" : "border-border")}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{s.plan}</h3>
                      <p className="text-sm text-muted">{freq} · {t("subsp.arrives", { day: arrival })} · AED {s.price}</p>
                    </div>
                    <StatusBadge status={state} />
                  </div>
                  <div className="mt-4 rounded-xl bg-bg p-4 text-sm">
                    <p className="flex items-center gap-2 font-medium text-ink">
                      <CalendarTick size={16} className="text-primary" />
                      {m?.cancelled ? t("subsp.membershipCancelled") : m?.paused ? t("subsp.pausedNoDelivery") : m?.skipped ? t("subsp.nextDeliverySkipped") : t("subsp.nextDelivery", { day: m?.modified ? t("subsp.deliveriesUpdated") : s.nextDelivery })}
                    </p>
                    <p className="mt-2 text-muted">{t("orderd.items")}: {s.items.join(", ")}{m?.modified ? t("subsp.addedExtras") : ""}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {!m?.cancelled && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => toggle(s.id, "paused")}>{m?.paused ? <><Play size={14} /> {t("subsp.resume")}</> : <><Pause size={14} /> {t("subsp.pause")}</>}</Button>
                        <Button size="sm" variant="outline" onClick={() => toggle(s.id, "skipped")} disabled={m?.skipped}><Next size={14} /> {m?.skipped ? t("subsp.skipped") : t("subsp.skipDelivery")}</Button>
                        <Button size="sm" variant="outline" onClick={() => toggle(s.id, "modified")}><Setting2 size={14} /> {m?.modified ? t("subsp.itemsUpdated") : t("subsp.modifyBox")}</Button>
                        <Button size="sm" variant="ghost"><Location size={14} /> {t("subsp.changeAddress")}</Button>
                        <Button size="sm" variant="danger" onClick={() => toggle(s.id, "cancelled")}><CloseCircle size={14} /> {m?.cancelled ? t("subsp.cancelling") : t("subsp.cancel")}</Button>
                      </>
                    )}
                    {m?.cancelled && (
                      <Button size="sm" variant="secondary" onClick={() => toggle(s.id, "cancelled")}><ArrowRotateLeft size={14} /> {t("subsp.restore")}</Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-card">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}