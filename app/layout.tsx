import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { LanguageEffect } from "@/components/LanguageEffect";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FRESROOT — Fresh from Farm. Delivered with Care.",
  description: "Naturally grown vegetables, fruits, herbs, millets and more sourced from trusted UAE farms and delivered fresh to your doorstep.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <LanguageEffect />
      </body>
    </html>
  );
}
