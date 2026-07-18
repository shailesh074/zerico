# PROJECT.md — Source of Truth

> **Working codename:** **Plate** _(placeholder — final brand name TBD. Every use of "Plate" or `plate` in this doc is a rename target.)_
>
> **What this document is:** the single source of truth for the entire platform. Architecture, data model, roles, routing, design system, and roadmap all live here. Code should never contradict this file. When a decision changes, we change it **here first**, then in code.
>
> **Last aligned:** 2026-07-18

---

## 1. Product Vision

We are building a **SaaS platform that gives every independent food business its own premium digital presence** — website, menu, gallery, offers, and contact — that a customer reaches by scanning a QR code, with **no app install and no login**.

Think **Shopify + Linktree + Google Business + QR Menu**, purpose-built for cafés and restaurants. One codebase, one database, unlimited businesses.

**We are explicitly NOT building "a QR menu."** A QR menu is a feature. We are building the **digital identity layer** for small food businesses — the thing that replaces their PDF, their absent website, and their weak online presence with something that feels fast, elegant, and premium.

### Design philosophy (non-negotiable)
The product must feel **Fast · Elegant · Premium · Simple · Delightful · Mobile-first**.
- The **owner** must never feel overwhelmed.
- The **customer** must never feel like they're looking at a PDF.
- If a screen isn't beautiful on a phone, it isn't done.

### The real business (say it out loud)
This is a **distribution company wearing a software costume**. Any dev can build a QR menu; nobody has a moat on that. Our moat is **onboarding speed + eventual retention/data**. Two metrics govern everything:
1. **Time-to-live-page** — how fast can a café go from nothing to a stunning, shareable page. Target: **under 10 minutes**, done by the founder during a sales visit.
2. **Weekly return reason** — a beautiful page churns the moment it's billed. The retention hook (Offers push / scan Analytics) is a first-class product concern, scheduled right after the first café is live.

---

## 2. Target Users

### Buyers (MVP focus)
Cafés · Coffee shops · Restaurants · Fast food · Bakeries · Dessert shops · Small hotels with a restaurant.

### Buyers (future expansion)
Hostels · Salons · Gyms · Clinics · Local service businesses. _The architecture is business-type-agnostic; nothing in the schema should hard-code "restaurant"._

### The three human roles
| Role | Who | Where they live |
|---|---|---|
| **Customer** | Diner scanning a QR | Public site `/[slug]` — no auth |
| **Business Owner** | Café owner/manager | Dashboard — auth, scoped to their business |
| **Super Admin** | You (the founder) | Admin cockpit — auth, full access, creates businesses & owners |

---

## 3. Go-to-Market & Onboarding Model (drives the architecture)

**Sales-led, manual onboarding.** The founder personally approaches businesses, demos the platform, and onboards them by hand. **No self-serve signup, no billing, no payment gateway in the MVP.**

Architectural consequences:
- There is **no public "Sign Up" flow.** Accounts exist because the **Super Admin created them.**
- The Super Admin cockpit (create business → configure → create owner login → hand over credentials) **is a core MVP surface**, not an afterthought. It is the tool that makes 10-minute onboarding real.
- `subscription_plan` exists on the business as a **plain text field set by hand** (e.g. `trial`, `basic`, `pro`). **No billing logic behind it** in the MVP.
- Self-service signup, billing (Razorpay/Stripe), and plan enforcement are **explicitly deferred** to a later version.

---

## 4. User Journeys

### 4.1 Customer (unauthenticated)
```
Scan QR  →  /[slug] loads instantly  →  Hero (name, tagline, hours-open badge)
        →  Browse Menu (categories → items, veg/popular badges, prices)
        →  View Gallery  →  See active Offers
        →  Tap WhatsApp / Call / Directions / Instagram
        →  Done. No install. No login.
```

### 4.2 Business Owner (authenticated, scoped)
```
Receive credentials from founder  →  Log in  →  Dashboard overview
        →  Edit Profile (logo, cover, colors, hours, contact, socials)
        →  Manage Menu (categories + items CRUD, availability, images)
        →  Manage Gallery  →  Manage Offers  →  Pick Theme
        →  Everything updates the live /[slug] page instantly.
```

