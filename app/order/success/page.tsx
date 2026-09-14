"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import css from "./Success.module.css";

export default function OrderSuccessPage() {
	const { clearCart } = useCart();
	const hasClearedCart = useRef(false);

	useEffect(() => {
		if (hasClearedCart.current) return;
		hasClearedCart.current = true;
		clearCart();
	}, [clearCart]);

	return (
		<main className={css.page}>
			<section className={css.panel}>
				<div className={css.icon} aria-hidden="true">
					<Check size={28} strokeWidth={2} />
				</div>
				<p className={css.eyebrow}>Замовлення підтверджено</p>
				<h1>Дякуємо за покупку</h1>
				<p className={css.message}>
					Оплата пройшла успішно. Ми вже готуємо ваше замовлення до відправлення.
				</p>
				<div className={css.actions}>
					<Link href="/collections/all" className={css.primaryButton}>
						Продовжити покупки
					</Link>
					<Link href="/" className={css.secondaryButton}>
						На головну
					</Link>
				</div>
			</section>
		</main>
	);
};
