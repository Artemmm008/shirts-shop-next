import { getAllProducts } from "@/services/products";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import css from "./search.module.css";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const data = query 
    ? await getAllProducts({ search: query, page: 1, perPage: 9 }) 
    : null;

  const products = (data?.products ?? []).filter((products) => Boolean(products && products._id));
  const totalItems = data?.totalItems ?? products.length;

  return (
    <main className={css.container}>
      <header className={css.header}>
        <h1 className={css.title}>Пошук</h1>
        <p className={css.query}>{query ? `«${query}»` : "Введіть запит"}</p>
        {data && <p className={css.count}>{totalItems} Товарів</p>}
      </header>

      {query ? (
        <ProductGrid
          initialProducts={products}
          totalItems={totalItems}
          search={query}
        />
      ) : null}
    </main>
  );
}