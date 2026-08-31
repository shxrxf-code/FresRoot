"use client";
import * as React from "react";
import { useLanguage } from "@/stores/language";

export function LanguageEffect() {
  const language = useLanguage((s) => s.language);
  const hydrated = useLanguage((s) => s.hydrated);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      useLanguage.persist.rehydrate();
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
  }, [language, hydrated]);

  return null;
}
