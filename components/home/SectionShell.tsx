import * as React from "react";
import { cn } from "@/components/ui-utils";

export const fluidPad = "w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20";

export function Section({ id, className, children, innerClassName }: { id?: string; className?: string; children: React.ReactNode; innerClassName?: string }) {
  return (
    <section id={id} className={cn(fluidPad, className)}>
      <div className={cn("w-full", innerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action, align = "left" }: { eyebrow?: string; title: React.ReactNode; subtitle?: string; action?: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4", align === "center" && "flex-col items-center text-center")}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-lightgreen px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>}
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-primary sm:text-4xl xl:text-[44px] xl:leading-[1.1]">{title}</h2>
        {subtitle && <p className="mt-3 text-muted sm:text-lg">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}