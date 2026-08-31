"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchNormal, Heart, ShoppingBag, User, Menu, CloseCircle, ArrowDown2, ArrowRight2, Tag, Home, Home2, ShoppingCart, Box } from "iconsax-react";
import { LogoImage } from "./ui/LogoImage";
import { Avatar } from "./ui/avatar";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useAuth } from "@/stores/auth";
import { useUI } from "@/stores/ui";
import { useLanguage } from "@/stores/language";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { cn } from "./ui-utils";

const navLinks = [
  { href: "/", label: "nav.home" },
  { href: "/shop", label: "nav.shop" },
  { href: "/shop/vegetables", label: "nav.vegetables", hasMegaMenu: true, menu: "vegetables" },
  { href: "/shop/fruits", label: "nav.fruits", hasMegaMenu: true, menu: "fruits" },
  { href: "/shop/herbs", label: "nav.herbs", hasMegaMenu: true, menu: "herbs" },
  { href: "/shop/millets", label: "nav.millets", hasMegaMenu: true, menu: "millets" },
  { href: "/shop/farm-boxes", label: "nav.farmBoxes", hasMegaMenu: true, menu: "farm-boxes" },
  { href: "/farms", label: "nav.ourFarms" },
  { href: "/subscriptions", label: "nav.subscriptions" },
];

