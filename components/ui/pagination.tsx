"use client";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useLanguage } from "@/stores/language";

export function Pagination({ page, total, perPage, onChange }: { page: number; total: number; perPage: number; onChange: (p: number) => void }) {
  const { t, isRTL } = useLanguage();
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-muted transition-colors hover:text-primary disabled:opacity-40"
        aria-label={t("pagination.previous")}
      >
        {isRTL() ? <ArrowRight2 size={16} /> : <ArrowLeft2 size={16} />}
      </button>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={i + 1 === page ? "grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm font-medium text-white" : "grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-sm text-muted hover:text-primary"}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page >= pages}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-muted transition-colors hover:text-primary disabled:opacity-40"
        aria-label={t("pagination.next")}
      >
        {isRTL() ? <ArrowLeft2 size={16} /> : <ArrowRight2 size={16} />}
      </button>
    </div>
  );
}
