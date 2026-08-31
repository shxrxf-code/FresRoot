"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Location, Tree, Verify, ArrowLeft, ArrowRight, ShoppingCart } from "iconsax-react";
import { farms } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/stores/language";

const whyCards = [
  { titleKey: "farmshp.vetted", descKey: "farmshp.vettedDesc" },
  { titleKey: "farmshp.certified", descKey: "farmshp.certifiedDesc" },
  { titleKey: "farmshp.farmGate", descKey: "farmshp.farmGateDesc" },
];

export default function FarmsPage() {
  const { t, isRTL } = useLanguage();
  return (
    <div className="w-full px-6 py-8 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">{t("farmshp.title")}</h1>
        <p className="mt-3 text-muted sm:text-lg">{t("farmshp.subtitle")}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((f, i) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <div className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-shadow hover:shadow-card">
              <Link href={`/farms/${f.id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image src={f.image} alt={f.name} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold">{f.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-white/80"><Location size={13} /> {f.location}, UAE</p>
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 font-medium text-ink"><Star size={15} variant="Bold" className="fill-amber-400 text-amber-400" /> {f.rating} ({f.reviews})</span>
                  <Badge tone={f.status === "Active" ? "green" : "yellow"}>{f.status}</Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{f.bio}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm text-muted">{t("farmshp.productsCount", { n: f.products })}</span>
                  <Link href={`/farms/${f.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">{t("farmshp.viewFarm")} {isRTL() ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
                </div>
                <Link href={`/shop?farm=${f.id}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light">
                  <ShoppingCart size={16} className="text-secondary" /> {t("farmshp.shopThisFarm")}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-lightgreen/50 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-primary"><Verify size={20} /> {t("farmshp.howWeChoose")}</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {whyCards.map(({ titleKey, descKey }) => (
            <div key={titleKey}><p className="flex items-center gap-1.5 font-medium text-ink"><Tree size={14} className="text-secondary" /> {t(titleKey)}</p><p className="mt-1 text-sm text-muted">{t(descKey)}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}