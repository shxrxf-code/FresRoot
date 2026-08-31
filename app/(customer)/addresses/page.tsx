"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Add, Trash, TickCircle } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/components/ui-utils";
import { useLanguage } from "@/stores/language";

const initialAddresses = [
  { id: "a1", type: "Home", icon: Home, line: "42, Lakeview Avenue, Al Barari", city: "Dubai", pincode: "Al Barari" },
  { id: "a2", type: "Office", icon: Briefcase, line: "3rd Floor, Tech Park, Dubai Marina", city: "Dubai", pincode: "Dubai Marina" },
];

export default function AddressesPage() {
  const { t } = useLanguage();
  const [addresses, setAddresses] = React.useState(initialAddresses);
  const [def, setDef] = React.useState("a1");
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ type: "Home", line: "", city: "Dubai", pincode: "" });

  const typeLabel = (tpe: string) => (tpe === "Home" ? t("addr.home") : tpe === "Office" ? t("addr.office") : t("addr.other"));

  const add = () => {
    if (!form.line) return;
    setAddresses([...addresses, { id: "a" + Date.now(), type: form.type, icon: form.type === "Office" ? Briefcase : Home, line: form.line, city: form.city, pincode: form.pincode }]);
    setOpen(false); setForm({ type: "Home", line: "", city: "Dubai", pincode: "" });
  };
  const remove = (id: string) => setAddresses(addresses.filter((a) => a.id !== id));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">{t("addr.title")}</h1>
        <Button size="sm" onClick={() => setOpen(true)}><Add size={16} /> {t("addr.addNew")}</Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <motion.div key={a.id} layout className={cn("rounded-2xl border bg-white p-5 shadow-soft", def === a.id ? "border-primary" : "border-border")}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium"><a.icon size={18} className="text-primary" /> {typeLabel(a.type)}</span>
              {def === a.id && <span className="inline-flex items-center gap-1 rounded-full bg-lightgreen px-2.5 py-0.5 text-xs font-medium text-primary"><TickCircle size={12} /> {t("addr.default")}</span>}
            </div>
            <p className="mt-3 text-sm text-muted">{a.line}<br />{a.city}, UAE</p>
            <div className="mt-4 flex gap-2 border-t border-border pt-3">
              <button onClick={() => setDef(a.id)} className="text-sm font-medium text-primary hover:underline">{t("addr.setDefault")}</button>
              <button onClick={() => remove(a.id)} className="ms-auto inline-flex items-center gap-1 text-sm text-red-600 hover:underline"><Trash size={14} /> {t("addr.remove")}</button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={t("addr.modalTitle")}>
        <div className="space-y-4">
          <div><Label>{t("addr.type")}</Label><div className="flex gap-2">{["Home", "Office", "Other"].map((tpe) => <button key={tpe} onClick={() => setForm({ ...form, type: tpe })} className={cn("rounded-xl border px-4 py-2 text-sm font-medium", form.type === tpe ? "border-primary bg-lightgreen/50 text-primary" : "border-border text-muted")}>{typeLabel(tpe)}</button>)}</div></div>
          <div><Label>{t("checkout.address")}</Label><Input value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} placeholder={t("checkout.addressPh")} /></div>
          <div className="grid grid-cols-2 gap-3"><div><Label>{t("checkout.city")}</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div><div><Label>{t("checkout.emirate")}</Label><Input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder={t("checkout.emiratePh")} /></div></div>
          <Button className="w-full" onClick={add}>{t("addr.save")}</Button>
        </div>
      </Modal>
    </div>
  );
}