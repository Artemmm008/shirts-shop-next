import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Manrope } from 'next/font/google';
import CartClientProvider from "@/components/CartClientProvider/CartClientProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

export const viewport: Viewport = {
  width: 1200,
  initialScale: 1,
};

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Arcane 21",
  description: "More than clothes",
  icons: {
    icon: "/small_logo.png",
    shortcut: "/small_logo.png",
    apple: "/small_logo.png", 
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body>
         <TanStackProvider>
          <CartClientProvider>
          <Header />
          {children}
          <Footer />
          </CartClientProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
