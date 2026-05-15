/**
 * Order queries
 *
 * All functions run server-side using the service role client.
 * Import in Route Handlers or Server Actions — NOT in "use client" files.
 */

import { getServerClient } from "./client";
import {
  OrderRow,
  Order,
  OrderLineItem,
  ShippingAddress,
  OrderStatus,
  PaymentStatus,
  toOrder,
} from "./types";

// ── Create a new order ────────────────────────────────────────────────────────

interface CreateOrderInput {
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress;
  line_items: OrderLineItem[];
  subtotal_pence: number;
  shipping_pence: number;
  discount_pence?: number;
  promo_code?: string;
  customer_notes?: string;
  currency?: string;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const supabase = getServerClient();

  const total_pence =
    input.subtotal_pence +
    input.shipping_pence -
    (input.discount_pence ?? 0);

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_email: input.customer_email,
      customer_name: input.customer_name,
      shipping_address: input.shipping_address,
      line_items: input.line_items,
      subtotal_pence: input.subtotal_pence,
      shipping_pence: input.shipping_pence,
      discount_pence: input.discount_pence ?? 0,
      total_pence,
      promo_code: input.promo_code ?? null,
      customer_notes: input.customer_notes ?? null,
      currency: input.currency ?? "gbp",
      payment_status: "pending",
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("[createOrder] Supabase error:", error.message);
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return toOrder(data as OrderRow);
}

// ── Fetch a single order by ID ────────────────────────────────────────────────

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data ? toOrder(data as OrderRow) : null;
}

// ── Fetch a single order by order_number ──────────────────────────────────────

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data ? toOrder(data as OrderRow) : null;
}

// ── Fetch all orders for a customer email ─────────────────────────────────────

export async function getOrdersByEmail(
  email: string,
  limit = 20
): Promise<Order[]> {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", email)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getOrdersByEmail] Supabase error:", error.message);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return (data as OrderRow[]).map(toOrder);
}

// ── Update payment status (call from Stripe webhook) ─────────────────────────

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: PaymentStatus,
  paymentIntentId?: string
): Promise<Order> {
  const supabase = getServerClient();

  const updates: Partial<OrderRow> = { payment_status: paymentStatus };
  if (paymentIntentId) updates.payment_intent_id = paymentIntentId;

  // Auto-confirm order when payment succeeds
  if (paymentStatus === "paid") {
    updates.status = "confirmed";
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update payment status: ${error.message}`);
  }

  return toOrder(data as OrderRow);
}

// ── Update fulfilment status ──────────────────────────────────────────────────

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string
): Promise<Order> {
  const supabase = getServerClient();

  const updates: Partial<OrderRow> = { status };

  if (trackingNumber) updates.tracking_number = trackingNumber;
  if (status === "shipped") updates.shipped_at = new Date().toISOString();
  if (status === "delivered") updates.delivered_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }

  return toOrder(data as OrderRow);
}

// ── Admin: fetch recent orders with optional filters ──────────────────────────

export async function getRecentOrders(options?: {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  limit?: number;
}): Promise<Order[]> {
  const supabase = getServerClient();

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(options?.limit ?? 50);

  if (options?.status) {
    query = query.eq("status", options.status);
  }
  if (options?.paymentStatus) {
    query = query.eq("payment_status", options.paymentStatus);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return (data as OrderRow[]).map(toOrder);
}
