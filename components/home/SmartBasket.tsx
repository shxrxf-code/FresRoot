"use client";
import * as React from "react";
import Image from "next/image";
import { MagicStar, Trash, Add, TickCircle, ArrowRotateLeft } from "iconsax-react";
import { products } from "@/data/mock";
import { useCart } from "@/stores/cart";
import { useLanguage } from "@/stores/language";
import { Button } from "@/components/ui/button";
import { formatAED } from "@/lib/format";
import { fluidPad } from "./SectionShell";

const basket = [
  { id: "p1", qty: 2, why: "sb.why1" },
  { id: "p3", qty: 1, why: "sb.why2" },
  { id: "p11", qty: 1, why: "sb.why3" },
  { id: "p16", qty: 1, why: "sb.why4" },
  { id: "p23", qty: 1, why: "sb.why5" },
];

export function SmartBasket() {
  const add = useCart((s) => s.add);
  const { t } = useLanguage();
  const [added, setAdded] = React.useState(false);
  const [items, setItems] = React.useState(basket);
  const rows = items.map((b) => ({ b, product: products.find((p) => p.id === b.id)! })).filter((r) => r.product);
  const total = rows.reduce((s, r) => s + r.product.price * r.b.qty, 0);

  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));

  const addAll = () => {
    rows.forEach(({ b }) => add(b.id, b.qty));
    setAdded(true);
    setTimeout(() => setAdded(false), 2600);
  };

  return (
    <section className="relative overflow-hidden bg-primary py-16 lg:py-24">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className={`${fluidPad} relative`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-center lg:gap-16">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary"><MagicStar size={13} /> {t("sb.badge")}</span>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-[44px] xl:leading-[1.1]">{t("sb.title")}</h2>
            <p className="mt-4 max-w-md text-emerald-100/80 sm:text-lg">
              {t("sb.subtitle")}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm text-emerald-100/80">
              <MagicStar size={16} className="text-secondary" />
              {t("sb.concept")}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-bold text-ink">{t("sb.recommended")}</p>
              <span className="rounded-full bg-lightgreen px-3 py-1 text-xs font-semibold text-primary">{t("sb.items")}</span>
            </div>

            <ul className="divide-y divide-border">
              {rows.map(({ b, product }) => (
                <li key={b.id} className="group flex items-center gap-4 px-5 py-3.5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bg">
                    <Image src={product.image} alt={product.name} fill unoptimized sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                    <p className="text-xs text-muted">{t(b.why)}</p>
                    <p className="mt-1 text-xs font-medium text-muted"><span className="text-secondary">×{b.qty}</span> · {formatAED(product.price * b.qty)}</p>
                  </div>
                  <button onClick={() => remove(b.id)} aria-label={t("cart.remove")} className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-red-50 hover:text-red-600"><Trash size={16} /></button>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-bg px-5 py-4">
              <div>
                <p className="text-xs text-muted">{t("sb.bundleTotal")}</p>
                <p className="text-2xl font-extrabold text-ink">{formatAED(total)}</p>
              </div>
              <Button size="lg" onClick={addAll} disabled={rows.length === 0 || added} className="min-w-[190px]">
                {added ? <><TickCircle size={17} /> {t("sb.addedToCart")}</> : <><Add size={17} /> {t("sb.addEntireBasket")}</>} {!added && <ArrowRotateLeft size={14} className="opacity-70" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}