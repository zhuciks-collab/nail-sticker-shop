import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/backend/queries.products";
import ProductDetail from "./ProductDetail";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  return { title: `${product?.name ?? "Product"} — NAILZ.CLUB 💅` };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  if (!product) notFound();
  const related = await getRelatedProducts(id, product.collection);
  return <ProductDetail product={product} related={related} />;
}
