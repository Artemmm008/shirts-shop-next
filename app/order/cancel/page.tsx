import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import css from "./Cancel.module.css";

export default function OrderCancelPage() {
	return (
		<main className={css.page}>
			<section className={css.panel}>
				<div className={css.icon} aria-hidden="true">
					<ArrowLeft size={28} strokeWidth={2} />
				</div>
				<p className={css.eyebrow}>Оплату скасовано</p>
				<h1>Замовлення ще не оплачено</h1>
				<p className={css.message}>
					Платіж не було завершено. Товари залишаються доступними для повторної спроби.
				</p>
				<div className={css.actions}>
					<Link href="/" className={css.primaryButton}>
						Повернутися на головну сторінку
					</Link>
					<Link href="/collections/all" className={css.secondaryButton}>
						До каталогу
					</Link>
				</div>
			</section>
		</main>
	);
};
