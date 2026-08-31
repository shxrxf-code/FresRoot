"use client";
import * as React from "react";
import { products, categories } from "@/data/mock";
import { useHistory } from "@/stores/history";
import { useLanguage } from "@/stores/language";
import { Rail } from "./Rail";

export function RecommendedForYou() {
  const viewed = useHistory((s) => s.recentlyViewed);
  const { t } = useLanguage();
  const ids = React.useMemo(() => {
    const viewedCats = new Set(viewed.map((id) => products.find((p) => p.id === id)?.category).filter(Boolean) as string[]);
    const used = new Set<string>([...viewed]);
    const picks: string[] = [];
    const push = (id: string) => {
      if (!used.has(id)) {
        used.add(id);
        picks.push(id);
      }
    };
    for (const c of categories) {
      if (!viewedCats.has(c.name)) continue;
      for (const p of products) if (p.category === c.name) push(p.id);
    }
    for (const p of products) if (p.badges.includes("Best Seller") || p.rating >= 4.8) push(p.id);
    for (const p of products) push(p.id);
    return picks.slice(0, 10);
  }, [viewed]);

  if (!viewed.length) return null;
  return (
    <div className="bg-white border-t border-border">
      <Rail
        eyebrow={t("recommended.eyebrow")}
        title={<>{t("recommended.title1")}<span className="text-secondary">{t("recommended.title2")}</span></>}
        subtitle={t("recommended.subtitle")}
        ids={ids}
        viewAllHref="/shop"
      />
    </div>
  );
}