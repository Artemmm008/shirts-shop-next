import { getAllProducts } from "@/services/products";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { ProductSize } from "@/types/product";
import css from "./category.module.css";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    size?: string;
    sort?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { size, sort = "newest" } = await searchParams;

  const allowedSizes: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];
  const selectedSize = allowedSizes.includes(size as ProductSize)
    ? (size as ProductSize)
    : undefined;

  const sortParams = {
    sortBy: (sort === "price_asc" || sort === "price_desc" ? "price" : "createdAt") as "price" | "createdAt",
    order: (sort === "price_asc" ? "asc" : "desc") as "asc" | "desc",
  };

  const data = await getAllProducts({
    category,
    size: selectedSize,
    ...sortParams,
    page: 1,
    perPage: 9,
  });

  const products = data.products ?? [];
  const totalItems = data.totalItems ?? products.length;

  return (
    <main className={css.container}>
      <header className={css.header}>
        <h1 className={css.title}>{category}</h1>
        <p className={css.count}>{totalItems} Товарів</p>
      </header>

      <ProductGrid
        initialProducts={products}
        totalItems={totalItems}
        category={category}
        size={selectedSize}
        sortBy={sortParams.sortBy}
        order={sortParams.order}
      />
    </main>
  );
}