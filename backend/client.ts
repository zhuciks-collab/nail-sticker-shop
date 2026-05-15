/**
 * Sanity client
 *
 * Used in Server Components, Route Handlers, and Server Actions.
 * The token is optional — public reads work with just projectId + dataset.
 * Set SANITY_API_TOKEN only if you need authenticated write operations.
 */

import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  // useCdn: true speeds up reads in production via Sanity's global CDN.
  // Set to false during dev so you always see the latest content.
  useCdn: process.env.NODE_ENV === "production",
});
