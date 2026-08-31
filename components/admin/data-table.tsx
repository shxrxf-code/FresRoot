"use client";
import * as React from "react";
import { ArrowDown2, SearchNormal, More } from "iconsax-react";
import { cn } from "@/components/ui-utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({ columns, data, searchPlaceholder, searchKeys = [] }: { columns: Column<T>[]; data: T[]; searchPlaceholder?: string; searchKeys?: string[] }) {
  const [q, setQ] = React.useState("");
  const rows = q ? data.filter((r) => searchKeys.some((k) => String(r[k]).toLowerCase().includes(q.toLowerCase()))) : data;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
      {searchPlaceholder && (
        <div className="flex items-center gap-2 border-b border-border p-3">
          <SearchNormal size={16} className="text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted/70" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-bg text-xs uppercase tracking-wide text-muted">
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-semibold">{c.header}</th>)}
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="p-8 text-center text-muted">No records found.</td></tr>
            ) : rows.map((row, i) => (
              <tr key={i} className="border-b border-border transition-colors last:border-0 hover:bg-bg/60">
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-4 py-3", c.className)}>{c.render ? c.render(row) : String(row[c.key])}</td>
                ))}
                <td className="px-4 py-3">
                  <button className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-border text-muted hover:text-primary" aria-label="More actions"><More size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <select {...props} className="h-10 w-full appearance-none rounded-xl border border-input bg-white pl-4 pr-10 text-sm shadow-sm outline-none focus:border-primary">{children}</select>
      <ArrowDown2 size={15} className="pointer-events-none absolute right-3 text-muted" />
    </div>
  );
}
