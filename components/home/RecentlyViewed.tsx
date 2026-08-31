"use client";
import { Clock } from "iconsax-react";
import { useHistory } from "@/stores/history";
import { useLanguage } from "@/stores/language";
import { Rail } from "./Rail";

export function RecentlyViewed() {
  const ids = useHistory((s) => s.recentlyViewed);
  const { t } = useLanguage();
  if (!ids.length) return null;
  return (
    <div className="bg-bg">
      <Rail
        eyebrow={<><Clock size={13} className="text-accent" /> {t("recently.eyebrow")}</>}
        title={<>{t("recently.title1")}<span className="text-secondary">{t("recently.title2")}</span></>}
        subtitle={t("recently.subtitle")}
        ids={ids}
        viewAllHref="/shop"
      />
    </div>
  );
}