### 4.3 Super Admin — the onboarding cockpit (authenticated, global)
```
Log in  →  Admin dashboard (list of all businesses)
        →  "New Business": name, slug, business type, starter theme
        →  Create the owner user (email + temp password) linked to that business
        →  "Impersonate / Configure" → drop into that business's dashboard
        →  Seed initial menu + branding during the sales visit
        →  Hand slug URL + QR + owner credentials to the café.  ✅ under 10 min
```

---

## 5. Multi-Tenant Architecture

**Single tenant column model.** One Postgres database. Every business-owned row carries a `business_id`. Isolation is enforced by **Postgres Row Level Security**, not by application code — the DB is the last line of defense even if app code has a bug.

```
                         Plate (One Next.js App on Vercel)
                                       │
        ┌──────────────────────┬───────┴───────────┬──────────────────────┐
        │                      │                   │                      │
  Marketing site         Public site          Owner Dashboard      Super Admin Cockpit
  plate.com/(marketing)  plate.com/[slug]     plate.com/dashboard  plate.com/admin
   (sell the product)    (no auth, read)      (auth, own business) (auth, all businesses)
                                       │
                            ┌──────────┴──────────┐
                            │   Supabase (single) │
                            │  Postgres + RLS      │
                            │  Auth + Storage      │
                            └─────────────────────┘
```

**Routing:** **path-based** — `plate.com/cloudcafe`. Slugs are globally unique. (Subdomains and custom domains are a documented future upgrade; nothing about the path model blocks them later.)

**Tenant resolution:** the `[slug]` segment resolves a `business` row → all public queries filter by that `business_id` and by "published/available" flags.

---

## 6. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)** | React Server Components; SSR/ISR for public pages (fast + SEO) |
| Language | **TypeScript** | strict mode |
| Styling | **Tailwind CSS** | design tokens via CSS variables (theme system) |
| Components | **shadcn/ui** | owned in-repo, not a dependency; themeable |
| Animation | **Framer Motion** | public-page polish; used sparingly, performance-first |
| Backend | **Supabase** | Postgres, Auth, Storage, RLS |
| Data access | **Supabase JS client** + **Server Actions** | mutations via server actions; public reads via server components |
| Hosting | **Vercel** | |
| **Deferred** | Razorpay/Stripe · WhatsApp API · Resend · PostHog/Umami | not in MVP |

---

## 7. Folder Structure

Single Next.js app with **route groups**. (Monorepo `apps/ + packages/` is deliberately deferred — premature for this stage. We can split later without rewriting.)

```
plate/
├── PROJECT.md                      ← this file (source of truth)
├── public/
├── src/
│   ├── app/
│   │   ├── (marketing)/            # product marketing site
│   │   │   ├── page.tsx            # home
│   │   │   ├── features/
│   │   │   ├── pricing/
│   │   │   ├── demo/
│   │   │   └── contact/
│   │   ├── (auth)/
│   │   │   └── login/              # single login (no public signup)
│   │   ├── (dashboard)/
│   │   │   └── dashboard/          # owner-scoped
│   │   │       ├── page.tsx        # overview
│   │   │       ├── profile/
│   │   │       ├── menu/
│   │   │       ├── categories/
│   │   │       ├── gallery/
│   │   │       ├── offers/
│   │   │       └── theme/
│   │   ├── (admin)/
│   │   │   └── admin/              # super-admin cockpit
│   │   │       ├── page.tsx        # all businesses
│   │   │       └── businesses/[id]/
│   │   ├── [slug]/                 # PUBLIC customer site (no auth)
│   │   │   ├── page.tsx            # the beautiful page
│   │   │   ├── opengraph-image.tsx
│   │   │   └── not-found.tsx
│   │   ├── api/                    # route handlers where needed
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                     # shadcn primitives
│   │   ├── public/                 # Hero, MenuList, Gallery, OfferCard, ContactBar…
│   │   ├── dashboard/              # forms, tables, image uploaders
│   │   └── admin/
│   ├── lib/
│   │   ├── supabase/               # server + client factories
│   │   ├── auth/                   # session, role guards
│   │   ├── queries/                # typed data access (per entity)
│   │   ├── themes/                 # theme registry + token maps
│   │   └── utils/
│   ├── types/                      # DB types (generated) + domain types
│   ├── data/
│   │   └── mock/                   # Phase 1 mock data (before Supabase)
│   └── middleware.ts               # auth + route protection
├── supabase/
│   ├── migrations/                 # SQL schema + RLS policies
│   └── seed.sql
├── tailwind.config.ts
└── next.config.ts
```

