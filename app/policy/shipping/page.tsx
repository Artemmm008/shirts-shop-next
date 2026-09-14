import css from "./Shipping.module.css";

export default function DeliveryPayment() {
  return (
    <main className={css.page}>
      <h1 className={css.title}>ОПЛАТА ТА ДОСТАВКА</h1>

      <p className={css.text}>
        <strong>Оплата</strong>
      </p>
      <p className={css.text}>
        Оплата замовлення здійснюється онлайн банківською карткою або через Apple Pay.
      </p>
      <p className={css.text}>
        Валюта оплати — гривня (UAH).
      </p>
      <p className={css.text}>
        Після успішної оплати замовлення передається в обробку.
      </p>

      <p className={css.text} style={{ marginTop: "24px" }}>
        <strong>Доставка по Україні</strong>
      </p>
      <p className={css.text}>
        Доставка здійснюється Новою поштою, Укрпоштою або Meest.
      </p>
      <p className={css.text}>
        Термін підготовки та відправлення замовлення — 1-3 робочі дні.
      </p>
      <p className={css.text}>
        Вартість доставки — згідно з тарифами обраного перевізника та оплачується покупцем.
      </p>
      <p className={css.text}>
        Безкоштовна доставка по Україні від 4500 грн.
      </p>

      <p className={css.text} style={{ marginTop: "24px" }}>
        <strong>Міжнародна доставка</strong>
      </p>
      <p className={css.text}>
        Міжнародна доставка здійснюється доступними службами доставки залежно від країни призначення.
      </p>
      <p className={css.text}>
        Вартість доставки розраховується відповідно до країни призначення та параметрів відправлення.
      </p>
      <p className={css.text}>
        Термін доставки залежить від країни та обраного перевізника.
      </p>
      <p className={css.text}>
        Митні платежі, податки та інші збори, які можуть стягуватися країною призначення, сплачує отримувач.
      </p>

      <p className={css.text} style={{ marginTop: "24px" }}>
        <strong>Важливо</strong>
      </p>
      <p className={css.text}>
        Після відправлення замовлення ви отримаєте номер транспортної накладної для відстеження.
      </p>
      <p className={css.text}>
        У разі пошкодження посилки під час транспортування рекомендуємо зафіксувати пошкодження при отриманні та звернутися до перевізника для оформлення претензії.
      </p>
    </main>
  );
}