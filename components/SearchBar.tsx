"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SearchNormal, Clock, TrendUp, ArrowDown, Heart, Tree, CloseCircle } from "iconsax-react";
import { products, categories, popularSearches } from "@/data/mock";
import { useHistory } from "@/stores/history";
import { cn } from "@/components/ui-utils";
import { useLanguage } from "@/stores/language";

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const { t } = useLanguage();
  const { recentSearches, addSearch } = useHistory();
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const query = q.trim().toLowerCase();
  const productHits = query
    ? products.filter((p) => p.name.toLowerCase().includes(query)).slice(0, 5)
    : [];
  const catHits = query ? categories.filter((c) => c.name.toLowerCase().includes(query)).slice(0, 3) : [];

  React.useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (value: string) => {
    addSearch(value);
    setQ("");
    setOpen(false);
    router.push(`/shop/?q=${encodeURIComponent(value)}`);
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
        className="relative"
      >
        <SearchNormal size={17} className="absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t("search.placeholder")}
          aria-label={t("search.searchProducts")}
          className="h-12 w-full rounded-2xl border border-border bg-bg ps-11 pe-14 text-sm outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:bg-white focus:ring-2 focus:ring-ring"
        />
        <kbd className="absolute end-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-white px-1.5 py-0.5 text-[10px] font-medium text-muted lg:block">⌘K</kbd>
      </form>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 top-full z-[80] mt-2 overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-card"
          >
            {query ? (
              <div className="max-h-96 overflow-y-auto">
                <button onClick={() => go(q)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-primary/5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white"><ArrowDown size={16} /></span>
                  <span className="text-sm font-medium text-ink">{t("search.searchFor", { q })}</span>
                </button>

                {productHits.length > 0 && (
                  <div className="mt-2 border-t border-border pt-2">
                    <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{t("search.suggested")}</p>
                    {productHits.map((p) => (
                      <button key={p.id} onClick={() => router.push(`/product/${p.id}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-lightgreen/50">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bg text-sm">{p.category === "Leafy Greens" || p.category === "Herbs" ? "🥬" : p.category === "Fruits" ? "🍎" : p.category === "Dates" ? "🌴" : "🌱"}</span>
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-ink">{p.name}</span>
                          <span className="block text-xs text-muted">{p.farm} · {p.location}</span>
                        </span>
                        <span className="text-sm font-semibold text-primary">AED {p.price}</span>
                      </button>
                    ))}
                  </div>
                )}

                {catHits.length > 0 && (
                  <div className="mt-2 border-t border-border pt-2">
                    <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{t("search.categories")}</p>
                    {catHits.map((c) => (
                      <button key={c.id} onClick={() => go(c.name)} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-primary/5">
                        <Tree size={15} className="text-secondary" /> {c.name}
                      </button>
                    ))}
                  </div>
                )}

                {productHits.length === 0 && catHits.length === 0 && <p className="p-4 text-sm text-muted">{t("search.noResults", { q })}</p>}
              </div>
            ) : (
              <div>
                {recentSearches.length > 0 && (
                  <div className="border-b border-border pb-3">
                    <p className="flex items-center gap-1.5 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted"><Clock size={12} /> {t("search.recent")}</p>
                    {recentSearches.map((s) => (
                      <button key={s} onClick={() => go(s)} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-primary/5">
                        <Clock size={14} className="text-muted" /> {s}
                      </button>
                    ))}
                  </div>
                )}
                <div className="pt-2">
                  <p className="flex items-center gap-1.5 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted"><TrendUp size={12} /> {t("search.popular")}</p>
                  <div className="flex flex-wrap gap-2 px-3">
                    {popularSearches.map((s) => (
                      <button key={s} onClick={() => go(s)} className="rounded-full border border-border bg-bg px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary/40 hover:bg-lightgreen">{s}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border px-3 pt-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted"><Heart size={13} className="text-red-500" /> {t("search.trackFavourites")}</span>
                  <Link href="/wishlist" className="text-xs font-semibold text-primary hover:underline">{t("search.open")}</Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}