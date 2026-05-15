"use client";

/**
 * Sanity Studio — embedded at /studio
 *
 * Visit http://localhost:3000/studio to manage products.
 * Only accessible by you (no auth in dev — add Sanity access control for prod).
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
