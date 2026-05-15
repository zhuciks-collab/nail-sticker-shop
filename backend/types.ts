// ============================================================
// Shared types — used across the app and backend queries
// ============================================================

export type Badge =
  | "🔥 Viral"
  | "✨ New"
  | "💅 Iconic"
  | "🩰 Trending"
  | "🧜 New"
  | "💿 Viral"
  | "Best Seller"
  | "Sale"
  | "Limited";

// ── Product ──────────────────────────────────────────────────────────────────

/** Shape returned by Sanity GROQ queries for a product */
export interface Product {
  id: string;            // slug.current — used as the cart productId
  name: string;
  slug: string;
  tag: string | null;
  description: string | null;
  badge: Badge | null;
  emoji: string | null;
  price: number;         // in £
  originalPrice: number | null;
  image: string | null;  // CDN URL resolved by GROQ
  colors: string[];
  bg: string | null;
  views: string | null;
  likes: string | null;
  stockCount: number;
  isActive: boolean;
  collection: string | null;
  tags: string[];
  inStock: boolean;      // derived: stockCount > 0
}

// ── Orders (Stripe-only, no database) ────────────────────────────────────────

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface OrderLineItem {
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;   // in £
  subtotal: number;    // in £
}
