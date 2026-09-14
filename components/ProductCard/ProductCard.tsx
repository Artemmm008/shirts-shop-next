"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import css from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {

    return (
        <div className={css.card}>
            <Link href={`/products/${product._id}`} className={css.imageWrapper}>
                <Image
                    src={product.imageUrl?.[0] ? product.imageUrl[0] : "/small_logo.png"}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={css.image}
                    loading="eager"
                />

                {!product.inStock && (
                    <div className={css.outOfStockBadge}>
                        Немає в наявності
                    </div>
                )}
            </Link>

            <div className={css.info}>
                <Link href={`/products/${product._id}`} className={css.title}>
                    {product.title}
                </Link>
                <span className={css.price}>{product.price} ₴</span>
            </div>
        </div>
    );
}