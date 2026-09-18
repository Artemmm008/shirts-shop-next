"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/authStore";
import { parseProductDescription } from "@/utils/parseDescription";
import { Product, ProductSize } from "@/types/product";
import { deleteProduct, updateProduct } from "@/services/products";
import SizeGuideModal from "@/components/SizeGuideModal/SizeGuideModal";
import EditProductModal from "@/components/EditProductModal/EditProductModal";
import css from "./product.module.css";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.role === "admin";

    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<ProductSize | null>(product.sizes[0] ?? null);
    const [quantity, setQuantity] = useState(1);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { addToCart } = useCart();
    const { description } = parseProductDescription(product.description);
    const images = product.imageUrl?.length ? product.imageUrl : ["/small_logo.png"];

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addToCart(product, selectedSize, quantity);
    };

    const handleDelete = async () => {
        if (!confirm(`Ви дійсно бажаєте видалити "${product.title}"?`)) return;

        setIsDeleting(true);
        const res = await deleteProduct(product._id);
        setIsDeleting(false);

        if (!res) {
            alert("Не вдалося видалити товар.");
            return;
        }

        router.push("/collections/all");
        router.refresh();
    };

    const handleDeleteImage = async (imageToDelete: string) => {
        if (!confirm("Ви дійсно бажаєте видалити це фото з товару?")) return;

        const updatedImages = images.filter((img) => img !== imageToDelete);

        const res = await updateProduct(product._id, {
            imageUrl: updatedImages,
        });

        if (!res) {
            alert("Не вдалося видалити фото.");
            return;
        }

        setActiveImage(0);
        router.refresh();
    };

    return (
        <>
            <main className={css.container}>
                <section className={css.gallery} aria-label="Зображення товару">
                    <div className={css.mainImage}>
                        <Image
                            src={images[activeImage]}
                            alt={product.title}
                            fill
                            priority
                            unoptimized
                            className={css.image}
                        />

                        {isAdmin && product.imageUrl?.length > 0 && (
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(images[activeImage])}
                                className={css.deleteImageButton}
                                title="Видалити це фото"
                                aria-label="Видалити це фото"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className={css.thumbnails}>
                            {images.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    className={`${css.thumbnail} ${index === activeImage ? css.thumbnailActive : ""}`}
                                    onClick={() => setActiveImage(index)}
                                    aria-label={`Показати фото ${index + 1}`}
                                >
                                    <Image src={image} alt="" fill sizes="96px" className={css.thumbnailImage} />
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <section className={css.details}>
                    {isAdmin && (
                        <div className={css.adminBar}>
                            <div className={css.adminButtons}>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(true)}
                                    className={css.editButton}
                                >
                                    <Pencil size={16} />
                                    Редагувати
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className={css.deleteButton}
                                >
                                    <Trash2 size={16} />
                                    {isDeleting ? "Видалення..." : "Видалити"}
                                </button>
                            </div>
                        </div>
                    )}

                    <p className={css.category}>{product.category ?? "Товар"}</p>
                    <h1 className={css.title}>{product.title}</h1>
                    <p className={css.price}>{product.price} ₴</p>
                    <p className={`${css.stock} ${product.inStock ? css.stockAvailable : css.stockUnavailable}`}>
                        {product.inStock ? "В наявності" : "Немає в наявності"}
                    </p>

                    <div className={css.section}>
                        <div className={css.sectionHeader}>
                            <h2>Розмір</h2>
                        </div>
                        <div className={css.sizes}>
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`${css.sizeButton} ${selectedSize === size ? css.sizeButtonActive : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <button type="button" className={css.guideButton} onClick={() => setIsSizeGuideOpen(true)}>
                            Гід по розмірах
                        </button>
                    </div>

                    <div className={css.section}>
                        <h2>Опис</h2>
                        <p className={css.description}>{description || "Опис товару відсутній."}</p>
                    </div>

                    <div className={css.actions}>
                        <div className={css.quantity} aria-label="Кількість">
                            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Зменшити кількість">
                                <Minus size={16} />
                            </button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Збільшити кількість">
                                <Plus size={16} />
                            </button>
                        </div>
                        <button type="button" className={css.addButton} onClick={handleAddToCart} disabled={!product.inStock || !selectedSize}>
                            <ShoppingBag size={18} />
                            {product.inStock ? "Додати в кошик" : "Немає в наявності"}
                        </button>
                    </div>
                </section>
            </main>

            <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} rawDescription={product.description} />

            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={product}
                onProductUpdated={() => router.refresh()}
            />
        </>
    );
}