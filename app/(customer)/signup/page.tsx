"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Message, Call, Lock, ArrowLeft, ArrowRight } from "iconsax-react";
import { LogoImage } from "@/components/ui/LogoImage";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/auth";
import { useLanguage } from "@/stores/language";

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuth((s) => s.signup);
  const { t, isRTL } = useLanguage();
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError(t("signup.passMismatch")); return; }
    if (form.password.length < 6) { setError(t("signup.passShort")); return; }
    signup(form.name, form.email, form.phone, form.password);
    router.push("/dashboard");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-12 text-white lg:flex">
        <LogoImage light className="h-10 w-[200px]" />
        <div><h2 className="text-4xl font-bold leading-tight">{t("signup.welcome")}</h2><p className="mt-4 max-w-sm text-emerald-100/80">{t("signup.welcomeSub")}</p></div>
        <p className="text-xs text-emerald-100/50">{t("login.brand")}</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><LogoImage className="h-9 w-[180px]" /></div>
          <h1 className="text-2xl font-bold text-primary">{t("signup.createTitle")}</h1>
          <p className="mt-1 text-muted">{t("signup.createSub")}</p>
          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div><Label>{t("signup.fullName")}</Label><div className="relative"><User size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" /><Input className="ps-10" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("signup.namePh")} required /></div></div>
            <div><Label>{t("signup.email")}</Label><div className="relative"><Message size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" /><Input className="ps-10" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t("signup.emailPh")} required /></div></div>
            <div><Label>{t("signup.phone")}</Label><div className="relative"><Call size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" /><Input className="ps-10" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t("signup.phonePh")} required /></div></div>
            <div className="grid grid-cols-2 gap-3"><div><Label>{t("signup.password")}</Label><div className="relative"><Lock size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" /><Input className="ps-10" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t("login.passwordPh")} required /></div></div><div><Label>{t("signup.confirm")}</Label><Input className="ps-3" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder={t("login.passwordPh")} required /></div></div>
            <Button type="submit" className="w-full" size="lg">{t("signup.create")} {isRTL() ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">{t("signup.haveAccount")} <Link href="/login" className="font-semibold text-primary hover:underline">{t("signup.signIn")}</Link></p>
        </motion.div>
      </div>
    </div>
  );
}