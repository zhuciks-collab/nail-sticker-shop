import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "nailz-club",
  title: "NAILZ.CLUB Admin",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool(), // lets you run GROQ queries from the studio (dev only)
  ],

  schema: {
    types: schemaTypes,
  },
});
