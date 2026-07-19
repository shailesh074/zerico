-- =============================================================================
-- Zerico — 0002 RLS: helpers + policies. See BACKEND.md §6.
-- Three archetypes per table: public read (published+visible), owner (own rows),
-- super-admin (global). Permissive policies are OR-ed.
-- =============================================================================

-- Tenant helpers (SECURITY DEFINER → no RLS recursion on profiles) -------------
create or replace function public.current_business_id()
returns uuid language sql stable security definer set search_path = public as $$
  select business_id from public.profiles where id = auth.uid();
$$;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$;

-- Enable RLS on everything -----------------------------------------------------
alter table public.businesses    enable row level security;
alter table public.profiles      enable row level security;
alter table public.categories    enable row level security;
alter table public.menu_items    enable row level security;
alter table public.gallery       enable row level security;
alter table public.offers        enable row level security;
alter table public.reviews       enable row level security;
alter table public.opening_hours enable row level security;
alter table public.settings      enable row level security;

-- businesses -------------------------------------------------------------------
create policy businesses_public_read on public.businesses
  for select to anon, authenticated
  using (is_published and deleted_at is null);

create policy businesses_owner_read on public.businesses
  for select to authenticated
  using (id = public.current_business_id());

create policy businesses_owner_update on public.businesses
  for update to authenticated
  using (id = public.current_business_id())
  with check (id = public.current_business_id());

create policy businesses_admin_all on public.businesses
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- profiles ---------------------------------------------------------------------
create policy profiles_self_read on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_super_admin());

create policy profiles_self_update on public.profiles
  for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

create policy profiles_admin_all on public.profiles
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- Helper predicate: is a business publicly visible? ----------------------------
-- (Inlined per table below since policies can't call a table-arg function cleanly.)

-- categories -------------------------------------------------------------------
create policy categories_public_read on public.categories
  for select to anon, authenticated
  using (deleted_at is null and exists (
    select 1 from public.businesses b
    where b.id = categories.business_id and b.is_published and b.deleted_at is null));
create policy categories_owner_all on public.categories
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy categories_admin_all on public.categories
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- menu_items -------------------------------------------------------------------
-- Note: unavailable items are still returned so the public page can show them
-- greyed as "Sold out"; `is_available` is a display flag, not a visibility gate.
create policy menu_items_public_read on public.menu_items
  for select to anon, authenticated
  using (deleted_at is null and exists (
    select 1 from public.businesses b
    where b.id = menu_items.business_id and b.is_published and b.deleted_at is null));
create policy menu_items_owner_all on public.menu_items
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy menu_items_admin_all on public.menu_items
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- gallery ----------------------------------------------------------------------
create policy gallery_public_read on public.gallery
  for select to anon, authenticated
  using (deleted_at is null and exists (
    select 1 from public.businesses b
    where b.id = gallery.business_id and b.is_published and b.deleted_at is null));
create policy gallery_owner_all on public.gallery
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy gallery_admin_all on public.gallery
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- offers -----------------------------------------------------------------------
create policy offers_public_read on public.offers
  for select to anon, authenticated
  using (deleted_at is null and is_active
    and (expiry_date is null or expiry_date >= current_date)
    and exists (
      select 1 from public.businesses b
      where b.id = offers.business_id and b.is_published and b.deleted_at is null));
create policy offers_owner_all on public.offers
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy offers_admin_all on public.offers
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- reviews ----------------------------------------------------------------------
create policy reviews_public_read on public.reviews
  for select to anon, authenticated
  using (deleted_at is null and is_approved and exists (
    select 1 from public.businesses b
    where b.id = reviews.business_id and b.is_published and b.deleted_at is null));
-- Anyone may submit a review, but only as PENDING (never self-approve).
create policy reviews_public_submit on public.reviews
  for insert to anon, authenticated
  with check (is_approved = false and exists (
    select 1 from public.businesses b
    where b.id = business_id and b.is_published and b.deleted_at is null));
create policy reviews_owner_all on public.reviews
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy reviews_admin_all on public.reviews
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- opening_hours ----------------------------------------------------------------
create policy opening_hours_public_read on public.opening_hours
  for select to anon, authenticated
  using (exists (
    select 1 from public.businesses b
    where b.id = opening_hours.business_id and b.is_published and b.deleted_at is null));
create policy opening_hours_owner_all on public.opening_hours
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy opening_hours_admin_all on public.opening_hours
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

-- settings ---------------------------------------------------------------------
create policy settings_public_read on public.settings
  for select to anon, authenticated
  using (exists (
    select 1 from public.businesses b
    where b.id = settings.business_id and b.is_published and b.deleted_at is null));
create policy settings_owner_all on public.settings
  for all to authenticated
  using (business_id = public.current_business_id())
  with check (business_id = public.current_business_id());
create policy settings_admin_all on public.settings
  for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());
