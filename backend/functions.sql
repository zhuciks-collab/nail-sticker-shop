-- ============================================================
-- LACUNE — Additional SQL functions
-- Run these in Supabase SQL Editor after schema.sql
-- ============================================================

-- ── Atomic stock decrement ────────────────────────────────────
-- Decrements stock safely even under concurrent requests.
-- Returns the new stock_count, or raises an exception if out of stock.

create or replace function public.decrement_stock(
  p_product_id uuid,
  p_quantity   integer
)
returns integer
language plpgsql
security definer
as $$
declare
  v_new_stock integer;
begin
  update public.products
  set    stock_count = stock_count - p_quantity
  where  id = p_product_id
    and  stock_count >= p_quantity   -- prevents going below 0
  returning stock_count into v_new_stock;

  if not found then
    raise exception 'Insufficient stock for product %', p_product_id
      using errcode = 'P0001';
  end if;

  return v_new_stock;
end;
$$;

-- ── Revenue summary view (useful for admin dashboards) ────────
create or replace view public.order_summary as
select
  date_trunc('day', created_at)        as day,
  count(*)                             as order_count,
  sum(total_pence) / 100.0             as revenue_gbp,
  avg(total_pence) / 100.0             as avg_order_value_gbp,
  count(*) filter (where status = 'cancelled') as cancellations
from public.orders
where payment_status = 'paid'
group by 1
order by 1 desc;

-- ── Best-selling products view ────────────────────────────────
create or replace view public.product_sales as
select
  item->>'slug'                          as slug,
  item->>'name'                          as name,
  sum((item->>'quantity')::integer)      as units_sold,
  sum((item->>'subtotal_pence')::integer) / 100.0 as revenue_gbp
from public.orders,
  jsonb_array_elements(line_items) as item
where payment_status = 'paid'
group by 1, 2
order by 3 desc;
