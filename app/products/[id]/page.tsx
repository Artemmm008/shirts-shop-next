import { notFound } from "next/navigation";
import { getProductById } from "@/services/products";
import ProductDetails from "./ProductDetails";

interface ProductPageProps {
	params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	let product;

	try {
		product = await getProductById(id);
	} catch {
		notFound();
	}

	return <ProductDetails product={product} />;
}
