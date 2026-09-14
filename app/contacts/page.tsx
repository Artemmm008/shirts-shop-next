import css from "./contacts.module.css";

export default function Contacts() {
    return (
        <main className={css.page}>
            <div className={css.container}>
                <h1 className={css.title}>Контакти</h1>
                <p className={css.text}>Якщо у вас виникли запитання щодо замовлення, наявності товарів, співпраці або роботи нашого бренду, зв&apos;яжіться з нами зручним для вас способом:</p>
                <div className={css.contacts}>
                    <a href="mailto:arcane.spiritual.21@gmail.com" className={css.link}>
                     arcane.spiritual.21@gmail.com
                    </a>
                    <a href="tel:+380987982110" className={css.link}>
                    +380 98 798 21 10
                    </a>
                </div>
            </div>
        </main>
    );
};