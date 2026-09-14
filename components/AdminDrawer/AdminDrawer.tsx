"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, PlusSquare, ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import css from "./AdminDrawer.module.css";

interface AdminDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminDrawer({ isOpen, onClose }: AdminDrawerProps) {
    const pathname = usePathname();
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    if (!isOpen || !isAdmin) return null;

    return (
        <>
            <div className={css.backdrop} onClick={onClose} />

            <aside className={css.drawer}>
                <div className={css.header}>
                    <h2>Панель адміністратора</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className={css.closeBtn}
                        aria-label="Закрити"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className={css.menuList}>
                    <Link
                        href="/admin/products"
                        className={`${css.navLink} ${
                            pathname === "/admin/products" ? css.navLinkActive : ""
                        }`}
                        onClick={onClose}
                    >
                        <PlusSquare size={20} />
                        <span>Створити товар</span>
                    </Link>

                    <Link
                        href="/admin/orders"
                        className={`${css.navLink} ${
                            pathname === "/admin/orders" ? css.navLinkActive : ""
                        }`}
                        onClick={onClose}
                    >
                        <ShoppingBag size={20} />
                        <span>Замовлення</span>
                    </Link>
                </nav>
            </aside>
        </>
    );
}