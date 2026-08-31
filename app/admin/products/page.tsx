"use client";
import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, farms } from "@/data/mock";
import { StatusBadge } from "@/components/ui/status-badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Add, Trash, Edit } from "iconsax-react";
import { Product } from "@/data/interface";

export default function ProductsAdmin() {
  const [list, setList] = React.useState(products);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [isNew, setIsNew] = React.useState(false);
  const [form, setForm] = React.useState<Partial<Product>>({});

  const openNew = () => { setIsNew(true); setEditing({} as Product); };
  const openEdit = (p: Product) => { setIsNew(false); setEditing(p); setForm(p); };

  const save = () => {
    if (isNew) {
      const np = { ...(form as Product), id: "p" + Date.now(), image: form.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60", rating: 0, reviews: 0, badges: ["Naturally Grown"], nutrition: [], stock: "In Stock" };
      setList([np, ...list]);
    } else if (editing) {
      setList(list.map((p) => (p.id === editing.id ? { ...p, ...form } : p)));
    }
    setEditing(null);
  };

  const remove = (id: string) => setList(list.filter((p) => p.id !== id));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-ink">Products</h1><p className="text-sm text-muted">{list.length} products in catalog.</p></div>
        <Button size="sm" onClick={openNew}><Add size={16} /> Add Product</Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead><tr className="border-b border-border bg-bg text-xs uppercase text-muted"><th className="px-4 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">Category</th><th className="px-4 py-3 font-semibold">Price</th><th className="px-4 py-3 font-semibold">Stock</th><th className="px-4 py-3 font-semibold">Farm</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><Image src={p.image} alt={p.name} width={40} height={40} unoptimized className="h-10 w-10 rounded-lg object-cover" /><span className="font-medium">{p.name}</span></div></td>
                  <td className="px-4 py-3 text-muted">{p.category}</td>
                  <td className="px-4 py-3">AED {p.price} / {p.unit}</td>
                  <td className="px-4 py-3 text-muted">{p.stockKg} kg</td>
                  <td className="px-4 py-3 text-muted">{p.farm}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.stock} /></td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(p)} className="inline-grid h-8 w-8 place-items-center rounded-lg border border-border text-muted hover:text-primary" aria-label="Edit"><Edit size={14} /></button>
                    <button onClick={() => remove(p.id)} className="ml-1.5 inline-grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50" aria-label="Delete"><Trash size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={isNew ? "Add New Product" : "Edit Product"} className="max-w-2xl">
        {editing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Product Name</Label><Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Tomato" /></div>
            <div><Label>SKU</Label><Input value={form.id || ""} disabled placeholder="Auto-generated" /></div>
            <div><Label>Category</Label><select value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value, categorySlug: e.target.value.toLowerCase().replace(/\s/g, "-") })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary">{categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
            <div><Label>Farm</Label><select value={form.farm || ""} onChange={(e) => setForm({ ...form, farm: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary">{farms.filter((f) => f.status === "Active").map((f) => <option key={f.id} value={f.name}>{f.name}</option>)}</select></div>
            <div><Label>Price (AED )</Label><Input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></div>
            <div><Label>Unit</Label><Input value={form.unit || ""} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="500g / piece" /></div>
            <div><Label>Stock Quantity (kg)</Label><Input type="number" value={form.stockKg || ""} onChange={(e) => setForm({ ...form, stockKg: +e.target.value })} /></div>
            <div><Label>Farming Method</Label><select value={form.farmingMethod || ""} onChange={(e) => setForm({ ...form, farmingMethod: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary"><option>Organic</option><option>Natural</option><option>Biodynamic</option><option>Free Range</option></select></div>
            <div className="sm:col-span-2"><Label>Image URL</Label><Input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
            <div className="sm:col-span-2"><Label>Description</Label><Textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description" /></div>
            <div><Label>Harvest Date</Label><select value={form.harvestDate || ""} onChange={(e) => setForm({ ...form, harvestDate: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary"><option>Today</option><option>This Week</option><option>Last Week</option></select></div>
            <div><Label>Availability</Label><select value={form.stock || ""} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none focus:border-primary"><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select></div>
            <div className="flex gap-3 sm:col-span-2 pt-2"><Button onClick={save} className="flex-1">{isNew ? "Save Product" : "Save Changes"}</Button><Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