const megaMenuData = {
  vegetables: {
    title: "nav.vegetables",
    categories: [
      { name: "mega.leafyGreens", href: "/shop/vegetables?category=leafy-greens" },
      { name: "mega.rootVegetables", href: "/shop/vegetables?category=root-vegetables" },
      { name: "mega.tomatoes", href: "/shop/vegetables?category=tomatoes" },
      { name: "mega.cucumbers", href: "/shop/vegetables?category=cucumbers" },
      { name: "mega.peppers", href: "/shop/vegetables?category=peppers" },
    ],
    featured: "mega.featured",
    shopAll: "mega.shopAllVegetables"
  },
  fruits: {
    title: "nav.fruits",
    categories: [
      { name: "mega.citrus", href: "/shop/fruits?category=citrus" },
      { name: "mega.berries", href: "/shop/fruits?category=berries" },
      { name: "mega.tropical", href: "/shop/fruits?category=tropical" },
      { name: "mega.stoneFruits", href: "/shop/fruits?category=stone-fruits" },
      { name: "mega.seasonalPicks", href: "/shop/fruits?category=seasonal" },
    ],
    featured: "mega.sweet",
    shopAll: "mega.shopAllFruits"
  },
  herbs: {
    title: "nav.herbs",
    categories: [
      { name: "mega.freshHerbs", href: "/shop/herbs?category=fresh" },
      { name: "mega.driedHerbs", href: "/shop/herbs?category=dried" },
      { name: "mega.spices", href: "/shop/herbs?category=spices" },
      { name: "mega.medicinal", href: "/shop/herbs?category=medicinal" },
    ],
    featured: "mega.aromatic",
    shopAll: "mega.shopAllHerbs"
  },
  millets: {
    title: "nav.millets",
    categories: [
      { name: "mega.foxtail", href: "/shop/millets?category=foxtail" },
      { name: "mega.pearl", href: "/shop/millets?category=pearl" },
      { name: "mega.finger", href: "/shop/millets?category=finger" },
      { name: "mega.sorghum", href: "/shop/millets?category=sorghum" },
    ],
    featured: "mega.grains",
    shopAll: "mega.shopAllMillets"
  },
  "farm-boxes": {
    title: "nav.farmBoxes",
    categories: [
      { name: "mega.weekly", href: "/shop/farm-boxes?category=weekly" },
      { name: "mega.family", href: "/shop/farm-boxes?category=family" },
      { name: "mega.seasonal", href: "/shop/farm-boxes?category=seasonal" },
      { name: "mega.custom", href: "/shop/farm-boxes?category=custom" },
    ],
    featured: "mega.curated",
    shopAll: "mega.shopAllFarmBoxes"
  }
};

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const cartCount = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);
  const wishCount = useWishlist((s) => s.items.length);
  const user = useAuth((s) => s.user);
  const setSearchOpen = useUI((s) => s.setSearchOpen);
  const { language, setLanguage, t } = useLanguage();
  const isRTL = language === "ar";

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeMobile, setActiveMobile] = React.useState<string | null>(null);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const armCloseTimer = React.useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveCategory(null), 150);
  }, [clearCloseTimer]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const isAdmin = user?.role === "ADMIN";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-primary">
        <div className="mx-auto flex h-8 w-full items-center justify-center gap-4 px-6 text-xs font-medium text-white sm:px-8 lg:px-10 xl:px-14 2xl:px-20">
          <p className="truncate text-center">{t("nav.announcement")}</p>
          <Link href="/offers" className="hidden shrink-0 items-center gap-1 font-semibold text-secondary transition-colors hover:text-emerald-300 sm:inline-flex"><Tag size={12} /> {t("nav.offers")}</Link>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all ${scrolled ? "border-b border-border/50 shadow-sm" : ""}`}>
        <div className="mx-auto w-full px-4 sm:px-8 lg:px-10 xl:px-14 2xl:px-20">
          {/* Top Row */}
          <div className="flex h-16 items-center gap-4 lg:gap-6">
            {/* Logo */}
            <Link href="/" aria-label="FRESROOT home" className="flex shrink-0 items-center leading-none">
              <LogoImage className="w-[95px] min-[360px]:w-[130px] min-[400px]:w-[170px] sm:h-10 sm:w-[195px] lg:h-12 lg:w-[230px]" />
            </Link>

            {/* Search Bar */}
            <div className="hidden flex-1 max-w-2xl lg:block">
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-full items-center gap-3 rounded-lg border border-border bg-bg px-4 text-sm text-muted transition-colors hover:border-primary/30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label={t("nav.searchProducts")}
              >
                <SearchNormal size={16} className="text-muted" />
                <span className="flex-1 text-start">{t("nav.searchPlaceholder")}</span>
                <kbd className="hidden rounded border border-border bg-white px-1.5 py-0.5 text-[11px] font-medium text-muted sm:inline-flex">⌘ K</kbd>
              </button>
            </div>

            {/* Right Actions */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-3">
              {/* Wishlist */}
              <Link href="/wishlist" className="relative grid h-11 w-11 place-items-center rounded-lg text-muted hover:bg-primary/5 hover:text-primary lg:h-10 lg:w-10" aria-label={t("nav.wishlist")}>
                <Heart size={18} />
                {mounted && wishCount > 0 && <AnimatedCount count={wishCount} />}
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} className="relative h-10 w-10 place-items-center rounded-lg text-muted hover:bg-primary/5 hover:text-primary" aria-label={t("nav.cart")}>
                <ShoppingBag size={18} />
                {mounted && cartCount > 0 && <AnimatedCount count={cartCount} />}
              </button>

              {/* Language Selector */}
              <button 
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className="hidden h-10 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-primary/30 lg:flex"
                aria-label={t("nav.switchLanguage")}
              >
                <span className={language === "en" ? "text-primary font-medium" : "text-muted"}>EN</span>
                <span className="text-border/60">|</span>
                <span className={language === "ar" ? "text-primary font-medium" : "text-muted"}>عربي</span>
              </button>

              {/* Profile/Sign In */}
              {user ? (
                <Link href={isAdmin ? "/admin" : "/profile"} className="hidden lg:flex" aria-label={t("nav.myAccount")}>
                  <Avatar src={user.avatar} name={user.name} size={36} />
                </Link>
              ) : (
                <Link href="/login" className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 lg:inline-flex">
                  <User size={16} /> {t("nav.signIn")}
                </Link>
              )}

              {/* Mobile Search */}
              <button onClick={() => setSearchOpen(true)} className="lg:hidden h-10 w-10 place-items-center rounded-lg text-muted hover:bg-primary/5" aria-label={t("nav.search")}>
                <SearchNormal size={18} />
              </button>

              {/* Mobile Menu */}
              <button className="lg:hidden h-10 w-10 place-items-center rounded-lg text-muted hover:bg-primary/5" onClick={() => setOpen(true)} aria-label={t("nav.openMenu")}>
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Second Row - Navigation */}
          <nav className="hidden h-11 w-full items-center border-t border-border/50 lg:flex" aria-label="Primary navigation">
            <div className="flex h-full w-full items-center justify-center gap-0.5">
              {navLinks.map((l) => (
                <div
                  key={l.href}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => {
                    if (!l.hasMegaMenu) return;
                    clearCloseTimer();
                    setActiveCategory(l.menu as string);
                  }}
                  onMouseLeave={() => {
                    if (!l.hasMegaMenu) return;
                    armCloseTimer();
                  }}
                >
                  <Link
                    href={l.href}
                    className="group relative flex items-center gap-1 px-3.5 py-3 text-[14px] font-medium transition-colors"
                  >
                    <span className={cn(isActive(l.href) ? "text-primary" : "text-muted group-hover:text-primary")}>{t(l.label)}</span>
                    {l.hasMegaMenu && (
                      <ArrowDown2 size={14} className={cn("text-muted transition-transform duration-200", activeCategory === l.menu && "rotate-180")} />
                    )}
                    <span className={cn("absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-primary transition-all duration-300", isActive(l.href) ? "w-full" : "group-hover:w-full")} />
                  </Link>

                  {/* Dropdown (only the active category renders) */}
                  {l.hasMegaMenu && activeCategory === l.menu && (() => {
                    const menuData = megaMenuData[l.menu as keyof typeof megaMenuData];
                    if (!menuData) return null;
                    return (
                      <motion.div
                        key={l.menu}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        onMouseEnter={clearCloseTimer}
                        onMouseLeave={armCloseTimer}
                        className="absolute start-0 top-full z-50 w-64 rounded-xl border border-border bg-white shadow-card p-4"
                      >
                        <h4 className="mb-3 text-sm font-semibold text-primary">{t(menuData.title)}</h4>
                        <ul className="space-y-1">
                          {menuData.categories.map((cat) => (
                            <li key={cat.href}>
                              <Link href={cat.href} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-primary/5 hover:text-primary transition-colors">
                                {t(cat.name)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <Link
                            href={`/shop/${l.menu}`}
                            onClick={clearCloseTimer}
                            className="group/shop flex items-center justify-between rounded-lg bg-lightgreen px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-emerald-100"
                          >
                            <span>{t(menuData.shopAll)}</span>
                            <ArrowRight2 size={15} className={cn("transition-transform", isRTL && "rotate-180 group-hover/shop:-translate-x-0.5")} />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <CartDrawer />
      <SearchOverlay />

      {/* MOBILE BOTTOM NAV */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 w-full border-t border-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label="Mobile bottom navigation"
      >
        <div className="grid h-16 w-full grid-cols-5">
          <MobileNavItem href="/" label={t("nav.home")} active={isActive("/")}>
            <Home size={20} variant={isActive("/") ? "Bold" : "Linear"} />
          </MobileNavItem>
          <MobileNavItem href="/shop" label={t("nav.shop")} active={isActive("/shop")}>
            <ShoppingCart size={20} variant={isActive("/shop") ? "Bold" : "Linear"} />
          </MobileNavItem>
          <MobileNavItem href="/farms" label={t("nav.farms")} active={isActive("/farms")}>
            <Home2 size={20} variant={isActive("/farms") ? "Bold" : "Linear"} />
          </MobileNavItem>
          <MobileNavItem href="/orders" label={t("nav.orders")} active={isActive("/orders")}>
            <Box size={20} variant={isActive("/orders") ? "Bold" : "Linear"} />
          </MobileNavItem>
          <MobileNavItem href={user ? "/profile" : "/login"} label={t("nav.profile")} active={user ? isActive("/profile") : isActive("/login")}>
            <User size={20} variant={(user ? isActive("/profile") : isActive("/login")) ? "Bold" : "Linear"} />
          </MobileNavItem>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
            <motion.nav
              initial={{ x: isRTL ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 300 : -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 z-[91] flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl start-0"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between p-5 border-b border-border/50">
                <div className="flex items-center leading-none">
                  <LogoImage className="h-7 w-[130px]" />
                </div>
                <button onClick={() => setOpen(false)} className="h-9 w-9 place-items-center rounded-lg hover:bg-primary/5" aria-label={t("nav.closeMenu")}>
                  <CloseCircle size={20} />
                </button>
              </div>

              <div className="p-5 border-b border-border/50">
                <button 
                  onClick={() => { setOpen(false); setSearchOpen(true); }} 
                  className="flex h-11 w-full items-center gap-3 rounded-lg border border-border bg-bg px-4 text-sm text-muted"
                  aria-label={t("nav.search")}
                >
                  <SearchNormal size={16} /> {t("nav.searchPlaceholderMobile")}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">{t("nav.navigation")}</p>
                <div className="space-y-1">
                  {navLinks.map((l) => (
                    l.hasMegaMenu && l.menu ? (
                      <div key={l.href} className="overflow-hidden rounded-lg">
                        <button
                          type="button"
                          onClick={() => setActiveMobile((m) => (m === l.menu ? null : (l.menu as string)))}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-primary/5 transition-colors"
                          aria-expanded={activeMobile === l.menu}
                        >
                          <span>{t(l.label)}</span>
                          <ArrowDown2 size={15} className={cn("text-muted transition-transform duration-200", activeMobile === l.menu && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {activeMobile === l.menu && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pb-2 pl-2">
                                {(() => {
                                  const menuData = megaMenuData[l.menu as keyof typeof megaMenuData];
                                  if (!menuData) return null;
                                  return (
                                    <div className="space-y-0.5 border-s-2 border-primary/20 ps-2">
                                      {menuData.categories.map((cat) => (
                                        <Link key={cat.href} href={cat.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-[13px] text-muted hover:bg-primary/5 hover:text-primary transition-colors">
                                          {t(cat.name)}
                                        </Link>
                                      ))}
                                      <Link href={`/shop/${l.menu}`} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-semibold text-primary hover:bg-primary/5 transition-colors">
                                        <span>{t(menuData.shopAll)}</span>
                                        <ArrowRight2 size={15} className={cn(isRTL && "rotate-180")} />
                                      </Link>
                                    </div>
                                  );
                                })()}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-primary/5 transition-colors"
                      >
                        {t(l.label)}
                      </Link>
                    )
                  ))}
                </div>
                
                <div className="mt-6 space-y-1">
                  <Link href="/orders" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-primary/5 transition-colors">
                    <Box size={18} className="text-muted" /> {t("nav.orders")}
                  </Link>
                  <Link href="/offers" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg bg-lightgreen px-3 py-3 text-sm font-semibold text-primary">
                    <Tag size={15} /> {t("nav.offersCoupons")}
                  </Link>
                </div>
              </div>

              <div className="p-5 border-t border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                    className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-primary/30"
                    aria-label={t("nav.switchLanguage")}
                  >
                    <span className={language === "en" ? "text-primary font-medium" : "text-muted"}>EN</span>
                    <span className="text-border/60">|</span>
                    <span className={language === "ar" ? "text-primary font-medium" : "text-muted"}>عربي</span>
                  </button>
                </div>
                
                {user ? (
                  <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-primary/5 transition-colors">
                    <Avatar src={user.avatar} name={user.name} size={40} />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted">{t("nav.myAccount")}</p>
                    </div>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white">
                    <User size={16} /> {t("nav.signIn")}
                  </Link>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavItem({
  href,
  label,
  active,
  badge,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] leading-none"
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      <span className={cn("relative inline-flex items-center justify-center", active ? "text-primary" : "text-muted group-hover:text-primary")}>
        {children}
        {!!badge && badge > 0 && (
          <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold leading-none text-white">{badge}</span>
        )}
      </span>
      <span className={cn("max-w-full truncate", active ? "font-semibold text-primary" : "font-medium text-muted group-hover:text-primary")}>{label}</span>
    </Link>
  );
}

function AnimatedCount({ count }: { count: number }) {
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.4, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white"
    >
      {count}
    </motion.span>
  );
}