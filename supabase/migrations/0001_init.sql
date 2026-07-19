-- =============================================================================
-- Zerico — 0001 init: extensions, schema, indexes, triggers
-- Multi-tenant. Every tenant row carries business_id. See BACKEND.md §3.
-- =============================================================================

create extension if not exists "pgcrypto";  -- gen_random_uuid()
create extension if not exists "citext";     -- case-insensitive slug/email

-- updated_at auto-maintenance --------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- businesses (tenant root) -----------------------------------------------------
create table public.businesses (
  id                uuid primary key default gen_random_uuid(),
  slug              citext not null,
  name              text   not null,
  tagline           text,
  description        text,
  business_type     text,
  subscription_plan text not null default 'starter'
                    check (subscription_plan in ('starter','business','pro')),
  theme             text not null default 'cafe',
  primary_color     text,
  secondary_color   text,
  logo_url          text,
  cover_image_url   text,
  currency_symbol   text not null default '₹',
  timezone          text not null default 'Asia/Kolkata',
  phone             text,
  whatsapp          text,
  email             text,
  address           text,
  google_maps_url   text,
  location_lat      numeric(9,6),
  location_lng      numeric(9,6),
  instagram         text,
  facebook          text,
  website           text,
  is_published      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  deleted_at        timestamptz
);
-- Slug unique only among live businesses (a deleted slug can be reused).
create unique index businesses_slug_live_uk
  on public.businesses (slug) where deleted_at is null;
create index businesses_published_idx
  on public.businesses (is_published) where deleted_at is null;
create trigger trg_businesses_updated before update on public.businesses
  for each row execute function public.set_updated_at();

-- profiles (extends auth.users) ------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'owner' check (role in ('owner','super_admin')),
  business_id uuid references public.businesses(id) on delete set null,
  full_name   text,
  email       citext,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index profiles_business_idx on public.profiles (business_id);
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- On new auth user, create a matching profile (owner by default). ------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'owner')
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- categories -------------------------------------------------------------------
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name        text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create index categories_business_idx on public.categories (business_id, sort_order)
  where deleted_at is null;
create trigger trg_categories_updated before update on public.categories
  for each row execute function public.set_updated_at();

-- menu_items -------------------------------------------------------------------
create table public.menu_items (
  id           uuid primary key default gen_random_uuid(),
  business_id  uuid not null references public.businesses(id) on delete cascade,
  category_id  uuid references public.categories(id) on delete set null,
  name         text not null,
  description  text,
  price        numeric(10,2),
  image_url    text,
  diet         text not null default 'veg' check (diet in ('veg','egg','nonveg')),
  is_available boolean not null default true,
  is_popular   boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);
create index menu_items_business_idx
  on public.menu_items (business_id, category_id, sort_order)
  where deleted_at is null;
create trigger trg_menu_items_updated before update on public.menu_items
  for each row execute function public.set_updated_at();

-- gallery ----------------------------------------------------------------------
create table public.gallery (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  image_url   text not null,
  title       text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create index gallery_business_idx on public.gallery (business_id, sort_order)
  where deleted_at is null;
create trigger trg_gallery_updated before update on public.gallery
  for each row execute function public.set_updated_at();

-- offers -----------------------------------------------------------------------
create table public.offers (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  title       text not null,
  description text,
  image_url   text,
  starts_at   date,
  expiry_date date,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create index offers_business_idx on public.offers (business_id)
  where deleted_at is null;
create trigger trg_offers_updated before update on public.offers
  for each row execute function public.set_updated_at();

-- reviews ----------------------------------------------------------------------
create table public.reviews (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  customer_name text not null,
  rating        smallint not null check (rating between 1 and 5),
  body          text,
  is_approved   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index reviews_business_idx on public.reviews (business_id, is_approved)
  where deleted_at is null;
create trigger trg_reviews_updated before update on public.reviews
  for each row execute function public.set_updated_at();

-- opening_hours (one row per weekday, 0=Mon..6=Sun) ---------------------------
create table public.opening_hours (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  opens_at    time,
  closes_at   time,
  is_closed   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (business_id, day_of_week)
);
create index opening_hours_business_idx on public.opening_hours (business_id);
create trigger trg_opening_hours_updated before update on public.opening_hours
  for each row execute function public.set_updated_at();

-- settings (1:1 with business) -------------------------------------------------
-- `sections` is the Website Engine's per-page section config (WEBSITE-ENGINE §7):
--   { "home": [ { "type": "hero", "enabled": true }, ... ], "about": [ ... ] }
create table public.settings (
  business_id      uuid primary key references public.businesses(id) on delete cascade,
  sections         jsonb not null default '{}'::jsonb,
  accept_reviews   boolean not null default true,
  whatsapp_enabled boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create trigger trg_settings_updated before update on public.settings
  for each row execute function public.set_updated_at();
