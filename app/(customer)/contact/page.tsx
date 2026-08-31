"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Message, Call, Location, Send, TickCircle } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useLanguage } from "@/stores/language";

const infoCards = [
  { Icon: Message, t: "contact.emailLabel", d: "hello@fresroot.com" },
  { Icon: Call, t: "contact.phoneLabel", d: "+971 5x xxx xxxx" },
  { Icon: Location, t: "contact.headOffice", d: "12, Sheikh Zayed Road, Dubai, UAE" },
];

export default function ContactPage() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const { t } = useLanguage();

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl"><h1 className="text-4xl font-bold text-primary">{t("contact.title")}</h1><p className="mt-3 text-muted">{t("contact.subtitle")}</p></div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center">
              <TickCircle size={48} className="text-secondary" />
              <h2 className="mt-4 text-xl font-bold">{t("contact.sent")}</h2>
              <p className="mt-2 text-muted">{t("contact.thanks", { name: form.name || "friend" })}</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><Label>{t("contact.name")}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder={t("contact.namePh")} /></div>
                <div><Label>{t("contact.email")}</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder={t("contact.emailPh")} /></div>
              </div>
              <div><Label>{t("contact.subject")}</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder={t("contact.subjectPh")} /></div>
              <div><Label>{t("contact.message")}</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder={t("contact.messagePh")} /></div>
              <Button type="submit" size="lg"><Send size={16} /> {t("contact.send")}</Button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {infoCards.map(({ Icon, t: k, d }, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lightgreen text-primary"><Icon size={22} /></span>
              <div><p className="font-medium">{t(k)}</p><p className="text-sm text-muted">{d}</p></div>
            </div>
          ))}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft"><p className="font-medium">{t("contact.supportHours")}</p><p className="mt-1 text-sm text-muted">Mon – Sat · 9 AM – 8 PM IST</p></div>
        </div>
      </div>
    </div>
  );
}