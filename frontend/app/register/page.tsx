"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Logo from "@/public/logo/Logo.png";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";

export default function RegisterPage() {
  const [registerAs, setRegisterAs] = useState<"SISWA" | "ADMIN_STAN">("SISWA");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const url = `${BASE_API_URL}/user`;
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("password", password);
      payload.append("role", registerAs);
      if (file) payload.append("profil_picture", file);

      const { data } = await post(url, payload, );

      if (data?.status) {
        toast.success("Register berhasil!");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        toast.warning(data?.message || "Register gagal");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  font-poppins ">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center px-8 py-6">
        <Image src={Logo} alt="logo" className="w-16 h-16" />
        <h1 className="text-hitamGaHitam font-bold text-xl font-Darumadrop_One uppercase ml-3">
          Fooder
        </h1>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-500 text-base mb-8">
            Register sebagai
          </p>

          {/* Role Selector */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              type="button"
              onClick={() => setRegisterAs("SISWA")}
              className={`flex-1 py-3 rounded-xl text-base font-semibold transition-all
                ${
                  registerAs === "SISWA"
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              Siswa
            </button>

            <button
              type="button"
              onClick={() => setRegisterAs("ADMIN_STAN")}
              className={`flex-1 py-3 rounded-xl text-base font-semibold transition-all
                ${
                  registerAs === "ADMIN_STAN"
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              Stan
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              className="w-full border rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              className="w-full border rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative w-full">
              {/* Lock Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>

              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-xl pl-12 pr-12 py-3 text-base focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Eye Icon */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
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

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Profile Picture (optional)
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,application/pdf"
                className="w-full border rounded-xl px-4 py-3 text-base bg-white"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 text-lg font-semibold transition-all"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-orange-500 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
