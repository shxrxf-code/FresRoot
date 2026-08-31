"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login");

  return (
    <div className="flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${isAuthPage ? "" : "pb-20 lg:pb-0"}`}>{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
