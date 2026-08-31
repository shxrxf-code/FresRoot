# FRESROOT — Project Source of Truth

> **FRESROOT** is a UAE-based **farm-to-door** grocery ecommerce platform. Produce is quality-checked, traceable, and delivered across all seven Emirates. This application is built as an **investor / funding demo** that showcases the full product vision: customer shopping, farm partner operations, and an admin platform — running on realistic UAE data.

This document is the single source of truth for FRESROOT's product requirements and design decisions. All future development must follow it. It is **not** an API changelog; edit it whenever a product decision changes.

---

## 1. Product Overview

- **UAE farm-to-door platform.** Fresh produce goes from verified UAE farms directly to customers' doors in Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, and Ras Al Khaimah.
- **Purpose: investor / funding demo.** The demo must look and behave like a production-grade, investor-ready product — no lorem ipsum, no empty placeholders, no broken interactions.
- **Three interconnected platforms:**
  1. **Customer platform** — shop, orders, subscriptions, farms, loyalty, delivery.
  2. **Farm Partner platform** — farm management and quality verification.
  3. **Admin platform** — analytics, inventory, orders, deliveries, customers.

### Current implementation status
- **Customer platform** — implemented and shipped (route group `app/(customer)/`).
- **Admin platform** — partially implemented at `app/admin/` (referenced from customer accounts with `role === "ADMIN"`).
- **Farm Partner platform** — planned route group `app/(farm)/`; not yet scaffolded. Quality verification is already demonstrated on the customer side through GreenIQ™ quality checks on product pages.
- `data/mock.ts`, `stores/` (Zustand), `components/`, `hooks/`, and `lib/` are the shared building blocks across all platforms.

---

## 2. Design & Branding

### Look and feel
- **Premium, modern, commerce-first UI** — Myntra-style ecommerce UX *structure* and density, but **never** Myntra branding, colors, or copy.
- **Full-width desktop layout.** No site-wide `max-w-[1200px]` container. Content uses a responsive padding system instead.
  - Fluid padding (the `fluidPad` convention):
    `px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20`
  - Detailed product surfaces that remain user-friendly when wide: cart, checkout, order tracking, contact keep a capped container (`max-w-6xl`).
- **Mobile-first responsive.** Bottom navigation, 2-column product grids, horizontal swipeable rails/categories, sticky filter & sort bars, full-screen search.
- **Ecommerce grid targets** (product rails & shop grid):
  - 2 columns on mobile
  - 3 on `sm`, 4 at `1280`, 5 at `1440+`, up to 6 at `1920`.

### FRESROOT brand tokens
| Token | Value | Usage |
| --- | --- | --- |
| Primary | `#14532D` | brand green, headers, CTAs |
| Secondary | `#22C55E` | accent green, highlights, "on-dark" accents |
| Background | `#F7FAF7` | app background |
| Text (ink) | `#17201A` | body text |
| Accent | `#D6A85F` | gold: badges, count bubbles, offers |
| Light green | `lightgreen` | soft green fills, tinted chips |

- Tailwind tokens: `text-primary`, `bg-primary`, `text-secondary`, `text-ink`, `text-muted`, `bg-lightgreen`, `border-border`, `text-accent`, `shadow-card`, `shadow-soft`, `bg-bg`, `radius` scales (`rounded-xl/2xl/3xl`), and `ring-ring`.
- Brand name is always displayed as **FRESROOT** with the tagline **"Farm to Door"** and the motto **"Know your food. Know your farm."**

### Header & navigation (customer)
- Announcement bar: **"Free delivery on orders above AED 150 across the UAE"** with an **Offers** shortcut.
- Primary nav links (9), in order:
  `HOME · SHOP · VEGETABLES · FRUITS · HERBS · MILLETS · FARM BOXES · OUR FARMS · SUBSCRIPTIONS`
- Right-hand cluster: **prominent search bar**, wishlist, profile/sign-in, cart with animated count, `EN | عربي` language toggle.
- Cart is always visibly accessible (header on desktop, floating cart FAB on mobile).

### Mobile bottom navigation
- Five tabs, exactly: **HOME · SHOP · WISHLIST · ORDERS · PROFILE**.
- Cart is kept **highly visible** as a floating circular FAB above the bottom bar with a live count badge.

