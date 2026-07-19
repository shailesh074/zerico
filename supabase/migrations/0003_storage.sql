-- =============================================================================
-- Zerico — 0003 storage: 5 public buckets + owner-scoped write policies.
-- Path convention: {bucket}/{business_id}/{uuid}.{ext}. See BACKEND.md §4/§6.
-- =============================================================================

insert into storage.buckets (id, name, public) values
  ('logos',          'logos',          true),
  ('covers',         'covers',         true),
  ('menu-images',    'menu-images',    true),
  ('gallery-images', 'gallery-images', true),
  ('offer-images',   'offer-images',   true)
on conflict (id) do nothing;

-- Public read for all Zerico buckets (served from the CDN on public pages).
create policy zerico_storage_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('logos','covers','menu-images','gallery-images','offer-images'));

-- Owners may write only under their own {business_id}/ prefix.
create policy zerico_storage_owner_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('logos','covers','menu-images','gallery-images','offer-images')
    and (storage.foldername(name))[1] = public.current_business_id()::text
  );

create policy zerico_storage_owner_update on storage.objects
  for update to authenticated
  using (
    bucket_id in ('logos','covers','menu-images','gallery-images','offer-images')
    and (storage.foldername(name))[1] = public.current_business_id()::text
  );

create policy zerico_storage_owner_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id in ('logos','covers','menu-images','gallery-images','offer-images')
    and (storage.foldername(name))[1] = public.current_business_id()::text
  );

-- Super admin: full access across all Zerico buckets.
create policy zerico_storage_admin_all on storage.objects
  for all to authenticated
  using (
    bucket_id in ('logos','covers','menu-images','gallery-images','offer-images')
    and public.is_super_admin()
  )
  with check (
    bucket_id in ('logos','covers','menu-images','gallery-images','offer-images')
    and public.is_super_admin()
  );
