import css from "./Returns.module.css";

export default function Returns() {
  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>ПОВЕРНЕННЯ ТА ОБМІН</h1>
        
        <p className={css.text}>
          Ви можете повернути або обміняти товар належної якості протягом 14 днів з моменту його отримання, якщо товар не був у використанні, збережено його товарний вигляд, споживчі властивості, ярлики та інші умови, передбачені законодавством України.
        </p>

        <p className={css.text}>
          Якщо товар має виробничий недолік або інший недолік, за який відповідає продавець, покупець має право на захист своїх прав відповідно до законодавства України.
        </p>

        <p className={css.text}>
          Вартість повернення або обміну товару належної якості оплачує покупець.
        </p>

        <p className={css.text}>
          Для оформлення повернення або обміну зверніться до нас:
        </p>

        <div className={css.contacts}>
          <a href="mailto:arcane.spiritual.21@gmail.com" className={css.link}>
            arcane.spiritual.21@gmail.com
          </a>
          <a href="tel:+380987982110" className={css.link}>
            +380 98 798 21 10
          </a>
        </div>

        <p className={css.text}>
          Після отримання та перевірки повернутого товару кошти повертаються на банківську картку, з якої була здійснена оплата.
        </p>
      </div>
    </main>
  );
}