---

## 3. Customer Platform Requirements

### Homepage (commerce-first — exact section order)
1. **Promotional Banner** — swipeable full-width carousel with `SHOP NOW` CTAs (auto-advance + dots + arrows, scroll-snap swipe on mobile).
2. **Shop by Category** — horizontal row of the 11 categories, swipeable on mobile.
3. **Fresh This Week** — tabbed product rail. Tabs: **Fresh This Week · Best Sellers · Seasonal Produce · Farm Fresh Picks**.
4. **Subscription Boxes** — plan cards.
5. **Featured Farms** — farm cards with a farm-transparency strip.
6. **Deals & Offers** — offer cards with copy-to-clipboard coupon codes.
7. **Origin Journey** — "Know Where Your Food Comes From" differentiator (traceability band).
8. **Recently Viewed** — rail from the recently-viewed store (hidden when empty).
9. **Recommended for You** — personalized rail (hidden when empty).
10. **Footer** + closing brand CTA band.

**Never** include a "How FRESROOT Works" section on the homepage. This section was built earlier and has been **permanently removed**; it must not be reintroduced.

### Categories (11, in order)
1. Vegetables (`vegetables`)
2. Fruits (`fruits`)
3. Leafy Greens (`leafy-greens`)
4. Herbs (`herbs`)
5. Microgreens (`microgreens`)
6. Dates (`dates`)
7. Millets (`millets`)
8. Grains (`grains`)
9. Pulses (`pulses`)
10. Farm Boxes (`farm-boxes`)
11. Organic Pantry (`organic-pantry`)

### Search
- Desktop: prominent search bar with a **suggestion dropdown** — recent + popular searches, matching categories and suggested products. Example behavior: typing `tom` → *Tomatoes, Cherry Tomatoes, Tomato Box*.
- Mobile: full-screen search overlay, `⌘K` / `Ctrl+K` shortcut opens the same search.
- Placeholder: *"Search for vegetables, fruits, herbs, millets..."*
- Popular searches come from demo data; recent searches persist locally.
- Empty states must be helpful, never blank.

### Shop / catalog
- Header: **"Fresh Produce"** + live product count + prominent search.
- **Left filter sidebar** (accordion groups): Category, Price, Farm, Rating, Farming Method, Availability, Harvest Date, Delivery Area. All filters functional and combinable.
- **Sort:** Recommended · Freshest · Popular · Price: Low to High · Price: High to Low.
- **Grid:** 2 mobile / 3 `sm` / 4 `xl` / 5 `2xl` columns.
- Mobile: sticky **Filters** button with active-count badge + horizontal category chips + 2-column grid.
- Supports URL params: `?q=` (search), `/shop/[category]` slugs, `?farm=<farmId>` (from Farms: **"Shop This Farm"**).
- Product card shows badge, farm, location, rating, price, harvest freshness, availability, wishlist heart, and quick-view/add-to-cart.

### Product detail
- **LEFT:** image gallery (main + thumbnails with zoom), sticky on desktop.
- **RIGHT:** rating, name, badges, price / unit, farming method, farm link + location, harvest date, delivery estimate, description, trust rows, quantity selector, **ADD TO CART · BUY NOW · WISHLIST**.
- **6 tabs:** Product Details · Farm Information · Quality Information · Nutrition · Reviews · Delivery Information.
- **Expandable / traceability journey:** *Farm → Harvest → Quality Check → Packed → Delivery → Customer*, with per-stage timestamps ("From Farm to Your Door").
- Every product view records into **Recently Viewed**.
- Related-products rail at the bottom.

### Cart
- Line items with image, product, farm, qty stepper, price, remove, and **Move to Wishlist**.
- **Order summary:** Subtotal → Delivery → Discount → VAT (5%) → Total (AED).
- **Coupon field** with validation; supported codes (see Offers).
- **PROCEED TO CHECKOUT.** Free delivery above AED 150 (fee AED 25 otherwise).

