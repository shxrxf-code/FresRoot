"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { MagicStar } from "iconsax-react";
import { cn } from "@/components/ui-utils";
import { Rail } from "./Rail";
import { useLanguage } from "@/stores/language";

const tabs = [
  { key: "Fresh", label: "rail.freshThisWeek", ids: ["p1", "p3", "p9", "p6", "p7", "p2", "p12"] },
  { key: "Seasonal", label: "rail.seasonal", ids: ["p13", "p24", "p27", "p12", "p9", "p11"] },
  { key: "Farm", label: "rail.farmFreshPicks", ids: ["p22", "p23", "p16", "p17", "p14", "p21", "p26"] },
];

export function ProductRail() {
  const [tab, setTab] = React.useState(tabs[0].key);
  const { t } = useLanguage();

  return (
    <div className="bg-bg">
      <Rail
        eyebrow={<><MagicStar size={13} className="text-accent" /> {t("rail.eyebrow")}</>}
        title={<>{t("rail.freshFrom")}<span className="text-secondary">{t("rail.ourFarms")}</span></>}
        subtitle={t("rail.subtitle")}
        ids={tabs.find((t) => t.key === tab)!.ids}
        viewAllHref="/shop"
      >
        <div className="flex rounded-full border border-border bg-white p-1 shadow-soft">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className="relative rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm"
              aria-pressed={tab === tb.key}
            >
              {tab === tb.key && <motion.span layoutId="fresh-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className={cn("relative z-10 whitespace-nowrap", tab === tb.key ? "text-white" : "text-muted hover:text-primary")}>{t(tb.label)}</span>
            </button>
          ))}
        </div>
      </Rail>
    </div>
  );
}