---

## 8. Database Schema

Conventions: `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`, snake_case, every tenant table has `business_id uuid references businesses(id) on delete cascade`.

### 8.1 MVP tables

**businesses** — the tenant root
```
id · name · slug (unique) · business_type · description
logo_url · cover_image_url
theme (text, default 'cafe') · primary_color · secondary_color
phone · whatsapp · email · address · google_maps_url
instagram · facebook · website
opening_hours (jsonb)          # { mon: {open, close, closed}, ... }
subscription_plan (text)       # hand-set label, NO billing logic
is_published (bool, default false)
created_at
```

**profiles** — extends `auth.users` (id = auth uid)
```
id (uuid, = auth.users.id) · role ('super_admin' | 'owner')
business_id (nullable — null for super_admin) · name · email · created_at
```

**categories**
```
id · business_id · name · display_order · created_at
```

**menu_items**
```
id · business_id · category_id · name · description · price (numeric)
image_url · is_veg (bool) · is_available (bool, default true)
is_popular (bool, default false) · display_order · created_at
```

**gallery_images**
```
id · business_id · image_url · title · display_order · created_at
```

**offers**
```
id · business_id · title · description · image_url
expiry_date (date, nullable) · is_active (bool, default true) · created_at
```

### 8.2 Deferred tables (documented now, built later)
`reviews` (customer_name, rating, review, approved) · `events` (title, date, image) · `customers` (name, phone, email, birthday, visits) · `analytics_events` (qr_scan, page_view, item_view, whatsapp_click, call_click, …).

The retention hook (Offers already in MVP + a lightweight `analytics_events` table) is the **first post-MVP addition**, because it creates the weekly reason to log in.

---

## 9. Authentication & Role System

**Provider:** Supabase Auth, email + password. **No public signup** — the Super Admin creates all accounts.

### Roles
| Role | `profiles.role` | `business_id` | Can |
|---|---|---|---|
| **Super Admin** | `super_admin` | `null` | Create businesses; create owner users; read/write **any** business; impersonate/configure |
| **Business Owner** | `owner` | set | Read/write **only** rows where `business_id` = their own |
| **Customer** | _no account_ | — | Read **published** business data only |

### Flow
```
Founder (super_admin) creates business + owner account (server action, service role)
        → owner receives email + temp password
        → owner logs in → middleware reads session → loads profile → resolves role
        → role guard routes:  owner → /dashboard   |   super_admin → /admin
        → every query is RLS-scoped in the database
```

### Route protection (middleware)
- `/[slug]`, `/(marketing)/*`, `/login` → public
- `/dashboard/*` → requires `owner` (or `super_admin`)
- `/admin/*` → requires `super_admin`

---

## 10. Row Level Security (the sharp edge — get this right day one)

The public site is **unauthenticated read**, so policies split three ways:

1. **Public read, published only** — anonymous role may `SELECT` from `businesses` where `is_published = true`, and from child tables (menu, categories, gallery, offers) whose parent is published and whose own availability flags allow it (`menu_items.is_available`, `offers.is_active`). **No public writes anywhere.**
2. **Owner read/write, scoped** — authenticated `owner` may do all operations **only** where `business_id` = `(select business_id from profiles where id = auth.uid())`.
3. **Super Admin, global** — a policy predicate `exists (select 1 from profiles where id = auth.uid() and role = 'super_admin')` grants full access across businesses. Business/owner **creation** runs through a **server action using the service role key** (server-side only, never exposed to the client).

