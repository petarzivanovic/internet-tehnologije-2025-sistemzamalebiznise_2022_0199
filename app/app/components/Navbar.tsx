import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 border-b mb-6">
      <Link href="/">Početna</Link>
      <Link href="/products">Proizvodi</Link>
      <Link href="/orders">Narudžbenice</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
