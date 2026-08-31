"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/ui-utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light shadow-sm",
  secondary: "bg-secondary text-primary hover:bg-emerald-400/80",
  outline: "border border-primary/20 bg-white text-primary hover:bg-primary/5",
  ghost: "text-muted hover:text-primary hover:bg-primary/5",
  danger: "bg-red-600 text-white hover:bg-red-700",
  accent: "bg-accent text-white hover:bg-amber-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-7 text-base rounded-xl",
  icon: "h-10 w-10 rounded-xl",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...(props as any)}
    />
  )
);
Button.displayName = "Button";