Every tenant table has RLS **enabled** with an explicit policy for each of the three. A table with RLS on and no policy = deny-all (safe default). Migrations that add a tenant table **must** add its policies in the same migration.

---

## 11. Route Structure

| Route | Group | Auth | Purpose |
|---|---|---|---|
| `/` | marketing | public | Product home |
| `/features` `/pricing` `/demo` `/contact` | marketing | public | Sell the product |
| `/login` | auth | public | Single login (no signup) |
| `/[slug]` | — | public | **Customer site** (the money page) |
| `/dashboard` | dashboard | owner | Overview |
| `/dashboard/profile` | dashboard | owner | Branding, contact, hours |
| `/dashboard/menu` · `/categories` | dashboard | owner | Menu + category CRUD |
| `/dashboard/gallery` · `/offers` · `/theme` | dashboard | owner | Gallery, offers, theme |
| `/admin` | admin | super_admin | All businesses |
| `/admin/businesses/[id]` | admin | super_admin | Create/configure a business & owner |

---

## 12. Public Website Architecture (`/[slug]`)

The **sales asset**. It must be stunning before anything else exists. Server-rendered (ISR) for speed + SEO + shareable OG images.

**Section stack (mobile-first, single scroll):**
1. **Hero** — cover image, logo, name, tagline, live "Open now / Closed" badge from `opening_hours`.
2. **Sticky action bar** — Menu · WhatsApp · Call · Directions (thumb-reachable).
3. **Menu** — categories as sections; items with image, name, description, price, veg dot, "Popular" badge; unavailable items hidden or greyed.
4. **Offers** — active, non-expired offers as cards.
5. **Gallery** — responsive grid / lightbox.
6. **Visit** — hours table, address, embedded map, Instagram/Facebook/website links.
7. **Footer** — "Powered by Plate" (soft distribution loop).

Data: Phase 1 from `src/data/mock`; Phase 2 swapped to Supabase queries with **zero component changes** (components take typed props; the data source is behind `lib/queries`).

---

## 13. Dashboard Architecture

Calm, uncluttered, mobile-usable (owners will edit on their phone). Left nav (Overview, Profile, Menu, Categories, Gallery, Offers, Theme). Each module: a clean list/table + a form drawer/modal, optimistic UI, image upload to Supabase Storage. Every save reflects on the live page immediately (revalidate the `[slug]` path). The guiding feeling: **an owner should never feel they need a manual.**

---

## 14. Super Admin Cockpit

Optimized for **speed of onboarding during a live sales visit**:
- Businesses list (search, status, plan label).
- **New Business** wizard: name → auto-slug (editable) → business type → starter theme → create owner (email + temp password) in one flow.
- **Configure**: drop into the business's dashboard (impersonation) to seed menu + branding on the spot.
- Toggle `is_published` to take the page live and hand over the QR + URL.

---

## 15. Theme System

Same code, different appearance — driven by **CSS custom properties**, not conditional components. A theme = a token map (colors, fonts, radius, spacing feel, shadows). Switching a business's `theme` reassigns tokens; components never branch on theme name.

- **MVP: ship exactly TWO flawless themes** (proposed: **`Cafe`** — warm, cozy, editorial; **`Modern`** — clean, minimal, high-contrast). Two great themes beat seven half-polished ones.
- **Roadmap themes:** Luxury · Dark · French · Elegant · Minimal — added one at a time, each fully QA'd in light/dark on mobile.
- Per-business `primary_color` / `secondary_color` overlay on top of the chosen theme's tokens.

```
:root[data-theme="cafe"]   { --bg, --fg, --accent, --muted, --radius, --font-display, --font-body, ... }
:root[data-theme="modern"] { ... }
```

---

## 16. Component Library & Design System

**Design tokens** (CSS variables, theme-driven): color (bg, surface, fg, muted, accent, border, success/warn), typography (display + body font, type scale), spacing scale, radius, shadow/elevation, motion (durations, easings). **Every color is a token** — no hard-coded hex in components. Full light + dark support.

