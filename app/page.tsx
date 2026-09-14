import Image from "next/image";
import { getAllProducts } from "@/services/products";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import css from "./page.module.css";

export default async function Home() {
  const data = await getAllProducts({
    page: 1,
    perPage: 8,
    sortBy: "createdAt",
    order: "desc",
  });

  const products = data?.products ?? [];
  const totalItems = data?.totalItems ?? products.length;

  return (
    <main className={css.main}>
      <section className={css.imageSection}>
        <div className={css.imageItem}>
          <Image
            src="/three.png"
            alt="Arcane Picture 1"
            fill
            priority
          />
        </div>
      </section>

      <section className={css.catalog}>
        <h2 className={css.catalogTitle}>КАТАЛОГ</h2>
        
        <ProductGrid
          initialProducts={products}
          totalItems={totalItems}
          sortBy="createdAt"
          order="desc"
        />
      </section>
    </main>
  );
}