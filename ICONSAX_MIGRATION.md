# Iconsax Migration Reference

Replace all `lucide-react` icons with `iconsax-react` icons.
- Import location: `import { IconName } from "iconsax-react";`
- Iconsax IconProps: `{ variant?: 'Linear'|'Outline'|'Broken'|'Bold'|'Bulk'|'TwoTone', size?: string|number, color?: string, className?: string }`
- Default variant is `Linear`.
- To replace a "filled / solid" lucide icon (lucide used `fill="currentColor"`), use `variant="Bold"`.
- For active nav states, use `variant="Bold"` so active is visually distinct from inactive `Linear`.
- KEEP existing `className` (sets currentColor via tailwind color classes) and `size` values to preserve colors and layout. Do NOT change colors/spacing/layout.
- REMOVE the `from "lucide-react"` import line entirely after replacing all usages in the file.
- Remove unused imports.

## Mapping (Lucide -> Iconsax)
Activity -> Activity
AlertTriangle -> Warning2
Apple -> Apple
ArrowDown -> ArrowDown
ArrowDownRight -> ArrowDown2
ArrowLeft -> ArrowLeft
ArrowRight -> ArrowRight
ArrowUp -> ArrowUp
ArrowUpDown -> Sort
ArrowUpRight -> ArrowUp
BadgeCheck -> Verify
Banknote -> Bank
BarChart -> Chart
Bell -> Notification
BellRing -> NotificationBing
Boxes -> Box1
Briefcase -> Briefcase
CalendarCheck -> CalendarTick
CalendarClock -> Calendar
CalendarDays -> Calendar2
Check -> TickCircle
CheckCheck -> TickCircle
CheckCircle -> TickCircle
ChevronDown -> ArrowDown2
ChevronLeft -> ArrowLeft2
ChevronRight -> ArrowRight2
ChevronUp -> ArrowUp2
Clock -> Clock
Coins -> Coin
Copy -> Copy
CornerDownLeft -> ArrowDown
CreditCard -> Card
Eye -> Eye
Facebook -> Facebook
FileBarChart -> ChartSquare
FileDown -> DocumentDownload
FileText -> DocumentText
Gift -> Gift
Heart -> Heart
HeartHandshake -> Heart
History -> Clock
Home -> Home
Hourglass -> Timer1
House -> Home
Info -> InfoCircle
Instagram -> Instagram
LayoutDashboard -> Element
Leaf -> Tree
LifeBuoy -> Lifebuoy
Loader -> Refresh
Lock -> Lock
LogOut -> Logout
Mail -> Message
MapPin -> Location
Menu -> Menu
Minus -> Minus
MoreHorizontal -> More
Package -> Box
Pause -> Pause
PauseCircle -> PauseCircle
Pencil -> Edit
Phone -> Call
Play -> Play
Plus -> Add
Quote -> QuoteDown
Recycle -> Recycle
Repeat -> Repeat
Rocket -> Award
RotateCcw -> ArrowRotateLeft
ScanLine -> Scan
Search -> SearchNormal
Send -> Send
Settings -> Setting2
Share -> Share
Shield -> Shield
ShieldCheck -> ShieldTick
ShoppingBag -> ShoppingBag
ShoppingBasket -> ShoppingCart
SkipForward -> Next
SlidersHorizontal -> Filter
Smartphone -> Mobile
Sparkles -> MagicStar
Sprout -> Tree
Star -> Star
StarHalf -> Star1
Store -> Shop
Sun -> Sun
Tag -> Tag
Ticket -> Ticket
Timer -> Timer
Trash -> Trash
TrendingUp -> TrendUp
Trophy -> Medal
Truck -> Truck
User -> User
UserIcon -> User
UserPlus -> UserAdd
Users -> People
Wallet -> Wallet
XCircle -> CloseCircle
Youtube -> Youtube
Zap -> Flash

## Type-only refs
LucideIcon -> use `iconsax-react`'s icon type. Replace `LucideIcon` type annotations (used e.g. for sidebar item icon types) with `iconsax-react`'s `Icon` type: `import { type Icon } from "iconsax-react";`

## Notes
- `fill="currentColor"` props from lucide: DROP them and instead add `variant="Bold"` to that icon, OR keep the hearts/stars filled appearance using variant="Bold" and color via className.
- For the StarRating component (currently uses Star/StarHalf from lucide), render Iconsax `Star` with `variant="Bold"` and className "fill-amber-400 text-amber-400" for filled stars and gray for empty.
- Toast/CommandPalette/etc all just swap the icon components; keep props like size/className.
- Do not change any non-icon code.
