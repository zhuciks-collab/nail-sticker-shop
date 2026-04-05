export interface Product {
  id: string;
  name: string;
  tag: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  emoji: string;
  desc: string;
  colors: string[];
  bg: string;
  views: string;
  likes: string;
}

export const products: Product[] = [
  { id: "midnight-marble",  name: "Midnight Marble",  tag: "dark luxe 🖤",       price: 13.99, badge: "🔥 Viral",    emoji: "🖤", desc: "swirling black and white marble with a deep gloss finish. moody, editorial, obsession-worthy.", colors: ["#1a1a2e","#4a4a6a","#e8e8f0"], bg: "from-slate-900 to-slate-700",    views: "7.4M", likes: "1.1M" },
  { id: "pastel-florals",   name: "Pastel Florals",   tag: "cottagecore 🌸",     price: 10.99, badge: "✨ New",       emoji: "🌸", desc: "hand-painted-look blooms in the softest pinks, lavenders and creams. spring forever.", colors: ["#ffb3d9","#d4b3ff","#b3e5d4"], bg: "from-pink-100 to-purple-50",     views: "4.9M", likes: "780K" },
  { id: "golden-glitz",     name: "Golden Glitz",     tag: "main character ✨",  price: 14.99, badge: "💅 Iconic",    emoji: "✨", desc: "24k gold foil flecks suspended in a champagne base. for when you need to be perceived.", colors: ["#d4af37","#f0d060","#fff8dc"], bg: "from-yellow-100 to-amber-50",    views: "10.2M",likes: "1.8M" },
  { id: "glazed-donut",     name: "Glazed Donut",     tag: "Hailey's fav 🍩",   price: 11.99, badge: "🩰 Trending",  emoji: "🍩", desc: "the hailey bieber glazed donut mani but make it £11 and 30 seconds", colors: ["#f9d4b6","#fce4cc","#fff0e5"], bg: "from-orange-100 to-amber-50",    views: "8.2M", likes: "1.2M" },
  { id: "mermaid-core",     name: "Mermaid Core",     tag: "ocean babe 🧜‍♀️",  price: 12.99, badge: "🧜 New",       emoji: "🌊", desc: "iridescent blue-green shift that literally changes colour in different lights", colors: ["#7dd5e8","#5bc8db","#a8f0f8"], bg: "from-sky-100 to-cyan-50",        views: "4.4M", likes: "710K" },
  { id: "chrome-party",     name: "Chrome Party",     tag: "bling era 💿",       price: 14.99, badge: "💿 Viral",     emoji: "💿", desc: "mirror chrome that makes ur nails look like a 2000s cd. very that girl.", colors: ["#c0c0c0","#a8a8a8","#d4d4d4"], bg: "from-slate-100 to-gray-100",     views: "9.3M", likes: "1.6M" },
];

export type { Product as default };
