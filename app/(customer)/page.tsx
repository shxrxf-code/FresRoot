"use client";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellers } from "@/components/home/BestSellers";
import { ProductRail } from "@/components/home/ProductRail";
import { SubscriptionSection } from "@/components/home/SubscriptionSection";
import { FarmDiscovery } from "@/components/home/FarmDiscovery";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { RecommendedForYou } from "@/components/home/RecommendedForYou";

export default function LandingPage() {
  return (
    <div>
      <PromoBanner />
      <BestSellers />
      <ProductRail />
      <SubscriptionSection />
      <FarmDiscovery />
      <RecentlyViewed />
      <RecommendedForYou />
    </div>
  );
}