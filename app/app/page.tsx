import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        Sistem za upravljanje malim biznisom
      </h1>

      <p className="text-gray-600 mb-6">
        Web aplikacija za praćenje proizvoda, lagera i narudžbenica.
      </p>

      <nav className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Login
        </Link>

        <Link
          href="/products"
          className="px-4 py-2 border rounded"
        >
          Proizvodi
        </Link>

        <Link
          href="/orders"
          className="px-4 py-2 border rounded"
        >
          Narudžbenice
        </Link>
      </nav>
    </main>
  );
}
