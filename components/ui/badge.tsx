"use client";
import * as React from "react";
import { cn } from "@/components/ui-utils";

type Tones = "green" | "orange" | "red" | "yellow" | "blue" | "gray" | "purple";

const tones: Record<Tones, string> = {
  green: "bg-lightgreen text-primary border-emerald-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
  yellow: "bg-amber-50 text-amber-800 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  gray: "bg-gray-100 text-gray-600 border-gray-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
};

export function Badge({ className, tone = "green", children, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tones }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone], className)} {...props}>
      {children}
    </span>
  );
}
