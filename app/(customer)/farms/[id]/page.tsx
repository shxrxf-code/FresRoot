"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Location, Star, Tree, Verify, Call, User as UserIcon } from "iconsax-react";
import { farms, products } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/stores/language";

export default function FarmDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const farm = farms.find((f) => f.id === id) || farms[0];
  const farmProducts = products.filter((p) => p.farmId === farm.id);

  return (
    <div className="w-full px-6 py-8 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="relative h-56 overflow-hidden rounded-3xl sm:h-72">
        <Image src={farm.image} alt={farm.name} fill unoptimized sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">{farm.name}</h1>
          <p className="mt-1 flex items-center gap-2 text-white/90"><Location size={15} /> {farm.location}, UAE</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h2 className="mb-4 font-semibold">{t("farmd.about")}</h2>
            <p className="text-sm text-muted">{farm.bio}</p>
            <div className="mt-4 space-y-2.5 text-sm">
              <p className="flex items-center gap-2 text-muted"><UserIcon size={15} className="text-primary" /> <span><strong className="text-ink">{t("farmd.farmer")}</strong> {farm.farmer}</span></p>
              <p className="flex items-center gap-2 text-muted"><Tree size={15} className="text-primary" /> <span><strong className="text-ink">{t("farmd.method")}</strong> {farm.farmingMethod}</span></p>
              <p className="flex items-center gap-2 text-muted"><Call size={15} className="text-primary" /> <span>+971 5x xxx xxxx</span></p>
              <p className="flex items-center gap-2 text-muted"><Star size={15} className="text-primary" /> <span className="font-medium text-ink">{t("farmd.reviewsRating", { rating: String(farm.rating), n: farm.reviews })}</span></p>
            </div>
            <div className="mt-4 border-t border-border pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-ink"><Verify size={15} className="text-secondary" /> {t("farmd.certifications")}</p>
              <div className="flex flex-wrap gap-1.5">{farm.certifications.map((c) => <Badge key={c} tone="green">{c}</Badge>)}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h3 className="mb-3 font-semibold">{t("farmd.harvestInfo")}</h3>
            <div className="space-y-2 text-sm text-muted">
              <p className="flex justify-between"><span>{t("farmd.vegetables")}</span><span className="font-medium text-ink">{t("farmd.harvestedToday")}</span></p>
              <p className="flex justify-between"><span>{t("farmd.fruits")}</span><span className="font-medium text-ink">{t("farmd.harvestedToday")}</span></p>
              <p className="flex justify-between"><span>{t("farmd.leafyGreens")}</span><span className="font-medium text-ink">{t("farmd.harvestedToday")}</span></p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-primary">{t("farmd.productsFrom")}</h2>
            <span className="text-sm text-muted">{t("farmd.productsCount", { n: farmProducts.length })}</span>
          </div>
          {farmProducts.length === 0 ? (
            <p className="rounded-2xl border border-dashed bg-white p-10 text-center text-muted">{t("farmd.noProducts")}</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {farmProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}