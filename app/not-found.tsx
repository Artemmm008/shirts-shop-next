import Link from "next/link"

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <h1>404 — СТОРІНКУ НЕ ЗНАЙДЕНО</h1>
      <p>Здається, цієї сторінки не існує.</p>
      <Link href="/">Головна</Link>
    </div>
  );
}