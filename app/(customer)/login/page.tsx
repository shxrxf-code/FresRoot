"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Message, Lock, ArrowLeft, ArrowRight, Refresh, Home } from "iconsax-react";
import { LogoImage } from "@/components/ui/LogoImage";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/auth";
import { useLanguage } from "@/stores/language";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const { t, isRTL } = useLanguage();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [ping, setPing] = React.useState(false);

  const doLogin = (email: string, password: string) => {
    setLoading(true); setError("");
    setTimeout(() => {
      const u = login(email, password);
      setLoading(false);
      if (u) {
        if (u.role === "ADMIN") router.push("/admin");
        else router.push("/dashboard");
      } else setError(t("login.error"));
    }, 600);
  };

  const quickFill = (email: string) => { setForm({ email, password: "demo123" }); setPing(true); };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Minimal FRESROOT auth header */}
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-6 sm:px-8">
        <Link href="/" aria-label="FRESROOT home" className="flex shrink-0 flex-col leading-none">
          <LogoImage className="h-9 w-[180px]" />
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">{t("nav.tagline")}</span>
        </Link>
        <Link
          href="/"
          className="ms-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-primary/5 hover:text-primary"
        >
          <Home size={16} /> {t("nav.home")}
        </Link>
      </header>

      <div className="grid flex-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-primary p-12 text-white lg:flex">
          <LogoImage light className="h-10 w-[200px]" />
          <div>
            <h2 className="text-4xl font-bold leading-tight">{t("login.heroTitle")}</h2>
            <p className="mt-4 max-w-sm text-emerald-100/80">{t("login.heroSub")}</p>
            <div className="mt-8 space-y-2 text-sm text-emerald-100/70">
              <p>{t("login.hero1")}</p>
              <p>{t("login.hero2")}</p>
              <p>{t("login.hero3")}</p>
            </div>
          </div>
          <p className="text-xs text-emerald-100/50">{t("login.brand")}</p>
        </div>

        <div className="flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-primary">{t("login.welcome")}</h1>
          <p className="mt-1 text-muted">{t("login.subtitle")}</p>

          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); doLogin(form.email, form.password); }}>
            <div><Label>{t("login.email")}</Label><div className="relative"><Message size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" /><Input className="ps-10" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t("login.emailPh")} required /></div></div>
            <div><Label>{t("login.password")}</Label><div className="relative"><Lock size={17} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" /><Input className="ps-10" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t("login.passwordPh")} required /></div></div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>{loading ? <><Refresh size={18} className="animate-spin" /> {t("login.signingIn")}</> : <>{t("login.login")} {isRTL() ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}</>}</Button>
          </form>

          <div className="mt-6 rounded-xl bg-lightgreen/50 p-3 text-xs text-primary">
            <p className="font-semibold">{t("login.demoAccounts")}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button onClick={() => quickFill("customer@fresroot.com")} className="rounded-lg bg-white px-3 py-1.5 text-start hover:shadow-sm">{t("login.customer")}<br /><span className="text-[10px] text-muted">customer@fresroot.com</span></button>
              <button onClick={() => quickFill("admin@fresroot.com")} className="rounded-lg bg-white px-3 py-1.5 text-start hover:shadow-sm">{t("login.admin")}<br /><span className="text-[10px] text-muted">admin@fresroot.com</span></button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted">{t("login.newHere")} <Link href="/signup" className="font-semibold text-primary hover:underline">{t("login.createAccount")}</Link></p>
        </motion.div>
      </div>
      </div>
    </div>
  );
}