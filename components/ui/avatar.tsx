"use client";
import Image from "next/image";
import { cn } from "@/components/ui-utils";

export function Avatar({ src, name, className, size = 40 }: { src: string; name: string; className?: string; size?: number }) {
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn("rounded-full object-cover ring-2 ring-white", className)}
      style={{ width: size, height: size }}
      unoptimized
    />
  );
}
