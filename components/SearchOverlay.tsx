"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseCircle } from "iconsax-react";
import { useUI } from "@/stores/ui";
import { SearchBar } from "./SearchBar";
import { useLanguage } from "@/stores/language";

export function SearchOverlay() {
  const { t } = useLanguage();
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] bg-white" role="dialog" aria-modal="true" aria-label={t("nav.search")}>
          <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-white px-4 py-3">
            <div className="flex-1">
              <SearchBar autoFocus />
            </div>
            <button onClick={() => setOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink hover:bg-primary/5" aria-label={t("search.close")}><CloseCircle size={22} /></button>
          </div>
          <p className="px-6 py-3 text-center text-xs text-muted">{t("search.strapline")}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}