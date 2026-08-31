"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QualityResult } from "@/data/interface";
import { defaultQualityResults } from "@/data/mock";

interface QualityState {
  results: QualityResult[];
  upsert: (result: QualityResult) => void;
  setStatus: (batch: string, status: QualityResult["status"]) => void;
  reset: () => void;
}

export const useQuality = create<QualityState>()(
  persist(
    (set, get) => ({
      results: defaultQualityResults(),
      upsert: (result) => {
        const existing = get().results.some((r) => r.batch === result.batch);
        set({
          results: existing
            ? get().results.map((r) => (r.batch === result.batch ? result : r))
            : [result, ...get().results],
        });
      },
      setStatus: (batch, status) =>
        set({ results: get().results.map((r) => (r.batch === batch ? { ...r, status } : r)) }),
      reset: () => set({ results: defaultQualityResults() }),
    }),
    {
      name: "fresroot-quality",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ results: state.results }),
    }
  )
);
