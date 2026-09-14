import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
          <div className={css.grid}>
                    <div className={css.column}>
                        <h3 className={css.title}>Інформація</h3>
              <ul className={css.navList}>
                <li>
                <Link href="/policy/shipping" className={css.link}>
                  Оплата та доставка
                </Link>
              </li>
              <li>
                <Link href="/policy/returns" className={css.link}>
                  Повернення
                </Link>
              </li>
              <li>
                <Link href="/policy/terms-of-service" className={css.link}>
                  Договір публічної оферти
                </Link>
              </li>
              <li>        
                <Link href="/policy/privacy-policy" className={css.link}>
                  Політика конфіденційності
                </Link>
              </li>
            </ul>
          </div>

          <div className={css.column}>
            <h3 className={css.title}>Соціальні мережі</h3>
            <ul className={css.contactList}>
              <li>
                <a
                  href="https://www.instagram.com/arcane21.store?stkn=M2JjNGdvdjlhMDdq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.contactLink}
                >
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@arcane21.store?_r=1&_t=ZN-99hhb1bV0L8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.contactLink}
                >
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={css.bottom}>
          <p>© {new Date().getFullYear()} Arcane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}