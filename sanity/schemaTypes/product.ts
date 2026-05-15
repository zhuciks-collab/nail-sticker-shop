import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    // ── Identity ────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the URL — auto-generated from the name.",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag line",
      type: "string",
      description: 'Short vibe label shown on cards, e.g. "dark luxe 🖤"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      options: {
        list: [
          { title: "🔥 Viral", value: "🔥 Viral" },
          { title: "✨ New", value: "✨ New" },
          { title: "💅 Iconic", value: "💅 Iconic" },
          { title: "🩰 Trending", value: "🩰 Trending" },
          { title: "🧜 New", value: "🧜 New" },
          { title: "💿 Viral", value: "💿 Viral" },
          { title: "Best Seller", value: "Best Seller" },
          { title: "Sale", value: "Sale" },
          { title: "Limited", value: "Limited" },
        ],
      },
    }),
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "Single emoji for the product card",
    }),

    // ── Pricing ─────────────────────────────────────────────────
    defineField({
      name: "price",
      title: "Price (£)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (£)",
      type: "number",
      description: "Set only if this product is on sale",
    }),

    // ── Visuals ─────────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "colors",
      title: "Color Swatches",
      type: "array",
      of: [{ type: "string" }],
      description: "Hex codes shown as color dots, e.g. #1a1a2e",
    }),
    defineField({
      name: "bg",
      title: "Background Gradient",
      type: "string",
      description: 'Tailwind gradient class, e.g. "from-slate-900 to-slate-700"',
    }),

    // ── Social proof ─────────────────────────────────────────────
    defineField({
      name: "views",
      title: "Views",
      type: "string",
      description: 'Display string, e.g. "7.4M"',
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "string",
      description: 'Display string, e.g. "1.1M"',
    }),

    // ── Inventory ────────────────────────────────────────────────
    defineField({
      name: "stockCount",
      title: "Stock Count",
      type: "number",
      initialValue: 0,
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: "isActive",
      title: "Active (visible on site)",
      type: "boolean",
      initialValue: true,
    }),

    // ── Organisation ─────────────────────────────────────────────
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      description: 'e.g. "Noir", "Spring Collection", "Luxe Series"',
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Search/filter keywords",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "badge",
      media: "image",
    },
  },
});
