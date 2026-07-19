-- =============================================================================
-- Zerico — seed: "Cloud Café" (Business plan demo). Idempotent (re-runnable).
-- Mirrors src/data/mock/cloudcafe.ts so the engine renders it identically.
-- =============================================================================

-- Clean slate for this demo business (cascades to all its content).
delete from public.businesses where slug = 'cloudcafe';

-- Business ---------------------------------------------------------------------
insert into public.businesses (
  id, slug, name, tagline, description, business_type, subscription_plan, theme,
  logo_url, cover_image_url, currency_symbol, timezone, phone, whatsapp, email,
  address, google_maps_url, location_lat, location_lng, instagram, facebook,
  website, is_published
) values (
  '11111111-1111-1111-1111-111111111111',
  'cloudcafe',
  'Cloud Café',
  'Slow mornings, good coffee, and a corner that feels like home.',
  'A neighbourhood specialty coffee house in the heart of the city. We roast in small batches, bake fresh every morning, and pour every cup like it matters — because it does.',
  'Specialty Coffee & Brunch',
  'business',
  'cafe',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80',
  '₹', 'Asia/Kolkata', '+91 98200 41100', '919820041100', 'hello@cloudcafe.in',
  '14 Linking Road, Bandra West, Mumbai 400050',
  'https://maps.google.com/?q=Bandra+West+Mumbai',
  19.0607, 72.8362,
  'https://instagram.com/cloudcafe', 'https://facebook.com/cloudcafe',
  'https://cloudcafe.in', true
);

-- Categories -------------------------------------------------------------------
insert into public.categories (id, business_id, name, sort_order) values
  ('22222222-0000-0000-0000-000000000001','11111111-1111-1111-1111-111111111111','Coffee & Espresso',1),
  ('22222222-0000-0000-0000-000000000002','11111111-1111-1111-1111-111111111111','Breakfast',2),
  ('22222222-0000-0000-0000-000000000003','11111111-1111-1111-1111-111111111111','All-Day Brunch',3),
  ('22222222-0000-0000-0000-000000000004','11111111-1111-1111-1111-111111111111','Bakery & Desserts',4),
  ('22222222-0000-0000-0000-000000000005','11111111-1111-1111-1111-111111111111','Cold & Refreshers',5);

-- Menu items -------------------------------------------------------------------
insert into public.menu_items
  (business_id, category_id, name, description, price, image_url, diet, is_available, is_popular, sort_order)
values
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000001','Signature Cloud Latte','Double shot of our house espresso, silky steamed milk, a whisper of vanilla and sea salt.',260,'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80','veg',true,true,1),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000001','Classic Cappuccino','Equal parts espresso, steamed milk and dense velvet foam.',220,'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80','veg',true,false,2),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000001','Cortado','A short, balanced cut of espresso and warm milk. No fuss.',200,'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80','veg',true,false,3),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000001','Single-Origin Pour Over','Hand-poured filter coffee, rotating single origins. Ask us what''s on today.',280,'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80','veg',true,true,4),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000002','Smashed Avocado Toast','Sourdough, smashed avocado, chilli flakes, lemon and a soft poached egg.',340,'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80','veg',true,true,1),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000002','Baked Shakshuka','Eggs baked in a spiced tomato & pepper stew, served with warm focaccia.',380,'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80','veg',true,false,2),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000002','House Granola Bowl','Toasted oats & nuts, greek yoghurt, seasonal fruit and honey.',290,'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80','veg',false,false,3),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000003','Buttermilk Pancake Stack','Three fluffy pancakes, maple butter, fresh berries and a dusting of sugar.',360,'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80','veg',true,true,1),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000003','Brioche French Toast','Caramelised brioche, mascarpone cream, roasted figs and honeycomb.',380,'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80','veg',true,false,2),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000003','The Cloud Club','Triple-stack sandwich, smoked chicken, egg, greens and herbed mayo with fries.',420,'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80','nonveg',true,false,3),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000004','Butter Croissant','72-hour laminated, baked in-house every morning. Pure butter.',180,'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80','veg',true,true,1),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000004','Cinnamon Roll','Soft, gooey swirls with cream cheese glaze.',220,'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80','veg',true,false,2),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000004','Classic Tiramisu','Espresso-soaked savoiardi, mascarpone cream and bitter cocoa.',320,'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80','veg',true,true,3),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000005','24-Hour Cold Brew','Slow-steeped for a full day — smooth, chocolatey, low in acidity.',280,'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80','veg',true,true,1),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000005','Iced Matcha Latte','Ceremonial-grade matcha, milk of your choice, over ice.',300,'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&q=80','veg',true,false,2),
  ('11111111-1111-1111-1111-111111111111','22222222-0000-0000-0000-000000000005','Sparkling Berry Lemonade','Fresh lemon, muddled berries, mint and soda.',240,'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80','veg',true,false,3);

-- Gallery ----------------------------------------------------------------------
insert into public.gallery (business_id, image_url, title, sort_order) values
  ('11111111-1111-1111-1111-111111111111','https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80','The main room',1),
  ('11111111-1111-1111-1111-111111111111','https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=80','Morning light',2),
  ('11111111-1111-1111-1111-111111111111','https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80','At the bar',3),
  ('11111111-1111-1111-1111-111111111111','https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80','Fresh from the oven',4),
  ('11111111-1111-1111-1111-111111111111','https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80','A quiet corner',5),
  ('11111111-1111-1111-1111-111111111111','https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80','Latte art, always',6);

-- Offers -----------------------------------------------------------------------
insert into public.offers (business_id, title, description, image_url, expiry_date, is_active) values
  ('11111111-1111-1111-1111-111111111111','Weekday Happy Hours','Every weekday 3–6 PM — buy any two coffees and the second is half price.','https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80','2026-12-31',true),
  ('11111111-1111-1111-1111-111111111111','Weekend Brunch Set','Sat & Sun — any brunch plate with a coffee and fresh juice at a special price.','https://images.unsplash.com/photo-1533920379810-6bedac961555?auto=format&fit=crop&w=600&q=80','2026-12-31',true);

-- Opening hours (0=Mon .. 6=Sun) ----------------------------------------------
insert into public.opening_hours (business_id, day_of_week, opens_at, closes_at, is_closed) values
  ('11111111-1111-1111-1111-111111111111',0,'08:00','22:00',false),
  ('11111111-1111-1111-1111-111111111111',1,'08:00','22:00',false),
  ('11111111-1111-1111-1111-111111111111',2,'08:00','22:00',false),
  ('11111111-1111-1111-1111-111111111111',3,'08:00','22:00',false),
  ('11111111-1111-1111-1111-111111111111',4,'08:00','23:30',false),
  ('11111111-1111-1111-1111-111111111111',5,'09:00','23:30',false),
  ('11111111-1111-1111-1111-111111111111',6,'09:00','22:00',false);

-- Settings: engine sections for the Business (standard) template --------------
insert into public.settings (business_id, sections) values (
  '11111111-1111-1111-1111-111111111111',
  '{"home":[
     {"type":"hero","enabled":true},
     {"type":"story","enabled":true},
     {"type":"menu","enabled":true},
     {"type":"offers","enabled":true},
     {"type":"gallery","enabled":true},
     {"type":"visit","enabled":true},
     {"type":"footer","enabled":true},
     {"type":"contact_bar","enabled":true}
   ]}'::jsonb
);
