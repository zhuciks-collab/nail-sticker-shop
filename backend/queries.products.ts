/**
 * Product queries — Sanity via GROQ
 *
 * All functions are server-side only (no "use client").
 * Import in Server Components or Route Handlers.
 */

import { sanityClient } from "./client";
import { Product } from "./types";

// ── GROQ fragment — fields to fetch for every product ────────────────────────

const PRODUCT_FIELDS = `
  "id": slug.current,
  name,
  "slug": slug.current,
  tag,
  description,
  badge,
  emoji,
  price,
  originalPrice,
  "image": image.asset->url,
  colors,
  bg,
  views,
  likes,
  stockCount,
  isActive,
  collection,
  tags,
  "inStock": stockCount > 0
`;

// ── Fetch all active products ─────────────────────────────────────────────────

export async function getProducts(options?: {
  collection?: string;
  badge?: string;
  limit?: number;
}): Promise<Product[]> {
  let filter = `_type == "product" && isActive == true`;

  if (options?.collection) {
    filter += ` && collection == "${options.collection}"`;
  }
  if (options?.badge) {
    filter += ` && badge == "${options.badge}"`;
  }

  const limitClause = options?.limit ? `[0...${options.limit}]` : "";

  const query = `*[${filter}] | order(_createdAt desc) ${limitClause} { ${PRODUCT_FIELDS} }`;

  return sanityClient.fetch<Product[]>(query);
}

// ── Fetch a single product by slug ────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug && isActive == true][0] { ${PRODUCT_FIELDS} }`;
  const result = await sanityClient.fetch<Product | null>(query, { slug });
  return result ?? null;
}

// ── Fetch related products (same collection, excluding current) ───────────────

export async function getRelatedProducts(
  currentSlug: string,
  collection: string | null,
  limit = 4
): Promise<Product[]> {
  let filter = `_type == "product" && isActive == true && slug.current != $currentSlug`;
  if (collection) filter += ` && collection == $collection`;

  const query = `*[${filter}][0...${limit}] { ${PRODUCT_FIELDS} }`;

  return sanityClient.fetch<Product[]>(query, {
    currentSlug,
    collection: collection ?? "",
  });
}

// ── Search products by name, tag, or description ─────────────────────────────

export async function searchProducts(term: string): Promise<Product[]> {
  const query = `*[_type == "product" && isActive == true && (
    name match $term ||
    description match $term ||
    tag match $term
  )][0...20] { ${PRODUCT_FIELDS} }`;

  return sanityClient.fetch<Product[]>(query, { term: `*${term}*` });
}

// ── All slugs for generateStaticParams ───────────────────────────────────────

export async function getAllProductSlugs(): Promise<string[]> {
  const query = `*[_type == "product" && isActive == true].slug.current`;
  return sanityClient.fetch<string[]>(query);
}
