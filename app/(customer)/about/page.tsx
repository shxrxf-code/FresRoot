"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tree, ShieldTick, Heart } from "iconsax-react";
import { useLanguage } from "@/stores/language";

const pillars = [
  { titleKey: "about.directTitle", descKey: "about.directDesc", Icon: Tree },
  { titleKey: "about.naturalTitle", descKey: "about.naturalDesc", Icon: Tree },
  { titleKey: "about.qualityTitle", descKey: "about.qualityDesc", Icon: ShieldTick },
  { titleKey: "about.careTitle", descKey: "about.careDesc", Icon: Heart },
];

const bullets = ["about.bullet1", "about.bullet2", "about.bullet3", "about.bullet4"];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="w-full px-6 py-12 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <h1 className="text-4xl font-bold text-primary">{t("about.title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("about.subtitle")}</p>
      </motion.div>

      <div className="mt-10 overflow-hidden rounded-3xl">
        <Image src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=70" alt={t("about.altHero")} width={1400} height={500} unoptimized className="h-72 w-full object-cover sm:h-96" />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ titleKey, descKey, Icon }, i) => (
          <motion.div key={titleKey} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lightgreen text-primary"><Icon size={22} /></span>
            <h3 className="mt-4 font-semibold">{t(titleKey)}</h3>
            <p className="mt-1 text-sm text-muted">{t(descKey)}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-primary">{t("about.knowFood")}</h2>
          <p className="mt-4 text-muted">{t("about.knowDesc")}</p>
          <ul className="mt-6 space-y-3 text-sm">
            {bullets.map((b) => <li key={b} className="flex items-center gap-2 font-medium text-ink"><span className="grid h-6 w-6 place-items-center rounded-full bg-secondary/20 text-secondary">✓</span>{t(b)}</li>)}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600" alt={t("about.altFarming")} width={400} height={300} unoptimized className="h-48 w-full rounded-2xl object-cover" />
          <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600" alt={t("about.altProduce")} width={400} height={300} unoptimized className="mt-6 h-48 w-full rounded-2xl object-cover" />
        </div>
      </div>
    </div>
  );
}