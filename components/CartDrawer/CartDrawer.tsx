"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { createCheckoutSession, createOrder } from "@/services/orders";
import { CustomerInfo } from "@/types/order";
import CartItemCard from "../CartItemCard/CartItemCard";
import css from "./CartDrawer.module.css";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, addToCart, removeFromCart, totalPrice } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        fullName: "",
        phone: "",
        email: "",
        address: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleDecrease = (item: (typeof cart)[0]) => {
        if (item.quantity > 1) {
            addToCart(item.product, item.selectedSize, -1);
        } else {
            removeFromCart(item.product._id, item.selectedSize);
        }
    };

    const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
        setErrorMessage("");
    };

    const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const order = await createOrder({
                items: cart.map(({ product, selectedSize, quantity }) => ({
                    productId: product._id,
                    title: product.title,
                    quantity,
                    price: product.price,
                    size: selectedSize,
                })),
                totalAmount: totalPrice,
                customerInfo,
            });

            const { url } = await createCheckoutSession({ orderId: order._id });
            window.location.assign(url);
        } catch {
            setErrorMessage("Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className={css.backdrop} onClick={onClose} />

            <aside className={css.drawer}>
                <div className={css.header}>
                    <h2>Кошик</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className={css.closeBtn}
                        aria-label="Закрити"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className={css.itemsList}>
                    {cart.length === 0 ? (
                        <p className={css.emptyText}>Ваш кошик порожній</p>
                    ) : (
                        cart.map((item) => (
                            <CartItemCard
                                key={`${item.product._id}-${item.selectedSize}`}
                                item={item}
                                onIncrease={() => addToCart(item.product, item.selectedSize, 1)}
                                onDecrease={() => handleDecrease(item)}
                                onRemove={() => removeFromCart(item.product._id, item.selectedSize)}
                            />
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={css.footer}>
                        <div className={css.totalRow}>
                            <span>Всього:</span>
                            <span>{totalPrice} ₴</span>
                        </div>

                        {!isCheckoutOpen ? (
                            <button
                                type="button"
                                className={css.checkoutBtn}
                                onClick={() => setIsCheckoutOpen(true)}
                            >
                                Оформити замовлення
                            </button>
                        ) : (
                            <form onSubmit={handleCheckout} className={css.checkoutForm}>
                                <input name="fullName" placeholder="Ім'я" value={customerInfo.fullName} onChange={handleCustomerChange} required />
                                <input name="phone" type="tel" placeholder="Телефон" value={customerInfo.phone} onChange={handleCustomerChange} required />
                                <input name="email" type="email" placeholder="Email" value={customerInfo.email} onChange={handleCustomerChange} required />
                                <input name="address" placeholder="Адреса доставки" value={customerInfo.address} onChange={handleCustomerChange} required />
                                {errorMessage && <p className={css.error}>{errorMessage}</p>}
                                <button type="submit" className={css.checkoutBtn} disabled={isSubmitting}>
                                    {isSubmitting ? "Переходимо до оплати..." : "Перейти до оплати"}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </aside>
        </>
    );
};
