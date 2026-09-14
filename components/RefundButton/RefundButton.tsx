"use client";

import { useState } from "react";
import { refundOrder } from "@/services/orders";
import css from "./RefundButton.module.css";

interface RefundButtonProps {
    orderId: string;
    orderStatus: string;
    onSuccess?: () => void; 
}

export default function RefundButton({
    orderId,
    orderStatus,
    onSuccess,
}: RefundButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const isRefundable = orderStatus === "paid";

        const handleRefund = () => {
            const confirmed = window.confirm(
                "Ви впевнені, що хочете зробити повернення коштів для цього замовлення?"
            );

            if (!confirmed) return;

            setIsLoading(true);

            refundOrder(orderId)
                .then((refund) => {
                    if (refund?.status === "succeeded") {
                        alert(`Повернення успішно виконано! ID: ${refund.id}`);
                        if (onSuccess) onSuccess();
                    } else {
                        alert(`Статус повернення: ${refund?.status || "невідомий"}`);
                    }
                })
                .catch((error) => {
                    console.error("Помилка при поверненні:", error);
                    const errorMessage =
                        error?.response?.data?.message ||
                        "Не вдалося виконати повернення коштів.";
                    alert(errorMessage);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };


        if (!isRefundable) {
            return null;
        }

    return (
        <button
            type="button"
            onClick={handleRefund}
            disabled={isLoading}
            className={css.refundButton}
        >
            {isLoading ? "Обробка..." : "Повернути кошти"}
        </button>
    );
}