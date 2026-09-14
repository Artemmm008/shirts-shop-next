import { CartItem } from "@/types/product";

const CART_STORAGE_KEY = "shopping_cart";

export const getStoredCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];

    const item = localStorage.getItem(CART_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
};

export const setStoredCart = (cart: CartItem[]): void => {
    if (typeof window === "undefined") return;

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const clearStoredCart = (): void => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(CART_STORAGE_KEY);
};