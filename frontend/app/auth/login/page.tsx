"use client";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "../../../lib/client-cookies";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Logo from "./logo.png";
// import ClickSpark from "./ClickSpark";

export default function TestPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginAs, setLoginAs] = useState<"SISWA" | "ADMIN_STAN">("SISWA");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/login`;
      const payload = JSON.stringify({
        email: email,
        password,
        role_tab: loginAs,
      });
      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status == true) {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });
        console.log(data.data);

        storeCookie("token", data.token);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);
        storeCookie("image", data.data.profile_picture);
        if (data.data.role === "ADMIN_STAN" && data.data.admin_stan) {
          storeCookie("stan_id", data.data.admin_stan.id);
        } else {
          storeCookie("id_siswa", data.data.siswa.id);
        }
        let role = data.data.role;
        if (role === `ADMIN_STAN`)
          setTimeout(() => router.push(`/stan/dashboard`), 1000);
        else if (role === `SISWA`)
          setTimeout(() => router.push(`/siswa/home`), 1000);
      } else
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "warning",
        });
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        hideProgressBar: true,
        containerId: `toastLogin`,
        type: "error",
      });
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-putihGaPutih px-4 sm:px-6 lg:px-8 font-figtree">
    <ToastContainer containerId="toastLogin" />

    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
      <div className="bg-white shadow-sm rounded-xl p-6 sm:p-8 lg:p-10">

      
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center ">
            <Image
              src={Logo}
              alt="logo"
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
            />
            <h1 className="text-hitamGaHitam font-bold text-lg sm:text-xl lg:text-2xl font-Darumadrop_One">
              NomNom
            </h1>
          </div>
        </div>

        <h1 className="text-center text-4xl sm:text-6xl lg:text-7xl font-extrabold font-tangerine text-hitamGaHitam leading-tight">
          Welcome Back
        </h1>

        <p className="text-center text-sm mt-2 text-hitamGaHitam">
          Login sebagai
        </p>

   
        <div className="flex bg-gray-100 rounded-xl p-1 mt-4 w-full">
          <button
            type="button"
            onClick={() => setLoginAs("SISWA")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              loginAs === "SISWA"
                ? "bg-orange-500 text-white shadow"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Siswa
          </button>

          <button
            type="button"
            onClick={() => setLoginAs("ADMIN_STAN")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              loginAs === "ADMIN_STAN"
                ? "bg-orange-500 text-white shadow"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Stan
          </button>
        </div>

      
        <form onSubmit={handleSubmit} className="w-full mt-6">

          <div className="relative w-full my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input
              type="text"
              className="border p-2 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              id="email"
            />
          </div>

          <div className="relative w-full my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              className="border p-2 pl-10 pr-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
            />

            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5m0 0c.993 0 1.953-.138 2.863-.395M6.228 6.228 3 3m3.228 3.228 3.65 3.65M21 21l-3.228-3.228"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-orange-500 text-lg w-full p-2 rounded-md text-white hover:bg-orange-600 transition-all"
            >
              Login
            </button>
          </div>

          <p className="text-sm text-right mt-6 capitalize text-hitamGaHitam">
            doesn&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="hover:underline text-hitamGaHitam font-semibold"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
);

}
