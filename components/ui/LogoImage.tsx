"use client";
import Image from "next/image";
import { cn } from "@/components/ui-utils";

export function LogoImage({
  className,
  light = false,
  alt = "FRESROOT - Farm to Door",
}: {
  className?: string;
  light?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={light ? "/logo/Logo-light.png" : "/logo/Logo.png"}
      alt={alt}
      width={800}
      height={267}
      className={cn("h-auto object-contain", className)}
      priority
    />
  );
}
