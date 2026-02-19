"use client";

"use client";

import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("stan_id");
    Cookies.remove("role");
    router.push("/auth/login");
  };

  return (
    <>
      <button
        aria-label="Open sidebar"
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <aside className="hidden md:flex w-64 h-screen bg-white border-r border-gray-200 flex-col font-figtree">
        <div className="px-6 pt-6 border-b-2 border-gray-100">
          <Link href="/stan/profile">
          
          <Image src="/logo/user_image.png" alt="Logo" width={70} height={70} className="mb-6" />
          </Link>
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

        <div className="mt-auto px-4 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-center bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <aside className="relative w-64 h-full bg-white border-r border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <Image src="/logo/Logo.png" alt="Logo" width={64} height={64} />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link href="/stan/dashboard">
                <button
                  onClick={() => setOpen(false)}
                  className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Add Menu
                </button>
              </Link>

              <Link href="/stan/transaksi">
                <button
                  onClick={() => setOpen(false)}
                  className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Pesanan
                </button>
              </Link>

              <Link href="/stan/diskon">
                <button
                  onClick={() => setOpen(false)}
                  className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Diskon
                </button>
              </Link>
            </nav>

            <div className="mt-auto pt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-center bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
