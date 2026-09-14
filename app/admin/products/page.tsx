"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { ProductSize } from "@/types/product";
import { createProduct, uploadProductImages } from "@/services/products";
import css from "./AdminCreateProduct.module.css";

const ALL_SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];

export default function CreateProductPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(true);
    const [sizes, setSizes] = useState<ProductSize[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSizeToggle = (size: ProductSize) => {
        setSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const newProduct = await createProduct({
                title,
                price: Number(price),
                category,
                description,
                inStock,
                sizes,
            });

            if (!newProduct) {
                alert("Не вдалося створити товар.");
                setIsLoading(false);
                return;
            }

            if (selectedFiles.length > 0) {
                const formData = new FormData();
                selectedFiles.forEach((file) => formData.append("images", file));

                await uploadProductImages(newProduct._id, formData);
            }

            setIsLoading(false);
            router.push("/collections/all");
        } catch (error) {
            console.error(error);
            alert("Сталася помилка при створенні товара.");
            setIsLoading(false);
        }
    };

    return (
        <main className={css.container}>
            <Link href="/collections/all" className={css.backLink}>
                ← Назад до товарів
            </Link>

            <h1 className={css.title}>Створити товар</h1>

            <form onSubmit={handleSubmit} className={css.form}>
                <div className={css.field}>
                    <label>Назва товару</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className={css.input}
                    />
                </div>

                <div className={css.row}>
                    <div className={css.field}>
                        <label>Ціна (₴)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                            className={css.input}
                        />
                    </div>

                    <div className={css.field}>
                        <label>Категорія</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={css.input}
                        />
                    </div>
                </div>

                <div className={css.field}>
                    <label>Опис</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={css.textarea}
                    />
                </div>

                <div className={css.field}>
                    <label>Доступні розміри</label>
                    <div className={css.sizesContainer}>
                        {ALL_SIZES.map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={`${css.sizeChip} ${
                                    sizes.includes(size) ? css.sizeChipActive : ""
                                }`}
                                onClick={() => handleSizeToggle(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={css.field}>
                    <label>Завантажити фото</label>
                    <label className={css.fileLabel}>
                        <Upload size={16} />
                        <span>
                            {selectedFiles.length > 0
                                ? `Обрано файлів: ${selectedFiles.length}`
                                : "Обрати файли..."}
                        </span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className={css.fileInput}
                        />
                    </label>
                </div>

                <div className={css.checkboxField}>
                    <label className={css.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className={css.checkboxInput}
                        />
                        <span>В наявності</span>
                    </label>
                </div>

                <div className={css.actions}>
                    <button
                        type="submit"
                        className={css.saveButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Створення..." : "Створити товар"}
                    </button>
                </div>
            </form>
        </main>
    );
}