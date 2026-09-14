"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/products";
import { Product, ProductSize } from "@/types/product";
import ProductCard from "../ProductCard/ProductCard";
import css from "./ProductGrid.module.css";

interface ProductGridProps {
  initialProducts: Product[];
  totalItems: number;
  category?: string;   
  search?: string,
  size?: ProductSize;
  sortBy?: "price" | "createdAt";
  order?: "asc" | "desc";
}

export default function ProductGrid({
    initialProducts,  
    totalItems,
    category,
    search,
    size,
    sortBy,
    order,
}: ProductGridProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", category, search, size, sortBy, order],
    queryFn: async ({ pageParam = 1 }) => {
      return await getAllProducts({
        category,
        search,
        size,
        sortBy,
        order,
        page: pageParam,
        perPage: 9,
      });
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.totalPages) return undefined;
      return lastPage.page + 1;
    },
    initialData: {
      pages: [
        {
          page: 1,
          perPage: 9,
          totalItems,
          totalPages: Math.ceil(totalItems / 9),
          products: initialProducts,
        },
      ],
      pageParams: [1],
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? initialProducts;

  if (!allProducts || allProducts.length === 0) {
    return (
      <div className={css.empty}>
        <p className={css.emptyText}>NO PRODUCTS FOUND</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.grid}>
        {allProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div ref={loadMoreRef} className={css.loader}>
        {isFetchingNextPage && <p className={css.loadingText}>Завантаження...</p>}
      </div>
    </div>
  );
}