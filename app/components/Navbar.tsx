import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white shadow-md">
      <div className="font-bold text-xl">BiznisSistem</div>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-gray-300">Početna</Link>
        <Link href="/proizvodi" className="hover:text-gray-300">Proizvodi</Link>
        <Link href="/login" className="bg-white text-black px-4 py-1 rounded">Prijava</Link>
      </div>
    </nav>
  );
}