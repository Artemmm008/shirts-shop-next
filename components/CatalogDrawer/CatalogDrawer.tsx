"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import css from "./CatalogDrawer.module.css";

interface Category {
    title: string;
    slug: string;   
}

const CATEGORIES: Category[] = [
    { title: "Усі товари", slug: "all" },
    { title: "Футболки", slug: "t-shirts" },
    { title: "Лонгсліви", slug: "longsleeves" },
    { title: "Худі та Світшоти", slug: "hoodies" },
    { title: "Штани та Шорти", slug: "pants" },
    { title: "Аксесуари", slug: "accessories" },
];

interface CatalogDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CatalogDrawer({ isOpen, onClose }: CatalogDrawerProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className={css.backdrop} onClick={onClose} />

            <aside className={css.drawer}>
                <div className={css.header}>

                    <h2>Каталог</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className={css.iconBtn}
                        aria-label="Закрити"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className={css.nav}>
                    <ul className={css.list}>
                        {CATEGORIES.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`/collections/${category.slug}`}
                                    className={css.link}
                                    onClick={onClose}
                                >
                                    <span>{category.title}</span>
                                    <ChevronRight size={18} className={css.arrow} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}