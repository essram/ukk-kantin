"use client";

import Link from "next/link";
import Image from "next/image";
import { removeCookie, getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    const image = getCookie("foto");

    setIsLoggedIn(!!token);

    if (image) {
      setProfileImage(image);
    } else {
      setProfileImage(null);
    }
  }, []);

  const handleLogOut = () => {
    removeCookie("token");
    removeCookie("id");
    removeCookie("name");
    removeCookie("role");
    removeCookie("image");
    removeCookie("stan_id");
    removeCookie("id_siswa");

    setIsLoggedIn(false);
    setIsOpen(false);

    router.push("/login");
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();

      toast.error("Silakan login terlebih dahulu untuk mengakses menu.");
    }
  };

  const hoverAnimate =
    "relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:bottom-0 " +
    "after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 after:ease-out " +
    "hover:after:left-0 hover:after:w-full";

  return (
    <nav className="w-screen bg-black/85 text-white shadow-md fixed top-0 z-50">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center py-4 px-6 md:px-12 lg:px-36">
        <div className="flex items-center">
          <Image src="/logo/Logo.png" alt="Logo" width={50} height={50} />
          <span className="ml-3 font-bold text-lg">NomNom</span>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <Link className={hoverAnimate} href="/">
            Home
          </Link>
          <Link
            className={hoverAnimate}
            href="/siswa/list-stan"
            onClick={handleMenuClick}
          >
            Menu
          </Link>

          <Link className={hoverAnimate} href="/about">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="bg-oren px-5 py-2 rounded-xl hover:bg-oren/80 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="ml-4 bg-white text-black px-5 py-2 rounded-xl hover:bg-white/80 transition-all"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-row justify-center items-center gap-14">
              <button
                onClick={handleLogOut}
                className="bg-oren px-5 py-2 rounded-xl hover:bg-oren/80 transition-all"
              >
                Sign Out
              </button>

              <div>
                <Link href="/siswa/profile">
                  <Image
                    src={profileImage || "/home/default_profile.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border border-white/20"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 px-6 py-6 space-y-5 border-t border-white/10">
          <Link onClick={() => setIsOpen(false)} href="/" className="block">
            Home
          </Link>
          <Link
            href="/siswa/menuOrder"
            className="block"
            onClick={(e) => {
              handleMenuClick(e);
              if (isLoggedIn) setIsOpen(false);
            }}
          >
            Menu
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            href="/about"
            className="block"
          >
            About
          </Link>

          <div className="pt-4 border-t border-white/10">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-oren text-center px-5 py-2 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-black text-center px-5 py-2 rounded-xl"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogOut}
                className="w-full bg-oren px-5 py-2 rounded-xl"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
