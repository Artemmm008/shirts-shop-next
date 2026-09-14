"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/services/orders";
import { OrderStatus } from "@/types/order";
import RefundButton from "@/components/RefundButton/RefundButton";
import css from "./AdminOrders.module.css";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
    { value: "paid", label: "paid" },
    { value: "processing", label: "processing" },
    { value: "shipped", label: "shipped" },
    { value: "completed", label: "completed" },
    { value: "canceled", label: "canceled" },
];

export default function AdminOrdersPage() {
    const queryClient = useQueryClient();

    const ordersQuery = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
            updateOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });

    const visibleOrders = ordersQuery.data?.filter((order) => order.status !== "new") ?? [];

    const handleStatusChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        orderId: string
    ) => {
        const newStatus = e.target.value as OrderStatus;
        updateStatusMutation.mutate({ id: orderId, status: newStatus });
    };

    return (
        <div className={css.ordersPanel}>
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
                        <Link key={order._id} href={`/orders/${order._id}`} className={css.orderCard}>
                            <div className={css.orderHeader}>
                                <span>#{order._id.slice(-6)}</span>
                                <div
                                    className={css.actionsWrapper}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                >
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(e, order._id)}
                                        disabled={updateStatusMutation.isPending}
                                        className={css.orderStatusSelect}
                                    >
                                        {STATUS_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <RefundButton
                                        orderId={order._id}
                                        orderStatus={order.status}
                                        onSuccess={() => {
                                            queryClient.invalidateQueries({ queryKey: ["orders"] });
                                        }}
                                    />
                                </div>
                            </div>
                            <p>{order.items.length} товарів</p>
                            <span>{order.totalAmount} ₴</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}