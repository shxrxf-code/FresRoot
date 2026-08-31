"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/data/interface";
import { products, offers } from "@/data/mock";

export const FREE_DELIVERY_THRESHOLD = 150;
export const DELIVERY_FEE = 25;
export const VAT_RATE = 0.05;

export interface CouponRule {
  code: string;
  label: string;
  minOrder: number;
  compute: (subtotal: number) => number;
  freeDelivery?: boolean;
}

export const couponRules: CouponRule[] = offers.map((o) => {
  const code = o.code;
  if (code === "WELCOME20") return { code, label: "WELCOME20 · 20% OFF", minOrder: 100, compute: (s) => Math.min(50, Math.round(s * 0.2)) };
  if (code === "FRESH50") return { code, label: "FRESH50 · AED 50 OFF", minOrder: 250, compute: () => 50 };
  if (code === "FREESHIP") return { code, label: "FREESHIP · Free Delivery", minOrder: 200, compute: () => 0, freeDelivery: true };
  if (code === "FARM15") return { code, label: "FARM15 · AED 15 OFF", minOrder: 100, compute: () => 15 };
  return { code, label: "GREEN10 · 10% OFF", minOrder: 150, compute: (s) => Math.round(s * 0.1) };
});

interface CartState {
  items: CartItem[];
  coupon: string | null;
  isOpen: boolean;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => "ok" | "invalid" | "min";
  removeCoupon: () => void;
  setOpen: (open: boolean) => void;
  count: () => number;
  subtotal: () => number;
  deliveryFee: () => number;
  discount: () => number;
  vat: () => number;
  total: () => number;
  details: () => Product[];
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isOpen: false,
      add: (productId, qty = 1) => {
        const { items } = get();
        const existing = items.find((i) => i.productId === productId);
        if (existing) {
          set({ items: items.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i)) });
        } else {
          set({ items: [...items, { productId, qty }], isOpen: true });
        }
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQty: (productId, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
        } else {
          set({ items: get().items.map((i) => (i.productId === productId ? { ...i, qty } : i)) });
        }
      },
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const rule = couponRules.find((r) => r.code === code.trim().toUpperCase());
        if (!rule) return "invalid";
        const sub = get().subtotal();
        if (sub < rule.minOrder) return "min";
        set({ coupon: rule.code });
        return "ok";
      },
      removeCoupon: () => set({ coupon: null }),
      setOpen: (open) => set({ isOpen: open }),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () =>
        get().items.reduce((s, i) => {
          const p = products.find((pr) => pr.id === i.productId);
          return s + (p ? p.price * i.qty : 0);
        }, 0),
      deliveryFee: () => {
        const sub = get().subtotal();
        const rule = get().coupon ? couponRules.find((r) => r.code === get().coupon) : undefined;
        if (rule?.freeDelivery || sub >= FREE_DELIVERY_THRESHOLD || sub === 0) return 0;
        return DELIVERY_FEE;
      },
      discount: () => {
        const code = get().coupon;
        if (!code) return 0;
        const rule = couponRules.find((r) => r.code === code);
        return rule ? rule.compute(get().subtotal()) : 0;
      },
      vat: () => {
        const taxable = Math.max(get().subtotal() - get().discount(), 0);
        return Math.round(taxable * VAT_RATE * 100) / 100;
      },
      total: () => {
        const s = get();
        return Math.max(s.subtotal() + s.deliveryFee() - s.discount() + s.vat(), 0);
      },
      details: () =>
        get().items
          .map((i) => products.find((p) => p.id === i.productId))
          .filter((p): p is Product => !!p),
    }),
    {
      name: "fresroot-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
);