-- ============================================================
-- LACUNE NAIL BRAND — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
-- pgcrypto gives us gen_random_uuid() on older Postgres versions
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLE: products
-- Stores all nail sticker sets — inventory, pricing, metadata
-- ============================================================
create table if not exists public.products (
  -- Primary key
  id              uuid primary key default gen_random_uuid(),

  -- URL-friendly slug used in /product/[slug] routes
  slug            text not null unique,

  -- Display info
  name            text not null,
  subtitle        text not null,                     -- e.g. "Noir Collection"
  description     text,
  badge           text check (badge in ('New', 'Best Seller', 'Sale', 'Limited')),

  -- Pricing (stored in pence/cents as integers to avoid float rounding)
  price_pence     integer not null check (price_pence > 0),
  original_price_pence integer check (original_price_pence > 0),

  -- Inventory
  stock_count     integer not null default 0 check (stock_count >= 0),
  is_active       boolean not null default true,

  -- Visual data for the SVG/image system
  accent_color    text not null default '#f0486d',   -- hex string
  base_color      text not null default '#fdf8f5',
  highlight_color text not null default '#c4afa6',

  -- Product details stored as JSON arrays
  swatches        text[]  not null default '{}',     -- hex color strings
  details         text[]  not null default '{}',     -- bullet-point features
  apply_steps     jsonb   not null default '[]',     -- [{title, detail}]
  gallery_variants text[] not null default '{}',     -- ['main','closeup','hand','pack']

  -- Spec fields
  wear_time       text    not null default 'Up to 14 days',
  sticker_count   text    not null default '16 stickers',
  finish          text    not null default 'Gloss',

  -- SEO / search
  tags            text[]  not null default '{}',     -- ['floral','pastel','spring']
  collection      text,                              -- 'Spring 2025', 'Noir', etc.

  -- Timestamps
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at on any row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

-- Indexes for common query patterns
create index if not exists products_slug_idx      on public.products (slug);
create index if not exists products_active_idx    on public.products (is_active);
create index if not exists products_badge_idx     on public.products (badge);
create index if not exists products_collection_idx on public.products (collection);

-- ============================================================
-- TABLE: orders
-- One row per customer order. Line items stored as JSONB.
-- ============================================================
create table if not exists public.orders (
  -- Primary key
  id              uuid primary key default gen_random_uuid(),

  -- Short human-readable reference shown to customers
  order_number    text not null unique default 'ORD-' || upper(substring(gen_random_uuid()::text, 1, 8)),

  -- Customer info (no FK to auth.users — supports guest checkout)
  customer_email  text not null,
  customer_name   text not null,

  -- Shipping address
  shipping_address jsonb not null default '{}',
  -- Expected shape:
  -- {
  --   "line1": "12 Rose Street",
  --   "line2": "Apt 3B",        -- optional
  --   "city": "London",
  --   "postcode": "SW1A 1AA",
  --   "country": "GB"
  -- }

  -- Line items snapshot (prices frozen at time of order)
  line_items      jsonb not null default '[]',
  -- Expected shape (array):
  -- [{
  --   "product_id": "uuid",
  --   "slug": "midnight-marble",
  --   "name": "Midnight Marble",
  --   "quantity": 2,
  --   "unit_price_pence": 1399,
  --   "subtotal_pence": 2798
  -- }]

  -- Pricing totals (all in pence)
  subtotal_pence  integer not null check (subtotal_pence >= 0),
  shipping_pence  integer not null default 0 check (shipping_pence >= 0),
  discount_pence  integer not null default 0 check (discount_pence >= 0),
  total_pence     integer not null check (total_pence >= 0),

  -- Payment
  payment_status  text not null default 'pending'
                  check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  payment_intent_id text,                            -- Stripe PaymentIntent ID
  currency        text not null default 'gbp',

  -- Fulfilment
  status          text not null default 'pending'
                  check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  tracking_number text,
  shipped_at      timestamptz,
  delivered_at    timestamptz,

  -- Optional promo code used
  promo_code      text,

  -- Notes
  customer_notes  text,
  internal_notes  text,

  -- Timestamps
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

-- Indexes for common lookups
create index if not exists orders_email_idx      on public.orders (customer_email);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_payment_idx    on public.orders (payment_status);
create index if not exists orders_created_idx    on public.orders (created_at desc);
create index if not exists orders_number_idx     on public.orders (order_number);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Enable RLS on both tables
alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- PRODUCTS: anyone can read active products; only service role can write
create policy "Products are publicly readable"
  on public.products for select
  using (is_active = true);

create policy "Service role can manage products"
  on public.products for all
  using (auth.role() = 'service_role');

-- ORDERS: customers can read only their own orders by email
-- (Upgrade this to auth.uid() FK once you add authentication)
create policy "Customers can view own orders"
  on public.orders for select
  using (customer_email = current_setting('request.jwt.claims', true)::jsonb->>'email');

create policy "Service role can manage all orders"
  on public.orders for all
  using (auth.role() = 'service_role');

-- Allow insert for anonymous users (guest checkout)
create policy "Anyone can place an order"
  on public.orders for insert
  with check (true);

-- ============================================================
-- SEED DATA — 6 nail sticker products
-- ============================================================
insert into public.products
  (slug, name, subtitle, description, badge, price_pence, original_price_pence,
   stock_count, accent_color, base_color, highlight_color,
   swatches, details, apply_steps, gallery_variants,
   wear_time, sticker_count, finish, tags, collection)
values
  (
    'midnight-marble',
    'Midnight Marble',
    'Noir Collection',
    'Inspired by Italian Calacatta marble, Midnight Marble captures the drama of deep navy stone threaded with silver and slate veining.',
    'Best Seller',
    1399, null,
    48,
    '#c0c0d0', '#1a1a2e', '#6a6a9a',
    array['#1a1a2e','#4a4a6a','#c0c0d0'],
    array['16 stickers per pack across 8 sizes','Ultra-thin 0.1mm nail film','Chip-resistant top coat included','Removal requires no acetone'],
    '[{"title":"Prep your nails","detail":"Clean nails thoroughly with the prep pad."},{"title":"Select your size","detail":"Hold sticker against nail before peeling."},{"title":"Peel & position","detail":"Press from cuticle outward to avoid bubbles."},{"title":"Smooth & seal","detail":"Apply top coat sealer for extra longevity."},{"title":"File the excess","detail":"File downward over the free edge."}]',
    array['main','closeup','hand','pack'],
    'Up to 14 days', '16 stickers', 'Gloss',
    array['marble','noir','dark','metallic'], 'Noir'
  ),
  (
    'pastel-florals',
    'Pastel Florals',
    'Garden Edit',
    'A watercolour meadow in miniature. Layers hand-illustrated daisies, wildflowers, and botanical sprigs across a soft blush base.',
    'New',
    1199, null,
    62,
    '#f9c5d1', '#fde8f5', '#c5e8c5',
    array['#f9c5d1','#c5e8c5','#fde8b4'],
    array['16 stickers per pack across 8 sizes','Watercolour-effect print technology','Soft matte finish option included','Vegan and cruelty-free formula'],
    '[{"title":"Prep your nails","detail":"Clean nails thoroughly."},{"title":"Select your size","detail":"Center the main motif for best look."},{"title":"Peel & position","detail":"Adjust floral placement before committing."},{"title":"Smooth & seal","detail":"Matte sealer makes flowers look painted on."},{"title":"File the excess","detail":"Gentle strokes to preserve the pattern."}]',
    array['main','closeup','hand','pack'],
    'Up to 12 days', '16 stickers', 'Matte / Gloss',
    array['floral','pastel','spring','botanical'], 'Garden Edit'
  ),
  (
    'golden-glitz',
    'Golden Glitz',
    'Luxe Series',
    'Real gold foil meets geometric precision. Uses metallic-laminate printing to create nails that genuinely catch and reflect light.',
    'Limited',
    1499, null,
    18,
    '#c9a84c', '#fdf3d0', '#e8c97a',
    array['#c9a84c','#e8c97a','#f5e6c0'],
    array['16 stickers per pack across 8 sizes','Real metallic-laminate foil layer','Individually numbered limited edition','Scratch-resistant hardened finish'],
    '[{"title":"Prep your nails","detail":"Buff lightly — metallic adheres best to smooth surface."},{"title":"Select your size","detail":"Closest fit is critical for metallic edges."},{"title":"Peel & position","detail":"Peel slowly from corner to avoid creasing."},{"title":"Smooth & seal","detail":"Firm pressure needed for full foil contact."},{"title":"File the excess","detail":"Light strokes then buff for mirror finish."}]',
    array['main','closeup','hand','pack'],
    'Up to 14 days', '16 stickers', 'Mirror Metallic',
    array['gold','metallic','luxe','glitter'], 'Luxe Series'
  ),
  (
    'cherry-blossom',
    'Cherry Blossom',
    'Spring Collection',
    'Captured at the peak of bloom. Five-petal blossoms drift across a sheer pink base, each flower hand-illustrated then digitally perfected.',
    'Sale',
    1299, 1599,
    35,
    '#f4a7b9', '#fdeef1', '#f9cdd6',
    array['#f4a7b9','#f9cdd6','#fdeef1'],
    array['16 stickers per pack across 8 sizes','Sheer pink base with opaque floral overlay','Delicate petal-fall repeat pattern','Pairs beautifully with Blush Glaze top coat'],
    '[{"title":"Prep your nails","detail":"Buff first — sheer base shows texture."},{"title":"Select your size","detail":"Sheer base hides small gaps at edges."},{"title":"Peel & position","detail":"Center the blossom cluster visually."},{"title":"Smooth & seal","detail":"Press from centre to cuticle edge carefully."},{"title":"File the excess","detail":"Sheer film tears cleanly — gentle strokes."}]',
    array['main','closeup','hand','pack'],
    'Up to 12 days', '16 stickers', 'Sheer Gloss',
    array['floral','pink','spring','sakura'], 'Spring Collection'
  ),
  (
    'ocean-chrome',
    'Ocean Chrome',
    'Metallic Edit',
    'An iridescent shift from cerulean to aquamarine. Uses multi-layer interference printing for a colour-shifting effect impossible with regular polish.',
    'New',
    1349, null,
    40,
    '#4facde', '#d0f0ff', '#72c7e8',
    array['#4facde','#72c7e8','#b8e8f5'],
    array['16 stickers per pack across 8 sizes','Multi-layer interference chrome finish','Colour-shifts from blue to green in sunlight','UV-resistant for extended outdoor wear'],
    '[{"title":"Prep your nails","detail":"Buff thoroughly — chrome shows irregularities."},{"title":"Select your size","detail":"Reflective surface shows sizing errors clearly."},{"title":"Peel & position","detail":"Handle by edges to avoid fingerprints."},{"title":"Smooth & seal","detail":"Full pressure — unbonded areas appear dull."},{"title":"File the excess","detail":"Fine-grit side for sharpest chrome edge."}]',
    array['main','closeup','hand','pack'],
    'Up to 14 days', '16 stickers', 'Chrome Shift',
    array['chrome','metallic','blue','iridescent'], 'Metallic Edit'
  ),
  (
    'velvet-noir',
    'Velvet Noir',
    'Evening Edit',
    'Deep plum with a suede-like texture finish that absorbs rather than reflects light. The micro-textured surface has a tactile quality unlike any other nail finish.',
    null,
    1449, null,
    27,
    '#c47da8', '#3d0c2e', '#7a1f5a',
    array['#3d0c2e','#7a1f5a','#c47da8'],
    array['16 stickers per pack across 8 sizes','Micro-textured velvet-effect surface','Deep pigment that won''t fade under UV','Pairs with Matte Seal for maximum effect'],
    '[{"title":"Prep your nails","detail":"Standard prep — velvet masks minor imperfections."},{"title":"Select your size","detail":"Deep colour makes sizing gaps more visible."},{"title":"Peel & position","detail":"Rotate to find best light directionality."},{"title":"Smooth & seal","detail":"Extra pressure needed for textured adhesion."},{"title":"File the excess","detail":"Several light strokes to preserve edge texture."}]',
    array['main','closeup','hand','pack'],
    'Up to 14 days', '16 stickers', 'Velvet Matte',
    array['velvet','plum','dark','evening'], 'Evening Edit'
  );
