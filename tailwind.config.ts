import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bubblegum: "#C9847A",
        candy:     "#E8A598",
        lemon:     "#F5E6D3",
        sky:       "#B8D4D4",
        mint:      "#C8DDD0",
        lavender:  "#C4B8CC",
        cream:     "#FAF7F4",
        ivory:     "#F5F0EB",
        ink:       "#1C1917",
        mid:       "#57534E",
        gold:      "#C4A882",
        rose:      "#C9847A",
        champagne: "#E8D5B7",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        heading: ["Syne", "sans-serif"],
        body:    ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