### Checkout (4 steps)
1. **Delivery Address** — saved Home/Office + add-new form.
2. **Delivery Slot** — five slots: `8–11 AM`, `11 AM – 2 PM`, `2 PM – 5 PM`, `5 PM – 8 PM`, `8 PM – 11 PM`.
3. **Payment** — Credit/Debit Card, Apple Pay, Google Pay, Cash on Delivery.
4. **Review Order** — items, address, slot, payment, totals.
- Placing an order generates an id (`#FR10248` style), clears the cart, and lands on **Order Success**.

### Order success & tracking
- Success page reads `?id=` (default `FR10248`), shows confirmation timeline, **Track Order** → `/orders/<id>`.
- **Tracking page** `#FR10248` style order, 7 statuses in order:
  `Order Placed → Confirmed → Harvested → Quality Checked → Packed → Out for Delivery → Delivered`
- Shows **ETA, delivery location (with coordinates), delivery agent, order summary, items, and a simulated live delivery route**.

### Wishlist
- Table: **Product / Farm / Price / Availability** with **Add to Cart** and **Remove** actions.

### Subscriptions
- Plans (exact): **Fresh Weekly Box AED 129/wk · Family Farm Box AED 249/wk · Fruit Box AED 119/wk · Green Essentials AED 179/mo**.
- Manage actions that must work: **Subscribe · Pause/Resume · Skip · Modify · Cancel** (with restore), plus change address.

### Farms
- Farm cards: image, name, location, rating, verification badge, products count, bio.
- **"Shop This Farm"** CTA → shop filtered by that farm.
- Farm profile pages give full transparency (certifications, method, bio).

### Loyalty
- **Green Points** rewards on the customer account, with tiers/rewards and a progress bar.

### Offers
- Codes that must apply at cart checkout:
  - `WELCOME20` — 20% off (min AED 100, max AED 50)
  - `FRESH50` — AED 50 off (min AED 250)
  - `FREESHIP` — free delivery (min AED 200)
  - `GREEN10` — 10% off (min AED 150)
  - `FARM15` — AED 15 off (min AED 100)
- `/offers` page: coupon cards with **copy-to-clipboard**, how-to-use steps, and rule summaries.

### Customer account dashboard
- Sections (all reachable): **Orders · Wishlist · Addresses · Payment Methods · Subscriptions · Green Points · Notifications · Profile · Help & Support**.
- Stat cards (order count, wishlist items, active subscriptions, Green Points) + recent-orders preview + safe search input.

---

## 4. Farm Partner Platform (planned)

- Farm management: farms, products, pricing, delivery slots, orders from their farm.
- **Quality verification**: submit quality-check results per batch (GreenIQ™) — freshness, appearance, weight, packaging, temperature — reflected in traceability on the customer side.
- Farming methods displayed per farm/product: Organic, Natural, Biodynamic.
- Certifications: GLOBALG.A.P., UAE Organic, ISO 22000.

---

## 5. Admin Platform

- **Analytics & charts** (Recharts): revenue, orders, customers, top products, category performance.
- **Inventory** management (stock levels, `stockKg`).
- **Orders** management with statuses/deliveries.
- **Deliveries** tracking and delivery-agent assignment.
- **Customers** directory.
- Accessible from customer account when `role === "ADMIN"` (`/admin`); customer nav shows `Go to Admin Dashboard`.

---

## 6. Investor Module

- Business model and growth roadmap content: mission, market opportunity, revenue model (marketplace + subscription boxes + delivery), UAE-specific geographic expansion (Dubai → Abu Dhabi → Sharjah → all Emirates → GCC), and product roadmap.
- Investor homepage section must read as a polished, credible funding pitch (labeled as demo/concept where applicable).

---

## 7. Localization & Data

### Currency, locations, contact
- Currency: **AED** only. Pricing formatted via `lib/format.ts` (`formatAED`).
- Locations: **United Arab Emirates** cities — Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Ras Al Khaimah.
- Phone format `+971`, e.g. `+971 5x xxx xxxx`.
- Delivery areas list mirrors the six cities.

### English + Arabic / RTL readiness
- `EN | عربي` language toggle is present in the header.
- UI copy must be written to translate cleanly; keep RTL layout in mind (use logical spacing, avoid hardcoded LTR-only markup patterns) even though English is the primary shipped language.

