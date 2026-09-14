"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import css from "./FilterDrawer.module.css";

const FILTER_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedSize, setSelectedSize] = useState<string>(
        () => searchParams.get("size") || ""       
    );
    
    const [sortBy, setSortBy] = useState<string>(
      () => searchParams.get("sort") || "newest"
    );

    if (!isOpen) return null;

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedSize) params.set("size", selectedSize);
        else params.delete("size");

        if (sortBy) params.set("sort", sortBy);
        router.push(`?${params.toString()}`);
        onClose();
    };
    
    const handleReset = () => {
        setSelectedSize("");
        setSortBy("newest");
        router.push(window.location.pathname);
        onClose();
    };


    return (
        <>
            <div className={css.backdrop} onClick={onClose} />
            
            <aside className={css.drawer}>
                <div className={css.header}>
                    <div className={css.headerTitle}>
                        <SlidersHorizontal size={20} />    
                        <h2>Фільтр</h2> 
                    </div>  
                    <button type="button" onClick={onClose} className={css.closeBtn}>      
                        <X size={24} />       
                    </button>
                </div>

                <div className={css.content}>         
                    <div>
                        <h4 className={css.sectionTitle}>Сортування</h4>
                        <div className={css.sortGrid}>
                            <button
                                type="button"
                                className={`${css.sortBtn} ${sortBy === "newest" ? css.sortBtnActive : ""}`}
                                onClick={() => setSortBy("newest")}
                            >
                                Спочатку нові
                            </button>
                            <button
                                type="button"
                                className={`${css.sortBtn} ${sortBy === "price_asc" ? css.sortBtnActive : ""}`}
                                onClick={() => setSortBy("price_asc")}
                            >
                                Від дешевших
                            </button>
                            <button
                                type="button"
                                className={`${css.sortBtn} ${sortBy === "price_desc" ? css.sortBtnActive : ""}`}
                                onClick={() => setSortBy("price_desc")}
                            >
                                Від дорожчих
                            </button>
                        </div>
                    </div>            

                    <div>  
                        <h4 className={css.sectionTitle}>Розмір</h4>
                        <div className={css.sizeGrid}>
                            {FILTER_SIZES.map((size) => (
                                <button
                                    key={size}
                                    type="button"               
                                    className={`${css.sizeBtn} ${
                                        selectedSize === size ? css.sizeBtnActive : ""      
                                        }`}
                                    onClick={() =>
                                        setSelectedSize(selectedSize === size ? "" : size)
                                    }
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
  
                <div className={css.footer}>        
                    <button type="button" onClick={handleReset} className={css.resetBtn}>
                        Очистити              
                    </button>
                    <button type="button" onClick={handleApply} className={css.applyBtn}>
                        Переглянути
                    </button>
                </div>
            </aside>
        </>
    );
};