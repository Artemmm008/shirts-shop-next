"use client";

import { X, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getAllOrders } from "@/services/orders";
import css from "./AuthDrawer.module.css";

interface AuthDrawerProps {
    isOpen: boolean;
    onClose: () => void;
};


export default function AuthDrawer({ isOpen, onClose }: AuthDrawerProps) {
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const {
        isLogin,
        formData,
        user,
        errorMessage,
        isLoading,
        isLoggingOut,
        handleChange,
        handleSubmit,
        toggleMode,
        logout,
    } = useAuth({ onSuccess: onClose });

    const ordersQuery = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
        enabled: isOpen && isOrdersOpen,
    });
    const visibleOrders = ordersQuery.data?.filter((order) => order.status !== "new") ?? [];

    const handleOrdersOpen = () => {
        setIsOrdersOpen(true);
    };

    const handleProfileBack = () => {
        setIsOrdersOpen(false);
    };

    const handleClose = () => {
        setIsOrdersOpen(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={css.backdrop} onClick={handleClose} />

            <aside className={css.drawer}>
                <div className={css.header}>
                    <h2>{isOrdersOpen ? "Мої замовлення" : user ? "Мій профіль" : isLogin ? "Увійти" : "Реєстрація"}</h2>
                    <button 
                        type="button" 
                        onClick={handleClose} 
                        className={css.closeBtn}
                        aria-label="Закрити"
                    >
                        <X size={24} />
                    </button>
                </div>

                {isOrdersOpen ? (
                    <div className={css.ordersPanel}>
                        <button type="button" onClick={handleProfileBack} className={css.backButton}>
                            <ArrowLeft size={16} />
                            Назад
                        </button>

                        {ordersQuery.isLoading && <p className={css.ordersMessage}>Завантаження...</p>}
                        {ordersQuery.isError && (
                            <p className={css.error}>Не вдалося завантажити замовлення.</p>
                        )}
                        {!ordersQuery.isLoading && !ordersQuery.isError && visibleOrders.length === 0 && (
                            <p className={css.ordersMessage}>Замовлень поки немає.</p>
                        )}
                        {visibleOrders.length > 0 && (
                            <div className={css.ordersList}>
                                {visibleOrders.map((order) => (
                                    <Link key={order._id} href={`/orders/${order._id}`} className={css.orderCard} onClick={handleClose}>
                                        <div className={css.orderHeader}>
                                            <span>#{order._id.slice(-6)}</span>
                                            <span className={css.orderStatus}>{order.status}</span>
                                        </div>
                                        <p>{order.items.length} товарів</p>
                                        <span>{order.totalAmount} ₴</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : user ? (
                    <div className={css.profile}>
                        <div className={css.profileField}>
                            <span>Ім&apos;я</span>
                            <span>{user.name}</span>
                        </div>
                        <div className={css.profileField}>
                            <span>Email</span>
                            <span>{user.email}</span>
                        </div>
                        <button type="button" onClick={handleOrdersOpen} className={css.ordersButton}>
                            <Package size={17} />
                            Замовлення
                        </button>
                        {errorMessage && <p className={css.error}>{errorMessage}</p>}
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className={css.form}>
                            {!isLogin && (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ім'я"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={css.input}
                                    required
                                />
                            )}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={css.input}
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                className={css.input}
                                required
                            />

                            <button
                                type="submit"
                                className={css.submitBtn}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Завантаження..."
                                    : isLogin ? "Увійти" : "Зареєструватися"}
                            </button>
                            {errorMessage && <p className={css.error}>{errorMessage}</p>}
                        </form>

                        <button
                            type="button"
                            onClick={toggleMode}
                            className={css.switchBtn}
                        >
                            {isLogin ? "Створити акаунт" : "Вже є акаунт?"}
                        </button>
                        <button type="button" onClick={handleOrdersOpen} className={css.ordersButton}>
                            <Package size={17} />
                            Мої замовлення
                        </button>
                    </>
                )}
                {user && (
                    <button
                        type="button"
                        onClick={logout}
                        className={css.switchBtn}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? "Вихід..." : "Вийти з акаунта"}
                    </button>
                )}
            </aside>
        </>
    );
};