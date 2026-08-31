"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  items: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  remove: (productId: string) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: ["p6", "p7"],
      toggle: (productId) => {
        const has = get().items.includes(productId);
        set({ items: has ? get().items.filter((i) => i !== productId) : [...get().items, productId] });
      },
      has: (productId) => get().items.includes(productId),
      remove: (productId) => set({ items: get().items.filter((i) => i !== productId) }),
    }),
    {
      name: "fresroot-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
