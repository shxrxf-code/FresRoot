"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";

export type Language = "en" | "ar";

const dictionaries = { en, ar } as Record<Language, Record<string, string>>;

export type LangParams = Record<string, string | number>;

interface LanguageState {
  language: Language;
  hydrated: boolean;
  setLanguage: (l: Language) => void;
  toggle: () => void;
  t: (key: string, params?: LangParams) => string;
  isRTL: () => boolean;
}

function interpolate(template: string, params?: LangParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_m, name: string) =>
    params[name] !== undefined ? String(params[name]) : `{${name}}`
  );
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      hydrated: false,
      setLanguage: (language) => set({ language }),
      toggle: () => set((s) => ({ language: s.language === "en" ? "ar" : "en" })),
      t: (key, params) => {
        const lang = get().hydrated ? get().language : "en";
        const dict = dictionaries[lang];
        const str = dict?.[key] ?? en[key] ?? key;
        return interpolate(str, params);
      },
      isRTL: () => get().hydrated && get().language === "ar",
    }),
    {
      name: "fresroot-language",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ language: s.language }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    }
  )
);
