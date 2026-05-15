"use client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/backend/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="pill bg-bubblegum text-white mb-3">💅 the collection</div>
          <h2 className="font-display font-800 text-5xl text-ink leading-tight">
            pick ur vibe
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
