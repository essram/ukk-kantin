import Link from "next/dist/client/link";
import Image from "next/image";
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 pt-6 border-b-2 border-gray-100">
        <Image src="/logo/Logo.png" alt="Logo" width={80} height={80} />
      </div>

      <nav className="flex flex-col gap-2 px-4 py-4">
        <Link href="/stan/dashboard">
          <button className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Add Menu
          </button>
        </Link>

        <Link href="/stan/transaksi">
          <button className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Pesanan
          </button>
        </Link>

        <Link href="/stan/diskon">
          <button className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Diskon
          </button>
        </Link>
      </nav>
    </aside>
  );
}
