"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchNormal, Box, User, Shop, CloseCircle } from "iconsax-react";
import { products, farms, orders, customers } from "@/data/mock";
import { useLanguage } from "@/stores/language";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [q, setQ] = React.useState("");
  const [tab, setTab] = React.useState<"all" | "products" | "orders" | "customers" | "farms">("all");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setQ("");
      inputRef.current?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const query = q.toLowerCase();
  const results = React.useMemo(() => {
    const out: { label: string; sub: string; href: string; icon: React.ReactNode; type: string }[] = [];
    if (tab === "all" || tab === "products")
      products.filter((p) => p.name.toLowerCase().includes(query) && (query || tab === "products")).slice(0, 4).forEach((p) => out.push({ label: p.name, sub: `${p.category} · AED ${p.price}/${p.unit}`, href: `/product/${p.id}`, icon: <Box size={16} />, type: "Product" }));
    if (tab === "all" || tab === "farms")
      farms.filter((f) => f.name.toLowerCase().includes(query) && (query || tab === "farms")).slice(0, 3).forEach((f) => out.push({ label: f.name, sub: f.location, href: `/farms/${f.id}`, icon: <Shop size={16} />, type: "Farm" }));
    if (tab === "all" || tab === "orders")
      orders.filter((o) => o.id.toLowerCase().includes(query) && (query || tab === "orders")).slice(0, 3).forEach((o) => out.push({ label: `#${o.id}`, sub: `${o.customer} · ${o.orderStatus}`, href: `/admin/orders/${o.id}`, icon: <Box size={16} />, type: "Order" }));
    if (tab === "all" || tab === "customers")
      customers.filter((c) => c.name.toLowerCase().includes(query) && (query || tab === "customers")).slice(0, 3).forEach((c) => out.push({ label: c.name, sub: c.email, href: `/admin/customers/${c.id}`, icon: <User size={16} />, type: "Customer" }));
    return out;
  }, [q, tab]);

  const tabs: { k: typeof tab; label: string }[] = [
    { k: "all", label: t("shop.all") },
    { k: "products", label: t("cmd.products") },
    { k: "orders", label: t("nav.orders") },
    { k: "customers", label: t("cmd.customers") },
    { k: "farms", label: t("cmd.farms") },
  ];
  const typeKey: Record<string, string> = { Product: "cmd.typeProduct", Order: "cmd.typeOrder", Customer: "cmd.typeCustomer", Farm: "cmd.typeFarm" };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-primary/40 p-4 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-16 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-white shadow-card"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <SearchNormal size={18} className="text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("cmd.placeholder")}
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
              />
              <button onClick={onClose} className="grid h-7 w-7 place-items-center rounded-lg hover:bg-primary/5"><CloseCircle size={16} /></button>
            </div>
            <div className="flex gap-1 border-b border-border px-3 py-2">
              {tabs.map((t) => (
                <button key={t.k} onClick={() => setTab(t.k)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${tab === t.k ? "bg-primary text-white" : "text-muted hover:bg-primary/5"}`}>{t.label}</button>
              ))}
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted">{t("cmd.noResults", { q })}</p>
              ) : (
                results.map((r, i) => (
                  <button key={i} onClick={() => { router.push(r.href); onClose(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors hover:bg-primary/5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-lightgreen text-primary">{r.icon}</span>
                    <span className="flex-1"><span className="block text-sm font-medium">{r.label}</span><span className="block text-xs text-muted">{r.sub}</span></span>
                    <span className="rounded bg-bg px-2 py-0.5 text-[10px] font-medium uppercase text-muted">{t(typeKey[r.type])}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
