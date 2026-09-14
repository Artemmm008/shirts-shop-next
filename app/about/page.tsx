import Image from "next/image";
import css from "./about.module.css";

export default function About() {
  return (
    <main className={css.page}>
      
        <div className={css.imageItem}>
          <Image
            src="/mini-icons.png"
            alt="Arcane icons"
            fill
            priority
          />
        </div>

      <div className={css.container}>

        <h1 className={css.brand}>ARCANE 21</h1>

        <p className={css.text}>
          ARCANE 21 — український концептуальний бренд одягу, заснований в Одесі у 2025 році.
        </p>

        <p className={css.text}>
          Ми працюємо з темою архетипів особистості, переосмислюючи їх через мову сучасної моди, мінімалістичний дизайн і символи.
        </p>

        <p className={css.text}>
          Ми створюємо речі з сильним смисловим кодом — речі, які мають власну історію, характер та емоційний зв&apos;язок із людиною, яка їх обирає.
        </p>

        <p className={css.quote}>
          Для нас одяг — це не лише те, що ми носимо.<br />
          Це те, що ми транслюємо.
        </p>

        <h2 className={css.heading}>22 АРХЕТИПИ. ОДНА ОСОБИСТІСТЬ.</h2>

        <p className={css.text}>
          В основі ARCANE 21 — система з 22 архетипів, кожен з яких уособлює певний стан, якість або внутрішню силу людини.
        </p>

        <p className={css.text}>
          Ми переосмислюємо ці архетипи в контексті сучасної культури, самосприйняття та особистої ідентичності.
        </p>

        <p className={css.text}>
          Кожна річ — частина цієї системи.
        </p>

        <div className={css.listBlock}>
          <p className={css.text}>22 окремі історії.</p>
          <p className={css.text}>22 різні стани.</p>
          <p className={css.text}>Одна цілісна структура.</p>
        </div>

        <h2 className={css.heading}>ОДЯГ ЯК СТАН</h2>

        <p className={css.text}>
          Ми віримо, що одяг може впливати не лише на те, як нас бачать, а й на те, як ми відчуваємо себе самі.
        </p>

        <p className={css.text}>
          Тому кожна річ ARCANE 21 створена як носій певного стану.
        </p>

        <div className={css.listBlock}>
          <p className={css.text}>Ти можеш обрати його інтуїтивно.</p>
          <p className={css.text}>За відчуттям.</p>
          <p className={css.text}>За символом.</p>
          <p className={css.text}>Або знайти той, що резонує саме з тобою.</p>
        </div>

        <p className={css.quote}>
          Ти не просто обираєш річ.<br />
          Ти обираєш стан, який хочеш із собою носити.
        </p>

        <h2 className={css.heading}>ODESSA, UKRAINE</h2>

        <p className={css.text}>
          ARCANE 21 народився в Одесі.
        </p>

        <p className={css.text}>
          Ми створюємо бренд в Україні, поєднуючи локальне походження з глобальним баченням сучасної моди.
        </p>

        <p className={css.quote}>
          Для нас українське — це не стильовий маркер.<br />
          Це наша точка відліку.
        </p>

        <h2 className={css.heading}>НАША ФІЛОСОФІЯ</h2>
        <p className={css.subheading}>ТВОЯ СИЛА — ВСЕРЕДИНІ ТЕБЕ.</p>

        <p className={css.text}>
          Ми не створюємо одяг, який має зробити тебе кимось іншим.
        </p>

        <p className={css.text}>
          Ми створюємо його, щоб допомогти проявити те, що вже є всередині:
        </p>

        <p className={css.text}>Силу.</p>
        <p className={css.text}> Свободу.</p>
        <p className={css.text}>Впевненість.</p>
        <p className={css.text}>Бажання.</p>
        <p className={css.text}>Інтуїцію.</p>
        <p className={css.text}>Творчість.</p>

        <p className={css.quote}>
          Не стати кимось.<br />
          Проявити себе.
        </p>

        <div className={css.footerCall}>
          <p className={css.brand}>ARCANE 21</p>
          <p className={css.callText}>ОБЕРИ СВІЙ СТАН.</p>
          <p className={css.callText}>ВІДЧУЙ СВОЮ ЕНЕРГІЮ.</p>
          <p className={css.callText}>ПРОЯВИ СЕБЕ.</p>
        </div>
      </div>
    </main>
  );
}