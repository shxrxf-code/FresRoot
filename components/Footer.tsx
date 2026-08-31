"use client";
import Link from "next/link";
import { Instagram, Facebook, Youtube } from "iconsax-react";
import { LogoImage } from "./ui/LogoImage";
import { useLanguage } from "@/stores/language";

const columns = [
  { title: "footer.company", links: [{ l: "footer.aboutUs", h: "/about" }, { l: "footer.ourFarms", h: "/farms" }, { l: "footer.contactUs", h: "/contact" }, { l: "footer.careers", h: "/about" }] },
  { title: "footer.shop", links: [{ l: "footer.vegetables", h: "/shop/vegetables" }, { l: "footer.fruits", h: "/shop/fruits" }, { l: "footer.herbs", h: "/shop/herbs" }, { l: "footer.millets", h: "/shop/millets" }, { l: "footer.farmBoxes", h: "/shop/farm-boxes" }] },
  { title: "footer.support", links: [{ l: "footer.helpCenter", h: "/contact" }, { l: "footer.delivery", h: "/about" }, { l: "footer.returns", h: "/about" }, { l: "footer.privacy", h: "/about" }, { l: "footer.terms", h: "/about" }] },
];

export function Footer() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <footer className="mt-4 border-t border-border bg-white" style={{ backgroundColor: "#0F3D21", color: "#cfeee0", border: "none" }}>
      <div className="mx-auto w-full px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoImage light className="h-9 w-[170px]" />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100/60">{t("footer.tagline")}</p>
            <p className="mt-3 max-w-xs text-sm text-emerald-100/70">{t("footer.blurb")}</p>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-secondary hover:text-primary"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 font-semibold text-white">{t(col.title)}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.l}><Link href={l.h} className="text-sm text-emerald-100/70 transition-colors hover:text-secondary">{t(l.l)}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-emerald-100/50">{t("footer.rights", { year: String(new Date().getFullYear()) })}</p>
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-1 py-1">
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${language === "en" ? "bg-secondary text-primary" : "text-emerald-100/70 hover:text-white"}`}
            >EN</button>
            <button
              onClick={() => setLanguage("ar")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${language === "ar" ? "bg-secondary text-primary" : "text-emerald-100/70 hover:text-white"}`}
            >عربي</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
