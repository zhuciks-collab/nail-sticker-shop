import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/backend/queries.products";
import ProductDetail from "./ProductDetail";

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const product = await getProductBySlug(params.id);
  return { title: `${product?.name ?? "Product"} — NAILZ.CLUB 💅` };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.id);
  if (!product) notFound();
  const related = await getRelatedProducts(params.id, product.collection);
  return <ProductDetail product={product} related={related} />;
}
