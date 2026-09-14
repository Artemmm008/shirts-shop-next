import Link from "next/link";
import css from "./signInPage.module.css";

export default function SignInPage() {
	return (
		<main className={css.page}>
			<div className={css.div}>
				<h1>Потрібно зареєструватися</h1>
				<Link href="/" className={css.backLink}>Повернутися на головну</Link>
			</div>
		</main>
	);
}