### Realistic demo data
- `data/mock.ts` is the single mock source: 11 categories, 27+ products, farms, orders, subscriptions, offers, delivery slots, popular searches, journey stages (with `getProductJourney`), quality checks, user reviews, notifications, stats.
- **No lorem ipsum**, no empty placeholder text. Every screen shows realistic produce and numbers.
- Demo/soft claims are labeled honestly: `Demo — no real payment will be processed.`, `GreenIQ™` as an illustrative brand, roadmap as illustrative.

---

## 8. Technology Stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Tailwind CSS** (tokens in `tailwind.config.ts`)
- **shadcn/ui**-style primitives (button, badge, input, modal, skeleton, star, pagination, card, avatar, logo)
- **Lucide** icons
- **Framer Motion** animations
- **Recharts** charts (admin analytics)
- **Zustand** with `persist` (stores below)
- All images `unoptimized`; presentation quality over optimization for the demo

### Zustand stores (`stores/`)
- `auth` — user/session, persist `fresroot-auth`
- `cart` — items, coupon, drawer state + price helpers (`subtotal`, `deliveryFee`, `discount`, `vat`, `total`), persist `fresroot-cart`
- `wishlist` — persist `fresroot-wishlist`
- `history` — recently-viewed (max 12) + recent searches (max 8), persist `fresroot-history`
- `ui` — global search overlay open state

### Key directories
- `app/(customer)/` — customer routes
- `app/admin/` — admin routes (farm platform planned as `app/(farm)/`)
- `components/` — shared + `components/home/*`, `components/ui/*`
- `data/`, `stores/`, `lib/`, `hooks/`, `public/`

---

## 9. Image Handling (hard rules)

Audit for these violations whenever images are added or edited:
- **Never** combine `fill` with `width`.
- **Never** combine `fill` with `height`.
- `fill` requires: a `relative` parent, an explicit `aspect-*` or `height`, `object-cover`, and `sizes`.
- Non-fill images must set explicit `width` + `height` (e.g., thumbnails).
- All `<Image>` instances use `unoptimized`.
- Images come from a CDN (Unsplash-style URLs) with `w=`/`q=` params — never local-only assets in the demo.
- Run the audit: a `node -e` walker over `app/` and `components/` that greps `<Image>` attribute conflicts must report **no fill+width/height conflicts**.

---

## 10. Build & Validation Workflow

- **Build:** `npm run build` must pass (compiles + type-checks + lints). Fix every error before proceeding.
- **Dev server:** run on port 3000. Restart procedure (do **not** `pkill -f next`):
  ```bash
  PID=$(ss -ltnp 2>/dev/null | grep ':3000' | grep -oP 'pid=\K[0-9]+' | head -1); [ -n "$PID" ] && kill "$PID"
  setsid bash -c 'cd /home/sharaf/Projects/FresRoot && exec npm run dev' < /dev/null > /tmp/fresroot-dev.log 2>&1 & disown
  ```
- **Smoke test:** `curl -o /dev/null -w "%{http_code}"` across `/`, `/shop?q=tomato`, `/shop?farm=f1`, `/farms`, `/subscriptions`, `/cart`, `/product/p3`, `/farms/f1`, `/offers`, `/wishlist`, `/order-success?id=FR10248`, `/orders/FR10001`, `/payment-methods`, `/dashboard`, `/profile` — all `200`.
- **Copy grep caveat:** React SSR inserts `<!-- -->` between text nodes. A literal phrase may not appear contiguous in HTML; verify pieces, or confirm the section is genuinely (and intentionally) empty (e.g., Recently Viewed / Recommended render nothing on a first visit).

---

## 11. Non-Negotiables Checklist

- [ ] Myntra UX inspiration only — FRESROOT branding/colors/copy, never Myntra's.
- [ ] Full-width, fluid-padded desktop; responsive mobile with bottom nav + cart FAB.
- [ ] The "How FRESROOT Works" homepage section stays removed.
- [ ] Realistic UAE data, AED currency, no lorem ipsum, no dead ends.
- [ ] Search, filters, sort, wishlist, cart, coupons/VAT, checkout, orders, subscriptions, farm shop, offers, dashboard — everything interactive and working.
- [ ] Image `fill` rules hold; image audit clean.
- [ ] `npm run build` passes before and after changes.