"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HistoryState {
  recentlyViewed: string[];
  recentSearches: string[];
  addRecentlyViewed: (productId: string) => void;
  addSearch: (query: string) => void;
  clearSearches: () => void;
}

export const useHistory = create<HistoryState>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      recentSearches: ["Cherry Tomatoes", "Baby Spinach"],
      addRecentlyViewed: (productId) => {
        const next = [productId, ...get().recentlyViewed.filter((i) => i !== productId)].slice(0, 12);
        set({ recentlyViewed: next });
      },
      addSearch: (query) => {
        const q = query.trim();
        if (!q) return;
        const next = [q, ...get().recentSearches.filter((s) => s.toLowerCase() !== q.toLowerCase())].slice(0, 8);
        set({ recentSearches: next });
      },
      clearSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "fresroot-history",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ recentlyViewed: state.recentlyViewed, recentSearches: state.recentSearches }),
    }
  )
);