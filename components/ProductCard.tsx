"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/backend/types";

function NailArt({ product }: { product: Product }) {
  const [c1,c2,c3] = product.colors;
  return (
    <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id={`g-${product.id}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor={c3} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
      </defs>
      <rect width="280" height="320" fill={`url(#g-${product.id})`} />
      {/* Main nail */}
      <rect x="90" y="50" width="100" height="160" rx="50" fill={c1} opacity="0.95" />
      <rect x="30" y="80" width="55" height="130" rx="27" fill={c2} opacity="0.8" transform="rotate(-10 57 145)" />
      <rect x="195" y="75" width="55" height="130" rx="27" fill={c3} opacity="0.7" transform="rotate(10 222 140)" />
      {/* Gloss */}
      <ellipse cx="140" cy="100" rx="25" ry="18" fill="white" opacity="0.35" />
      {/* Emoji watermark */}
      <text x="140" y="265" textAnchor="middle" fontSize="36">{product.emoji}</text>
    </svg>
  );
}

export default function ProductCard({ product, index=0 }: { product: Product; index?: number }) {
  const badgeColors: Record<string,string> = {
    "🔥 Viral":   "bg-orange-400 text-white",
    "✨ New":      "bg-lemon text-ink",
    "💅 Iconic":  "bg-bubblegum text-white",
    "🩰 Trending":"bg-pink-200 text-pink-900",
    "🧜 New":     "bg-sky text-ink",
    "🔖 Sale":    "bg-ink text-lemon",
    "💿 Viral":   "bg-slate-200 text-slate-800",
  };

  return (
    <div className="card-lift group" style={{ animationDelay: `${index * 60}ms` }}>
      <Link href={`/shop/${product.id}`} className="block">
        {/* Image */}
        <div className={`aspect-[3/4] bg-gradient-to-br ${product.bg ?? ""} overflow-hidden relative rounded-2xl border-2 border-ink`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <NailArt product={product} />
          )}
          {product.badge && (
            <span className={`absolute top-3 left-3 pill text-[10px] font-bold border border-black/10 ${badgeColors[product.badge] ?? "bg-white text-ink"}`}>
              {product.badge}
            </span>
          )}
          {/* TikTok-style stats */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="pill bg-black/40 text-white backdrop-blur-sm text-[10px]">👁 {product.views}</span>
            <span className="pill bg-black/40 text-white backdrop-blur-sm text-[10px]">❤️ {product.likes}</span>
          </div>
          {/* Quick add */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/20 transition-all duration-300">
            <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-lemon text-ink font-display font-700 text-sm px-5 py-2.5 rounded-full border-2 border-ink hover:bg-bubblegum hover:text-white">
              + Add to cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1">
          <p className="text-[10px] font-semibold text-mid/60 mb-0.5">{product.tag}</p>
          <h3 className="font-display font-700 text-base text-ink group-hover:text-bubblegum transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-mid/50 mt-1 line-clamp-1 font-light">{product.description ?? ""}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-700 text-base text-ink">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-mid/40 line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="flex gap-1">
              {product.colors.map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-ink/20" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
