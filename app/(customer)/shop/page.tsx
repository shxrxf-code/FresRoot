"use client";
import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, CloseSquare, SearchNormal, ArrowDown2, Tree, Calendar, Truck, Sort } from "iconsax-react";
import { products, categories, farms, deliveryAreas } from "@/data/mock";
import { ProductCard } from "@/components/ProductCard";
import { ProductQuickView } from "@/components/ProductQuickView";
import { Pagination } from "@/components/ui/pagination";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import { Product } from "@/data/interface";
import { cn } from "@/components/ui-utils";
import { useLanguage } from "@/stores/language";

type Filters = {
  price: string;
  farm: string;
  rating: string;
  avail: string;
  method: string;
  harvest: string;
  area: string;
};

export default function ShopPage() {
  return (
    <React.Suspense fallback={<ShopShell />}>
      <ShopContent />
    </React.Suspense>
  );
}

function ShopShell() {
  return <div className="w-full px-4 py-8 sm:px-6 lg:px-10 xl:px-14 2xl:px-20"><LoadingSkeleton /></div>;
}

function ShopContent() {
  const { t } = useLanguage();
  const params = useParams();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const activeCat = (params.category as string) || "all";
  const urlFarm = searchParams.get("farm") || "all";
  const [query, setQuery] = React.useState(urlQuery);
  const [cat, setCat] = React.useState(activeCat);
  const [sort, setSort] = React.useState("Recommended");
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<Filters>({ price: "all", farm: urlFarm, rating: "all", avail: "all", method: "all", harvest: "all", area: "all" });
  const [showFilters, setShowFilters] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [quickView, setQuickView] = React.useState<Product | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({ Price: true, Categories: true });

  const categoryTabs = [{ label: t("shop.all"), slug: "all" }, ...categories.map((c) => ({ label: c.name, slug: c.slug }))];
  const sortOptions = [
    { v: "Recommended", l: t("shop.recommended") },
    { v: "Freshest", l: t("shop.freshest") },
    { v: "Popular", l: t("shop.popular") },
    { v: "Price: Low to High", l: t("shop.priceLowHigh") },
    { v: "Price: High to Low", l: t("shop.priceHighLow") },
  ];
  const priceOptions = [
    { v: "all", l: t("shop.allPrices") },
    { v: "low", l: t("shop.under20") },
    { v: "mid", l: t("shop.aed20to50") },
    { v: "high", l: t("shop.over50") },
  ];
  const harvestOptions = [
    { v: "Today", l: t("shop.today") },
    { v: "This Week", l: t("shop.thisWeek") },
    { v: "all", l: t("shop.anyDate") },
  ];
  const methodLabels: Record<string, string> = { Organic: t("shop.organic"), Natural: t("shop.natural"), Biodynamic: t("shop.biodynamic") };

  React.useEffect(() => {
    setCat(activeCat);
    setPage(1);
  }, [activeCat]);

  React.useEffect(() => {
    setQuery(urlQuery);
    setPage(1);
  }, [urlQuery]);

  React.useEffect(() => {
    setFilters((f) => ({ ...f, farm: urlFarm }));
    setPage(1);
  }, [urlFarm]);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [cat, query, sort, filters]);

  const activeFilterCount = Object.values(filters).filter((v) => v !== "all").length + (cat !== "all" ? 1 : 0);

  let results = products.filter((p) => (cat === "all" || p.categorySlug === cat) && p.name.toLowerCase().includes(query.toLowerCase()));

  if (filters.price === "low") results = results.filter((p) => p.price <= 20);
  if (filters.price === "mid") results = results.filter((p) => p.price > 20 && p.price <= 50);
  if (filters.price === "high") results = results.filter((p) => p.price > 50);
  if (filters.farm !== "all") results = results.filter((p) => p.farmId === filters.farm);
  if (filters.rating === "4") results = results.filter((p) => p.rating >= 4.5);
  if (filters.avail === "in") results = results.filter((p) => p.stock === "In Stock");
  if (filters.method !== "all") results = results.filter((p) => p.farmingMethod === filters.method);
  if (filters.harvest !== "all") results = results.filter((p) => p.harvestDate === filters.harvest);
  if (filters.area !== "all") results = results.filter((p) => p.location.toLowerCase().includes(filters.area.toLowerCase()));

  const sorted = [...results];
  if (sort === "Freshest") sorted.sort((a, b) => (a.harvestDate === "Today" ? 1 : 0) - (b.harvestDate === "Today" ? 1 : 0) || b.rating - a.rating);
  if (sort === "Popular") sorted.sort((a, b) => b.reviews - a.reviews);
  if (sort === "Price: Low to High") sorted.sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") sorted.sort((a, b) => b.price - a.price);

  const perPage = 12;
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  const toggle = (k: string) => setExpanded((e) => ({ ...e, [k]: !e[k] }));

  const accordion = (key: string, title: React.ReactNode, body: React.ReactNode) => (
    <div className="border-b border-border py-4">
      <button onClick={() => toggle(key)} className="flex w-full items-center justify-between text-sm font-semibold text-ink">
        {title}
        <ArrowDown2 size={15} className={cn("text-muted transition-transform", expanded[key] && "rotate-180")} />
      </button>
      {expanded[key] && <div className="mt-3 space-y-1">{body}</div>}
    </div>
  );

  const filterSet = (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-base font-bold text-ink"><Filter size={16} className="text-primary" /> {t("shop.filters")}</h4>
        {(activeFilterCount > 0) && (
          <button onClick={() => { setFilters({ price: "all", farm: "all", rating: "all", avail: "all", method: "all", harvest: "all", area: "all" }); setCat("all"); }} className="text-xs font-semibold text-accent hover:underline">{t("shop.clearAll")}</button>
        )}
      </div>

      {accordion("Categories", t("shop.categories"), categoryTabs.map((c) => (
        <button key={c.slug} onClick={() => setCat(c.slug)} className={cn("flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors", cat === c.slug ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{c.label}</button>
      )))}

      {accordion("Price", t("shop.price"), priceOptions.map((o) => (
        <button key={o.v} onClick={() => setFilters({ ...filters, price: o.v })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.price === o.v ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{o.l}</button>
      )))}

      {accordion("Farm", <span className="flex items-center gap-1.5"><Tree size={14} className="text-primary" /> {t("shop.farm")}</span>, (
        <>
          <button onClick={() => setFilters({ ...filters, farm: "all" })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.farm === "all" ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{t("shop.allFarms")}</button>
          {farms.filter((f) => f.status === "Active").map((f) => (
            <button key={f.id} onClick={() => setFilters({ ...filters, farm: f.id })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.farm === f.id ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{f.name}</button>
          ))}
        </>
      ))}

      {accordion("Rating", t("shop.rating"), [{ v: "all", l: t("shop.anyRating") }, { v: "4", l: t("shop.above45") }].map((o) => (
        <button key={o.v} onClick={() => setFilters({ ...filters, rating: o.v })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.rating === o.v ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{o.l}</button>
      )))}

      {accordion("Method", t("shop.farmingMethod"), ["Organic", "Natural", "Biodynamic"].map((m) => (
        <button key={m} onClick={() => setFilters({ ...filters, method: filters.method === m ? "all" : m })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.method === m ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{methodLabels[m]}</button>
      )))}

      {accordion("Harvest", <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {t("shop.harvestDate")}</span>, harvestOptions.map((h) => (
        <button key={h.v} onClick={() => setFilters({ ...filters, harvest: h.v === "all" ? "all" : h.v })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.harvest === (h.v === "all" ? "all" : h.v) ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{h.v === "all" ? h.l : t("shop.harvested", { h: h.l })}</button>
      )))}

      {accordion("Area", <span className="flex items-center gap-1.5"><Truck size={14} className="text-primary" /> {t("shop.deliveryArea")}</span>, (
        <>
          <button onClick={() => setFilters({ ...filters, area: "all" })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.area === "all" ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{t("shop.allEmirates")}</button>
          {deliveryAreas.map((a) => (
            <button key={a} onClick={() => setFilters({ ...filters, area: a })} className={cn("block w-full rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors", filters.area === a ? "bg-lightgreen font-medium text-primary" : "text-muted hover:bg-primary/5")}>{a}</button>
          ))}
        </>
      ))}
    </div>
  );

  return (
    <div className="w-full px-4 pb-14 pt-5 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
      <div className="mb-5">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{t("shop.title")}</h1>
        <p className="mt-1 text-muted">{t("shop.subtitle", { n: results.length, m: deliveryAreas.length })}</p>
      </div>

      <div className="sticky top-16 z-30 -mx-4 mb-4 border-b border-border/60 bg-bg/95 px-4 py-2.5 backdrop-blur-sm sm:mx-0 sm:rounded-2xl sm:border sm:bg-white sm:static sm:px-4 sm:py-3 sm:backdrop-blur-none">
        <div className="relative mb-2.5 md:hidden">
          <SearchNormal size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={t("shop.searchPlaceholder")}
            className="h-12 w-full rounded-2xl border border-border bg-white ps-11 pe-4 text-sm shadow-sm outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="relative flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-sm text-muted">{t("shop.found", { n: results.length })}</p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setShowSort((s) => !s)}
              className={cn("inline-flex h-10 items-center gap-2 rounded-2xl border bg-white px-3.5 text-sm font-semibold shadow-sm md:hidden", showSort ? "border-primary text-primary" : "border-border text-ink")}
            >
              <Sort size={16} /> {t("shop.sort")}
            </button>
            <button onClick={() => setShowFilters(true)} className="inline-flex h-10 items-center gap-2 rounded-2xl border border-border bg-white px-3.5 text-sm font-semibold shadow-sm lg:hidden">
              <Filter size={16} /> {t("shop.filters")}
              {activeFilterCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">{activeFilterCount}</span>}
            </button>
          </div>

          <AnimatePresence>
            {showSort && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute end-0 top-12 z-40 w-52 overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-xl md:hidden"
              >
                {sortOptions.map((o) => (
                  <button
                    key={o.v}
                    onClick={() => { setSort(o.v); setShowSort(false); }}
                    className={cn("block w-full rounded-xl px-3 py-2 text-start text-sm transition-colors", sort === o.v ? "bg-lightgreen font-semibold text-primary" : "text-ink hover:bg-primary/5")}
                  >
                    {o.l}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-4 hidden md:flex md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchNormal size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={t("shop.searchPlaceholder")}
            className="h-12 w-full rounded-2xl border border-border bg-white ps-11 pe-4 text-sm shadow-sm outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-12 rounded-2xl border border-border bg-white px-3 text-sm shadow-sm outline-none focus:border-primary">
            {sortOptions.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categoryTabs.map((c) => (
          <button key={c.slug} onClick={() => { setCat(c.slug); setPage(1); }} className={cn("shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors", cat === c.slug ? "border-primary bg-primary text-white" : "border-border bg-white text-muted hover:border-primary/40")}>{c.label}</button>
        ))}
      </div>

      <div className="mt-4 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-2xl border border-border bg-white p-5 lg:block">
          <div className="lg:sticky lg:top-28">{filterSet}</div>
        </aside>

        <div>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden">
          <div className="relative mb-4 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-white p-4">
            <button onClick={() => setShowFilters(false)} className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-lg hover:bg-primary/5"><CloseSquare size={16} /></button>
            {filterSet}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

          {loading ? <LoadingSkeleton /> : (
            <>
              {paged.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-white p-14 text-center">
                  <p className="text-3xl">🥬</p>
                  <p className="mt-3 font-semibold text-ink">{t("shop.noResults")}</p>
                  <p className="mt-1 text-sm text-muted">{t("shop.noResultsHint")}</p>
                  <button onClick={() => { setFilters({ price: "all", farm: "all", rating: "all", avail: "all", method: "all", harvest: "all", area: "all" }); setCat("all"); setQuery(""); }} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">{t("shop.clearFilters")}</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
                  {paged.map((p) => <ProductCard key={p.id} product={p} quickView={setQuickView} />)}
                </div>
              )}
              <Pagination page={page} total={sorted.length} perPage={perPage} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}