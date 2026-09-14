import { api } from "./api";
import { Order, CreateOrderPayload } from "@/types/order";

export interface CreateCheckoutResponse {
    url: string;
};

export interface StripeRefund {
    id: string;
    amount: number;
    status: string;
    currency: string;
}

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await api.post<Order>("/orders", payload);
    return data;
};

export const getAllOrders = async (): Promise<Order[]> => {
    const { data } = await api.get<Order[]>("/orders");
    return data;
};

export const getOrderById = async (id: string): Promise<Order> => {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
};

export const updateOrderStatus = async (id: string, status: Order["status"]): Promise<Order> => {
    const { data } = await api.patch<Order>(`/orders/${id}/status`, { status });
    return data;
};

export const createCheckoutSession = async (payload: { orderId: string }): Promise<CreateCheckoutResponse> => {
    const { data } = await api.post<CreateCheckoutResponse>("/payments/create-checkout-session", payload);
    return data;
};

export const refundOrder = async (orderId: string): Promise<StripeRefund> => {
    const { data } = await api.post<StripeRefund>(`/payments/refund/${orderId}`);
    return data;
}