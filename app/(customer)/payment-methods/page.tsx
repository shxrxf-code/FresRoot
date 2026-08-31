"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Add, Trash, ShieldTick } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/components/ui-utils";
import { Modal } from "@/components/ui/modal";
import { useLanguage } from "@/stores/language";

type SavedCard = { id: string; brand: string; last4: string; expiry: string; default: boolean; apple?: boolean; gpay?: boolean };

export default function PaymentMethodsPage() {
  const { t } = useLanguage();
  const [cards, setCards] = React.useState<SavedCard[]>([
    { id: "c1", brand: "Visa", last4: "4242", expiry: "08/27", default: true },
    { id: "c2", brand: "Mastercard", last4: "1881", expiry: "11/26", default: false },
    { id: "c3", brand: "Apple Pay", last4: "wallet", expiry: "—", default: false, apple: true },
    { id: "c4", brand: "Google Pay", last4: "wallet", expiry: "—", default: false, gpay: true },
  ]);
  const [addOpen, setAddOpen] = React.useState(false);
  const [form, setForm] = React.useState({ number: "", expiry: "", cvv: "", holder: "" });

  const addCard = () => {
    const digits = form.number.replace(/\D/g, "");
    if (digits.length < 8) return;
    setCards((c) => [...c, { id: `c-${Date.now()}`, brand: digits.startsWith("4") ? "Visa" : "Mastercard", last4: digits.slice(-4), expiry: form.expiry, default: c.length === 0 }]);
    setAddOpen(false);
    setForm({ number: "", expiry: "", cvv: "", holder: "" });
  };

  const setDefault = (id: string) => setCards((c) => c.map((x) => ({ ...x, default: x.id === id })));
  const remove = (id: string) => setCards((c) => c.filter((x) => x.id !== id));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">{t("pay.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("pay.subtitle")}</p>
        </div>
        <Button onClick={() => setAddOpen(true)}><Add size={16} /> {t("pay.addCard")}</Button>
      </div>

      <div className="mt-8 space-y-3">
        {cards.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={cn("flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-soft", c.default ? "border-primary ring-2 ring-ring" : "border-border")}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-white">
              {c.apple ? <span className="text-lg"></span> : c.gpay ? <span className="text-lg">G</span> : <Card size={22} />}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink">{c.brand}{c.apple || c.gpay ? t("pay.walletSuffix") : ""}{c.default && <span className="ms-2 rounded-full bg-lightgreen px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">{t("pay.default")}</span>}</p>
              <p className="text-sm text-muted">{c.apple || c.gpay ? t("pay.connected") : t("pay.cardDetails", { last4: c.last4, expiry: c.expiry })}</p>
            </div>
            {!c.default && (
              <button onClick={() => remove(c.id)} className="rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600" aria-label={t("pay.removeAria")}><Trash size={17} /></button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-muted">
        <ShieldTick size={18} className="mt-0.5 shrink-0 text-secondary" />
        <p>{t("pay.securityNote")} <em className="text-xs">{t("pay.demoNote")}</em></p>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t("pay.modalTitle")}>
        <div className="space-y-4">
          <div><Label>{t("pay.cardholder")}</Label><Input value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} placeholder={t("pay.cardholderPh")} /></div>
          <div><Label>{t("pay.cardNumber")}</Label><Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} placeholder={t("pay.cardNumberPh")} inputMode="numeric" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>{t("pay.expiry")}</Label><Input value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} placeholder={t("pay.expiryPh")} /></div>
            <div><Label>{t("pay.cvv")}</Label><Input value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} placeholder={t("pay.cvvPh")} inputMode="numeric" /></div>
          </div>
          <Button className="w-full" onClick={addCard} disabled={form.number.replace(/\D/g, "").length < 8}>{t("pay.save")}</Button>
        </div>
      </Modal>
    </div>
  );
}