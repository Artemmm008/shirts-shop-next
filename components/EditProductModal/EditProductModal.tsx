"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { X, Upload } from "lucide-react";
import { Product, ProductSize } from "@/types/product";
import { updateProduct, uploadProductImages } from "@/services/products";
import css from "./EditProductModal.module.css";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    onProductUpdated: () => void;
}

const ALL_SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];

export default function EditProductModal({
    isOpen,
    onClose,
    product,
    onProductUpdated,
}: EditProductModalProps) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category || "");
    const [description, setDescription] = useState(product.description || "");
    const [inStock, setInStock] = useState(product.inStock);
    const [sizes, setSizes] = useState<ProductSize[]>(product.sizes || []);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

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

        if (selectedFiles.length > 0) {
            const formData = new FormData();
            selectedFiles.forEach((file) => formData.append("images", file));

            const uploadRes = await uploadProductImages(product._id, formData);
            if (!uploadRes) {
                setIsLoading(false);
                alert("Не вдалося завантажити зображення.");
                return;
            }
        }

        const updatedProduct = await updateProduct(product._id, {
            title,
            price: Number(price),
            category,
            description,
            inStock,
            sizes,
        });

        setIsLoading(false);

        if (!updatedProduct) {
            alert("Не вдалося оновити товар.");
            return;
        }

        onProductUpdated();
        onClose();
    };

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <div className={css.header}>
                    <h2>Редагування товару</h2>
                    <button type="button" className={css.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={css.form}>
                    <div className={css.field}>
                        <label>Назва товару</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
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
                            />
                        </div>

                        <div className={css.field}>
                            <label>Категорія</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={css.field}>
                        <label>Опис</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        <label>Завантажити нові фото</label>
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
                        <button type="button" className={css.cancelButton} onClick={onClose}>
                            Скасувати
                        </button>
                        <button type="submit" className={css.saveButton} disabled={isLoading}>
                            {isLoading ? "Збереження..." : "Зберегти"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}