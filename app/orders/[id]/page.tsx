"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/services/orders";
import css from "./OrdersId.module.css";

export default function OrderPage() {
	const params = useParams<{ id: string }>();
	const orderQuery = useQuery({
		queryKey: ["order", params.id],
		queryFn: () => getOrderById(params.id),
		enabled: Boolean(params.id),
	});

	if (orderQuery.isLoading) {
		return <main className={css.page}><p>Завантаження замовлення...</p></main>;
	}

	if (orderQuery.isError || !orderQuery.data) {
		return (
			<main className={css.page}>
				<h1>Замовлення не знайдено</h1>
				<Link href="/" className={css.backLink}>На головну</Link>
			</main>
		);
	}

	const order = orderQuery.data;

    const formattedDate = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : null;
    
	return (
		<main className={css.page}>
			<div className={css.header}>
				<Link href="/" className={css.backLink}>На головну</Link>
				<span className={css.status}>{order.status}</span>
			</div>

			<h1>Замовлення #{order._id.slice(-6)}</h1>

			<section className={css.section}>
				<h2>Товари</h2>
				<div className={css.items}>
					{order.items.map((item, index) => (
						<article key={`${item.productId}-${item.size}-${index}`} className={css.item}>
							<div>
								<h3>{item.title}</h3>
								<p>Розмір: {item.size}</p>
								<p>Кількість: {item.quantity}</p>
							</div>
							<span>{item.price * item.quantity} ₴</span>
						</article>
					))}
				</div>
				<div className={css.total}>
					<span>Всього</span>
					<span>{order.totalAmount} ₴</span>
				</div>
			</section>

			<section className={css.section}>
				<h2>Доставка</h2>
				<p>{order.customerInfo.fullName}</p>
				<p>{order.customerInfo.email}</p>
				<p>{order.customerInfo.phone}</p>
				<p>{order.customerInfo.address}</p>
			</section>
            {formattedDate && (
                <p className={css.date}>Дата замовлення: {formattedDate}</p>
            )}
		</main>
	);
}
