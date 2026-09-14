import { ProductSize } from "./product";

export type OrderStatus = "new" | "paid" | "processing" | "shipped" |"completed" | "canceled";

export interface OrderItem {
    productId: string;
    title: string;
    quantity: number;
    price: number;
    size: ProductSize | string;
}

export interface CustomerInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
}

export interface Order {
    _id: string;
    userId?: string | null;
    guestId?: string | null;
    items: OrderItem[];
    totalAmount: number;
    customerInfo: CustomerInfo;
    status: OrderStatus;
    paymentIntentId?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateOrderPayload {
    items: OrderItem[];
    totalAmount: number;
    customerInfo: CustomerInfo;
    guestId?: string | null;
}