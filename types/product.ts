export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "ONE SIZE";

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category?: string;
    imageUrl: string[];
    sizes: ProductSize[];
    inStock: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export interface CartItem {
    product: Product;
    selectedSize: ProductSize;
    quantity: number;
}
