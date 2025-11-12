"use client";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "../../lib/client-cookies";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Logo from "./logo.png";
import ClickSpark from "./ClickSpark";
import SplitText from "./SplitText";
export default function TestPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/login`;
      const payload = JSON.stringify({ email: email, password });
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
        storeCookie("token", data.token);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);
        storeCookie("image", data.data.profile_picture)
        let role = data.data.role;
        if (role === `MANAGER`)
          setTimeout(() => router.push(`/manager/dashboard`), 1000);
        else if (role === `CASHIER`)
          setTimeout(() => router.push(`/cashier/dashboard`), 1000);
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
    <div className="flex flex-row bg-putihGaPutih max-h-screen">
      <ToastContainer containerId={`toastLogin`} />
      {/* form */}
      <ClickSpark
        sparkColor="#F09E39"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      />
      <div className="basis-1/2 h-max">
        <div className="flex flex-col h-screen">
          {/* logo */}
          <div className="flex flex-row justify-start ml-2">
            <Image src={Logo} alt="logo" className="w-20 h-20" />
            <h1 className="text-hitamGaHitam font-bold text-xl font-Darumadrop_One mt-6 uppercase ">
              Fooder
            </h1>
          </div>
          {/* form */}
          <div className="flex flex-col items-center my-32">
            <h1 className="text-hitamGaHitam font-extrabold text-8xl/tight font-tangerine">
              Welcome Back
            </h1>
            <p className="text-hitamGaHitam py-2 font-poppins text-sm">
            Di setiap gigitan, ada cerita rasa yang tak terlupakan.
            </p>
            <form onSubmit={handleSubmit} className="w-full my-6">
              <div className="relative w-full my-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute left-32 top-1/2 -translate-y-1/2 size-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <input
                  type="text"
                  className="peer border p-2 pl-12 w-2/3 rounded-md focus:outline-none focus:ring-primary focus:border-gray-400  text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  id="email"
                />
              </div>
              <div className="relative w-full my-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute left-32 top-1/2 -translate-y-1/2 size-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  className="border p-2 pl-12 pr-10 w-2/3 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  id="password"
                />

                <div
                  className="absolute right-32 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
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
              {/* login */}
              <div className="my-10 flex justify-center ">
                <button
                  type="submit"
                  className="bg-orange-500 uppercase w-2/3 p-2 rounded-md text-white hover:bg-orange-600 transition-all relative z-10"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="basis-2/3  bg-[url('/bg-login.jpg')] bg-cover bg-center ">
        <div className="flex justify-center mt-24 h-[80vh] ml-6">
          {/* <SplitText
            text='"I Ravioli Fatti in Casa Sono i Migliori."'
            className="text-4xl/10 font-extrabold text-orange-300 w-1/2 font-italiana italic tracking-widest hover:scale-105 transition-all h-max hover:text-[#f5f5f5]"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="1000px"
            onLetterAnimationComplete={handleAnimationComplete}
          /> */}
        </div>
      </div>
    </div>
  );
}
