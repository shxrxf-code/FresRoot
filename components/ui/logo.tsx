"use client";
import { cn } from "@/components/ui-utils";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary shadow-sm">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C13 3 13 5 13 7C13 9 12.5 10 12 11C11.5 10 11 9 11 7C11 5 11 3 12 2Z" fill="#22C55E" />
          <ellipse cx="15" cy="9" rx="3.5" ry="4.5" transform="rotate(30 15 9)" fill="#22C55E" opacity="0.85" />
          <ellipse cx="9" cy="9" rx="3.5" ry="4.5" transform="rotate(-30 9 9)" fill="#4ADE80" opacity="0.9" />
          <path d="M7 12C8.5 15 10 18 10.5 21C11.2 17 11 13.5 9.5 11C8.6 11.3 7.7 11.6 7 12Z" fill="#166534" />
        </svg>
      </span>
      <span className={cn("text-xl font-bold tracking-tight", light ? "text-white" : "text-primary")}>
        FRES<span className={cn(light ? "text-secondary" : "text-secondary")}>ROOT</span>
      </span>
    </span>
  );
}