**Primitives (`components/ui`, shadcn):** Button, Input, Textarea, Select, Switch, Dialog, Drawer, Card, Badge, Tabs, Table, Toast, Skeleton, Avatar, Tooltip.

**Public (`components/public`):** Hero, StickyActionBar, MenuSection, MenuItemCard, VegBadge, PopularBadge, OpenStatusBadge, OfferCard, GalleryGrid, HoursTable, MapEmbed, SocialLinks, PoweredByFooter.

**Dashboard/Admin (`components/dashboard`, `components/admin`):** SidebarNav, EntityTable, FormDrawer, ImageUploader, ColorPicker, ThemePicker, PublishToggle, BusinessWizard, EmptyState.

**Rules:** mobile-first always · accessible (labels, focus states, contrast) · loading = Skeletons not spinners where possible · motion is subtle and never blocks interaction.

---

## 17. API / Data-Access Structure

- **Public reads:** React Server Components call typed functions in `lib/queries/*` (Supabase anon client, RLS-enforced). ISR + on-write revalidation.
- **Owner mutations:** **Server Actions** (authenticated user client, RLS-scoped). No hand-rolled REST for CRUD.
- **Privileged operations** (create business, create owner user): Server Actions using the **service-role client, server-only**, guarded by a super-admin check. Service-role key never reaches the browser.
- **`app/api/*` route handlers:** only where a true HTTP endpoint is needed (webhooks, OG image, future integrations).
- **Types:** generated from the Supabase schema into `src/types`, imported everywhere for end-to-end type safety.

---

## 18. Development Roadmap

Build in the order that produces a **sellable asset first** and defers billing to last.

**Phase 1 — Public page on mock data ✅ _(start here)_**
Scaffold Next.js + TS + Tailwind + shadcn. Design tokens + the `Cafe` theme. Build the full, beautiful `/[slug]` public page from `src/data/mock`. No backend. Outcome: a stunning page you can show a café tomorrow.

**Phase 2 — Supabase behind the page**
Create project; migrations for MVP tables + **RLS policies**; storage buckets. Swap mock data for real queries (components unchanged). Seed one demo business.

**Phase 3 — Auth + Owner Dashboard**
Supabase Auth, login, middleware role guards. Owner dashboard: Profile + Menu + Categories CRUD, live revalidation. Image uploads.

**Phase 4 — Super Admin Cockpit**
Businesses list, New Business wizard, owner-account creation (service role), impersonation, publish toggle. Now onboarding a café end-to-end is real.

**Phase 5 — Gallery, Offers, Theme picker, second theme (`Modern`)**
Complete remaining owner modules; ship theme #2; polish.

**Phase 6 — Retention hook**
`analytics_events` (QR scans, page/item views, WhatsApp/call clicks) + owner-facing insights, and offer surfacing. This is what makes owners log back in weekly.

**Later (explicitly deferred):** self-serve signup, subscription billing (Razorpay/Stripe), WhatsApp API, email (Resend), reviews, events, customers/CRM, subdomains & custom domains, POS/inventory/ordering/loyalty/reservations.

---

## 19. Out of Scope for MVP (guard this list)
❌ POS ❌ Inventory ❌ Billing/subscriptions ❌ Payment gateway ❌ Kitchen display ❌ Loyalty ❌ Customer login ❌ Online ordering ❌ Reservations ❌ AI ❌ Self-serve signup ❌ Reviews ❌ Events ❌ Instagram feed embed ❌ Subdomains/custom domains.

_Adding anything here before there are paying, active cafés is how this project dies. Discuss before crossing the line._

---

## 20. Open Decisions (to revisit)
- **Brand name** (replaces "Plate").
- **Primary market / currency framing** for the marketing site (payments are out, but pricing copy still implies a market). _Founder indicated payments/Razorpay are out of MVP; market to confirm when marketing site is built._
- Which retention hook leads in Phase 6 — **Offers push** vs **scan Analytics** (lightweight analytics currently favored).
- Final choice of the two launch themes' visual direction.
