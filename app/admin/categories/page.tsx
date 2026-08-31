"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories, products } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-react";

export default function CategoriesAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-ink">Categories</h1><p className="text-sm text-muted">Organize your product catalog.</p></div><Button size="sm"><Add size={16} /> Add Category</Button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.categorySlug === c.slug).length;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl"><Image src={c.image} alt={c.name} fill unoptimized sizes="64px" className="object-cover" /></div>
              <div className="flex-1"><p className="font-medium">{c.emoji} {c.name}</p><p className="text-xs text-muted">{c.productCount} products · {count} live</p></div>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:border-primary/40 hover:text-primary">Edit</button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
