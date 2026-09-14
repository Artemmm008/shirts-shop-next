"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, CartItem } from "@/types/product";
import { getStoredCart, setStoredCart, clearStoredCart } from "@/utils/storage";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, selectedSize: ProductSize, quantity?: number) => void;
    removeFromCart: (productId: string, selectedSize: ProductSize) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    useEffect(() => {
        setCart(getStoredCart());
        setIsCartLoaded(true);
    }, []);

    useEffect(() => {
        if (isCartLoaded) {
            setStoredCart(cart);
        }
    }, [cart, isCartLoaded]);

    const addToCart = (product: Product, selectedSize: ProductSize, quantity = 1): void => {
        setCart((prevCart) => {
            const item = prevCart.find((cartItem) => cartItem.product._id === product._id && cartItem.selectedSize === selectedSize);
            if (item) {
                return prevCart.map((cartItem) =>
                    cartItem.product._id === product._id && cartItem.selectedSize === selectedSize
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                );
            };
            return [...prevCart, { product, selectedSize, quantity }];
        });
    };

    const removeFromCart = (productId: string, selectedSize: ProductSize): void => {
        setCart((prevCart) => prevCart.filter((cartItem) => !(cartItem.product._id === productId && cartItem.selectedSize === selectedSize)));
    };

    const clearCart = (): void => {
        setCart([]);
        clearStoredCart();
    };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    };
    return context;
};