"use client";

import Link from "next/link";
import { useState } from "react";
import { SlidersHorizontal, User, ShoppingBag, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import SearchBox from "../SearchBox/SearchBox";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import AuthDrawer from "../AuthDrawer/AuthDrawer";
import CartDrawer from "../CartDrawer/CartDrawer";
import CatalogDrawer from "../CatalogDrawer/CatalogDrawer";
import AdminDrawer from "../AdminDrawer/AdminDrawer";
import css from "./Header.module.css";

export default function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const { totalItems } = useCart();

  const { user } = useAuth(); 

  const isAdmin = user?.role === "admin";

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <nav className={css.nav}>
            <button 
              type="button" 
              className={css.navBtn} 
              onClick={() => setIsCatalogOpen(true)}
            >
              Каталог
            </button>
            <Link href="/about" className={css.navLink}>
              Про нас
            </Link>
            <Link href="/contacts" className={css.navLink}>
              Контакти
            </Link>
          </nav>

          <Link href="/" className={css.logo}>
            Arcane 21
          </Link>

          <div className={css.actions}>
            <SearchBox />

            {isAdmin && (
              <button
                type="button"
                className={css.iconBtn}
                onClick={() => setIsAdminOpen(true)}
                aria-label="Адмін-панель"
              >
                <Shield size={20} />
              </button>
            )}

            <button
              type="button"
              className={css.iconBtn}
              onClick={() => setIsFilterOpen(true)}
              aria-label="Фільтри"
            >
              <SlidersHorizontal size={20} />
            </button>

            <button
              type="button"
              className={css.iconBtn}
              onClick={() => setIsAuthOpen(true)}
              aria-label="Профіль"
            >
              <User size={20} />
            </button>

            <button
              type="button"
              className={css.iconBtn}
              onClick={() => setIsCartOpen(true)}
              aria-label="Кошик"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className={css.badge}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <AuthDrawer
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <CatalogDrawer 
        isOpen={isCatalogOpen} 
        onClose={() => setIsCatalogOpen(false)} 
      />
      
      {isAdmin && (
        <AdminDrawer
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </>
  );
}