"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Add, Minus, Truck, Tree, Location, Star, TickCircle, ShieldTick, Flash, Timer, Home, SearchNormal, CloseSquare, ShoppingBag, ArrowRight, ArrowLeft } from "iconsax-react";
import { products, farms, getProductJourney, qualityChecks, userReviews, deliverySlots } from "@/data/mock";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useHistory } from "@/stores/history";
import { useLanguage } from "@/stores/language";
import { StarRating } from "@/components/ui/star";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { formatAED } from "@/lib/format";
import { cn } from "@/components/ui-utils";

export default function ProductDetail() {
  const { t, isRTL } = useLanguage();
  const { id } = useParams();
  const router = useRouter();

  const tabs = [
    t("product.tabDetails"),
    t("product.tabFarm"),
    t("product.tabQuality"),
    t("product.tabNutrition"),
    t("product.tabReviews"),
    t("product.tabDelivery"),
  ];

  const detailRows = [
    { icon: Truck, label: t("product.sameDayHarvest"), text: t("product.sameDayHarvestText") },
    { icon: ShieldTick, label: t("product.qualityCheckedRow"), text: t("product.qualityCheckedText") },
    { icon: Tree, label: t("product.responsiblyGrown"), text: t("product.responsiblyGrownText") },
  ];
  const product = products.find((p) => p.id === id);
  const add = useCart((s) => s.add);
  const wish = useWishlist((s) => s.items);
  const toggleWish = useWishlist((s) => s.toggle);
  const recentlyViewed = useHistory((s) => s.recentlyViewed);
  const addViewed = useHistory((s) => s.addRecentlyViewed);
  const [qty, setQty] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeImg, setActiveImg] = React.useState(0);
  const [zoomed, setZoomed] = React.useState(false);
  const [showSticky, setShowSticky] = React.useState(false);
  const [adding, setAdding] = React.useState(false);

  const handleAdd = (q: number) => {
    setAdding(true);
    add(product?.id ?? "", q);
    window.setTimeout(() => setAdding(false), 600);
  };

  React.useEffect(() => {
    if (id && products.some((p) => p.id === id)) addViewed(id as string);
  }, [id, addViewed]);

  React.useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) {
    return <div className="w-full px-4 py-20 text-center sm:px-6 lg:px-10 xl:px-14 2xl:px-20"><h1 className="text-2xl font-bold text-ink">{t("product.notFound")}</h1><Link href="/shop" className="mt-4 inline-block text-primary">{t("product.backToShop")}</Link></div>;
  }

  const farm = farms.find((f) => f.id === product.farmId);
  const isWished = wish.includes(product.id);
  const outOfStock = product.stock === "Out of Stock";
  const lowStock = product.stock === "Low Stock";
  const gallery = [
    { src: product.image, alt: product.name, label: t("product.galleryProduct") },
    { src: farm?.image ?? product.image, alt: t("product.galleryGrownAt", { farm: product.farm }), label: t("product.galleryFarm") },
    { src: product.image, alt: t("product.galleryQualityBatch"), label: t("product.galleryBatch") },
  ];
  const journey = getProductJourney(product);
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const viewed = recentlyViewed
    .filter((pid) => pid !== product.id)
    .map((pid) => products.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 4);

  return (
    <div className="w-full px-4 pb-28 pt-5 sm:px-6 lg:px-10 lg:pb-14 xl:px-14 2xl:px-20">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-primary">{t("nav.home")}</Link><span>/</span>
        <Link href="/shop" className="hover:text-primary">{t("nav.shop")}</Link><span>/</span>
        <Link href={`/shop/${product.categorySlug}`} className="hover:text-primary">{product.category}</Link><span>/</span>
        <span className="truncate text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* GALLERY */}
        <div className="min-w-0">
          <div className="lg:sticky lg:top-32">
            <div className="group relative aspect-square overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setZoomed((z) => !z)}
                  className={cn("relative h-full w-full cursor-zoom-in", zoomed && "cursor-zoom-out")}
                >
                  <Image
                    src={gallery[activeImg].src}
                    alt={gallery[activeImg].alt}
                    fill
                    unoptimized
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className={cn(
                      "object-cover transition-transform duration-500",
                      zoomed ? "scale-150" : "group-hover:scale-105"
                    )}
                  />
                </motion.div>
              </AnimatePresence>
              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white">{product.badges[0]}</span>
              <button onClick={() => toggleWish(product.id)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-primary shadow-card backdrop-blur transition-transform hover:scale-110" aria-label={t("card.addToWishlist")}>
                <Heart size={18} variant={isWished ? "Bold" : "Linear"} />
              </button>
              {lowStock && <span className="absolute right-4 top-16 z-10 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">{t("product.lowStockBadge")}</span>}
            </div>

            <div className="mt-3 flex gap-3 overflow-x-auto pb-1 no-scrollbar lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={cn("relative h-[88px] w-[116px] shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition-all lg:h-auto lg:w-auto lg:aspect-[4/3]", activeImg === i ? "border-primary" : "border-border hover:border-primary/40")}>
                  <Image src={g.src} alt={g.alt} fill unoptimized sizes="150px" className="object-cover" />
                  <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StarRating rating={product.rating} size={16} />
            <span className="text-sm text-muted">{product.rating} · <button onClick={() => setActiveTab(4)} className="underline decoration-dotted underline-offset-2 hover:text-primary">{t("product.reviewsJump", { c: String(product.reviews) })}</button></span>
          </div>
          <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">{product.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-4xl font-extrabold text-ink">{formatAED(product.price)}</span>
            <span className="text-lg text-muted">/ {product.unit}</span>
            <span className="ms-1 inline-flex items-center gap-1 rounded-full bg-lightgreen px-2.5 py-1 text-xs font-semibold text-primary"><Tree size={12} /> {product.farmingMethod}</span>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium">
            {outOfStock ? (
              <span className="text-red-600">{t("product.outOfStock")}</span>
            ) : lowStock ? (
              <span className="flex items-center gap-1.5 text-amber-600"><span className="h-2 w-2 rounded-full bg-amber-500" /> {t("product.lowStock", { kg: String(product.stockKg) })}</span>
            ) : (
              <span className="flex items-center gap-1.5 text-primary"><span className="h-2 w-2 rounded-full bg-secondary" /> {t("product.inStock", { kg: String(product.stockKg) })}</span>
            )}
          </p>

          <div className="mt-5 rounded-2xl border border-border bg-white p-4">
            <button onClick={() => router.push(`/farms/${product.farmId}`)} className="flex w-full items-center gap-3 text-start">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lightgreen text-primary"><Location size={19} /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{t("product.grownBy")}<span className="text-primary group-hover:underline">{product.farm}</span></p>
                <p className="truncate text-xs text-muted">{t("product.locationFarm", { location: product.location, method: farm?.farmingMethod ?? product.farmingMethod })}</p>
              </div>
              <span className="flex flex-col items-end gap-1">
                <span className="flex items-center gap-1 text-xs font-medium text-ink"><Star size={12} variant="Bold" className="fill-amber-400 text-amber-400" /> {farm?.rating ?? product.rating}</span>
                <span className="text-[11px] text-muted">{t("product.reviewsJump", { c: String(farm?.reviews ?? product.reviews) })}</span>
              </span>
            </button>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-lightgreen/50 p-3"><p className="flex items-center gap-1.5 text-xs text-muted"><Timer size={13} /> {t("product.harvested")}</p><p className="mt-0.5 font-medium text-primary">{product.harvestDate}</p></div>
              <div className="rounded-xl bg-amber-50 p-3"><p className="flex items-center gap-1.5 text-xs text-muted"><Truck size={13} /> {t("product.expectedDelivery")}</p><p className="mt-0.5 font-medium text-amber-700">{t("product.tomorrowSlot", { slot: deliverySlots[2] })}</p></div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-6 space-y-2.5">
            {detailRows.map((r) => (
              <div key={r.label} className="flex items-start gap-3 text-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-lightgreen text-primary"><r.icon size={16} /></span>
                <div><p className="font-semibold text-ink">{r.label}</p><p className="text-xs text-muted">{r.text}</p></div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 items-center rounded-xl border border-border bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  className="grid h-full w-11 place-items-center rounded-s-lg text-primary transition-colors hover:bg-primary/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={t("product.decrease")}
                >
                  <Minus size={16} />
                </button>
                <span className="w-9 text-center text-base font-bold tabular-nums text-ink" aria-live="polite">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="grid h-full w-11 place-items-center rounded-e-lg text-primary transition-colors hover:bg-primary/5 active:scale-95"
                  aria-label={t("product.increase")}
                >
                  <Add size={16} />
                </button>
              </div>

              <button
                onClick={() => toggleWish(product.id)}
                aria-pressed={isWished}
                aria-label={t("product.wishlist")}
                className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-all active:scale-95",
                  isWished
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-primary hover:bg-primary/5"
                )}
              >
                <Heart size={20} variant={isWished ? "Bold" : "Linear"} />
              </button>
            </div>

            <button
              onClick={() => handleAdd(qty)}
              disabled={outOfStock || adding}
              className="inline-flex h-12 min-w-0 basis-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 lg:basis-auto lg:flex-1"
            >
              {adding ? <Spinner size={16} /> : <ShoppingBag size={18} />}
              {t("product.addToCart")}
            </button>

            <button
              onClick={() => { add(product.id, qty); router.push("/checkout"); }}
              disabled={outOfStock}
              className="inline-flex h-12 min-w-0 basis-full items-center justify-center gap-2 rounded-xl bg-secondary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 lg:basis-auto lg:flex-1"
            >
              <Flash size={17} />
              {t("product.buyNow")}
              {isRTL() ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* JOURNEY */}
      <div className="mt-16 rounded-3xl border border-border bg-white px-6 py-8 shadow-soft sm:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lightgreen px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"><Flash size={13} /> {t("product.traceable")}</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">{t("product.fromFarmToDoor")}</h2>
          <p className="mt-1 text-muted">{t("product.journeySub", { name: product.name.toLowerCase() })}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {journey.map((s, i) => (
            <div key={s.step} className="relative rounded-2xl border border-border bg-bg p-4">
              <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">{s.time}</span>
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-2 font-semibold text-ink">{s.step}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</p>
              {i < journey.length - 1 && <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-muted lg:block">›</span>}
            </div>
          ))}
        </div>
        <p className="mt-5 flex items-center gap-2 text-xs text-muted"><Home size={13} className="text-primary" /> {t("product.journeyNote", { city: "Dubai, UAE" })}</p>
      </div>

      {/* TABS */}
      <div className="mt-12 rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7">
        <div className="flex gap-1.5 overflow-x-auto border-b border-border pb-3 no-scrollbar">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)} className={cn("shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors", activeTab === i ? "bg-primary text-white" : "text-muted hover:bg-primary/5")}>{t}</button>
          ))}
        </div>
        <div className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {activeTab === 0 && (
                <div className="space-y-3 text-sm leading-relaxed text-muted">
                  <p>{product.description}</p>
                  <p>{t("product.detailsGrown", { location: product.location, method: product.farmingMethod.toLowerCase() })}</p>
                  <p>{t("product.detailsAvailable", { unit: product.unit, kg: String(product.stockKg), date: product.harvestDate.toLowerCase() })}</p>
                </div>
              )}
              {activeTab === 1 && farm && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={farm.image} alt={farm.name} fill unoptimized sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-ink">{farm.name}</h4>
                    <p className="text-sm text-muted">{t("product.farmBy", { farmer: farm.farmer, location: farm.location })}</p>
                    <p className="mt-2 rounded-xl bg-lightgreen/50 p-3 text-sm text-muted">“{farm.bio}”</p>
                    <p className="mt-3 text-sm text-muted">{t("product.methodLabel")}<span className="font-medium text-ink">{farm.farmingMethod}</span></p>
                    <p className="mt-1 text-sm text-muted">{t("product.productsLabel")}<span className="font-medium text-ink">{t("product.varieties", { n: String(farm.products) })}</span> · {t("product.rated")} <StarRating rating={farm.rating} size={12} /> {farm.rating}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{farm.certifications.map((c) => <Badge key={c} tone="gray">{c}</Badge>)}</div>
                    <Link href={`/farms/${farm.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">{t("product.visitFarm")} <span aria-hidden>{isRTL() ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</span></Link>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                  <div className="space-y-2">
                    {qualityChecks.map((c, i) => (
                      <div key={c} className="flex items-center gap-2.5 rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary/15 text-secondary"><TickCircle size={14} /></span>
                        <span className="font-medium text-ink">{c}</span>
                        <span className="ms-auto text-xs font-bold text-secondary">{100 - i * 6}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-border bg-bg p-5">
                    <h4 className="flex items-center gap-2 font-semibold text-ink"><SearchNormal size={16} className="text-primary" /> {t("product.qualityReport")}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{t("product.qualityReportDesc", { n: String(qualityChecks.length), date: product.harvestDate.toLowerCase() })}</p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted"><span>{t("product.freshnessIndex")}</span><span className="font-bold text-secondary">98 / 100</span></div>
                      <div className="mt-1.5 h-2.5 rounded-full bg-border"><div className="h-2.5 rounded-full bg-secondary" style={{ width: "98%" }} /></div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 3 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {[...product.nutrition, { label: t("product.netQty"), value: product.unit }].map((n) => (
                    <div key={n.label} className="rounded-2xl bg-lightgreen/50 p-5 text-center">
                      <p className="text-xl font-extrabold text-primary">{n.value}</p>
                      <p className="mt-1 text-xs text-muted">{n.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 4 && (
                <div className="space-y-4">
                  {userReviews.map((r, i) => (
                    <div key={i} className="rounded-2xl border border-border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-ink">{r.name}</p>
                        <span className="rounded-full bg-bg px-2.5 py-1 text-[11px] text-muted">{r.location}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2"><StarRating rating={r.rating} /><span className="text-xs text-muted">{r.date}</span></div>
                      <p className="mt-2 text-sm text-muted">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 5 && (
                <div className="space-y-4 text-sm text-muted">
                  <div className="rounded-2xl border border-border p-4"><p className="flex items-center gap-2 font-semibold text-ink"><Truck size={16} className="text-primary" /> {t("product.deliverySlots", { s1: deliverySlots[2], s2: deliverySlots[3] })}</p><p className="mt-1">{t("product.freeDeliveryAbove")}</p></div>
                  <div className="rounded-2xl border border-border p-4"><p className="flex items-center gap-2 font-semibold text-ink"><Tree size={16} className="text-primary" /> {t("product.coldChainPackaging")}</p><p className="mt-1">{t("product.coldChainDesc")}</p></div>
                  <div className="rounded-2xl border border-border p-4"><p className="flex items-center gap-2 font-semibold text-ink"><Location size={16} className="text-primary" /> {t("product.coveredAreas")}</p><p className="mt-1">{t("product.coveredAreasDesc")}</p></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Similar products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">{t("product.similar")}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      )}

      {/* Recently viewed */}
      {viewed.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">{t("product.recentlyViewed")}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">{viewed.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      )}

      {/* MOBILE STICKY PURCHASE BAR */}
      <AnimatePresence>
        {showSticky && !outOfStock && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-x-0 bottom-20 z-50 px-3 lg:hidden"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-2.5 shadow-card">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-bg">
                <Image src={product.image} alt={product.name} fill unoptimized sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                <p className="text-sm font-bold text-primary">{formatAED(product.price * qty)} <span className="text-[11px] font-normal text-muted">× {qty} · {product.unit}</span></p>
              </div>
              <button onClick={() => handleAdd(qty)} disabled={adding} className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70" aria-label={t("wish.addToCart")}>
                {adding ? <Spinner size={15} /> : <ShoppingBag size={16} />} {t("product.add")}
              </button>
              <button onClick={() => setShowSticky(false)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted hover:bg-primary/5" aria-label={t("product.dismiss")}><CloseSquare size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}
